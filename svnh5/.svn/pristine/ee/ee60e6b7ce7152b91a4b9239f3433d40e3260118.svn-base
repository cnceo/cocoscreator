
/*
author: JACKY
日期:2018-01-11 18:49:15
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
import SssAudio from "../SssMgr/SssAudio";
 
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : SssSeatCtrl;
//模型，数据处理
class Model extends BaseModel{
	seatid=null;//视图座位
	uid=null; 
	logicseatid=null;//逻辑座位，服务器那边的座位
	userinfo=null;
	hucount=0;
	player=null;
	isZhuangJia=false;//庄家标记
	isMaster=false;//房主标记
	constructor()
	{
		super();

	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		node_panel:null,//
		node_remomentSet:null,//
		node_myCards:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
        this.node.zIndex=100;
		this.initUi();
	}
	//初始化ui
	initUi()
	{ 
   
	}

 
}
//c, 控制
@ccclass
export default class SssSeatCtrl extends BaseCtrl {
	//这边去声明ui组件
    @property(cc.Node)
    node_panel = null; 
    @property(cc.Node)
    node_remomentSet = null;
    @property(cc.Node)
    node_myCards = null;
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		this.initMvc(Model,View); 
		this.model.initSeat(this.seatId);
	}

	//定义网络事件
	defineNetEvents()
	{
        this.n_events={
			//网络消息监听列表
			'onEnterRoom':this.onEnterRoom,
			'onLeaveRoom':this.onLeaveRoom,
			onSyncData:this.onSyncData, 
			onProcess:this.onProcess,
			'http.reqUsers':this.http_reqUsers, 
        } 
	}
	//定义全局事件
	defineGlobalEvents()
	{  
		//全局消息	  
	}
	//绑定操作的回调
	connectUi()
	{
     
	}
	start () {
	}
	//网络事件回调begin
 
}