/*
author: JACKY
日期:2018-01-22 17:10:38
*/
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import ModuleMgr from "../../../Plat/GameMgrs/ModuleMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import QgmjLogic from "../QgmjMgr/QgmjLogic";
import GameDetailresultCtrl from "./Prefab_GameDetailresultCtrl";
import QgmjAudio from "../QgmjMgr/QgmjAudio";
import {g_deepClone} from "../../../Plat/Libs/Gfun";
import { QgmjDef } from "../QgmjMgr/QgmjDef";

let Green = cc.color(24,221,40),Red = cc.color(220,24,63);
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QgmjFinishCtrl;
//模型，数据处理
class Model extends BaseModel{
	curcard={};
	opcardarr={};
	cardwallindex=0;
	win_seatid=0;
	lianzhuang=0;
	roomvalue={};
	huacounts=null;
	difans=null;
	scores=null;
	huinfo=null;
	handcards={};
	seatcount=0;
    huafans=null;
    ziangangfans=null;
    normalangangfans=null;
    zigangfans=null;
    normalgangfans=null;
    ziankefans=null;
    normalankefans=null;
    zikefans=null;
    gametimes=0;
    scores={};
    paifansforeach=null;
	constructor()
	{
		super();
	}
	initData()
	{
		let qgmjLogicInstance = QgmjLogic.getInstance();
		if(qgmjLogicInstance != null)
		{
			this.curcard=qgmjLogicInstance.curcard;
			this.opcardarr=qgmjLogicInstance.opcardarr;
			this.cardwallindex=qgmjLogicInstance.cardwallindex;
			this.win_seatid=qgmjLogicInstance.win_seatid;
			this.lianzhuang=qgmjLogicInstance.lianzhuang;
			this.roomvalue=qgmjLogicInstance.roomvalue;
			this.huacounts=qgmjLogicInstance.huacounts;
			this.difans=qgmjLogicInstance.difans;
			this.scores=qgmjLogicInstance.scores;
			this.huinfo=qgmjLogicInstance.huinfo;
			this.handcards=g_deepClone(qgmjLogicInstance.handcards);
			this.seatcount=qgmjLogicInstance.seatcount;
			this.huafans=qgmjLogicInstance.huafans;
			this.ziangangfans=qgmjLogicInstance.ziangangfans;
			this.normalangangfans=qgmjLogicInstance.normalangangfans;
			this.zigangfans=qgmjLogicInstance.zigangfans;
			this.normalgangfans=qgmjLogicInstance.normalgangfans;
			this.ziankefans=qgmjLogicInstance.ziankefans;
			this.normalankefans=qgmjLogicInstance.normalankefans;
			this.zikefans=qgmjLogicInstance.zikefans;
			this.gametimes=qgmjLogicInstance.gametimes;
			this.scores=qgmjLogicInstance.scores;
			this.paifansforeach=qgmjLogicInstance.paifansforeach;
		}
	}
	getJinCount(seatID)
	{
		let handcard= this.handcards[seatID];
		var jincount=0;
		for (var i = 0;i<handcard.length;++i)
		{
			if (handcard[i]==0)
			{
				jincount=jincount+1;
			} 
		} 
		return jincount;
	}
	gethuTypeString()
	{
		switch (this.huinfo.hutime) {
			case QgmjDef.hutime_zimo:
				return "自摸";
			case QgmjDef.hutime_danyou:
				return "单游";
			case QgmjDef.hutime_shuangyou:
				return "双游";
			case QgmjDef.hutime_sanyou:
				return "三游";
			case QgmjDef.hutime_bazhanghua:
				return "八张花";
			case QgmjDef.hutime_dianpao:
				return "点炮";
			case QgmjDef.hutime_sanjindao:
				return "三金倒";
			case QgmjDef.hutime_qiangganghu:
				return "抢杠胡";
			default:
				return null;
		}
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		node_score:null,
		node_icon:null,
		node_userList:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
        this.node.zIndex=101;
		this.initUi();
		this.addGrayLayer();
	}
	//初始化ui
	initUi()
	{
		this.ui.node_userList=[];
		this.ui.node_score = ctrl.node_score;
		this.ui.node_icon = ctrl.node_icon;
		this.ui.node_userList.push(ctrl.node_user_0);
		this.ui.node_userList.push(ctrl.node_user_1);
		this.ui.node_userList.push(ctrl.node_user_2);
		this.ui.node_userList.push(ctrl.node_user_3);
	}
	showUserInfo()
	{
		for (let i = 0; i < this.model.seatcount; ++i) {
			let node_user=this.ui.node_userList[i];
			// 根据logicseatid来获取对应数据
			let logicseatid=RoomMgr.getInstance().getLogicSeatId(i);
			let winloseNode=null;
			let winflag=false;
			if (logicseatid == this.model.win_seatid) {
				node_user.getChildByName("winNode").active = true;
				node_user.getChildByName("loseNode").active = false;
				winloseNode = node_user.getChildByName("winNode");
				winflag=true;
			}
			else
			{
				node_user.getChildByName("winNode").active = false;
				node_user.getChildByName("loseNode").active = true;
				winloseNode = node_user.getChildByName("loseNode");
				winflag=false;
			}
			// 各种水的显示
			let totalPaiFen = this.showfan(node_user,logicseatid);
			// 总计显示
			this.showTotalloseWin(winloseNode,winflag,totalPaiFen,logicseatid);
		}
	}
	showTotalloseWin(winloseNode,winflag,totalPaiFen,logicseatid)
	{
		let finalScore = this.model.scores[logicseatid.toString()];
		if (winflag) {
			winloseNode.getChildByName("difenLabel").getChildByName("difen").getComponent(cc.Label).string = this.model.roomvalue.v_difen;
			winloseNode.getChildByName("lianzhuangLabel").getChildByName("lianzhuang").getComponent(cc.Label).string = Math.pow(2,this.model.lianzhuang);
			winloseNode.getChildByName("paifenLabel").getChildByName("paifen").getComponent(cc.Label).string = totalPaiFen;
			winloseNode.getChildByName("huTypeTimes").getChildByName("times").getComponent(cc.Label).string = this.model.gametimes;
			winloseNode.getChildByName("huTypeTimes").getComponent(cc.Label).string = this.model.gethuTypeString();
			winloseNode.getChildByName("totalFan").getComponent(cc.Label).string = finalScore+"水";
		}
		else{
			// 获取总赢分
			let totalWinScore = this.model.scores[this.model.win_seatid.toString()];
            console.log("输家分数", totalWinScore);
			let paifansforeach = this.model.paifansforeach[logicseatid.toString()];
			winloseNode.getChildByName("paifenLabel").getChildByName("paifen").getComponent(cc.Label).string = totalPaiFen;
			winloseNode.getChildByName("huTypeString").getComponent(cc.Label).string = "被"+this.model.gethuTypeString()+"("+totalWinScore/3+"水)";
			winloseNode.getChildByName("totalFan").getComponent(cc.Label).string = finalScore+"水";
			if (paifansforeach>0) {
				winloseNode.getChildByName("forEachOtherFan").getComponent(cc.Label).string = "(+"+paifansforeach+"水)";
			}
			else
			{
				winloseNode.getChildByName("forEachOtherFan").getComponent(cc.Label).string = "("+paifansforeach+"水)";
			}

		}
		if(QgmjLogic.getInstance().win_seatid == null){
			this.ui.node_icon.children[1].active = this.ui.node_icon.children[0].active = false;
			QgmjAudio.getInstance().playLostAudio()
		}else if(QgmjLogic.getInstance().win_seatid != RoomMgr.getInstance().getMySeatId()){
			this.ui.node_icon.children[2].active = this.ui.node_icon.children[0].active = false;
			QgmjAudio.getInstance().playLostAudio()
		}else{
			this.ui.node_icon.children[2].active = this.ui.node_icon.children[1].active = false;
			QgmjAudio.getInstance().playWinAudio();
		}	
	}
	showfan(node_user,logicseatid)
	{
		let totalfan=0;
		let fanDetail = node_user.getChildByName("fanDetail");
		let huafan=this.model.huafans[logicseatid.toString()];
		let ziangangfan=this.model.ziangangfans[logicseatid.toString()];
		let normalangangfan=this.model.normalangangfans[logicseatid.toString()];
		let zigangfan=this.model.zigangfans[logicseatid.toString()];
		let normalgangfan=this.model.normalgangfans[logicseatid.toString()];
		let ziankefan=this.model.ziankefans[logicseatid.toString()];
		let normalankefan=this.model.normalankefans[logicseatid.toString()];
		let zikefan=this.model.zikefans[logicseatid.toString()];
		let jinCount=this.model.getJinCount(logicseatid.toString());
        let strArr = [
            "花牌", "字暗杠", "暗杠",
            "字明杠", "明杠", "字暗刻",
            "暗刻", "字明刻", "金牌"
        ];
        let args = [
            [huafan, huafan], [ziangangfan.count, ziangangfan.fan],[normalangangfan.count, normalangangfan.fan],
            [zigangfan.count, zigangfan.fan], [normalgangfan.count, normalgangfan.fan], [ziankefan.count, ziankefan.fan],
            [normalankefan.count, normalankefan.fan], [zikefan.count, zikefan.fan], [jinCount, jinCount]
        ]
        let fanArr = [
            huafan, ziangangfan.fan, normalangangfan.fan,
            zigangfan.fan, normalgangfan.fan, ziankefan.fan,
            normalankefan.fan, zikefan.fan, jinCount
        ]
        var index=0; // 动这里之前, 要先搞清楚 ver 和 let 声明变量的区别
        let conditionArr = [
            (huafan>0), (ziangangfan.count>0), (normalangangfan.count>0),
            (zigangfan.count>0), (normalgangfan.count>0), (ziankefan.count>0),
            (normalankefan.count>0 && index<6), (zikefan.count>0 && index<6), (jinCount>0 && index<6)
        ]
        for (let i=0; i<9; i++) {
            if (!conditionArr[i]) continue;
            let node = fanDetail.getChildByName("node"+index)
		    node.active = true;
		    node.getComponent(cc.Label).string = strArr[i];
		    node.getChildByName("count").getComponent(cc.Label).string = args[i][0];
		    node.getChildByName("fan").getComponent(cc.Label).string = args[i][1]+"水";
            index++;
			totalfan += fanArr[i];
        }
		fanDetail.getChildByName("totalShui").getComponent(cc.Label).string = totalfan+"水";
		return totalfan;
	}
}
//c, 控制
@ccclass
export default class QgmjFinishCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property(cc.Node)
	btn_gameInfo:cc.Node = null
	@property(cc.Node)
	btn_share:cc.Node = null
	@property(cc.Node)
	btn_again:cc.Node = null
	@property(cc.Node)
	node_score:cc.Node = null
	@property(cc.Node)
	node_icon:cc.Node = null
	@property(cc.Node)
	btn_close:cc.Node = null
	@property(cc.Node)
	btn_exit:cc.Node = null

	//玩家节点
	@property(cc.Node)
	node_user_0:cc.Node = null
	@property(cc.Node)
	node_user_1:cc.Node = null
	@property(cc.Node)
	node_user_2:cc.Node = null
	@property(cc.Node)
	node_user_3:cc.Node = null
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
        this.node.zIndex=101
		//数据模型
		this.initMvc(Model,View);
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events={
			//网络消息监听列表  
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
		this.connect(G_UiType.image, this.btn_gameInfo, this.btn_gameInfo_cb,'详细结算信息');
		this.connect(G_UiType.image, this.btn_share, this.btn_share_cb,'微信分享' );
		this.connect(G_UiType.image, this.btn_again, this.btn_again_cb, '再来一局');
		this.connect(G_UiType.image, this.btn_close, this.btn_close_cb, '关闭');
		this.connect(G_UiType.image, this.btn_exit, this.btn_exit_cb, '退出');
	}
	start () {
		this.model.initData();
		this.view.showUserInfo();
	}
	//网络事件回调begin
	usersUpdated(){
		this.finish();
	}
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	btn_gameInfo_cb(){
		console.log("btn_gameInfo_cb");
		this.start_sub_module(G_MODULE.qgmjGameDetailResult, (prefabComp:Prefab_gameDetailResultCtrl)=>{
			console.log("btn_gameInfo_cb11111");
            prefabComp.showDetailResult();
        }));
	}
	btn_share_cb(){
		
	}
	btn_again_cb(){
		RoomMgr.getInstance().onceMore();
	}
	btn_close_cb(){
		RoomMgr.getInstance().backToRoom();  
	}
	btn_exit_cb(){
		//退出房间
	}
	//end
}
