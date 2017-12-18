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
	
	/* 商品倒计时 */
	var actime = [];		
	actime = $('.countdown>p').html().split(':');	// 获取设定的时间
	var allTime = Number(actime[0]) * 3600 + Number(actime[1]) * 60 + Number(actime[2]);	// 计算倒计时的总时间 (s)
	
	/* 红人穿搭图片的3d旋转 */
	var rotateNum = 0;		// 3d旋转图片的计数变量
	var f = true;			// 定义3d图片旋转循环一遍完成的标志位
	var $imgsLis = $('.special > .main-list > .img-ad-list > .imgs > ul > li.l-imgs');

	
	/* 导航栏轮播图处理 */
	var $ulis = $('.slide-img>ul>li');

	/* 品牌特卖及以下的图片处理 */
	let $imgAnimt = $('.special>.img-animt>div:nth-child(2)');
	let $imgsAnimt = $('.special>.img-animt>.imgs-animt');

	/* 浏览器的窗口的高度 */
	var Height = $(window).height();	
	
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
	for (let i = 0; i < $('.market>ul>li').length; i++) {
		$('.market>ul>li').eq(i).hover(function () {
			clearInterval(timerList);
			$('.market>ol>li').eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			timerList = setInterval(function () {
				$('.market>ol>li').eq(i).css('display', 'none');
			}, 200);
		});
		$('.market>ol>li').eq(i).hover(function () {
			clearInterval(timerList);
			$(this).eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			timerList = setInterval(function () {
				$('.market>ol>li').eq(i).css('display', 'none');
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
	timer1 = setInterval(function () {
		if (num > $ulis.length - 1) {
			num = 0;
		}
		num++;
		// console.log('定时器计时显示图片：' + num);
		$('.slide-img>ol').css('zIndex', '200');
		$ulis.eq(num).animate({ "opacity": 1 }, 2000, "linear").siblings().animate({ "opacity": 0 });
		$('.slide-img>ol>li').eq(num).attr("class", "active").siblings().attr('class', '');
		$('.slide-cont').css('background', arrColor[num]);
		$ulis.eq(num).css('zIndex', '100').siblings().css('zIndex', '90');
	}, 5000);
	/* 悬停下标显示图片 */
	for (let i = 0; i < $('.slide-img>ol>li').length; i++) {
		$('.slide-img>ol>li').eq(i).hover(function () {
			// console.log('图片下标：' + i);
			clearInterval(timer1);
			clearInterval(timer2);
			$(this).attr('class', 'active').siblings().attr('class', '');
			$('.slide-img>ul>li').eq(i).animate({ "opacity": 1 }, 1000, "linear").siblings().animate({ "opacity": 0 });
			$('.slide-cont').css('background', arrColor[i]);
		}, function () {
			timer2 = setInterval(function () {
				if (i > $ulis.length - 1) {
					i = 0;
				}
				i++;
				// console.log('鼠标离开下标：' + i);
				$('.slide-img>ol').css('zIndex', '200');
				$ulis.eq(i).animate({ "opacity": 1 }, 2000, "linear").siblings().animate({ "opacity": 0 });
				$('.slide-img>ol>li').eq(i).attr("class", "active").siblings().attr('class', '');
				$('.slide-cont').css('background', arrColor[i]);
				$ulis.eq(i).css('zIndex', '100').siblings().css('zIndex', '90');
			}, 5000);
		});
	}
	for (var j = 0; j < $('.slide-img>ol>li').length; j++) {
		/* 悬停暂停图片 */
		$('.slide-img>ul>li').eq(j).hover(function () {
			// console.log('现在暂停在：' + j);
			clearInterval(timer1);
			clearInterval(timer2);
		}, function () {
			// console.log('鼠标离开了');
			timer2 = setInterval(function () {
				if (j > $ulis.length - 1) {
					j = 0;
				}
				j++;
				// console.log('现在显示的图片是：' + j);
				$('.slide-img>ol').css('zIndex', '200');
				$ulis.eq(j).animate({ "opacity": 1 }, 2000, "linear").siblings().animate({ "opacity": 0 });
				$('.slide-img>ol>li').eq(j).attr("class", "active").siblings().attr('class', '');
				$('.slide-cont').css('background', arrColor[j]);
				$ulis.eq(j).css('zIndex', '100').siblings().css('zIndex', '90');
			}, 5000);
		});
	}

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

	/* 快抢发新日 -- 轮播图部分 */
	function scroll() {
		$(".new-cont > div:last-child > ul").stop().animate({ "margin-left": "-1000px" }, 800, 'linear', function () {
			for (var i = 0; i < 5; i++) {
				$(".new-cont > div:last-child > ul > li:eq(0)").appendTo($(".new-cont > div:last-child > ul"));
			}
			$(".new-cont > div:last-child > ul").css({ "margin-left": 0 })
		})
	}
	timer4 = setInterval(scroll, 5000);
	// 鼠标移入移出
	$(".new-cont > div:last-child > ul").hover(function () {
		clearInterval(timer4);
		$('.new-cont > div:last-child > span').show();
	}, function () {
		timer4 = setInterval(scroll, 5000);
		$('.new-cont > div:last-child > span').hide();
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
		$('.fixed-nav>ul').css('display', 'block');
		$('.fixed-nav>ol').css('display', 'block');
	}, function () {
		tM = setTimeout(function () {
			$('.fixed-nav>ul').css('display', 'none');
			$('.fixed-nav>ol').css('display', 'none');
		}, 200);
	});
	for (let i = 0; i < $('.fixed-nav>ul>li').length; i++) {
		$('.fixed-nav>ul>li').eq(i).hover(function () {
			clearInterval(tF);
			clearInterval(tM);
			$('.fixed-nav>ul').css('display', 'block');
			$('.fixed-nav>ol>li').eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			clearInterval(tM);
			tF = setTimeout(function () {
				$('.fixed-nav>ol>li').eq(i).css('display', 'none');
				$('.fixed-nav>ul').css('display', 'none');
			}, 200);
		});
		$('.fixed-nav>ol>li').eq(i).hover(function () {
			clearInterval(tF);
			clearInterval(tM);
			$(this).eq(i).css('display', 'block').siblings('li').css('display', 'none');
		}, function () {
			clearInterval(tM);
			tF = setTimeout(function () {
				$('.fixed-nav>ol').css('display', 'none');
				$('.fixed-nav>ul').css('display', 'none');
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

	/* 精选专题 轮播图 */
	function scroll2() {
		if (mm >= ($(".careful > .list-f > ul > li").length / 3 - 1)) {
			mm = -1;
		}
		$(".careful > .list-f > ul").stop().animate({ "margin-left": "-950px" }, 500, 'linear', function () {
			for (var i = 0; i < 3; i++) {
				$(".careful > .list-f > ul > li:eq(0)").appendTo($(".careful > .list-f > ul"));
			}
			$(".careful > .list-f > ul").css({ "margin-left": 0 })
		})
		mm++;
		$('.list-title > .upList > li').eq(mm).attr('class', 'focusCurrent').siblings().attr('class', '');
	}
	timer5 = setInterval(scroll2(mm), 5000);

	// 鼠标移入移出
	$(".careful > .list-f > ul").hover(function () {
		clearInterval(timer5);
		$('.careful > .list-f > span.all').stop().show();
	}, function () {
		timer5 = setInterval(scroll2, 5000);
		$('.careful > .list-f > span.all').stop().hide();
	});

	for (let i = 0; i < $('.list-title > .upList > li').length; i++) {
		$('.list-title > .upList > li').eq(i).click(function () {
			clearInterval(timer5);
			$(this).attr('class', 'focusCurrent').siblings().attr('class', '');
			// console.log($(this).index());
			// mm = $(this).index() - 1;
			// scroll2();
		});
	}
	$('.list-title > .upList > li').mouseleave(function () {
		timer5 = setInterval(scroll2, 5000);
	});

});