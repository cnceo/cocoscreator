/*
author: JACKY
日期:2018-03-07 11:25:18
*/
import BaseControl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import UiMgr from "../../../Plat/GameMgrs/UiMgr";
import ModuleMgr from "../../../Plat/GameMgrs/ModuleMgr";
import SettingMgr from "../../../Plat/GameMgrs/SettingMgr";
import QzmjAudio from "../QzmjMgr/QzmjAudio";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_ControlSettingCtrl;
//模型，数据处理
class Model extends BaseModel{
    controlInfo:any = null
	constructor()
	{
		super();
		this.controlInfo = SettingMgr.getInstance().getControlInfo();
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
        //在这里声明ui
        button_BtnExit:null,
		button_BtnRule:null,
		button_BtnCheating:null,
        button_mjClickToggle:null,
        button_mjDragToggle:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
		this.node.zIndex=300;
	}
	//初始化ui
	initUi()
	{
		this.ui.button_BtnExit = ctrl.BtnExit;
		this.ui.button_BtnRule = ctrl.BtnRule;
		this.ui.button_BtnCheating = ctrl.BtnCheating;
		this.ui.button_mjClickToggle = ctrl.mjClickToggle;
		this.ui.button_mjDragToggle = ctrl.mjDragToggle;
		this.ui.button_mjClickToggle.getComponent(cc.Toggle).isChecked = this.model.controlInfo.bMjClick;
		this.ui.button_mjDragToggle.getComponent(cc.Toggle).isChecked = this.model.controlInfo.bMjDrag;
    }
}
//控制器
@ccclass
export default class Prefab_ControlSettingCtrl extends BaseControl {

	@property({
		tooltip : "退出房间",
		type : cc.Node
	})
	BtnExit : cc.Node = null;

	@property({
		tooltip : "游戏玩法",
		type : cc.Node
	})
	BtnRule : cc.Node = null;

	@property({
		tooltip : "防作弊检测",
		type : cc.Node
	})
	BtnCheating : cc.Node = null;

	@property({
		tooltip : "点击出牌",
		type : cc.Node
	})
	mjClickToggle : cc.Node = null;

	@property({
		tooltip : "拖动出牌",
		type : cc.Node
	})
	mjDragToggle : cc.Node = null;


    onLoad () {
    	//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//初始化mvc
		this.initMvc(Model,View);
    }

    //定义网络事件
	defineNetEvents()
	{

	}
	//定义全局事件
	defineGlobalEvents()
	{

	}

	connectUi()
	{
		this.connect(G_UiType.button, this.ui.button_BtnExit, this.onBtnExit_cb, '退出房间')
		this.connect(G_UiType.button, this.ui.button_BtnRule, this.onBtnRule_cb, '游戏玩法')
		this.connect(G_UiType.button, this.ui.button_BtnCheating, this.onBtnCheating_cb, '防作弊检测')
		this.connect(G_UiType.toggle, this.ui.button_mjClickToggle, this.mjControl_cb, '点击出牌设置')
		this.connect(G_UiType.toggle, this.ui.button_mjDragToggle, this.mjControl_cb, '拖动出牌设置')
	}

    start () {

    }

    private onBtnExit_cb (event) : void {
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
		QzmjAudio.getInstance().uncacheAll();
    }

    private onBtnRule_cb(event){
		this.start_sub_module(G_MODULE.Prefab_QzmjRuleCtrl);
	}
	
	private onBtnCheating_cb(event){
		this.start_sub_module(G_MODULE.PreventionCheating);
    }

    private mjControl_cb(event){
    	let mjClickToggle = this.ui.button_mjClickToggle.getComponent(cc.Toggle)
		let mjDragToggle = this.ui.button_mjDragToggle.getComponent(cc.Toggle)
    	let clickNode = event.currentTarget;
    	if (clickNode.name == "clickToggle") {
			SettingMgr.getInstance().setProperty(!this.model.controlInfo.bMjClick, 'controlInfo', 'bMjClick');
    	}
    	if (clickNode.name == "dragToggle") {
			SettingMgr.getInstance().setProperty(!this.model.controlInfo.bMjDrag, 'controlInfo', 'bMjDrag');
    	}
    	this.model.controlInfo = SettingMgr.getInstance().getControlInfo();

		mjClickToggle.enabled = (clickNode.name == "clickToggle")
    	mjDragToggle.enabled = (clickNode.name == "dragToggle")
    	if (this.model.controlInfo.bMjClick && this.model.controlInfo.bMjDrag) {
			mjClickToggle.enabled = true
			mjDragToggle.enabled = true
    	}
    	console.log('controlInfo:',this.model.controlInfo);
    }
}