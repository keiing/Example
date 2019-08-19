/** 
 * @param {*} areaDom 容器
 * @param {*} urls 图片的url地址数组
 * @param {*} everyWidth 每张图片的宽度
 */
function watefall(areaDom, urls, everyWidth) {
    /**
     * @param {*} iframe 创建文本节点 */
    var iframe = document.createDocumentFragment();
    /**
     * @param {*} div 图片父级div */
    var div = document.createElement('div');
    div.style.position = 'relative';
    var colNumber; //储存容器宽度
    var gap; //间隙大小
    var viewHeight; //可见区域的高度

    //1.创建dom对象
    createImageDoms();
    //2.设置每张图片坐标
    setImgPosition();
    //3.懒加载
    lazyload();
    //函数区

    //窗口改变事件
    var times = null;
    window.onresize = function () {
        if (times) {
            clearTimeout(times);
        }
        times = setTimeout(function () {
            setImgPosition();
            viewHeight = document.documentElement.clientHeight;
        }, 500)
    }
    document.addEventListener('scroll', function () {
        lazyload();
    })
    /**
     * 计算一些数学问题
     */
    function cal() {
        var containerWidth = parseInt(div.clientWidth);
        colNumber = Math.floor(containerWidth / everyWidth); //求出列数 容器总宽度/每张图片宽度
        var space = containerWidth - colNumber * everyWidth; //剩余空间 总宽度减去 图片宽度*列的数量
        gap = space / (colNumber + 1); //间隙
    }

    /**
     * 创建图片的dom对象
     */
    function createImageDoms() {
        viewHeight = document.documentElement.clientHeight;
        console.log(viewHeight)
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            var img = document.createElement('img');
            img.src = "../../lazyLoadingImage/lazyLoad.gif";
            img.setAttribute('style', `width:${everyWidth}px;position:absolute;`)
            img.setAttribute('data-original', "http://127.0.0.1:3000/" + url.image);
            img.onload = function () {
                setImgPosition();
                document.documentElement.scrllTop=0;
            }
            div.appendChild(img)
            iframe.appendChild(div);
        }
        areaDom.appendChild(iframe)
    }
    /**
     * 懒加载
     */
    function lazyload() {
        Array.prototype.forEach.call(div.children, function (item, index) {
            var rect;
            if (!item.dataset.original) return;

            rect = item.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top < viewHeight) {
                ! function () {
                    var img = new Image();
                    img.src = item.dataset.original
                    img.onload = function () {
                        item.src = img.src;
                    }
                    item.removeAttribute('data-original');
                    item.removeAttribute('lazyload')
                }()
            }
        })
    }
    /**
     * 设置每张图片的坐标
     */
    function setImgPosition() {
        cal();
        var colY = new Array(colNumber); //存放每一列的y坐标 /高度
        colY.fill(0); //将数组的每一项填充为0
        for (var i = 0; i < div.children.length; i++) {
            var img = div.children[i];
            var y = Math.min.apply(this, colY); //Y坐标
            var index = colY.indexOf(y); //利用数组中的Y 找出了是第几列 取出索引值
            var x = (index + 1) * gap + index * everyWidth;
            img.style.setProperty('left', x + "px");
            img.style.setProperty('top', y + 'px');

            colY[index] += parseInt(img.height) + gap;
        }
        //解决高度坍塌
        var height = Math.max.apply(this, colY);
        div.style.height = height + 'px';
    }
}