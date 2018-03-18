import BaseCfg from "../Libs/BaseCfg";
 
 
export default class GameCateCfg extends BaseCfg{
  
	//单例处理 
	private gamecatePath=null;
	private games=null;
	constructor(){
		super();
		this.gamecatePath=this.getFullPath('gamecate');
	}
	
    private static _instance:GameCateCfg; 
    public static getInstance ():GameCateCfg{
        if(!this._instance){
            this._instance = new GameCateCfg();
        }
        return this._instance;
	} 
	loadCb(name,data){ 
		this.loaded=true; 
		this.games=[]; 
		for(let i = 0 ;i<data.length;++i)
		{ 
			if(data[i].exist==1)
			{
				this.games.push(data[i]);
			}
		} 
	}
	getGames(){
		return this.games;
	}
	getGameIndex(id)
	{
		for(let i=0;i<this.games.length;++i)
		{
			let item=this.games[i];
			if(item.id==id)
			{
				return i;
			}
		}
		return 0;	
	}
	getGameById(id)
	{
		for(let i=0;i<this.games.length;++i)
		{
			let item=this.games[i];
			if(item.id==id)
			{
				return item;
			}
		}
		return null;
	}
	load()
	{
		//先去判断有几个游戏要加载
		this.loadRes(this.gamecatePath,this.loadCb);
	}
}

