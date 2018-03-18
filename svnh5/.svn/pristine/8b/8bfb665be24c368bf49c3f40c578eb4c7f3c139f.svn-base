import BaseMgr from "../Libs/BaseMgr";
import UserMgr from "../Libs/UserMgr"; 
import LoginMgr from "./LoginMgr";

export default class CreateRoomMgr extends BaseMgr{
    private gameId = null;
    private qzmjRoomRuleInfo : any = {};
    private qzmjRoomRuleInfoGroups : any = {};
    private nnRoomRuleInfo : any = {};
    private nnRoomRuleInfoGroups : any = {};
    private zyqznnRoonRuleInfo : any = {};
    private zyqznnRoomRuleInfoGroups : any = {};
    routes:{} = null;
    uid:any = null;
    //单例处理
    constructor(){
        super();
        this.gameId = 1
        this.uid = LoginMgr.getInstance().getUid()
        this.initQzmjRoomRuleInfo()
        this.initNnRoomRuleInfo()
        this.initZYQZNnRoomRuleInfo() 
    }
    initQzmjRoomRuleInfo() {
        let data = JSON.parse(cc.sys.localStorage.getItem('qzmjRoomRuleInfoGroups'))
        this.qzmjRoomRuleInfoGroups = data?data:{};
        console.log('qzmj配置数据组',this.qzmjRoomRuleInfoGroups)
        this.qzmjRoomRuleInfo = this.qzmjRoomRuleInfoGroups[this.uid.toString()];
        if(isNaN(this.qzmjRoomRuleInfo)){
            console.log('qzmj配置数据2',this.qzmjRoomRuleInfo)
            this.qzmjRoomRuleInfo = {
                v_fangfei:57,//费用
                b_yike:0,//0为不开启，1为开启
                v_roundcount: 16,	//8局  16局  一课
                v_seatcount: 4,	//4人  3人  2人
                v_paytype: 0,		//0 房主支付  1 AA支付  2 赢家支付
                b_youjin: 1,	//0 暗游  1 明游
                t_youjin: 4,	// 3倍   4倍
                v_youjinjiangli: 25,
                v_shasanjiangli: 50,
                v_difen: 8,
                b_hupai: 1,  //0胡牌吃三家 1放胡单陪
                b_jinxianzhi: 3,  //
            }
            console.log('qzmj配置数据3',this.qzmjRoomRuleInfo)
        }
    }
    initNnRoomRuleInfo() {
        let data = JSON.parse(cc.sys.localStorage.getItem('nnRoomRuleInfoGroups'));
        this.nnRoomRuleInfoGroups = data?data:{};
        console.log('nn配置数据组',this.nnRoomRuleInfoGroups)
        this.nnRoomRuleInfo = this.nnRoomRuleInfoGroups[this.uid.toString()];
        if(isNaN(this.nnRoomRuleInfo)){
            console.log('nn配置数据2',this.nnRoomRuleInfo)
            this.nnRoomRuleInfo = {
                baseScore:1,    //基础分 1 1/2 2 2/4 3 4/8 4 5/8
                gameCount: 10,	//游戏局数10 10局 20 20局  
                payType: 1,	    //支付方式 1 房主支付 2 AA支付
                autoOpen: 1,    //自由开局  1 手动开局 2 满4人开 3 满5人开 4 满6人开
                playerCount:8,  //游戏人数 8 8人 6 6人
                specialCardType: [1, 1, 1, 1, 1, 1], //0表示未勾选，1表示勾选
                AdvancedOptions: [0, 0, 0],
                DoubleRules: 1, 
            }
            console.log('nn配置数据3',this.nnRoomRuleInfo)
        }
    }
    initZYQZNnRoomRuleInfo() {
        let data = JSON.parse(cc.sys.localStorage.getItem('zyqznnRoomRuleInfoGroups'));
        this.zyqznnRoomRuleInfoGroups = data?data:{};
        console.log('nn配置数据组',this.zyqznnRoomRuleInfoGroups)
        this.zyqznnRoonRuleInfo = this.zyqznnRoomRuleInfoGroups[this.uid.toString()];
        if(isNaN(this.zyqznnRoonRuleInfo)){
            console.log('nn配置数据2',this.zyqznnRoonRuleInfo)
            this.zyqznnRoonRuleInfo = {
                baseScore:1,        //基础分 1 1/2 2 2/4 3 4/8 4 5/8
                gameCount: 10,      //游戏局数10 10局 20 20局  
                payType: 1,	        //支付方式 1 房主支付 2 AA支付
                playerPush: 0,      //玩家推注 0 无 5 5倍 10 10倍 20 20倍
                autoOpen: 1,        //自由开局  1 手动开局 2 满4人开 3 满5人开 4 满6人开
                playerCount:8,      //游戏人数 8 8人 6 6人
                specialCardType: [1, 1, 1, 1, 1, 1], //0表示未勾选，1表示勾选
                advancedOptions: [0, 0, 0, 1, 1, 1, 0],
                doubleRules: 1,
            }
            console.log('nn配置数据3',this.zyqznnRoonRuleInfo)
        }
    }

    private static _instance:CreateRoomMgr;
    public static getInstance ():CreateRoomMgr{
        if(!this._instance){
            this._instance = new CreateRoomMgr();
        }
        return this._instance;
    }

    setProperty (value, PropertyName, childProName) {
        if (isNaN(value)) return console.log("value 不能为空")
        if (!PropertyName) return console.log("PropertyName 不能为空")
        if (childProName) {
            this[PropertyName][childProName] = value
        } else {
            this[PropertyName] = value
        }
    }

    getGameId(){
        return this.gameId;
    }

    getInfoGroups(gameID){
        switch (gameID) {
            case 1 :
                return this.qzmjRoomRuleInfoGroups;
                break;
            case 20 :
                return this.nnRoomRuleInfoGroups;
                break;
            case 18 :
                return this.zyqznnRoomRuleInfoGroups;
                break;
        }
    }

    getRoomRuleInfo(gameID){
        switch (gameID) {
            case 1 :
                return this.qzmjRoomRuleInfo;
                break;
            case 20 :
                return this.nnRoomRuleInfo;
                break;
            case 18 :
                return this.zyqznnRoonRuleInfo;
                break;
        }
    }
}
