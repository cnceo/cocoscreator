import BaseModel from "../../Libs/BaseModel";
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import UiMgr from "../../GameMgrs/UiMgr";
import ClubMgr from "../../GameMgrs/ClubMgr";
import BehaviorMgr from "../../GameMgrs/BehaviorMgr";
import FrameMgr from "../../GameMgrs/FrameMgr";

const {ccclass, property} = cc._decorator;
let ctrl : Club_AskListCtrl;
//模型，数据处理
class Model extends BaseModel{
    clubId:any=null;
    applyData:any=null;
    bDeleted:any = null;
	constructor()
	{
        super();
        this.clubId = BehaviorMgr.getInstance().getClubSelectId()
        this.applyData = BehaviorMgr.getInstance().getApplyData()
        this.bDeleted = false
        console.log('applyData', this.applyData)
	}
}
class View extends BaseView{
    constructor(model){
        super(model);
		this.node=ctrl.node;
        this.initUi();
    }
    ui = {
    	labUserName: ctrl.LabUserName,
    	btnBlackList: ctrl.BtnBlackList,
    	btnRefuse: ctrl.BtnRefuse,
    	btnAgree: ctrl.BtnAgree,
        imgUserHead: ctrl.ImgUserHead,
    },
    public initUi(){
        this.ui.labUserName.string = this.model.applyData.name;
        let newSpriteFrame = new cc.SpriteFrame(this.model.applyData.icon);
        this.ui.imgUserHead.spriteFrame = newSpriteFrame;
    }
}

@ccclass
export default class Club_AskListCtrl extends BaseCtrl {
   @property({
    	tooltip : '角色名称',
    	type : cc.Label
    })
    LabUserName : cc.Label = null;

    @property({
    	tooltip : '黑名单按钮',
    	type : cc.Node
    })
    BtnBlackList : cc.Node = null;

    @property({
    	tooltip : '拒绝按钮',
    	type : cc.Node
    })
    BtnRefuse : cc.Node = null;

    @property({
    	tooltip : '同意按钮',
    	type : cc.Node
    })
    BtnAgree : cc.Node = null;

    @property({
        tooltip : '头像图片',
        type : cc.Sprite
    })
    ImgUserHead : cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//初始化mvc
		this.initMvc(Model,View);
    },

    //定义网络事件
	defineNetEvents () {
        this.n_events = {
            "http.reqClubJoin":this.http_reqClubJoin,
            "http.reqClubRefuseJoin":this.http_reqClubRefuseJoin,
            "http.reqClubJoinBlacklist":this.http_reqClubJoinBlacklist,
        }
    }
	//定义全局事件
	defineGlobalEvents () {}
	//绑定操作的回调
    connectUi () {
        this.connect(G_UiType.button, this.view.ui.btnBlackList, this.addToBlackListCB, '加入黑名单');
        this.connect(G_UiType.button, this.view.ui.btnRefuse, this.refuseCB, '拒绝玩家');
        this.connect(G_UiType.button, this.view.ui.btnAgree, this.agreeCB, '接受玩家');
	}

    start () {

    },

	refuseCB(event){
        console.log('拒绝玩家')
        var okcb = function(){
            ClubMgr.getInstance().reqClubRefuseJoin(this.model.clubId, this.model.applyData.id)
            this.model.bDeleted = true
        }
        FrameMgr.getInstance().showDialog('是否拒绝该玩家加入？', okcb.bind(this))
    }

	agreeCB(event){
		console.log('接受玩家')
        var okcb = function(){
            ClubMgr.getInstance().reqClubJoin(this.model.clubId, this.model.applyData.id)
            this.model.bDeleted = true
        }
        FrameMgr.getInstance().showDialog('接受该玩家进入俱乐部？', okcb.bind(this))
	}

	addToBlackListCB(event){
        console.log('加入黑名单')
        var okcb = function(){
            ClubMgr.getInstance().reqClubJoinBlacklist(this.model.clubId, this.model.applyData.id)
            this.model.bDeleted = true
        }
        FrameMgr.getInstance().showDialog('将该玩家加入黑名单？', okcb.bind(this))
	}

    http_reqClubJoin(){
        if(this.model.bDeleted == true){
            this.finish()
        }
    }
    http_reqClubRefuseJoin(){
        if(this.model.bDeleted == true){
            this.finish()
        }
    }
    http_reqClubJoinBlacklist(){
        if(this.model.bDeleted == true){
            this.finish()
        }
    }
    // update (dt) {},
}
