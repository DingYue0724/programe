$(function () {
	/* 记录导航栏的轮播图的背景颜色 */
	var arrColor = ['#115b44', '#fc2843', '#ff6819', '#ffb731', '#dd362e', '#ff989e'];

	var timer = null;		// 设置导航栏定时器
	var timerList = null;	// 设置导航栏列表的定时器
	var timer1 = null;		// 设置导航栏轮播图下标定时器
	var timer2 = null;		// 设置导航栏轮播图图片定时器
	var timer3 = null;		// 设置3d图旋转的定时器
	var timer4 = null;		// 设置快抢发新日轮播图的定时器
	var timer5 = null;		// 设置精选专题的轮播图的定时器
	var tM = null;			// 固定导航栏的下拉菜单
	var tF = null;
	var count = null;		// 定义定时器
	var num = 0;			// 顶部导航栏轮播图的下标计数
	let mm = 0;				// 精选专题的轮播图的下标计数

	/* 快抢发新日 */
	var new_list_num = 0;	// 图片
	var $new_cont_list = $(".new-cont > div:last-child > div.new-cont-list");
	var $new_cont_div_last_scroll = $(".new-cont > div:last-child > div.new-cont-list > div.new-cont-scroll");
	
	/* 导航栏轮播图处理 */
	var $ulis = $('.slide-img>ul>li');
	
	/* 商品倒计时 */
	var actime = [];
	actime = $('.countdown>p').html().split(':');	// 获取设定的时间
	var allTime = Number(actime[0]) * 3600 + Number(actime[1]) * 60 + Number(actime[2]);	// 计算倒计时的总时间 (s)

	/* 红人穿搭图片的3d旋转 */
	var rotateNum = 0;		// 3d旋转图片的计数变量
	var f = true;			// 定义3d图片旋转循环一遍完成的标志位
	var $imgsLis = $('.special > .main-list > .img-ad-list > .imgs > ul > li.l-imgs');
	
	/* 品牌特卖及以下的图片处理 */
	let $imgAnimt = $('.special>.img-animt>div:nth-child(2)');
	let $imgsAnimt = $('.special>.img-animt>.imgs-animt');

	/* 浏览器的窗口的高度 */
	var Height = $(window).height();

	/* 精品推荐轮播图 */
	var list_num = 0;		// 图片
	var list_up_num = 0;	// 下标
	var $list_f_cont = $('.careful > .list-f > .list-f-cont');
	var $list_f_scroll = $('.careful> .list-f > .list-f-cont  > div.list-f-scroll');
	var $upList_li = $('.list-title > .upList > li');
	var $list_f_span_all = $('.careful > .list-f > span.all');

	/* 导航栏列表 */
	var $market_ul_li = $('.market>ul>li');
	var $market_ol_li = $('.market>ol>li');

	/* 固定导航栏 */
	var $fixed_nav_ul = $('.fixed-nav>ul');
	var $fixed_nav_ol = $('.fixed-nav>ol');

	/* --------------------------------------------------------------------------------- */
	
	/* 导航栏 */
	$('.navTop>ul>li:eq(2), .shop-cart').mouseenter(function (ev) {
		clearTimeout(timer);
		$('.shop-cart').stop().show().siblings('div').stop().hide();

	}).mouseleave(function () {
		timer = setTimeout(function () {
			$('.shop-cart').stop().hide();
		}, 200);
	});
	$('.navTop>ul>li:eq(3), .custom-serv').mouseenter(function (ev) {
		clearTimeout(timer);
		$('.custom-serv').stop().show().siblings('div').stop().hide();

	}).mouseleave(function () {
		timer = setTimeout(function () {
			$('.custom-serv').stop().hide();
		}, 200);
	});
	$('.navTop>ul>li:eq(4), .myshop').mouseenter(function (ev) {
		clearTimeout(timer);
		$('.myshop').stop().show().siblings('div').stop().hide();

	}).mouseleave(function () {
		timer = setTimeout(function () {
			$('.myshop').stop().hide();
		}, 200);
	});

	/* 搜索栏 */
	$('.select-box>span, .select-box>ol').hover(function () {
		$('.select-box>ol').stop().slideDown();
	}, function () {
		$('.select-box>ol').stop().slideUp();
	});
	$('.select-box>ol>li').click(function () {
		$('.select-box>span').html('搜' + $(this).children().html());
	});

	/* 导航栏列表 */
	for (let i = 0; i < $market_ul_li.length; i++) {
		$market_ul_li.eq(i).hover(function () {
			clearInterval(timerList);
			$market_ol_li.eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			timerList = setInterval(function () {
				$market_ol_li.eq(i).css('display', 'none');
			}, 200);
		});
		$market_ol_li.eq(i).hover(function () {
			clearInterval(timerList);
			$(this).eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			timerList = setInterval(function () {
				$market_ol_li.eq(i).css('display', 'none');
			}, 200);
		});
	}

	/* 轮播图 */
	/* 轮播图下标 */
	for (var i = 0; i < $('.slide-img>ul>li').length; i++) {
		var $olis = $('<li></li>');
		$('.slide-img>ol').append($olis);
	}
	$('.slide-img>ol>li').eq(0).attr("class", "active");

	$('.slide-cont').css('background', arrColor[num]);
	function navImgscroll () {
		if (num > $ulis.length - 1) {
			num = 0;
		}
		
		$('.slide-img>ol').css('zIndex', '200');
		$ulis.eq(num).animate({ "opacity": 1 }, 2000, "linear").siblings().animate({ "opacity": 0 });
		$('.slide-img>ol>li').eq(num).attr("class", "active").siblings().attr('class', '');
		$('.slide-cont').css('background', arrColor[num]);
		$ulis.eq(num).css('zIndex', '100').siblings().css('zIndex', '90');
		num++;
	}
	
	/* 悬停下标显示图片 */
	for (let i = 0; i < $('.slide-img>ol>li').length; i++) {
		$('.slide-img>ol>li').eq(i).hover(function () {
			clearInterval(timer1);
			$(this).attr('class', 'active').siblings().attr('class', '');
			$('.slide-img>ul>li').eq(i).animate({ "opacity": 1 }, 1000, "linear").siblings().animate({ "opacity": 0 });
			$('.slide-cont').css('background', arrColor[i]);
		}, function () {
			num = i;
		});
	}
	for (var j = 0; j < $('.slide-img>ol>li').length; j++) {
		/* 悬停暂停图片 */
		$('.slide-img>ul>li').eq(j).hover(function () {
			clearInterval(timer1);
		}, function () {
			timer1 = setInterval(navImgscroll, 2000);
		});
	}
	timer1 = setInterval(navImgscroll, 2000);

	/* 右侧导航 */
	for (let i = 0; i < $('.r-sidebar>ol>li').length - 1; i++) {
		$('.r-sidebar>ol>li').eq(i).hover(function () {
			$(this).css('background', '#ef2f23').prev('li').children('a').css('border-bottom', '1px solid #202020');
			$(this).children('a').css('border-bottom-color', '#ef2f23');
		}, function () {
			$(this).css('background', '').prev('li').children('a').css('border-bottom', '1px solid #fff');
			$(this).children('a').css('border-bottom-color', '#fff');
		});
	}

	/* 限时疯抢 */
	$('.prcMain').hover(function () {
		$(this).children('img').stop().animate({ "right": '70px' }, 200, 'linear');
	}, function () {
		$(this).children('img').stop().animate({ "right": '65px' }, 200, 'linear');
	});
	$('.prcOther>div').hover(function () {
		$(this).children('img').stop().animate({ "right": '25px' }, 200, 'linear');
	}, function () {
		$(this).children('img').stop().animate({ "right": '20px' }, 200, 'linear');
	});

	// 搜索框的api http://list.mogujie.com/s?q=围巾&ptp=1.eW5XD.0.0.LNAf6jV

	/* 品牌特卖及以下的图片处理 */
	$('.special>.img-animt>div:nth-child(2)>.ad-txt, .special>.img-animt>div:nth-child(2)>a').hover(function () {
		$(this).parent().children('a').children('img').stop().animate({ 'top': '-5px' }, 200, 'linear');
	}, function () {
		$(this).parent().children('a').children('img').stop().animate({ 'top': 0 }, 200, 'linear');
	});
	$imgsAnimt.children('.ad-square').hover(function () {
		$(this).children('a').children('img').stop().animate({ 'top': '-5px' }, 200, 'linear');
	}, function () {
		$(this).children('a').children('img').stop().animate({ 'top': 0 }, 200, 'linear');
	});

	/* 固定导航栏 & 回到顶部 */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('.r-sidebar>ol>li:last-child').css('display', 'block');
		} else {
			$('.r-sidebar>ol>li:last-child').css('display', 'none');
		}
		if ($(this).scrollTop() > Height) {
			$('.fixed-nav').css('display', 'block');
		} else {
			$('.fixed-nav').css('display', 'none');
		}
		leader = $(this).scrollTop();
	});

	/* 固定导航栏的下拉菜单 */
	$('.fixed-nav>.nav-t1').hover(function () {
		$fixed_nav_ul.css('display', 'block');
		$fixed_nav_ol.css('display', 'block');
	}, function () {
		tM = setTimeout(function () {
			$fixed_nav_ul.css('display', 'none');
			$fixed_nav_ol.css('display', 'none');
		}, 200);
	});
	for (let i = 0; i < $('.fixed-nav>ul>li').length; i++) {
		$fixed_nav_ul.children('li').eq(i).hover(function () {
			clearInterval(tF);
			clearInterval(tM);
			$fixed_nav_ul.css('display', 'block');
			$fixed_nav_ol.children('li').eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			clearInterval(tM);
			tF = setTimeout(function () {
				$fixed_nav_ol.children('li').eq(i).css('display', 'none');
				$fixed_nav_ul.css('display', 'none');
			}, 200);
		});
		$fixed_nav_ol.children('li').eq(i).hover(function () {
			clearInterval(tF);
			clearInterval(tM);
			$(this).eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			clearInterval(tM);
			tF = setTimeout(function () {
				$fixed_nav_ol.css('display', 'none');
				$fixed_nav_ul.css('display', 'none');
			}, 200);
		});
	}
	/* 回到顶部 */
	$('.r-sidebar>ol>li:last-child').click(function () {
		$(window).scrollTop(0);
	});

	/* 商品倒计时 */
	function countDown() {
		count = setInterval(function () {
			allTime--;
			if (allTime == 0) {
				$('.countdown>p').html('活动已结束');
			} else {
				// 小时
				var h = Math.floor(allTime / 3600);
				// 分
				var m = Math.floor(allTime % 3600 / 60);
				// 秒
				var s = Math.floor(allTime % 60);

				// 判断
				h = h >= 10 ? h : ('0' + h);
				m = m >= 10 ? m : ('0' + m);
				s = s >= 10 ? s : ('0' + s);

				$('.countdown>p').html('' + h + ':' + m + ':' + s + '');
			}
		}, 1000);
	}
	countDown();

	/* 红人穿搭图片的3d旋转 */
	timer3 = setInterval(function () {
		if (rotateNum == $imgsLis.length) {
			rotateNum = 0;
			f = !f;
		}
		if (f) {
			$imgsLis.eq(rotateNum).children('div.inside-img').css({
				'WebkitTransform': 'rotateY(180deg)',
			});
		} else {
			$imgsLis.eq(rotateNum).children('div.inside-img').css({
				'WebkitTransform': 'rotateY(0)',
			});
		}
		rotateNum++;
	}, 5000);

	/* 快抢发新日 -- 轮播图部分 */
	$new_cont_div_last_scroll.eq(0).clone(true).appendTo($new_cont_list);
	function scroll() {
		new_list_num++;		// 图片
		if (new_list_num > $new_cont_div_last_scroll.length) {
			new_list_num = 1;
			$new_cont_list.css('left', '0');
		}
		$new_cont_list.stop().animate({ 'left': -new_list_num * 1000 }, 800, 'linear');
	}
	timer4 = setInterval(scroll, 3000);
	// 鼠标移入移出
	$('.new-cont > div:last-child > span, .new-cont > div:last-child > div.new-cont-list').hover(function () {
		clearInterval(timer4);
		$new_cont_list.siblings('span').show();
	}, function () {
		timer4 = setInterval(scroll, 3000);
		$new_cont_list.siblings('span').hide();
	});
	// 左右点击滑动
	$(".new-cont > div:last-child > span.lf").click(function () {
		new_list_num--;
		if (new_list_num < 0) {
			new_list_num = $new_cont_div_last_scroll.length - 1;
			$new_cont_list.css('left', -$new_cont_div_last_scroll.length * 1000 + 'px');
		}
		$new_cont_list.stop().animate({ 'left': -new_list_num * 1000 }, 800, 'linear');
	});
	$(".new-cont > div:last-child > span.rght").click(function () {
		scroll();
	});

	/* 精选专题 轮播图 */
	$list_f_scroll.eq(0).clone(true).appendTo($list_f_cont);
	function scroll2() {
		list_num++;		// 图片
		list_up_num++;	// 下标
		if (list_num > $list_f_scroll.length) {
			list_num = 1;
			$list_f_cont.css('left', '0');
		}
		$list_f_cont.stop().animate({ 'left': -list_num * 950 }, 800, 'linear');

		if (list_up_num > $upList_li.length - 1) {
			list_up_num = 0;
		}
		$upList_li.eq(list_up_num).attr('class', 'focusCurrent').siblings().attr('class', '');
	}
	timer5 = setInterval(scroll2, 4000);

	// 鼠标移入移出
	$(".careful > .list-f > .list-f-cont > div.list-f-scroll, .careful > .list-f > span.all").hover(function () {
		clearInterval(timer5);
		$list_f_span_all.stop().show();
	}, function () {
		timer5 = setInterval(scroll2, 4000);
		$list_f_span_all.stop().hide();
	});

	for (let i = 0; i < $upList_li.length; i++) {
		$upList_li.eq(i).hover(function () {
			clearInterval(timer5);
			$(this).attr('class', 'focusCurrent').siblings().attr('class', '');
			$list_f_cont.stop().animate({ 'left': -i * 950 }, 1000, 'linear');
		}, function () {
			list_num = i;
			list_up_num = i;
		});
	}
	$upList_li.mouseleave(function () {
		timer5 = setInterval(scroll2, 4000);
	});

	$('.careful > .list-f > span.r').click(function () {
		scroll2();
	});
	$('.careful > .list-f > span.l').click(function () {
		list_num--;
		list_up_num--;
		if (list_num < 0) {
			list_num = $list_f_scroll.length - 1;
			$list_f_cont.css('left', -$list_f_scroll.length * 950 + 'px');
		}
		if (list_up_num < 0) {
			list_up_num = $upList_li.length - 1;
		}
		console.log(list_num);
		console.log(list_up_num);
		$list_f_cont.stop().animate({ 'left': -list_num * 950 }, 800, 'linear');
		$upList_li.eq(list_up_num).attr('class', 'focusCurrent').siblings().attr('class', '');
	});
});