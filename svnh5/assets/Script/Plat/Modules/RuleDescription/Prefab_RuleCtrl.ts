/*
author: YOYO
日期:2018-01-12 14:50:18
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import BehaviorMgr from "../../GameMgrs/BehaviorMgr";
import GoodsCfg from "../../CfgMgrs/GoodsCfg";
import UiMgr from "../../GameMgrs/UiMgr";
import GameCateCfg from "../../CfgMgrs/GameCateCfg";
import ServerMgr from "../../../AppStart/AppMgrs/ServerMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_RuleCtrl;

//模型，数据处理
class Model extends BaseModel{
	private left_id_list = null
	private game_type_num:number = null
	private type_num:number = null
	private left_gap:number = null
	private games:any = null
	top_list = null
	constructor()
	{
		super();
		this.games = GameCateCfg.getInstance().getGames();
		this.left_id_list = new Array();
		this.top_list = new Array();
		this.game_type_num = 0;
		this.type_num = 0;
		this.left_gap = 3;

		//测试数据
		this.addLeftIdList()
	}
	public addLeftIdList(){
		for (let i = 0; i < this.games.length; i++){
			this.left_id_list.push(this.games[i]);
		}
	}
	public getLeftIdList(){
		return this.left_id_list;
	}
	public setGameTypeNum(_type){
		this.game_type_num = _type;
	}
	public getGameTypeNum(){
		return this.game_type_num;
	}
	public setTypeNum(_type){
		this.type_num = _type;
	}
	public getTypeNum(){
		return this.type_num;
	}
	public getLeftListGap(){
		return this.left_gap;
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
        //在这里声明ui
		node_left_btns:null,
		node_top_btns:null,
		web_down_content:null,
		node_close_btn:null,
		node_btn_gap:null,
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
		this.ui.node_left_btns = ctrl.node_left_btns;
		this.ui.node_top_btns = ctrl.node_top_btns;
		this.ui.web_down_content = ctrl.web_down_content;
		this.ui.node_close_btn = ctrl.node_close_btn;
		this.ui.node_btn_gap = ctrl.node_btn_gap;

		this.addLeftClickBtn();
		this.refreshContentVisible();
		this.setTopClickName();
		this.setTopClick();
	}
	

	private refreshContentVisible(){
		var ruleType = this.model.getTypeNum();
		var gameType = this.model.getGameTypeNum();
		console.log("ruleType(顶部列表)", ruleType);
		console.log("gameType(左部列表)", gameType);
		let game=this.model.games[gameType];
		let url=ServerMgr.getInstance().getGameRuleUrl(game.code,ruleType+1);
		
		this.ui.web_down_content.url = url 
	}
	//动态加载左边的按钮（根据服务端数据id,目前用测试数据）
	public addLeftClickBtn(){
		let left_list = this.model.getLeftIdList(),
			left_count = left_list.length;
		this.setRankHeight(left_count);
		for (let i = 0; i < left_count; i++){
			//创建BUTTON 控件
			let curNode:cc.Node = cc.instantiate(this.ui.node_btn_gap);
			curNode.parent = this.ui.node_left_btns;
			curNode.x = 0;
			curNode.active = true;
			//创建控件上的文字（到时可替换成贴图）
			let label_node = curNode.getChildByName("Label");
			let label_text = label_node.getComponent(cc.Label);
			label_text.string = left_list[i].name;
			console.log("left_list[i]:"+left_list[i].name);
		}
	}
	//设置右边拖动条
	public setRankHeight(count){
		let size_btn = this.ui.node_btn_gap;
		let height = count * (size_btn.height + this.model.getLeftListGap());
		if (this.ui.node_left_btns.height <height )
			this.ui.node_left_btns.height = height;
	}
	private setTopClickName(){
		let node_list = this.ui.node_top_btns.children,
			node_count = this.ui.node_top_btns.childrenCount;
		for(let i = 0; i < node_count; i ++){
			let node_data = node_list[i];
			this.model.top_list.push(node_data.name);
		}
	}
	//切换顶部按钮的点击表现
    public setTopClick(){
        let node_count = this.ui.node_top_btns.childrenCount,
			type_num = this.model.getTypeNum();
        for(let i = 0; i < node_count; i ++){
			let node_name = this.model.top_list[i],
            	node_data = this.ui.node_top_btns.getChildByName(node_name),
				click_node = node_data.getComponent(cc.Toggle);
			node_data.zIndex = 0;
			if(i == type_num){
				node_data.zIndex = 1;
			}
		}
    }
}
//c, 控制
@ccclass
export default class Prefab_RuleCtrl extends BaseCtrl {
	//这边去声明ui组件

    @property(cc.Node)
	node_left_btns:cc.Node = null
	
	@property(cc.Node)
	node_top_btns:cc.Node = null
	
	@property(cc.WebView)
	web_down_content:cc.WebView = null
	
	@property(cc.Node)
	node_close_btn:cc.Node = null
	
	@property(cc.Node)
    node_btn_gap:cc.Node = null

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
		this.connect(G_UiType.image, this.ui.node_close_btn, this.node_close_cb, '关闭界面');
		let node_list = this.ui.node_top_btns.children,
			 node_count = this.ui.node_top_btns.childrenCount;
        for(let i = 0; i < node_count; i++){
			let node_data = node_list[i];
            this.connect(G_UiType.button, node_data, (node, event)=>{
				let index = i;
				this.node_top_cb(index, node, event);
			}, '点击顶部控件'+i);
		}
		this.addConnectUi();
	}
	//根据服务端数据添加左边控件(而后进行绑定回调)
	private addConnectUi(){
		let node_list = this.ui.node_left_btns.children,
			 node_count = this.ui.node_left_btns.childrenCount,
			 id_list = this.model.getLeftIdList();
		if (node_count == 0){return;}
        for(let i = 0; i < node_count; i++){
			let node_data = node_list[i];
            this.connect(G_UiType.button, node_data, (node, event)=>{
				let index = i;
				// let type_index = id_list[index];
				this.node_left_cb(index, node, event);
			}, '点击左边控件'+i);
        }
	}

	start () {
	}

	public setTypeIndex(index){
		this.model.setTypeNum(index);
		this.view.refreshContentVisible();
		this.view.setLeftClickIndex();
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
    //按钮或任何控件操作的回调begin
	public node_close_cb(node, event){
		console.log('node_close_cb')
		this.finish();
	}

	public node_left_cb(index, node, event){
		console.log('node_left_cb'+index);
		this.model.setGameTypeNum(index);
		this.view.refreshContentVisible();
	}
	public node_top_cb(index, node, event){
		console.log('node_top_cb:'+index);
		this.model.setTypeNum(index);
		this.view.setTopClick();
		this.view.refreshContentVisible();
	}
    //end
}