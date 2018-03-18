import ModuleMgr from "../../Plat/GameMgrs/ModuleMgr";

let modules={
    
    BullRoom:'QznnRoom', 
    // Bull_calculate:"SubLayer/Games/Bull/Prefab_bull_calculateCtrl",//算牌UI
    // Bull_settle:"SubLayer/Games/Bull/Prefab_bull_settleCtrl",//结算
    Bull_chooseGrab:"SubLayer/Games/Qznn/Prefab_bull_chooseGrabCtrl",//是否抢庄
    Bull_chooseChip:"SubLayer/Games/Qznn/Prefab_bull_chooseChipCtrl",//是否抢庄
    qznn_grabFlag:"SubLayer/Games/Qznn/Prefab_qznn_grabFlag",//是否抢庄的标记
}

export default class QznnEntry{ 
    constructor()
    { 
    }  
    private static _instance:QznnEntry;
    public static getInstance ():QznnEntry{
        if(!this._instance){
            this._instance = new QznnEntry();
        }
        return this._instance;
    } 
    registerModules()
    {
        ModuleMgr.getInstance().registerGame(modules);
    }
}