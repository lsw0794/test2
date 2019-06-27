window.onload = function()
{
    //处理顶部的导航栏
    setNav();

    //处理banner
    setBanner();

    //处理轮播图上的逻辑
    setSlider();

    //处理回到顶部的逻辑
    gotoTop();
}

//处理顶部导航栏上的逻辑
function setNav()
{
    //获得顶部导航栏下的所有a标签
    var navAs = $("nav").getElementsByTagName("a");

    //遍历顶部导航栏下的a标签
    for(var i = 0; i < navAs.length; i++)
    {
        //为每个a标签添加一个鼠标点击事件
        navAs[i].onmousedown = function()
        {
            //清空所有的类
            clearClassName(navAs);

            //设置当前选中
            this.className = "current";
        }
    }
}

function setBanner()
{
    //获得slider下的li标签
    var sliderLis = $("slider").getElementsByTagName("li");
    var circle = $("circle");

    //轮播图中图片的下标
    var thatIndex = 0;
    var timer = null;

    //设置li的背景图片和样式
    for(var i = 0; i < sliderLis.length; i++)
    {
        sliderLis[i].style.background = "url(images/banner" + (i + 1) + ".jpg)";
        sliderLis[i].style.backgroundRepeat = "no-repeat";
        sliderLis[i].style.backgroundPosition = "top center";
        sliderLis[i].className = "hide";
    }

    //显示第一张轮播图
    sliderLis[0].className = "show";

    //创建轮播图上的小圆点
    var ol = document.createElement("ol");
    circle.appendChild(ol);
    for(var i = 0; i < sliderLis.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = i;
        ol.appendChild(li);
    }

    //获得所有的小圆点
    var arrayCircle = circle.getElementsByTagName("li");

    //选中第1个小圆点
    arrayCircle[0].className = "on";

    //遍历小圆点
    for(var i = 0; i < arrayCircle.length; i++)
    {
        arrayCircle[i].index = i;

        //给每个小圆点添加一个点击事件
        arrayCircle[i].onclick = function()
        {
            //只有当前用户点击的小圆点的下标与正在播放的轮播图的下标不同时，才播放当前与用户点击的小圆点对应的轮播图
            if(this.index != thatIndex)
            {
                //获得当前点击的小圆点的下标
                //并且将下标转换成轮播图中图片的下标
                thatIndex = parseInt(this.innerHTML);

                //选中小圆点
                clearClassName(arrayCircle);
                this.className = "on";

                //播放轮播图
                setArrayClass(sliderLis, "hide");
                sliderLis[thatIndex].className = "show";
                sliderLis[thatIndex].style.opacity = 0;
                animate(sliderLis[thatIndex], {opacity: 100}, 40);
            }
        }
    }

    //创建定时器,用于实现图片的自动轮播
    timer = setInterval(autoPlaySlider, 3000);

    //鼠标放在banner上
    $("banner").onmouseover = function()
    {
        //关闭定时器
        clearInterval(timer);
    }

    //鼠标离开banner
    $("banner").onmouseout = function()
    {
        clearInterval(timer);

        //创建定时器,用于实现图片的自动轮播
        timer = setInterval(autoPlaySlider, 3000);
    }

    //图片自动轮播
    function autoPlaySlider()
    {
        //如果播放完了最后一张
        //从第1张开始播放
        thatIndex = ++thatIndex > sliderLis.length - 1 ? 0 : thatIndex;

        //选中小圆点
        clearClassName(arrayCircle);
        arrayCircle[thatIndex].className = "on";

        //图片轮播
        setArrayClass(sliderLis, "hide");
        sliderLis[thatIndex].className = "show";
        sliderLis[thatIndex].style.opacity = 0;
        animate(sliderLis[thatIndex], {opacity : 100}, 60);
    }
}

//处理 轮播图上的逻辑
function setSlider()
{
    var w_slider = $("w_slider");

    //获得承载轮播图的盒子
    var slider_main = $("slider_main");

    //获得所有产品
    var arrayProduct = Util.getByClass("slider-main-product");

    //获得所有小圆点
    var arrayCircle = $("slider_ctrl").getElementsByTagName("li");

    //标记当前的索引
    var thatIndex = 0;

    //获得最大的盒子的宽度
    var scrollWidth = w_slider.offsetWidth;

    //获得需要轮播的轮播图
    var arraySlider = Util.getByClass("slider-main-img");

    //当前轮播图的索引
    var iNow = 0;

    //遍历产品
    for(var i = 0; i < arrayProduct.length; i++)
    {
        //当鼠标放在产品上
        arrayProduct[i].onmouseover = function()
        {
            var h5 = this.getElementsByTagName("h5")[0];
            var span = this.getElementsByTagName("span")[0];
            h5.style.color = "#fff";
            span.style.color = "#fff";
            span.style.background = "url(images/arrow_hover.png) no-repeat center right";
        }

        //当鼠标离开产品
        arrayProduct[i].onmouseout = function()
        {
            var h5 = this.getElementsByTagName("h5")[0];
            var span = this.getElementsByTagName("span")[0];
            h5.style.color = "#444866";
            span.style.color = "#38B774";
            span.style.background = "url(images/arrow.png) no-repeat center right";
        }
    }

    //将第1张到第4张轮播图移动到最右边
    for(var i = 1; i < arraySlider.length; i++)
    {
        arraySlider[i].style.left = scrollWidth + "px";
    }

    //遍历小圆点
    for(var i = 0; i < arrayCircle.length; i++)
    {
        //给小圆点添加一个点击事件
        arrayCircle[i].onclick = function()
        {
            //获得小圆点上的数字
            thatIndex = parseInt(this.innerHTML);

            //轮播图向左轮播
            if(thatIndex > iNow)
            {
                //将当前正在展示的图片慢慢的移到左侧
                animate(arraySlider[iNow], {left : -scrollWidth}, 30);

                //将当前需要展示的图片快速的移到到右侧
                arraySlider[thatIndex].style.left = scrollWidth + "px";
            }
            //轮播图向右播放
            else if(thatIndex < iNow)
            {
                //将当前正在展示的图片慢慢的移到右侧
                animate(arraySlider[iNow], {left : scrollWidth}, 30);

                //将当前需要展示的图片快速移到左侧
                arraySlider[thatIndex].style.left = -scrollWidth + "px";
            }

            iNow = thatIndex;

            //将当前需要展示的图片慢慢的移到舞台中央
            animate(arraySlider[thatIndex], {left : 0}, 30);

            //选中小圆点
            setCircle(arrayCircle, thatIndex);
        }
    }

    var timer = null;

    //创建定时器,用于自动播放轮播图
    timer = setInterval(autoPlay, 4000);

    //当鼠标放在轮播图上
    w_slider.onmouseover = function()
    {
        //清除定时器
        clearInterval(timer);
    }

    //当鼠标离开轮播图
    w_slider.onmouseout = function()
    {
        clearInterval(timer);

        //创建定时器,用于自动播放轮播图
        timer = setInterval(autoPlay, 4000);
    }

    //自动播放轮播图
    function autoPlay()
    {
        //当前的图片慢慢的移动到-scrollWidth的位置上
        animate(arraySlider[iNow], {left : -scrollWidth}, 30);

        //获得下一张图片的索引
        iNow = ++iNow > arraySlider.length - 1 ? 0 : iNow;

        //先将需要移动的图片放在舞台的右边
        arraySlider[iNow].style.left = scrollWidth + "px";

        //下一张图片走到舞台中央
        animate(arraySlider[iNow], {left : 0}, 30);

        //选中小圆点
        setCircle(arrayCircle, iNow);
    }
}

function gotoTop()
{
    var goTop = $("goTop");

    var leader = 0;
    var target = 0;
    var timer = null;

    //监听是否滑动了浏览器的滑块
    window.onscroll = function()
    {
        //如果滑动了浏览器的滑块,显示回到顶部按钮
        Util.scroll().top > 0 ? goTop.style.display = "block" : goTop.style.display = "none";

        //把卷进去的头部给起始位置
        leader = Util.scroll().top;
    }

    goTop.onclick = function()
    {
        target = 0;

        timer = setInterval(function()
        {
            leader = leader + (target - leader ) / 10;

            //去往页面的某个位置
            window.scrollTo(0,leader);

            if(leader == target)
            {
                clearInterval(timer);
            }
        }, 10);
    }
}

/**
 * 选中了小圆点
 * @param array 保存小圆点的数组
 * @param index 选中的小圆点的下标
 */
function setCircle(array, index)
{
    clearClassName(array);

    if(index == 3)
    {
        array[index].className = "last on";
    }
    else
    {
        array[index].className = "on";
        array[3].className = "last";
    }
}

//清除类名
function clearClassName(array)
{
    for(var i = 0; i < array.length; i++)
    {
        array[i].className = "";
    }
}

//设置类
function setArrayClass(array, className)
{
    for(var i = 0; i < array.length; i++)
    {
        array[i].className = className;
    }
}

function $(id)
{
    return document.getElementById(id);
}