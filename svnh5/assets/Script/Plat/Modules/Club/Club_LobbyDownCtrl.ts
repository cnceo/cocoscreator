/*
author: HJB
日期:2018-02-27 17:06:51
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import FrameMgr from "../../GameMgrs/FrameMgr";
import RichTextMgr from "../../GameMgrs/RichTextMgr";
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_LobbyDownCtrl;

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
	private iconCallOpen:boolean = false;
	private chat_content:string = "";
	private chat_placeholder:string = "";
	private nowRoomOpen:boolean = false;
	constructor()
	{
		super();

	}
	public setIconCallOpen(data){
		this.iconCallOpen = data
	}
	public getIconCallOpen(){
		return this.iconCallOpen
	}
	public getChatContent(){
		return this.chat_content;
	}
	public setChatContent(data){
		this.chat_content = data;
	}
	public getChatPlaceholder(){
		return this.chat_placeholder;
	}
	public setChatPlaceholder(data){
		this.chat_placeholder = data;
	}
	public setNowRoomOpen(data){
		this.nowRoomOpen = data
	}
	public getNowRoomOpen(){
		return this.nowRoomOpen
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		prefab_room_frame:null,
		btn_voice:null,
		btn_icon:null,
		btn_send:null,
		node_editbox_content:null,
		editbox_content:null,
		node_iconContent: null,
		node_iconClose:null,
		node_iconList:null,
		node_chat:null,
		node_room:null,
		btn_openCreate:null,
		btn_closeCreate:null,
		btn_baseRoom:null,
		btn_publicRoom:null,
		btn_nowRoom:null,
		node_room_frame:null,
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
		this.ui.prefab_room_frame = ctrl.prefab_room_frame;
		this.ui.btn_voice = ctrl.btn_voice;
		this.ui.btn_icon = ctrl.btn_icon;
		this.ui.btn_send = ctrl.btn_send;
		this.ui.node_editbox_content = ctrl.node_editbox_content;
		this.ui.editbox_content = ctrl.editbox_content;
		this.ui.node_iconContent = ctrl.node_iconContent;
		this.ui.node_iconClose = ctrl.node_iconClose;
		this.ui.node_iconList = ctrl.node_iconList;
		this.ui.node_chat = ctrl.node_chat;
		this.ui.node_room = ctrl.node_room;
		this.ui.btn_openCreate = ctrl.btn_openCreate;
		this.ui.btn_closeCreate = ctrl.btn_closeCreate;
		this.ui.btn_baseRoom = ctrl.btn_baseRoom;
		this.ui.btn_publicRoom = ctrl.btn_publicRoom;
		this.ui.btn_nowRoom = ctrl.btn_nowRoom;
		
		//配置占位字符（控件中的文字修改为配置文字）需改
		this.model.setChatPlaceholder(this.ui.editbox_content.placeholder);
	}

	
	//
	OpenIconList(){
		this.ui.node_iconContent.active = true;
	}
	CloseIconList(){
		this.ui.node_iconContent.active = false;
	}
	addEditboxContent(str){
		var rich_data = RichTextMgr.getInstance();
		this.model.chat_content = this.model.chat_content + rich_data.richTextPicToName(str)
		this.ui.editbox_content.string = this.model.chat_content
	}

	OpenNodeChat(){
		this.ui.node_chat.active = true;
		this.ui.node_room.active = false;
		if (this.model.getNowRoomOpen()){
			this.ui.node_room_frame.destroy();
			this.ui.node_room_frame = null;
			this.model.setNowRoomOpen(false);
		}
	}
	OpenNodeRoom(){
		this.ui.node_chat.active = false;
		this.ui.node_room.active = true;
	}
	OpenRoomList(){
		if (!this.model.getNowRoomOpen()){
			this.ui.node_room_frame = cc.instantiate(this.ui.prefab_room_frame)
			this.node.parent.addChild(this.ui.node_room_frame);
			this.model.setNowRoomOpen(true);
		}
	}
}
//c, 控制
@ccclass
export default class Club_LobbyDownCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Prefab)
	prefab_room_frame:cc.Prefab = null

	@property(cc.Node)
	btn_voice:cc.Node = null

	@property(cc.Node)
	btn_icon:cc.Node = null

	@property(cc.Node)
	btn_send:cc.Node = null

	@property(cc.Node)
	node_editbox_content:cc.Node = null

	@property(cc.EditBox)
	editbox_content:cc.EditBox = null

	@property(cc.Node)
	node_iconContent:cc.Node = null

	@property(cc.Node)
	node_iconClose:cc.Node = null

	@property(cc.Node)
	node_iconList:cc.Node = null

	@property(cc.Node)
	node_chat:cc.Node = null

	@property(cc.Node)
	node_room:cc.Node = null

	@property(cc.Node)
	btn_openCreate:cc.Node = null

	@property(cc.Node)
	btn_closeCreate:cc.Node = null

	@property(cc.Node)
	btn_baseRoom:cc.Node = null

	@property(cc.Node)
	btn_publicRoom:cc.Node = null

	@property(cc.Node)
	btn_nowRoom:cc.Node = null


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
		this.connect(G_UiType.image, this.ui.btn_voice,this.btn_voice_cb,"语音按钮");
		this.connect(G_UiType.image, this.ui.btn_icon,this.btn_icon_cb,"表情按钮");
		this.connect(G_UiType.image, this.ui.btn_send,this.btn_send_cb,"发送按钮");
		this.connect(G_UiType.edit, this.ui.node_editbox_content,this.editbox_content_cb,"发送按钮");
		this.connect(G_UiType.image, this.ui.node_iconClose,this.node_iconClose_cb,"关闭表情界面");
		this.connect(G_UiType.image, this.ui.btn_openCreate,this.btn_openCreate_cb,"开启房间控制");
		this.connect(G_UiType.image, this.ui.btn_closeCreate,this.btn_closeCreate_cb,"关闭房间控制");
		this.connect(G_UiType.image, this.ui.btn_baseRoom,this.btn_baseRoom_cb,"普通创建");
		this.connect(G_UiType.image, this.ui.btn_publicRoom,this.btn_publicRoom_cb,"特殊创建");
		this.connect(G_UiType.image, this.ui.btn_nowRoom,this.btn_nowRoom_cb,"现有房间列表");
		
	}
	

	addTypeCallBak(){
		if (this.model.getIconCallOpen() == true){
			return 
		}
		this.model.setIconCallOpen(true);
		let count = this.view.ui.node_iconList.childrenCount,
			btns = this.view.ui.node_iconList.children;
		console.log("count:"+count);
		
		for(var i=0; i<count; i++)
		{  
			let curBtn = btns[i];
            this.connect(G_UiType.image, curBtn, this.node_icon_cb, '图标:btn_'+i)
		} 
	}

	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end

	private btn_voice_cb(node, event){

	}

	private btn_icon_cb(node, event){
		this.addTypeCallBak();
		this.view.OpenIconList();
	}

	private btn_send_cb(node, event){
		console.log("btn_send_cb");
		let content = this.model.getChatContent();
		if (content == ""){
			FrameMgr.getInstance().showTips(this.model.getChatPlaceholder());
			return
		}
		/*
		//测试数据
		let room_data = {
			type:"泉州麻将",
			pay:"AA制度：10", 
			count:"3/4", 
			round:"10局", 
			time:"10:19",
		}
		let data = {
			pos:CHAT_POS_TYPE.POS_PLAYER,
			icon:0,
			name:this.model.myinfo.id,
			type:CHAT_TYPE.TYPE_BLEND,
			text:content,
			room_data:room_data,
		}
		this.view.addChatStrip(data);*/

		this.model.setChatContent("");
		this.ui.editbox_content.string = "";
	}

	private editbox_content_cb(str, event){
		console.log("editbox_content_cb");
		if (str == "editing-did-ended"){
			let content = this.ui.editbox_content.string;
			this.model.setChatContent(content);
		}
	}

	private node_iconClose_cb(node, event){
		this.view.CloseIconList();
	}

	private node_icon_cb(node, event){
		let icon_pic = node.getComponent(cc.Sprite);
		
		this.view.addEditboxContent(icon_pic.spriteFrame.name);

		this.view.CloseIconList();
	}
	private btn_openCreate_cb(node, event){
		this.view.OpenNodeRoom();
	}
	private btn_closeCreate_cb(node, event){
		this.view.OpenNodeChat();
	}
	private btn_baseRoom_cb(node, event){
		console.log("btn_baseRoom_cb");
	}
	private btn_publicRoom_cb(node, event){
		console.log("btn_publicRoom_cb");
	}
	private btn_nowRoom_cb(node, event){
		this.view.OpenRoomList();
	}
}