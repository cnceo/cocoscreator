
var MajiangType={}
MajiangType.emMJType_Wan    = 1; //万  
MajiangType.emMJType_Tiao   = 2; //条  
MajiangType.emMJType_Tong   = 3; //筒  
MajiangType.emMJType_Zi = 4; //字  
MajiangType.emMJType_Hua    = 5 ; //花  
   
 
var COB=function(  m,   n) {  
    return m << 4 | (n & 0x0F);  
}  
  
var  Majiang_Type=function(  m) {  
    return  m >> 4 ;  
}  
  
var  Majiang_Value=function(  m) {  
    return m & 0x0F;  
}  
  
var emMJ = {};
  
emMJ.emMJ_Joker = 0;     //变后的赖子  
emMJ.emMJ_1Wan = COB(MajiangType.emMJType_Wan, 1);  
emMJ.emMJ_2Wan = COB(MajiangType.emMJType_Wan, 2);  
emMJ.emMJ_3Wan = COB(MajiangType.emMJType_Wan, 3);  
emMJ.emMJ_4Wan = COB(MajiangType.emMJType_Wan, 4);  
emMJ.emMJ_5Wan = COB(MajiangType.emMJType_Wan, 5);  
emMJ.emMJ_6Wan = COB(MajiangType.emMJType_Wan, 6);  
emMJ.emMJ_7Wan = COB(MajiangType.emMJType_Wan, 7);  
emMJ.emMJ_8Wan = COB(MajiangType.emMJType_Wan, 8);  
emMJ.emMJ_9Wan = COB(MajiangType.emMJType_Wan, 9);  

emMJ.emMJ_1Tiao = COB(MajiangType.emMJType_Tiao, 1);  
emMJ.emMJ_2Tiao = COB(MajiangType.emMJType_Tiao, 2);  
emMJ.emMJ_3Tiao = COB(MajiangType.emMJType_Tiao, 3);  
emMJ.emMJ_4Tiao = COB(MajiangType.emMJType_Tiao, 4);  
emMJ.emMJ_5Tiao = COB(MajiangType.emMJType_Tiao, 5);  
emMJ.emMJ_6Tiao = COB(MajiangType.emMJType_Tiao, 6);  
emMJ.emMJ_7Tiao = COB(MajiangType.emMJType_Tiao, 7);  
emMJ.emMJ_8Tiao = COB(MajiangType.emMJType_Tiao, 8);  
emMJ.emMJ_9Tiao = COB(MajiangType.emMJType_Tiao, 9);  

emMJ.emMJ_1Tong = COB(MajiangType.emMJType_Tong, 1);  
emMJ.emMJ_2Tong = COB(MajiangType.emMJType_Tong, 2);  
emMJ.emMJ_3Tong = COB(MajiangType.emMJType_Tong, 3);  
emMJ.emMJ_4Tong = COB(MajiangType.emMJType_Tong, 4);  
emMJ.emMJ_5Tong = COB(MajiangType.emMJType_Tong, 5);  
emMJ.emMJ_6Tong = COB(MajiangType.emMJType_Tong, 6);  
emMJ.emMJ_7Tong = COB(MajiangType.emMJType_Tong, 7);  
emMJ.emMJ_8Tong = COB(MajiangType.emMJType_Tong, 8);  
emMJ.emMJ_9Tong = COB(MajiangType.emMJType_Tong, 9);  

emMJ.emMJ_DongFeng =     COB(MajiangType.emMJType_Zi, 1);//东 
emMJ.emMJ_NanFeng =      COB(MajiangType.emMJType_Zi, 3);//南  
emMJ.emMJ_XiFeng =       COB(MajiangType.emMJType_Zi, 5);//西  
emMJ.emMJ_BeiFeng =      COB(MajiangType.emMJType_Zi, 7);//北  

emMJ.emMJ_HongZhong =    COB(MajiangType.emMJType_Zi, 9);//中 
emMJ.emMJ_FaCai =        COB(MajiangType.emMJType_Zi, 11);//发 
emMJ.emMJ_BaiBan =       COB(MajiangType.emMJType_Zi, 13);//白  

//一副中花牌各只有一张  
emMJ.emMJ_Mei =  COB(MajiangType.emMJType_Hua, 1);//梅  
emMJ.emMJ_Lan =  COB(MajiangType.emMJType_Hua, 3);//兰  
emMJ.emMJ_Ju =   COB(MajiangType.emMJType_Hua, 5);//菊  
emMJ.emMJ_Zhu =  COB(MajiangType.emMJType_Hua, 7);//竹  
emMJ.emMJ_Chun =     COB(MajiangType.emMJType_Hua, 9);//春  
emMJ.emMJ_Xia =  COB(MajiangType.emMJType_Hua, 11);//夏  
emMJ.emMJ_Qiu =  COB(MajiangType.emMJType_Hua, 13);//秋  
emMJ.emMJ_Dong =     COB(MajiangType.emMJType_Hua,15)  //冬  
//op操作音频文件
var OpAudioPath={
    1:['man_hu0.mp3','man_hu1.mp3','man_hu2.mp3'],
    2:['man_angang0.mp3','man_angang1.mp3'],
    3:['man_gang.mp3'],
    4:['man_peng0.mp3','man_peng1.mp3','man_peng2.mp3','man_peng3.mp3','man_peng4.mp3','man_peng5.mp3'],
    5:['man_chi0.mp3','man_chi1.mp3','man_chi2.mp3','man_chi3.mp3','man_chi4.mp3'],
    7:['man_gang.mp3'],
    9:['man_zimo0.mp3','man_zimo1.mp3','man_zimo2.mp3'],
    11:['man_sanjindao.mp3'],
    12:['man_qiangganghu.mp3'],
    13:['man_youjin0.mp3','man_youjin1.mp3'],
    14:['man_shuangyou.mp3'],
    15:['man_sanyou0.mp3','man_sanyou1.mp3'],
    16:['man_hu0.mp3','man_hu1.mp3','man_hu2.mp3'],
    6:{
        17:['man1.mp3'],
        18:['man2.mp3'],
        19:['man3.mp3'],
        20:['man4_0.mp3','man4_1.mp3'],
        21:['man5.mp3'],
        22:['man6.mp3'],
        23:['man7.mp3'],
        24:['man8.mp3'],
        25:['man9.mp3'],
        
        //条
        33:['man21.mp3'],
        34:['man22.mp3'],
        35:['man23.mp3'],
        36:['man24.mp3'],
        37:['man25.mp3'],
        38:['man26.mp3'],
        39:['man27.mp3'],
        40:['man28.mp3'],
        41:['man29.mp3'], 

        //筒
        49:['man11_0.mp3','man11_1.mp3'],
        50:['man12.mp3'],
        51:['man13.mp3'],
        52:['man14.mp3'],
        53:['man15.mp3'],
        54:['man16.mp3'],
        55:['man17.mp3'],
        56:['man18_0.mp3','man18_1.mp3'],
        57:['man19.mp3'], 



        //其他
        65:['man31_0.mp3','man31_1.mp3'], 
        67:['man32_0.mp3','man32_1.mp3'],  
        69:['man33_0.mp3','man33_1.mp3'],  
        71:['man34_0.mp3','man34_1.mp3'],   
        73:['man35_0.mp3','man35_1.mp3'], 
        75:['man36_0.mp3','man36_1.mp3'],  
        77:['man37_1.mp3'], 
    }
}

//Process操作音频文件
var ProcessAudioPath={
    1:['man_zhuanbei.mp3'],
    2:['duijukaishi.mp3'],
    4:['man_buhua0.mp3','man_buhua1.mp3'],
    5:['man_kaijin.mp3']
}

var cardpngs={
    //万
    17:'1',
    18:'2',
    19:'3',
    20:'4',
    21:'5',
    22:'6',
    23:'7',
    24:'8',
    25:'9',
    
    //条
    33:'21',
    34:'22',
    35:'23',
    36:'24',
    37:'25',
    38:'26',
    39:'27',
    40:'28',
    41:'29', 

    //筒
    49:'11',
    50:'12',
    51:'13',
    52:'14',
    53:'15',
    54:'16',
    55:'17',
    56:'18',
    57:'19', 



    //其他
    65:'31',  
    67:'32',  
    69:'33',  
    71:'34',    
    73:'35',   
    75:'36',  
    77:'37',

    81:'38',  
    83:'39',  
    85:'41', 
    87:'42',


    89:'43', 
    91:'44', 
    93:'45', 
    95:'46',  	
    666:'angang',
}
 
var huanames={
    65:'东',  
    67:'南',  
    69:'西',  
    71:'北',    
    73:'中',   
    75:'发',  
    77:'白',

    81:'梅',  
    83:'兰',  
    85:'竹', 
    87:'菊',


    89:'春', 
    91:'夏', 
    93:'秋', 
    95:'东',  	
}
let huaIcons={
    89:0,
    91:1,
    93:2,
    95:3,
    81:4,  
    83:5,  
    85:6, 
    87:7,
} 
export default class SssResMgr{
    static cardpngs=cardpngs;
    static huanames=huanames; 
    static huaIcons=huaIcons;
    static OpAudioPath=OpAudioPath;
    static ProcessAudioPath = ProcessAudioPath
    private audioPath = 'res/raw-assets/resources/audio/Games/qzmj/Pth/man/';
    private voicePath = 'res/raw-assets/resources/audio/Games/qzmj/dialogue/';
    jin=null;  
   
    private static _instance:SssResMgr;

 
    constructor()
    {
        this.jin=null;  
    }  
   
    clear()
    {
   
    } 
    public static getInstance ():SssResMgr{
        if(!this._instance){
            this._instance = new SssResMgr();
        }
        return this._instance;
    } 
 
    setJin(jin)
    {
        this.jin=jin;
    } 
    getHuaIconTexture(value)
    {
        let index = SssResMgr.huaIcons[value];  
        var texture=cc.loader.getRes(cc.url.raw(`resources/Games/Sss/BuhuaStatus_${index}.png`));     
        return texture;
    }
    getCardTextureByValue(value)
    {
        if (value== 0 )
        {
            value=this.jin; 
        } 
        var cardName= SssResMgr.cardpngs[value];
        var texture=cc.loader.getRes(cc.url.raw(`resources/Games/Sss/MaJiang2d/${cardName}.png`)) 
        return texture;
    }

    get3DCardTextureByValue(value)
    {
        if (value== 0 )
        {
            value=this.jin;
        }
        var cardName= SssResMgr.cardpngs[value];
        var texture=cc.loader.getRes(cc.url.raw(`resources/Games/Sss/MaJiang3d/${cardName}.png`))
        return texture;
    }
    //吃碰杠声音
    public getAudioByName(name:string){
        var audioList= SssResMgr.OpAudioPath[name];
        if(!audioList){
            console.log(`#error name = ${name}`);
            return;
        }
        let number = Math.floor(Math.random()*audioList.length);
        let audioName = audioList[number];
        if(!audioName){
            console.log(`#error audioName = ${audioName}, name =${name}, number = ${number}`);
            return;
        }
        return `${this.audioPath}${audioName}`; 
    }
    //流程操作声音
    public getProcessAudioByName(name:string){
        var audioList= SssResMgr.ProcessAudioPath[name];
        if(!audioList){
            console.log(`#error name = ${name}`);
            return;
        }
        let number = Math.floor(Math.random()*audioList.length);
        let audioName = audioList[number];
        if(!audioName){
            console.log(`#error audioName = ${audioName}, name =${name}, number = ${number}`);
            return;
        }
        return `${this.audioPath}${audioName}`; 
    }
    //卡牌声音
    public getCardAudioByName(opName:string,cardName:string){
        var cardAudioList= SssResMgr.OpAudioPath[opName];
        if(!cardAudioList){
            console.log(`#error name = ${opName}`);
            return;
        }
        var audioList = cardAudioList[cardName];
        if(!audioList){
            console.log(`#error cardName = ${cardName}`);
            return;
        }
        let number = Math.floor(Math.random()*audioList.length);
        let audioName = audioList[number];
        if(!audioName){
            console.log(`#error audioName = ${audioName}, name =${name}, number = ${number}`);
            return;
        }
        return `${this.audioPath}${audioName}`;
    }
    public getVoiceAudioByName(voiceName:string){
        return `${this.voicePath}chat_${voiceName}.mp3`;
    }

    public getClockAudio(){
        return 'res/raw-assets/resources/audio/Games/qzmj/Clock.mp3';
    }

    public getDiceAudio(){
        return 'res/raw-assets/resources/audio/Games/qzmj/dice.mp3';
    }

    public getOtherPlayerEnterAudio(){
        return 'res/raw-assets/resources/audio/Games/qzmj/other_player_enter.mp3';
    }

    public getOtherPlayerLeaveAudio(){
        return 'res/raw-assets/resources/audio/Games/qzmj/other_player_leave.mp3';
    }

    public getWinAudio(){
        return 'res/raw-assets/resources/audio/Games/qzmj/Win.mp3';
    }

    public getLostAudio(){
        return 'res/raw-assets/resources/audio/Games/qzmj/Lost.mp3';
    }

    //0 本地 1普通话
    public setPathKind(type:number){
        if(type == 1)this.audioPath = 'res/raw-assets/resources/audio/Games/qzmj/PuTongHua/man/';
        else this.audioPath = 'res/raw-assets/resources/audio/Games/qzmj/Pth/man/';
    }
}

