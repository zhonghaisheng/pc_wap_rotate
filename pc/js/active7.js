define(function(require, exports) {
	//这里写自定义的方法和属性
	require('rotate');
	var tapEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
	//转盘抽奖
	var prize = function() {
		var rotate;
		$('.pan-box .neddle').bind(tapEvent,function(){
			rotate = new Rotate({
				_prize_index : 2,//设置中奖下标 1<=x>=5
				_bg_index : 1,//设置开始旋转下标 1<=x>=5
				quanNum : 7,//设置转几圈>=3
				prize_num : 5,//设置一圈奖品个数
				_shan : '.pan-box .shan',//扇形
				neddle:'.pan-box .neddle',//触发按钮
				result : function(prize_index){
					//设置回调函数,获得中奖下标
					alert(prize_index);
				}
			});
		})
	}

	//预加载图片，解决未加载图片闪现问题
	var load = function(){
		var imgRootUrl = $('.imgRootUrl').val(),
		arrImg = [imgRootUrl+'pan.png',imgRootUrl+'roles.png',imgRootUrl+'gift.png',imgRootUrl+'shan.png',imgRootUrl+'yuyue_btn.png'];
		for(var i=0,len = arrImg.length;i<len;i++){
			var img = new Image();
			img.src = arrImg[i];
		}
	}
	exports.init = function() {
		//这里调用自定义的方法和属性
		prize();//转盘抽奖
		load();//预加载图片，解决未加载图片闪现问题
	}
})
