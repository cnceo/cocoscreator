/*
author: JACKY
日期:2018-01-12 16:09:19
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
import {g_deepClone} from "../../../Plat/Libs/Gfun";
import QgmjResMgr from "../QgmjMgr/QgmjResMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QgmjSettleCardCtrl;
//模型，数据处理
class Model extends BaseModel{
	seatid=null;//视图座位 
	logicseatid=null;//逻辑座位，服务器那边的座位 
	player=null;
	offset=0;//麻将起始位置偏移 
	constructor()
	{
		super(); 
	}
	clear(){
		this.offset=0; 
	}
	updateLogicId(  ){
		// body 
		this.logicseatid=RoomMgr.getInstance().getLogicSeatId(this.seatid); 
		this.player=QgmjLogic.getInstance().players[this.logicseatid];  
		console.log("QgmjSettleCardCtrl this.logicseatid=",this.logicseatid,this.seatid)
	} 
 
	updateOffset(){
		this.offset=this.player.opcards.length*3;
	}
	initSeat(id)
	{
		this.seatid=id;  
	} 
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		handcard:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
	}
	clear(){
		this.node.active=false;
	}
	//初始化ui
	initUi()
	{
		this.ui.handcard=[]; 
		for(var i = 0;i<=QgmjDef.cardcount;++i)
		{  
			this.ui.handcard.push(this.node.getChildByName(`hand_majing_${i}`));
		}  
	}
	showDownHandCard()
	{ 
		for (let i=0;i<this.model.offset;++i){
			var card=this.ui.handcard[i]; 
			card.active= false;
		} 
		for (let i=this.model.offset;i<this.ui.handcard.length;++i){ 
			let value=this.model.player.handcard[i-this.model.offset];
			let cardNode=this.ui.handcard[i]; 
			let active = (value !=null && value !=undefined);
			cardNode.active=active
			if(active)
			{
				var texture = QgmjResMgr.getInstance().getCardTextureByValue(value);
				var spriteFrame = new cc.SpriteFrame(texture);
				cardNode.getChildByName("sign").getComponent(cc.Sprite).spriteFrame = spriteFrame;
			}
		} 	 
	}
}
//c, 控制
@ccclass
export default class QgmjSettleCardCtrl extends BaseCtrl {
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
		this.node.active = false;
	}

	//定义网络事件
	defineNetEvents()
	{
        this.n_events={
			//网络消息监听列表
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
	usersUpdated(  )
	{
		// body
		this.model.clear();
		this.view.clear();
		this.model.updateLogicId(); 
	} 
    //游戏结算
    http_reqSettle(msg)
    {
		this.node.active = true;  
		this.model.updateOffset(); 
		this.view.showDownHandCard();
	}
	
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
}
