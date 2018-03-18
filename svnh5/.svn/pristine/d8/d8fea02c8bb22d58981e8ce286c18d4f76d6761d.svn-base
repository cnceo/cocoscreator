/*
author: HJB
日期:2018-03-05 15:54:10
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_RecordContentCtrl;
//模型，数据处理
class Model extends BaseModel{
	constructor()
	{
		super();

	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		btn_close:null,
		record_list:null,
		record_sum:null,
		btn_confirm:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
		this.addGrayLayer();
	}
	//初始化ui
	initUi()
	{
		this.ui.btn_close = ctrl.btn_close;
		this.ui.record_list = ctrl.record_list;
		this.ui.record_sum = ctrl.record_sum;
		this.ui.btn_confirm = ctrl.btn_confirm;
	}
}
//c, 控制
@ccclass
export default class Club_RecordContentCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Node)
	btn_close:cc.Node = null

	@property(cc.Node)
	record_list:cc.Node = null

	@property(cc.Node)
	record_sum:cc.Node = null

	@property(cc.Node)
	btn_confirm:cc.Node = null

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
		this.connect(G_UiType.image,this.ui.btn_close,this.btn_close_cb,"关闭界面");
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_close_cb(node){
		console.log('node_close_cb')
		this.finish();
	}
	//end
}