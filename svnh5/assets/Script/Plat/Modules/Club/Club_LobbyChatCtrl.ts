/*
author: HJB
日期:2018-02-23 15:28:44
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import UserMgr from "../../GameMgrs/UserMgr";

import RichTextMgr from "../../GameMgrs/RichTextMgr";
import BehaviorMgr from "../../GameMgrs/BehaviorMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_LobbyChatCtrl;

//测试数据，走配表
const CHAT_POS_TYPE = cc.Enum({
    POS_PLAYER:0,
    POS_FRIEND:1
})

const CHAT_TYPE = cc.Enum({
    TYPE_LABEL:0,		//普通文字类型
	TYPE_BLEND:1,		//混合文字图片类型
	TYPE_VOICE:2,		//语音类型
	TYPE_ROOM_ENTER:3, 	//进入房间
	TYPE_ROOM_FINISH:4,	//房间结束
})

//模型，数据处理
class Model extends BaseModel{
	private chat_max = 30;
	char_offset_x = 75;
	char_offset_y = 30;
	myinfo=null;
	constructor()
	{
		super();
		//在这边去获取数据层的数据
        this.myinfo=UserMgr.getInstance().getMyInfo();
		
	}
	public getChatStripMax(){
		return this.chat_max;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		node_chat_list:null,
		scroll_chatView:null,
		node_chatStrip1:null,
		node_chatStrip2:null,
		node_room_enter:null,
		node_room_finish:null,
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
		this.ui.node_chat_list = ctrl.node_chat_list;
		this.ui.scroll_chatView = ctrl.scroll_chatView;
		
		this.ui.node_chatStrip1 = ctrl.node_chatStrip1;
		this.ui.node_chatStrip2 = ctrl.node_chatStrip2;

		this.ui.node_room_enter = ctrl.node_room_enter;
		this.ui.node_room_finish = ctrl.node_room_finish;
	}
	//设置条目icon
	setChatStripIcon(node, icon){
		let node_icon = node.getChildByName("player_icon");
		var sprite_icon = node_icon.getComponent(cc.Sprite);
		//sprite_icon.spriteFrame = icon;
	}
	//设置条目name
	setChatStripName(node, name){
		let node_name =node.getChildByName("player_name");
		var text_name = node_name.getComponent(cc.Label);
		text_name.string = name;
	}

	addRoomEnter(node, pos){
		let node_enter = cc.instantiate(this.ui.node_room_enter)
		node_enter.parent = node
		if (pos == CHAT_POS_TYPE.POS_PLAYER){
			node_enter.x = (node.width - node_enter.width)/2 -this.model.char_offset_x;
		}
		else{
			node_enter.x = -(node.width - node_enter.width)/2 + this.model.char_offset_x;
		}
		node_enter.y =  - node_enter.height/2 - this.model.char_offset_y;
		node.height = node.height + node_enter.height/2
	}
	addRoomFinish(node, pos){
		let node_finish = cc.instantiate(this.ui.node_room_finish)
		node_finish.parent = node
		if (pos == CHAT_POS_TYPE.POS_PLAYER){
			node_finish.x = (node.width - node_finish.width)/2 -this.model.char_offset_x;
		}
		else{
			node_finish.x = -(node.width - node_finish.width)/2 + this.model.char_offset_x;
		}
		node_finish.y =  - node_finish.height/2 - this.model.char_offset_y;
		node.height = node.height + node_finish.height/2
	}
	//设置条目内容
	setChatStripContent(node, data){
		
		let btn_strip = null,
			color = "#ffff00",
			node_chat =node.getChildByName("chat_text"),
			node_pic = node.getChildByName("player_pic");

		var rich_chat = node_chat.getComponent(cc.RichText);
		var rich_data = RichTextMgr.getInstance();
		rich_chat.string = "";
		switch (data.type){
			case CHAT_TYPE.TYPE_LABEL:
				node_chat.active = true;
				rich_chat.string = rich_data.richTextColor(data.text, color);
				break;
			case CHAT_TYPE.TYPE_BLEND:
				node_chat.active = true;
				rich_chat.string = rich_data.richTextBlend(data.text, color);
				break;
			case CHAT_TYPE.TYPE_VOICE:
				node_pic.active = true;
				btn_strip = node_pic;
				break;
			case CHAT_TYPE.TYPE_ROOM_ENTER:
				BehaviorMgr.getInstance().setClubRoomData(data.room_data);
				this.addRoomEnter(node, data.pos);
				break;
			case CHAT_TYPE.TYPE_ROOM_FINISH:
				BehaviorMgr.getInstance().setClubRoomData(data.room_data);
				this.addRoomFinish(node, data.pos);
				break;
			default:
				break;
		}
		return btn_strip
	}
	//data {pos, icon, name, type, text, room_data}
	addChatStrip(data){
		let add_node = null;

		if (data.pos == CHAT_POS_TYPE.POS_PLAYER){
			add_node = cc.instantiate(this.ui.node_chatStrip2)
		}
		else{
			add_node = cc.instantiate(this.ui.node_chatStrip1)
		}
		if (add_node == null){
			return
		}
		add_node.active = true;
		add_node.x = 0;
		add_node.parent = this.ui.node_chat_list;
		//头像添加
		this.setChatStripIcon(add_node, data.icon);
		//名字添加
		this.setChatStripName(add_node, data.name);
		//聊天内容
		let btn_strip = this.setChatStripContent(add_node, data);

		this.refreshChatList();

		return btn_strip
	}
	//刷新聊天列表
	refreshChatList(){
		let height = 0,
			layout = this.ui.node_chat_list.getComponent(cc.Layout),
			gapTop = layout.paddingTop,
			gapBottom = layout.paddingBottom,
			gapY = layout.spacingY,
			count = this.ui.node_chat_list.childrenCount;
		//清理聊天上限显示
		if (count > this.model.getChatStripMax()){
			this.ui.node_chat_list.children[0].destroy();
			count = this.ui.node_chat_list.childrenCount;
		}
		height = height + gapTop;
		height = height + gapBottom;
		height = height + (count-1) * gapY;
		for (var i = 0; i < count; i++){
			let node = this.ui.node_chat_list.children[i];
			height = height + node.height;
		}
		//设置拖拽层容器大小
		if (this.ui.node_chat_list.height < height){
			this.ui.node_chat_list.height = height;
			this.ui.scroll_chatView.scrollToBottom(0);
		}
	}
}
//c, 控制
@ccclass
export default class Club_LobbyChatCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property(cc.Node)
	node_chat_list:cc.Node = null

	@property(cc.ScrollView)
	scroll_chatView:cc.ScrollView = null

	@property(cc.Node)
	node_chatStrip1:cc.Node = null

	@property(cc.Node)
	node_chatStrip2:cc.Node = null

	@property(cc.Prefab)
	node_room_enter:cc.Prefab = null

	@property(cc.Prefab)
	node_room_finish:cc.Prefab = null
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
	}

	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	
	//end
}