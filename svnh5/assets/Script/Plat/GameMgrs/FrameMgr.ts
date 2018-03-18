import WM_Emitter from "../Libs/WM_Emitter";
import BaseMgr from "../Libs/BaseMgr";
import Prefab_MsgBoxCtrl from "../Modules/MsgBox/Prefab_MsgBoxCtrl";
import ModuleMgr from "./ModuleMgr";
import Prefab_harvestCtrl from "../Modules/MsgBox/Prefab_harvestCtrl";
import Prefab_HintBoxCtrl from "../Modules/MsgBox/Prefab_HintBoxCtrl";
import Prefab_loadAniCtrl from "../Modules/LoadingPlat/Prefab_loadAniCtrl";
import Prefab_tipsCtrl from "../Modules/tip/Prefab_tipsCtrl";
 

var G_FRAME={}
G_FRAME['globalEmitter']=new WM_Emitter('全局事件分发器')
G_FRAME['netEmitter']=new WM_Emitter('网络事件分发器')
window['G_FRAME']=G_FRAME 

//基础的管理器
export default class FrameMgr{ 
    private _loadLayer:Prefab_loadAniCtrl = null;

    //单例处理 
    private static _instance:FrameMgr;
    public static getInstance ():FrameMgr{
        if(!this._instance){
            this._instance = new FrameMgr();
        }
        return this._instance;
    }
    /**
     * 
     * @param title 标题
     * @param content 内容
     * @param okcb 确定后的回调
     */
    showMsgBox(content:string, okcb?:Function, title?:string)
    {
        ModuleMgr.getInstance().start_sub_module(G_MODULE.MsgBox, (prefabComp:Prefab_MsgBoxCtrl)=>{
            prefabComp.showMsg(content, okcb, true, title)
        })
    }
    public showDialog(content:string, okcb?:Function, title?:string, offcb?:Function){
        ModuleMgr.getInstance().start_sub_module(G_MODULE.MsgBox, (prefabComp:Prefab_MsgBoxCtrl)=>{
            prefabComp.showMsg(content, okcb, false, title, offcb)
        })
    }
     /**
     * 
     * @param itemNum 显示的所有物品 种类数量
     * @param imgName 物品图片的名字
     * @param recItemNum 单个物品 获取到的数量
     * @param cb 完成领取后的回调
     */
    public showHarvest(itemNum:number, imgName:string, recItemNum:string, cb?:Function){
        ModuleMgr.getInstance().start_sub_module(G_MODULE.HarvestFrame, (prefabComp:Prefab_harvestCtrl)=>{
            prefabComp.showItems(itemNum, imgName, recItemNum, cb)
        })
    }

    //显示加载动画
    public showLoadAni(){
        if(!this._loadLayer || !cc.isValid(this._loadLayer) && !this._loadLayer.node.parent){
            ModuleMgr.getInstance().start_sub_module(G_MODULE.LoadAni, (prefabComp:Prefab_loadAniCtrl)=>{
                this._loadLayer = prefabComp;
                prefabComp.showLoad()
            })
        }
    }
    //关闭加载动画
    public clearLoadAni(){
        if(this._loadLayer && cc.isValid(this._loadLayer) && this._loadLayer.node.parent){
            this._loadLayer.clearLoad();
            this._loadLayer=null;
        }
    }
    /**
     * 
     * @param pos 位置
     * @param color 颜色
     * @param font 字体
     * @param fontSize 字号
     * @param context 文本
     * @param delayTime 间隔时间(毫秒)
     * @param cb 回调
     */
    public showTips(context:string, cb?:Function, fontSize = 30, color=new cc.Color(0xff, 0xff, 0xff), pos=cc.p(0,0), font = "Arial", delayTime = 500, contentSize = cc.p(613,122)){
        ModuleMgr.getInstance().start_sub_module(G_MODULE.tipFrame, (prefabComp:Prefab_tipsCtrl)=>{
            prefabComp.showTips(context, cb, fontSize, color, pos, font, delayTime, contentSize);
        })
    }
     /**
     * 
     * @param title 标题
     * @param content 内容
     * @param okcb 确定后的回调
     */
    showHintBox(content:string, okcb?:Function)
    {
        ModuleMgr.getInstance().start_sub_module(G_MODULE.HintBox, (prefabComp:Prefab_HintBoxCtrl)=>{
            prefabComp.SetContent(content, okcb)
        })
    }
}
