import BaseMgr from "../../../Plat/Libs/BaseMgr";
import QznnPlayer from "./QznnPlayer";
import QznnConst from "./QznnConst";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";

/** 
 * auto : yoyo
 * 通比牛牛的逻辑
*/

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
export default class QznnLogic extends BaseMgr{
    private seatcount:number = null
    private players:{} = null
    private seatConfigs:cc.Node = null
    private curDealerLogicSeatId:number = null                  //当局庄家的座位ID
    constructor(){
        super();

        this.players={};  
        this.seatcount=4;//座位个数  
        //创建四个角色
        for (var i = 0; i<this.seatcount; i++)
        {
            this.players[i]=new QznnPlayer();
            this.players[i].init(i,this)
        }  

        this.routes={ 
            onSyncData:this.onSyncData,
        }
        this.routes[QznnConst.clientEvent.onConfirmDealer] = this.onConfirmDealer;
        this.routes[QznnConst.clientEvent.onProcess] = this.onProcess;
        this.routes['onPrepare'] = this.onPrepare;
    }
    //清理数据
    clear (){
        this.curDealerLogicSeatId = null;
    }

    //====================网络操作

    //请求抢庄
    reqGrab(isGrab:Boolean){
        let grabIndex = isGrab ? 1 : 0;
        this.notify_msg('room.roomHandler.playerOp', {
            oprType:QznnConst.oprEvent.oprGrabDealer,
            isGrab:grabIndex
        });
    }
    //请求摊牌
    reqTanpai(){
        this.notify_msg('room.roomHandler.playerOp', {oprType:QznnConst.oprEvent.oprTanPai});
    }

    //==========================模块之间的交互

    //通知模块，显示当前的牌型结果
    emit_showResultType(data){
        G_FRAME.globalEmitter.emit('modules_showResultType', data);
    }

    //======================= 动态打开某个模块

    //打开选择是否抢庄的模块
    openChooseGrab(){
        this.start_sub_module(G_MODULE.Bull_chooseGrab);
    }
    //打开结算界面模块
    openSettle (cb){
        this.start_sub_module(G_MODULE.Bull_settle, cb);
    }
    //打开算牌ui模块
    openCalculate(cb){
        this.start_sub_module(G_MODULE.Bull_calculate, cb);
    }
    //打开是否抢庄的预制体
    addGrabFlag(cb){
        this.start_sub_module(G_MODULE.qznn_grabFlag, cb);
    }
    //返回大厅平台
    toPlaza(){
        this.start_module(G_MODULE.Plaza);
    }

    //=========================

    //网络事件监听
    onSyncData(msg){
        console.log('===================')
        console.log(msg)
    }
    //接收到确认庄家的消息
    onConfirmDealer(msg){
        this.curDealerLogicSeatId = msg.dealerSeatId;
    }
    //有玩家准备
    onPrepare(msg){
        if(msg.seatid == RoomMgr.getInstance().getMySeatId()){
            //自己准备，清理所有上一局的表现
            this.clear();
        }
    }
    //进程管理
    onProcess(msg){
        if(msg.process==QznnConst.process.start){ 
            //游戏重新开始
            this.clear();
		}else if(msg.process==QznnConst.process.grabDealer){
            //开始抢庄
        }else if(msg.process==QznnConst.process.chooseChip){
            //开始下注
        }
    }

    //=======================+

    setSeatConfigs (seatsNode:cc.Node){
        this.seatConfigs = seatsNode;
    }

    //================

    //获取对应人数下的节点配置列表
    getSeats (){
        let configNode = this.seatConfigs.getChildByName('seats_'+this.seatcount);
        if(configNode){
            return configNode.children;
        }else{
            return [];
        }
    }
    //获取玩家信息
    getPlayerInfo (seatId:number){
        return this.players[seatId];
    }
    //自己是不是庄家
    getIsDealer (){
        return Boolean(this.curDealerLogicSeatId == RoomMgr.getInstance().getMySeatId());
    }
    //获取庄家的座位id
    getDealerViewSeatId (){
        return RoomMgr.getInstance().getViewSeatId(this.curDealerLogicSeatId);
    }

    //单例处理
    private static _instance:QznnLogic;
    public static getInstance ():QznnLogic{
        if(!this._instance){
            this._instance = new QznnLogic();
        }
        return this._instance;
    }
}