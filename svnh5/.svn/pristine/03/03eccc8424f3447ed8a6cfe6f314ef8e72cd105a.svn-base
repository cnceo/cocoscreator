/*
author: JACKY
日期:2018-03-05 16:23:02
*/
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import UiMgr from "../../../Plat/GameMgrs/UiMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import UserMgr from "../../../Plat/GameMgrs/UserMgr"
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_PreventionCheatingCtrl;
//模型，数据处理
class Model extends BaseModel{
	public users = null;
	public userInfo = null;
	public logicseatid = null;
	public viewSeatId = null;
	public uid = null;
	constructor()
	{
		super();
	}
	getUserInfo(viewSeatId) 
	{
		this.logicseatid=RoomMgr.getInstance().getLogicSeatId(viewSeatId); 
		this.uid=RoomMgr.getInstance().users[this.logicseatid]; 
		this.userInfo = UserMgr.getInstance().getUserById(this.uid);
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		label_external:null,
		label_positioning:null,
		label_ip:null,
		img_sao:null,
		externalPlayerNode:null,
		positioningPlayerNode:null,
		IpPlayerNode:null,
		SaoPlayerNode:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
		this.addGrayLayer();
		this.node.zIndex=300;
	}
	//初始化ui
	initUi()
	{
		this.ui.label_external = ctrl.label_external;
		this.ui.label_positioning = ctrl.label_positioning;
		this.ui.label_ip = ctrl.label_ip;
		this.ui.img_sao = ctrl.img_sao;
		this.ui.externalPlayerNode = ctrl.externalPlayerNode;
		this.ui.positioningPlayerNode = ctrl.positioningPlayerNode;
		this.ui.IpPlayerNode = ctrl.IpPlayerNode;
		this.ui.SaoPlayerNode = ctrl.SaoPlayerNode;
	}

	//设置文本
	private setText(label:cc.Label,text:string){
		label.string = text;
	}

	//显示头像
	updateHead (node_img_head:cc.Node){
		if(this.model.userInfo){
			UiMgr.getInstance().setUserHead(node_img_head,this.model.userInfo.headid,this.model.userInfo.headurl);
			node_img_head.active = true;
		}
		else node_img_head.active = false;

	}

	//显示雷达扫描
	runAction(){
		this.ui.img_sao.runAction(cc.rotateBy(10, 3600));
	}
}
//c, 控制
@ccclass
export default class Prefab_PreventionCheatingCtrl extends BaseCtrl {
	view:View = null
	model:Model = null
	//这边去声明ui组件
	@property(cc.Label)
	label_external=null; 
	@property(cc.Label)
	label_positioning=null;
	@property(cc.Label)
	label_ip=null;  
	@property(cc.Node)
	img_sao=null;
	@property(cc.Node)
	externalPlayerNode=null;
	@property(cc.Node)
	positioningPlayerNode=null;
	@property(cc.Node)
	IpPlayerNode=null;
	@property(cc.Node)
	SaoPlayerNode=null;

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
		this.view.runAction();
		let playerList = this.SaoPlayerNode.getChildren();
		for(let i=0;i<playerList.length;i++){
			this.model.getUserInfo(i);
			this.view.updateHead(playerList[i]);

		}
		//显示同IP
		playerList = this.IpPlayerNode.getChildren();
		for(let i=0;i<playerList.length;i++){
			for(let x=0;x<playerList.length;x++){
				if(i!=x){
					this.model.getUserInfo(i);
					let ip1,ip2;
					if(this.model.userInfo){
						ip1 = this.model.userInfo.Ip;
					}
					this.model.getUserInfo(x);
					if(this.model.userInfo){
						ip2 = this.model.userInfo.Ip;
					}
					if(ip1&&ip2&&ip1==ip2){
						this.view.updateHead(playerList[x]);
						this.model.getUserInfo(i);
						this.view.updateHead(playerList[i]);
						this.label_ip.node.active = true;
						this.IpPlayerNode.active = true;
					}	
				}
			}
		}
		//10秒后自动关闭
		this.schedule(()=>{this.finish()},10);
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
}