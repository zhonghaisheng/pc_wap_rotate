function Rotate(options){
	_this = this;
	_this.timer = null;//第一圈计时器
	_this.timer2 = null;//中间几圈计时器
	_this.timer3 = null;//最后一圈计时器
	_this.timer4 = null;//跑到设定中奖位置计时器
	_this.index = 0;//计算转的次数
	_this.quan_num = 0;//记录转的圈数
	_this.init(options);
	var _box = $(''+_this.options._box+''),
	_shan = $(''+_this.options._shan+''),
	_neddle = $(''+_this.options.neddle+'');
	if(!_neddle.hasClass('disabled')){
		_neddle.addClass('disabled');
		_shan.removeClass().addClass('shan scroll1');
		var timer = window.setTimeout(function(){
			_shan.removeClass().addClass('shan scroll2');
			window.clearTimeout(timer);
			var timer2 = window.setTimeout(function(){
				_shan.removeClass().addClass('shan scroll1_2');
				window.clearTimeout(timer2);
				var timer3 = window.setTimeout(function(){
					_shan.removeClass().addClass('shan scroll3_'+_this.options._prize_index+'');
					window.clearTimeout(timer3);
					var time = 0,_prize_index = _this.options._prize_index;
					if(_prize_index == 1){
						time = 0;
					}else if(_prize_index == 2){
						time = 300;
					}else if(_prize_index == 3){
						time = 600;
					}else if(_prize_index == 4){
						time = 900;
					}else if(_prize_index == 5){
						time = 1200;
					}
					var timer4 = window.setTimeout(function(){
						window.clearTimeout(timer4);
						var timer5 = window.setTimeout(function(){
							_this.options.result(_this.options._prize_index);
							_neddle.removeClass('disabled');
							window.clearTimeout(timer5);
						},800)
					},time)
				},1500)
			},3750)
		},1500)
	}
}

Rotate.prototype = {
	init:function(options){
		this.options = {
			_prize_index : 5,//设置中奖下标 1<=x>=5
			_bg_index : 1,//设置开始旋转下标 1<=x>=5
			quanNum : 7,//设置转几圈>=3
			prize_num :5,//设置一圈奖品个数
			_box : '.pan-box',//转盘盒子
			_shan : '.pan-box .shan',//扇形
			neddle:'.pan-box .neddle',//触发按钮
			result:function(prize_index){

			}
		}
		this.extend(this.options, options || {});
	},
	//处理参数
	extend : function(opts, opt) {
		for (var key in opt) {
			opts[key] = opt[key];
		}
		return opts;
	}
}