//
 
export default class BehaviorMgr{ 
    //单例处理

    //商店模块传值
    private goodsId = null;
    private goodsType = null;
    private goodsBuyId = null;
    private goodsBuyType = null;
    //排行模块传值
    private rankData = null;
    //俱乐部房间数据
    private clubRoomData = null;
    //搜索俱乐部数据
    private clubSeekData = null;
    //俱乐部选中的id
    private clubSelectId = null;
    //俱乐部成员模块传值
    private clubMemberId = null;
    //俱乐部战绩模块传值
    private clubRecordData = null;
    //gm换牌
    public changeSeatId = null;
    //申请列表传值
    public applyListData = null;

    public blacklistData = null;

    private static _instance:BehaviorMgr;
    
    public static getInstance ():BehaviorMgr{
        if(!this._instance){
            this._instance = new BehaviorMgr();
        }
        return this._instance;
    }

    //申请列表子元素点击按钮获取的数据
    setApplyListData(data){
        this.applyListData = data
    }

    getApplyData(){
        return this.applyListData
    }
    //俱乐部申请列表黑名单子元素点击按钮获取的数据
    setBlacklistData(data){
        this.blacklistData = data
    }
    getBlacklistData(){
        return this.blacklistData
    }

    //商店子元素点击按钮需要获取的数据
    setGoodsItemData(_id, _type){
        this.goodsId = _id;
        this.goodsType = _type;
    }
    getGoodsItemData(){
        return new Array(this.goodsId, this.goodsType);
    }
    //商店购买道具弹出窗需要获取的数据
    setGoodsBuyData(_id, _type){
        this.goodsBuyId = _id;
        this.goodsBuyType = _type;
    }
    getGoodsBuyData(){
        return new Array(this.goodsBuyId, this.goodsBuyType);
    }

    //排行榜传值 {index, id, icon, name, award, sex, site}
    setRankItemData(data){
        this.rankData = data;
    }
    getRankItemData(){
        return this.rankData;
    }

    //进入房间 {type, pay, count, round, time}
    setClubRoomData(data){
        this.clubRoomData = data;
    }
    getClubRoomData(){
        return this.clubRoomData;
    }

    //进入房间 {id, icon, name, notice, count, max, captain_name}
    setClubSeekData(data){
        this.clubSeekData = data;
    }
    getClubSeekData(){
        return this.clubSeekData;
    }
    //俱乐部选中的id
    setClubSelectId(id){
        this.clubSelectId = id;
    }
    getClubSelectId(){
        return this.clubSelectId;
    }

    //俱乐部成员 {id,icon,name,identity,diamond,diamondMax, user_identity}
    //fightRecord:{id, id}
    setClubMemberId(data){
        this.clubMemberId = data;
    }
    getClubMemberId(){
        return this.clubMemberId;
    }
    //俱乐部战绩 {id, type, name, pay, time}
    setClubRecordData(data){
        this.clubRecordData = data;
    }
    getClubRecordData(){
        return this.clubRecordData;
    }
}