
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
import QgmjLogic from "../QgmjMgr/QgmjLogic";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import { QgmjDef } from "../QgMjMgr/QgmjDef";
import QgmjResMgr from "../QgmjMgr/QgmjResMgr";

 
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QgmjHuaCtrl;
//模型，数据处理
class Model extends BaseModel{
	seatid=null;//视图座位
	uid=null; 
	logicseatid=null;//逻辑座位，服务器那边的座位
	 
	hucount=0;
	player=null;
	 
	constructor()
	{
		super();

	}
  
	initSeat(id)
	{
		this.seatid=id;  
	}
    //找到屏幕拥有者的逻辑坐标  
	clear(  )
	{
		// body
		this.uid=null;
	}  

	updateLogicId(  )
	{
		// body
		this.logicseatid=RoomMgr.getInstance().getLogicSeatId(this.seatid); 
		this.player=QgmjLogic.getInstance().players[this.logicseatid]; 
		this.uid=RoomMgr.getInstance().users[this.logicseatid]; 
	}  
 
	recover()
	{ 
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		huaarr:[],
		
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
		for(let i = 0;i<QgmjDef.huacount;++i)
		{   
			let huanode=this.node.getChildByName(`hua_${i}`);
			this.ui.huaarr.push(huanode); 
		}   
		this.clear();
	} 
	//清除
	clear( )
	{ 
		for(let i = 0;i<this.ui.huaarr.length;++i)
		{  
			this.ui.huaarr[i].active=false;  
		}  
	}  
	showHua()
	{
		// body
		//this.ui.node_hua.setVisible(true)
	} 
	updateHua()
	{
		// body 
		let index=0;
		for(let hua in this.model.player.huapais)
		{ 
			var huanode=this.ui.huaarr[index]
			let texture = QgmjResMgr.getInstance().getHuaIconTexture(hua); 
			console.log()
         	let frame = new cc.SpriteFrame(texture); 
			huanode.getComponent(cc.Sprite).spriteFrame = frame;  
			huanode.active=true; 
			index++;
		}
 
	} 
}
//c, 控制
@ccclass
export default class QgmjHuaCtrl extends BaseCtrl {
	//这边去声明ui组件
    @property
    seatId:Number = 0;
     
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
			'onLeaveRoom':this.onLeaveRoom,
			onSyncData:this.onSyncData,
			onSeatChange:this.onSeatChange, 
			onProcess:this.onProcess,
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
 
	onSyncData(msg)
	{
		// body 
		this.model.recover(); 
		this.view.showHua();
		this.view.updateHua() 
	} 
	onProcess(msg)
	{ 
        if(msg.process==QgmjDef.process_buhua){
			this.process_buhua(); 
		}
	} 
	onSeatChange(  )
	{
		// body 
		if (this.model.logicseatid != QgmjLogic.getInstance().curseat){ 
			return;
		} 
		this.view.updateHua()
	} 
	process_buhua(  )
	{
		// body
		this.view.updateHua();
	}
	usersUpdated()
	{
		// body
	   this.model.updateLogicId();
	   this.view.clear(); 
	} 
 
 
	onLeaveRoom(msg){ 
		if (this.model.logicseatid==msg.seatid){
			this.model.clear(); 
			this.view.clear();
		}
	}
  

	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
	showUserDetail()
	{
		// body
		if (this.model.uid!=null){ 
			var ctrl=this.start_sub_module(G_MODULE.mj_playerInfo, (uiCtrl)=>{
				this.model.userinfo['seatId'] = this.model.logicseatid;
                uiCtrl.setInfo(this.model.userinfo);
            })
		}
	} 
}