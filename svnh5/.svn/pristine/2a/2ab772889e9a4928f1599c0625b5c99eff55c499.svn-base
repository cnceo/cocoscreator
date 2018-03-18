/*
author: Justin
日期:2018-01-11 15:04:46
*/
import BaseControl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import UiMgr from "../../GameMgrs/UiMgr";
import ModuleMgr from "../../GameMgrs/ModuleMgr";
import CharMgr from "../../GameMgrs/CharMgr";
import QzmjAudio from "../../../Games/Qzmj/QzmjMgr/QzmjAudio";
import FrameMgr from "../../GameMgrs/FrameMgr";
import RoomMgr from "../../GameMgrs/RoomMgr";
import RoomCostCfg from "../../CfgMgrs/RoomCostCfg";
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_ChatNodeCtrl;
//模型，数据处理
class Model extends BaseModel{
	public ExpressionLen : number;
	public ChatText : Array<string>;
	
	constructor()
	{
		super();
		this.ExpressionLen = 29;
		this.ChatText = CharMgr.getInstance().ChatText;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	public allHeight: number;
	ui={
		//在这里声明ui
		scroll_Expression : null,
		scroll_Text : null,
		atlas_Expression : null,
		prefab_ChatText : null,
	};
	//private node=null;
	//private model:Model =null
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.model=model;
		this.initUi();
		this.addGrayLayer();
		this.node.zIndex = 200;
	}
	//初始化ui
	initUi()
	{
		this.ui.atlas_Expression = ctrl.ExpressionAtlas;
		this.ui.scroll_Expression = ctrl.ExpressionScroll;
		this.ui.prefab_ChatText = ctrl.Prefab_ChatText;
		this.ui.scroll_Text = ctrl.TextScroll;
		//默认是表情列表，所以文本节点不激活，避免吞噬触摸事件
		this.ui.scroll_Text.node.active = false;
		//高度为0
		this.allHeight = 0;
	}

	addExpress (index:number,i:number,expression) : void {
		
		let spacingY = this.ui.scroll_Expression.content.getComponent(cc.Layout).spacingY,
        nodeHeight = 0;
		this.ui.scroll_Expression.content.height = 0;
		let node = expression.node;
		node.tag = i+1000; //1000以上为表情
		expression.spriteFrame = this.ui.atlas_Expression.getSpriteFrame(i);
		this.ui.scroll_Expression.content.addChild(node);
		if (index == 0) {
			this.allHeight += node.height + spacingY;
		}
		nodeHeight = node.height;
		this.ui.scroll_Expression.content.height = this.allHeight + nodeHeight;
		console.log(this.ui.scroll_Expression.content.height)
	}
	
	addText (i:number,text:string,TextItem:cc.Node) : void {
        let node = this.ui.scroll_Text.content;
		node.addChild(TextItem);
		TextItem.getChildByName("content").getComponent(cc.Label).string = text;
		TextItem.tag = i;
		node.height += node.getComponent(cc.Layout).spacingY + TextItem.getChildByName("content").getComponent(cc.Label).lineHeight+5;
		console.log(this.ui.scroll_Text.content.height)
	}

	showExpression () : void {
		this.ui.scroll_Expression.node.active = true;
		this.ui.scroll_Text.node.active = false;
	}

	showText () : void {
		this.ui.scroll_Expression.node.active = false;
		this.ui.scroll_Text.node.active = true;
	}
}
//c, 控制
@ccclass
export default class Prefab_ChatNodeCtrl extends BaseControl {
	//这边去声明ui组件
	@property({
		tooltip : "聊天类型，表情还是文本",
		type : cc.ToggleGroup
	})
	ChatType : cc.ToggleGroup = null;

	@property({
		tooltip : "聊天类型，表情按钮",
		type : cc.Node
	})
	ExpressionBtn : cc.Node = null;

	@property({
		tooltip : "聊天类型，文本按钮",
		type : cc.Node
	})
	TextBtn : cc.Node = null;

	@property({
		tooltip : "表情图集",
		type : cc.SpriteAtlas
	})
	ExpressionAtlas : cc.SpriteAtlas = null;

	@property({
		tooltip : "表情容器",
		type : cc.ScrollView
	})
	ExpressionScroll : cc.ScrollView = null;

	@property({
		tooltip : "文本容器",
		type : cc.ScrollView
	})
	TextScroll : cc.ScrollView = null;

	@property({
		tooltip : "聊天文本预制体",
		type : cc.Prefab
	})
	Prefab_ChatText : cc.Prefab = null;

	@property(cc.Node)
	bg : cc.Node = null;
	
	private chatOver = true;
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
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
	//绑定操作的回调
	connectUi()
	{ 
		this.connect(G_UiType.image, this.ExpressionBtn, this.ExpressionBtn_cb, "表情类型")
		this.connect(G_UiType.image, this.TextBtn, this.TextBtn_cb, '文本类型')
		this.connect(G_UiType.image, this.bg, this.bg_bc, '点击背景关闭界面')
	}
	start () {
		this.addExpress();
		this.addText();
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private ExpressionBtn_cb () : void {
		this.view.showExpression();
	}
	private TextBtn_cb () : void {
		this.view.showText();
	}
	private prefab_ChatText_cb (node,event) : void {
		let text = node.getChildByName("content").getComponent(cc.Label).string
		var msg={
			"rid":RoomMgr.getInstance().rid,
			"cid":node.tag.toString(),
			// 'text':text,
			// 'textId':node.tag,
        }
		CharMgr.getInstance().sendText(msg);
		this.finish();
	}
	private expression_cb (node,event) : void {
		var msg={
			"rid":RoomMgr.getInstance().rid,
			"cid":node.tag.toString(),
            // 'img':node.getComponent("cc.Sprite"),
        }
		CharMgr.getInstance().sendText(msg);
		this.finish();
	}
	private bg_bc (node,event) : void {
		this.finish();
	}
	//end
	addExpress () : void {
		let index = 5;
		let len : any = this.model.ExpressionLen;
		for (let i = 1; i < len + 1; i ++) {
			let node = new cc.Node();
			node.name = i + "";
			let expression = node.addComponent(cc.Sprite);
			this.connect(G_UiType.image, node, this.expression_cb, '点击聊天表情')
			index --;
			this.view.addExpress(index,i,expression);
			if (index == 0) index = 5;
		}
	}
	
	addText () : void {
		let list = this.model.ChatText;
        for (let i = 0; i<list.length; ++i ) {
			let text = list[i];
			let prefab_ChatText = cc.instantiate(this.Prefab_ChatText);
			this.connect(G_UiType.image, prefab_ChatText, this.prefab_ChatText_cb, '点击聊天文本')
			this.view.addText(i,text,prefab_ChatText);
        }
	}
}