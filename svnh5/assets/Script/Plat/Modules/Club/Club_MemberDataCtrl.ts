/*
author: HJB
日期:2018-02-28 10:20:33
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import BehaviorMgr from "../../GameMgrs/BehaviorMgr";
import UiMgr from "../../GameMgrs/UiMgr";
import FrameMgr from "../../GameMgrs/FrameMgr";
import ClubMgr from "../../GameMgrs/ClubMgr";
import UserMgr from "../../GameMgrs/UserMgr";



//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_MemberDataCtrl;



const IDENTITY_NAME = {
	"0":"成员",
	"1":"管理员",
	"3":"会长",
}

const IDENTITY_TOP_DOWN = {
	"0":"1",
	"1":"0",
}

//模型，数据处理
class Model extends BaseModel{
	private member_data = null;
	private member_id = null;
	private member_change:boolean = false;
	private user_identity = null
	private club_id = null
	constructor()
	{
		super();
		this.club_id = BehaviorMgr.getInstance().getClubSelectId();
		this.member_id = BehaviorMgr.getInstance().getClubMemberId();
		this.refreshMemberData();
		this.member_change = false;
	}
	refreshMemberData(){
		this.member_data = ClubMgr.getInstance().getClubMemberData(this.club_id, this.member_id);
		this.user_identity = ClubMgr.getInstance().getClubIdentity(this.club_id);
	}
	getClubId(){
		return this.club_id;
	}
	getMemberTime(){
		return this.member_data.state;
	}
	getMemberId(){
		return this.member_data.id;
	}
	getMemberIcon(){
		return this.member_data.icon;
	}
	getMemberName(){
		console.log(this.member_data.name+"123")
		return this.member_data.name;
	}
	
	getMemberIdentity(){
		return this.member_data.identity;
	}
	getMemberDiamond(){
		return ""+this.member_data.diamond+"/"+this.member_data.diamondMax;
	}
	
	getUserIdentity(){
		return this.user_identity;
	}
	setMemberChange(state){
		this.member_change = state;
	}
	getMemberChange(){
		return this.member_change;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		toggle_line:null,
		pic_icon:null,
		label_name:null,
		label_identity:null,
		label_diamond:null,
		btn_clear:null,
		btn_identity:null,
		btn_kick:null,
		identity_top:null,
		identity_down:null,
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
		this.ui.toggle_line = ctrl.toggle_line;
		this.ui.pic_icon = ctrl.pic_icon;
		this.ui.label_name = ctrl.label_name;
		this.ui.label_identity = ctrl.label_identity;
		this.ui.label_diamond = ctrl.label_diamond;
		this.ui.btn_clear = ctrl.btn_clear;
		this.ui.btn_identity = ctrl.btn_identity;
		this.ui.btn_kick = ctrl.btn_kick;
		this.ui.identity_top = ctrl.identity_top;
		this.ui.identity_down = ctrl.identity_down;

		this.refreshLine();
		this.refreshIcon();
		this.refreshName();
		this.refreshIdentity();
		this.refreshDiamond();
		this.refreshBtnCtrl();
	}
	refreshLine(){
		if (this.model.getMemberTime() == 0)
			this.ui.toggle_line.check();
		else
			this.ui.toggle_line.uncheck();
	}
	refreshIcon(){
		//UiMgr.getInstance().setUserHead(this.ui.pic_icon, 0, this.model.getMemberIcon());
	}
	refreshName(){
		this.ui.label_name.string = this.model.getMemberName()
	}
	refreshIdentity(){
		this.ui.label_identity.string = IDENTITY_NAME[this.model.getMemberIdentity()]
	}
	refreshDiamond(){
		this.ui.label_diamond.string = this.model.getMemberDiamond()
	}
	refreshBtnCtrl(){
		let identity = this.model.getUserIdentity(),
			role_identity = this.model.getMemberIdentity();
			
		switch (identity){
			case IDENTITY_TYPE.CAPTAIN:
				if (role_identity == IDENTITY_TYPE.CAPTAIN){
					this.ui.btn_clear.position = this.ui.btn_identity.position;
					this.ui.btn_identity.destroy();
					this.ui.btn_kick.destroy();
				}else if (role_identity == IDENTITY_TYPE.MANAGE){
					this.ui.identity_top.active = false;
					this.ui.identity_down.active = true;
				}
				else if (role_identity == IDENTITY_TYPE.MEMBER){
					this.ui.identity_top.active = true;
					this.ui.identity_down.active = false;
				}
				break;
			case IDENTITY_TYPE.MANAGE:
				this.ui.btn_clear.destroy();
				this.ui.btn_identity.destroy();
				if (role_identity == IDENTITY_TYPE.CAPTAIN
					|| role_identity == IDENTITY_TYPE.MANAGE){
					this.ui.btn_kick.destroy();
				}
				break;
			case IDENTITY_TYPE.MEMBER:
				this.ui.btn_clear.destroy();
				this.ui.btn_identity.destroy();
				this.ui.btn_kick.destroy();
				break;
			default:
				break;
		}
	}
}
//c, 控制
@ccclass
export default class Club_MemberDataCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property(cc.Toggle)
	toggle_line:cc.Toggle = null

	@property(cc.Sprite)
	pic_icon:cc.Sprite = null

	@property(cc.Label)
	label_name:cc.Label = null

	@property(cc.Label)
	label_identity:cc.Label = null

	@property(cc.Label)
	label_diamond:cc.Label = null

	@property(cc.Node)
	btn_clear:cc.Node = null

	@property(cc.Node)
	btn_identity:cc.Node = null

	@property(cc.Node)
	btn_kick:cc.Node = null

	@property(cc.Node)
	identity_top:cc.Node = null

	@property(cc.Node)
	identity_down:cc.Node = null

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
			"http.reqClubClearDiamond":this.http_reqClubClearDiamond,
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
		if (this.ui.btn_clear != null)
			this.connect(G_UiType.image,this.ui.btn_clear,this.btn_clear_cb,"清理钻石");
		if (this.ui.btn_identity != null)
			this.connect(G_UiType.image,this.ui.btn_identity,this.btn_identity_cb,"成员管理");
		if (this.ui.btn_kick != null)
			this.connect(G_UiType.image,this.ui.btn_kick,this.btn_kick_cb,"踢出");
	}
	start () {
	}
	//网络事件回调begin
	private http_reqClubClearDiamond(){
		if (this.model.getMemberChange() == true){
			this.model.refreshMemberData();
			this.view.refreshDiamond();
			this.model.setMemberChange(false);
		}
	}
	
	private http_reqClubKick(){
		console.log("http_reqClubKick +++ "+this.model.getMemberChange());
		if (this.model.getMemberChange() == true){
			this.finish();
			FrameMgr.getInstance().showMsgBox("", ()=>{}, "改成员已踢出");
		}
	}
	private http_onClubInfo(msg){
		let data = msg.states;
		if (CLUB_INFO_STATE.EXIT == data.state){
			let user_id = UserMgr.getInstance().getUid();
			if (msg.change_id != user_id && this.model.getMemberId() == data.change_id){
				this.finish();
			}
		}
	}
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_clear_cb(node, event){
		console.log("btn_clear_cb");
		FrameMgr.getInstance().showDialog("钻石消耗清零", ()=>{
			this.model.setMemberChange(true);
			ClubMgr.getInstance().reqClubClearDiamond(this.model.getClubId(), this.model.getMemberId());
		}, "");
	}
	private btn_identity_cb(node, event){
		console.log("btn_identity_cb");
		FrameMgr.getInstance().showDialog("修改玩家的限权", ()=>{
			this.model.setMemberChange(true);
			let identity = IDENTITY_TOP_DOWN[this.model.getMemberIdentity()]
			ClubMgr.getInstance().reqClubChangeIdentity(this.model.getClubId(), this.model.getMemberId(),  identity);
		}, "");
	}
	private btn_kick_cb(node, event){
		console.log("btn_kick_cb");
		FrameMgr.getInstance().showDialog("踢出", ()=>{
			this.model.setMemberChange(true);
			ClubMgr.getInstance().reqClubKick(this.model.getClubId(), this.model.getMemberId());
		}, "");
	}
	//end
}