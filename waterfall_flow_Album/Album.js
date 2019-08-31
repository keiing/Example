/**
 * @param {Document} el 规定dom对象
 * @param {Array} imgUrl 图片路径数组
 * @param {Object} style 配置
 */
function Album(el,imgUrl,style){
    // (function(){})()
    if(el&&!el.nodeType){
        throw Error((!el?"arguments[0]":el)+' is not HTMLDOM');
    }else if(!el){
        throw Error("arguments[0] is not undefined")
    }
    if(typeof imgUrl!='object'){
        throw Error((!imgUrl?'arguments[1]':imgUrl)+' is not Object')
    }
    style=style||{};
    var config={
        
    }
    //容器
    var div=document.createElement('div');
    //舞台
    var divPreserve=document.createElement('div');
    //演员们
    var imgs;
    /**
     * @init  初始化 
     */
    function init(){
        var divArr=['divStyle'],
            divStyle={
            background:style[divArr[0]]||"#fff",
            width:style[divArr[0]]||'150px',
            height:style[divArr[0]]||'150px',
            perspective:style[divArr[0]]||'1200px',
            margin:style[divArr[0]]||"150px auto"
        }
        div.setAttribute('style','width:'+
                        divStyle.width+
                        ';height:'+
                        divStyle.height+
                        ';background:'+
                        divStyle.background+
                        ';margin:'+divStyle.margin+
                        ';perspective:'+divStyle.perspective);
            divPreserve.setAttribute('style',"height:100%;"+
        "position:relative;"+
        "transform-style:preserve-3d;"+
        "top:50%;")
        for(var i=0;i<imgUrl.length;i++){
            var image=new Image();
            image.src=imgUrl[i]['src'];
            image.setAttribute('style',"width:100%;height:100%;"+
            "position:absolute;"+
            "left:0;top:0;"+
            "box-shadow:0 0 8px 0 #eee;")
            divPreserve.appendChild(image);
        }
        div.appendChild(divPreserve);
    }
    /**
     * 
     * @param {*} dom 
     * @param {*} styleName 
     * @param {*} Value 
     */
    function setStyle(dom, styleName,Value){
        if(!dom||!styleName){return;}
        Value=Value||"";
        dom[styleName]=Value;
    }
    document.body.innerHTML="";
    document.body.appendChild(div);
    init();
}