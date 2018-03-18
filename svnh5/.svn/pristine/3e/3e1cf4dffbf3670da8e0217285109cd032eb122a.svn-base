//牛牛的定义

export default {
    //游戏玩法分类
    gameType:{
        normal:1,                       //普通
        grabDealer:2,                   //抢庄
    },

    //客户端通知事件
    clientEvent:{
        onStart:"onStart_bull",//当游戏开始的时候
        onGiveCards:"onGiveCards_bull",//操作通知
        onProcess:"onProcess_bull",//进度通知
        onSettle:"onSettle_bull",//同步数据
        onTanPai:"onTanPai_bull", //有人摊牌
    },
    //进度
    process:{
        start:1,            //开始游戏
        giveCards:2,        //发牌
        settle:3,           //结算
    },
    //客户端操作事件
    oprEvent:{
        oprTanPai:1,
        oprPrepare:2//test
    },
    config:{
        bigCardOffWRate:0.4,            //大张卡牌，牌间距占牌本身的比例
        minCardOffWRate:0.4,            //小张卡牌，牌间距占牌本身的比例
        maxGroupCardsNum:5,             //一组手牌最大数量
        cardIntervalTime:0.1,           //发牌间隔
        cardMoveTime:0.25,              //卡牌移动的时间
    }
}