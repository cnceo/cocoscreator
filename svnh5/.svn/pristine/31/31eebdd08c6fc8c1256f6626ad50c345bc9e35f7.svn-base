/*
author: YOYO
日期:2018-02-22 15:27:02
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import FrameMgr from "../../GameMgrs/FrameMgr";


//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_EnterSelectCtrl;
//模型，数据处理
class Model extends BaseModel{
	private bolCreate:boolean = true;

	constructor()
	{
		super();

	}
	
	public getBolCreate(){
		return this.bolCreate;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		btn_close:null,
		btn_create:null,
		btn_join:null,
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
        this.ui.btn_create = ctrl.btn_create;
		this.ui.btn_join = ctrl.btn_join;

		this.setWndUi();
	}

	setWndUi(){
		if (this.model.getBolCreate() == false){
			this.ui.btn_create.active = false;
			this.ui.btn_join.x = 0;
		}
	}
	
}
//c, 控制
@ccclass
export default class Club_EnterSelectCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Node)
	btn_close:cc.Node = null

	@property(cc.Node)
	btn_create:cc.Node = null

	@property(cc.Node)
	btn_join:cc.Node = null

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
		this.n_events = {
			"http.reqClubCreate":this.http_reqClubCreate,
		}
	}
	//定义全局事件
	defineGlobalEvents()
	{

	}
	//绑定操作的回调
	connectUi()
	{
		this.connect(G_UiType.image,this.ui.btn_close,this.btn_close_cb,"关闭界面");
		this.connect(G_UiType.image,this.ui.btn_create,this.btn_create_cb,"创建界面");
		this.connect(G_UiType.image,this.ui.btn_join,this.btn_join_cb,"进入搜索");
	}
	start () {
	}
	//网络事件回调begin
	private http_reqClubCreate(){
		FrameMgr.getInstance().showHintBox("创建俱乐部成功！", ()=>{
			this.start_sub_module(G_MODULE.ClubLobby);
			this.finish();
		});
	}
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin

	//点击关闭
	private btn_close_cb(node){
		console.log('node_close_cb')
		this.finish();
	}

	private btn_create_cb(node){
		console.log('btn_create_cb')
		this.start_sub_module(G_MODULE.ClubCreate);
	}

	private btn_join_cb(node){
		console.log('btn_join_cb')
		this.start_sub_module(G_MODULE.ClubSeek);
	}

	//end
}