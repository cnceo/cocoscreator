 
export function g_deepClone(data){
    let str=JSON.stringify(data);
    let obj=JSON.parse(str)
    return obj;
} 
 
Array.prototype.removeByValue=function(value){
	var idx = this.findIdx(value);
	if (idx != -1) {
		this.splice(idx,1);
	}
}
Array.prototype.findIdx=function(value){
    for(var j = 0;j <this.length;j++){ 
        if (this[j] == value) {
            return j;
        }
    }
    return -1;
}
Array.prototype.remove=function(index){
        for(var j = index;j <this.length-1;j++){
                    this[j]=this[j+1];
                }
        this.length = this.length-1;
}
Array.prototype.erase=function(from,to){
        if(!to)
                to=from+1
        var count=to-from
        for(var j = from;j <to;j++){
                    this.remove(from)
                }
        return this;
}
Array.prototype.front=function(from,to){
        return this[0]
}
Array.prototype.back=function(from,to){
        return this[this.length-1]
}
Array.prototype.insert = function (index, item) {
      this.splice(index, 0, item);
};
Array.prototype.empty=function(){
        return this.length==0;
}

Array.prototype.size=function(){
        return this.length;
}

Array.prototype.begin=function(){
        return 0;
}
Array.prototype.cbegin=function(){
        return 0;
}
Array.prototype.end=function(){
        return this.length;
}
Array.prototype.cend=function(){
        return this.length;
}
