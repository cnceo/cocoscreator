import { QzmjDef } from "./QzmjDef";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";

 
export default class QzmjCards
{
	logic=null;
	constructor()  
	{
	}
	init(logic)
	{
		this.logic=logic;
	}
    Majiang_Type(  m) {
        return  m >> 4;
    }
    binary_search(arr,from,to,value)
    {
	    let mid, front=from, back=to-1;
	    while (front<=back)
	    {
	        mid = parseInt((front+back)/2);
	        if (arr[mid]==value)
	            return mid;
	        if (arr[mid]<value)
	            front = mid+1;
	        else
	            back = mid-1;
	    }
	    return -1;
    }
    find_if(arr,first,last,cb)
    {
        while(first!=last && !cb(arr[first]))
            ++first;
        return first;
    }
    Find_In_Sorted(arr, begin, end,   v) {
        var it = begin;
        while (it != end)
        {
            if (arr[it] == v)
            {
                break;
            }
            else if (arr[it] > v)
            {
                it = end;
                break;
            }
            ++it;
        }
        return it;
    }
    distance(src,dest)
    {
        return dest-src;
    }
    //查询数组中等于value的第一第二个值的下标
    equal_range(arr,frompos,to,value)
    {
        var dat={}
        dat.first=-1;
        dat.second=-1;
        for (var i = frompos; i < to; i++) {
            if(arr[i]==value)
            {
                if(dat.first<0)
                    dat.first=i;
            }
            else
            {
                if(dat.first>=0)
                {
                    dat.second=i;
                    break;
                }
            }
        }
        if(dat.second<0)
        {
            for (var i = frompos; i < to; i++)
            {
                if(value<arr[i])
                {
                    dat.second=i;
                    break;
                }
            }
        }
        if(dat.second<0)
            dat.second=to;
        if(dat.first<0)
            dat.first=dat.second;
        return dat;
    }
    //递归拆分手牌  ,泉州麻将花牌也可以胡，比如双游后摸到花牌
	ResolvePai(  pai,   joker_count,hucards)
	{
	    if (pai.empty() && joker_count % 3 == 0)
	    {
	        return true;
	    }
	    else if (pai.size() + joker_count < 3)
	    {
	        return false;
	    }

	    if (pai.size() >= 3 && pai[0] == pai[2])
	    {
	        //找到刻子牌并移除
	        hucards.push({
	            type:1,
	            cards:[pai[0]],
	        })
	        pai.erase(pai.begin(), pai.begin() + 3);
	        if (this.ResolvePai(pai, joker_count,hucards)) {
	            return true;
	        }
	    }
	    else if (pai.size() >= 2 && pai[0] == pai[1] && joker_count >= 1)
	    {
	        --joker_count;
	        hucards.push({
	            type:1,
	            jincount:1,
	            cards:[pai[0],pai[1]],
	        })
	        //找到刻子牌并移除
	        pai.erase(pai.begin(), pai.begin() + 2);
	        if (this.ResolvePai(pai, joker_count,hucards)) {
	            return true;
	        }
	    }
	    else if (pai.size() >= 1 && joker_count >= 2)
	    {
	        joker_count -= 2;

	        hucards.push({
	            type:1,
	            jincount:2,
	            cards:[pai[0]],
	        })
	        //找到刻子牌并移除
	        pai.erase(pai.begin(), pai.begin() + 1);
	        if (this.ResolvePai(pai, joker_count,hucards)) {
	            return true;
	        }
	    }

	    if (this.Majiang_Type(pai[0]) < QzmjDef.MajiangType.emMJType_Zi)
	    {
	        var it1 = this.Find_In_Sorted(pai,pai.begin() + 1, pai.end(), pai[0] + 1);
	        if (it1 != pai.end())
	        {
	            var it2 = this.Find_In_Sorted(pai, it1 + 1, pai.end(), pai[0] + 2);
	            if (it2 != pai.end())
	            {
	                hucards.push({
	                    type:2,
	                    cards:[pai[0]],
	                })
	                //找到顺序牌并移除
	                pai.erase(it2);
	                pai.erase(it1);
	                pai.erase(pai.begin());

	                if (this.ResolvePai(pai, joker_count,hucards))
	                    return true;
	            }
	            else if(joker_count >= 1)
	            {
	                //找到顺序牌并移除
	                --joker_count;
	                hucards.push({
	                    type:2,
	                    jincount:1,
	                    cards:[pai[0],pai[it1]],
	                })
	                pai.erase(it1);
	                pai.erase(pai.begin());

	                if (this.ResolvePai(pai, joker_count,hucards))
	                    return true;
	            }
	        }
	        else if(joker_count >= 1)
	        {
	            var it2 = this.Find_In_Sorted(pai,pai.begin() + 1, pai.end(), pai[0] + 2);
	            if (it2 != pai.end())
	            {
	                //找到顺序牌并移除
	                --joker_count;
	                hucards.push({
	                    type:2,
	                    jincount:1,
	                    cards:[pai[0],pai[it2]],
	                })
	                pai.erase(it2);
	                pai.erase(pai.begin());

	                if (this.ResolvePai(pai, joker_count,hucards))
	                    return true;
	            }
	            else if (joker_count >= 2)
	            {
	                joker_count -= 2;
	                hucards.push({
	                    type:2,
	                    jincount:2,
	                    cards:[pai[0]],
	                })
	                pai.erase(pai.begin());

	                if (this.ResolvePai(pai, joker_count,hucards))
	                    return true;
	            }
	        }
	    }
	    return false;
	}
	//普通和牌类型  泉州麻将花牌也可以胡，比如双游后摸到花牌
	IsCommonHu( original_pai)
	{
	    //前提：牌已经排好序，不含已碰牌和已杠牌，所以牌数应该是3n+2
	    //过程：先找出一对将牌，然后再寻找刻子牌和顺子牌，直到剩余牌为0才表示可和牌，否则不能和牌
	    //记录将牌位置
	    var jiang_location = 0;
	    var pai;
	    var hucards=null;
	    while (true)
	    {
	        hucards=[];
	        var i = jiang_location + 1;
	        if (i >= original_pai.size())
	        {
	            return null;
	        }
	        pai = original_pai.concat();
	        var lastjiangpos=i;
	        if (jiang_location != 0)
	        {
	            if (pai[lastjiangpos] == pai[jiang_location])
	            {
	                i=lastjiangpos;
	                lastjiangpos++;
	            }
	        }
	        //寻找将牌位置，记录将牌第二个，并擦除该两牌
	        jiang_location = 0;
	        for (; i < pai.size(); ++ i)
	        {
	            if (pai[i] == pai[i - 1])
	            {
	                //加入记录
	                if(pai[i]==QzmjDef.emMJ.emMJ_Joker)
	                {
	                    hucards.push({
	                        type:0,
	                        jincount:2,
	                    })
	                }
	                else
	                {
	                    hucards.push({
	                        type:0,
	                        cards:[pai[i]],
	                    })
	                }
	                jiang_location = i;
	                pai.erase(pai.begin() + i - 1, pai.begin() + i + 1);
	                break;
	            }
	            else if (pai[i] != QzmjDef.emMJ.emMJ_Joker && pai[0] == QzmjDef.emMJ.emMJ_Joker)
	            {
	                hucards.push({
	                    type:0,
	                    jincount:1,
	                    cards:[pai[i]],
	                })
	                jiang_location = i;
	                pai.erase(pai.begin() + i, pai.begin() + i + 1);
	                pai.erase(pai.begin());
	                break;
	            }
	        }
	        if (jiang_location == 0)
	        {
	            //没有将牌，不能和牌
	            return null;
	        }
	        //无赖子时可直接循环拆分，有赖子时较复杂一些，需要递归拆分
	        var joker_end = pai.begin();
	        while (joker_end != pai.end() && pai[joker_end] == QzmjDef.emMJ.emMJ_Joker)
	        {
	            ++joker_end;
	        }
	        var joker_count = joker_end - pai.begin();
	        if (joker_count > 0)
	        {
	            //移除金给后面用
	            pai.erase(pai.begin(), joker_end);
	            if (this.ResolvePai(pai, joker_count,hucards))
	            {
	                break;
	            }
	        }
	        else
	        {
	            //剩下的牌数是3的倍数
	            //从左起第1张牌开始，它必须能组成刻子牌或者顺子牌才能和，否则不能和
	            while (pai.size() >= 3)
	            {
	                if (pai[0] == pai[2])
	                {
	                    //找到刻子牌并移除
	                    hucards.push({
	                        type:1,
	                        cards:[pai[0]],
	                    })
	                    pai.erase(pai.begin(), pai.begin() + 3);
	                }
	                else if (this.Majiang_Type(pai[0]) < QzmjDef.MajiangType.emMJType_Zi)
	                {
	                    var it1 = this.Find_In_Sorted(pai,pai.begin() + 1, pai.end(), pai[0] + 1);
	                    //var it1 = std::lower_bound(pai.begin() + 1, pai.end(), pai[0] + 1);
	                    if (it1 != pai.end())
	                    {
	                        var it2 = this.Find_In_Sorted(pai,it1 + 1, pai.end(), pai[0] + 2);
	                        //var it2 = std::lower_bound(it1 + 1, pai.end(), pai[0] + 2);
	                        if (it2 != pai.end())
	                        {
	                            //找到顺序牌并移除
	                            hucards.push({
	                                type:2,
	                                cards:[pai[0]],
	                            })
	                            pai.erase(it2);
	                            pai.erase(it1);
	                            pai.erase(pai.begin());
	                        }
	                        else
	                        {
	                            break;
	                        }
	                    }
	                    else
	                    {
	                        break;
	                    }
	                }
	                else
	                {
	                    break;
	                }
	            }
	            if (pai.empty())
	            {
	                break;
	            }
	        }
	    }
	    return hucards;
	}
	getTingArr(tmpPai,jin)
	{
		let pai=tmpPai.concat();
		pai.sort()
	    var ting_pai={};
	    //赖子个数:赖子牌编码最小，在排好序的队列前面
	    var joker_end = pai.cbegin();
	    while (joker_end != pai.cend() && pai[joker_end] == QzmjDef.emMJ.emMJ_Joker)
	    {
	        ++joker_end;
	    }
		//算金个数
	    var jocker_count = joker_end - pai.cbegin();

	    for (var k=0;k<QzmjDef.ting_majiang_types.length;++k)
	    {
	        var i=QzmjDef.ting_majiang_types[k]
	        // 金转换
	        if (i==jin) {
	            continue;
	        }
	        //没有赖子时才过滤，有赖子的时候不能过滤，因为赖子单调的时候是和所有牌
	        if(jocker_count  == 0)
	        {
	            if (pai.front() - i > 1 || i - pai.back() > 1)
	            {
	                continue;
	            }

	            if (this.Majiang_Type(i) >= QzmjDef.MajiangType.emMJType_Zi)
	            {
	                //字牌必须有相同的才可能和
	                if (this.binary_search(pai,pai.cbegin(), pai.cend(), i)<0) {
	                    continue;
	                }
	            }
	            else
	            {
	                var it = this.find_if(pai,pai.cbegin(), pai.cend(),function(c) {
	                    //万筒条必须满足牌的数字相邻才有可能和
	                    return Math.abs(c - i) <= 1;
	                });
	                if (it == pai.cend()) {
	                    continue;
	                }
	            }
	             
	        }
	        //深拷贝
	        var temp =pai.concat();
	        var range = this.equal_range(temp,temp.begin(), temp.end(), i);
	        if ( this.distance(range.first, range.second) == 4) {
	            //如果已经有四张牌了，不能算听牌
	            continue;
	        }
	        temp.insert(range.second, i);
	        temp.sort();
	        var hucards=this.IsCommonHu(temp);
	        if (hucards)
	        {
	            ting_pai[i]=hucards;
	        }
	    }
		//ting_pai中key就是所有要胡的牌
	    return ting_pai;
	}
	checkXianJin(handcard,jin)
	{
	    let tmpCards=handcard.concat();
	    tmpCards.push(jin);//金肯定不在任何手牌里，因为手牌里的金都变成了0
	    tmpCards.sort(function(a,b)
	    {
	        return a-b;
	    }); 
	    let tmpHuCards=this.IsCommonHu(tmpCards);  
	    if(!tmpHuCards)//如果不能胡牌就无所谓闲金判断了
	    {
	        return false;
	    }
	    for (var i = 0; i < tmpHuCards.length; i++) 
	    {
	        var item=tmpHuCards[i];
	        if(item.type==0)
	        {
	            if(item.jincount==1 && item.cards[0]==jin)
	            {  
	                return true;  
	            }
	        }
	    }  
	    return false;
	}
} 
