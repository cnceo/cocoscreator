 
export default class BaseView{
    model=null;
    protected ui={}
    node:cc.Node=null;
    private _grayLayer:cc.Node = null
    private _smallGrayLayer:cc.Node = null
    constructor(model)
    {
        this.model=model; 
    }
    initUi()
    {
        
    }
    addPrefabNode(prefab)
    {       
        let prefabNode = cc.instantiate(prefab);
        this.node.addChild(prefabNode);
    }

    public addGrayLayer (){
        cc.loader.loadRes('Icons/singleColor', cc.SpriteFrame, (err, spriteFrame:cc.SpriteFrame)=>{
            if(err){
                cc.error(err);
            }else{
                let _grayLayer = new cc.Node();
                _grayLayer.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                _grayLayer.parent = this.node;
                
                let _size = cc.director.getWinSize();
                _grayLayer.width = _size.width;
                _grayLayer.height = _size.height;
                _grayLayer.color = cc.Color.BLACK;
                _grayLayer.opacity = 120;
                _grayLayer.zIndex = -1;
                _grayLayer.on(cc.Node.EventType.TOUCH_START, ()=>{
                    console.log('touch limit')
                }, this);
            }
        })
    }
    public addSmallGrayLayer (node,removeNode,array){
        cc.loader.loadRes('Icons/singleColor', cc.SpriteFrame, (err, spriteFrame:cc.SpriteFrame)=>{
            if(err){
                cc.error(err);
            }else{
                this.removeSmallGrayLayer();
                this._smallGrayLayer = new cc.Node();
                this._smallGrayLayer.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                this._smallGrayLayer.parent = node;
                
                let _size = cc.director.getWinSize();
                this._smallGrayLayer.width = _size.width;
                this._smallGrayLayer.height = _size.height;
                this._smallGrayLayer.color = cc.Color.BLACK;
                this._smallGrayLayer.opacity = 0;
                this._smallGrayLayer.zIndex = 2;
                this._smallGrayLayer.on(cc.Node.EventType.TOUCH_START, ()=>{
                    console.log('touch smalllimit');
                    this.removeSmallGrayLayer();
                    removeNode.removeFromParent();
                    array.shift();
                }, this);
            }
        })
    }
    public removeSmallGrayLayer(){
        if(this._smallGrayLayer){
            this._smallGrayLayer.destroy();
        }
    }
}