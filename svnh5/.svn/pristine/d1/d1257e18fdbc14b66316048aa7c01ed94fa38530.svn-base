import BaseCtrl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import RoomMgr from "../../GameMgrs/RoomMgr";


import RoomRuleMoreSuggestionCtrl from "./RoomRuleMoreSuggestionCtrl";
import CreateRoomMgr from "../../GameMgrs/CreateRoomMgr";
import BetMgr from "../../GameMgrs/BetMgr";
import GameCateCfg from "../../CfgMgrs/GameCateCfg";
import JbcCfg from "../../CfgMgrs/JbcCfg";
import VerifyMgr from "../../GameMgrs/VerifyMgr";

const {ccclass, property} = cc._decorator;
let ctrl : Prefab_CreateRoomPanelCtrl;

class Model extends BaseModel{
    curGameItem=null;
    games=null;
    gameid=null;
	constructor()
	{
        super();
        this.games = GameCateCfg.getInstance().getGames();
        this.gameid = BetMgr.getInstance().getGameId();
        let index = GameCateCfg.getInstance().getGameIndex(this.gameid);
        this.updateGameSel(index)
	}
    updateGameSel(index)
    {

        let item=this.games[index];
        if(!item)
        {
            return false;
        }
        this.curGameItem=this.games[index];
        this.gameid = this.curGameItem.id;
        return true;
    }
}

class View extends BaseView{
    constructor(model){
        super(model);
		this.node=ctrl.node;
		this.addGrayLayer();
        this.initUi();
        this.initQzmjPanel();
    }
    ui = {
    	btnClose: ctrl.ClosePanel,
    	btnDefaultRule: ctrl.DefaultRule,
    	btnCreateRoom: ctrl.CreateRoom,
    	btnIntroduce: ctrl.Introduce,
    	nodeSubGameContent: ctrl.SubGameContent,
    	nodeToggleContainer: ctrl.ToggleContainer,
		toggleQzmj: ctrl.Qzmj,
		toggleNN: ctrl.NN,
    	nodePanelContent: ctrl.PanelContent,
		prefabQzmjPanel: ctrl.QzmjPanel,
        prefabNNPanenl: ctrl.NNPanel,
        prefabZYQZNNPanenl : ctrl.ZYQZNNPanel,
		prefabsubGameItem: ctrl.subGameItem,
        btnGameItems: [],
	}
	
    public initUi(){
        for(let i=0;i<this.model.games.length;++i)
        {
            let item=this.model.games[i];
            let prefabNode = cc.instantiate(this.ui.prefabsubGameItem);
            prefabNode.active = true;
            prefabNode.getChildByName('New Label').getComponent(cc.Label).string = item.name;
            this.ui.nodeToggleContainer.addChild(prefabNode);
            this.ui.btnGameItems.push(prefabNode);
        }
    }

    updataPanel(gameid){
        switch (gameid) {
            case 1:
                this.initQzmjPanel()
                break;
            case 2:
                //this.initQzmjPanel()
                break;
            case 18:
               this.initZYQZNNPanel();
                break;
            case 20:
                this.initNNPanel()
                break;
            default:
                break;
        }

    }
    initQzmjPanel(){
        let qzmjPanel = cc.instantiate(this.ui.prefabQzmjPanel);
        qzmjPanel.parent = this.ui.nodePanelContent;
    }
    
    initNNPanel(){
        let _NNPanel = cc.instantiate(this.ui.prefabNNPanenl);
        _NNPanel.parent = this.ui.nodePanelContent;
    }
    initZYQZNNPanel(){
        let _NNPanel = cc.instantiate(this.ui.prefabZYQZNNPanenl);
        _NNPanel.parent = this.ui.nodePanelContent;
    }
}

@ccclass
export default class Prefab_CreateRoomPanelCtrl extends BaseCtrl {

    @property({
    	tooltip : '关闭创建房间',
    	type : cc.Node
    })
    ClosePanel: cc.Node = null;

    @property({
    	tooltip : '默认规则',
    	type : cc.Node
    })
    DefaultRule : cc.Node = null;

    @property({
    	tooltip : '创建按钮',
    	type : cc.Node
    })
    CreateRoom : cc.Node = null;

    @property({
    	tooltip : '说明按钮',
    	type : cc.Node
    })
    Introduce : cc.Node = null;

    @property({
    	tooltip : '左侧子游戏按钮容器',
    	type : cc.Node
    })
    SubGameContent : cc.Node = null;

    @property({
    	tooltip : 'toggle组件父节点',
    	type : cc.Node
    })
    ToggleContainer : cc.Node = null;
	
    @property({
    	tooltip : '界面容器',
    	type : cc.Node
    })
    PanelContent : cc.Node = null;

    @property({
    	tooltip : '泉州麻将预置',
    	type : cc.Prefab
    })
	QzmjPanel : cc.Prefab = null;

	@property({
    	tooltip : '牛牛预置',
    	type : cc.Prefab
    })
    NNPanel : cc.Prefab = null;
    
    @property({
    	tooltip : '自由抢庄预置',
    	type : cc.Prefab
    })
	ZYQZNNPanel : cc.Prefab = null;

    @property({
        tooltip : '子游戏按钮预置',
        type : cc.Node
    })
    subGameItem : cc.Node = null;

    onLoad () {
    	//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//初始化mvc
		this.initMvc(Model,View);
    },

    //定义网络事件
	defineNetEvents () {}
	//定义全局事件
	defineGlobalEvents () {}
	//绑定操作的回调
    connectUi () {
        this.connect(G_UiType.button, this.view.ui.btnClose, this.click_Close, '关闭界面');
        this.connect(G_UiType.button, this.view.ui.btnCreateRoom, this.createRoomCB, '创建房间');
        this.connect(G_UiType.button, this.view.ui.btnDefaultRule, this.defaultRuleCB, '点击默认规则');
        this.connect(G_UiType.button, this.view.ui.btnIntroduce, this.introduceCB, '点击规则说明');
        for(let i=0;i<this.ui.btnGameItems.length;++i)
        {
            let btn=this.ui.btnGameItems[i];
            let cb=function()
            {
                this.clickSubGameCB(i);
            }
            this.connect(G_UiType.image, btn, cb, "选择游戏"); 
        }
	}

    start () {

    } 

    
	click_Close(event){
		this.finish();
	}

	createRoomCB(event){
        console.log("付费第三款")
		RoomMgr.getInstance().reqCreateFangKaVerify()
	}

	defaultRuleCB(event){
		console.log('点击默认规则')
		this.start_sub_module(G_MODULE.DefaultRule);
	}

	introduceCB(event){
		console.log('点击说明介绍')
        this.start_sub_module(G_MODULE.RuleDescription);
	}

	clickSubGameCB(index){
        let ret=this.model.updateGameSel(index);
        if(!ret){
            return
        }
		if(this.view.ui.nodePanelContent.children){
			this.view.ui.nodePanelContent.removeAllChildren()
		}
        BetMgr.getInstance().setGameId(this.model.gameid);
        this.view.updataPanel(this.model.gameid);
	}

    // update (dt) {},
}
