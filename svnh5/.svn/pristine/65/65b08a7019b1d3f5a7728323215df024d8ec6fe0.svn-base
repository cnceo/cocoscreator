/*
author: JACKY
日期:2018-01-11 15:29:26
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
import SssResMgr from "../SssMgr/SssResMgr";
import SssAudio from "../SssMgr/SssAudio";
 
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : SssRoomCtrl;
//模型，数据处理
class Model extends BaseModel{ 
	mySeatId=null;
	myPrepared=null;
	myself=null; 
	jin=null;
	listen_flag=false;
	seatcount=0;
	constructor()
	{
		super();
		this.seatcount=RoomMgr.getInstance().getSeatCount();
	}
	
	updateMyInfo(  )
	{
		// body 
		this.mySeatId=RoomMgr.getInstance().getMySeatId();
		this.myPrepared=RoomMgr.getInstance().preparemap[this.mySeatId] 
		this.myself=SssLogic.getInstance().players[this.mySeatId]
	}  
 
	updateMyPrepared(  )
	{
		// body
		this.myPrepared=RoomMgr.getInstance().preparemap[this.mySeatId] 
	} 
 
	clear(  )
	{ 
	}  
	recover(  )
	{
		// body
		this.clear();
		this.jin=SssLogic.getInstance().jin;
	} 
 
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		prepareFlags:null,
		btn_prepare:null, 
		lbl_roundcount:null,
		lbl_roundindex:null,
		lbl_roomid:null, 
		btn_exit:null,
		btn_help:null, 
		node_prepared:null,
	};
	//private node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.ui.prepareFlags={}
		this.showComponents();
		this.initUi();
	}
	updatePrepareFlag(viewseatid,bPrepared)
	{
		this.ui.prepareFlags[viewseatid].active=bPrepared;
	}
	showComponents(){
        var rpparr=[
		  
        ]
        var prefabarr=[ 
		]
		this.ui.node_prepared=ctrl.node_prepared;
		for(let i=0;i<rpparr.length;++i)
		{ 
			var rppnode=rpparr[i];
			var prefab=prefabarr[i]; 
			let prefabNode = cc.instantiate(prefab); 
			prefabNode.setPosition(rppnode.position);
			this.node.addChild(prefabNode);
		}
		for(let i=0;i<this.model.seatcount;++i)
		{ 
			this.ui.prepareFlags[i]=this.ui.node_prepared.getChildByName(`img_prepared_${i}`)
		} 
	}
	//初始化ui
	initUi()
	{ 
		this.ui.btn_prepare=ctrl.btn_prepare;  
		this.ui.lbl_roundcount=ctrl.lbl_roundcount; 
		this.ui.lbl_roundindex=ctrl.lbl_roundindex;
		this.ui.lbl_roomid=ctrl.lbl_roomid;   
		this.ui.btn_exit=ctrl.btn_exit;
		this.ui.btn_help=ctrl.btn_help;   
		for(var seatid =0;seatid<this.model.seatcount;++seatid)
		{
			var viewseatid=RoomMgr.getInstance().getViewSeatId(seatid);
			var flag=this.ui.prepareFlags[viewseatid] 
			flag.active=RoomMgr.getInstance().preparemap[seatid];
 
		} 
		switch(RoomMgr.getInstance().roomstate)
		{ 
            case G_ROOMSTATE.oncemore: 
                
				this.ui.btn_prepare.active=false;
			break;
			default: 
				this.ui.btn_prepare.active=!this.model.myPrepared  
			break;
		} 
	}    
	updateRoomId(){
		var roominfo=RoomMgr.getInstance().roominfo;
		this.ui.lbl_roomid.node.active=true 
		console.log("updateRoomId {roominfo=",roominfo)
		this.ui.lbl_roomid.string= `房间号:${roominfo.password}`;
	} 
	recover(  ){
		// body
		this.clear(); 
	}
 
	//清除
	clear()
	{
		// body
		//this.ui.mjpoint.active=false 
		for (var seatid =0;seatid<4;seatid++)
		{
			this.ui.prepareFlags[seatid].active=false
		} 
	}  
	initDirectionBg()
	{
		var realUrl = cc.url.raw('resources/Games/Sss/MaJiang3d/Clock/game_direction_'+this.model.mySeatId + '.png');
		var texture = cc.loader.getRes(realUrl);
		this.node.getChildByName('Prefab_Clock3D').getChildByName('directionBg').getChildByName('game_direction').getComponent(cc.Sprite).spriteFrame.setTexture(texture);
	}
  

	//显示流局
	drawGame(  )
	{
		// // body
		// var msg=this.model.curOp; 
		// var filename='effects/abort'; 
		// var effect=this.loadCsb(filename) 
		// var effectnode=this.ui.effectnodes[4] 
		// effectnode:addChild(effect) 
		// var action=this.loadAction(filename)  
		// effect:runAction(action)
		// action:play("show",false);
		// var cb=function (  )
		// 	// body
		// 	effect:removeFromParent();
		// end
		// action:setFrameEventCallFunc(cb) 
	}  
}
//c, 控制
@ccclass
export default class SssRoomCtrl extends BaseCtrl {
	//这边去声明ui组件 
    @property(cc.Node)
	btn_prepare=null; 
    @property(cc.Label)
	lbl_roundcount=null;
    @property(cc.Label)
	lbl_roundindex=null;
    @property(cc.Label)
	lbl_roomid=null;   
    @property(cc.Node)
	btn_exit=null;
    @property(cc.Node)
	btn_help=null;

    @property({
		tooltip : "麻将界面设置按钮",
		type : cc.Node
	})
	btn_setting : cc.Node = null;
     
    // @property({
	// 	tooltip : "麻将界面设置预制资源",
	// 	type : cc.Prefab
	// })
	// Prefab_Setting : cc.Prefab = null;
    @property({
		tooltip : "结算界面预制资源",
		type : cc.Prefab
	})
	// Prefab_Settlement : cc.Prefab = null;

   
 

	@property(cc.Prefab)
	Prefab_deposit=null;


  

	@property(cc.Prefab)
	Prefab_Chat=null;
	

 


   
	//四个准备标志
	@property(cc.Node)
	node_prepared=null; 
	 
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离 

	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this; 
		
		
		this.initMvc(Model,View); 

		//在这里先生成对象，否则怕监听不到数据
		SssLogic.getInstance(); 
		
	}

	

	//定义网络事件
	defineNetEvents()
	{
        this.n_events={
			//网络消息监听列表
			'onLeaveRoom':this.onLeaveRoom, 
			'onPrepare':this.onPrepare,                  
			'room.roomHandler.exitRoom':this.room_roomHandler_exitRoom,
			onSyncData:this.onSyncData,
			onProcess:this.onProcess,
			onOp:this.onOp,     
			'http.reqSettle':this.http_reqSettle, 
			'http.reqRoomInfo':this.http_reqRoomInfo,
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
		this.connect(G_UiType.image,this.ui.btn_exit,this.btn_exit_cb,'退出')   
        this.connect(G_UiType.image, this.btn_prepare, this.btn_prepare_cb, '点击准备')
		this.connect(G_UiType.image, this.btn_setting, this.btn_setting_cb, '点击设置') 
	}
	start () { 
		SssAudio.getInstance();//声音启动
		SssAudio.getInstance().playMusic('res/raw-assets/resources/audio/Games/qzmj/yxbg.mp3');
		if (RoomMgr.getInstance().roomstate==G_ROOMSTATE.nomal) {  
			RoomMgr.getInstance().enterRoom()
		}
		else if (RoomMgr.getInstance().roomstate==G_ROOMSTATE.recover) {  
			RoomMgr.getInstance().recoverRoom();
		}
		else  if (RoomMgr.getInstance().roomstate==G_ROOMSTATE.fangka) { 
			RoomMgr.getInstance().enterRoom()
		}
		else  if (RoomMgr.getInstance().roomstate==G_ROOMSTATE.ownerrecover) { 
			RoomMgr.getInstance().enterRoom()
		}
		else  if (RoomMgr.getInstance().roomstate==G_ROOMSTATE.owneback) { 
			RoomMgr.getInstance().ownerBack()
		}
		 
	}
	//网络事件回调begin 
 
	http_reqRoomInfo() 
	{ 
		if(RoomMgr.getInstance().roomtype==1){ 
			this.view.updateRoundInfo();
			this.view.updateRoomId()
		}
	}  
	
	onSyncData(  ){
		// body 
		this.model.recover();
		this.view.recover();
		this.ui.lbl_cardcount.node.active=true
		this.ui.lbl_shen.node.active=true  
	}
 


	room_roomHandler_exitRoom(  ){
		// body
		//返回游戏选择界面,理论上还要释放资源
		this.start_module(G_MODULE.Plaza)
	}
	usersUpdated(){
	 
		this.model.updateMyInfo();//更新我的信息
		this.updateMyPrepared();//更新我的装备状态
		this.model.clear();
		this.view.clear(); 
		this.view.initUi();
	} 
	onOp(msg){
		// body   
		var op=SssDef.op_cfg[msg.event]
		if (op == SssDef.op_chupai){  
 
		} 
		else
		{ 
			this.view.newOp();
			//显示点炮
			if (op==SssDef.op_hu){ 
				var huinfo=SssLogic.getInstance().huinfo;
				if (huinfo.hutime == SssDef.hutime_dianpao){ 
					this.view.showDianPao();
				}
			}
		}
	} 
	updateMyPrepared(  ){
		// body
		this.model.updateMyPrepared();
		this.ui.btn_prepare.active= !this.model.myPrepared 
	}
	
	onPrepare(msg)
	{
		var viewseatid=RoomMgr.getInstance().getViewSeatId(msg.seatid)
	    this.view.updatePrepareFlag(viewseatid,true); 
		if(msg.seatid==this.model.mySeatId){ 
			this.updateMyPrepared();
		} 

	}
	http_reqSettle(  ){
		// body 
		if (null == SssLogic.getInstance().win_seatid ){
			this.view.drawGame(); 
		}
 		this.start_sub_module(G_MODULE.SssSettle);//显示结算 
	}
	onProcess(msg){ 
		if (msg.process==SssDef.process_fapai ){  
		 
		}
		else if( msg.process==SssDef.process_ready){ 
			this.process_ready(); 
		} 
	}
	 
	process_ready(){
		// body
		this.model.clear();
		this.view.clear();
	}
	onLeaveRoom(msg){
		var viewseatid=RoomMgr.getInstance().getViewSeatId(msg.seatid)
		this.ui.prepareFlags[viewseatid].active=false
	}
	 

	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_setting_cb () : void {
		 this.start_sub_module(G_MODULE.RoomSetting);
		// let node = cc.instantiate(this.Prefab_Setting);
		// cc.find("Canvas").addChild(node);
	}
	 
	btn_prepare_cb( ){ 
		RoomMgr.getInstance().prepare()
 
	}  
	btn_help_cb(){
		console.log("房间帮助")
	}
	panel_round_cb(){
		console.log("查看房间玩法")
	}
	btn_exit_cb( ){ 
		
	 
		let  roominfo = RoomMgr.getInstance().roominfo;
		let owner=roominfo.owner; 
		if (RoomMgr.getInstance().bGameIsStated) {
			if (owner!=0){ 
				RoomMgr.getInstance().applyDissolutionRoom();
			 
			}
			else{
				var okcb=function(  )
				{
					// body
					RoomMgr.getInstance().exitRoom()
				}
	
				FrameMgr.getInstance().showDialog('游戏已经开始了,此时退出游戏,你的牌局将交由机器管家代打,输了怪我咯!',okcb.bind(this)); 
				
			}
			return; 
		}
		else{  
			if (owner==UserMgr.getInstance().getUid()){
				var okcb=function(  )
				{
					// body
					RoomMgr.getInstance().disbandRoom() 
				}
				FrameMgr.getInstance().showDialog('开局前退出将解散房间,不消耗房卡!',okcb.bind(this));  
				return;
			}
		}
		RoomMgr.getInstance().exitRoom()
		//卸载音效
		SssAudio.getInstance().uncacheAll();
	}  
}