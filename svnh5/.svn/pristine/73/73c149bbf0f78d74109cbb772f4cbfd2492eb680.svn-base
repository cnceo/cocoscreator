import ModuleMgr from "../../Plat/GameMgrs/ModuleMgr";

let modules={
     
    //麻将房间内的预制体 
}

export default class SssEntry{ 
    private static _instance:SssEntry;
    constructor()
    { 
    }  
    public static getInstance ():SssEntry{
        if(!this._instance){
            this._instance = new SssEntry();
        }
        return this._instance;
    } 
    registerModules()
    {
        ModuleMgr.getInstance().registerGame(modules);
    }
}
