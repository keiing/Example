/** 
 * @param {*} areaDom 容器
 * @param {*} urls 图片的url地址数组
 * @param {*} everyWidth 每张图片的宽度
*/
function watefall(areaDom,urls,everyWidth){
    //创建文本节点
    var div=document.createDocumentFragment();
    //1.创建dom对象
    createImageDoms();
    //2.设置每张图片坐标
    setImgPosition();
    //函数区
    /** 
     * 创建图片的dom对象
    */
   function createImageDoms(){
       for(let i=0;i<urls.length;i++){
           let url=urls[i];
           var img=document.createElement('img');
           img.src="http://127.0.0.1:3000/"+url.image;
           img.setAttribute('style',`width:${everyWidth}px;position:absolute;`)
           div.appendChild(img)
       }
       areaDom.appendChild(div)
   }
   /** 
    * 设置每张图片的坐标
   */
   function setImgPosition(){}
}