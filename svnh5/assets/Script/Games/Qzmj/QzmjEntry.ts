import ModuleMgr from "../../Plat/GameMgrs/ModuleMgr";

let modules={
    
	QzmjRoom:'QzmjRoom', 
    //麻将房间内的预制体
    mj_playerInfo : 'SubLayer/Games/Qzmj/gameUserInfo/Prefab_QzmjUserInfoCtrl', 
    QzmjSettle : 'SubLayer/Games/Qzmj/gameSettle/Prefab_QzmjSettle',
    ChatNode : 'SubLayer/Games/Qzmj/gameChat/Prefab_ChatNode',
    ChatTextItem : 'SubLayer/Games/Qzmj/gameChat/Prefab_ChatTextItem',
    Op_anim : 'SubLayer/Games/Qzmj/Prefab_Op_anim',
    gameDetailResult:'SubLayer/Games/Qzmj/gameDetailResult/Prefab_gameDetailResultCtrl',
    RoomResult:'SubLayer/Games/Qzmj/gameTotalResult/Prefab_RoomResultLayerCtrl',
    RoomTtlResult:'SubLayer/Games/Qzmj/gameTotalResult/Prefab_RoomResultLayerTtlCtrl',
    PreventionCheating:'SubLayer/Games/Qzmj/gamePrevention/Prefab_PreventionCheating',
    Prefab_QzmjRuleCtrl:'SubLayer/Games/Qzmj/gameRule/Prefab_QzmjRuleCtrl',
    QzmjRoomSetting:'SubLayer/Games/Qzmj/RoomSetting/Prefab_roomSettingCtrl',  
}

export default class QzmjEntry{ 
    private static _instance:QzmjEntry;
    constructor()
    { 
    }  
    public static getInstance ():QzmjEntry{
        if(!this._instance){
            this._instance = new QzmjEntry();
        }
        return this._instance;
    } 
    registerModules()
    {
        ModuleMgr.getInstance().registerGame(modules);
    }
}
