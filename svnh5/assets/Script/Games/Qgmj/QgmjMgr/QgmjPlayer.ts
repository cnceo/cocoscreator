import { QgmjDef } from "./QgmjDef";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";

 
export default class QgmjPlayer
{
	deposit=false;//是否托管  
	tingarr=[]; 
	handcard=[];
	cardpool=[];
	huapais={};
	opcards=[];//操作的牌，如杠碰吃
	uid=null;
	seatid=null;
	logic=null;
	events=[];//事件列表
	state		=QgmjDef.state_idle;//玩家初始状态
	constructor()  
	{ 
		this.uid=null;//uid  
		this.seatid=null 
	} 
	clearEvent()
	{
		this.events=[];
		this.state=QgmjDef.state_idle;//玩家初始状态
	}
	pushEvent(event)
	{
		//推入事件
		this.events.push(event);
		this.state=QgmjDef.state_idle;
		switch(event)
		{
			//如果是出牌事件，则将状态切至出牌
			case QgmjDef.event_chupai:
				this.state=QgmjDef.state_chupai;
			break;
			//如果是其他事件则将状态切入事件
			default:
				this.state=QgmjDef.state_event;
			break;
		} 
	}
	setEvents(events)
	{
		this.events=[];
		for(var i = 0;i<events.length;++i)
		{
			this.pushEvent(events[i]);
		}
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

	    if (this.Majiang_Type(pai[0]) < QgmjDef.MajiangType.emMJType_Zi)
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
	                if(pai[i]==QgmjDef.emMJ.emMJ_Joker)
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
	            else if (pai[i] != QgmjDef.emMJ.emMJ_Joker && pai[0] == QgmjDef.emMJ.emMJ_Joker)
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
	        while (joker_end != pai.end() && pai[joker_end] == QgmjDef.emMJ.emMJ_Joker)
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
	                else if (this.Majiang_Type(pai[0]) < QgmjDef.MajiangType.emMJType_Zi)
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
	getTingArr(tmpPai)
	{
		let pai=tmpPai.concat();
		pai.sort()
	    var ting_pai={};
	    //赖子个数:赖子牌编码最小，在排好序的队列前面
	    var joker_end = pai.cbegin();
	    while (joker_end != pai.cend() && pai[joker_end] == QgmjDef.emMJ.emMJ_Joker)
	    {
	        ++joker_end;
	    }
		//算金个数
	    var jocker_count = joker_end - pai.cbegin();

	    for (var k=0;k<QgmjDef.ting_majiang_types.length;++k)
	    {
	        var i=QgmjDef.ting_majiang_types[k]
	        // 金转换
	        if (i==this.logic.jin) {
	            continue;
	        }
	        //没有赖子时才过滤，有赖子的时候不能过滤，因为赖子单调的时候是和所有牌
	        if(jocker_count  == 0)
	        {
	            if (pai.front() - i > 1 || i - pai.back() > 1)
	            {
	                continue;
	            }

	            if (this.Majiang_Type(i) >= QgmjDef.MajiangType.emMJType_Zi)
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
	getHuaCount()
	{
		var huacount=0;
		for(var cardvalue in this.huapais){
			var count=this.huapais[cardvalue];
			huacount=huacount+count;
		} 
		return huacount;
	} 
	getJinCount()
	{ 
		var jincount=0;
		for (var i = 0;i<this.handcard.length;++i)
		{
			if (this.handcard[i]==0)
			{
				jincount=jincount+1;
			} 
		} 
		return jincount;
	} 
	getLeftHandCountByValue(value)
	{ 
		let count=0;
		for (let i = 0;i<this.handcard.length;++i)
		{
			if (this.handcard[i]==value)
			{
				count=count+1;
			}  
		} 
		return count;
	}
    getLeftOpCardsCountByValue(value)
	{ 
		let count=0;
		for (let i = 0; i < this.opcards.length; i++) {
			let opinfo=this.opcards[i]
			if(opinfo.value==value)
			{
				count++;
			}
		}
		return count;
	}
    getLeftcardpoolCountByValue(value)
	{ 
		let count=0;
		for (let i = 0; i < this.cardpool.length; i++) {
			if(this.cardpool[i]==value)
			{
				count++;
			}
		}
		return count;
	}
	resetData()
	{ 
		// body
		this.deposit=false;//是否托管  
		this.tingarr=[]; 
		this.handcard=[];
		this.cardpool=[];
		this.huapais={};
		this.opcards=[];//操作的牌，如杠碰吃
		this.events=[];//事件列表
		this.state=QgmjDef.state_idle;//玩家初始状态
	} 
	replaceJin()
	{
		for (var i = 0;i<this.handcard.length;++i)
		{
			if(this.handcard[i]==this.logic.jin)
			{
				this.handcard[i]=0;
			}
		} 
		this.sortCard()
	} 
	updateHandCard(handcard)
	{
 		this.handcard=handcard;
	} 
	getCard(index)
	{ 
		return this.handcard[index];
	} 
	pushCard(card)
	{
		// body
		if(!card){
			this.handcard.push(0)
		} 
		else{
			this.handcard.push(card)
		} 
	} 
	putInPool(card)
	{
		this.cardpool.push(card)
	} 
	removeCardFromPool()
	{
		this.cardpool.remove(this.cardpool.length-1);
	} 

	getChiCards(index)
	{ 
		// body  
		let curcard=this.logic.curcard; 
		let arr = QgmjDef.chiarr[index];
		let card1=curcard+arr[0];
		let card2=curcard+arr[1]; 
		let cards=[card1,card2] 
		return cards;
	} 
	removeCardByCount(card,count)
	{
		// body 
		for (let i = 0;i<count;++i)
		{ 
			this.removeCard(card);
		} 
	} 
	pushChi(index,cards) 
	{
		let chicards=cards;
	    chicards.insert(index,this.logic.curcard);
		let opinfo={
			'op':QgmjDef.op_chi,
			'value':chicards,
		}
		this.opcards.push(opinfo); 
	} 
	//插入碰
	pushPeng(card)
	{
		// body
		let opinfo={
			'op':QgmjDef.op_peng,
			'value':card,
		}
		this.opcards.push(opinfo); 
	}  
    //恢复补杠为碰
    recoverPeng(card)
	{ 
		for (let i = 0; i < this.opcards.length; i++) {
			let opinfo=this.opcards[i]
			if(opinfo.op==QgmjDef.op_bugang&&opinfo.value==card)
			{
				opinfo.op=QgmjDef.op_peng;
			}
		}
	} 

	//插入补杠 
	pushBuGang(card)
	{ 
		for (let i = 0; i < this.opcards.length; i++) {
			let opinfo=this.opcards[i]
			if(opinfo.op==QgmjDef.op_peng&&opinfo.value==card)
			{
				opinfo.op=QgmjDef.op_bugang;
			}
		}
	} 
	//加入杠
	pushGang(card)
	{
		// body 
		var opinfo={
			'op':QgmjDef.op_gang,
			'value':card,
		}
		this.opcards.push(opinfo);
	}  
	//加入暗杠
	pushAnGang(card)
	{
		// body 
		var opinfo={
			'op':QgmjDef.op_angang,
			'value':card,
		}
		this.opcards.push(opinfo); 
	} 
	removeCards(cards)
	{
		// body
		for(var i =0;i<cards.length;++i){ 
			this.removeCard(cards[i]);
		}
	} 
	removeCard(card)
	{
		// 移除手上的牌
		if(this.seatid==RoomMgr.getInstance().getMySeatId())
		{
			for (var i =0;i<this.handcard.length;++i)
			{
				var value=this.handcard[i];
				if (value==card)
				{ 
					this.handcard.remove(i);
					break;
				}  
			} 
		}
		else
		{ 
			this.handcard.remove(0);
		}
	} 

	init(seatid,logic)
	{ 
		this.seatid=seatid
		this.logic=logic;
	} 
	initHandCard(handcard)
	{
		this.handcard=handcard
		this.handcard.sort(function(a,b){
			return a-b;
		})
	}
	fillOthersCard(len)
	{
		this.handcard=[];
		for(var i = 0;i<len;++i)
		{
			this.handcard.push(0)
		} 
	} 

	buHua(huapaiarr,paiarr)  
	{
		for (var i=0;i<huapaiarr.length;++i)
		{ 
			this.putInHua(huapaiarr[i]);
		}
		if (this.seatid !=RoomMgr.getInstance().myseatid){ 
			return;
		}
		for(var i=0;i<huapaiarr.length;++i)
		{ 
			for (var j = 0;j<this.handcard.length;++j)
			{
				if (this.handcard[j] == huapaiarr[i]){

					this.handcard.remove(j)
					break;
				}  
			}  
		}  
		for (var i = 0;i<paiarr.length;++i)
		{
			this.handcard.push(paiarr[i])
		} 
		//补完牌就排序
    	this.sortCard();
	}
	sortCard()
	{
		this.handcard.sort(function(a,b){
			return a-b;
		})
	}
	putInHua(hua)
	{ 
		// body 
		if(!this.huapais[hua])
		{
			this.huapais[hua]=1;
		} 
		else
		{ 
			this.huapais[hua]=this.huapais[hua]+1;
		} 
	}
	findCard(value)
	{
		for (var i = 0;i<this.handcard.length;++i)
		{
			if(value==this.handcard[i])
			{
				return true;
			} 
		}  
		return false; 
	} 
	getCardsCandChi()
	{
		// body
		var cardsCanChi=[];
		var curcard=this.logic.curcard;
		for(let index=0;index <QgmjDef.chiarr.length;++index)
		{
			var arr=QgmjDef.chiarr[index];
			var card1=curcard+arr[0];
			var card2=curcard+arr[1]; 
			if	(this.findCard(card1) && this.findCard(card2))
			{ 
				var cards=[card1,card2]
				cards.insert(index,curcard);
				var chiinfo={
					'index':index,
					'cards':cards,
				}
				cardsCanChi.push(chiinfo); 
			}
		}
		return cardsCanChi;
	} 
	getCardsCanAnGang()
	{	
		// body
		var cardsCanAnGang=[];
		var curcard=this.logic.curcard;
		var cardcountmap={};
		for (var i=0;i<this.handcard.length;++i)
		{
			var card=this.handcard[i];
			if(!cardcountmap[card]){
				cardcountmap[card]=1;
			}
			else 
			{
				cardcountmap[card]=cardcountmap[card]+1;
			} 
		}  
		for (var cardvalue in cardcountmap){
			var count=cardcountmap[cardvalue]; 
			if (count==4)
			{
				console.log("QgmjPlayer:getCardsCanAnGang",cardvalue)
				cardsCanAnGang.push(cardvalue)
			} 
		}  
		return cardsCanAnGang;
	}
	getCardsCanBuGang(){
		// body
		var cardsCanBuGang=[];
        for (let index = 0; index < this.handcard.length; index++) {
            let cardValue=this.handcard[index]; 
            for (let i = 0; i < this.opcards.length; i++) {
                let opinfo=this.opcards[i] 
                if(opinfo.op==QgmjDef.op_peng&&opinfo.value==cardValue)
                {
					cardsCanBuGang.push(cardValue)
                }
            }
        } 
		return cardsCanBuGang;
	}
	getHandcardsGangCount()
	{
		// body
		let gangCount = 0;
		let curcard=this.logic.curcard;
		let cardcountmap={};
		for (let i=0;i<this.handcard.length;++i)
		{
			let card=this.handcard[i];
			if(!cardcountmap[card]){
				cardcountmap[card]=1;
			}
			else 
			{
				cardcountmap[card]=cardcountmap[card]+1;
			} 
		}  
		for (let cardvalue in cardcountmap){
			let count=cardcountmap[cardvalue]; 
			if (count==4)
			{
				gangCount++;
			} 
		}  
		return gangCount;
	}
	switchCard(src,dest)
	{
		console.log("换牌前=",this.handcard)
		for (var i = 0; i < this.handcard.length; i++) {
			let cardValue=this.handcard[i];
			if(cardValue==src)
			{
				this.handcard[i]=dest;
				console.log("换牌后=",this.handcard)
				this.sortCard();
				return;
			}
		}
	}
	checkXianJin(handcard)
	{
	    let tmpCards=handcard.concat();
	    tmpCards.push(this.logic.jin);//金肯定不在任何手牌里，因为手牌里的金都变成了0
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
	            if(item.jincount==1 && item.cards[0]==this.logic.jin)
	            {  
	                return true;  
	            }
	        }
	    }  
	    return false;
	}
} 
