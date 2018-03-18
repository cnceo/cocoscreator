/*
author: JACKY
日期:2018-01-12 14:10:41
*/

import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import UiMgr from "../../../Plat/GameMgrs/UiMgr";
import ModuleMgr from "../../../Plat/GameMgrs/ModuleMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import QzmjLogic from "../QzmjMgr/QzmjLogic";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import { QzmjDef } from "../QzmjMgr/QzmjDef";
import QzmjResMgr from "../QzmjMgr/QzmjResMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QzmjMyCardsCtrl;
//模型，数据处理
class Model extends BaseModel{
	mySeatId=null; 
	myself=null; 
	enable_op=null;
	cursel=null;
	jin=null; 
	offset=0;//麻将起始位置偏移
	tingtypedic={};
	constructor()
	{
		super();
		this.clear();
	} 
	updateOffset(){
		this.offset=this.myself.opcards.length*3;
	}
	updateMyInfo(  ){
		// body 
		this.mySeatId=RoomMgr.getInstance().getMySeatId(); 
		this.myself=QzmjLogic.getInstance().players[this.mySeatId] 
	}
 
	clear(  ){
		// body 
		this.cursel=null; 
		this.enable_op=false;  
		this.offset=0;
	}  
	recover(  ){
		this.clear();
		this.jin=QzmjLogic.getInstance().jin;
	}
 
	disabledOp(){
		this.enable_op=false;
		this.cursel=null; 
	}
    enabledOp(){
		this.enable_op=true;
	} 
	updateTingDic(){
		// 判断是否听牌进行听牌提示
		this.tingtypedic={};
		for (let i = 0; i < this.myself.handcard.length; i++) {
			let tmpCards = this.myself.handcard.concat();
			tmpCards.remove(i);
			let isXianJin=this.myself.checkXianJin(tmpCards);
			let card=this.myself.handcard[i];
			let tingarr=this.myself.getTingArr(tmpCards);
			let tingcards=Object.keys(tingarr);
			let tingtype=-1;
			if(isXianJin)
			{
				if(card==0)
				{
					tingtype=2;
				}
				else
				{
					tingtype=1;
				}
			}
			else if(tingcards.length>0)
			{
				tingtype=0;
			}
			this.tingtypedic[card]={
				type:tingtype,
				cards:tingcards
			}
		}
		console.log("this.tingtypedic=",this.tingtypedic)
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		handcard:null,
	}; 
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
	}
	//初始化ui 
	initUi()
	{ 
		this.ui.handcard=[];
		for(let i = 0;i<QzmjDef.cardcount+1;++i)
		{ 
			this.ui.handcard.push(this.node.getChildByName(`hand_majing_${i}`));
		}  
		this.clear(); 
	}
	clearMyCard(){
		for (let i=0;i<this.ui.handcard.length;++i){ 
			this.ui.handcard[i].active=false;
		}
	}  
 
	recover(  ){
		// body
		this.clear(); 
	}
	
	//清除
	clear(){
		// body   
		for (var i=0;i<this.ui.handcard.length;++i){
			this.ui.handcard[i].active=false
		}
	}
  
	updateHandCards(){ 
		for (let i = 0;i<this.model.offset;++i){  
			var card = this.ui.handcard[i];
			card.active=false;
		}
		for (let i = this.model.offset;i<this.ui.handcard.length;++i){
			let card = this.ui.handcard[i];
			let cardIndex=i-this.model.offset
			let value=this.model.myself.handcard[i-this.model.offset]; 
			if (value !=null && value !=undefined){
                var sign=card.getChildByName('sign');
                let texture = QzmjResMgr.getInstance().getCardTextureByValue(value);
                let frame = new cc.SpriteFrame(texture); 
				sign.getComponent(cc.Sprite).spriteFrame = frame;  
				card.active=true;
			}
			else
			{
				card.active=false;
			}
		}	
	}
	updateCards(){ 
		this.updateHandCards(); 
		this.updateSel();
	}
	updateSel(){ 
		for (let i = this.model.offset;i<this.ui.handcard.length;++i){ 
			var card = this.ui.handcard[i];
			var pos=card.position; 
			if (i == this.model.cursel){
				card.position=cc.p(pos.x,20);
			}
			else{
				card.position=cc.p(pos.x,0);
				this.removeHintCard(i);
				this.showHintcards(i,false);
			}
		} 
	}
	updateTingFlag(){
		for (let i = 0; i < this.model.myself.handcard.length; ++i) {
			let card=this.model.myself.handcard[i];
			let tingtype=this.model.tingtypedic[card];
			let cardnode=this.ui.handcard[i+this.model.offset];
			let flagnode=cardnode.getChildByName("flag");
			if (tingtype.type>=0) {
				flagnode.active=true;
			}
			else
			{
				flagnode.active=false;
			}
			if (tingtype.type < 2 && card == 0) {
				flagnode.active=false;
			}
			console.log("flagnode.active",flagnode.active)
			console.log("tingtype",tingtype)
			let realUrl =null;
            switch (tingtype.type) {
                case 1:
                    realUrl = cc.url.raw('resources/Games/Qzmj/op/btn_youjin_normal.png');
                break;
                case 2:
                    realUrl = cc.url.raw('resources/Games/Qzmj/op/btn_shuangyou_normal.png');
                break;
            }
            if(realUrl)
            {

				let texture = cc.loader.getRes(realUrl);
				let spriteFrame = new cc.SpriteFrame(texture); 
                flagnode.getComponent(cc.Sprite).spriteFrame=spriteFrame
            }
		}
	}
	showHintcards(idx,flag){
		this.ui.handcard[idx].getChildByName("hintcards").active = flag;
	}
	adjustHintCardsBg(idx,cardNum){
		let hintCardsBg = this.ui.handcard[idx].getChildByName("hintcards").getChildByName("bg");
		hintCardsBg.setContentSize(cardNum*64+15,hintCardsBg.getContentSize().height);
		let hintcardPos = this.ui.handcard[idx].getChildByName("hintcards").getPosition();
		if (cardNum*64+15 > hintcardPos.x -10) {
			this.ui.handcard[idx].getChildByName("hintcards").setPosition(cc.v2(cardNum*64+15,hintcardPos.y));
		}
	}
	addHintCard(idx,spriteFrame,cardLefNum){
		//克隆节点
		let hintcards = this.ui.handcard[idx].getChildByName("hintcards");
		hintcards.active = true;
		let width = 64;
		let node = cc.instantiate(hintcards.getChildByName("card"));
		node.active = true;
		hintcards.addChild(node);
		let childcount = hintcards.childrenCount;
		node.setPosition(cc.v2(-(childcount-3)*width,0));

		node.getChildByName("sign").getComponent(cc.Sprite).spriteFrame = spriteFrame;
		node.getChildByName("number").getComponent(cc.Label).string = cardLefNum;
	}
	removeHintCard(idx){
		let hintcards = this.ui.handcard[idx].getChildByName("hintcards");
		let childcount = hintcards.childrenCount;
		for (var i = 0; i < childcount-2; i++) {
			hintcards.getChildByName("card").removeFromParent();
		}
		hintcards.getChildByName("card").setPosition(cc.v2(0,0));
		hintcards.getChildByName("card").active = false;
	}
	showTingCards(index){
		let cardnode=this.ui.handcard[index+this.model.offset];
		// 判断是否听牌进行听牌提示
		let card=this.model.myself.handcard[index];
		let tingtype = this.model.tingtypedic[card].type;
		if (tingtype == -1 || tingtype >= 2 || card == 0) {
			return;
		}
		let cards = this.model.tingtypedic[card].cards;
		switch (tingtype) {
			case 0:
				this.showHintcards(index,true);
				for (let n= 0; n< cards.length; n++) {
					let key = cards[n];
					let cardValue = QzmjResMgr.getInstance().getCardTextureByValue(key);
					let spriteFrame = new cc.SpriteFrame(cardValue);
					// 获取牌面剩余牌数
					let leftCardNum = 4- this.model.myself.getLeftHandCountByValue(key)- this.model.myself.getLeftOpCardsCountByValue(key)- this.model.myself.getLeftcardpoolCountByValue(key);
					for(let n=0;n< QzmjLogic.getInstance().players.length;n++)
					{
						let player = QzmjLogic.getInstance().players[n];
						if (n!= this.model.mySeatId) {
							leftCardNum = leftCardNum - player.getLeftOpCardsCountByValue(key) - player.getLeftcardpoolCountByValue(key);
						}
					}
					this.addHintCard(index+this.model.offset,spriteFrame,leftCardNum);
				}
				this.adjustHintCardsBg(index+this.model.offset,cards.length);
				break;
		}
	}
	hideTingFlag(idx)
	{
		for (let i = 0; i < this.ui.handcard.length; ++i) {
			if (idx == -1) {
				this.ui.handcard[i].getChildByName("flag").active = false;
			}
			else if (idx == i) {
				this.ui.handcard[i].getChildByName("flag").active = false;
			}
		}
	}
 
}
//c, 控制
@ccclass
export default class QzmjMyCardsCtrl extends BaseCtrl {
	//这边去声明ui组件  
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离 

	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model,View);
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events={ 
			//网络消息监听列表      
			'onEvent':this.onEvent,  
			onSeatChange:this.onSeatChange,  
			onSyncData:this.onSyncData,
			onProcess:this.onProcess,
			onOp:this.onOp,        
            onGmOp:this.onGmOp,
        } 
	}
	
	//定义全局事件
	defineGlobalEvents()
	{
		//全局消息
		this.g_events={ 
			'usersUpdated':this.usersUpdated,   
		} 
	}
	//绑定操作的回调
	connectUi()
	{ 
		this.bindCardTouch();
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end 
	usersUpdated()
	{
		//清空数据和牌
		this.model.clear();
		this.view.clear();
		this.model.updateMyInfo();//更新我的信息
	}
	onEvent(msg)
	{
		// body  
		let eventLength=this.model.myself.events.length;
		let event=this.model.myself.events[eventLength-1];
		if(event>=QzmjDef.event_shuangyou)
		{
			this.view.hideTingFlag(-1);
		}

		if(this.model.myself.state!=QzmjDef.state_chupai)
		{
			return;
		}   
		this.model.enabledOp(); 
		console.log("onEvent");
	} 
	//广播gm操作
	onGmOp(msg)
	{ 
		switch(msg.optype)
		{
			case QzmjDef.gmop_changecard:{
				if(msg.opseatid==RoomMgr.getInstance().getMySeatId())
				{
					console.log("updatecards1")
					//自己换牌
					this.view.updateHandCards();
				}
				if(msg.data.target==RoomMgr.getInstance().getMySeatId())
				{
					console.log("updatecards2")
					//我的牌被别人换了
					this.view.updateHandCards();
				}
			}
			break;
		}
	}
	onSyncData(  )
	{
		// body 
		this.model.recover();
		this.view.recover();   
		var cur_eventtype=QzmjLogic.getInstance().cur_eventtype;
		if (cur_eventtype){
			if (cur_eventtype==QzmjDef.event_chupai){  
				this.model.enabledOp(); 
			}
		}
		this.view.updateCards(this.model.enable_op) 

	}
	onSeatChange(msg){
		// body 
		// 轮庄
		if (this.model.mySeatId == QzmjLogic.getInstance().curseat){ 
			this.view.updateCards();
			this.showtingtip();
		}
	} 
	showtingtip(){
		this.model.updateTingDic();
		this.view.updateTingFlag();
	}
	onOp(msg){
		if (msg.opseatid!=this.model.mySeatId)
		{
			return;
		}
		this.model.updateOffset();
		// body  
		console.log("onOp"); 
		this.view.hideTingFlag(-1);
		var op=QzmjDef.op_cfg[msg.event]
		if (op == QzmjDef.op_chupai){  
			this.view.updateCards(); 
		}
		else if(op==QzmjDef.op_bugang)
		{ 
			this.view.updateCards(); 
		} 
	}   
	onProcess(msg){ 
		if (msg.process==QzmjDef.process_kaijin){
			this.view.updateCards();
		}
		else if (msg.process==QzmjDef.process_fapai){ 
			this.view.updateCards();
		}
		else if (msg.process==QzmjDef.process_ready){ 
			this.process_ready(); 
		} 
		else if (msg.process==QzmjDef.process_buhua){ 
			this.process_buhua(msg);
		}
		else if (msg.process==QzmjDef.process_loop){ 
			this.process_loop(msg);
		}
	}
	process_loop(msg)
	{
		console.log("process_loop");
		if (this.model.mySeatId == QzmjLogic.getInstance().curseat){
			this.showtingtip();
		}
	}
    process_buhua(msg){

		this.view.updateCards()
	}
    process_ready(){
		// body
		this.model.clear();
		this.view.clear();
	}
  
	touchCard(index){ 
		if(!this.model.enable_op){
			return;
        }
        let showDanShuangyou = 0;
		if(this.model.cursel==index){
			//要去除偏移部分 出牌
            //非双游 三游金不能打
            let tingtype = -1;
            let handcard= this.model.myself.handcard[index-this.model.offset];
            tingtype = this.model.tingtypedic[handcard].type;
            if (tingtype<2 && handcard == 0) {
                return;
            }
            console.log("tingtype",tingtype);
            console.log("cardvalue",this.model.myself.handcard[index-this.model.offset]);
		    QzmjLogic.getInstance().playerOp(QzmjDef.event_chupai,index-this.model.offset);
			this.model.disabledOp();
            return;
		}
		// 听牌提示隐藏
		this.view.updateTingFlag();
		this.view.hideTingFlag(index);
        // 听牌牌型显示
        this.view.showTingCards(index-this.model.offset);

		this.model.cursel=index;
		this.view.updateSel();
	} 
 
	bindCardTouch(){  
		for(let i=0;i<this.ui.handcard.length;++i){  
			let node=this.ui.handcard[i];  
			let majingBg=node.getChildByName('majingBg')   
			majingBg.on(cc.Node.EventType.TOUCH_END, function (event) { 
				this.touchCard.bind(this)(i);
			},this); 
		}
	} 
 
 
	op_chupai(msg){
		//收到出牌的指令了
		//不是自己 
		if (this.model.mySeatId != QzmjLogic.getInstance().curseat ){ 
			return;
		}
		this.model.disabledOp();
		this.model.cursel=null; 
		this.view.updateCards(false);
	}
}
