/*
author: YOYO
日期:2018-02-01 15:12:03
tip: 牛牛房间控制体
*/
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import QznnLogic from "../QznnMgr/QznnLogic";
import QznnConst from "../QznnMgr/QznnConst";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QznnRoomCtrl;
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
        this.myself=QznnLogic.getInstance().getPlayerInfo(this.mySeatId);
    }
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
    // model:Model = null
    private dict_readyTag:{} = null             //保存所有的准备标志
    private intervalID:number = null            
	ui={
        //在这里声明ui
        node_seatsConfig:null,
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
        this.ui.node_seatsConfig = ctrl.node_seatsConfig;
    }
}
//c, 控制
@ccclass
export default class QznnRoomCtrl extends BaseCtrl {
    view:View = null;
    model:Model = null;
    //这边去声明ui组件
    //nodes ----
    @property({
        type:cc.Node,
        displayName:"seatsConfig"
    })
    node_seatsConfig:cc.Node = null
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
        this.initMvc(Model,View);
        //初始化逻辑
        QznnLogic.getInstance().setSeatConfigs(this.ui.node_seatsConfig);
	}

	//定义网络事件
	defineNetEvents()
	{
        this.n_events={
			//网络消息监听列表
            'room.roomHandler.exitRoom':this.room_roomHandler_exitRoom,
			'http.reqDisbandRoom':this.http_reqDisbandRoom, 
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
	}
	start () {
        cc.director.setDisplayStats(false);
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
		QznnLogic.getInstance().toPlaza();
    }
    room_roomHandler_exitRoom(  ){
		// body
		//返回游戏选择界面,理论上还要释放资源
		QznnLogic.getInstance().toPlaza();
    }
    usersUpdated(){
		this.model.updateMyInfo();//更新我的信息
    } 

    
	//end
	//全局事件回调begin
	//end
    //按钮或任何控件操作的回调begin
    //end
}