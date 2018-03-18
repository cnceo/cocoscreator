//
 
export default class ServerMgr{ 
    //单例处理 

    settingPath='Configs/AppStart/localsetting';
    localsetting=null;
    callback=null;
    servercfg=null;
    private static _instance:ServerMgr;
    public static getInstance ():ServerMgr{
        if(!this._instance){
            this._instance = new ServerMgr();
        }
        return this._instance;
    }  
    loadLoacalSetting(callback)
    {
        this.callback=callback;
		this.loadRes(this.settingPath,this.loadSettingCb);
    }
    loadRes(name,cb)
    {
        cc.loader.loadRes(name, function (err, data) {
            if(err)
            {
                console.log(`cc.loader.loadRes err=,${JSON.stringify(err)},${name}`)
            }
            else
            {
                cb.bind(this)(name,data)
            }
        }.bind(this));
    } 
    loadSettingCb(name,data)
    {
        this.localsetting=data; 
		var xhr = cc.loader.getXMLHttpRequest();    
		xhr.onreadystatechange = function () {  
			cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);  
			if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {  
                var respone = xhr.responseText;  
                this.servercfg = JSON.parse(respone)
                this.callback();
			}  
		}.bind(this);   
		//xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");   
		// note: In Internet Explorer, the timeout property may be set only after calling the open()  
		// method and before calling the send() method.  
		xhr.timeout = 5000; 
		xhr.onerror = (error)=> {
            console.log("客户端出错啦")
        } 
        let URLProducttag = this.analysisURLParameter(window.location.href).args.producttag;
		var wholeurl=`${data.cfgurl}?producttag=${URLProducttag?URLProducttag:data.producttag}`
		console.log("wholeurl=",wholeurl)
		xhr.open("GET", wholeurl,true); 
		xhr.send(); 
    }
    // 解析URL是否带调试参数
    analysisURLParameter(URL) {
        let arr = URL.split("?")
        let obj = {
            url: null,
            args: {}
        };
        obj.url = arr[0];
        // 拆分后如果长度小于2说明URL是不带参数的
        if (arr.length < 2) return obj;
        let mapArr = arr[1].split("&");
        for (let i=0; i<mapArr.length; i++) {
            let parameter = mapArr[i].split("=");
            obj.args[parameter[0]] = parameter[1];
        }
        console.log("解析URL", obj)
        return obj
    }
    getServerCfg(){
        return this.servercfg;
    }
    getGameRuleUrl(name,ruletype){ 
        console.log("gameruleUrl",`${this.servercfg.hotUrl}/gamerule/${name}/${ruletype}.html`)
        return `${this.servercfg.hotUrl}/gamerule/${name}/${ruletype}.html`
    }
}
