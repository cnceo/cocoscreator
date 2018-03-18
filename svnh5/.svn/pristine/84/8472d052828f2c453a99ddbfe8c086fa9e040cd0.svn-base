/*
author: Justin
日期:2018-01-12 18:52:26
*/
import BaseControl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import UiMgr from "../../GameMgrs/UiMgr";
import ModuleMgr from "../../GameMgrs/ModuleMgr";
import RoomMgr from "../../GameMgrs/RoomMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_JoinRoomCtrl;
//模型，数据处理
class Model extends BaseModel{
	numarr=[];//存放输入的数字 
	maxlength=6;
	roomId=null;
	constructor()
	{
		super(); 
	}
	pushNumber(num)
	{
		if(this.numarr.length>=this.maxlength)
		{
			return;
		}
		this.numarr.push(num);
		return this.numarr.length>=this.maxlength;
	}
	delTail(){
		if(this.numarr.length>0)
		{
			this.numarr.remove(this.numarr.length-1);
		}
	}
	getRoomId(){

		this.roomId=0;
		let beishu=1;
		for(let i = this.numarr.length-1;i>=0;i--)
		{ 
			let num=this.numarr[i]; 
			this.roomId+=num*beishu;
			beishu*=10;
		}  
		return this.roomId;
	}
	reset(){
		this.numarr=[];
	}
	updateRule(){

	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		labelNumArr:[],
		btnnumarr:[],
		btn_reset:null,
		btn_close:null,
		btn_del:null,
		panel_inputroomid:null,
		panal_roomid:null,
		panel_rule:null,
		btn_enter:null,
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
		this.ui.btn_reset=ctrl.btn_reset;
		this.ui.btn_close=ctrl.btn_close;
		this.ui.btn_del=ctrl.btn_del;
		this.ui.panel_inputroomid=ctrl.panel_inputroomid;
		this.ui.panal_roomid=ctrl.panal_roomid;
		this.ui.panel_rule=ctrl.panel_rule; 
		this.ui.btn_enter=ctrl.btn_enter; 
		this.ui.panel_rule.active=false;
		
		for(let i = 0;i<10;i++)
		{  
			let btnNum=this.ui.panel_inputroomid.getChildByName(`btn_num_${i}`)
			this.ui.btnnumarr.push(btnNum);
		}  
		for(let i = 0;i<this.model.maxlength;++i)
		{  
			let labelNum=this.ui.panal_roomid.getChildByName(`num_${i}`).getComponent(cc.Label)
			labelNum.node.active=false;
			this.ui.labelNumArr.push(labelNum);
		}  
	}
	updateRoomId()
	{
		for(let i=0;i<this.ui.labelNumArr.length;i++)
		{
			let labelNum=this.ui.labelNumArr[i];
			let value=this.model.numarr[i];
			let active=value!=null;
			if(active)
			{
				labelNum.string=value;
			}
			labelNum.node.active=active;
		}
	}
	showRule(){
		this.ui.panel_rule.active=true;
	}
}
//c, 控制
@ccclass
export default class Prefab_JoinRoomCtrl extends BaseControl {
	//这边去声明ui组件
	@property({
		tooltip : "关闭",
		type : cc.Node
	})
	btn_close : cc.Node = null;

	@property({
		tooltip : "重置",
		type : cc.Node
	})
	btn_reset : cc.Node = null;

	@property({
		tooltip : "删除",
		type : cc.Node
	})
	btn_del : cc.Node = null; 
	@property({
		tooltip : "输入面板",
		type : cc.Node
	})
	panel_inputroomid:cc.Node = null; 
	

	@property({
		tooltip : "房间号显示",
		type : cc.Node
	})
	panal_roomid:cc.Node = null; 

	
	@property({
		tooltip : "房间规则",
		type : cc.Node
	})
	panel_rule:cc.Node = null; 

	
	@property({
		tooltip : "进入",
		type : cc.Node
	})
	btn_enter:cc.Node = null; 
 
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.model = new Model();
		//视图
		this.view = new View(this.model);
		//引用视图的ui
		this.ui=this.view.ui;
		//定义网络事件
		this.defineNetEvents();
		//定义全局事件
		this.defineGlobalEvents();
		//注册所有事件
		this.regAllEvents()
		//绑定ui操作
		this.connectUi();
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events={ 
			'http.reqFangKaCfg':this.http_reqFangKaCfg,  
		}
		
	}
	//定义全局事件
	defineGlobalEvents()
	{

	}
	//绑定操作的回调
	connectUi()
	{
		this.connect(G_UiType.image, this.ui.btn_close, this.btn_close_cb, "关闭按钮");
		this.connect(G_UiType.image, this.ui.btn_reset, this.btn_reset_cb, "重置");
		this.connect(G_UiType.image, this.ui.btn_del, this.btn_del_cb, "删除");
		this.connect(G_UiType.image, this.ui.btn_enter, this.btn_enter_cb, "进入");
		
		for(let i = 0;i<this.ui.btnnumarr.length;i++)
		{   
			let btnNumCb=function(){
				this.inputNumber(i);
			}
			let btnNum=this.ui.btnnumarr[i]; 
			this.connect(G_UiType.image, btnNum, btnNumCb, `点击输入房间号按钮${i}`); 
		}   
	}
	http_reqFangKaCfg(){
		this.model.updateRule();
		this.view.showRule(); 
	}
	btn_enter_cb(){ 
		let roomId = this.model.getRoomId(); 
		RoomMgr.getInstance().reqFangKaVerify(roomId);
	}
	inputNumber(number)
	{
		console.log("点击了",number)
		let complete=this.model.pushNumber(number);
		this.view.updateRoomId();
		if(complete)
		{
			let roomId = this.model.getRoomId(); 
			RoomMgr.getInstance().reqFangKaCfg(roomId);
		}
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_close_cb ():void {
		this.finish();
	}

    private btn_reset_cb():void{
		this.model.reset();
		this.view.updateRoomId();
	}

	private btn_del_cb():void{
		this.model.delTail();
		this.view.updateRoomId();
	}
	// //加入房间
	// private JoinRoom_cb () : void {
	// 	let roomId = this.Label_RoomId.string;
	// 	if (roomId.length < 6) {
	// 		return;
	// 	}
	// 	RoomMgr.getInstance().reqFangKaVerify(roomId);
	// }
	//end
}