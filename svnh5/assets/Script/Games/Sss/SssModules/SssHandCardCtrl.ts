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
import SssLogic from "../SssMgr/SssLogic";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import { SssDef } from "../SssMgr/SssDef";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : SssHandCardCtrl;
//模型，数据处理
class Model extends BaseModel{
	logicseatid=null;
	seatid=null;
	player=null; 
	constructor()
	{
		super();
		//在这里定义视图和控制器数据 
		this.logicseatid=null;
		this.clear(); 
	} 
 
	initSeat(seatid)
	{
		this.seatid=seatid; 
	} 
 
	updateLogicId(  ){
		// body 
		this.logicseatid=RoomMgr.getInstance().getLogicSeatId(this.seatid); 
		this.player=SssLogic.getInstance().players[this.logicseatid];  
	} 

    recover(  ){
		// body
		this.clear();
		this.player=SssLogic.getInstance().players[this.logicseatid];  
	} 
	clear()
	{  
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
		this.node.active=false; 
		this.initUi();
	}
	//初始化ui
	initUi()
	{  
		this.handcard=[];
		for(let i = 0;i<SssDef.cardcount;++i)
		{   
			this.handcard.push(this.node.getChildByName(`card_${i}`));
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
		for(let i = 0;i<SssDef.cardcount;++i)
		{
			this.handcard[i].active=false;
		}
	}  
	updateHandCards(  ){
 	 
	} 
 
	fapai(  )
	{
		// body 
		this.updateHandCards();
	} 
}
//c, 控制
@ccclass
export default class SssHandCardCtrl extends BaseCtrl {
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
	 
	}  
	onProcess(msg){
		if (this.model.seatid==0){ 
			return
		}
		// body 
		if (msg.process==SssDef.process_fapai){ 
			this.process_fapai();
		} 
		else if (msg.process==SssDef.process_ready){ 
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
 
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
  
}