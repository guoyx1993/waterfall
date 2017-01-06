window.onload = function(){

    waterfall('waterfall','img');

    var source = {"data" : [{"src" : "0.jpg"},{"src" : "1.jpg"},{"src" : "2.jpg"},{"src" : "3.jpg"},{"src" : "4.jpg"}]}

    window.onscroll = loadAuto(); 
}

//自动加载
function loadAuto(){
        //无限加载，只要满足距离条件，都会for循环加载一次
        if(scrollTopOk('waterfall','img')){

            for(var i = 0;i<source.data.length;i++){
                var addImgO = document.createElement('div');
                addImgO.className = 'img';

                var imgOchild = document.createElement('div');

                var imgO = document.createElement('img');
                imgO.src = 'images/' + source.data[i].src;
                
                var parentO = document.getElementById('waterfall');

                parentO.appendChild(addImgO);
                addImgO.appendChild(imgOchild);
                imgOchild.appendChild(imgO);
                console.log(imgO.src);  

            }

        }
        waterfall('waterfall','img');
    }
//拖动滚动条，判断是否加载的条件
function scrollTopOk(parent,child){
    //滚动条拖动的距离
    var scrollTopH = document.body.scrollTop || document.documentElement.scrollTop;
    //当前页面的可视区域
    var clientH = document.body.clientHeight || document.documentElement.clientHeight;
    //最后一张图片顶部的距离，出现最后一张图片时，开始加载
    var boxO = document.getElementById(parent);
    var imgs = getCalssObject(boxO,child);
    var lastImgH = imgs[imgs.length-1].offsetTop;
    console.log(scrollTopH +','+ clientH +','+lastImgH);
    return lastImgH < scrollTopH + clientH? true:false;
}
//实现图片瀑布流排放
function waterfall(parent,child){
	var boxO = document.getElementById(parent);
	//var imgs = boxO.getElementsByClassName(child);
    var imgs = getCalssObject(boxO,child);
	var imgsH = [],
	    boxW = boxO.offsetWidth,
	    imgW = imgs[0].offsetWidth,
	    col =  parseInt(boxW/imgW);
	    for(var i = 0; i<imgs.length;i++){

	    	imgs[i].style.position = 'absolute';

            if(i < col){
                imgs[i].style.top =0;
	    		imgs[i].style.left = imgW*i + 'px';
                var H = imgs[i].offsetHeight;
                imgsH.push(H);
	    	}else{
                var minH = Math.min.apply(null,imgsH),
                    index;
                for(var j in imgsH){
                    if(imgsH[j] === minH){
                        index = j;
                    }
                };
                imgs[i].style.top = minH + 'px';
                imgs[i].style.left = index*imgW + 'px';
                imgsH[index] = imgsH[index] + imgs[i].offsetHeight;
                console.log(index+','+i)
                
	    	}
	    }
}
//找到父级下特指calss的元素
function getCalssObject(parent,childName){
    var allChild = parent.getElementsByTagName('*');
    var childO = [];//创建空数组，存放类名元素
    for(var i = 0;i < allChild.length;i++){
        if(allChild[i].className === childName){
            childO.push(allChild[i]);
        }
    };
    return childO;
}