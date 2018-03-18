//
import BaseMgr from "../Libs/BaseMgr";
import RoomMgr from "./RoomMgr";
import UserMgr from "./UserMgr";
import FrameMgr from "./FrameMgr";
import BetMgr from "./BetMgr";
import Prefab_shopCtrl from "../Modules/Shop/Prefab_shopCtrl";

/**
 * gfun
 * Bet
 * platmodule
 */

 
export default class VerifyMgr extends BaseMgr{
    roomUserInfo:any = null                    //未决事件，1表示未结束游戏，2表示未解散房间
    routes:any = null                       
    constructor (){
        super();

        this.roomUserInfo=null;
        this.routes={ 
            'http.reqMyRoomState':this.http_reqMyRoomState,
            'onGameFinished':this.onGameFinished, 
        }
    }

    onGameFinished(msg){
        this.roomUserInfo=null;
    }

    http_reqMyRoomState(msg) {
        this.roomUserInfo=msg.roomUserInfo 
 
        if(this.roomUserInfo)
        {
            BetMgr.getInstance().setGameId(this.roomUserInfo.gameid);
            BetMgr.getInstance().setBetType(this.roomUserInfo.bettype);
            if(this.roomUserInfo.gamestarted == 1){
                this.showRecoverRoom();
            }else if(this.roomUserInfo.bowner==1){
                this.showUndispandRoom();
            }
        } 
    }

    showRecoverRoom(){
        // body 
        let okcb = function(){  
            if(!this.roomUserInfo)
            {
                FrameMgr.getInstance().showMsgBox("游戏已经结束");
                return;
            }  
            RoomMgr.getInstance().waitForRecover(); 
        }
        FrameMgr.getInstance().showDialog("你有游戏在进行,点击确定恢复游戏!",okcb.bind(this)) 
    }
    showUndispandRoom(){
        // body 
        let okcb = function(){
            if(!this.roomUserInfo){
                FrameMgr.getInstance().showMsgBox("游戏已解散");  
                return;
            } 
            RoomMgr.getInstance().waitForOwnerBack();//等待房主会来  
        } 
        FrameMgr.getInstance().showDialog("你有房间未解散,点击确定进入!",okcb.bind(this))  
    } 

    checkUnSettled(){
        if(this.roomUserInfo){
            if(this.roomUserInfo.gamestarted==1)
            {
                this.showRecoverRoom();
                return true;
            }
            else if(this.roomUserInfo.bowner==1){
                this.showUndispandRoom();
                return true;
            }
        }
        return false;
    }
    //判断金币是否足够
    checkCoin(){
        //判断是否有未恢复的游戏
        if(this.checkUnSettled()){
            return false
        } 
        let myinfo=UserMgr.getInstance().getMyInfo();   
        let jbcCfg=BetMgr.getInstance().getJbcCfg(); 
        if(myinfo.coin<jbcCfg.leastcoin){ 
            //金币不足
            if(myinfo.relief>0){
                //启用救济金
                this.start_sub_module(G_MODULE.ReliefMoney)  
            }else{
                //打开购买游戏豆界面 
                this.start_sub_module(G_MODULE.Shop, (uiComp:Prefab_shopCtrl)=>{
                    uiComp.buyCoin();
                });
   
            }
            return false;
        }
        return true;
    } 

    checkFangKaRound(roominfo) {
        if(roominfo.roundindex==roominfo.roundcount-1){
            // gfun.Warrning("牌局场次已结束") 
            return false;
        }
        return true;
    }


    checkFangKa(cost){
        if(this.checkUnSettled()){
            return false
        }
        let myinfo=UserMgr.getInstance().myinfo  
        if(myinfo.fangka<cost){
            // let ctrl=this.start_module(platmodule.recharge)
            // ctrl.initShop(1)
            return false;
        }
        return true;
    } 


    //单例处理
    private static _instance:VerifyMgr;
    public static getInstance ():VerifyMgr{
        if(!this._instance){
            this._instance = new VerifyMgr();
        }
        return this._instance;
    }
}