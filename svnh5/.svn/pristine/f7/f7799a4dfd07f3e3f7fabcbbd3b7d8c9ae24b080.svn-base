/*
author: YOYO
日期:2018-02-23 11:39:42
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_DefaultRuleCtrlCtrl;
//模型，数据处理
class Model extends BaseModel{
	constructor()
	{
		super();

	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	private index : null;
	ui={
		//在这里声明ui
		node_content : null,
		node_btnClose : null,
		node_reName : null,
		node_renameBlock1 : null,
		node_create : null,
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
		this.ui.node_create = ctrl.Create;
		this.ui.node_btnClose = ctrl.Btn_Close;
		this.ui.node_content = ctrl.Content;
		this.ui.node_reName = ctrl.Rename;
		this.ui.node_renameBlock1 = ctrl.RenameBlock1;
	}
	clearEditBoxString(){
		this.ui.node_reName.getChildByName('EditBox').getComponent(cc.EditBox).string = '';
		this.ui.node_create.getChildByName('EditBox').getComponent(cc.EditBox).string = '';
	}
}
//c, 控制
@ccclass
export default class Prefab_DefaultRuleCtrlCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property({
		tooltip:"关闭按钮",
		type : cc.Node
	})
	Btn_Close :cc.Node = null;

	@property({
		tooltip:"视图",
		type : cc.Node
	})
	Content :cc.Node = null;

	@property({
		tooltip:"重命名遮蔽层1",
		type : cc.Node
	})
	RenameBlock1 :cc.Node = null;

	@property({
		tooltip:"重命名",
		type : cc.Node
	})
	Rename :cc.Node = null;

	@property({
		tooltip:"新建规则",
		type : cc.Node
	})
	Create :cc.Node = null;

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
		this.connect(G_UiType.image, this.Btn_Close, this.Btn_Close_cb, "关闭");
		this.connect(G_UiType.text, this.RenameBlock1, this.doNothing, "更多界面的背景");
		
		for(let i=0; i<this.Content.childrenCount; i++){
			let btn = this.Content.children[i];
			let btnEditName = btn.getChildByName('btn_editName');
			let btnEdit = btn.getChildByName('btn_edit');
			let btnCreate = btn.getChildByName('btn_create');
			let Btn_EditName_cb = function () {
				this.Btn_EditName_CB(i);
			}
			this.connect(G_UiType.image,btnEditName, Btn_EditName_cb, "自定义名称");
			this.connect(G_UiType.image, btnEdit, this.Btn_Edit_cb, "编辑");
			if(btnCreate){
				let Btn_Create_cb = function () {
					this.Btn_Create_Cb(i);
				}
				this.connect(G_UiType.image, btnCreate,Btn_Create_cb, "新建");
			}
		}
		this.connect(G_UiType.text, this.Rename.getChildByName('Sprite(Splash)'), this.doNothing, "更多界面的背景");
		this.connect(G_UiType.image, this.Rename.getChildByName('Cancel'), this.Btn_Cancel_cb, "取消");
		this.connect(G_UiType.image, this.Rename.getChildByName('Sure'), this.Btn_Sure_cb, "确定");
		this.connect(G_UiType.text, this.Create.getChildByName('Sprite(Splash)'), this.doNothing, "遮盖层");
		this.connect(G_UiType.image, this.Create.getChildByName('Cancel'), this.Btn_CreateCancel_cb, "取消");
		this.connect(G_UiType.image, this.Create.getChildByName('Sure'), this.Btn_CreateSure_cb, "确定");
	}
	start () {
	}

	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private Btn_Close_cb() : void{
		this.finish();
	}

	private doNothing () {
		
	}
	private Btn_EditName_CB(index) : void{
		this.Rename.active = true;
		this.view.index = index;
	}
	private Btn_Edit_cb() : void{
		
	}
	private Btn_Create_Cb(index) : void{
		this.Create.active = true;
		this.view.index = index;
	}
	private Btn_Cancel_cb() : void{
		this.Rename.active = false;
		this.view.clearEditBoxString();
	}
	private Btn_CreateCancel_cb() : void{
		this.Create.active = false;
		this.view.clearEditBoxString();
	}
	private Btn_CreateSure_cb() :void {
		let label = this.Content.children[this.view.index].getChildByName('Label').getComponent(cc.Label);
		cc.log(label.string);
		if(this.ui.node_create.getChildByName('EditBox').getComponent(cc.EditBox).string.length>0){
		label.string = this.Create.getChildByName('EditBox').getComponent(cc.EditBox).string;}
		this.view.clearEditBoxString();
		this.Create.active = false;
		this.Content.children[this.view.index].getChildByName('btn_create').active = false;
		this.Content.children[this.view.index].getChildByName('btn_edit').active = true;
		this.Content.children[this.view.index].getChildByName('btn_editName').active = true;
		
	}
	private Btn_Sure_cb() : void{
		let label = this.Content.children[this.view.index].getChildByName('Label').getComponent(cc.Label);
		cc.log(label.string);
		if(this.ui.node_reName.getChildByName('EditBox').getComponent(cc.EditBox).string.length>0){
		label.string = this.Rename.getChildByName('EditBox').getComponent(cc.EditBox).string;}
		this.view.clearEditBoxString();
		this.Rename.active = false;
	}

	//end
}