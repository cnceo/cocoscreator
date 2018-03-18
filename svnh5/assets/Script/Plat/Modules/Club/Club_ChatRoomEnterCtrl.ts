/*
author: HJB
日期:2018-02-24 10:58:03
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import BehaviorMgr from "../../GameMgrs/BehaviorMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_ChatRoomEnterCtrl;
//模型，数据处理
class Model extends BaseModel{
	private room_data = null;
	constructor()
	{
		super();
		this.room_data = BehaviorMgr.getInstance().getClubRoomData();
	}
	getClubRoomType(){
		return this.room_data.type;
	}
	getClubRoomPay(){
		return this.room_data.pay;
	}
	getClubRoomCount(){
		return this.room_data.count;
	}
	getClubRoomRound(){
		return this.room_data.round;
	}
	getClubRoomTime(){
		return this.room_data.time;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		label_type:null,
		label_pay:null,
		label_count:null,
		label_round:null,
		label_time:null,
		node_enter:null,
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
		this.ui.label_type = ctrl.label_type;
		this.ui.label_pay = ctrl.label_pay;
		this.ui.label_count = ctrl.label_count;
		this.ui.label_round = ctrl.label_round;
		this.ui.label_time = ctrl.label_time;
		this.ui.node_enter = ctrl.node_enter;

		this.refreshRoomType();
		this.refreshRoomPay();
		this.refreshRoomCount();
		this.refreshRoomRound();
		this.refreshRoomTime();
	}
	refreshRoomType(){
		this.ui.label_type.string = this.model.getClubRoomType();
	}
	refreshRoomPay(){
		this.ui.label_pay.string = this.model.getClubRoomPay();
	}
	refreshRoomCount(){
		this.ui.label_count.string = this.model.getClubRoomCount();
	}
	refreshRoomRound(){
		this.ui.label_round.string = this.model.getClubRoomRound();
	}
	refreshRoomTime(){
		this.ui.label_time.string = this.model.getClubRoomTime();
	}
}
//c, 控制
@ccclass
export default class Club_ChatRoomEnterCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Label)
	label_type:cc.Label = null

	@property(cc.Label)
	label_pay:cc.Label = null

	@property(cc.Label)
	label_count:cc.Label = null

	@property(cc.Label)
	label_round:cc.Label = null

	@property(cc.Label)
	label_time:cc.Label = null

	@property(cc.Node)
	node_enter:cc.Node = null

	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
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
	//绑定操作的回调
	connectUi()
	{
		this.connect(G_UiType.image, this.ui.node_enter, this.node_enter_cb, '点击关闭')
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private node_enter_cb(node, event){
		console.log("node_enter_cb");
	}
	//end
}