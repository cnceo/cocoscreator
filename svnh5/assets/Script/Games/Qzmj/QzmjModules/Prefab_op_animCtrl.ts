/*
author: JACKY
日期:2018-02-09 14:31:48
*/
import BaseCtrl from "../../../plat/Libs/BaseCtrl";
import BaseView from "../../../plat/Libs/BaseView";
import BaseModel from "../../../plat/Libs/BaseModel";
import QzmjLogic from "../QzmjMgr/QzmjLogic";
import { QzmjDef } from "../QzmjMgr/QzmjDef";
import OpAnimMgr from "../../../Plat/GameMgrs/OpAnimMgr"
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_op_animCtrl;
//模型，数据处理
class Model extends BaseModel{
	constructor()
	{
		super();
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	private anim_list;
	public node_bg = null;
	public node_anim = null;
	ui={
		//在这里声明ui
		spriteAtlas:null
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
        this.node.zIndex=100;
		this.ui.spriteAtlas = ctrl.spriteAtlas;
		this.initUi();
	}
	//初始化ui
	initUi()
	{
		//创建背景图和动画
		this.node_bg=  new cc.Node();
		this.node_bg.addComponent(cc.Sprite);
		this.node_bg.getComponent(cc.Sprite).spriteFrame = this.ui.spriteAtlas.getSpriteFrame('BlockOther_back');
		ctrl.node.addChild(this.node_bg);
		this.node_bg.active = false;

		this.node_anim=  new cc.Node();
		this.node_anim.addComponent(cc.Sprite);
		this.node_anim.getComponent(cc.Sprite).spriteFrame = this.ui.spriteAtlas.getSpriteFrame('BlockOther_chi');
		ctrl.node.addChild(this.node_anim);
		this.node_anim.active = false;
	}

	//播放不同动画
	runAnimByIndex(index){
		// this.node.getComponent(cc.Animation).play(index);
		let anim = this.node.getComponent(cc.Animation).getClips()[index];
		this.node.getComponent(cc.Animation).play(anim.name);
		this.node.getComponent(cc.Animation).on('play',()=>{this.node.active = true;} , this);
		this.node.getComponent(cc.Animation).on('finished',()=>{this.node.active = false;} , this);
	}


	//显示不同动作 ，0背景 1-5 吃 碰 杠 胡 自摸
	runActionByIndex(animIndex){
		this.node_anim.active = true;
		let anim_name = null;
		switch(animIndex){
			case 1:
			anim_name = 'BlockOther_chi';
			break;
			case 2:
			anim_name = 'BlockOther_peng';
			break;
			case 3:
			anim_name = 'BlockOther_gang';
			break;
			case 4:
			anim_name = 'BlockOther_hu';
			break;
			case 5:
			anim_name = 'BlockOther_zimo';
			break;
			default:
			break;
		}
		this.node_anim.getComponent(cc.Sprite).spriteFrame = this.ui.spriteAtlas.getSpriteFrame(anim_name);
		this.runAnim(this.node_anim);
	}

	//显示出牌动画 0-3 南东北西 4个座位
	runChuPai(seatId){
		//自己不显示动作
		if(seatId==0)return;
		// this.node_anim.getComponent(cc.Sprite).spriteFrame = this.ui.spriteAtlas.getSpriteFrame(anim_name);
	}

	//吃碰杠动画，放大缩小
	runAnim(action_node1){

		//动作1 从2倍缩小到1倍，显示墨水背景,还有一个动作，从2倍大，然后消失
		//动作1
		action_node1.scale = 2.2;
		action_node1.runAction(cc.sequence(
						cc.fadeOut(0),
						cc.delayTime(0.5),
						cc.fadeIn(0),
						cc.scaleTo(0.1, 1.2),
						cc.callFunc(this.showBg, this),
						cc.delayTime(0.2),
						cc.fadeOut(0.1),
						cc.callFunc(this.hideAnim,this),
					)); 
					

		//动作2
		let action_node2=  new cc.Node();
		action_node2.scale = 2.2;
		this.node.addChild(action_node2);
		action_node2.addComponent(cc.Sprite);
		action_node2.getComponent(cc.Sprite).spriteFrame = action_node1.getComponent(cc.Sprite).spriteFrame;
		action_node2.runAction(cc.sequence( 
						cc.delayTime(0.1),
						cc.fadeOut(0.4),
					)); 
	}
	//显示水墨背景
	showBg(){
		this.node_bg.active = true;
		this.node_bg.runAction(cc.spawn(
			cc.delayTime(0.5),
			cc.fadeOut(0.1),
		)); 
	}
	//隐藏
	hideAnim(){
		this.node_bg.active = false;
		this.node_anim.active = false;
	}
}
//c, 控制
@ccclass
export default class Prefab_op_animCtrl extends BaseCtrl {
	//这边去声明ui组件
	@property(cc.SpriteAtlas)
	spriteAtlas = null;
	
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
		this.n_events={
			//网络消息监听列表	
			onOp:this.onOp,     		
		}
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
	onOp(msg){
		let mySeatId = RoomMgr.getInstance().getMySeatId();
		let seatId = 0;//视图座位
		if(msg.opseatid - mySeatId < 0){
			seatId = 4 - Math.abs(msg.opseatid - mySeatId) 
		}else{
			seatId = msg.opseatid - mySeatId;
		}

		//判断出牌
		if(QzmjDef.op_cfg[msg.event] == QzmjDef.op_chupai) {
			this.view.runChuPai(seatId);
		}

		//判断吃碰杠听胡
		if(this.node.name !=`op_anim${seatId}`){
			//console.log(`${this.node.name}!=op_anim${seatId}`)
			return;
		}
		console.log(`${this.node.name}==op_anim${seatId}`)
		let op=QzmjDef.op_cfg[msg.event]
		let index = 0;
		switch(op){
			case QzmjDef.op_chi:
			index = 0;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_peng:
			index = 1;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_gang:
			index = 2;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_angang:
			index = 2;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_hu:
			index = 3;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_zimo:
			index = 4;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_sanjindao:
			index = 5;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_qianggang_hu:
			index = 6;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_danyou:
			index = 7;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_shuangyou:
			index = 8;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_sanyou:
			index = 9;
			this.view.runAnimByIndex(index);
			break;
			case QzmjDef.op_bazhanghua:
			index = 10;
			this.view.runAnimByIndex(index);
			break;
			default:
			console.log('#error op_anim op is error');
			break;
		}
		 
	}
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
}