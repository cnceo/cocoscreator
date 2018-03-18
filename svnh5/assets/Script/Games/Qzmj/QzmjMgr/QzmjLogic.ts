import QzMjPlayer from "./QzmjPlayer";
import { QzmjDef } from "./QzmjDef";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import BaseMgr from "../../../Plat/Libs/BaseMgr";
import QzmjResMgr from "./QzmjResMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
 

//与服务器段已知的牌字典
export default class QzmjLogic extends BaseMgr
{  
    static dicetime=16; 
    opcardarr=null;
    handcards=null;
    huinfo=null;
    maxoptime=12; 
    players={};  
    seatcount=4;
    routes=null;
    matchid=null;
    cardcount=null;
    cardwallindex=null;
    gameid=null; 
    betcfg=null; 
    jin=null; 
    process=null; 
    cardstate=null; 
    curseat=null; 
    zhuangseat=null; 
    touzi1=null; 
    touzi2=null; 
    curcard=null; 
    op_tick=null; 
    curplayer=null;  

    win_seatid=null;//流局 
    fanshus={};
    huacounts={}
    difans={};
    myscore=0;  
    chicards={};//吃的牌   
  
    needtongbu=false;//需要同步数据   
 
    checklevel=0;//检测的等级
    eventseat=0;//检测的座位
    cur_opseatid=null;//当前操作的人    
    lianzhuang=null;
    roomvalue=null;
    scores=null
    mysocre=null
    servertime=null
    myself=null;
    huafans=null;
    ziangangfans=null;
    normalangangfans=null;
    zigangfans=null;
    normalgangfans=null;
    ziankefans=null;
    normalankefans=null;
    zikefans=null;
    gametimes=0;
    paifansforeach=null;
    //单例处理
    private static _instance:QzmjLogic;
    public static getInstance ():QzmjLogic{
        if(!this._instance){
            this._instance = new QzmjLogic();
        }
        return this._instance;
    }
    constructor()   
    {
        super();
        this.maxoptime=12; 
        this.players={};  
        this.seatcount=4;//座位个数  
        //创建四个角色
        for (var i = 0;i<this.seatcount;i++)
        {
            this.players[i]=new QzMjPlayer;
            this.players[i].init(i,this)
        }  

        this.routes={ 
            onProcess:this.onProcess,   
            onEvent:this.onEvent, 
            onSeatChange:this.onSeatChange,
            onOp:this.onOp, 
            onSyncData:this.onSyncData,
            'onGameFinished':this.onGameFinished,
            'http.reqSettle':this.http_reqSettle,  
            onGmOp:this.onGmOp,
        }
        this.resetData();
    }
 
    reqSettle()
    {
        // body
        var msg={
            'matchid':this.matchid,
        }
        this.send_msg('http.reqSettle',msg);//获取结算
    } 
    onGameFinished(msg)
    {  
        // body
        UserMgr.getInstance().reqMyInfo();
        this.reqSettle();
    } 
    //获得剩余牌的数量
    getLeftCardCount(  )
    {
        // body
        return this.cardcount-this.cardwallindex;
    }  
    syncData(  )
    {
        // body
        this.notify_msg('room.roomHandler.syncData',null)
    } 
    onSyncData(msg)
    { 
        // body  
        this.resetData();
        this.cardcount=0;
        this.gameid=msg.gameid;
        this.betcfg=msg.betcfg;
        this.jin=msg.jin;
        this.matchid=msg.matchid;
        this.process=msg.process;
        this.cardstate=msg.cardstate;
        this.curseat=msg.curseat;
        this.zhuangseat=msg.zhuangseat;
        this.touzi1=msg.touzi1;
        this.touzi2=msg.touzi2;
        this.curcard=msg.curcard; 
        this.op_tick=msg.op_tick;
        this.curplayer=this.players[this.curseat]  
        this.cardcount=msg.cardcount;
        this.cardwallindex=msg.cardwallindex;
        if(msg.huinfo)
        {
            this.updateHuInfo(msg.huinfo)
        }  
        var myseatid=RoomMgr.getInstance().getMySeatId();
        this.myself=this.players[myseatid]; 
        for (var seatid=0;seatid<4;++seatid)
        {
            if (seatid == myseatid){ 
                //全部填充，屏幕所有者只关心自己的牌就够了 
                this.players[seatid].initHandCard(msg.handcard)
            }
            else{ 
                var len=msg.others[`${seatid}`]//他妈的json数字不能做key 
                this.players[seatid].fillOthersCard(len)
            }
            this.players[seatid].cardpool=msg.cardpools[seatid]
            var huapai=msg.huapais[seatid]
            var tmphuapai={}; 
            for(var value in huapai) 
            {
                var count=huapai[value] 
                tmphuapai[parseInt(value)]=count;
            }
            this.players[seatid].huapais=tmphuapai;
            this.players[seatid].opcards=msg.opcards[seatid]
        }   
        //资源重新加载
        QzmjResMgr.getInstance().clear();  
        var myseatid=RoomMgr.getInstance().getMySeatId(); 
        this.myself.setEvents(msg.events);
        this.myself.replaceJin();
        QzmjResMgr.getInstance().setJin(this.jin)
    }
    tuoGuan( bvalue)
    {
        // body
        var msg={
            'deposit':bvalue
        }
        this.notify_msg('room.roomHandler.deposit',msg)
    } 
    resetData(  )
    {
        // body 
        this.win_seatid=null;//流局
        this.op_tick=0;//操作计时
        this.fanshus={};
        this.huacounts={}
        this.difans={};
        this.myscore=0;
        this.cardstate=0;//记录牌变化  
        this.chicards={};//吃的牌
        this.cardwallindex=1;//记录牌墙当前索引
        this.touzi1=0;//骰子1
        this.touzi2=0;//骰子2
        this.curseat=0;//当前出手座位
    
        this.jin=0;//金
        this.curcard=null;//当前出的牌  
        this.needtongbu=false;//需要同步数据 
        this.curplayer=null;//当前出手玩家
        this.zhuangseat=0;//庄家位置
   
        this.eventseat=0;//检测的座位
        this.cur_opseatid=null;//当前操作的人

        this.huafans=null;
        this.ziangangfans=null;
        this.normalangangfans=null;
        this.zigangfans=null;
        this.normalgangfans=null;
        this.ziankefans=null;
        this.normalankefans=null;
        this.zikefans=null;
        this.gametimes=0;
        this.paifansforeach=null;
        for(var i = 0;i<this.seatcount;++i)
        {  
            this.players[i].resetData();
        }  
        this.process=QzmjDef.process_ready;
    }
    //玩家操作
    onOp(msg)
    {
        // body
        this.myself.clearEvent();
        var event=msg.event; 
        var op=QzmjDef.op_cfg[event]
        this.cur_opseatid=msg.opseatid;
        console.log("onOp msg=",msg)
        console.log("onOp event=",msg.event,op,'curopseat=',this.cur_opseatid)
        if (op==QzmjDef.op_chupai) 
        {
            this.op_chupai(msg);
        }
        else if( op==QzmjDef.op_hu ){ 
            this.op_hu(msg);
        }
        else if(op==QzmjDef.op_qianggang_hu){
            this.op_qianggang_hu(msg);
        }
        else if( op==QzmjDef.op_peng ){ 
            this.op_peng(msg);
        }
        else if( op==QzmjDef.op_gang ){ 
            this.op_gang(msg);
        }
        else if( op==QzmjDef.op_angang ){ 
            this.op_angang(msg);
        }
        else if( op==QzmjDef.op_chi ){ 
            this.op_chi(msg);
        }
        else if( op==QzmjDef.op_zimo ){ 
            this.op_zimo(msg); 
        }
        else if( op==QzmjDef.op_bugang){ 
            this.op_bugang(msg); 
        }
    }

    //胡
    op_hu(msg)
    {
        // body 
        this.curcard=null;
        this.updateHuInfo(msg.huinfo)
    }
    op_qianggang_hu(msg)
    {
        // body 
        this.curcard=null; 
        console.log("抢杠胡了")
        var bugangPlayer=this.players[msg.bugangSeatId]; 
        bugangPlayer.recoverPeng(msg.bugangCard); 
        this.updateHuInfo(msg.huinfo)
    }
    //自摸
    op_zimo(msg)
    {
        // body 
        var player=this.players[msg.opseatid];
        
        this.curcard=null;
    }
    //玩家杠牌
    op_gang(msg){
        // body 
        var player=this.players[msg.opseatid];
        this.curplayer.removeCardFromPool();
        player.removeCardByCount(this.curcard,3) 
        player.pushGang(this.curcard);
        this.curcard=null;
    }

    //玩家补杠
    op_bugang(msg){
        // body 
        console.log("暗杠了")
        var player=this.players[msg.opseatid];
        player.removeCardByCount(msg.card,1) 
        player.pushBuGang(msg.card);
        this.curcard=null;
    }

    //玩家暗杠
    op_angang(msg){
        // body 
        console.log("暗杠了")
        var player=this.players[msg.opseatid];
        player.removeCardByCount(msg.card,4) 
        player.pushAnGang(msg.card);
        this.curcard=null;
    }
    //玩家碰牌
    op_peng(msg)
    {
        // body 
        var player=this.players[msg.opseatid];
        player.removeCardByCount(this.curcard,2) 

        this.curplayer.removeCardFromPool();
        player.pushPeng(this.curcard);
        this.curcard=null;
    }
    //玩家吃牌
    op_chi(msg)
    {
        // body 
        console.log(msg)
        var player=this.players[msg.opseatid];
        this.curplayer.removeCardFromPool();
        var cards=player.getChiCards(msg.chiindex)
        player.removeCards(cards);
        player.pushChi(msg.chiindex,cards);
        this.curcard=null;
    }
    //玩家出牌
    op_chupai(msg) 
    {
        //放入牌池中  
        this.curcard=msg.card;
        this.curplayer.putInPool(msg.card) 
        this.curplayer.removeCard(msg.card); 
        this.curplayer.sortCard();
    }
    //麻将事件
    onEvent(msg)
    {
        this.myself.setEvents(msg.events); 
    }
    //胡牌信息i
    //这一块计算比较复杂，需要考虑其逻辑意义
    updateHuInfo(huinfo)
    { 
        // body
        var cardpairs=[]; 
        this.huinfo={};
        var hucards=huinfo.hucards;
        this.huinfo.hucards=hucards;
        this.huinfo.hutime=huinfo.hutime;
        this.huinfo.hutype=huinfo.hutype;
        this.huinfo.cardpairs=cardpairs; 
        for (var i = 0;i<hucards.length;++i)
        { 
            var item=hucards[i];
            var type=item.type;
            var jincount=item.jincount;
            var cards=item.cards;
            var cardarr=[];
            cardpairs.push(cardarr);
            if(type==0){
                if(jincount==2){ 
                    for (var k = 0;k<2;++k){ 
                        cardarr.push(this.jin)
                    }
                }
                else if(jincount==1){ 
                    cardarr.push(this.jin)
                    cardarr.push(cards[0])
                }
                else
                {
                    for (var k = 0;k<2;++k)
                    { 
                        cardarr.push(cards[0])
                    } 
                }
            }
            else if(type==1){
                if(jincount==2){ 
                    for (var k = 0;i<2;++k){ 
                        cardarr.push(this.jin)
                    }
                    cardarr.push(cards[0])
                }
                else if(jincount==1){ 
                    cardarr.push(this.jin)
                    for (var k = 0;k<2;++k){ 
                        cardarr.push(cards[0])
                    }
                }
                else{
                    for (var k = 0;k<3;++k){ 
                        cardarr.push(cards[0])
                    }
                }
            }
            else if(type==2){ 

                if(jincount==2){ 
                    for (var k = 0;k<2;k++)
                    {
                        cardarr.push(this.jin)
                    }  
                    cardarr.push(cards[0])
                }
                else if(jincount==1){ 
                    if(Math.abs(cards[1]-cards[0])==1){ 
                        cardarr.push(this.jin) 
                        for (var k = 0;k<2;++k){ 
                            cardarr.push(cards[k])
                        } 
                    }
                    else 
                    {
                        cardarr.push(cards[0])
                        cardarr.push(this.jin)
                        cardarr.push(cards[1])
                    }
                }
                else
                {
                    for(var k = 0;k<3;++k){ 
                        cardarr.push(cards[0]+k)
                    }
                }
            }
        }
 
    }
    //麻将进度
    onProcess(msg)
    {
        this.process=msg.process; 
        if (this.process==QzmjDef.process_dingzhuang){ 
            this.process_dingzhuang(msg);
        }
        else if( this.process==QzmjDef.process_fapai){ 
            this.process_fapai(msg);
        }
        else if( this.process==QzmjDef.process_buhua){ 
            this.process_buhua(msg);
        }
        else if( this.process==QzmjDef.process_kaijin){ 
            this.process_kaijin(msg); 
        }
        else if( this.process==QzmjDef.process_ready){ 
            this.process_ready(msg);  
        }
    }
    //游戏结算
    http_reqSettle(msg)
    { 
        var settle=JSON.parse(msg.settle);
        this.curcard = settle.curcard;
        this.opcardarr = settle.opcardarr;
        this.cardwallindex=settle.cardwallindex;
        this.win_seatid=settle.win_seatid;
        this.handcards = settle.handcards;
        // body  
        this.lianzhuang=settle.lianzhuang;
        this.roomvalue=settle.roomvalue;

        this.huafans=settle.huafans;
        this.ziangangfans=settle.ziangangfans;
        this.normalangangfans=settle.normalangangfans;
        this.zigangfans=settle.zigangfans;
        this.normalgangfans=settle.normalgangfans;
        this.ziankefans=settle.ziankefans;
        this.normalankefans=settle.normalankefans;
        this.zikefans=settle.zikefans;
        this.gametimes=settle.gametimes;
        this.paifansforeach=settle.paifansforeach;
        for (var k in settle.handcards){
            var handcard=settle.handcards[k];
            var seatid=parseInt(k);
            this.players[seatid].updateHandCard(handcard);
        }
        //如果流局了
        if (null == this.win_seatid ){ 
            return;
        }
        this.updateHuInfo(settle.huinfo)
        this.scores={};
        for (var k in settle.scores){ 
            var seatid=parseInt(k); 
            this.huacounts[seatid]=settle.huacounts[k]
            this.difans[seatid]=settle.difans[k] 
            this.scores[seatid]=settle.scores[k]
        } 
        console.log('scores=',this.scores)
        this.mysocre=this.scores[RoomMgr.getInstance().getMySeatId()] ; 
    }
    //游戏准备
    process_ready(msg)
    {
        // body
        this.resetData();
    }

    //定庄
    process_dingzhuang(msg){
        // body  
        this.myself=this.players[RoomMgr.getInstance().myseatid]; 
        QzmjResMgr.getInstance().clear();
        this.resetData();
        this.matchid=msg.matchid;
        this.touzi1=msg.touzi1;
        this.touzi2=msg.touzi2;
        this.zhuangseat=msg.zhuangseat;
        this.curseat=msg.zhuangseat;
        this.curplayer=this.players[this.curseat] 
        this.servertime=msg.servertime;//服务器时间s
        this.cardcount=msg.cardcount;  
        this.gameid=msg.gameid;
        this.betcfg=msg.betcfg;
    }
    //发牌
    process_fapai(msg){
        // body 
        this.cardwallindex=msg.cardwallindex;
        var myseatid=RoomMgr.getInstance().myseatid; 
        for (var seatid=0;seatid<4;++seatid){  
            
            if (seatid == myseatid){ 
                //全部填充，屏幕所有者只关心自己的牌就够了  
                this.players[seatid].initHandCard(msg.handcard)
            }
            else 
            {
                var len=msg.others[`${seatid}`]//他妈的js数字不能做key
                this.players[seatid].fillOthersCard(len)
            }
        }
    }
    //补花
    process_buhua(msg){
        // body
        this.cardwallindex=msg.cardwallindex;
        console.log("补花") 
        for(var  seatid = 0;seatid<msg.huapaiarr.length;++seatid){  
            this.players[seatid].buHua(msg.huapaiarr[seatid],msg.bupaiarr[seatid]);
        }
    }
    //牌权改变
    onSeatChange(msg){
        console.log("牌权改变")
        // body 
        this.cardwallindex=msg.cardwallindex;
        this.curseat=msg.curseat; 
        this.curcard=msg.card; 
        this.curplayer=this.players[this.curseat]
        if (msg.needbupai){   
            if (msg.huaarr){ 
                for (var i=0;i<msg.huaarr.length;++i){  
                    this.curplayer.putInHua(msg.huaarr[i])
                }  
            }
            this.curplayer.pushCard(msg.card) 
        }    
    }
    //开金
    process_kaijin(msg){
        this.cardwallindex=msg.cardwallindex; 
        var jin=msg.jin;
        this.jin=msg.jin;  
        this.myself.replaceJin();
        QzmjResMgr.getInstance().setJin(this.jin)
     
    }
    //玩家操作
    playerOp(event,data){
        // body 
        console.log("playerOp event=",event,data)
        var msg={event:event}
        var op=QzmjDef.op_cfg[event]  
        if(op==QzmjDef.op_chupai){  
            msg['data']=this.curplayer.getCard(data);
        }
        else if(op==QzmjDef.op_chi){
            msg['data']=data;
        }
        else if(op==QzmjDef.op_angang){ 
            msg['data']=data;
        } 
        else if(op==QzmjDef.op_bugang){ 
            msg['data']=data;
        } 
    
        this.notify_msg('room.roomHandler.playerOp',msg);
        this.myself.clearEvent();
    }
    //玩家取消
    playerCancel()
    { 
        this.notify_msg('room.roomHandler.playerCancel',{});
    }
    
 
    //检查是否掉数据
    checkCardState(msg){
        //先同步状态
        var cardchanged=msg.cardchanged;
        var cardstate=msg.cardstate;
        if(cardchanged){ 
            if(cardstate-this.cardstate!=1){ 
                console.log("牌状态错位")
                return false
            }
        }
        else
        {
            if(cardstate!=this.cardstate){ 
                console.log("牌状态错位")
                return false
            }
        }
        //同步牌的状态
        this.cardstate=cardstate;
        return true
    }
    //gm操作
    gmOp(msg)
    { 
        this.notify_msg('room.roomHandler.gmOp',msg);
    }
    //gm请求
    gmReq(msg)
    { 
        this.send_msg('room.roomHandler.gmReq',msg);
    }
 
    //收到gmop广播
    onGmOp(msg)
    {
        if(!msg)
        {
            return;
        }
        let optype=msg.optype;
        let opseatid=msg.opseatid;
        let data=msg.data;
        let src=data.src;
        let dest=data.dest;
        let target=data.target
        console.log("logic onGmOp msg=",msg)
        switch(optype)
        {
            //换牌操作
            case QzmjDef.gmop_changecard:
                if(opseatid==RoomMgr.getInstance().getMySeatId())
                {
                    //如果是我自己则修改自己的牌
                    this.players[opseatid].switchCard(src,dest);
                }
                if(target==RoomMgr.getInstance().getMySeatId()){
                    //如果是我的牌被人换了
                    this.players[target].switchCard(dest,src);
                }
            break;
        }
    }
}
 
 


 
 