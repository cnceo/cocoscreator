  
var SssDef={
};
//手牌数量 
 
SssDef.cardcount=13; 
//gm操作

SssDef.gmop_changecard=1;//gm换牌
SssDef.gmop_changewallorder=2;//gm更换牌墙顺序
SssDef.gmreq_cards=1;//gm请求牌型

//游金状态
SssDef.youjinstate_null=0;//单游
SssDef.youjinstate_danyou=1;//单游
SssDef.youjinstate_shuangyou=2;//单游
SssDef.youjinstate_sanyou=3;//单游




SssDef.state_idle=1;//等待状态
SssDef.state_chupai=2;//出牌状态
SssDef.state_event=3;//事件状态




SssDef.process_ready=1;//准备
SssDef.process_dingzhuang=2;//定桩
SssDef.process_fapai=3;//发牌
SssDef.process_buhua=4;//补花
SssDef.process_kaijin=5;//开金 
SssDef.process_loop=6;//牌局循环 
SssDef.process_gamesettle=7;//游戏结算 


//服务器检测各种时间的等级
 
//操作优先级从小到大 
SssDef.event_chupai=1;//出牌
SssDef.event_chi=2;//检测吃  
SssDef.event_peng=3;//检测碰
SssDef.event_gang=4;//检测杠
SssDef.event_angang=5;//检测暗杠
SssDef.event_bugang=6;//检测补杠
SssDef.event_zimo=7;//检测自摸
SssDef.event_sanjindao=8;//三金倒  
SssDef.event_hu=9;//检测胡
SssDef.event_qianggang_hu=10;//抢杠胡
SssDef.event_danyou=11;//单游
SssDef.event_shuangyou=12;//双游
SssDef.event_sanyou=13;//三游
SssDef.event_bazhanghua=14;//八张花

//玩家操作
 
SssDef.op_hu=1;//胡 
SssDef.op_angang=2;//暗杠
SssDef.op_gang=3;//杠
SssDef.op_peng=4;//碰
SssDef.op_chi=5;//吃
SssDef.op_chupai=6;//出牌
SssDef.op_bugang=7;//补牌 
SssDef.op_zimo=9;//自摸
SssDef.op_sanjindao=11;//三金倒
SssDef.op_qianggang_hu=12;//抢杠胡
SssDef.op_danyou=13;//游金
SssDef.op_shuangyou=14;//双游
SssDef.op_sanyou=15;//三游
SssDef.op_bazhanghua=16;//八张花
SssDef.op_cancel=20;//取消
 
 

//客户端通知事件
SssDef.onOp='onOp';//操作通知
SssDef.onSeatChange='onSeatChange';//牌权改变通知
SssDef.onEvent='onEvent';//牌事件通知
SssDef.onProcess='onProcess';//进度通知 
SssDef.onSyncData='onSyncData';//同步数据
SssDef.onDeposit='onDeposit';//托管
SssDef.onGmOp='onGmOp';//gm操作通知

SssDef.op_cfg={}
SssDef.op_cfg[SssDef.event_hu]=SssDef.op_hu;
SssDef.op_cfg[SssDef.event_angang]=SssDef.op_angang;
SssDef.op_cfg[SssDef.event_bugang]=SssDef.op_bugang;
SssDef.op_cfg[SssDef.event_gang]=SssDef.op_gang;
SssDef.op_cfg[SssDef.event_peng]=SssDef.op_peng;
SssDef.op_cfg[SssDef.event_chi]=SssDef.op_chi;
SssDef.op_cfg[SssDef.event_zimo]=SssDef.op_zimo;
SssDef.op_cfg[SssDef.event_chupai]=SssDef.op_chupai;
SssDef.op_cfg[SssDef.event_sanjindao]=SssDef.op_hu;
SssDef.op_cfg[SssDef.event_qianggang_hu]=SssDef.op_qianggang_hu;


SssDef.op_cfg[SssDef.event_danyou]=SssDef.op_danyou; 
SssDef.op_cfg[SssDef.event_shuangyou]=SssDef.op_shuangyou;
SssDef.op_cfg[SssDef.event_sanyou]=SssDef.op_sanyou;
SssDef.op_cfg[SssDef.event_bazhanghua]=SssDef.op_bazhanghua;
 



//按胡牌的时机 
SssDef.hutime_zimo=5;//自摸
SssDef.hutime_danyou=6;//单游
SssDef.hutime_shuangyou=7;//双游
SssDef.hutime_sanyou=8;//三游
SssDef.hutime_bazhanghua=9;//八张花
SssDef.hutime_dianpao=10;//点炮 
SssDef.hutime_sanjindao=11;//三金倒
SssDef.hutime_qiangganghu=12;//抢杠胡

  

//胡牌类型
SssDef.hutype_normal=0;//普通

SssDef.MajiangType={}
SssDef.MajiangType.emMJType_Wan    = 1; //万
SssDef.MajiangType.emMJType_Tiao   = 2; //条
SssDef.MajiangType.emMJType_Tong   = 3; //筒
SssDef.MajiangType.emMJType_Zi = 4; //字
SssDef.MajiangType.emMJType_Hua    = 5 ; //花


var COB=function(  m,   n) {
    return m << 4 | (n & 0x0F);
}
let emMJ = {};

emMJ.emMJ_Joker = 0;     //变后的赖子
emMJ.emMJ_1Wan = COB(SssDef.MajiangType.emMJType_Wan, 1);
emMJ.emMJ_2Wan = COB(SssDef.MajiangType.emMJType_Wan, 2);
emMJ.emMJ_3Wan = COB(SssDef.MajiangType.emMJType_Wan, 3);
emMJ.emMJ_4Wan = COB(SssDef.MajiangType.emMJType_Wan, 4);
emMJ.emMJ_5Wan = COB(SssDef.MajiangType.emMJType_Wan, 5);
emMJ.emMJ_6Wan = COB(SssDef.MajiangType.emMJType_Wan, 6);
emMJ.emMJ_7Wan = COB(SssDef.MajiangType.emMJType_Wan, 7);
emMJ.emMJ_8Wan = COB(SssDef.MajiangType.emMJType_Wan, 8);
emMJ.emMJ_9Wan = COB(SssDef.MajiangType.emMJType_Wan, 9);

emMJ.emMJ_1Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 1);
emMJ.emMJ_2Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 2);
emMJ.emMJ_3Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 3);
emMJ.emMJ_4Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 4);
emMJ.emMJ_5Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 5);
emMJ.emMJ_6Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 6);
emMJ.emMJ_7Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 7);
emMJ.emMJ_8Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 8);
emMJ.emMJ_9Tiao = COB(SssDef.MajiangType.emMJType_Tiao, 9);

emMJ.emMJ_1Tong = COB(SssDef.MajiangType.emMJType_Tong, 1);
emMJ.emMJ_2Tong = COB(SssDef.MajiangType.emMJType_Tong, 2);
emMJ.emMJ_3Tong = COB(SssDef.MajiangType.emMJType_Tong, 3);
emMJ.emMJ_4Tong = COB(SssDef.MajiangType.emMJType_Tong, 4);
emMJ.emMJ_5Tong = COB(SssDef.MajiangType.emMJType_Tong, 5);
emMJ.emMJ_6Tong = COB(SssDef.MajiangType.emMJType_Tong, 6);
emMJ.emMJ_7Tong = COB(SssDef.MajiangType.emMJType_Tong, 7);
emMJ.emMJ_8Tong = COB(SssDef.MajiangType.emMJType_Tong, 8);
emMJ.emMJ_9Tong = COB(SssDef.MajiangType.emMJType_Tong, 9);

emMJ.emMJ_DongFeng =     COB(SssDef.MajiangType.emMJType_Zi, 1);//东
emMJ.emMJ_NanFeng =      COB(SssDef.MajiangType.emMJType_Zi, 3);//南
emMJ.emMJ_XiFeng =       COB(SssDef.MajiangType.emMJType_Zi, 5);//西
emMJ.emMJ_BeiFeng =      COB(SssDef.MajiangType.emMJType_Zi, 7);//北

emMJ.emMJ_HongZhong =    COB(SssDef.MajiangType.emMJType_Zi, 9);//中
emMJ.emMJ_FaCai =        COB(SssDef.MajiangType.emMJType_Zi, 11);//发
emMJ.emMJ_BaiBan =       COB(SssDef.MajiangType.emMJType_Zi, 13);//白

//一副中花牌各只有一张
emMJ.emMJ_Mei =  COB(SssDef.MajiangType.emMJType_Hua, 1);//梅
emMJ.emMJ_Lan =  COB(SssDef.MajiangType.emMJType_Hua, 3);//兰
emMJ.emMJ_Ju =   COB(SssDef.MajiangType.emMJType_Hua, 5);//菊
emMJ.emMJ_Zhu =  COB(SssDef.MajiangType.emMJType_Hua, 7);//竹
emMJ.emMJ_Chun =     COB(SssDef.MajiangType.emMJType_Hua, 9);//春
emMJ.emMJ_Xia =  COB(SssDef.MajiangType.emMJType_Hua, 11);//夏
emMJ.emMJ_Qiu =  COB(SssDef.MajiangType.emMJType_Hua, 13);//秋
emMJ.emMJ_Dong =     COB(SssDef.MajiangType.emMJType_Hua,15)  //冬
SssDef.emMJ = emMJ;

let ting_majiang_types = [
        emMJ.emMJ_1Wan,
        emMJ.emMJ_2Wan,
        emMJ.emMJ_3Wan,
        emMJ.emMJ_4Wan,
        emMJ.emMJ_5Wan,
        emMJ.emMJ_6Wan,
        emMJ.emMJ_7Wan,
        emMJ.emMJ_8Wan,
        emMJ.emMJ_9Wan,

        emMJ.emMJ_1Tiao,
        emMJ.emMJ_2Tiao,
        emMJ.emMJ_3Tiao,
        emMJ.emMJ_4Tiao,
        emMJ.emMJ_5Tiao,
        emMJ.emMJ_6Tiao,
        emMJ.emMJ_7Tiao,
        emMJ.emMJ_8Tiao,
        emMJ.emMJ_9Tiao,

        emMJ.emMJ_1Tong,
        emMJ.emMJ_2Tong,
        emMJ.emMJ_3Tong,
        emMJ.emMJ_4Tong,
        emMJ.emMJ_5Tong,
        emMJ.emMJ_6Tong,
        emMJ.emMJ_7Tong,
        emMJ.emMJ_8Tong,
        emMJ.emMJ_9Tong,


        emMJ.emMJ_DongFeng,
        emMJ.emMJ_NanFeng,
        emMJ.emMJ_XiFeng,
        emMJ.emMJ_BeiFeng,
        emMJ.emMJ_HongZhong,
        emMJ.emMJ_FaCai,
        emMJ.emMJ_BaiBan,
]
SssDef.ting_majiang_types = ting_majiang_types;

//可以吃的目标增量
SssDef.chiarr=[[1,2],[-1,1],[-2,-1]] 
   
export const SssDef=SssDef;
 
