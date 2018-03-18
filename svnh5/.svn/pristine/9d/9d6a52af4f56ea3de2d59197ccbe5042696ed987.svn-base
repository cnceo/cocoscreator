//通比牛牛
var CMD_NIUNIU_TB = {
    MAXCOUNT:						5,										//扑克最大数目
};
var PokerCard = function () {
    this._cardValue= 0;
};
PokerCard.prototype = {
    setValue: function (value) {
        if (this.isValidValue(value)) {
            this._cardValue = value;
        }
    },
    getValue: function () {
        return this._cardValue;
    },
    getSuitValue: function () {
        return this._cardValue & 0xF0;
    },
    getRankValue: function () {
        return this._cardValue & 0x0F;
    },
    isValidValue: function () {
        return true;
    },
    getContent: function () {
        return PokerCard.SuitTypes[this.getSuitValue()] + PokerCard.RankTypes[this.getRankValue() - 1];
    },

    equals: function (anotherCard) {
        return this.getValue() == anotherCard.getValue();
    }
}
//类成员
//公认的扑克花色大小: 黑桃 >　红桃 > 梅花 >　方片
PokerCard.SuitTypes = ['♦', '♣', '♥', '♠', 'Joker'];
PokerCard.RankTypes = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//类函数
PokerCard.create = function (suitOrValue, rank) {
    var card = new PokerCard();
    if (!!card && suitOrValue != null) {
        if (!!rank) {
            card.setValue(suitOrValue * 0x10 + rank);
        }
        else {
            card.setValue(suitOrValue);
        }

        return card;
    }
    return null;
};
PokerCard.createCards = function (arr) {
    var cards = [];
    var str = "#### PokerCard.createCards = ";
    for (var idx in arr) {
        var card = PokerCard.create(arr[idx]);
        if (card) {
            cards.push(card);
            str += card.getContent();
            str += " ";
        }
    }
    return cards;
};

var NiuNiuFP = {
    //扑克类型 没牛-牛丁-牛二……牛八-牛九-牛牛-四花-五花-炸弹-小牛牛
    //五小>五花>同花顺>炸弹>葫芦>同花>顺子>三条>牛牛>牛九>……>牛一>没牛
    CardType : {
        OX_VALUE0: 0,									//混合牌型
        OX_THREE_SAME: 11,                            //三条：有三张相同点数的牌；（3倍）
        OX_ORDER_NUMBER: 12,                           //顺子：五张牌是顺子，最小的顺子12345，最大的为910JQK；（3倍）
        OX_FIVE_SAME_FLOWER: 13,                       //同花：五张牌花色一样；（3倍）
        OX_THREE_SAME_TWAIN: 14,                       //葫芦：三张相同点数的牌+一对；（3倍）
        OX_FOUR_SAME: 15,								//炸弹：有4张相同点数的牌；（4倍）
        OX_STRAIGHT_FLUSH: 16,                          //同花顺：五张牌是顺子且是同一种花色；（4倍）
        OX_FIVE_KING: 17,								//五花：五张牌都是KQJ；（5倍）
        OX_FIVE_CALVES: 18								//五小牛：5张牌都小于5点且加起来不超过10；（5倍）
    },
    //获取具体牌值
    GetCardLogicValue (cardData){
        var card = PokerCard.create(cardData);
        var rankValue = card.getRankValue();
        var logicValue = rankValue;
        if (rankValue > 10) {
            logicValue = 10;
        }
        return logicValue;
    },
    //按牌的点数花色大小进行排序, 先值后花色, 从大到小
    GetCardOrder (cardsData){
        var cardsTemp = cardsData.slice(0); //arr
        cardsTemp.sort(function (a, b) {
            var aSmall = a & 0x0f;
            var bSmall = b & 0x0f;
            if (aSmall !== bSmall) {
                return aSmall < bSmall;
            } else {
                var aBig = a >> 4;
                var bBig = b >> 4;
                return aBig < bBig;
            }
        });
        return cardsTemp;
    },
    // 最得顺序的最大牌值
    getCardsResult (cardsData){
        var getLogicValue = function (cardData) {
            var card = PokerCard.create(cardData);
            var rankValue = card.getRankValue();
            var logicValue = rankValue;
            if (rankValue > 10) {
                logicValue = 10;
            }
            return logicValue;
        };
        var getCardGroups = function (cardsData) {
            var cardGroup = [];
            var cardCount = cardsData.length;
            for (var i = 0; i < cardCount - 4; i++) {
                for (var j = i + 1; j < cardCount - 3; j++) {
                    for (var k = j + 1; k < cardCount - 2; k++) {
                        for (var m = k + 1; m < cardCount - 1; m++) {
                            for (var n = m + 1; n < cardCount; n++) {
                                var temp = [cardsData[i], cardsData[j], cardsData[k], cardsData[m], cardsData[n]];
                                cardGroup.push(temp);
                            }
                        }
                    }
                }
            }
            return cardGroup;
        };
        // 组合顺序排列函数 从arr 数组中 取得count 张 的组合集
        // arr 原数组， start 从哪个开始找, result 保存结果，为一维数组
        // count为result数组的索引值，起辅助作用 //NUM为要选取的元素个数
        // explase combine([7,6,5,4,3,2,1] , 0, result, 5,5,data)
        // 取数组顺序选5个组成
        var combine = function (arr, start, result, count, NUM, data) {
            var nSize = arr.length;
            for (var i = start; i < nSize + 1 - count; i++) {
                result[count - 1] = i;
                if (count - 1 === 0) {
                    var j;
                    var index = data.length;
                    data[index] = [];
                    for (j = NUM - 1; j >= 0; j--) {
                        data[index].push(arr[result[j]])
                    }
                    //console.log("\n");
                }
                else
                    combine(arr, i + 1, result, count - 1, NUM, data)
            }
        };
        // 五小牛：5张牌都小于5点且加起来不超过10
        var Get_OX_FIVE_CALVES = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var totalValue = 0;
            for (var i = 0; i < cardsData.length; i++) {
                var cardValue = cardsData[i] & 0x0f;
                if (cardValue < 5) {
                    totalValue += cardValue;
                    if (totalValue > 10)
                        return;
                }
                else
                    return;
            }
            // 五小
            var resultData = {
                type: NiuNiuFP.CardType.OX_FIVE_CALVES,
                cards: cardsData
            };
            return resultData;
        };
        //取得五花：五张牌都是KQJ；
        var Get_OX_FIVE_KING = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            for (var i = 0; i < cardsData.length; i++) {
                var cardValue = cardsData[i] & 0x0f;
                if (cardValue > 10 && cardValue < 14) {
                    continue;
                }
                else
                    return;
            }
            // 五花
            var resultData = {
                type: NiuNiuFP.CardType.OX_FIVE_KING,
                cards: cardsData
            };
            return resultData;
        };
        //取得同花顺 五张牌是顺子且是同一种花色；
        var Get_OX_STRAIGHT_FLUSH = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var compareCardss = [];
            for (var i = 0; i < CMD_NIUNIU_TB.MAXCOUNT; i++) {
                compareCardss.push(cardsData[0] - i); // 构造一个最大同花顺
            }
            if (cardsData.toString() === compareCardss.toString()) {
                var resultData = {
                    type: NiuNiuFP.CardType.OX_STRAIGHT_FLUSH,
                    cards: cardsData
                };
                return resultData;
            }
            return;
        };
        //取得炸弹 有4张相同点数的牌
        var Get_OX_FOUR_SAME = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var cardValues = [];
            for (var i = 0; i < cardsData.length; i++) {
                var value = cardsData[i] & 0x0f;
                cardValues.push(value); // 卡牌值
            }
            for (var i = 0; i <= cardCount - 4; i++) {
                var temp = cardValues[i] & cardValues[i + 1] & cardValues[i + 2] & cardValues[i + 3];
                if (temp === cardValues[i]) {
                    var bombResultData = {
                        type: NiuNiuFP.CardType.OX_FOUR_SAME,
                        cards: cardsData
                    };
                    return bombResultData
                }
            }
            return;
        };
        //取得葫芦 三张相同点数的牌+一对
        var Get_OX_THREE_SAME_TWAIN = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var bHulu = false;

            var cardValues = [];
            for (var i = 0; i < cardsData.length; i++) {
                var value = cardsData[i] & 0x0f;
                cardValues.push(value); // 卡牌值
            }

            var value_3_begin = cardValues[0] & cardValues[1] & cardValues[2];
            if (value_3_begin === cardValues[0]) {
                if (cardValues[4] === cardValues[3]) {
                    bHulu = true
                }
            }
            var value_3_end = cardValues[2] & cardValues[3] & cardValues[4];
            if (value_3_end === cardValues[2]) {
                if (cardValues[0] === cardValues[1]) {
                    bHulu = true
                }
            }
            if (bHulu) {
                var huluResultData = {
                    type: NiuNiuFP.CardType.OX_THREE_SAME_TWAIN,
                    cards: cardsData
                };
                return huluResultData
            }
            return;
        };
        //取得同花 五张牌花色一样
        var Get_OX_FIVE_SAME_FLOWER = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var cardcolor = cardsData[0] >> 4; // 同花的颜色
            for (var i = 1; i < cardsData.length; i++) {
                var colorValue = cardsData[i] >> 4;
                if (cardcolor !== colorValue)
                    return;
            }

            var resultData = {
                type: NiuNiuFP.CardType.OX_FIVE_SAME_FLOWER,
                cards: cardsData
            };
            return resultData;
        };
        //取得顺子 五张牌是顺子，最小的顺子12345，最大的为910JQK；
        var Get_OX_ORDER_NUMBER = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var cardsTemp = cardsData.slice(0); //arr
            var cardsValue = [];
            var compareCardss = [];
            for (var i = 0; i < cardsTemp.length; i++) {
                var value = cardsTemp[i] & 0x0f;
                cardsValue.push(value);
            }
            var maxValue = cardsTemp[0] & 0x0f; // 取各最大牌值
            for (var i = 0; i < CMD_NIUNIU_TB.MAXCOUNT; i++) {
                compareCardss.push(maxValue - i); // 构造一个最大顺子
            }
            if (cardsValue.toString() === compareCardss.toString()) {
                var resultData = {
                    type: NiuNiuFP.CardType.OX_ORDER_NUMBER,
                    cards: cardsData
                };
                return resultData;
            }
            return;
        };
        //取得三条 有三张相同点数的牌；（3倍）
        var Get_OX_THREE_SAME = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var cardValues = [];
            for (var i = 0; i < cardsData.length; i++) {
                var value = cardsData[i] & 0x0f;
                cardValues.push(value); // 卡牌值
            }
            for (var i = 0; i <= cardCount - 3; i++) {
                var temp = cardValues[i] & cardValues[i + 1] & cardValues[i + 2];
                if (temp === cardValues[i]) {
                    var bombResultData = {
                        type: NiuNiuFP.CardType.OX_THREE_SAME,
                        cards: cardsData
                    }
                    return bombResultData
                }
            }
            return;
        };
        // 取得牛牛值 OX_VALUE0
        var Get_OX_VALUE0 = function (cardsData) {
            var cardCount = cardsData.length;
            if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
                return;
            }
            var cardsTemp = cardsData.slice(0); //arr
            var cards = PokerCard.createCards(cardsData);	//card
            var sum = 0;  // 总点数
            var cardsLogicValue = []; // 五张牌的各自真正 点数

            for (var i = 0; i < cardCount; i++) {
                var logicValue = getLogicValue(cardsTemp[i]);
                cardsLogicValue[i] = logicValue;
                sum += logicValue;
            }
            var kingCount = 0;

            for (var i = 0; i < cardCount; i++) {
                var card = cards[i]; // 大小王
                if (card.getValue() === 0x4E || card.getValue() === 0x4F) {
                    kingCount += 1;
                }
            }

            var maxValue = 0; //最大牛
            var maxIndex = 0; //最大牛牌索引

            // var oxValues = []; //[][CMD_NIUNIU_TB.MAXCOUNT]
            var oxCount = 0;//牛数

            var bHaveKing = false;

            for (var i = 0; i < cardCount - 1; i++) {
                for (var j = i + 1; j < cardCount; j++) {
                    bHaveKing = false;

                    var residue = (sum - cardsLogicValue[i] - cardsLogicValue[j]) % 10;
                    if (residue > 0 && kingCount > 0) {
                        for (var k = 0; k < cardCount; k++) {
                            if (k !== i && k !== j) {
                                if (cardsTemp[k] === 0x4E || cardsTemp[k] === 0x4F) {
                                    bHaveKing = true;
                                }
                            }
                        }
                    }

                    //如果减去2个剩下3个是10的倍数
                    if (residue === 0 || bHaveKing) {
                        var value = cardsLogicValue[i] + cardsLogicValue[j];
                        if (value > 10) {
                            if (cardsTemp[i] === 0x4E || cardsTemp[i] === 0x4F || cardsTemp[j] === 0x4E || cardsTemp[j] === 0x4F) {
                                bHaveKing = true;
                                value = 10;
                            } else {
                                value -= 10;
                            }
                        }

                        if (value > maxValue) {
                            maxValue = value;
                            maxIndex = oxCount;
                        }
                        oxCount++;
                    }
                }
            }

            var resultData = {
                type: maxValue,
                cards: cardsData
            };
            return resultData;
        };
        var cardGroup = getCardGroups(cardsData); // 顺序组合排列
        var  get_specialGroup = function (cardsData, type) {
            var func = null;
            switch (type) {
                case NiuNiuFP.CardType.OX_FIVE_CALVES:
                    func = Get_OX_FIVE_CALVES;
                    break;
                case NiuNiuFP.CardType.OX_FIVE_KING:
                    func = Get_OX_FIVE_KING;
                    break;
                case NiuNiuFP.CardType.OX_STRAIGHT_FLUSH:
                    func = Get_OX_STRAIGHT_FLUSH;
                    break;
                case NiuNiuFP.CardType.OX_FOUR_SAME:
                    func = Get_OX_FOUR_SAME;
                    break;
                case NiuNiuFP.CardType.OX_THREE_SAME_TWAIN:
                    func = Get_OX_THREE_SAME_TWAIN;
                    break;
                case NiuNiuFP.CardType.OX_FIVE_SAME_FLOWER:
                    func = Get_OX_FIVE_SAME_FLOWER;
                    break;
                case NiuNiuFP.CardType.OX_ORDER_NUMBER:
                    func = Get_OX_ORDER_NUMBER;
                    break;
                case NiuNiuFP.CardType.OX_THREE_SAME:
                    func = Get_OX_THREE_SAME;
                    break;
                /*            case NiuNiuFP.CardType.OX_VALUE0:
                 func = Get_OX_VALUE0;
                 break;*/
                default:
                    break;
            }
            for (var i = 0; i < cardsData.length; i++) {
                var resultData = null;
                if (func) {
                    resultData = func(cardsData[i]);
                    if (resultData) {
                        return resultData;
                    }
                }
            }
            return null;
        };

        var types = [NiuNiuFP.CardType.OX_FIVE_CALVES,
            NiuNiuFP.CardType.OX_FIVE_KING,
            NiuNiuFP.CardType.OX_STRAIGHT_FLUSH,
            NiuNiuFP.CardType.OX_FOUR_SAME,
            NiuNiuFP.CardType.OX_THREE_SAME_TWAIN,
            NiuNiuFP.CardType.OX_FIVE_SAME_FLOWER,
            NiuNiuFP.CardType.OX_ORDER_NUMBER,
            NiuNiuFP.CardType.OX_THREE_SAME];
        // 取得特殊牌组的最大值
        for (var i = 0; i < types.length; i++) {
            var result = get_specialGroup(cardGroup, types[i]);
            if (result) return result;
        }
        var maxNiuData = {
            type: NiuNiuFP.CardType.OX_VALUE0,
            cards: cardGroup[0]
        };
        for (var i = 0; i < cardGroup.length; i++) {
            var result = Get_OX_VALUE0(cardGroup[i]);
            if (result) {
                if (result.type && result.type > maxNiuData.type) {
                    maxNiuData.type = result.type;
                    maxNiuData.cards = result.cards;
                }
            }
        }
        return maxNiuData;
    },
    //return 是否有牛， 有牛改变cardsData的顺序
    GetOxCard (cardsData){
        var cardCount = cardsData.length;
        if (cardCount !== CMD_NIUNIU_TB.MAXCOUNT) {
            return;
        }

        var cardsTemp = cardsData.slice(0); //arr
        var cards = PokerCard.createCards(cardsData);	//card

        var sum = 0;
        var cardsLogicValue = [];

        for (var i = 0; i < cardCount; i++) {
            var logicValue = this.GetCardLogicValue(cardsTemp[i]);
            cardsLogicValue[i] = logicValue;
            sum += logicValue;
        }

        var kingCount = 0;

        for (var i = 0; i < cardCount; i++) {
            var card = cards[i];
            if (card.getValue() === 0x4E || card.getValue() === 0x4F) {
                kingCount += 1;
            }
        }

        var maxValue = 0; //最大牛
        var maxIndex = 0; //最大牛牌索引

        var oxValues = []; //[][CMD_NIUNIU_TB.MAXCOUNT]
        var oxCount = 0;//牛数

        var bHaveKing = false;

        for (var i = 0; i < cardCount - 1; i++) {
            for (var j = i + 1; j < cardCount; j++) {
                bHaveKing = false;

                var residue = (sum - cardsLogicValue[i] - cardsLogicValue[j]) % 10;

                if (residue > 0 && kingCount > 0) {
                    for (var k = 0; k < cardCount; k++) {
                        if (k !== i && k !== j) {
                            if (cardsTemp[k] === 0x4E || cardsTemp[k] === 0x4F) {
                                bHaveKing = true;
                            }
                        }
                    }
                }
                //如果减去2个剩下3个是10的倍数
                if (residue === 0 || bHaveKing) {
                    var oxValue = [];
                    var count = 0;
                    for (var k = 0; k < cardCount; k++) {
                        if (k !== i && k !== j) {
                            oxValue[count++] = cardsTemp[k];
                        }
                    }
                    oxValue[count++] = cardsTemp[i];
                    oxValue[count++] = cardsTemp[j];

                    oxValues[oxCount] = oxValue;

                    var value = cardsLogicValue[i] + cardsLogicValue[j];
                    if (value > 10) {
                        if (cardsTemp[i] === 0x4E || cardsTemp[i] === 0x4F || cardsTemp[j] === 0x4E || cardsTemp[j] === 0x4F) {
                            bHaveKing = true;
                            value = 10;
                        } else {
                            value -= 10;
                        }
                    }

                    if (value > maxValue) {
                        maxValue = value;
                        maxIndex = oxCount;
                    }

                    oxCount++;
                }
            }
        }

        if (oxCount > 0) {
            cardsData = oxValues[maxIndex];
        }

        return cardsData;
    },
    //取出多出来的那两张
    GetPublicCards (arr1, arr2){
        var temp = [];
        var tempArray = [];
        for (var i = 0; i < arr2.length; i++) {
            temp[arr2[i]] = true;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (!temp[arr1[i]]) {
                tempArray.push(arr1[i]);
            }
        }
        return tempArray;
    },
    // 传入7张牌 取得最优组合
    GetResultCardType (cardsData){
        var cardsOrder = this.GetCardOrder(cardsData);
        var resultData = this.getCardsResult(cardsOrder);
        return resultData;
    }
}

module.exports = NiuNiuFP;