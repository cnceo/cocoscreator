/*
author: JACKY
日期:2018-03-07 16:52:57
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_bingPhoneCtrl;
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
		Btn_Exit:null,
		EditBox_Phone:null,
		Btn_VerificationCode:null,
		EditBox_VerificationCode:null,
		img_Verification:null,
		EditBox_imgVerification:null,
		Btn_sure:null,
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
		this.ui.Btn_Exit = ctrl.Btn_Exit;
		this.ui.EditBox_Phone = ctrl.EditBox_Phone;
		this.ui.Btn_VerificationCode = ctrl.Btn_VerificationCode;
		this.ui.EditBox_VerificationCode = ctrl.EditBox_VerificationCode;
		this.ui.img_Verification = ctrl.img_Verification;
		this.ui.EditBox_imgVerification = ctrl.EditBox_imgVerification;
		this.ui.Btn_sure = ctrl.Btn_sure;

	}
}
//c, 控制
@ccclass
export default class Prefab_bingPhoneCtrl extends BaseCtrl {
	view:View = null
	model:Model = null
	//这边去声明ui组件
	@property({
		tooltip : "关闭按钮",
		type : cc.Node
	})
	Btn_Exit: cc.Node = null;

	@property({
		tooltip : "手机号码",
		type : cc.EditBox
	})
	EditBox_Phone: cc.EditBox = null;

	@property({
		tooltip : "验证码按钮",
		type : cc.Node
	})
	Btn_VerificationCode: cc.Node = null;

	@property({
		tooltip : "验证码",
		type : cc.EditBox
	})
	EditBox_VerificationCode: cc.EditBox = null;

	@property({
		tooltip : "验证图片",
		type : cc.Sprite
	})
	img_Verification: cc.Sprite = null;

	@property({
		tooltip : "图片验证码",
		type : cc.EditBox
	})
	EditBox_imgVerification: cc.EditBox = null;

	@property({
		tooltip : "确认按钮",
		type : cc.Node
	})
	Btn_sure: cc.Node = null;
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
		this.connect(G_UiType.button, this.ui.Btn_Exit, this.onBtnExit_cb, '退出绑定手机')
		this.connect(G_UiType.button, this.ui.Btn_sure, this.onBtnsure_cb, '确定按钮')
		this.connect(G_UiType.button, this.ui.Btn_VerificationCode, this.onBtnVerificationCode_cb, '验证码按钮')
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	onBtnExit_cb(event){
		this.finish();
	}
	onBtnsure_cb(event){
		this.finish();
	}
	onBtnVerificationCode_cb(event){

	}
	//end
}