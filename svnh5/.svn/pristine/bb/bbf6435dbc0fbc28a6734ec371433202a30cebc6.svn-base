//用户管理
import BaseMgr from "../Libs/BaseMgr";
import LoginMgr from "./LoginMgr";

 
export default class UserMgr extends BaseMgr{
    myinfo:any = {}
    users:{} = null
    routes:{} = null 
    exitSex:number=null;
    exitSognature:string = null
    //====== 
    uid:any = null 
    constructor (){
        super(); 
        this.myinfo={};
        this.users={};
        this.routes={
            'http.reqMyInfo':this.http_reqMyInfo, 
            'http.reqGetRelief':this.http_reqGetRelief, 
            'http.reqUsers':this.http_reqUsers, 
            'onUserInfoChanged':this.onUserInfoChanged,
            'http.reqRegister':this.http_reqRegister,
            'http.reqLogin':this.http_reqLogin, 
            'http.reqEditSex':this.http_reqEditSex,
            'http.reqEditSignature':this.http_reqEditSignature,
            'http.ReqIdCardRegistration':this.http_ReqIdCardRegistration,
        }
    }
    //请求修改性别
    reqEditSex(sex:number)
    {
        this.exitSex=sex;
        let msg={
            sex:sex
        }
        this.send_msg('http.reqEditSex',msg)
    }
    http_reqEditSex(msg)
    {
        this.myinfo.sex=this.exitSex
    }
    //请求修改个性签名
    reqEditSignature(signStr:string){
        this.exitSognature=signStr;
        let msg={
            sign:signStr
        }
        this.send_msg('http.reqEditSignature',msg)
    }
    http_reqEditSignature(msg)
    {
        this.myinfo.signature=this.exitSognature
    }
    getMyInfo()
    {
        return this.myinfo;
    }
    http_reqRegister(msg)
    {
        this.uid=msg.uid;
    }
    http_reqLogin(msg)
    {
        this.uid=msg.uid;
    }
    onUserInfoChanged(msg) 
    {
        this.reqMyInfo();
    }
    http_reqMyInfo(msg)
    {
        this.myinfo=msg;
    }
    http_reqGetRelief(msg)
    {
        //刷新我的信息
        this.myinfo=msg;
    }

    reqGetRelief()
    {
        this.send_msg('http.reqGetRelief');
    }
    //获取我的信息
    reqMyInfo() 
    {
        this.send_msg('http.reqMyInfo');
    }
    //获取用户信息
    reqUsers(uids)
    {
        // body
        let msg={
            'uids':uids,
        }
        
        console.log("我娃哦哦额哦按非uids=",uids) 
        this.send_msg('http.reqUsers',msg);
    }
    http_reqUsers(msg)
    {
        // body    
        let value; 
        for(let i = 0; i < msg.users.length; i ++){
            value = msg.users[i];
            this.users[value.id]=value; 
        }
    }
    ReqIdCardRegistration(myData)
    {
        console.log("aaaaaa",{"name":myData.name,"card":myData.card});
        this.send_msg("http.ReqIdCardRegistration",{"name":myData.name,"card":myData.card});
    }
    http_ReqIdCardRegistration(msg)
    {
        console.log(msg);

    }
    getUserById(uid)
    {
        // body  
        return this.users[uid]
    }
    getUid()
    {
        return this.myinfo.id;
    }
    getHeadPng(headid)
    {
        let webRootUrl=LoginMgr.getInstance().getWetRootUrl();
        // body
        return `${webRootUrl}/images/default_${headid}.png`
    } 
 
    //单例处理
    private static _instance:UserMgr;
    public static getInstance ():UserMgr{
        if(!this._instance){
            this._instance = new UserMgr();
        }
        return this._instance;
    }
}
