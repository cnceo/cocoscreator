/*
author: YOYO
日期:2018-01-11 18:08:05
*/
import BaseModel from "../../Libs/BaseModel";
import BaseView from "../../Libs/BaseView";
import BaseCtrl from "../../Libs/BaseCtrl";
import QzmjEntry from "../../../Games/Qzmj/QzmjEntry";
import QgmjEntry from "../../../Games/Qgmj/QgmjEntry";
import BetMgr from "../../GameMgrs/BetMgr";
import LoaderMgr from "../../../AppStart/AppMgrs/LoaderMgr";
import GameCateCfg from "../../CfgMgrs/GameCateCfg"; 
import SssEntry from "../../../Games/Sss/SssEntry";
import RoomMgr from "../../GameMgrs/RoomMgr";
import TbnnEntry from "../../../Games/Tbnn/BullEntry";
 

let gameEntrys={
    qzmj:QzmjEntry,
    tbnn:TbnnEntry,
    qgmj:QgmjEntry,
    sss:SssEntry,
}

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : LoadingGameCtrl;
//模型，数据处理
class Model extends BaseModel{
    private _curProgress:number = null                  //当前的进度
    private _maxProgress:number = null                  //最大进度
    private _oneResProgress:number = null               //单次资源加载花费的进度
    private _curLoadingNum:number = null                //加载的资源数量

    private _baseStr:string = null
    private gameDir;
    private gameModuleName;
    private gameCode;
	constructor()
	{
        super();
        this._baseStr = 'load res: ' 
        
        
        let game=GameCateCfg.getInstance().getGameById(BetMgr.getInstance().getGameId())
        this.gameCode=game.code; 
        this.gameDir=game.code.substring(0,1).toUpperCase()+game.code.substring(1); 
         
        this.gameModuleName=`${this.gameDir}Room`
    }
    
    //加载完成后的回调
    public initLoading (){
        this._curLoadingNum = 0;
    }

    //开始进度条
    public startProgress (){
        this._curProgress = 0;
        this._maxProgress = 100;
        this._oneResProgress = Math.floor(this._maxProgress/this._curLoadingNum);
    }
    //增加资源加载总量
    public addResNum (resNum:number = 1){
        this._curLoadingNum += resNum;
    }
    //完成一定数量的资源加载
    public doneLoadResNum (resNum:number = 1):Boolean{
        console.log(this._curLoadingNum)
        this._curLoadingNum -= resNum;
        this._curProgress += this._oneResProgress;
        if(this._curLoadingNum < 1){
            this._curProgress = this._maxProgress;
            return true
        }
        return false
    }
    //获取单个资源加载的进度需求
    public getOneResProgress (){
        return this._oneResProgress;
    }
    //增加进度
    public addProgress (addValue:number){
        this._curProgress += addValue;
        this._curProgress = Math.min(this._curProgress, this._maxProgress);
    }
    //获取当前进度信息
    public getCurProgress ():number{
        return this._curProgress
    }
    //获取基础文字显示
    public getBaseStr (){
        return this._baseStr
    }
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
    ui={
        lab_progress : null,         //进度显示的label
    }
    node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
	}
	//初始化ui
	initUi()
	{
        this.ui.lab_progress = ctrl.lab_progress;
    }
    //更新进度条表现
    public updateProgress (){
        this.ui.lab_progress.string = this.model.getBaseStr() + this.model.getCurProgress() + '%';
    }
}
//c, 控制
@ccclass
export default class LoadingGameCtrl extends BaseCtrl {
    //这边去声明ui组件
    @property(cc.Label)
    lab_progress:cc.Label = null
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离


	onLoad (){
        LoaderMgr.getInstance().releaseAll();
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//初始化mvc
		this.initMvc(Model,View);
	}

	//定义网络事件
	defineNetEvents()
	{
        this.n_events={
			//网络消息监听列表
        'http.reqRoomInfo':this.http_reqRoomInfo,
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
    http_reqRoomInfo()
    {
        this._oneCompleted();
    }
	start () { 
        this.model.initLoading();
        this.model.addResNum(2);
        this.model.startProgress(); 
        RoomMgr.getInstance().reqRoomInfo(); 
        cc.director.preloadScene(this.model.gameModuleName, (err)=> {
            if(err){
                cc.error(err);
            }else{
                cc.loader.loadResDir(`Games/${this.model.gameDir}`, (err, assets)=> {
                    this._oneCompleted();
                });
            }
        }); 
        
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
    //end
 
    
    private _oneCompleted(){
        let isDone = this.model.doneLoadResNum();
        this.view.updateProgress();
        if(isDone){
            //加载完成了
            this._loadDone();
        }
    }
    //加载资源完成
    private _loadDone(){
        gameEntrys[this.model.gameCode].getInstance().registerModules(); 
        this.start_module(this.model.gameModuleName);
    }
 
}
