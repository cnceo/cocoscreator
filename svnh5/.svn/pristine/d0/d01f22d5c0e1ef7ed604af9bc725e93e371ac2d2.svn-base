/*
author: HJB
日期:2018-02-23 15:26:28
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import UiMgr from "../../GameMgrs/UiMgr";
import ClubMgr from "../../GameMgrs/ClubMgr";
import BehaviorMgr from "../../GameMgrs/BehaviorMgr";
import FrameMgr from "../../GameMgrs/FrameMgr";
import UserMgr from "../../GameMgrs/UserMgr";


//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_LobbyCtrl;

//测试数据，走配表
const RIGHT_BTNS = cc.Enum({
    CLUB_CHAT:0,
    CLUB_ROOM:1
})


//模型，数据处理
class Model extends BaseModel{
	private club_list = null
	private club_index:number = null;
	private club_id = null
	constructor()
	{
		super();
		this.club_list = ClubMgr.getInstance().getClubList();
		this.setClubIndex(0);
	}
	getClubList(){
		return this.club_list;
	}
	refreshClubList(){
		this.club_list = ClubMgr.getInstance().getClubList();
		let club_index = this.getClubIdToIndex(this.club_id);
		this.setClubIndex(club_index);
	}
	getClubData(){
		return this.club_list[this.club_index];
	}
	getClubIndex(){
		return this.club_index;
	}
	setClubIndex(index){
		this.club_index = index;
		if (this.club_list.length != 0){
			this.club_id = this.club_list[this.club_index].id
			BehaviorMgr.getInstance().setClubSelectId(this.club_id);
		}
	}
	getClubId(){
		return this.club_id;
	}
	getClubIdToIndex(id){
		let list = this.getClubList();
		for (let i=0; i<list.length; i++){
			let data = list[i];
			if (id == data.id){
				return i;
			}
		}
		return 0;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		prefab_top_btns:null,
		pode_chat_frame:null,
		prefab_room_frame:null,
		prefab_botton_frame:null,
		prefab_notice_frame:null,
		frame_top_btns:null,
		btn_close:null,
		node_left_btns:null,
		node_left_create:null,
		node_left_enter:null,
		node_right_frame:null,
		node_club_member:null,
		node_chat_frame:null,
		node_room_frame:null,
		node_botton_frame:null,
		label_club_name:null,
		label_club_id:null,
		label_club_diamond:null,
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
		this.ui.prefab_top_btns = ctrl.prefab_top_btns;
		this.ui.pode_chat_frame = ctrl.pode_chat_frame;
		this.ui.prefab_room_frame = ctrl.prefab_room_frame;
		this.ui.prefab_botton_frame = ctrl.prefab_botton_frame
		this.ui.prefab_notice_frame = ctrl.prefab_notice_frame;
		this.ui.btn_close = ctrl.btn_close;
		this.ui.node_left_btns = ctrl.node_left_btns;
		this.ui.node_left_create = ctrl.node_left_create;
		this.ui.node_left_enter = ctrl.node_left_enter;
		this.ui.node_right_frame = ctrl.node_right_frame;
		this.ui.node_club_member = ctrl.node_club_member;
		this.ui.label_club_name = ctrl.label_club_name;
		this.ui.label_club_id = ctrl.label_club_id;
		this.ui.label_club_diamond = ctrl.label_club_diamond;

		//测试数据-----
		this.addTopFrame();
		this.addRightFrame();
		//-----

		this.refreshClubName();
		this.refreshClubId();
		this.refreshClubDiamond();
	}
	refreshResreshUi(){
		let list = this.model.getClubList();
		for (let i=0; i<list.length; i++){
			let data = list[i];
			var node_select = this.addClubMember(data.icon, data.name, data.gameCount);
			if (this.model.getClubId() == data.id){
				let select = node_select.getComponent(cc.Toggle);
				select.check();
			}
		}
	}
	removeResreshUi(){
		this.ui.node_left_btns.removeAllChildren();
	}

	refreshClubName(){
		this.ui.label_club_name.string = this.model.getClubData().name;
	}
	refreshClubId(){
		this.ui.label_club_id.string = this.model.getClubData().id;
	}
	refreshClubDiamond(){
		this.ui.label_club_diamond.string = this.model.getClubData().diamond;
	}
	refreshLeftIcon(id){
		let club_index = this.model.getClubIdToIndex(id),
		 	data = this.model.getClubList()[club_index],
		 	node_member = this.ui.node_left_btns.children[club_index];
		let node_icon = node_member.getChildByName("club_icon");

		//设置icon
		let sprite_icon = node_icon.getComponent(cc.Sprite);
	}

	refreshLeftName(id){
		let club_index = this.model.getClubIdToIndex(id),
			data = this.model.getClubList()[club_index],
		 	node_member = this.ui.node_left_btns.children[club_index];
		let node_name = node_member.getChildByName("club_name");
		//设置name
		let label_name = node_name.getComponent(cc.Label);
		label_name.string = data.name;
	}
	refreshLeftCount(id){
		let club_index = this.model.getClubIdToIndex(id),
			data = this.model.getClubList()[club_index],
		 	node_member = this.ui.node_left_btns.children[club_index];
		let node_count = node_member.getChildByName("count");
		//设置桌数
		let label_count = node_count.getComponent(cc.Label);
		label_count.string = ""+data.count;
	}

	addClubMember(icon, name, count){
		let node_member = cc.instantiate(this.ui.node_club_member);
		node_member.parent = this.ui.node_left_btns;
		node_member.active = true;
		node_member.x = 0;
		let node_icon = node_member.getChildByName("club_icon"),
		node_name = node_member.getChildByName("club_name"),
		node_count = node_member.getChildByName("count");

		//设置icon
		let sprite_icon = node_icon.getComponent(cc.Sprite);
		
		//设置name
		let label_name = node_name.getComponent(cc.Label);
		label_name.string = name;
		//设置桌数
		let label_count = node_count.getComponent(cc.Label);
		label_count.string = ""+count;
		return node_member
	}
	addRightFrame(){
		this.removeRightFrame();

		let notice_frame = cc.instantiate(this.ui.prefab_notice_frame);
		this.ui.node_right_frame.addChild(notice_frame);
		notice_frame.y = this.ui.node_right_frame.height/2 - notice_frame.height/2;
		this.ui.node_chat_frame = cc.instantiate(this.ui.pode_chat_frame);
		this.ui.node_right_frame.addChild(this.ui.node_chat_frame)
		this.ui.node_botton_frame = cc.instantiate(this.ui.prefab_botton_frame);
		this.ui.node_right_frame.addChild(this.ui.node_botton_frame)
	}

	removeRightFrame(){
		this.ui.node_right_frame.destroyAllChildren();
	}

	addTopFrame(){
		if (this.ui.frame_top_btns != null){
			this.ui.frame_top_btns.destroy();
			this.ui.frame_top_btns = null;
		}
		this.ui.frame_top_btns = cc.instantiate(this.ui.prefab_top_btns);
		this.node.addChild(this.ui.frame_top_btns);
		this.ui.frame_top_btns.x = this.node.width/2- this.ui.frame_top_btns.width/2;
		this.ui.frame_top_btns.y = this.node.height/2 - this.ui.frame_top_btns.height/2;
	}
}
//c, 控制
@ccclass
export default class Club_LobbyCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Prefab)
	prefab_top_btns:cc.Prefab = null

	@property(cc.Prefab)
	pode_chat_frame:cc.Prefab = null

	@property(cc.Prefab)
	prefab_room_frame:cc.Prefab = null
	
	@property(cc.Prefab)
	prefab_botton_frame:cc.Prefab = null

	@property(cc.Prefab)
	prefab_notice_frame:cc.Prefab = null

	@property(cc.Node)
	btn_close:cc.Node = null

	@property(cc.Node)
	node_left_btns:cc.Node = null

	@property(cc.Node)
	node_left_create:cc.Node = null

	@property(cc.Node)
	node_left_enter:cc.Node = null

	@property(cc.Node)
	node_right_frame:cc.Node = null

	@property(cc.Node)
	node_club_member:cc.Node = null

	@property(cc.Label)
	label_club_name:cc.Label = null

	@property(cc.Label)
	label_club_id:cc.Label = null

	@property(cc.Label)
	label_club_diamond:cc.Label = null

	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model,View);
		this.refreshClubList();
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events = {
			'http.reqClubList':this.http_reqClubList,
			'http.reqClubInfo':this.http_reqClubInfo,
			"http.reqClubDissolve":this.http_reqClubDissolve,
			"http.reqClubExit":this.http_reqClubExit,
			"http.reqClubChangeAvater":this.http_reqClubChangeIcon,
			"http.reqClubChangeName":this.http_reqClubChangeName,
			
			"http.onClubInfo":this.http_onClubInfo,
		}
	}
	//定义全局事件
	defineGlobalEvents()
	{

	}
	//绑定操作的回调
	connectUi()
	{
		this.connect(G_UiType.image, this.ui.btn_close,this.btn_close_cb,"关闭界面");
		this.connect(G_UiType.image, this.ui.node_left_create,this.node_left_create_cb,"创建俱乐部");
		this.connect(G_UiType.image, this.ui.node_left_enter,this.node_left_enter_cb,"进入俱乐部");
	
	}
	refreshClubList(){
		this.view.removeResreshUi();
		this.view.refreshResreshUi();
		var clubNum = this.ui.node_left_btns.childrenCount;
        for(let i = 0; i < clubNum; i ++){
			var left_node = this.ui.node_left_btns.children[i];
			this.connect(G_UiType.image, left_node, (node, event)=>{
                var index = i;
                this._onClick_item(index, node, event)
            }, '选择玩家'+i);
		}
	}
	start () {
	}
	//网络事件回调begin
	http_reqClubList(){
		this.model.refreshClubList();
		let list = this.model.getClubList();
		if (list.length == 0 || list.length == null){
			this.finish();
		}else{
			this.refreshClubList();
		}
	}
	private http_reqClubInfo(){
		this.model.refreshClubList();
		this.view.addTopFrame();
		this.view.refreshLeftIcon();
		this.view.refreshClubName();
		this.view.refreshClubId();
		this.view.refreshClubDiamond();
		this.view.addRightFrame();
	}
	private http_reqClubDissolve(){
		FrameMgr.getInstance().showMsgBox("解散", ()=>{}, "解散");
	}
	private http_reqClubExit(){
		FrameMgr.getInstance().showMsgBox("退出", ()=>{}, "退出");
	}

	private http_reqClubChangeIcon(){
		this.model.refreshClubList();
		this.view.refreshLeftIcon(this.model.getClubId());
		this.view.refreshLeftIcon();
	}
	private http_reqClubChangeName(){
		this.model.refreshClubList();
		this.view.refreshLeftName(this.model.getClubId());
		this.view.refreshClubName();
	}
	private http_onClubInfo(msg){
		let data = msg.states;
		if (CLUB_INFO_STATE.DISSOVE == data.state){
			let user_id = UserMgr.getInstance().getUid();
			if (data.operation_id != user_id){
				FrameMgr.getInstance().showMsgBox("解散", ()=>{}, "解散");
			}
		}
	}

	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_close_cb(node, event){
		console.log('btn_close_cb')
		this.finish();
	}

	private node_left_create_cb(node, event){
		this.start_sub_module(G_MODULE.ClubCreate);
	}

	private node_left_enter_cb(node, event){
		this.start_sub_module(G_MODULE.ClubSeek);
	}
	private _onClick_item(index, node, event){
		this.model.setClubIndex(index);
		ClubMgr.getInstance().reqClubInfo(this.model.getClubId());
	}
	//end
}