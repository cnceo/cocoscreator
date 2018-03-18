import BaseModel from "../../Libs/BaseModel";
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import UiMgr from "../../GameMgrs/UiMgr";
import ClubMgr from "../../GameMgrs/ClubMgr";
import BehaviorMgr from "../../GameMgrs/BehaviorMgr"

const {ccclass, property} = cc._decorator;
let ctrl : Club_Application;
//模型，数据处理
class Model extends BaseModel{
    applyList:any = [];
    blackList:any = [];
    listMaxCount:any = null;
    applyItemBegin:any = null;
    applyPage:any = null;
    blacklistItemBegin:any = null;
    blacklistPage:any = null;
    bApplyListAdded:boolean = null;
    bBlacklistAdded:boolean = null;
    clubId:any = null;
	constructor()
	{
        super();
        this.listMaxCount = 20
        this.applyItemBegin = 0
        this.applyPage = 1
        this.blacklistItemBegin = 0
        this.blacklistPage = 1
        this.clubId = BehaviorMgr.getInstance().getClubSelectId()
	}

    getClubId(){
        return this.clubId;
    }
    getApplyList(){
        return this.applyList;
    }
    getBlackList(){
        return this.blackList;
    }
    getApplyItemBegin(){
        return this.applyItemBegin;
    }
    getBlacklistItemBegin(){
        return this.blacklistItemBegin;
    }
    getListMaxCount(){
        return this.listMaxCount;
    }
    getApplyPage(){
        return this.applyPage;
    }
    getBlacklistPage(){
        return this.blacklistPage;
    }
    getBlacklistAdded(){
        return this.bBlacklistAdded;
    }
    getApplyListAdded(){
        return this.bApplyListAdded;
    }
    setApplyItemBegin(data){
        this.applyItemBegin = data;
    }
    setBlacklistItemBegin(data){
        this.blacklistItemBegin = data;
    }
    setApplyPage(data){
        this.applyPage += data;
    }
    setBlacklistPage(data){
        this.blacklistPage += data;
    }
    setApplyListAdded(state){
        this.bApplyListAdded = state;
    }
    setBlacklistAdded(state){
        this.bBlacklistAdded = state;
    }
    refApplyList(){
        this.applyList = ClubMgr.getInstance().getClubApplyList(this.clubId);
    }
    refBlackList(){
        this.blackList = ClubMgr.getInstance().getClubBlackList(this.clubId);
    }
}

class View extends BaseView{
    constructor(model){
        super(model);
		this.node=ctrl.node;
        this.addGrayLayer();
        this.initUi();
    }
    ui = {
        listPanel: ctrl.ListPanel,
        askListContent: ctrl.AskListContent,
        blackListContent: ctrl.BlackListContent,
        blackListChange: ctrl.BlackListChange,
        blackListItem: ctrl.BlackListItem,
        askListItem: ctrl.AskListItem,
        askItems: [],
        blackItems: [],
        askListView: ctrl.AskListView,
        blacklistView:ctrl.BlacklistView,
    },
    public initUi(){
    
    }
    
    addApplyListItem(){
        let applyList = this.model.getApplyList()
        let applyItemBegin = this.model.getApplyItemBegin();
        let applyItemCount = applyItemBegin + this.model.getListMaxCount();
        applyItemCount = Math.min(applyItemCount, applyList.length)
        for (let i = applyItemBegin; i < applyItemCount; i++) {
            BehaviorMgr.getInstance().setApplyListData(applyList[i]);
            let item = cc.instantiate(this.ui.askListItem);
            item.parent = this.ui.askListContent;
            this.ui.askItems.push(item)
        }
        this.model.setApplyItemBegin(applyItemCount);
        let page = this.model.getApplyPage()
        let count = this.model.getListMaxCount()
        if(applyItemCount == page*count){
            this.model.setApplyPage(1);
        }
        this.model.setBlacklistAdded(true)
    }

    addBlacklistItem(){
        let blackList = this.model.getBlackList()
        let blacklistItemBegin = this.model.getBlacklistItemBegin();
        let blacklistItemCount = blacklistItemBegin + this.model.getListMaxCount();
        blacklistItemCount = Math.min(blacklistItemCount, blackList.length)
        for (let i = blacklistItemBegin; i < blacklistItemCount; i++) {
            BehaviorMgr.getInstance().setBlacklistData(blackList[i]);
            let item = cc.instantiate(this.ui.blackListItem);
            item.parent = this.ui.blackListContent;
            this.ui.blackItems.push(item)
        }
        this.model.setBlacklistItemBegin(blacklistItemCount);
        let page = this.model.getBlacklistPage()
        let count = this.model.getListMaxCount()
        if(blacklistItemCount == page*count){
            this.model.setBlacklistPage(1);
        }
        this.model.setApplyListAdded(true)
    }

    public showAni(action){
        this.ui.listPanel.runAction(action);
    }
}
@ccclass
export default class Club_Application extends BaseCtrl {
    @property({
        tooltip : '界面节点',
        type : cc.Node
    })
    ListPanel : cc.Node = null;

    @property({
        tooltip : '申请列表容器',
        type : cc.Node
    })
    AskListContent : cc.Node = null;

    @property({
        tooltip : '黑名单容器',
        type : cc.Node
    })
    BlackListContent : cc.Node = null;

    @property({
        tooltip : '黑名单变更按钮',
        type : cc.Node
    })
    BlackListChange : cc.Node = null;

    @property({
        tooltip : '黑名单item预置'
        type : cc.Prefab
    })
    BlackListItem : cc.Prefab = null

    @property({
        tooltip : '申请列表item预置'
        type : cc.Prefab
    })
    AskListItem : cc.Prefab = null

    @property({
        tooltip : '申请列表View'
        type : cc.Node
    })
    AskListView : cc.Node = null

    @property({
        tooltip : '黑名单列表View'
        type : cc.Node
    })
    BlacklistView : cc.Node = null


    onLoad () {
        //创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//初始化mvc
		this.initMvc(Model,View); 
        ClubMgr.getInstance().reqClubApplyList(this.model.getClubId(), this.model.getApplyPage());
        ClubMgr.getInstance().reqClubBlacklist(this.model.getClubId(), 1);
        let action = cc.sequence(
            cc.show(),
            cc.moveBy(0.3, -620, 0)) 
        this.view.showAni(action);
    },
    //定义网络事件
	defineNetEvents () {
        this.n_events = {
            "http.reqClubApplyList":this.http_reqClubApplyList,
            "http.reqClubBlacklist":this.http_reqClubBlacklist,
            "http.reqClubJoin":this.http_reqClubJoin,
            "http.reqClubJoinBlacklist":this.http_reqClubJoinBlacklist,
            "http.reqClubBlacklisRemove":this.http_reqClubBlacklisRemove,
            "http.reqClubRefuseJoin":this.http_reqClubRefuseJoin,
        }
    }
	//定义全局事件
	defineGlobalEvents () {}
	//绑定操作的回调
    connectUi () {
        this.connect(G_UiType.button, this.node, this.clickClose, '关闭界面')
        this.connect(G_UiType.scroll, this.view.ui.askListContent, this.applyListScrollCB,'俱乐部申请列表拖动')
        this.connect(G_UiType.scroll, this.view.ui.blackListContent, this.blackListScrollCB, '申请列表黑名单拖动')
        this.connect(G_UiType.button, this.view.ui.blackListChange, this.blackListChangeCB, '开始黑名单变更操作')
        //绑定申请列表玩家按钮事件
	}
	
    
    //start () {
    //},
    clickClose(){
        let action = cc.sequence(
            cc.moveBy(0.3, 620, 0),
            cc.callFunc(function(){
            console.log('关闭')
                ctrl.finish();
            })
        )
        this.ui.listPanel.runAction(action);
    }
    blackListChangeCB(event){
        let items = this.ui.blackListContent.children;
        let count = items.length;
        for(let i = 0; i<count; i++){
            let bshowit = items[i].getChildByName('btnRemove').active; 
            items[i].getChildByName('btnRemove').active = !bshowit;
        }
    }
    applyListScrollCB(node, event){
        if (event.type == cc.Node.EventType.TOUCH_MOVE){
            let applyList = this.model.getApplyList(),
                itemMax = applyList.length;
            if (this.model.getApplyItemBegin() == itemMax){
                return 
            }
            var node_height = node.height - this.ui.askListView.height
            if (node_height < node.y
                &&this.model.getApplyListAdded()==true) {
                this.model.setApplyListAdded(false)
                ClubMgr.getInstance().reqClubApplyList(
                    this.model.getClubId(), 
                    this.model.getApplyPage())
            }
        }
    }
    blackListScrollCB(node, event){
        if (event.type == cc.Node.EventType.TOUCH_MOVE){
            let blacklist = this.model.getBlackList(),
                itemMax = blacklist.length;
            if (this.model.getBlacklistItemBegin() == itemMax){
                return 
            }
            var node_height = node.height - this.ui.blacklistView.height
            if (node_height < node.y
                &&this.model.getBlacklistAdded()==true) {
                this.model.setBlacklistAdded(false)
                ClubMgr.getInstance().reqClubBlacklist(
                    this.model.getClubId(), 
                    this.model.getBlacklistPage())
            }
        }
    }

    http_reqClubApplyList(){
        this.model.refApplyList()
        this.view.addApplyListItem()
    }

    http_reqClubBlacklist(){
        this.model.refBlackList()
        this.view.addBlacklistItem()
    }

    http_reqClubJoin(){
        this.view.ui.askItems = this.view.ui.askListContent.children
    }

    http_reqClubJoinBlacklist(){
        ClubMgr.getInstance().reqClubBlacklist(this.model.getClubId(),this.model.getBlacklistPage())
        this.view.ui.askItems = this.view.ui.askListContent.children
    }

    http_reqClubBlacklisRemove(){
        this.view.ui.blackItems = this.view.ui.blackListContent.children
    }

    http_reqClubRefuseJoin(){
        this.view.ui.askItems = this.view.ui.askListContent.children
    }
    // update (dt) {},
}
