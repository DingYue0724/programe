$(function () {
	/* 瀑布流 */
	var $lis = $('.pinterest li');
	var $len = $lis.size();
	var b = true;
	
	getList();

	function getList() {
		/* ajax 加载瀑布流，请求本地 json 文件 */
		$.ajax({
			type: 'GET',
			url: 'data3.json',
			dataType: 'json',
			success: function (data) {
				if (!data.data.length) {
					 /*后续没有数据*/ 
					return;
				}
				var $str = '';
				for (var i = 0; i < data.data.length; i++) {
					/* 获取最小高度的 li 的索引 */
					var _index = getShort();

					/* 往 li 内动态添加数据 */
					$str = $('<div style="margin-bottom: 5px"><img src="' + data.data[i].path + '" alt="" /><p>' + data.data[i].text + '</p></div>');
					$('.pinterest li').eq(_index).append($str);
				}
			},
			error: function () {
				console.log('error');
			}
		});
	}

	/*判断最短的 li 是否进入可视区
	如果 li 自身的高+其 top 值 < 浏览器可视区的高+滚动的距离，则表示 li 进入了可视区*/
	/*$(window).scroll = function () {
		var _index = getShort();
		var $oli = $lis[_index];

		if (getTop($oli)+$oli.offsetHeight < $(window).height() + $(window).scrollTop()) {
				alert(111);
				$('.pinterest li').eq(_index).children('div').children('img').attr('src', $('.pinterest li').eq(_index).children('div').children('img').attr('_src'));
			}
	}*/

	/*获取元素到页面顶端的绝对值*/
	function getTop(obj) {
		var iTop = 0;
		while (obj) {
			iTop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return iTop;
	}
	/*找到高度最小的 li*/
	function getShort() {
		var index = 0;
		/*已经显示的当前的 li 的高度*/
		var height = $lis[index].offsetHeight;
		for (var i = 1; i < $len; i++) {
			if ($lis[i].offsetHeight < height) {
				index = i;	/*最终能得到最小高度的 li 的索引值*/
				height = $lis[i].offsetHeight;	
			}
		}
		return index;
	}
});