/*
author: YOYO
日期:2018-01-13 16:02:51
玩家个人详细信息界面
*/
import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import UserMgr from "../../GameMgrs/UserMgr";
import UiMgr from "../../GameMgrs/UiMgr";
import GameNet from "../../NetCenter/GameNet";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_playerDetailCtrl;
//模型，数据处理
class Model extends BaseModel{
    attr_iphone:number = null

    myInfo:any = null

    lastSex:number = null           //初始性别
    editString:string = null        //个性签名
    lastSignature:string = null     //初始个性签名
	constructor()
	{
        super();
    }
    
    updateMyInfo (){
        //测试
        this.myInfo = UserMgr.getInstance().getMyInfo();
        this._check();
        this.lastSex = this.myInfo.sex;
        this.lastSignature = this.myInfo.signature;
        this.editString = this.myInfo.signature;
    }
    //模拟
    private _check(){
        this.myInfo.name = this.myInfo.name?this.myInfo.name:'unknow';
        this.myInfo.nickname = this.myInfo.nickname?this.myInfo.nickname:'unknow';
        this.myInfo.headurl = this.myInfo.headurl?this.myInfo.headurl:'';
        this.myInfo.sex = this.myInfo.sex?this.myInfo.sex:3;
        this.myInfo.city = this.myInfo.city?this.myInfo.city:'unknow';
        this.myInfo.signature = this.myInfo.signature?this.myInfo.signature:'888888';
        this.myInfo.phone = this.myInfo.phone?this.myInfo.phone:110;
    }
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
        //在这里声明ui
        lab_id:null,
        lab_nickName:null,
        lab_realyName:null,
        lab_address:null,
        lab_iphone:null,
        node_sexMan:null,
        node_sexWomen:null,
        node_img_head:null,
        editBox_info:null
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
        this.ui.lab_id = ctrl.lab_id;
        this.ui.lab_nickName = ctrl.lab_nickName;
        this.ui.lab_realyName = ctrl.lab_realyName;
        this.ui.lab_address = ctrl.lab_address;
        this.ui.lab_iphone = ctrl.lab_iphone;
        this.ui.node_sexMan = ctrl.node_sexMan;
        this.ui.node_sexWomen = ctrl.node_sexWomen;
        this.ui.node_img_head = ctrl.node_img_head;
        this.ui.editBox_info = ctrl.editBox_info;
    }

    updateMyInfo (){
        this.updateID();
        this.updateNickName();
        this.updateRealyName();
        this.updateSex();
        this.updateAddress();
        this.updateIphone();
        this.updateHead();
        this.updateSignature();
    }
    
    private updateID(){
        this.ui.lab_id.string = this.model.myInfo.id;
    }
    private updateNickName(){
        this.ui.lab_nickName.string = this.model.myInfo.nickname;
    }
    private updateRealyName(){
        this.ui.lab_realyName.string = this.model.myInfo.name;
    }
    private updateAddress(){
        this.ui.lab_address.string = this.model.myInfo.city;
    }
    private updateIphone(){
        this.ui.lab_iphone.string = this.model.myInfo.phone;
    }
    //个性签名
    private updateSignature(){
        this.ui.editBox_info.string = this.model.myInfo.signature;
    }
    //1man, 2womon, 3保密
    updateSex(){
        switch(this.model.myInfo.sex){
            case 1:
                //man
                this.ui.node_sexMan.children[0].active = true;
                this.ui.node_sexWomen.children[0].active = false;
                break;
            case 2:
                //women
                this.ui.node_sexMan.children[0].active = false;
                this.ui.node_sexWomen.children[0].active = true;
                break;
            case 3:
                //protected
                this.ui.node_sexMan.children[0].active = false;
                this.ui.node_sexWomen.children[0].active = false;
                break;
        }
    }
    private updateHead (){
        UiMgr.getInstance().setUserHead(this.ui.node_img_head, this.model.myInfo.headid, this.model.myInfo.headurl);
    }
}
//c, 控制
@ccclass
export default class Prefab_playerDetailCtrl extends BaseCtrl {
	//这边去声明ui组件
    @property(cc.Node)
    node_close:cc.Node = null

    @property(cc.Label)
    lab_id:cc.Label = null

    @property(cc.Label)
    lab_nickName:cc.Label = null

    @property(cc.Label)
    lab_realyName:cc.Label = null

    @property(cc.Label)
    lab_address:cc.Label = null

    @property(cc.Label)
    lab_iphone:cc.Label = null

    @property(cc.Node)
    node_sexMan:cc.Node = null
    @property(cc.Node)
    node_sexWomen:cc.Node = null

    @property(cc.Node)
    node_btn_nickName:cc.Node = null

    @property(cc.Node)
    node_btn_realyName:cc.Node = null

    @property(cc.Node)
    node_btn_address:cc.Node = null

    @property(cc.Node)
    node_btn_iphone:cc.Node = null

    @property(cc.Node)
    node_img_head:cc.Node = null

    @property(cc.EditBox)
    editBox_info:cc.EditBox = null
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
        this.n_events = {
            'http.reqMyInfo' : this.http_reqMyInfo, 
            'http.reqEditSex':this.http_reqEditSex,
            'http.ReqIdCardRegistration' : this.http_ReqIdCardRegistration,
        }
	}
	//定义全局事件
	defineGlobalEvents()
	{

	}
	//绑定操作的回调
	connectUi()
	{
        this.connect(G_UiType.image,this.node_close,this.node_close_cb,"点击关闭");
        this.connect(G_UiType.image,this.node_btn_nickName,this.node_btn_nickName_cb,"点击昵称");
        this.connect(G_UiType.image,this.node_btn_realyName,this.node_btn_realyName_cb,"点击实名");
        this.connect(G_UiType.image,this.node_btn_address,this.node_btn_address_cb,"点击地址");
        this.connect(G_UiType.image,this.node_btn_iphone,this.node_btn_iphone_cb,"点击电话");
        this.connect(G_UiType.image,this.node_sexMan,this.node_sexMan_cb,"点击性别男");
        this.connect(G_UiType.image,this.node_sexWomen,this.node_sexWomen_cb,"点击性别女");
        this.connect(G_UiType.edit,this.ui.editBox_info.node,this.editBox_info_cb,"填写个人签名完毕");
	}
	start () {
        this.updateInfo();
	}
    //网络事件回调begin
    
    private http_reqMyInfo (msg){
        this.updateInfo();
    }

	//end
	//全局事件回调begin
	//end
    //按钮或任何控件操作的回调begin
    private editBox_info_cb(name, event){
        console.log(`editBox_info_cb`, event.getUserData().string)
        this.model.editString = event.getUserData().string;
    }
    private node_close_cb(){
        if(this.model.lastSex != this.model.myInfo.sex){
            //性别发生了改变
            UserMgr.getInstance().reqEditSex(this.model.myInfo.sex);
        }
        if(this.model.editString != this.model.lastSignature){
            //个人签名发生了变化
            UserMgr.getInstance().reqEditSignature(this.model.editString);
        }
        this.finish();
    }
    private node_btn_nickName_cb(){
        console.log('node_btn_nickName_cb')
        this.start_sub_module(G_MODULE.changeName);
    }
    private node_btn_realyName_cb(){
        console.log('node_btn_realyName_cb')
        this.start_sub_module(G_MODULE.shimingRenZheng);
    }
    private node_btn_address_cb(){
        console.log('node_btn_address_cb')
        if(cc.sys.isNative){
            this.model.myInfo.city = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAddress", "()Ljava/lang/String;");
            this.view.updateAddress(); 
        }
    }
    private node_btn_iphone_cb(){
        console.log('node_btn_iphone_cb')
        this.start_sub_module(G_MODULE.bingPhone);
    }
    private node_sexMan_cb(){
        console.log('node_sexMan_cb')
        this.model.myInfo.sex = 1
        this.view.updateSex();
    }
    private node_sexWomen_cb(){
        console.log('node_sexWomen_cb')
        this.model.myInfo.sex = 2;
        this.view.updateSex();
    }
    //end
    public updateInfo (){
        this.model.updateMyInfo();
        this.view.updateMyInfo();
    }
    http_ReqIdCardRegistration()
    {
        UserMgr.getInstance().reqMyInfo();
    }
}
