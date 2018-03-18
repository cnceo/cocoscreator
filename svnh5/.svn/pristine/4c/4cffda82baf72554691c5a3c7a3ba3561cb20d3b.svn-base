import QgMjPlayer from "./QgmjPlayer";
import { QgmjDef } from "./QgmjDef";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import BaseMgr from "../../../Plat/Libs/BaseMgr";
import QgmjResMgr from "./QgmjResMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";


//与服务器段已知的牌字典
export default class QgmjAudio extends BaseMgr
{    
    //单例处理
    private static _instance:QgmjAudio;
    public effectAudioId = null;
    public musicAudioId = null;
    public voiceAudioId = null;
    public musicVolume = 1;
    public effectVolume = 1;
    public musicPathKing = 0;
    public static getInstance ():QgmjAudio{
        if(!this._instance){
            this._instance = new QgmjAudio();
        }
        return this._instance;
    }
    constructor()   
    {
        super();
        this.routes={ 
            onProcess:this.onProcess,    
            onOp:this.onOp,  
        }

        this.initMusic();
    }        
    //玩家操作
    onOp(msg)
    {
        // body 
        let event=msg.event; 
        let op=QgmjDef.op_cfg[event]  
        let path = null;
        switch(op)
        {
            case QgmjDef.op_chupai:
                path = QgmjResMgr.getInstance().getCardAudioByName(op, msg.card);
                if(!path)return;
                this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
            break;
            default:
                path = QgmjResMgr.getInstance().getAudioByName(op);
                if(!path)return;
                this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
            break;
        }
         
    }
    onProcess(msg)
    {
        let path = QgmjResMgr.getInstance().getProcessAudioByName(msg.process);
        if(!path)return;
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playVoiceAudio(textId){
        let path = QgmjResMgr.getInstance().getVoiceAudioByName(textId);
        if(!path)return;
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }
    
    public playClockAudio(){
        let path = QgmjResMgr.getInstance().getClockAudio();
        if(!path)return;
        console.log(path);
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playDiceAudio(){
        let path = QgmjResMgr.getInstance().getDiceAudio();
        if(!path)return;
        console.log(path);
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public OtherPlayerEnterAudio(){
        let path = QgmjResMgr.getInstance().getOtherPlayerEnterAudio();
        if(!path)return;
        console.log(path);
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public OtherPlayerLeaveAudio(){
        let path = QgmjResMgr.getInstance().getOtherPlayerLeaveAudio();
        if(!path)return;
        console.log(path);
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playWinAudio(){
        let path = QgmjResMgr.getInstance().getWinAudio();
        if(!path)return;
        console.log(path);
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playLostAudio(){
        let path = QgmjResMgr.getInstance().getLostAudio();
        if(!path)return;
        console.log(path);
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }


    //音乐初始化
    private initMusic(){
        cc.audioEngine.setMaxAudioInstance(2); //2个实例，一个音乐，一个音效
    }
    //音乐播放
    public playMusic(path:string){
        this.musicAudioId = cc.audioEngine.play(path, true, this.musicVolume);
    }
    //音效
    public setEffectVolume(Volume:number){
        this.effectVolume = Volume;
        cc.audioEngine.setVolume(this.effectAudioId,Volume);
    }
    //音乐
    public setMusicVolume(Volume:number){
        this.musicVolume = Volume;
        cc.audioEngine.setVolume(this.musicAudioId,Volume);
	}
    //卸载所有音效
    public uncacheAll(){
        cc.audioEngine.uncacheAll();
    }
    
    public setMusicPathKind(type){
        this.musicPathKing = type;
        QgmjResMgr.getInstance().setPathKind(type);
    }
}
 
 


 
 