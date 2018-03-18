//用户管理
import BaseMgr from "../Libs/BaseMgr";
import LoginMgr from "./LoginMgr";
import UserMgr from "./UserMgr";

const IDENTITY_TYPE = {
	MEMBER:"0",
	MANAGE:"1",
	CAPTAIN:"3",
}

const CLUB_INFO_STATE = {
	ENTER:1,
	DISSOVE:2,
    EXIT:3,
    CHANGE:4,
    GAME:5,
    CHANGEM:6,
    APPLY:7,
}

window['IDENTITY_TYPE']=IDENTITY_TYPE;
window['CLUB_INFO_STATE']=CLUB_INFO_STATE;

export default class ClubMgr extends BaseMgr{
    //该俱乐部简化数据 key:index data:{id, icon, name, gameCount, diamond}
    clublist:any = {}
    /*该俱乐部详细数据 key:id  
    data:{id, icon, name, mCount, mMax, OpenGame, diamond, diamondMax, 
            captainId, notice, memberlist, gameList, applyList, blackList}
    memberlist:{id, icon, name, identity, 
            diamond, diamondMax}    fightRecord:{id, id}
    gameList:{id, name, type, pay, mCount, mMax, time, round}
    applyList:{id, icon, name}
    blackList:{id, icon, name}

    */
    clubinfo:any = {}
    //搜索列表 key index {id,icon,name,notice,count,max,captain_name,apply}
    seeklist:any = {}
    //协议列表
    routes:{} = null
    //是否进入
    club_enter:boolean = false;
    //修改数据存储列表
    private club_change_list:any = {};

    constructor (){
        super(); 
        this.clublist = {};
        this.clubinfo = {};
        this.seeklist = {};
        this.routes={
            "http.onClubInfo":this.http_onClubInfo,

            "http.reqClubList":this.http_reqClubList,
            "http.reqClubInfo":this.http_reqClubInfo,
            "http.reqClubMember":this.http_reqClubMember,
            "http.reqClubSeekList":this.http_reqClubSeekList,
            "http.reqClubExit":this.http_reqClubExit,
            "http.reqClubDissolve":this.http_reqClubDissolve,
            "http.reqClubGameList":this.http_reqClubGameList,
            "http.reqClubApplyList":this.http_reqClubApplyList,
            "http.reqClubBlacklist":this.http_reqClubBlacklist,
            "http.reqClubApplyJoin":this.http_reqClubApplyJoin,
            "http.reqClubRefuseJoin":this.http_reqClubRefuseJoin,
            "http.reqClubJoinBlacklist":this.http_reqClubJoinBlacklist,
            "http.reqClubChangeAvater":this.http_reqClubChangeAvater,
            "http.reqClubChangeName":this.http_reqClubChangeName,
            "http.reqClubChangeNotice":this.http_reqClubChangeNotice,
            "http.reqClubChangeOpenGame":this.http_reqClubChangeOpenGame,
            "http.reqClubChangeIdentity":this.http_reqClubChangeIdentity,
            "http.reqClubClearDiamond":this.http_reqClubClearDiamond,
            "http.reqClubKick":this.http_reqClubKick,
            "http.reqClubJoin":this.http_reqClubJoin,
            "http.reqClubBlacklisRemove":this.http_reqClubBlacklisRemove,
        }
    }

    private onClubEnterEvent(msg){
        let user_id = UserMgr.getInstance().getUid();
        if (msg.change_id == user_id){
            this.reqClubList();
        }else{
            this.reqClubMember(msg.club_id, 1)
        }
    }
    private onClubDissoveEvent(msg){
        this.reqClubList();
    }
    private onClubExitEvent(msg){
        let user_id = UserMgr.getInstance().getUid();
        if (msg.change_id == user_id){
            this.reqClubList();
        }else{
            this.removeClubMember(msg.club_id, msg.change_id);
        }
    }
    private onClubChangeEvent(msg){
        let user_id = UserMgr.getInstance().getUid();
        if (msg.operation_id != user_id){
            this.reqClubList();
            this.reqClubInfo(msg.club_id);
        }
    }
    private onClubGameEvent(msg){
        this.reqClubGameList(msg.club_id);
    }
    private onClubChangeMemberEvent(msg){
        let user_id = UserMgr.getInstance().getUid();
        if (msg.operation_id != user_id){
            this.reqClubList();
            this.reqClubMember(msg.club_id, 1);
        }
    }

    //俱乐部消息监听进行相对应数据刷新
    http_onClubInfo(msg){
        let data = msg.states;
        switch(data.state){
            case CLUB_INFO_STATE.ENTER:
                this.onClubEnterEvent(data);
                break;
            case CLUB_INFO_STATE.DISSOVE:
                this.onClubDissoveEvent(data);
                break;
            case CLUB_INFO_STATE.EXIT:
                this.onClubExitEvent(data);
                break;
            case CLUB_INFO_STATE.CHANGE:
                this.onClubChangeEvent(data);
                break;
            case CLUB_INFO_STATE.GAME:
                this.onClubGameEvent(data);
                break;
            case CLUB_INFO_STATE.CHANGEM:
                this.onClubChangeMemberEvent(data);
                break;
            case CLUB_INFO_STATE.APPLY:
                break;
            default:
                break;
        }
    }
    //设置数据------------------------------------------------
    http_reqClubInfo(msg) {
        msg.memberlist = {};
        msg.gameList = {};
        msg.applyList = {};
        msg.blackList = {};
        this.clubinfo[msg.id]=msg;
    }
    http_reqClubList(msg){
        console.log("ClubList");
        console.dir(msg);
        this.clublist = msg.list;
        if (this.clubinfo.length == null && this.clublist.length != 0){
            let id = this.clublist[0].id;
            this.reqClubInfo(id);
            this.club_enter = true;
        }else if(this.clublist.length == 0){
            this.club_enter = false;
        }
    }
    http_reqClubMember(msg){
        console.log("ClubMember");
        console.dir(msg);
        let id = msg.clubId;
        if (this.clubinfo[id].memberlist.length == null){
            this.clubinfo[id].memberlist = msg.list;
        }else{
            this.clubinfo[id].memberlist = this.clubinfo[id].memberlist.concat(msg.list);
        }
    }
    http_reqClubSeekList(msg){
        console.log("SeekList");
        console.dir(msg);
        this.seeklist = msg.list;
    }
    http_reqClubApplyList(msg){
        let id = msg.clubId;
        if (this.clubinfo[id].applyList.length == null){
            this.clubinfo[id].applyList = msg.list;
        }else{
            this.clubinfo[id].applyList = this.clubinfo[id].applyList.concat(msg.list);
        }
    }
    http_reqClubBlacklist(msg){
        let id = msg.clubId;
        if (this.clubinfo[id].blackList.length == null){
            this.clubinfo[id].blackList = msg.list;
        }else{
            this.clubinfo[id].blackList = this.clubinfo[id].blackList.concat(msg.list);
        }
    }

    http_reqClubApplyJoin(msg){ 

    }
    http_reqClubRefuseJoin(msg){

    }
    http_reqClubJoinBlacklist(msg){
        console.log('加入黑名单后的返回', msg)
    }
    http_reqClubExit(msg){
        this.reqClubList();
    }
    http_reqClubDissolve(msg){
        this.reqClubList();
    }
    http_reqClubGameList(msg){

    }
    http_reqClubChangeAvater(msg){
        console.dir(msg);
        let id = this.club_change_list.id,
            avater = this.club_change_list.avater,
            data = this.getClubListData(id);

        data.avater = avater;
        this.clubinfo[id].avater = avater;
    }
    http_reqClubChangeName(msg){
        let id = this.club_change_list.id,
        name = this.club_change_list.name,
            data = this.getClubListData(id);

        data.name = name;
        this.clubinfo[id].name = name;
    }
    http_reqClubChangeNotice(msg){
        let id = this.club_change_list.id,
            notice = this.club_change_list.notice,
            data = this.getClubListData(id);

        data.notice = notice;
        this.clubinfo[id].notice = notice;
    }
    http_reqClubChangeOpenGame(msg){
        console.dir(msg);
        let id = this.club_change_list.id,
            openGame = this.club_change_list.identity,
            data = this.getClubListData(id);

        this.clubinfo[id].openGame = openGame;
    }
    http_reqClubClearDiamond(msg){
        let id = this.club_change_list.id,
            pid = this.club_change_list.playerid,
            data = this.getClubMemberData(id, pid);

        this.clubinfo[id].diamond = "0";
    }
    http_reqClubChangeIdentity(msg){
        this.reqClubMember(this.club_change_list.id, 1);
    }
    http_reqClubKick(msg){
        let id = this.club_change_list.id,
            pid = this.club_change_list.playerid;
        this.removeClubMember(id, pid);
    }
    http_reqClubJoin(msg){
        console.dir(msg)
    }
    http_reqClubBlacklisRemove(msg){
        console.dir(msg)
    }
    //获取数据-------------------------------------------------
    getClubList(){
        return this.clublist;
    }
    getClubInfo(id){
        return this.clubinfo[id];
    }
    getClubMemberList(id){
        return this.clubinfo[id].memberlist;
    }
    getClubGameList(id){
        return this.clubinfo[id].gameList;
    }
    getClubApplyList(id){
        return this.clubinfo[id].applyList;
    }
    getClubBlackList(id){
        return this.clubinfo[id].blackList;
    }
    getClubListData(id){
        let count = this.clublist.length;
        for (let i = 0; i < count; i++){
            let data = this.clublist[i];
            if (id == data.id){
                return data
            }
        }
        return null;
    }
    getClubMemberData(club_id, playerid){
        let member_list = this.clubinfo[club_id].memberlist,
            count = member_list.length;
        for (let i = 0; i < count; i++){
            let data = member_list[i];
            if (playerid == data.id){
                return data
            }
        }
        return null;
    }
    removeClubMember(club_id, playerid){
        let member_list = this.clubinfo[club_id].memberlist,
            count = member_list.length;
        for (let i = 0; i < count; i++){
            let data = member_list[i];
            if (playerid == data.id){
                member_list.splice(i,1);
            }
        }
    }
    getClubIdentity(id){
        let count = this.clublist.length;
        for (let i = 0; i < count; i++){
            let data = this.clublist[i];
            if (id == data.id){
                return data.identity;
            }
        }
        return "0";
    }
    getSeekList(){
        return this.seeklist;
    }
    //获取用户信息
    reqClubs(uids){
    }
    getHeadPng(headid){
        let webRootUrl=LoginMgr.getInstance().getWetRootUrl();
        // body
        return `${webRootUrl}/images/default_${headid}.png`
    } 
    reqCreate(icon, name){
        let clubinfo={
            'avater':icon, 
            'name':name,
        }
        this.send_msg('http.reqClubCreate',clubinfo);
    }
    reqClubList(){
        let clubinfo={
            'page':1,
        }
        this.send_msg('http.reqClubList', clubinfo);
    }

    reqClubInfo(club_id){
        let clubinfo={
            'id':club_id, 
        }
        this.send_msg('http.reqClubInfo', clubinfo);
    }

    reqClubMember(club_id, page){
        if (this.clubinfo[club_id] == null){
            return
        }
        if (page == 1){
            this.clubinfo[club_id].memberlist = null
            this.clubinfo[club_id].memberlist = {}
        }
        let clubinfo={
            'id':club_id,
            'page':page, 
        }
        this.send_msg('http.reqClubMember', clubinfo);
    }
    reqClubSeekList(name){
        let clubinfo={
            'keyword':name,
        }
        this.send_msg('http.reqClubSeekList', clubinfo);
    }
    reqApplyClub(club_id){
        let clubinfo={
            'id':club_id,
        }
        this.send_msg('http.reqApplyClub', clubinfo);
    }
    reqClubExit(club_id){
        let clubinfo={
            'id':club_id,
        }
        this.send_msg('http.reqClubExit', clubinfo);
    }
    reqClubDissolve(club_id){
        let clubinfo={
            'id':club_id,
        }
        this.send_msg('http.reqClubDissolve', clubinfo);
    }
    reqClubJoin(club_id, playerid){
        let clubinfo={
            'id':club_id,
            'playerid':playerid,
        }
        this.send_msg('http.reqClubJoin', clubinfo);
    }
    //未加入俱乐部
    reqClubApplyList(club_id, page){
        if (this.clubinfo[club_id] == null){
            return 
        }
        if (page == 1){
            this.clubinfo[club_id].applyList = null
            this.clubinfo[club_id].applyList = {}
        }
        let clubinfo={
            'id':club_id,
            'page':page, 
        }
        this.send_msg('http.reqClubApplyList', clubinfo);
    }
    reqClubBlacklist(club_id, page){
        if (this.clubinfo[club_id] == null){
            return 
        }
        if (page == 1){
            this.clubinfo[club_id].blackList = null
            this.clubinfo[club_id].blackList = {}
        }
        let clubinfo={
            'id':club_id,
            'page':page, 
        }
        this.send_msg('http.reqClubBlacklist', clubinfo);
    }
    
    reqClubApplyJoin(club_id){
        let clubinfo={
            'id':club_id,
        }
        this.send_msg('http.reqClubApplyJoin', clubinfo);
    }

    reqClubRefuseJoin(club_id, playerId){
        let clubinfo={
            'id':club_id,
            'playerid':playerId,
        }
        this.send_msg('http.reqClubRefuseJoin', clubinfo);
    }

    reqClubJoinBlacklist(club_id, playerId){
        let clubinfo={
            'id':club_id,
            'playerid':playerId,
        }
        this.send_msg('http.reqClubJoinBlacklist', clubinfo);
    }

    reqClubBlacklisRemove(club_id, playerId){
        let clubinfo={
            'id':club_id,
            'playerid':playerId,
        }
        this.send_msg('http.reqClubBlacklisRemove', clubinfo);
    }

    //游戏列表
    reqClubGameList(club_id){
        let clubinfo={
            'id':club_id,
        }
        this.send_msg('http.reqClubGameList', clubinfo);
    }

    //界面控制修改
    reqClubChangeIcon(club_id, icon){
        let clubinfo={
            'id':club_id,
            'icon':icon,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubChangeAvater', clubinfo);
    }
    reqClubChangeName(club_id, name){
        let clubinfo={
            'id':club_id,
            'name':name,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubChangeName', clubinfo);
    }
    reqClubChangeNotice(club_id, notice){
        let clubinfo={
            'id':club_id,
            'notice':notice,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubChangeNotice', clubinfo);
    }
    reqClubChangeOpenGame(club_id, identity){
        let clubinfo={
            'id':club_id,
            'identity':identity,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubChangeOpenGame', clubinfo);
    }
    reqClubChangeIdentity(club_id, memberid, identity){
        let clubinfo={
            'id':club_id,
            'playerid':memberid,
            'identity':identity,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubChangeIdentity', clubinfo);
    }
    reqClubClearDiamond(club_id, member_id){
        let clubinfo={
            'id':club_id,
            'playerid':member_id,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubClearDiamond', clubinfo);
    }
    reqClubKick(club_id, member_id){
        let clubinfo={
            'id':club_id,
            'playerid':member_id,
        }
        this.club_change_list = clubinfo;
        this.send_msg('http.reqClubKick', clubinfo);
    }
 
    //单例处理
    private static _instance:ClubMgr;
    public static getInstance ():ClubMgr{
        if(!this._instance){
            this._instance = new ClubMgr();
        }
        return this._instance;
    }
}