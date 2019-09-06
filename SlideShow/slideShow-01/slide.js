/**
 * 最后一张跳转第一张效果，并无无限播放
 * @param {*} areaDom 轮播图区域，是一个dom元素
 * @param {*} options 轮播图图片/跳转地址
 * @param {*} isDisplay 是否设置左右切换按钮
 * @param {*} dataTime 轮播时间
 * @param {*} liColor li颜色
 */
function createBannerArea(areaDom, options, isDisplay, dataTime, liColor) {
    dataTime = dataTime || {};
    liColor = liColor || {};
    //创建文本节点
    var iframes = document.createDocumentFragment();

    //1.创建一个区域，用于显示图片
    var imgArea = document.createElement("div");
    //2.创建一个区域，用于显示角标
    var numberArea = document.createElement("div");
    var curIndex = 0; //当前显示的是第几张轮播图
    var changeTimer = null; //定时器
    var setDateTime = dataTime['time'] || 3000; //设置切换时间
    var setDateSwitch = dataTime['switch'] || 30; //图片切换速度时间;
    var {
        liColored,
        licolor
    } = liColor; //li当前选中颜色
    liColored = liColored || "#220DAA"; //默认选中状态
    licolor = licolor || "#D3D3D3"; //默认未选中状态
    var timer = null; //动画计时器
    initImgs(); //1.初始化
    initNumbers(); //2.
    setStatus(); //3.状态切换
    autoChange(); //4.自动切换图片
    /**
     * 初始化图片区域
     */
    function initImgs() {
        imgArea.setAttribute("style", `width:100%;height:100%;display:flex;overflow:hidden;`);
        for (let i = 0; i < options.length; i++) {
            var obj = options[i];
            var img = document.createElement("img");
            img.src = obj.imgUrl;
            img.setAttribute("style",
                `min-width:100%;
        max-width:100%;
        height:100%;
        margin-left:0;
        cursor:pointer`);
            img.addEventListener('click', function () {
                location.href = options[i].link;
            }, false);
            imgArea.appendChild(img);
        }
        if (isDisplay) {
            var spanLeft = document.createElement('span');
            var spanRight = document.createElement('span');
            spanLeft.textContent="<";
            spanRight.textContent=">"
            spanLeft.setAttribute('style', `font-size:5rem;width:6%;height:30%;top:33%;position:absolute;background:transparent;`);
            spanRight.setAttribute('style', `font-size:5rem;width:6%;height:30%;top:33%;left:94%;position:absolute;background:transparent;`);
            spanLeft.addEventListener('click', function () {
                curIndex == 0 ? curIndex = options.length - 1 : curIndex--;
                clearInterval(changeTimer);
                setStatus();
                autoChange();
            }, false);
            spanRight.addEventListener('click', function () {
                curIndex == options.length - 1 ? (curIndex = 0) : curIndex++;
                clearInterval(changeTimer);
                setStatus();
                autoChange();
            }, false);
            iframes.appendChild(spanLeft);
            iframes.appendChild(spanRight);
        }
        iframes.appendChild(imgArea);
    }

    /**
     * 初始化角标区域
     */
    function initNumbers() {
        numberArea.setAttribute("style", "text-align:center;margin-top:-30px;");
        for (let i = 0; i < options.length; i++) {
            var sp = document.createElement("span");
            sp.setAttribute(
                "style",
                `display:inline-block;
                width:14px;
                height:14px;
                background:lightgray;
                margin:0 7px;
                border-radius:50%;`
            );
            sp.setAttribute("data-i", i);
            numberArea.appendChild(sp);
        }
        iframes.appendChild(numberArea);
    }
    /**
     * click 点击切换事件
     * mouseenter 鼠标移入图片暂停定时器事件
     * mouseleave 鼠标移出继续播放图片
     */
    numberArea.addEventListener(
        "click",
        function (event) {
            let i;
            if ((i = event.target.getAttribute("data-i"))) {
                curIndex = i;
                setStatus();
            }
        },
        false
    );
    imgArea.addEventListener(
        "mouseenter",
        function (event) {
            clearInterval(changeTimer);
            changeTimer = null;
        },
        false
    );
    imgArea.addEventListener(
        "mouseleave",
        function (event) {
            autoChange();
        },
        false
    );
    /**
     * 设置状态
     */
    function setStatus() {
        //1.设置圆圈的背景颜色
        for (let i = 0; i < options.length; i++) {
            if (i == curIndex) {
                //设置背景颜色为选中状态
                numberArea.children[i].style.setProperty("background", liColored);
            } else {
                // 设置背景颜色为普通状态
                numberArea.children[i].style.setProperty("background", licolor);
            }
        }

        //2.显示图片
        var start = parseInt(imgArea.children[0].style["margin-left"]);
        var targetMarginLeft = curIndex * -100;
        var dis = targetMarginLeft - start;
        var duration = 500;
        var speed = dis / duration;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function () {
            start += speed * 20;
            imgArea.children[0].style.setProperty("margin-left", `${start}%`);
            if (Math.abs(start - targetMarginLeft) < 1) {
                imgArea.children[0].style.setProperty("margin-left",`${targetMarginLeft}%`);
                clearInterval(timer);
            }
        }, setDateSwitch);
    }
    /**
     * 自动切换轮播图
     */
    function autoChange() {
        if (changeTimer) return;
        changeTimer = setInterval(() => {
            curIndex == options.length - 1 ? (curIndex = 0) : curIndex++;
            setStatus();
        }, setDateTime);
    }
    areaDom.appendChild(iframes);
}
