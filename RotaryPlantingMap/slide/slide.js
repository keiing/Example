/**
 * param {*} areaDom 轮播图区域，是一个dom元素
 * param {*} options 轮播图配置
 */
function createBannerArea(areaDom, options) {
    //创建文本节点
    var iframes = document.createDocumentFragment();

    //1.创建一个区域，用于显示图片
    var imgArea = document.createElement("div");
    //2.创建一个区域，用于显示角标
    var numberArea = document.createElement("div");
    var curIndex = 0; //当前显示的是第几张轮播图
    initImgs();
    initNumbers();
    setStatus();
    /**
     * 初始化图片区域
     */
    function initImgs() {
        //使用过span.setAttribute()修改style后请使用下面两种方法修改内联style
        /*后续请使用这两种写法 array[index].style.color="red"
           array[index].style.setProperty('color','red')*/
        //overflow: hidden;
        imgArea.setAttribute("style", "width:100%;height:100%;display:flex;")
        for (let i = 0; i < options.length; i++) {
            var obj = options[i];
            var img = document.createElement('img');
            img.src = obj.imgUrl;
            img.setAttribute("style", `
            width:100%;
            height:100%;
            margin-left:0%;
            `)
            imgArea.appendChild(img);
        }
        console.log(imgArea.children);
        iframes.appendChild(imgArea)
    }

    /** 
     * 初始化角标区域
     */
    function initNumbers() {
        numberArea.setAttribute('style', "text-align:center;margin-top:-30px;");
        for (let i = 0; i < options.length; i++) {
            var sp = document.createElement('span');
            sp.setAttribute('style', `
            display:inline-block;
            width:12px;
            height:12px;
            background:lightgray;
            margin:0 7px;
            border-radius:50%;
            `);
            sp.setAttribute('data-i',i)
            numberArea.appendChild(sp);
        }
        iframes.appendChild(numberArea);
    }
    console.log(numberArea,'number')
    numberArea.addEventListener('click',function(event){
        console.log(event.target)
        console.log(this)
    },false)

    /**
     * 设置状态
     */
    function setStatus() {
        //1.设置圆圈的背景颜色
        for (let i = 0; i < options.length; i++) {
            if (i === curIndex) {
                //设置背景颜色为选中状态
                numberArea.children[i].style.setProperty('background', "#be926f")
            } else {
                // 设置背景颜色为普通状态
                numberArea.children[i].style.setProperty('background', "lightgray")
            }
        }

        //2.显示图片
        var targetMarginLeft = curIndex * -100;
        imgArea.children[0].style.setProperty('margin-left', `${targetMarginLeft}%`)
    }
    areaDom.appendChild(iframes);
}