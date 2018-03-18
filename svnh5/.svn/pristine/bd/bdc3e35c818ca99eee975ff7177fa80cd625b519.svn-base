/*
author: JACKY
日期:2018-01-12 16:27:16
*/
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import UiMgr from "../../../Plat/GameMgrs/UiMgr";
import ModuleMgr from "../../../Plat/GameMgrs/ModuleMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import QgmjLogic from "../QgmjMgr/QgmjLogic";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import { QgmjDef } from "../QgMjMgr/QgmjDef";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QgmjHandCardCtrl;
//模型，数据处理
class Model extends BaseModel{
	logicseatid=null;
	seatid=null;
	player=null;
	offset=0;//麻将起始位置偏移
	constructor()
	{
		super();
		//在这里定义视图和控制器数据 
		this.logicseatid=null;
		this.clear();

	} 
	updateOffset(){
		this.offset=this.player.opcards.length*3;
	}
	initSeat(seatid)
	{
		this.seatid=seatid; 
	} 
 
	updateLogicId(  ){
		// body 
		this.logicseatid=RoomMgr.getInstance().getLogicSeatId(this.seatid); 
		this.player=QgmjLogic.getInstance().players[this.logicseatid];  
	} 

    recover(  ){
		// body
		this.clear();
		this.player=QgmjLogic.getInstance().players[this.logicseatid];  
	} 
	clear()
	{ 
		this.offset=0;
	}
 
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui 
	};   
	handcard=null;
	constructor(model){
		super(model);
		this.node=ctrl.node; 
		this.initUi();
	}
	//初始化ui
	initUi()
	{  
		this.handcard=[];
		for(var i = 0;i<=QgmjDef.cardcount;++i)
		{  
			this.handcard.push(this.node.getChildByName(`hand_majiang_${i}`));
		}  
		this.clear();
	} 
	//恢复游戏
	recover(  )
	{
		// body
		this.clear();  
		this.updateCards();
	} 
	updateCards(){ 
		this.updateHandCards();
	}   
 
	clear(){
		for(let i = 0;i<=QgmjDef.cardcount;++i)
		{
			this.handcard[i].active=false;
		}
	}  
	updateHandCards(  ){
		for (let i=0;i<this.model.offset;++i){
			var card=this.handcard[i]; 
			card.active= false;
		}

		for (let i=this.model.offset;i<this.handcard.length;++i){ 
			let value=this.model.player.handcard[i-this.model.offset];
			let card=this.handcard[i]; 
			card.active= (value !=null && value !=undefined);
		} 	 
	} 
 
	fapai(  )
	{
		// body 
		this.updateHandCards();
	} 
}
//c, 控制
@ccclass
export default class QgmjHandCardCtrl extends BaseCtrl {
	//这边去声明ui组件

	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离 
	@property
    seatId:Number = 0;
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
			onSeatChange:this.onSeatChange, 
			onSyncData:this.onSyncData, 
			'http.reqSettle':this.http_reqSettle,  
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
 
	onSyncData(  )
	{
		if (this.model.seatid==0){
			return
		}  
		// 恢复游戏
		this.model.recover();
		this.view.recover(); 
	}
 
	usersUpdated(  )
	{
		// body
		this.model.clear();
		this.view.clear();
		this.model.updateLogicId(); 
	} 
	onOp(msg) 
	{
		// body  
		if (msg.opseatid!=this.model.logicseatid ){ 
			return
		} 
		this.model.updateOffset()
		var op=QgmjDef.op_cfg[msg.event]
		if (op==QgmjDef.op_chupai ){ 
			this.op_chupai(msg) 
		}
		else if (op==QgmjDef.op_hu){
			this.op_hu(msg);
		}
	} 
	op_hu(msg){ 
		this.view.updateCards() 
	}
	onSeatChange(msg){ 
		// body
		if (this.model.logicseatid != QgmjLogic.getInstance().curseat){ 
			return;
		}
		this.view.updateCards(true) 
	}
	onProcess(msg){
		if (this.model.seatid==0){ 
			return
		}
		// body 
		if (msg.process==QgmjDef.process_fapai){ 
			this.process_fapai(msg);
		}
		else if (msg.process==QgmjDef.process_buhua){ 
			this.process_buhua(msg);
		}
		else if (msg.process==QgmjDef.process_ready){ 
			this.process_ready(); 
		}
	}
	http_reqSettle(msg){
		// body 
		this.view.clear();
	}
	process_ready(){
		// body
		this.model.clear();
		this.view.clear();
	}
	process_buhua(msg){
		// body  
		this.view.updateCards() 
	}
 
	op_chupai(msg){
		//收到出牌的指令了
		this.view.updateCards(); 
	}

    process_fapai(){
		if (this.model.seatid==0){ 
			return
		}
		this.view.fapai()  
	}
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
  
}