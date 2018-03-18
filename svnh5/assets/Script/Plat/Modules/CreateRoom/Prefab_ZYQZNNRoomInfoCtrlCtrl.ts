/*
author: YOYO
日期:2018-03-06 10:41:01
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";


import CreateRoomMgr from'../../GameMgrs/CreateRoomMgr';
import BetMgr from "../../GameMgrs/BetMgr";
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_ZYQZNNRoomInfoCtrlCtrl;
//模型，数据处理
class Model extends BaseModel{
	private _roomRuleInfo = null;			//房间配置信息
	private _roomcfg = null;
	private _doubleRule = null;
	private _gameid   = null;
	constructor() {
		super();
		BetMgr.getInstance().setGameId(18);
		this._gameid = BetMgr.getInstance().getGameId();
        console.log('gameId', this._gameid)
		this._roomRuleInfo = CreateRoomMgr.getInstance().getRoomRuleInfo(this._gameid);	//2 牛牛配置
		this._roomcfg={
			playerCount:[6,8],
			gameCount:[10,20],
			baseScore:[1,2,3,4],
			payType:[1,2],
			playerPush:[0,5,10,20],
        	autoOpen:[1,2,3,4],
			specialCardType: [0, 1, 0, 0, 0, 0], 
			advancedOptions: [0, 0, 0, 0, 0, 0, 0],
		}
		this._doubleRule = ['牛牛X4 牛九X3 牛八X2 牛七X2', '牛牛X4 牛九X3 牛八X2']
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	private _dorpDownBoxLabel: null;
	ui = {
		//在这里声明ui
		node_shield : null,
		node_pageView : null,
		node_dropToggleGroup : null,
		node_doubleItem : null,
		btn_dropUp : null,
		btn_close: null,
		btn_baseSetting: null,
		btn_advancedSetting: null,
		node_page1: null,
		node_page2: null,
		node_dropDownBox: null,
	};
	node = null;
	constructor(model) {
		super(model);
		this.node = ctrl.node;
		this.initUi();
		this.ui.node_shield.active = false;
		//this.ui.node_pageView.getComponent(cc.PageView).enabled = false;
		this.initPage1();
		this.initPage2();
	}
	//初始化ui
	initUi() {
		this.ui.node_shield = ctrl.Shield;
		this.ui.node_pageView = ctrl.PageView;
		this.ui.node_doubleItem = ctrl.DropBtn;
		this.ui.btn_dropUp = ctrl.DropUP;
		this.ui.node_dropDownBox = ctrl.DropDownBox;
		this.ui.btn_baseSetting = ctrl.Btn_BaseSetting;
		this.ui.btn_advancedSetting = ctrl.Btn_AdvancedSetting;
		this.ui.node_page1 = ctrl.Page1;
		this.ui.node_page2 = ctrl.Page2;
		this.ui.node_dropToggleGroup =  ctrl.DropToggleGroup;
	}
	initCheckState(groupChildren, toggleName) {
    	let data = this.model._roomcfg[toggleName];
    	let value = this.model._roomRuleInfo[toggleName];
    	for (let i=0; i<data.length; i++) {
    		if (data[i]==value) {
				groupChildren[i].getComponent(cc.Toggle).check();
				groupChildren[i].getChildByName('Bg_select').active =true;
    		}else{
				groupChildren[i].getChildByName('Bg_select').active =false;
			}
    	}
	}
    initPage1(){
    	let groups = this.ui.node_page1.children;
    	for(let i = 0; i<groups.length; i++){
    		let groupChildren = groups[i].getChildByName('ToggleGroup').children;
    		this.initCheckState(groupChildren, groups[i].name);
    	}
	}
	initPage2(){
		let groups = this.ui.node_page2.children;
		for (let i = 0; i < this.ui.node_page2.childrenCount; i++) {
			if (groups[i].getChildByName('ToggleGroup')) {
				let groupChildren = groups[i].getChildByName('ToggleGroup').children;
				if (groupChildren.length != 0) {
					let value = this.model._roomRuleInfo[groups[i].name];
					for (var k = 0; k < value.length; k++) {
						if (value[k] == 1) {
							groupChildren[k].getComponent(cc.Toggle).check();
							groupChildren[k].getChildByName('Bg_select').active = !groupChildren[k].getChildByName('Bg_select').active;
						}
					}
				}
			}
		}
		this.ui.node_dropDownBox.getChildByName('Label').getComponent(cc.Label).string = this.model._doubleRule[this.model._roomRuleInfo.doubleRules];
	}
	a(){
		this.ui.node_shield.active = false;
		//this.ui.node_pageView.getComponent(cc.PageView).enabled = false;
	}
	changePage1() {
		//this.ui.node_pageView.getComponent(cc.PageView).enabled = true;
		this.ui.node_shield.active = true;
		this.ui.node_pageView.scrollToPage(0,1);
		var finish = cc.callFunc(this.a, this);
		let seq = cc.sequence(cc.delayTime(2),finish);
		this.node.runAction(seq);
	}
	changePage2() {
		//this.ui.node_pageView.getComponent(cc.PageView).enabled = true;
		this.ui.node_shield.active = true;
		this.ui.node_pageView.scrollToPage(1,1);
		var finish = cc.callFunc(this.a, this);
		let seq = cc.sequence(cc.delayTime(2),finish);
		this.node.runAction(seq);
	}
	changeDropDownActive() {
		this.ui.node_dropDownBox.active = !this.ui.node_dropDownBox.active;
	}
	changeDropDownBoxLabel(string) {
		this.ui.node_dropDownBox.getChildByName('Label').getComponent(cc.Label).string = string;
	}
}
//c, 控制
@ccclass
export default class Prefab_ZYQZNNRoomInfoCtrlCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property({
		tooltip: "基础设置",
		type: cc.Node
	})
	Btn_BaseSetting: cc.Node = null;

	@property({
		tooltip: "高级设置",
		type: cc.Node
	})
	Btn_AdvancedSetting: cc.Node = null;

	@property({
		tooltip: "页面1",
		type: cc.Node
	})
	Page1: cc.Node = null;

	@property({
		tooltip: "页面2",
		type: cc.Node
	})
	Page2: cc.Node = null;

	@property({
		tooltip: "下拉框按钮",
		type: cc.Node
	})
	DropDownBox: cc.Node = null;

	@property({
		tooltip: "下拉按钮",
		type: cc.Node
	})
	DropBtn: cc.Node = null;

	@property({
		tooltip: "框",
		type: cc.Node
	})
	LayoutLabel: cc.Node = null;

	@property({
        tooltip : '下拉收起按钮',
        type : cc.Node
    })
	DropUP: cc.Node = null;
	
	@property({
        tooltip : '下拉选项',
        type : cc.Node
    })
	DropToggleGroup: cc.Node = null;
	
	@property({
		tooltip:'页面视图',
		type: cc.PageView
	})
	PageView: cc.PageView = null;

	@property({
		tooltip:'页面视图遮蔽层',
		type : cc.Node
	})
	Shield: cc.Node = null;
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离
	onLoad() {
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model, View);
	}

	//定义网络事件
	defineNetEvents() {
	}
	//定义全局事件
	defineGlobalEvents() {

	}
	//绑定操作的回调
	connectUi() {
		this.connect(G_UiType.image, this.Btn_BaseSetting, this.BtnBaseSetting_cb, "基础设置");
		this.connect(G_UiType.image, this.Btn_AdvancedSetting, this.BtnAdvancedSetting_cb, "高级设置");
		this.connect(G_UiType.text, this.DropDownBox, this.DropDownBox_cb, "下拉框");
		//单选按钮的绑定
		for (let i = 0; i < this.Page1.childrenCount; i++) {
			let temp = this.Page1.children[i];
			let ToggleGroup = temp.getChildByName('ToggleGroup');
			for (let j = 0; j < ToggleGroup.childrenCount; j++) {
				let toggle = ToggleGroup.children[j];
				let toggle_cb = function () {
					this.Toggle_cb(i,j, ToggleGroup);
				}
				this.connect(G_UiType.image, toggle, toggle_cb, "单选按钮");
			}
		}
		//复选按钮的绑定
		for (let i = 0; i < this.Page2.childrenCount; i++) {
			let temp = this.Page2.children[i];
			if (temp.getChildByName('ToggleGroup')) {
				let ToggleGroup = temp.getChildByName('ToggleGroup');
				for (let j = 0; j < ToggleGroup.childrenCount; j++) {
					let toggle = ToggleGroup.children[j];
					let checktoggle_cb = function () {
						this.CheckToggle_cb(temp, toggle, j);
					}
					this.connect(G_UiType.image, toggle, checktoggle_cb, "复选按钮");
				}
			}
		}
		for(let i=0; i< this.DropToggleGroup.getChildByName('Group').childrenCount; i++){
				this.connect(G_UiType.text, this.DropToggleGroup.getChildByName('Group').children[i], this.dropDownChooseCB, "单选按钮");
		}
		this.connect(G_UiType.text, this.DropUP, this.DropDownBox_Cb, "下拉框");	
		this.connect(G_UiType.text, this.DropBtn, this.DropDownBox_cb, "下拉框");	
	}
	start() {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private CloseBtn_cb(): void {
		this.finish();
	}
	private BtnBaseSetting_cb(): void {
		this.view.changePage1();
	}
	private BtnAdvancedSetting_cb(): void {
		this.view.changePage2();
	}

	private DoNothing(): void {

	}
	private DropDownBox_cb(): void{
		this.ui.node_dropToggleGroup.active = !this.ui.node_dropToggleGroup.active;
	}
	private DropDownBox_Cb(): void{
		this.ui.node_dropToggleGroup.active = false;

	}
	dropDownChooseCB(event){
    	console.log(event.parent)
		let index = Number(event.name);
		for(let i=0;i<this.ui.node_dropToggleGroup.getChildByName('Group').childrenCount; i++){
			let temp = this.ui.node_dropToggleGroup.getChildByName('Group').children[i];
			if(index == i){
			temp.getChildByName('sharing_switch_over').active = true;
			this.model._roomRuleInfo.doubleRules = i;
			}else {
			temp.getChildByName('sharing_switch_over').active = false;
			//直接在这里用Event获取这个组，并隐藏。
			}
		}
		this.DropDownBox.getComponentInChildren(cc.Label).string = this.model._doubleRule[index];
		
		this.ui.node_dropToggleGroup.active = false;
		//event.parent.parent.active = true;
    }
	private Toggle_cb(groupIndex,index, node): void {
		for (let i = 0; i < node.childrenCount; i++) {
			if (i == index) {
				switch(groupIndex){
					case 0:
					CreateRoomMgr.getInstance().setProperty(this.model._roomcfg["playerCount"][index], 'zyqznnRoonRuleInfo', 'playerCount');
					break;
					case 1:
					CreateRoomMgr.getInstance().setProperty(this.model._roomcfg["gameCount"][index], 'zyqznnRoonRuleInfo', 'gameCount');
					break;
					case 2:
					CreateRoomMgr.getInstance().setProperty(this.model._roomcfg["baseScore"][index], 'zyqznnRoonRuleInfo', 'baseScore');
					break;
					case 3:
					CreateRoomMgr.getInstance().setProperty(this.model._roomcfg["payType"][index], 'zyqznnRoonRuleInfo', 'payType');
					break;
					case 4:
					CreateRoomMgr.getInstance().setProperty(this.model._roomcfg["playerPush"][index], 'zyqznnRoonRuleInfo', 'playerPush');
					break;
					case 5:
					CreateRoomMgr.getInstance().setProperty(this.model._roomcfg["autoOpen"][index], 'zyqznnRoonRuleInfo', 'autoOpen');
					break;
				}
				cc.log(this.model._roomRuleInfo);
				node.children[i].getChildByName('Bg_select').active = true;
			} else {
				node.children[i].getChildByName('Bg_select').active = false;
			}
		}
	}
	private CheckToggle_cb(nodeType,node,index): void {
		node.getChildByName('Bg_select').active = !node.getChildByName('Bg_select').active;
			switch(nodeType.name){
			case "specialCardType":
			if(node.getChildByName('Bg_select').active){
				this.model._roomRuleInfo.specialCardType[index] = 1;
			}else{
				this.model._roomRuleInfo.specialCardType[index] = 0;
			}
			break;
			case"advancedOptions":
			if(node.getChildByName('Bg_select').active){
				this.model._roomRuleInfo.advancedOptions[index] = 1;
			}else{
				this.model._roomRuleInfo.advancedOptions[index] = 0;
			}
			break;
			default:
			break;
		}
		cc.log(this.model._roomRuleInfo);
	}
	//end
}