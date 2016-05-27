function Rotate(options){
	_this = this;
	_this.timer = null;//第一圈计时器
	_this.timer2 = null;//中间几圈计时器
	_this.timer3 = null;//最后一圈计时器
	_this.timer4 = null;//跑到设定中奖位置计时器
	_this.index = 0;//计算转的次数
	_this.quan_num = 0;//记录转的圈数
	_this.init(options);
	_this.options._shan = $(''+_this.options._shan+'');
	_this.options._neddle = $(''+_this.options.neddle+'');
    if(!_this.options._neddle.hasClass('disabled')){
		_this.options._neddle.addClass('disabled');
		_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
		_this.timer = window.setInterval(function(){
			_this.index++;
			_this.options._bg_index++;
			_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
			if(_this.index == _this.options.prize_num){
				_this.quan_num++;
				if(_this.quan_num == 1){
					window.clearInterval(_this.timer);
					_this.timer = null;
					_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
					_this.options._bg_index = 1;
					 _this.rotate2();
				}
			}
		},200);
	}
}

Rotate.prototype = {
	init:function(options){
		this.options = {
			_prize_index : 5,//设置中奖下标 1<=x>=5
			_bg_index : 1,//设置开始旋转下标 1<=x>=5
			quanNum : 7,//设置转几圈>=3
			prize_num :5,//设置一圈奖品个数
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
	},
    rotate2 : function(){
    	var _this = this;
    	this.timer2 = window.setInterval(function(){
			_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
			_this.index++;
			_this.options._bg_index++;
			if(_this.options._bg_index > _this.options.prize_num){
				_this.options._bg_index = 1;
			}
			if(_this.index%_this.options.prize_num==0){
				_this.quan_num++;
				if(_this.quan_num == (_this.options.quanNum - 1)){
					_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
					_this.rotate3();
					window.clearInterval(_this.timer2);
					_this.timer2 = null;
				}
			}
		},100);
    },
    rotate3 : function(){
    	var _this = this;
    	this.timer3 = window.setInterval(function(){
			_this.index++;
			_this.options._bg_index++;
			if(_this.options._bg_index > _this.options.prize_num){
				_this.options._bg_index = 1;
			}
			if(_this.index == _this.options.prize_num*_this.options.quanNum){
				_this.quan_num++;
				if(_this.quan_num == _this.options.quanNum){
					window.clearInterval(_this.timer3);
					_this.timer3 = null;
					_this.index = 0;
					_this.quan_num = 0;
					_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
					_this.options._neddle.removeClass('disabled');
					_this.rotate4();
				}
			}
			_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
		},200);
    },
    rotate4 : function(){
    	if(this.options._prize_index >= 0){
	    	this.timer4 = window.setInterval(function(){
				_this.options._shan.removeClass().addClass('shan bg'+_this.options._bg_index+'');
	    		_this.index++;
				_this.options._bg_index++;
	    		if(_this.index >= _this.options._prize_index){
	    			window.clearInterval(_this.timer4);
	    			_this.timer4 = null;
	    			_this.index = 0;
	    			_this.options._bg_index = 1;
	    			_this.options.result(_this.options._prize_index);
	    		}
	    	},200)
    	}
    }
}