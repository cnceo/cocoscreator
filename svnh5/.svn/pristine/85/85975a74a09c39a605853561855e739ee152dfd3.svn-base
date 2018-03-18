/*
author: HJB
日期:2018-03-05 13:54:49
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import BehaviorMgr from "../../GameMgrs/BehaviorMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Club_RecordListCtrl;
//模型，数据处理
class Model extends BaseModel{
	private record_list = null;
	constructor()
	{
		super();
		this.record_list = new Array();
		this.testRecord()
	}
	getRecordList(){
		return this.record_list
	}

	private testRecord(){
		let count = 20;
		for (let i = 0; i<count; i++){
			this.record_list.push({
				id:"1"+i,
				type:i%2==0?"斗地主":"泉州麻将",
				name:"小妹妹开的房间",
				pay:"房主开房",
				time:"2018/11/11 11:11:11",
			})
		}
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		btn_close:null,
		record_list:null,
		record_strip:null,
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
		this.ui.btn_close = ctrl.btn_close;
		this.ui.record_list = ctrl.record_list;
		this.ui.record_strip = ctrl.record_strip;

		this.refreshRecordList();
	}

	refreshRecordList(){
		let list = this.model.getRecordList(),
			count = list.length;
		for (let i = 0; i<count; i++){
			let data = list[i];
			BehaviorMgr.getInstance().setClubRecordData(data);
			this.addRecordStrip();
		}
		this.refreshRecordListHeight();
	}


	addRecordStrip(){
		let record_node = cc.instantiate(this.ui.record_strip);
		this.ui.record_list.addChild(record_node);
	}

	refreshRecordListHeight(){
		let count = this.ui.record_list.childrenCount,
			height = 0;
		if (count != 0){
			let layout = this.ui.record_list.getComponent(cc.Layout),
				gapTop = layout.paddingTop,
				gapBottom = layout.paddingBottom,
				gapY = layout.spacingY,
				node = this.ui.record_list.children[0];

			height = height + gapTop;
			height = height + gapBottom;
			height = height + (count-1) * gapY;
			height = height + node.height * count;
		}
		//设置拖拽层容器大小
		this.ui.record_list.height = height;
	}
}
//c, 控制
@ccclass
export default class Club_RecordListCtrl extends BaseCtrl {
	//这边去声明ui组件

	@property(cc.Node)
	btn_close:cc.Node = null

	@property(cc.Node)
	record_list:cc.Node = null

	@property(cc.Prefab)
	record_strip:cc.Prefab = null

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
		this.connect(G_UiType.image,this.ui.btn_close,this.btn_close_cb,"关闭界面");
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private btn_close_cb(node){
		console.log('node_close_cb')
		this.finish();
	}

	//end
}