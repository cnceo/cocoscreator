/*
author: HJB
日期:2018-02-28 10:20:12
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import BehaviorMgr from "../../GameMgrs/BehaviorMgr";
import ClubMgr from "../../GameMgrs/ClubMgr";
import UserMgr from "../../GameMgrs/UserMgr";
import FrameMgr from "../../GameMgrs/FrameMgr";
import UiMgr from "../../GameMgrs/UiMgr";



const OPEN_GAME_MGR = {
	MEMBER:0,
	MANAGE:1,
}

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_MemberListCtrl;
//模型，数据处理
class Model extends BaseModel{
	private club_id = null
	private club_data = null
	private member_list = null
	private user_identity:string = null
	private open_game:number = null
	private member_begin:number = null
	private member_num:number = null
	private member_page:number = null
	private club_record:boolean = true
	constructor()
	{
		super();
		this.member_num = 20;
		this.user_identity = IDENTITY_TYPE.MEMBER;
		this.club_id = BehaviorMgr.getInstance().getClubSelectId();
		this.refreshClubData();
		this.setUserIdentity();
		this.member_begin = 0;
		this.member_page = 1;
	}
	getClubId(){
		return this.club_id;
	}
	getMemberList(){
		return this.member_list;
	}
	getClubData(){
		return this.club_data;
	}
	refreshClubData(){
		this.club_data = ClubMgr.getInstance().getClubInfo(this.club_id);
		
		this.open_game = this.club_data.openGame;
	}
	refreshMemberList(){
		this.member_list = ClubMgr.getInstance().getClubMemberList(this.club_id);
	}
	setUserIdentity(){
		this.user_identity = ClubMgr.getInstance().getClubIdentity(this.club_id);
	}
	getUserIdentity(){
		return this.user_identity;
	}
	getOpenGame(){
		return this.open_game;
	}
	setOpenGame(data){
		this.open_game = data;
	}
	getMemberBegin(){
		return this.member_begin;
	}
	setMemberBegin(data){
		this.member_begin = data;
	}
	getMemberPage(){
		return this.member_page;
	}
	setMemberPage(data){
		this.member_page = data;
	}
	addMemberPage(data){
		this.member_page += data;
	}
	getMemberNum(){
		return this.member_num;
	}
	setClubRecord(state){
		this.club_record = state;
	}
	getClubRecord(){
		return this.club_record;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		node_sprite_all:null,
		node_close:null,
		btn_icon:null,
		club_icon:null,
		club_name:null,
		club_id:null,
		club_count:null,
		node_managerStrip:null,
		btn_manageCtrl:null,
		btn_memberCtrl:null,
		btn_exitClub:null,
		btn_dissolve:null,
		btn_change_name:null,
		node_memberView:null,
		node_memberList:null,
		prefab_member:null,
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
		this.ui.node_sprite_all = ctrl.node_sprite_all;
		this.ui.node_close = ctrl.node_close;
		this.ui.btn_icon = ctrl.btn_icon;
		this.ui.club_icon = ctrl.btn_icon.getComponent(cc.Sprite);
		this.ui.club_name = ctrl.club_name;
		this.ui.club_id = ctrl.club_id;
		this.ui.club_count = ctrl.club_count;
		this.ui.node_managerStrip = ctrl.node_managerStrip;
		this.ui.btn_manageCtrl = ctrl.btn_manageCtrl;
		this.ui.btn_memberCtrl = ctrl.btn_memberCtrl;
		this.ui.btn_exitClub = ctrl.btn_exitClub;
		this.ui.btn_dissolve = ctrl.btn_dissolve;
		this.ui.btn_change_name = ctrl.btn_change_name;
		this.ui.node_memberView = ctrl.node_memberView;
		this.ui.node_memberList = ctrl.node_memberList;
		this.ui.prefab_member = ctrl.prefab_member;

		this.enterRankAction();
		this.refreshAllUi();
	}
	//刷洗所有UI数据
	public refreshAllUi(){
		this.refreshClubIcon();
		this.refreshClubName();
		this.refreshClubId();
		this.refreshClubCount();
		this.refreshOpenGame();
		this.refreshClubIdentity();
		this.refreshAmendName();
		this.refreshClubIconBtn();
	}

	public enterRankAction(){
		this.ui.node_sprite_all.pauseSystemEvents(true);
		var moveBy = cc.moveBy(0.3, cc.p(-this.ui.node_sprite_all.width, 0));
		var callback = cc.callFunc(()=>{
			this.ui.node_sprite_all.resumeSystemEvents(true);
			this.refreshAllUi();
		});
		this.ui.node_sprite_all.runAction(cc.sequence(moveBy, callback));
	}
	public exitRankAction(exitCall){
		this.ui.node_sprite_all.pauseSystemEvents(true);
		var moveBy = cc.moveBy(0.3, cc.p(this.ui.node_sprite_all.width, 0));
		var callback = cc.callFunc(()=>{
			exitCall();
		});
		this.ui.node_sprite_all.runAction(cc.sequence(moveBy, callback));
	}
	refreshClubIcon(){
		UiMgr.getInstance().setUserHead(this.ui.club_icon, 0, this.model.getClubData().icon);
	}
	refreshClubName(){
		this.ui.club_name.string = this.model.getClubData().name;
	}
	refreshClubId(){
		this.ui.club_id.string = this.model.getClubData().id;
	}
	refreshClubCount(){
		let str = ""+this.model.getClubData().mCount;
		str = str + "/" + this.model.getClubData().mMax;
		this.ui.club_count.string = str;
	}
	refreshOpenGame(){
		let identity = this.model.getUserIdentity();
		if (identity != IDENTITY_TYPE.MEMBER){
			let toggle = null;
			if (this.model.getOpenGame() == OPEN_GAME_MGR.MANAGE){
				toggle = this.ui.btn_manageCtrl.getComponent(cc.Toggle);
			}else{
				toggle = this.ui.btn_memberCtrl.getComponent(cc.Toggle);
			}
			console.log("refreshOpenGame:"+this.model.getOpenGame());
			toggle.check();
		}else{
			this.ui.node_managerStrip.active = false;
			this.ui.btn_manageCtrl.pauseSystemEvents(true);
			this.ui.btn_memberCtrl.pauseSystemEvents(true);
		}
	}
	refreshClubIconBtn(){
		let identity = this.model.getUserIdentity();
		if (identity == IDENTITY_TYPE.MEMBER){
			this.ui.btn_icon.pauseSystemEvents(true);
		}else{
			this.ui.btn_icon.resumeSystemEvents(true);
		}
	}
	refreshClubIdentity(){
		let identity = this.model.getUserIdentity();
		if (identity == IDENTITY_TYPE.CAPTAIN){
			this.ui.btn_exitClub.active = false;
			this.ui.btn_dissolve.active = true;
		}else{
			this.ui.btn_exitClub.active = true;
			this.ui.btn_dissolve.active = false;
		}
	}
	refreshAmendName(){
		let identity = this.model.getUserIdentity();
		if (identity == IDENTITY_TYPE.MEMBER){
			this.ui.btn_change_name.active = false;
			this.ui.btn_change_name.pauseSystemEvents(true);
		}else{
			this.ui.btn_change_name.active = true;
			this.ui.btn_change_name.resumeSystemEvents(true);
		}
	} 


	addMemberStrip(){
		let node_member = cc.instantiate(this.ui.prefab_member);
		this.ui.node_memberList.addChild(node_member);
	}
	removeMemberList(){
		this.ui.node_memberList.removeAllChildren();
	}
	refreshMemberList(){
		let count = this.ui.node_memberList.childrenCount,
			curNode:cc.Node = cc.instantiate(this.ui.prefab_member),
			layout = this.ui.node_memberList.getComponent(cc.Layout),
			layoutGap = layout.spacingY,
			layoutHeight = layout.paddingTop + layout.paddingBottom;

		this.ui.node_memberList.height = layoutHeight + count * (curNode.height + layoutGap);
	}
}

//c, 控制
@ccclass
export default class Club_MemberListCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Node)
	node_sprite_all:cc.Node = null

	@property(cc.Node)
	node_close:cc.Node = null

	@property(cc.Node)
	btn_icon:cc.Node = null

	@property(cc.Label)
	club_name:cc.Label = null

	@property(cc.Label)
	club_id:cc.Label = null

	@property(cc.Label)
	club_count:cc.Label = null

	@property(cc.Node)
	node_managerStrip:cc.Node = null

	@property(cc.Node)
	btn_manageCtrl:cc.Node = null

	@property(cc.Node)
	btn_memberCtrl:cc.Node = null

	@property(cc.Node)
	btn_exitClub:cc.Node = null

	@property(cc.Node)
	btn_dissolve:cc.Node = null

	@property(cc.Node)
	btn_change_name:cc.Node = null

	@property(cc.Node)
	node_memberView:cc.Node = null

	@property(cc.Node)
	node_memberList:cc.Node = null

	@property(cc.Prefab)
	prefab_member:cc.Prefab = null
	
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model,View);

		ClubMgr.getInstance().reqClubMember(this.model.getClubId(), this.model.getMemberPage());
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events = {
			"http.reqClubInfo":this.http_reqClubInfo,
			"http.reqClubMember":this.http_reqClubMember,
			"http.reqClubDissolve":this.http_reqClubDissolve,
			"http.reqClubExit":this.http_reqClubExit,
			"http.reqClubChangeAvater":this.http_reqClubChangeIcon,
			"http.reqClubChangeName":this.http_reqClubChangeName,
			"http.reqClubChangeOpenGame":this.http_reqClubChangeOpenGame,
			"http.reqClubChangeIdentity":this.http_reqClubChangeIdentity,
			"http.reqClubKick":this.http_reqClubKick,
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
		this.connect(G_UiType.image, this.ui.node_close, this.node_close_cb, "右关闭界面");
		this.connect(G_UiType.image, this.ui.btn_change_name, this.btn_change_name_cb, "改名");
		this.connect(G_UiType.image, this.ui.btn_icon, this.btn_icon_cb, "改图标");
		this.connect(G_UiType.scroll, this.ui.node_memberList, this.club_view_cb, "拖动动态添加");
		this.connect(G_UiType.image, this.ui.btn_manageCtrl, this.btn_manage_cb, "管理开房");
		this.connect(G_UiType.image, this.ui.btn_memberCtrl, this.btn_all_cb, "成员开房");
			
		let identity = this.model.getUserIdentity();
		if (identity != IDENTITY_TYPE.CAPTAIN)
			this.connect(G_UiType.image, this.ui.btn_exitClub, this.btn_exitClub_cb, "退出俱乐部");
		else{this.connect(G_UiType.image, this.ui.btn_dissolve, this.btn_dissolve_cb, "解散俱乐部");
		}
	}
	start () {
	}
	//网络事件回调begin
	private http_reqClubInfo(){
		this.model.setUserIdentity();
		this.model.refreshClubData();
		this.view.refreshClubIcon();
		this.view.refreshClubName();
		this.view.refreshClubId();
		this.view.refreshClubCount();
		this.view.refreshAmendName();
	}
	private http_reqClubMember(){
		console.log("http_reqGetClubMember");
		this.model.refreshMemberList();
		this.addMemberList();
	}
	private http_reqClubDissolve(){
		this.finish();
	}
	private http_reqClubExit(){
		this.finish();
	}
	private http_reqClubChangeIcon(){
		this.model.refreshClubData();
		this.view.refreshClubIcon();
	}
	private http_reqClubChangeName(){
		FrameMgr.getInstance().showMsgBox("", ()=>{}, "俱乐部名字修改成功！");
		this.model.refreshClubData();
		this.view.refreshClubName();
	}
	private http_reqClubChangeOpenGame(){
		this.model.refreshClubData();
		this.view.refreshOpenGame();
	}
	private http_reqClubChangeIdentity(){
		this.view.removeMemberList();
		this.model.setMemberPage(1);
		this.model.setMemberBegin(0);
		FrameMgr.getInstance().showMsgBox("", ()=>{}, "操作成功");
	}
	private http_reqClubKick(){
		this.model.refreshMemberList();
	}
	private http_onClubInfo(msg){
		let data = msg.states;
		let user_id = UserMgr.getInstance().getUid();
		if (CLUB_INFO_STATE.ENTER == data.state){
			if (data.change_id != user_id){
				if (data.operation_id != user_id){
					this.view.removeMemberList();
					this.model.setMemberBegin(0);
					this.model.setMemberPage(1);
				}
			}
		}else if (CLUB_INFO_STATE.EXIT == data.state){
			if (data.change_id != user_id){
				if (data.operation_id != user_id){
					this.view.removeMemberList();
					this.model.refreshMemberList();
					this.model.setMemberBegin(0);
					this.model.setMemberPage(1);
					this.addMemberList();
				}
			}else if (data.club_id == this.model.getClubId()){
				this.finish();
			}
		}else if (CLUB_INFO_STATE.CHANGEM == data.state){
			console.log("CLUB_INFO_STATE.CHANGEM", data.state);
			console.log(data.operation_id,user_id);
			if (data.operation_id != user_id){
				this.view.removeMemberList();
				this.model.setMemberBegin(0);
				this.model.setMemberPage(1);
			}
		}
	}
	//end
	//全局事件回调begin
	
	
	private addMemberList(){
		let MemberList = this.model.getMemberList(),
			memberBegin = this.model.getMemberBegin(),
			memberCount = memberBegin + this.model.getMemberNum();
		memberCount = Math.min(memberCount, MemberList.length);
		for (let i = memberBegin; i<memberCount; i++){
			let data = MemberList[i];
			BehaviorMgr.getInstance().setClubMemberId(data.id);
			this.view.addMemberStrip();
		}
		this.view.refreshMemberList();
		this.model.setMemberBegin(memberCount);
		this.model.addMemberPage(1);
		this.model.setClubRecord(true)
	}
	//end
	//按钮或任何控件操作的回调begin
	private club_view_cb(node, event){
		if (event.type == cc.Node.EventType.TOUCH_MOVE){
			let rank_list = this.model.getMemberList(),
				itemMax = rank_list.length;
			if (this.model.getMemberBegin() == itemMax){
				return 
			}
			var node_height = node.height - this.ui.node_memberView.height
			if ((node_height * 0.25 * 4) < node.y
			&& this.model.getClubRecord() == true) {
				this.model.setClubRecord(false);
				ClubMgr.getInstance().reqClubMember(
					this.model.getClubId(), 
					this.model.getMemberPage())
			}
		}
	}

	private node_close_cb(node, event){
		console.log('node_close_cb')
		this.view.exitRankAction(()=>{this.finish();});
	}

	private btn_manage_cb(node, event){
		console.log('btn_manage_cb')
		if (OPEN_GAME_MGR.MANAGE == this.model.getOpenGame()){
			return 
		}
		//this.model.setOpenGame(OPEN_GAME_MGR.MANAGE);
		FrameMgr.getInstance().showDialog("开房权限切换为管理员开房", ()=>{
			ClubMgr.getInstance().reqClubChangeOpenGame(this.model.getClubId(), OPEN_GAME_MGR.MANAGE);
			//this.view.refreshOpenGame();
		}, "", ()=>{
			this.view.refreshOpenGame();
		});
	}

	private btn_all_cb(node, event){
		console.log('btn_all_cb')
		if (OPEN_GAME_MGR.MEMBER == this.model.getOpenGame()){
			return 
		}
		//this.model.setOpenGame(OPEN_GAME_MGR.MEMBER);
		FrameMgr.getInstance().showDialog("开房权限切换为成员开房", ()=>{
			ClubMgr.getInstance().reqClubChangeOpenGame(this.model.getClubId(), OPEN_GAME_MGR.MEMBER);
			//this.view.refreshOpenGame();
		}, "",()=>{
			this.view.refreshOpenGame();
		});
		this.view.refreshOpenGame();
	}

	private btn_exitClub_cb(node, event){
		console.log('btn_exitClub_cb')
		FrameMgr.getInstance().showDialog("退出", ()=>{
			ClubMgr.getInstance().reqClubExit(this.model.getClubId());
		}, "退出");
	}

	private btn_dissolve_cb(node, event){
		console.log('btn_dissolve_cb')
		FrameMgr.getInstance().showDialog("解散", ()=>{
			ClubMgr.getInstance().reqClubDissolve(this.model.getClubId());
		}, "解散");
	}

	private btn_change_name_cb(){
		this.start_sub_module(G_MODULE.ClubChangeName)
	}
	
	private btn_icon_cb(){
		this.start_sub_module(G_MODULE.ClubChangeIcon)
	}
	//end
}