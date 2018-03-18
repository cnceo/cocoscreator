import ModuleMgr from "../../Plat/GameMgrs/ModuleMgr";

let modules={
    
    BullRoom:'TbnnRoom', 
    Bull_calculate:"SubLayer/Games/Bull/Prefab_bull_calculateCtrl",//算牌UI
    Bull_settle:"SubLayer/Games/Bull/Prefab_bull_settleCtrl",//结算
    Bull_chooseGrab:"SubLayer/Games/Bull/Prefab_bull_chooseGrabCtrl",//是否抢庄
    Bull_chooseChip:"SubLayer/Games/Bull/Prefab_bull_chooseChipCtrl",//是否抢庄
}

export default class TbnnEntry{ 
    constructor()
    { 
    }  
    private static _instance:TbnnEntry;
    public static getInstance ():TbnnEntry{
        if(!this._instance){
            this._instance = new TbnnEntry();
        }
        return this._instance;
    } 
    registerModules()
    {
        ModuleMgr.getInstance().registerGame(modules);
    }
}