import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import RoomMgr from "../../GameMgrs/RoomMgr";
import UserMgr from "../../GameMgrs/UserMgr";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_ApplyDissolutionRoom;
//模型，数据处理
class Model extends BaseModel{
    constructor(){
        super();
        this.mySeatId = RoomMgr.getInstance().getMySeatId();
    }
    updateData() {
        this.mySeatId = RoomMgr.getInstance().getMySeatId()
    }
    getPlayerInfo(seatId) {
        //this.player=QgmjLogic.getInstance().players[this.logicseatid]; 
		let uid=RoomMgr.getInstance().users[seatId]; 
		let userinfo=UserMgr.getInstance().getUserById(uid) 
        return userinfo;
    }
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
    ui={
    //在这里声明ui
        richText_title:ctrl.RichText_title,
        node_tip:ctrl.Node_tip,
        btn_agree:ctrl.Button_agree,
        btn_refuse:ctrl.Button_refuse,
        spriteFrame_ash:ctrl.SpriteFrame_ash,
        spriteFrame_orange:ctrl.SpriteFrame_orange,
        spriteFrame_green:ctrl.SpriteFrame_green,
    };
    constructor(model){
        super(model);
        this.node=ctrl.node;
        this.node.zindex=10000;
        this.initUi();
    }
    //初始化ui
    initUi(){
        this.initTip();
        this.ui.btn_agree.active = true;
        this.ui.btn_refuse.active = true;
    }
    initTip() {
        this.childs = this.ui.node_tip.getChildren();
        for (let i=0; i<this.childs.length; i++) {
            this.childs[i].getComponent(cc.Sprite).spriteFrame = this.ui.spriteFrame_ash;
        }
    }
    updateTip(seatId, msg) {
        let sprite = msg ? this.ui.spriteFrame_green : this.ui.spriteFrame_orange;
        this.childs[seatId].getComponent(cc.Sprite).spriteFrame = sprite;
        if (seatId == this.model.mySeatId) {
            this.ui.btn_agree.active = false;
            this.ui.btn_refuse.active = false;
        }
    }
    setTitle(name) {
        this.ui.richText_title.string = "( <color=#0fffff>"+name+"</color> ) 请求解散包厢";
    }
}
//c, 控制
@ccclass
export default class Prefab_ApplyDissolutionRoom extends BaseCtrl {
    //这边去声明ui组件
    @property(cc.RichText)
    RichText_title=null;
    @property(cc.Node)
    Node_tip=null;
    @property(cc.Node)
    Button_agree=null;
    @property(cc.Node)
    Button_refuse=null;
    @property(cc.SpriteFrame)
    SpriteFrame_ash=null;
    @property(cc.SpriteFrame)
    SpriteFrame_orange=null;
    @property(cc.SpriteFrame)
    SpriteFrame_green=null;

    //声明ui组件end
    onLoad (){
        //创建mvc模式中模型和视图
        //控制器
        this.node.active = false;
        ctrl = this;
        //数据模型
        this.initMvc(Model,View);
    }
    //定义网络事件
    defineNetEvents(){
        this.n_events={
			//网络消息监听列表
            'onApplyDissolutionRoom':this.onApplyDissolutionRoom,
            'onAgreeDissolutionRoom':this.onAgreeDissolutionRoom,
            'onRefuseDissolutionRoom':this.onRefuseDissolutionRoom,
            'onDissolutionRoom':this.onDissolutionRoom,
		}	
    }
    //定义全局事件
    defineGlobalEvents(){
		//全局消息
		this.g_events={ 
			'usersUpdated':this.usersUpdated,   
		}		  
    }
    //绑定操作的回调
    connectUi(){
        this.connect(G_UiType.button, this.ui.btn_agree, this.btn_agree_cb, '同意解散房间');
        this.connect(G_UiType.button, this.ui.btn_refuse, this.btn_refuse_cb, '拒绝解散房间');
    }
    //网络事件回调begin
    onApplyDissolutionRoom(msg) {
        this.node.active = true;
        let playerInfo = this.model.getPlayerInfo(msg.seatId);
        let name = playerInfo.nickname;
        this.view.setTitle(name);
    }
    onAgreeDissolutionRoom(msg) {
        this.view.updateTip(msg.seatId, true);
    }
    onRefuseDissolutionRoom(msg) {
        this.view.updateTip(msg.seatId, false);
    }
    onDissolutionRoom(msg) {
        this.node.active = false;
        this.view.initUi()
        if (msg.result) {
            FrameMgr.getInstance().showTips("玩家申请解散房间成功, 退出游戏 ...", null, 35, cc.color(0,255,0), cc.p(0,0), "Arial", 1500);
		    //返回游戏选择界面,理论上还要释放资源
		    this.start_module(G_MODULE.Plaza)
        }
        else {
            FrameMgr.getInstance().showTips("玩家申请解散房间失败, 继续游戏 ...", null, 35, cc.color(220,24,63), cc.p(0,0), "Arial", 1500);
        }
    }
    //end
    //全局事件回调begin
    usersUpdated(msg) {
        this.model.updateData();
    }
    //end
    //按钮或任何控件操作的回调begin
    btn_agree_cb() {
		RoomMgr.getInstance().agreeDissolutionRoom()
    }
    btn_refuse_cb() {
		RoomMgr.getInstance().refuseDissolutionRoom()
    }
    //end
}
