import { QzmjDef } from "./QzmjDef";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import QzmjCards from "./QzmjCards";

 
export default class QzmjPlayer
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
	state=QzmjDef.state_idle;//玩家初始状态
	constructor()  
	{ 
		this.uid=null;//uid  
		this.seatid=null;
		this.QzmjCards=null;
	} 
	clearEvent()
	{
		this.events=[];
		this.state=QzmjDef.state_idle;//玩家初始状态
	}
	pushEvent(event)
	{
		//推入事件
		this.events.push(event);
		this.state=QzmjDef.state_idle;
		switch(event)
		{
			//如果是出牌事件，则将状态切至出牌
			case QzmjDef.event_chupai:
				this.state=QzmjDef.state_chupai;
			break;
			//如果是其他事件则将状态切入事件
			default:
				this.state=QzmjDef.state_event;
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
		this.state=QzmjDef.state_idle;//玩家初始状态
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
		let arr = QzmjDef.chiarr[index];
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
			'op':QzmjDef.op_chi,
			'value':chicards,
		}
		this.opcards.push(opinfo); 
	} 
	//插入碰
	pushPeng(card)
	{
		// body
		let opinfo={
			'op':QzmjDef.op_peng,
			'value':card,
		}
		this.opcards.push(opinfo); 
	}  
    //恢复补杠为碰
    recoverPeng(card)
	{ 
		for (let i = 0; i < this.opcards.length; i++) {
			let opinfo=this.opcards[i]
			if(opinfo.op==QzmjDef.op_bugang&&opinfo.value==card)
			{
				opinfo.op=QzmjDef.op_peng;
			}
		}
	} 

	//插入补杠 
	pushBuGang(card)
	{ 
		for (let i = 0; i < this.opcards.length; i++) {
			let opinfo=this.opcards[i]
			if(opinfo.op==QzmjDef.op_peng&&opinfo.value==card)
			{
				opinfo.op=QzmjDef.op_bugang;
			}
		}
	} 
	//加入杠
	pushGang(card)
	{
		// body 
		var opinfo={
			'op':QzmjDef.op_gang,
			'value':card,
		}
		this.opcards.push(opinfo);
	}  
	//加入暗杠
	pushAnGang(card)
	{
		// body 
		var opinfo={
			'op':QzmjDef.op_angang,
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
		this.QzmjCards = new QzmjCards();
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
		for(let index=0;index <QzmjDef.chiarr.length;++index)
		{
			var arr=QzmjDef.chiarr[index];
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
				console.log("QzmjPlayer:getCardsCanAnGang",cardvalue)
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
                if(opinfo.op==QzmjDef.op_peng&&opinfo.value==cardValue)
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
		return this.QzmjCards.checkXianJin(handcard,this.logic.jin);
	}
	getTingArr(tmpPai)
	{
		return this.QzmjCards.getTingArr(tmpPai,this.logic.jin);
	}
} 
