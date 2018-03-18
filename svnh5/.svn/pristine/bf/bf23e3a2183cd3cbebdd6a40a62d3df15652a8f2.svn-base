import BaseMgr from "../../../Plat/Libs/BaseMgr";
import BullPlayer from "./BullPlayer";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import BullConst from "./BullConst";

//牛牛管理器
interface t_userInfo {
    bettype:number,
    bowner:any,
    gameid:number,
    gamestarted:any,
    id:number,
    inroom:any,
    password:number,
    prepared:any,
    rid:number,
    roundcount:number,
    seatcount:number,
    seatid:number,
    verified:any
}
export default class BullLogic extends BaseMgr {
    private seatcount:number = null
    private players:{} = null
    //=================逻辑控制值
    isGrab:Boolean = null                   //是否可以抢庄
    isGoldModel:Boolean = null              //是否是金币场(分金币场和房卡场)
    constructor()   
    {
        super();
        // this.maxoptime=12; 
        this.players={};  
        this.seatcount=4;//座位个数  
        //创建四个角色
        for (var i = 0; i<this.seatcount; i++)
        {
            this.players[i]=new BullPlayer();
            this.players[i].init(i,this)
        }  

        this.routes={ 
        //     onProcess:this.onProcess,   
        //     onEvent:this.onEvent, 
        //     onSeatChange:this.onSeatChange,
        //     onOp:this.onOp, 
            onSyncData:this.onSyncData,
        //     'onGameFinished':this.onGameFinished,
        //     'http.reqSettle':this.http_reqSettle, 
        }
        // this.resetData();
    }

    //===============发送数据

    sendTanpai(){
        this.notify_msg('room.roomHandler.playerOp', {oprType:BullConst.oprEvent.oprTanPai});
    }

    //==============

 
    syncData(  )
    {
        // body
        this.notify_msg('room.roomHandler.syncData',null)
    } 

    onSyncData(msg){
        console.log('===================')
        console.log(msg)
    }

    //获取玩家信息
    getPlayerInfo (seatId:number){
        return this.players[seatId];
    }

    //获取是否可以抢庄
    getIsCanGrab(){
        return this.isGrab;
    }
    //是否是金币场
    getIsGoldModel(){
        return this.isGoldModel;
    }

    //单例处理
    private static _instance:BullLogic;
    public static getInstance ():BullLogic{
        if(!this._instance){
            this._instance = new BullLogic();
        }
        return this._instance;
    }
}
