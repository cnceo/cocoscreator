/*
author: HJB
日期:2018-02-23 15:29:05
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";

import BehaviorMgr from "../../GameMgrs/BehaviorMgr";
import ClubMgr from "../../GameMgrs/ClubMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_LobbyRoomCtrl;

let ROOM_FRAME = {
	name:"room_name",
	type:"room_type",
	pay:"room_pay",
	count:"room_count",
	time:"room_time",
	round:"room_round",
}

//模型，数据处理
class Model extends BaseModel{
	private room_list = null;
	constructor()
	{
		super();
		let index = BehaviorMgr.getInstance().getClubSelectId();
		this.room_list = ClubMgr.getInstance().getClubGameList(index);
	}
	setRoomList(data){
		this.room_list = data;
	}
	getRoomList(){
		return this.room_list;
	}
	comparisonRoom(room_1, room_2){
		if (room_1.name == room_2.name
			&& room_1.type == room_2.type
			&& room_1.pay == room_2.pay 
			&& room_1.mCount == room_2.mCount
			&& room_1.mMax == room_2.mMax
			&& room_1.time == room_2.time
			&& room_1.round == room_2.round){
			return true;
		}
		return false;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		node_room_list:null,
		node_room_frame:null,
		node_room_botton:null,
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
		this.ui.node_room_list = ctrl.node_room_list;
		this.ui.node_room_frame = ctrl.node_room_frame;
		this.ui.node_room_botton = ctrl.node_room_botton;

		let new_room = this.model.getRoomList();
		this.addRoomList(new_room, {})
	}
	getRoomTextCtrl(node:cc.Node, str:string, name:string){
		let node_text = node.getChildByName(name),
			strNode = node_text.getComponent(cc.Label);
		strNode.string = str;
	}
	/*
	data {id, name, type, pay, count, time, round}
	*/
	addRoomStrip(data){
		let node_strip = cc.instantiate(this.ui.node_room_frame);
		node_strip.active = true;
		this.ui.node_room_list.addChild(node_strip);
		//设置房间名
		this.getRoomTextCtrl(node_strip, data.name, ROOM_FRAME.name);
		//设置房间类型
		this.getRoomTextCtrl(node_strip, data.type, ROOM_FRAME.type);
		//设置消费方式
		this.getRoomTextCtrl(node_strip, data.pay, ROOM_FRAME.pay);
		//设置房间人数
		this.getRoomTextCtrl(node_strip, ""+data.mCount+"/"+data.mMax, ROOM_FRAME.count);
		//设置房间时间
		this.getRoomTextCtrl(node_strip, data.time, ROOM_FRAME.time);
		//设置游戏局数
		this.getRoomTextCtrl(node_strip, data.round, ROOM_FRAME.round);
		
		this.refreshRoomListHeight();
	}
	refreshRoomStrip(index, data){
		let node_strip = this.ui.node_room_list[index];
		if (node_strip != null){
			//设置房间名
			this.getRoomTextCtrl(node_strip, data.name, ROOM_FRAME.name);
			//设置房间类型
			this.getRoomTextCtrl(node_strip, data.type, ROOM_FRAME.type);
			//设置消费方式
			this.getRoomTextCtrl(node_strip, data.pay, ROOM_FRAME.pay);
			//设置房间人数
			this.getRoomTextCtrl(node_strip, ""+data.mCount+"/"+data.mMax, ROOM_FRAME.count);
			//设置房间时间
			this.getRoomTextCtrl(node_strip, data.time, ROOM_FRAME.time);
			//设置游戏局数
			this.getRoomTextCtrl(node_strip, data.round, ROOM_FRAME.round);
			
			this.refreshRoomListHeight();
		}
	}
	removeStrip(index){
		let node = this.ui.node_room_list[index];
		if (node != null)
			node.destroy();
	}

	//刷新房间列表
	refreshRoomListHeight(){
		let count = this.ui.node_room_list.childrenCount,
			height = 0;
		if (count != 0){
			let layout = this.ui.node_room_list.getComponent(cc.Layout),
				gapTop = layout.paddingTop,
				gapBottom = layout.paddingBottom,
				gapY = layout.spacingY,
				node = this.ui.node_room_list.children[0];

			height = height + gapTop;
			height = height + gapBottom;
			height = height + Math.floor(count/2) * gapY;
			height = height + node.height * Math.ceil((count)/2);
		}

		//设置拖拽层容器大小
		this.ui.node_room_list.height = height;
	}

	//批量清理多余控件
	removeRoomList(new_room, now_room){
		let new_count = new_room.length,
			now_count = now_room.length,
			removeRoom = new Array();
		for (let i = 0; i<now_count; i++){
			let room = now_room[i],
				bolRmove = false;
			for (var j = 0; j<new_count; j++){
				let data =  new_room[j];
				if (data.id == room.id){
					bolRmove = true;
					break;
				}
			}
			if (!bolRmove){
				removeRoom.splice(0,0,i)
			}
		}
		for (let i = 0; i < removeRoom.length; i++){
			let index = removeRoom[i];
			this.removeStrip(index);
		}
	}

	//批量添加控件
	addRoomList(new_room, now_room){
		let new_count = new_room.length,
			now_count = now_room.length,
			removeRoom = new Array();
		for (let i = 0; i<new_count; i++){
			let room = new_room[i],
				bolRmove = false;
			for (var j = 0; j<now_count; j++){
				let data = now_room[j];
				if (data.id == room.id){
					bolRmove = true;
				}
			}
			if (!bolRmove){
				this.addRoomStrip(room);
			}
		}
	}
}
//c, 控制
@ccclass
export default class Club_LobbyRoomCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property(cc.Node)
	node_room_list:cc.Node = null

	@property(cc.Node)
	node_room_frame:cc.Node = null

	@property(cc.Node)
	node_room_botton:cc.Node = null
	

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
		this.connect(G_UiType.image, this.ui.node_room_botton,()=>{},"遮罩层");
	}
	start () {
	}
	//网络事件回调begin

	//虚拟数据
	addRoomData(){
		let room_list = new Array();
		for (let i = 0; i<9; i++){
			room_list.push({
				id:100+i,
				name:"room_name"+i,
				type:"room_type",
				pay:"room_pay",
				count:"room_count",
				time:"room_time",
				round:"room_round",
			})
		}
		this.refreshRoomList(room_list);
	}

	//刷新房间列表
	refreshRoomList(room_list){
		let now_list = this.model.getRoomList();
		this.view.removeRoomList(room_list, now_list);
		this.view.addRoomList(room_list, now_list);
		this.model.setRoomList(room_list);
	}

	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
}