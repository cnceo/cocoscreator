/*
author: YOYO
日期:2018-02-01 15:12:03
tip: 牛牛房间控制体
*/
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import BullLogic from "../BullMgr/BullLogic";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";
import BullConst from "../BullMgr/BullConst";
import BullCardsMgr from "../BullMgr/BullCardsMgr";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : BullRoomCtrl;
//模型，数据处理
class Model extends BaseModel{
    roomInfo:{
        bettype:null,
        gameid:null,
        gamestarted:null,
        id:null,
        matchid:null,
        owner:null,
        password:null,
        playercount:null,
        preparecount:null,
        roundcount:null,
        roundindex:null,
        seatcount:null
    } = null                            //请求到的房间信息
    roomid:number = null
    curRound:number = null              //当前局数
    mySeatId:number = null
    myPrepared:any = null
    myself:any = null

    time_startAni:number = null         //开始动画停留时间
	constructor()
	{
		super();
        this.time_startAni = 0.5;
    }
    
    updateMyInfo()
	{
		// body 
		this.mySeatId=RoomMgr.getInstance().getMySeatId();
		this.myPrepared=RoomMgr.getInstance().preparemap[this.mySeatId];
        this.myself=BullLogic.getInstance().getPlayerInfo(this.mySeatId);
    }
    
    updateMyPrepared(  )
	{
		// body
		this.myPrepared=RoomMgr.getInstance().preparemap[this.mySeatId]
	} 
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
    // model:Model = null
    private dict_readyTag:{} = null             //保存所有的准备标志
    private intervalID:number = null            
	ui={
        //在这里声明ui

        node_img_ready:null,
        node_img_startAni:null,
        node_btn_close:null,
        node_lbl_countDown:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
        this.initUi();
	}
	//初始化ui
	initUi()
	{
        this.ui.node_img_ready = ctrl.node_img_ready;
        this.ui.node_img_startAni = ctrl.node_img_startAni;
        this.ui.node_btn_close = ctrl.node_btn_close;
        this.ui.node_lbl_countDown = ctrl.node_lbl_countDown;
    }
    updateMyPrepared()
	{
		// body
        this.ui.node_img_ready.active = !this.model.myPrepared;
    }
    //控制准备按钮的显隐
    setReadyBtnShow(isShow:Boolean){
        this.ui.node_img_ready.active = isShow;
    }
    //显示开始动画
    showStartAni(cb:Function, target){
        this.ui.node_img_startAni.active = true;
        let act1 = cc.delayTime(this.model.time_startAni);
        let act2 = cc.callFunc(function(){
            this.ui.node_img_startAni.active = false;
            cb.call(target);
        }, this);
        this.ui.node_img_startAni.runAction(cc.sequence(act1, act2));
    }
    //显示倒计时
    showCountDown(time){
        this.ui.node_lbl_countDown.active = true;
        let curTime = time;
        this.intervalID = setInterval(()=>{
            this.ui.node_lbl_countDown.getComponent(cc.Label).string = curTime;
            if(curTime > 0){
                curTime -= 1;
            }else{
                this.clearCountDown();
            }
        }, 1000);
    }
    //清理倒计时
    clearCountDown(){
        this.ui.node_lbl_countDown.active = false;
        clearInterval(this.intervalID);
    }
}
//c, 控制
@ccclass
export default class BullRoomCtrl extends BaseCtrl {
    view:View = null;
    model:Model = null;
    //这边去声明ui组件
    //nodes ----
    @property({
        type:cc.Node,
        displayName:"readyImg"
    })
    node_img_ready:cc.Node = null
    @property({
        type:cc.Node,
        displayName:"startAniImg"
    })
    node_img_startAni:cc.Node = null
    @property({
        type:cc.Node,
        displayName:"closeBtn"
    })
    node_btn_close:cc.Node = null
    @property({
        type:cc.Node,
        displayName:"countDownLabel"
    })
    node_lbl_countDown:cc.Node = null
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
        this.initMvc(Model,View);
        //初始化逻辑
        BullLogic.getInstance()
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
			'http.reqDisbandRoom':this.http_reqDisbandRoom, 
            'http.reqRoomInfo':this.http_reqRoomInfo, 
        } 
        this.n_events[BullConst.clientEvent.onStart] = this.onStart;
        this.n_events[BullConst.clientEvent.onSettle] = this.onSettle_bull;
        this.n_events[BullConst.clientEvent.onProcess] = this.onProcess;
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
        this.connect(G_UiType.image, this.ui.node_btn_close, this.node_btn_close_cb, '点击关闭');
        this.connect(G_UiType.image, this.ui.node_img_ready, this.node_img_ready_cb, '点击准备');
	}
	start () {
        cc.director.setDisplayStats(false);
    }
    onPrepare(msg){
        if(msg.seatid == RoomMgr.getInstance().getMySeatId()){
            this.view.setReadyBtnShow(false);
        }
    }
    //网络事件回调begin
    http_reqRoomInfo() 
	{
        console.log("RoomMgr.getInstance().roomtype=",RoomMgr.getInstance().roomtype)
        
        this.model.roomInfo = RoomMgr.getInstance().roominfo;
        
		if(RoomMgr.getInstance().roomtype==1){ 
            //房卡
		}else if(RoomMgr.getInstance().roomtype==0){
            //金币场
        }
    }  
    http_reqDisbandRoom(){
		//解散房间
		//周边平台与子游戏间，子游戏与平台间的切换要统一管理
		this.start_module(G_MODULE.Plaza)
    }
    room_roomHandler_exitRoom(  ){
		// body
		//返回游戏选择界面,理论上还要释放资源
		this.start_module(G_MODULE.Plaza)
    }
    usersUpdated(){
		this.model.updateMyInfo();//更新我的信息
        this.model.updateMyPrepared();
        this.view.updateMyPrepared();
    } 
    //某个玩家离开
    onLeaveRoom(msg){
		var viewseatid=RoomMgr.getInstance().getViewSeatId(msg.seatid)
    }
    onProcess(msg){
        console.log('接收到进程消息onProcess= ',msg)
		if(msg.process==BullConst.process.start){ 
            //
		}else if(msg.process==BullConst.process.settle){
            this.view.setReadyBtnShow(true);
        }
	}
    onSyncData(  ){
        console.log('未知函数onSyncData')
		// body 
		// this.model.recover();
		// this.view.recover();
		// this.ui.lbl_cardcount.node.active=true
		// this.ui.lbl_shen.node.active=true
		// this.view.updateLeftCardCount();  
    }

    
    //process-----------------
    /*
    servertime_now:null,                //服务器时间
            servertime_next:null,               //服务器时间
            curRounds:null,                     //当前的局数
    */
    onStart(msg){
        console.log('game start',msg)
        this.view.clearCountDown();
        let intervalTime = Math.ceil((msg.servertime_next - Date.now())/1000);
        this.view.showCountDown(intervalTime);
    }
    /*结算
    winSeatId:null,                     //胜利的座位id
            scoreInfo:null,                     //胜利的相关信息（输赢分值）{}
            servertime_now:null,                //服务器时间(客户端同步时间并计算间隔)
            servertime_next:null,               //服务器时间(客户端同步时间并计算间隔)
            dict_notTanPai:null                 //没有摊牌的玩家列表
    scoreInfo = {1:10}
    */
    onSettle_bull(msg){
        console.log('game onSettle_bull',msg)

        this.view.clearCountDown();
    }
	//end
	//全局事件回调begin
	//end
    //按钮或任何控件操作的回调begin
    private node_btn_close_cb(){
        console.log('node_btn_close---')

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
    }
    //点击准备
    private node_img_ready_cb(event){ 
        event.active = false;
        RoomMgr.getInstance().prepare();
        // this.view.showStartAni(this.onStartGame, this);

        // onGiveCards_bull
        //test
        // RoomMgr.getInstance().send_msg('room.roomHandler.playerOp', {oprType:BullConst.oprEvent.oprPrepare});
    }
    //end

    onDestroy(){
        this.view.clearCountDown();
        super.onDestroy();
    }
}