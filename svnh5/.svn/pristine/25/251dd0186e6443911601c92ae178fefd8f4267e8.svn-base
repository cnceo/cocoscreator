import BaseControl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import UiMgr from "../../GameMgrs/UiMgr";
import ModuleMgr from "../../GameMgrs/ModuleMgr";
import MailMgr from "../../GameMgrs/MailMgr"

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_MailCtrl;
//模型，数据处理
class Model extends BaseModel{
    public MailList : Array<any>;   // 邮件数据
	constructor()
	{
		super();
		this.reqMailList();
	}
	reqMailList()
	{
		MailMgr.getInstance().reqMailList({"class":2});
	}

    updateMailData () {
        this.MailList = MailMgr.getInstance().getMailData();
    }

    setReadMailID (emailID) {
        MailMgr.getInstance().setCurReadMailID(emailID);
    }
    getReadMailID () {
        return MailMgr.getInstance().getCurReadMailID();
    }
    getAllReadMailIDList()
    {
        return MailMgr.getInstance().getAllReadMailIDList();
    }
    getAllGetMailIDList()
    {
        return MailMgr.getInstance().getAllGetMailIDList();
    }
    getMailDataByID(emailID)
    {
        return MailMgr.getInstance().getMailDataByID(emailID);
    }
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		node_ExitsMail : null,
		node_NotExitsMail : null,
		scroll_MailList : null,
		prefab_MailItem : null,
        CloseBtn : null,
		OkBtn : null,
		RefreshBtn : null,
		ReadAllBtn : null,
		GetAllBtn : null,
		Prefab_MailItemDetail:null,
		Node_MailItemDetail:null,
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.addGrayLayer();
		this.initUi();
	}
	//初始化ui
	initUi()
	{
		this.ui.prefab_MailItem = ctrl.Prefab_MailItem;
		this.ui.scroll_MailList = ctrl.Scroll_MailList;
		this.ui.node_ExitsMail = ctrl.ExitsMail;
		this.ui.node_NotExitsMail = ctrl.NotExitsMail;
        this.ui.CloseBtn = ctrl.CloseBtn;
        this.ui.OkBtn = ctrl.OkBtn;
        this.ui.RefreshBtn = ctrl.RefreshBtn;
        this.ui.ReadAllBtn = ctrl.ReadAllBtn;
        this.ui.GetAllBtn = ctrl.GetAllBtn;
		this.ui.node_ExitsMail.active = true;
		this.ui.node_NotExitsMail.active = false;
        this.ui.Prefab_MailItemDetail = ctrl.Prefab_MailItemDetail;
        this.ui.Node_MailItemDetail = ctrl.Node_MailItemDetail;
	}

	updateMailItems () : void {
		let list = this.model.MailList;
		let content : any = this.ui.scroll_MailList.content;
		let width = content.height;
        content.height = 0;
        content.removeAllChildren(); // 进行刷新前先清除掉所有旧 item
		for (let i = 0; i < list.length; i ++) {
			let item = cc.instantiate(this.ui.prefab_MailItem);
			content.addChild(item);
			let name="";
			switch (list[i].class) {
				case 0:
					name="系统邮件";
					break;
				case 1:
					name="好友邮件";
					break;
				default:
					// code...
					break;
			}
			item.getChildByName("FriendMail").getComponent(cc.Label).string = name;
			item.getChildByName("MailDetails").getComponent(cc.Label).string = "邮件标题:"+list[i].mail_title;
            let readbtn = item.getChildByName("btn_readed");
			if (list[i].type==1) {
            	// 带附件邮件
        		ctrl.connect(G_UiType.image, item, ctrl.ReadMail_cb, "id:"+list[i].id+"一封邮件");
				item.getChildByName("fujian").active = true;
				if (list[i].status==2) {
					readbtn.active = false;
					item.getChildByName("yyd Label").active = true;
				}
				else{
            		ctrl.connect(G_UiType.image, readbtn, ctrl.ReadMail_cb, "id:"+list[i].id+"一封邮件");
            		readbtn.name = list[i].id+"";
				}
			}
			else
			{
            	// 不带附件邮件
				item.getChildByName("fujian").active = false;
				readbtn.active = false;
				if (list[i].status>=1) {
					item.getChildByName("yyd Label").active = true;
				}
            	ctrl.connect(G_UiType.image, item, ctrl.ReadMail_cb, "id:"+list[i].id+"一封邮件");
			}
			item.name = list[i].id+"";
			content.height += item.height + content.getComponent(cc.Layout).spacingY;
		}
        let mailItemNum = content.getChildren().length;
        this.ui.node_ExitsMail.active = mailItemNum;
        this.ui.node_NotExitsMail.active = !mailItemNum;
	}
	showCurMailItemDetail () : void {
		let content : any = this.ui.Node_MailItemDetail;
        content.removeAllChildren(); // 进行刷新前先清除掉所有旧 item
		let itemDetail = cc.instantiate(this.ui.Prefab_MailItemDetail);
		content.addChild(itemDetail);
	}
	updateMailItemRead()
	{
		let curMailID = this.model.getReadMailID();
		let mailData = this.model.getMailDataByID(curMailID);
		if (mailData.type == 1) {
			return;
		}
		let content : any = this.ui.scroll_MailList.content;
		let children = content.children;
		for (var i = 0; i < children.length; i++) {
			if (children[i].name == curMailID.toString()) {
				children[i].getChildByName("fujian").active = false;
				children[i].getChildByName("yyd Label").active = true;
				break;
			}
		}
	}
	updateMailItemGet()
	{
		let curMailID = this.model.getReadMailID();
		let content : any = this.ui.scroll_MailList.content;
		let children = content.children;
		for (var i = 0; i < children.length; i++) {
			if (children[i].name == curMailID.toString()) {
				let item = children[i];
	            let readbtn = item.getChildByName(curMailID.toString());
				item.getChildByName("yyd Label").active = true;
				item.getChildByName("fujian").active = false;
				readbtn.active =false;
				break;
			}
		}
	}
	updateAllMailRead()
	{
		let curMailIDList = this.model.getAllReadMailIDList();
		let content : any = this.ui.scroll_MailList.content;
		let children = content.children;
		for (var j = 0; j < curMailIDList.length; j++) {
			for (var i = 0; i < children.length; i++) {
				if (children[i].name == curMailIDList[j].toString()) {
					children[i].getChildByName("fujian").active = false;
					children[i].getChildByName("yyd Label").active = true;
					break;
				}
			}
		}
	}
	updateAllMailGet()
	{
		let curMailIDList = this.model.getAllGetMailIDList();
		let content : any = this.ui.scroll_MailList.content;
		let children = content.children;
		for (var j = 0; j < curMailIDList.length; j++) {
			for (var i = 0; i < children.length; i++) {
				if (children[i].name == curMailIDList[j].toString()) {
					let item = children[i];
		            let readbtn = item.getChildByName(curMailIDList[j].toString());
					item.getChildByName("yyd Label").active = true;
					item.getChildByName("fujian").active = false;
					readbtn.active =false;
					break;
				}
			}
		}
	}
}
//c, 控制
@ccclass
export default class Prefab_MailCtrl extends BaseControl {
	//这边去声明ui组件
	@property({
		tooltip : "关闭按钮",
		type : cc.Node
	})
	CloseBtn : cc.Node = null;

	@property({
		tooltip : "确定按钮",
		type : cc.Node
	})
	OkBtn : cc.Node = null;
	
	@property({
		tooltip : "不存在邮件节点界面",
		type : cc.Node
	})
	NotExitsMail : cc.Node = null;
	
	@property({
		tooltip : "存在邮件节点界面",
		type : cc.Node
	})
	ExitsMail : cc.Node = null;
	
	@property({
		tooltip : "一键领取",
		type : cc.Node
	})
	GetAllBtn : cc.Node = null;
	
	@property({
		tooltip : "一键阅读",
		type : cc.Node
	})
	ReadAllBtn : cc.Node = null;
	
	@property({
		tooltip : "刷新列表",
		type : cc.Node
	})
	RefreshBtn : cc.Node = null;
	
	@property({
		tooltip : "邮件列表",
		type : cc.ScrollView
	})
	Scroll_MailList : cc.ScrollView = null;
	
	@property({
		tooltip : "邮件列表部件",
		type : cc.Prefab
	})
	Prefab_MailItem : cc.Prefab = null;

	@property({
		tooltip : "邮件列表详情",
		type : cc.Prefab
	})
	Prefab_MailItemDetail : cc.Prefab = null;

	@property({
		tooltip : "邮件详情",
		type : cc.Node
	})
	Node_MailItemDetail : cc.Node = null;

	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
        this.initMvc(Model, View);
	}

	//定义网络事件
	defineNetEvents()
	{
        this.n_events = {
            'http.reqMailList' : this.updateMailItemView,
            'http.reqReadMail' : this.http_reqReadMail,
            'http.reqMailGet' : this.http_reqMailGet,
            'http.reqMailAllRead' : this.http_reqMailAllRead,
            'http.reqMailAllGet' : this.http_reqMailAllGet,
            'http.reqMailInfo' : this.http_reqMailInfo,
        }
	}
	//定义全局事件
	defineGlobalEvents()
	{
	}
	//绑定操作的回调
	connectUi()
	{
        // this.updateMailItemView();
		this.connect(G_UiType.image, this.ui.CloseBtn, this.CloseBtn_cb, "关闭按钮");
		this.connect(G_UiType.image, this.ui.OkBtn, this.CloseBtn_cb, "关闭按钮");
		this.connect(G_UiType.image, this.ui.RefreshBtn, this.RefreshBtn_cb, "刷新按钮");
		this.connect(G_UiType.image, this.ui.ReadAllBtn, this.ReadAllBtn_cb, "一键阅读按钮");
		this.connect(G_UiType.image, this.ui.GetAllBtn, this.GetAllBtn_cb, "一键领取按钮");
	}
	start () {
	}
	//网络事件回调begin
    updateMailItemView () {
        //TODO 用本地数据进行刷新 这里最终要在进行确认一下
        console.log("刷新邮件列表");
        this.model.updateMailData();
        this.view.updateMailItems();
    }
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	private CloseBtn_cb (event) : void {
        // 关闭界面的时候静默刷新一次邮件数据
        MailMgr.getInstance().reqMailList({"class":2});
		this.finish();
	}
	private RefreshBtn_cb (event) : void {
        MailMgr.getInstance().reqMailList({"class":2});
	}
	private ReadAllBtn_cb (event) : void {
		if (this.model.getAllReadMailIDList()) {
        	MailMgr.getInstance().reqMailAllRead(this.model.getAllReadMailIDList());
		}
	}
	private GetAllBtn_cb (event) : void {
		if (this.model.getAllGetMailIDList()) {
        	MailMgr.getInstance().reqMailAllGet(this.model.getAllGetMailIDList());
		}
	}
	public ReadMail_cb (target) : void {
        this.model.setReadMailID(parseInt(target.name));
		this.view.showCurMailItemDetail();
	}
    http_reqMailGet () {
        this.view.updateMailItemGet();
    }
    http_reqReadMail()
    {
        this.view.updateMailItemRead();
    }
    http_reqMailAllRead()
    {
    	this.view.updateAllMailRead();
    }
    http_reqMailAllGet()
    {
    	this.view.updateAllMailGet();
    }
    http_reqMailInfo()
    {
    	this.view.updateMailItemRead();
    }
	//end
}
