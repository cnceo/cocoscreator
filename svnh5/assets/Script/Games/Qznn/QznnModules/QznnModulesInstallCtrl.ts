/*
author: YOYO
日期:2018-03-02 11:25:04
牛牛模块初始安装
*/
import BaseModel from "../../../Plat/Libs/BaseModel";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import QznnCardsMgr from "../QznnMgr/QznnCardsMgr";
import QznnConst from "../QznnMgr/QznnConst";
import QznnLogic from "../QznnMgr/QznnLogic";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : BullModulesInstallCtrl;
let CardsMgr : QznnCardsMgr;
//模型，数据处理
class Model extends BaseModel{
    resultGoldUpH:number = null         //移动的高度
	constructor()
	{
		super();
        this.resultGoldUpH = 100;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
    private node_resultGold:cc.Node = null
    private node_cardResultType:cc.Node = null

	ui={
        //在这里声明ui
        node_parent_bg:null,
        node_parent_seat:null,
        node_parent_upUi:null,
        //===
        prefab_roomInfo:null,
        prefab_resultGold:null,
        prefab_readyContainer:null,
        prefab_resultType:null,
        node_seatContainer:null,
        prefab_seatCtrl:null,
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
        this.ui.node_parent_bg = ctrl.node_parent_bg;
        this.ui.node_parent_seat = ctrl.node_parent_seat;
        this.ui.node_parent_upUi = ctrl.node_parent_upUi;
        this.ui.prefab_roomInfo = ctrl.prefab_roomInfo;
        this.ui.prefab_resultGold = ctrl.prefab_resultGold;
        this.ui.prefab_readyContainer = ctrl.prefab_readyContainer;
        this.ui.prefab_resultType = ctrl.prefab_resultType;
        this.ui.node_seatContainer = ctrl.node_seatContainer;
        this.ui.prefab_seatCtrl = ctrl.prefab_seatCtrl;
    }

    initModules(cb:Function){
        //将玩家座位安装到对应的位置上

        //add room info
        let curNode = cc.instantiate(this.ui.prefab_roomInfo);
        curNode.parent = this.ui.node_parent_bg;
        //add result gold layer
        this.node_resultGold = cc.instantiate(this.ui.prefab_resultGold);
        this.node_resultGold.parent = this.ui.node_parent_seat;
        //add ready
        curNode = cc.instantiate(this.ui.prefab_readyContainer);
        curNode.parent = this.ui.node_parent_seat;
        //add cardResultType
        this.node_cardResultType = cc.instantiate(this.ui.prefab_resultType);
        this.node_cardResultType.parent = this.ui.node_parent_seat;
        cb();
        cb = null
    }

    //===================result gold

    //根据位置显示结算后的金币
    showOneResultGold(viewSeatId:number, value){
        let targetNode = this.node_resultGold.children[viewSeatId];
        if(targetNode){
            value = parseInt(value);
            if(value > 0) value = '+'+value;
            targetNode.getComponent(cc.Label).string = value;
            this.playResultGoldAni(targetNode);
        }
    }
    getResultGoldCount ():number{
        return this.node_resultGold.children.length;
    }
    getResultGold (){
        return this.node_resultGold
    }

    //========================card result type

    /**
     * 显示结果牌型
     * @param viewSeatId 界面上设置的id，从0开始
     * @param value 需要显示的牌型值
     */
    showResultType(viewSeatId:number, value){
        let typeNode = this.node_cardResultType.children[viewSeatId];
        if(typeNode){
            typeNode.active = true;
            let target = typeNode.children[0].children[0];
            target.getComponent(cc.Label).string = CardsMgr.getTypeName(value);
        }
    }
    //隐藏所有的牌型结果体现
    hideAllResultType(){
        let nodeList = this.node_cardResultType.children;
        for(let i = 0; i < nodeList.length; i ++){
            nodeList[i].active = false;
        }
    }

    //===========================

    private installSeats (){
        let seats = QznnLogic.getInstance().getSeats();
        for(let i = 0; i < seats.length; i ++){
            let curNode = cc.instantiate(this.ui.prefab_seatCtrl);
            curNode.parent = this.ui.node_parent_seat;
        }
    }

    //播放金币结果的特效
    private playResultGoldAni(curNode:cc.Node){
        curNode.active = true;
        if(!curNode['_initPosY']) curNode['_initPosY'] = curNode.y;
        else curNode.y = curNode['_initPosY'];
        curNode.scale = 0.2;
        let time1 = 0.5;
        let act1 = cc.moveTo(time1, curNode.x, curNode.y + this.model.resultGoldUpH);
        let act2 = cc.scaleTo(time1, 1);
        let act3 = cc.delayTime(time1+0.5);
        let act4 = cc.callFunc(function(){
            curNode.active = false;
        }, this);
        curNode.runAction(cc.spawn(act1, act2));
        curNode.runAction(cc.sequence(act3, act4));
    }

}
//c, 控制
@ccclass
export default class BullModulesInstallCtrl extends BaseCtrl {
    view:View = null
    model:Model = null
    //这边去声明ui组件
    @property({
        type:cc.Node,
        displayName:"background"
    })
    node_parent_bg:cc.Node = null
    @property({
        type:cc.Node,
        displayName:"seatParent"
    })
    node_parent_seat:cc.Node = null
    @property({
        type:cc.Node,
        displayName:"upUi"
    })
    node_parent_upUi:cc.Node = null
    @property({
        type:cc.Node,
        displayName:"seatContainer"
    })
    node_seatContainer:cc.Node = null
    //===================
    @property({
        type:cc.Prefab,
        displayName:"roomInfo"
    })
    prefab_roomInfo:cc.Prefab = null
    @property({
        type:cc.Prefab,
        displayName:"resultGold"
    })
    prefab_resultGold:cc.Prefab = null
    @property({
        type:cc.Prefab,
        displayName:"readyContainer"
    })
    prefab_readyContainer:cc.Prefab = null
    @property({
        type:cc.Prefab,
        displayName:"resultType"
    })
    prefab_resultType:cc.Prefab = null
    @property({
        type:cc.Prefab,
        displayName:"seatPrefab"
    })
    prefab_seatCtrl:cc.Prefab = null
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
        CardsMgr = QznnCardsMgr.getInstance();
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model,View);
	}

	//定义网络事件
	defineNetEvents()
	{
        this.n_events = {
            'onSettle_bull':this.onSettle_bull
        }
        this.n_events[QznnConst.clientEvent.onTanPai] = this.onTanPai;
        this.n_events['onPrepare'] = this.onPrepare;
	}
	//定义全局事件
	defineGlobalEvents()
	{
        this.g_events = {
            modules_showResultType:this.onShowResultType
        }
	}
	//绑定操作的回调
	connectUi()
	{
	}
	start () {
        this.view.initModules(()=>{
            //test 应该走在ui请求结束后
            this.startGame();
        })
    }
    //网络事件回调begin
    //当有人发起了准备
    onPrepare(msg){
        if(msg.seatid == RoomMgr.getInstance().getMySeatId()){
            //自己准备，清理所有上一局的表现
            this.view.hideAllResultType();
        }
    }
    /*结算
    winSeatId:null,                     //胜利的座位id
            scoreInfo:null,                     //胜利的相关信息（输赢分值）{}
            servertime_now:null,                //服务器时间(客户端同步时间并计算间隔)
            servertime_next:null,               //服务器时间(客户端同步时间并计算间隔)
    scoreInfo = {1:10}
    dict_notTanPai
    */
   onSettle_bull(msg){
        //将没有摊牌的玩家摊牌
        let resultObj;
        for(let logicId in msg.dict_notTanPai){
            resultObj = msg.dict_notTanPai[logicId];
            if(resultObj){
                this.view.showResultType(RoomMgr.getInstance().getViewSeatId(logicId), resultObj.resultType);
            }
        }
        //显示金币获取结果
        let resultList = [];
        for(let logicId in msg.scoreInfo){
            resultList.push({
                viewSeatId:RoomMgr.getInstance().getViewSeatId(logicId),
                goldValue: msg.scoreInfo[logicId]
            })
        }
        console.log('显示结算金币信息', resultList)
        this.showGoldsResult(resultList);
    }
    /*有人摊牌
    seatId:null,                        //摊牌玩家的位置id
            cardLogicIdList:null                //摊牌玩家手上的牌列表
            resultType:null,                    //结果类型，牛几
    */
   onTanPai(msg){
        console.log('onTanPai=== ',msg)
        let Room = RoomMgr.getInstance();
        let myViewSeatId = Room.getViewSeatId(msg.seatId);
        this.view.showResultType(myViewSeatId, msg.resultType);
    }

	//end
    //全局事件回调begin
    //显示结果
    onShowResultType(msg){
        console.log('全局显示卡牌类型结果= ', msg)
        let type = msg;
        let Room = RoomMgr.getInstance();
        let myViewSeatId = Room.getViewSeatId(Room.getMySeatId());
        this.view.showResultType(myViewSeatId, type);
    }
	//end
	//按钮或任何控件操作的回调begin
    //end

    //显示金币结果数值信息(+积分 -积分)
    showGoldsResult(dataList){
        let i,
            data;
        for(i = 0; i < dataList.length; i ++){
            data = dataList[i];
            this.view.showOneResultGold(data.viewSeatId, data.goldValue);
        }
    }
    
    //初始模块全部安装，事件处理，只限于座位相关数据
    private initModules(){
        /*
        房间信息
        座位
        卡牌存放层
        金币结算飘动效果
        玩家准备图标
        卡牌结算类型展示
        单一图标层
        发牌节点层
        准备按钮
        金币存放层
        */
    }
    //加载组件完成，开始游戏
    private startGame(){
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
    }
}