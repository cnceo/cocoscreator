import QzMjPlayer from "./SssPlayer";
import { SssDef } from "./SssDef";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import BaseMgr from "../../../Plat/Libs/BaseMgr";
import SssResMgr from "./SssResMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";


//与服务器段已知的牌字典
export default class SssAudio extends BaseMgr
{    
    //单例处理
    private static _instance:SssAudio;
    public effectAudioId = null;
    public musicAudioId = null;
    public voiceAudioId = null;
    public musicVolume = 1;
    public effectVolume = 1;
    public musicPathKing = 0;
    // private soundNode = new cc.Node();
    public static getInstance ():SssAudio{
        if(!this._instance){
            this._instance = new SssAudio();
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

        // this.routes = {
		// 	'http.sendText':this.http_sendText.bind(this),  
		// } 	
        this.initMusic();
    }        
    //玩家操作
    onOp(msg)
    {
        // body 
        let event=msg.event; 
        let op=SssDef.op_cfg[event]  
        let path = null;
        switch(op)
        {
            case SssDef.op_chupai:
                path = SssResMgr.getInstance().getCardAudioByName(op, msg.card);
                if(!path)return;
                this.stopAudio();
                this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
            break;
            default:
                path = SssResMgr.getInstance().getAudioByName(op);
                if(!path)return;
                this.stopAudio();
                this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
            break;
        }
         
    }
    public stopAudio(){
        cc.audioEngine.stop(this.effectAudioId);
    }
    onProcess(msg)
    {
        let path = SssResMgr.getInstance().getProcessAudioByName(msg.process);
        if(!path)return;
        this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playVoiceAudio(textId){
        let path = SssResMgr.getInstance().getVoiceAudioByName(textId);
        if(!path)return;
        this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }
    
    public playClockAudio(){
        let path = SssResMgr.getInstance().getClockAudio();
        if(!path)return;
        console.log(path);
        // this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playDiceAudio(){
        let path = SssResMgr.getInstance().getDiceAudio();
        if(!path)return;
        console.log(path);
        this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public OtherPlayerEnterAudio(){
        let path = SssResMgr.getInstance().getOtherPlayerEnterAudio();
        if(!path)return;
        console.log(path);
        this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public OtherPlayerLeaveAudio(){
        let path = SssResMgr.getInstance().getOtherPlayerLeaveAudio();
        if(!path)return;
        console.log(path);
        this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playWinAudio(){
        let path = SssResMgr.getInstance().getWinAudio();
        if(!path)return;
        console.log(path);
        this.stopAudio();
        this.effectAudioId = cc.audioEngine.play(path, false, this.effectVolume);
    }

    public playLostAudio(){
        let path = SssResMgr.getInstance().getLostAudio();
        if(!path)return;
        console.log(path);
        this.stopAudio();
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
        SssResMgr.getInstance().setPathKind(type);
    }
}
 
 


 
 