/*
author: HJB
日期:2018-03-05 13:55:13
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import BehaviorMgr from "../../GameMgrs/BehaviorMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_RecordStripCtrl;
//模型，数据处理
class Model extends BaseModel{
	private record_data = null;
	constructor()
	{
		super();
		this.record_data = BehaviorMgr.getInstance().getClubRecordData();
	}
	public getRoomType(){
		return this.record_data.type;
	}
	public getRoomName(){
		return this.record_data.name;
	}
	public getRoomPay(){
		return this.record_data.pay;
	}
	public getRoomTime(){
		return this.record_data.time;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		lable_type:null,
		lable_name:null,
		lable_pay:null,
		lable_time:null,
		btn_enter:null,
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
		this.ui.lable_type = ctrl.lable_type;
		this.ui.lable_name = ctrl.lable_name;
		this.ui.lable_pay = ctrl.lable_pay;
		this.ui.lable_time = ctrl.lable_time;
		this.ui.btn_enter = ctrl.btn_enter;

		this.refreshType();
		this.refreshName();
		this.refreshPay();
		this.refreshTime();
	}
	refreshType(){
		this.ui.lable_type.string = this.model.getRoomType();
	}
	refreshName(){
		this.ui.lable_name.string = this.model.getRoomName();
	}
	refreshPay(){
		this.ui.lable_pay.string = this.model.getRoomPay();
	}
	refreshTime(){
		this.ui.lable_time.string = this.model.getRoomTime();
	}
}
//c, 控制
@ccclass
export default class Club_RecordStripCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property(cc.Label)
	lable_type:cc.Label = null

	@property(cc.Label)
	lable_name:cc.Label = null

	@property(cc.Label)
	lable_pay:cc.Label = null

	@property(cc.Label)
	lable_time:cc.Label = null

	@property(cc.Node)
	btn_enter:cc.Node = null

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
		this.connect(G_UiType.image, this.ui.btn_enter,this.btn_enter_cb,"进入详情");
		
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_enter_cb(node, event){
		console.log("btn_enter_cb");
		this.start_sub_module(G_MODULE.ClubRecordC)
	}
	//end
}