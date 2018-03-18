import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import { QgmjDef } from "../QgmjMgr/QgmjDef";
import QgmjLogic from "../QgmjMgr/QgmjLogic";
import QgmjResMgr from "../QgmjMgr/QgmjResMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_InsertWater;
//模型，数据处理
class Model extends BaseModel{
	constructor()
	{
		super();
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
        Button_noBuy:ctrl.Button_noBuy,
        Button_one:ctrl.Button_one,
        Button_two:ctrl.Button_two,
        Button_three:ctrl.Button_three,
	};
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
	}
	//初始化ui
	initUi()
	{
	}
}
//c, 控制
@ccclass
export default class Prefab_InsertWater extends BaseCtrl {
    @property({
        tooltip: "不买",
        type: cc.Node
    })
    Button_noBuy: cc.Node = null;
    @property({
        tooltip: "插2水",
        type: cc.Node
    })
    Button_one: cc.Node = null;
    @property({
        tooltip: "插3水",
        type: cc.Node
    })
    Button_two: cc.Node = null;
    @property({
        tooltip: "插5水",
        type: cc.Node
    })
    Button_three: cc.Node = null;
	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
        ctrl = this;
        this.node.active=false;
		//数据模型
		this.initMvc(Model,View);
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events={
            onProcess: this.onProcess,
            onCallScore: this.onCallScore,
		}
	}
	//定义全局事件
	defineGlobalEvents()
	{

	}
	//绑定操作的回调
	connectUi()
	{
        this.connect(G_UiType.button, this.ui.Button_noBuy, this.clickInsertWaterCB, "不买插水");
        this.connect(G_UiType.button, this.ui.Button_one, this.clickInsertWaterCB, "插2水");
        this.connect(G_UiType.button, this.ui.Button_two, this.clickInsertWaterCB, "插3水");
        this.connect(G_UiType.button, this.ui.Button_three, this.clickInsertWaterCB, "插5水");
	}
	//全局事件回调begin
	onProcess(msg){
        if (msg.process==QgmjDef.process_callscore) {
            this.node.active = true;
        }
    }
    onCallScore(msg) {
        if (msg.seatId==RoomMgr.getInstance().getMySeatId()) {
            this.node.active = false;
        }
    }
	//end
	//按钮或任何控件操作的回调begin
    clickInsertWaterCB(event) {
        let buttonName = event.target._name;
        let insertWaterNum=0;
        switch (buttonName) {
            case 'Button_noBuy':
                insertWaterNum = QgmjDef.insertWater_null;
                break;
            case 'Button_one':
                insertWaterNum = QgmjDef.insertWater_one;
                break;
            case 'Button_two':
                insertWaterNum = QgmjDef.insertWater_two;
                break;
            case 'Button_three':
                insertWaterNum = QgmjDef.insertWater_three;
                break;
        }
        QgmjLogic.getInstance().insertWater(insertWaterNum);
    }
	//end
}
