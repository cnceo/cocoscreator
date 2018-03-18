import ModuleMgr from "../../Plat/GameMgrs/ModuleMgr";

let modules={
    
	QgmjRoom:'QgmjRoom', 
    //麻将房间内的预制体
    mj_playerInfo:		'SubLayer/Games/Qgmj/Prefab_QgmjUserInfoCtrl', 
    QgmjSettle:			'SubLayer/Games/Qgmj/Prefab_QgmjSettle',
    ChatNode:			'SubLayer/Games/Qgmj/Prefab_ChatNode',
    ChatTextItem:		'SubLayer/Games/Qgmj/Prefab_ChatTextItem',
    Op_anim:			'SubLayer/Games/Qgmj/Prefab_Op_anim',
    gameDetailResult:	'SubLayer/Games/Qgmj/gameDetailResult/Prefab_gameDetailResultCtrl',
    RoomResult:			'SubLayer/Games/Qgmj/gameTotalResult/Prefab_RoomResultLayerCtrl',
    RoomTtlResult:		'SubLayer/Games/Qgmj/gameTotalResult/Prefab_RoomResultLayerTtlCtrl',
}

export default class QgmjEntry{ 
    private static _instance:QgmjEntry;
    constructor()
    { 
    }  
    public static getInstance ():QgmjEntry{
        if(!this._instance){
            this._instance = new QgmjEntry();
        }
        return this._instance;
    } 
    registerModules()
    {
        ModuleMgr.getInstance().registerGame(modules);
    }
}
