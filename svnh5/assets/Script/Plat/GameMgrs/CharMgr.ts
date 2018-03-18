//聊天管理
//TODO 管理房间聊天
import BaseMgr from "../Libs/BaseMgr";

 
export default class CharMgr extends BaseMgr{
    routes:{} = null 
    //====== 
    uid:any = null
    public ChatText = [
        '打的我快要睡着了',
        '快点呀，等你想好我已经跑好几趟厕所回来了',
        '快点出呀，你是在孵蛋吗',
        '嘿，还不出，我要去吃一碗沙茶面回来了',
        '老人家也没有你这么慢的',
        '你慢慢想，我要去中山路逛一圈',
        '你每次都这么慢，以后不和你打牌了',
        '你到底是在打牌还是在下棋呀',
        '差一点就游金了，太衰了',
        '起手就4款牌，怕了吗',
        '随便调庄，不要给你赢太多了',
        '听牌了，你要打的准哦',
        '哇，运气真好，每次都中奖',
        '运气真是好，你是要怎么和我玩',
        '这手烂牌，怎么胡，不打更爽啦',
        '这手牌听了，赢到你不要不要的',
        '最近手气不错呀',
        '昨天买马中了，今天手气特别好',
        '这么多大牌，什么时候打得完呀',
        '唉，这手牌看到就累，要我怎么办呀',
        '这种牌不知道金是什么样子，圆的还是扁的',
        '活到现在就没有胡牌过',
        '大牌这么多，像开大排档一样',
        '今天打牌，出门没看日子',
        '摸什么，打什么，唉，运气太差了',
        '唉，你也让我吃一只，从来没有你这么咸的',
        '这牌呀，连一刻都没有，灰撒撒',
        '打到天亮，输了也让你们先欠着，没关系',
        '和你们这些老伯打牌，我会害怕，小让一下',
        '来来来，做下去，至少打三刻呀',
        '又来了！上次赢的还没花完吗',
        '这个厦门麻将真好玩，人真多呀',
        '最近在忙什么，这么久没看到了',
    ]; 
    constructor (){
        super(); 
        this.routes={
            
        }
    }
    sendText(msg){
        this.send_msg('http.reqChat',msg);
    }

    //单例处理
    private static _instance:CharMgr;
    public static getInstance ():CharMgr{
        if(!this._instance){
            this._instance = new CharMgr();
        }
        return this._instance;
    }
}