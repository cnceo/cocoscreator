import BaseControl from "../../Libs/BaseCtrl";
import BaseView from "../../Libs/BaseView";
import BaseModel from "../../Libs/BaseModel";
import CharMgr from "../../GameMgrs/CharMgr";
//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_ChatNodeCtrl;
//m，数据处理
class Model extends BaseModel{
    public voideNumber : number;
    constructor()
	{
        super();
        this.voideNumber = 0;
	}
}
//v, 界面显示
class View extends BaseView{
    ui={
        ChatBg:null,
        ExpressionAtlas:null,
	};
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.model=model;
		this.initUi();
	}
	//初始化ui
	initUi()
	{
        this.ui.ChatBg = ctrl.ChatBg;
        this.ui.ExpressionAtlas = ctrl.ExpressionAtlas;
	}
    setContent (i:number):void{
        let content = CharMgr.getInstance().ChatText[i];
        ctrl.ChatText.string = content;
        let width = ctrl.ChatText.node.width;
        if (width > 300) {
            ctrl.ChatText.node.parent.width = 300 + 10;
            this.ui.ChatBg.width = 300 + 10;
            ctrl.ChatText.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            ctrl.ChatText.node.width = 300;
            let height = ctrl.ChatText.node.height;
            ctrl.ChatText.node.parent.height = height * 1.5;
            this.ui.ChatBg.height = height * 1.5;              
        } else {
            ctrl.ChatText.overflow = cc.Label.Overflow.NONE;//更改文本布局
            let width = ctrl.ChatText.node.width;
            let height = ctrl.ChatText.node.height;
            ctrl.ChatText.node.parent.width = width + 10;                
            ctrl.ChatText.node.parent.height = height * 2.5;                
            ctrl.ChatText.node.height = height;
            ctrl.ChatText.node.width = width;
            this.ui.ChatBg.height = ctrl.ChatText.node.height  
            this.ui.ChatBg.width = ctrl.ChatText.node.width
        }
        ctrl.ChatText.node.y = 40;
        ctrl.ChatText.node.active = true;
        ctrl.ChatImg.node.active = false;
    }
    setImg(i):void{
        ctrl.ChatImg.spriteFrame = this.ui.ExpressionAtlas.getSpriteFrame(i);
        ctrl.ChatText.node.active = false;
        ctrl.ChatImg.node.active = true;
    }
    setVoide():void{
        ctrl.schedule(this.timeCallback, 0.25);
        ctrl.ChatText.node.active = false;
        ctrl.ChatImg.node.active = false;
        ctrl.ChatVoide.active = true;
    }
    private timeCallback(dt) {
        ctrl.ChatVoide.getChildByName(`chat${this.model.voideNumber}`).active = true;
        this.model.voideNumber++;
        if(this.model.voideNumber>2){
            for(let i=0;i<3;i++){
                ctrl.ChatVoide.getChildByName(`chat${i}`).active = false;
            }
            this.model.voideNumber = 0;
        }
	}
}

//c, 控制
@ccclass
export default class Prefab_ChatNodeCtrl extends BaseControl {
    @property(cc.Label)
    ChatText : cc.Label = null;
    @property(cc.Sprite)
    ChatImg : cc.Sprite = null;
    @property(cc.Node)
    ChatVoide : cc.Node = null;
    @property(cc.Node)
    ChatBg : cc.Node = null;

    @property({
		tooltip : "表情图集",
		type : cc.SpriteAtlas
	})
	ExpressionAtlas : cc.SpriteAtlas = null;
    onLoad (){
        ctrl = this;
		//初始化mvc
		this.initMvc(Model,View);
    }

    setMsg (text : string) : void {
        this.view.setContent(text);
        setTimeout(() => {
            this.finish();
        }, 1000);
    }
    setImg(img:cc.Sprite):void{
        this.view.setImg(img);
        setTimeout(() => {
            this.finish();
        }, 2000);
    }

    setVoide():void{
        this.view.setVoide();
        setTimeout(() => {
            this.unscheduleAllCallbacks();
            this.finish();
        }, 2000);
    }

    public chatOver(){
        this.unscheduleAllCallbacks();
        this.finish();
    }

    start () { 
    }
}
