//麻将吃碰杠动作管理
import BaseMgr from "../Libs/BaseMgr";
export default class OpAnimMgr extends BaseMgr{
    routes:{} = null
    msg = null
    //====== 
    uid:any = null 
    constructor (){
        super(); 
        this.routes={
            //onOp:this.onOp, 
        }
    }
    onOp(msg){
        this.msg=msg.event
    }

    getMsg(){
        debugger;
        return this.msg
    }

    //单例处理
    private static _instance:OpAnimMgr;
    public static getInstance ():OpAnimMgr{
        if(!this._instance){
            this._instance = new OpAnimMgr();
        }
        return this._instance;
    }
}