import BaseMgr from "../../../Plat/Libs/BaseMgr";
import BullConst from "./BullConst";
let NiuNiu = require("NiuNiuFP");
//牛牛卡牌

const C_cardAttr = "_cardInfo";
const C_config = {
    otherCardSizeRate:0.5
}
const C_CardType = cc.Enum({
    block : 0,//方块
    flower : 1,//梅花
    redHeart : 2,//红心
    blackHeart : 3//黑桃
}) 

class BullCardsMgr extends BaseMgr{
    atlas_cards:cc.SpriteAtlas = null
    node_handler:cc.Node = null
    ctrl_handler:any = null
    /**
     * 
     * @param handler 自己的卡牌操作类
     * @param atlas_cards 卡牌值的切换图集
     */
    initData(handler, atlas_cards){
        this.ctrl_handler = handler;
        this.node_handler = handler.node;
        this.atlas_cards = atlas_cards;
    }
    clearData(){
        this.atlas_cards = null;
        this.ctrl_handler = null;
        this.node_handler = null;
        BullCardsMgr._instance = null;
    }
    /**
     * 
     * @param logicNum 逻辑值，返回二进制命名
     */
    getSixValue(logicNum){
        logicNum = parseInt(logicNum);
        let str = logicNum < 14 ?  "0x0" : "0x";
        return str + logicNum.toString(16);
    }
    /**
     * 
     * @param cardNode 需要更新值的卡牌节点对象
     */
    setCardValue(cardNode:cc.Node){
        let value = parseInt(cardNode[C_cardAttr].logicValue);
        let sixValue = this.getSixValue(value);
        let name = "bull_"+sixValue;
        let frame = this.atlas_cards.getSpriteFrame(name);
        if(frame){
            cardNode.getComponent(cc.Sprite).spriteFrame = frame;
            cardNode.width *= cardNode[C_cardAttr].cardScale;
            cardNode['_changeW'] = cardNode.width;
            cardNode.height *= cardNode[C_cardAttr].cardScale;
            cardNode['_changeH'] = cardNode.height;
        }else{
            cc.error('atlas lost frame= '+name+', user value= ',value);
        }
    }
    //增加一张自己的卡牌
    addMyCard(){
        let curNode = new cc.Node();
        curNode.parent = this.node_handler;
        curNode.addComponent(cc.Sprite);
        curNode[C_cardAttr] = {
            logicValue:0,
            isOpen:false,
            initPosY:null,
            cardScale:1
        }
        this.setCardValue(curNode);
        return curNode
    }
    //增加一张他人的卡牌
    addOtherCard(){
        let curNode = new cc.Node();
        curNode.parent = this.node_handler;
        curNode.addComponent(cc.Sprite);
        curNode[C_cardAttr] = {
            logicValue:0,
            initPosY:null,
            isOpen:false,
            cardScale:C_config.otherCardSizeRate
        }
        this.setCardValue(curNode);
        return curNode
    }
    /**
     * 隐藏所有的卡牌
     * @param cardsList 需要翻到背面的卡牌列表
     */
    coverCards(cardsList:Array<cc.Node>){
        let len = cardsList.length;
        for(let i = 0; i < len; i ++){
            this._coverCard(cardsList[i]);
        }
    }
    /**
     * 打开一组牌
     * @param cardsList 需要翻开牌的列表
     * @param valueList 翻牌后需要显示的值列表
     */
    openCards(cardsList:Array<cc.Node>, valueList:Array<number>){
        let cardNode;
        for(let i = 0; i < cardsList.length; i ++){
            cardNode = cardsList[i];
            if(cardNode.active){
                cardNode[C_cardAttr].logicValue = valueList[i];
                this._openCard(cardNode);
            }
        }
    }
    //摊牌显示,需要先清理先前的显示残留
    showTanPai(cardsList:Array<cc.Node>, valueList:Array<number>, targetPos:cc.Vec2){
        this.resetCardsToTarget(cardsList, targetPos);
        let curList = this.resortTanPai(cardsList);
        this.resetCardsValue(curList, valueList);
    }
    
    resetCardsValue(cardNodeList:Array<cc.Node>, valueList:Array<number>){
        let cardNode;
        for(let i = 0; i < cardNodeList.length; i ++){
            cardNode = cardNodeList[i];
            cardNode[C_cardAttr].logicValue = valueList[i];
            this.setCardValue(cardNode);
        }
    }
    /**
     * 获取牌型的名字
     * @param value 传入牛几的值，返回显示的名称，如牛五
     */
    getTypeName(value){
        value = parseInt(value);
        let name;
        switch(value){
            case 0:
                name = '无牛';
                break;
            case 10:
                name = '牛牛';
                break;
            default:
                name = '牛'+value;
                break;
        }
        return name
    }
    //将卡牌队列直接显示到对应坐标
    resetCardsToTarget (cardsList:Array<cc.Node>, targetPos:cc.Vec2){
        let giveNum = cardsList.length,
            i,
            cardNode,
            endPos,
            offRate = BullConst.config.minCardOffWRate;
        for(i = 0; i < giveNum; i ++){
            cardNode = cardsList[giveNum - i - 1];
            this._resetCard(cardNode);
            if(cardNode){
                cardNode.zIndex = i + 1;
                endPos = cc.p(targetPos.x, targetPos.y);
                endPos.x += i * offRate * cardNode.width;
                cardNode.position = endPos;
            }
        }
    }

    //返回整理后的卡牌列表和结果
    getCardResult(cardIdList){
        let curList = NiuNiu.GetOxCard(cardIdList);
        if(this._getBullResult(curList.slice(0, 3)) == 0){
            //有牛
            return {
                cardIdList:curList,
                resultType:this._getBullResult(curList.slice(-2))
            }
        }else{
            //没牛
            return {
                cardIdList:curList,
                resultType:0
            }
        }
    }

    //放入多个数, 获取牛值
    private _getBullResult(cardIdList){
        let total = 0, curValue;
        for(let i = 0; i < cardIdList.length; i ++){
            curValue = cardIdList[i] & 0x0f;
            if(curValue > 10) curValue = 10;
            total += curValue;
        }
        return total%10
    }

    //======================

    /**
     *  摊牌后卡牌的整理,api内会做清理，所有卡牌动作都会被清理
     * @param cardsList 传入整理好的5张牌的list，会将后两张特殊表现，突出牛几
     */
    private resortTanPai(cardsList:Array<cc.Node>){
        cardsList = this.reSortCardByPosX(cardsList.concat([]));
        let len = cardsList.length,
            card;
        for(let i = 0; i < cardsList.length; i ++){
            card = cardsList[i];
            if(i >= (len - 2)){
                card.zIndex = 0;
                card.y += card.height*0.35;
                card.x -= card.width*0.9;
            }
        }
        return cardsList
    }

    /**
     * 根据x值大小排序
     * @param cardsList 需要根据x坐标重新整理的卡牌列表
     */
    private reSortCardByPosX(cardsList:Array<cc.Node>){
        let self = this;
        let resort = function(a, b){
            return a.x - b.x;
        }
        cardsList = cardsList.sort(resort);
        return cardsList
    }

    private _resetCard(cardNode:cc.Node){
        cardNode.stopAllActions();
        cardNode.opacity = 255;
        if(cardNode[C_cardAttr].initPosY) cardNode.y = cardNode[C_cardAttr].initPosY;
        cardNode[C_cardAttr].logicValue = 0;
        cardNode[C_cardAttr].isOpen = false;
        cardNode[C_cardAttr].initPosY = null;
    }

    private _hideCard (cardNode:cc.Node){
        cardNode.active = false;
        cardNode[C_cardAttr].isOpen = false;
        // this.num_showCards -= 1;
        // this.list_hideCards.push(cardNode);
    }

    private _coverCard(cardNode:cc.Node){
        cardNode[C_cardAttr].logicValue = 0;
        this.setCardValue(cardNode);
    }

    private _openCard(cardNode:cc.Node){
        let intervalTime = 0.3;
        cardNode[C_cardAttr].isOpen = true;
        let act1 = cc.scaleTo(intervalTime, 0, 1);
        let act2 = cc.callFunc(()=>{
            act1 = cc.scaleTo(intervalTime, 1, 1);
            this.setCardValue(cardNode);
            cardNode.runAction(act1);
        });
        cardNode.runAction(cc.sequence(act1, act2));
    }

    //单例
    private static _instance:BullCardsMgr;
    public static getInstance ():BullCardsMgr{
        if(!this._instance){
            this._instance = new BullCardsMgr();
        }
        return this._instance;
    }
}

export default BullCardsMgr.getInstance()