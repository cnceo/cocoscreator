/*
author: JACKY
日期:2018-01-12 16:08:31
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
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";
import QzmjResMgr from "../QzmjMgr/QzmjResMgr";


//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QzmjDoorCardCtrl;
//模型，数据处理
class Model extends BaseModel{
	seatid=null;
	logicseatid=null;
	player=null; 
	mySeatID=null;
	constructor()
	{
		super();

	} 
	initSeat(seatid){
		// body
		this.seatid=seatid;
	}
	updateLogicId(  ){
		// body 
		this.logicseatid=RoomMgr.getInstance().getLogicSeatId(this.seatid);
		this.player=QzmjLogic.getInstance().players[this.logicseatid]; 
		this.mySeatID=RoomMgr.getInstance().getMySeatId();
	}
	recover(  ){ 
	}
	clear(){ 
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
	}; 
	node=null;
	debug=false; 
	doorCardPanel=null;
	constructor(model){
		super(model);
		this.node=ctrl.node; 
		 
		this.debug=false;
		this.initUi();
	}
	//初始化ui
	initUi()
	{ 
		this.doorCardPanel=[];
		for(var i = 0;i<5;++i)
		{  
			this.doorCardPanel.push(this.node.getChildByName(`DoorMaJiang_${i}`)); 
		}  

		this.clear();
	} 
	recover(  ){
		// body
		this.clear(); 
		for (let i = 0;i<this.model.player.opcards.length;++i){  
			this.addDoorCard(i)
		}
	} 
	updateBuGang(card)
	{
		for (let index = 0;index<this.model.player.opcards.length;++index){  
			let opcard=this.model.player.opcards[index];
			if(opcard.op==QzmjDef.op_bugang && opcard.value==card)
			{  
				var panel=this.doorCardPanel[index] 
				var value=opcard.value
				for (var i = 0;i<4;i++){
					var card=panel.getChildByName(`MaJiang_${i}`);
					card.active=true;
					var sign=card.getChildByName('sign');
					let texture = QzmjResMgr.getInstance().get3DCardTextureByValue(value);
					let frame = new cc.SpriteFrame(texture);
					sign.getComponent(cc.Sprite).spriteFrame = frame;  
				}
				break;
			}
		}
	}
	addDoorCard(index){
		// body  
		var opcard=this.model.player.opcards[index];   
		var panel=this.doorCardPanel[index]
		panel.active=true;
		var cardgroup={};
		if (opcard.op==QzmjDef.op_chi){ 
			for(var i = 0;i<3;++i){ 
				var value=opcard.value[i]
				var card=panel.getChildByName(`MaJiang_${i}`);
				card.active=true;
				var sign=card.getChildByName('sign');
				let texture = QzmjResMgr.getInstance().get3DCardTextureByValue(value);
				let frame = new cc.SpriteFrame(texture);
				sign.getComponent(cc.Sprite).spriteFrame = frame;    
			}
			var card=panel.getChildByName(`MaJiang_3`);
			card.active=false;
		}
		else if (opcard.op==QzmjDef.op_peng){ 
			var value=opcard.value
			for (var i = 0;i<3;++i){
				var card=panel.getChildByName(`MaJiang_${i}`);
				card.active=true;
				var sign=card.getChildByName('sign');
				let texture = QzmjResMgr.getInstance().get3DCardTextureByValue(value);
				let frame = new cc.SpriteFrame(texture);
				sign.getComponent(cc.Sprite).spriteFrame = frame;     
			}
			var card=panel.getChildByName(`MaJiang_3`);
			card.active=false;
		}
		else if (opcard.op==QzmjDef.op_gang){ 
			var value=opcard.value
			for (var i = 0;i<4;i++){
				var card=panel.getChildByName(`MaJiang_${i}`);
				card.active=true;
				var sign=card.getChildByName('sign');
				let texture = QzmjResMgr.getInstance().get3DCardTextureByValue(value);
				let frame = new cc.SpriteFrame(texture);
				sign.getComponent(cc.Sprite).spriteFrame = frame;  
			}
		}
		else if (opcard.op==QzmjDef.op_bugang){ 
			var value=opcard.value
			for (var i = 0;i<4;i++){
				var card=panel.getChildByName(`MaJiang_${i}`);
				card.active=true;
				var sign=card.getChildByName('sign');
				let texture = QzmjResMgr.getInstance().get3DCardTextureByValue(value);
				let frame = new cc.SpriteFrame(texture);
				sign.getComponent(cc.Sprite).spriteFrame = frame;  
			}
		}
		else if (opcard.op==QzmjDef.op_angang){ 
			var value=opcard.value
			for (var i = 0;i<4;++i){
				var card=panel.getChildByName(`MaJiang_${i}`);
				card.active=true;
				var sign=card.getChildByName('sign');
				var majingBg = card.getChildByName("majingBg");
                var angangBg = card.getChildByName("angangBg");
				let flag = i==3 && this.model.logicseatid == this.model.mySeatID;
                angangBg.active = !flag;
                majingBg.active = flag;
				sign.active = flag;
				let texture = QzmjResMgr.getInstance().get3DCardTextureByValue(flag ? value : 666);
				let frame = new cc.SpriteFrame(texture);
				let spriteNode = flag ? sign : majingBg;
				spriteNode.getComponent(cc.Sprite).spriteFrame = frame;
			}  
		} 
	}
	
	recoverPeng(card)
	{
		for (let index = 0;index<this.model.player.opcards.length;++index){  
			let opcard=this.model.player.opcards[index];
			if(opcard.op==QzmjDef.op_peng && opcard.value==card)
			{  
				var panel=this.doorCardPanel[index] 
				var value=opcard.value
				var card=panel.getChildByName(`MaJiang_3`);
				//未来可能会加上小时的动画
				card.active=false;
				break;
			}
		}
	}
	
	updateCards(msg){
		// body
		if(msg.event==QzmjDef.event_bugang)
		{
			this.updateBuGang(msg.card);
		}
		else if(msg.event==QzmjDef.event_qianggang_hu)
		{
			this.recoverPeng(msg.bugangCard);
		}
		else{ 
			var index=this.model.player.opcards.length-1;
			this.addDoorCard(index)
		}
	}
	clear(){ 
		// body  
		for(var i = 0;i<this.doorCardPanel.length;++i)
		{  
			this.doorCardPanel[i].active=false;
		} 
	} 
	 
}
//c, 控制
@ccclass
export default class QzmjDoorCardCtrl extends BaseCtrl {
	//这边去声明ui组件 
	@property
    seatId:Number = 0;
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model,View);
		
		this.model.initSeat(this.seatId);
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events={
   			onProcess:this.onProcess, 
			onOp:this.onOp,    
			onSyncData:this.onSyncData, 
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
	}
	start () {
	}
	//网络事件回调begin
	onSyncData(  ){
		// body
		this.model.recover();
		this.view.recover()
	}
	usersUpdated(){
		this.model.clear()
		this.view.clear() 
		this.model.updateLogicId();//清空自己所属位置的逻辑位置
	}
	onOp(msg){
		var op=QzmjDef.op_cfg[msg.event] 
		//抢杠胡
		if(op==QzmjDef.op_qianggang_hu)
		{
			if(this.model.logicseatid!=msg.bugangSeatId){
				return;
			}
			//恢复补杠为碰 
			this.view.updateCards(msg);
			return;
		}

		// body 
		if (this.model.logicseatid != msg.opseatid ){
			return;
		} 
	 
		//吃碰杠等列表
		let leagleOps=[QzmjDef.op_chi,QzmjDef.op_peng,QzmjDef.op_gang,QzmjDef.op_angang,QzmjDef.op_bugang]
		for(let i = 0;i<leagleOps.length;++i)
		{
			if(leagleOps[i]==op){
				this.view.updateCards(msg);
				break;
			}
		} 
	}
	onProcess(msg){
		if (msg.process==QzmjDef.process_ready ){ 
			this.process_ready(msg); 
		}
	}
	 
	
	process_ready(msg){
		this.view.clear()
		// body
	}
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
 
 
}
