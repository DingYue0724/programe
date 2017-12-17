$(function () {
	/* 导航栏 */
	var timer = null;
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

	var timerList = null;
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

	/* 记录背景颜色 */
	var arrColor = ['#f07', '#f06ae9', '#7e7aff', '#ffcad2', '#62b1db', '#177bb1'];

	var timer = null;
	var timer2 = null;
	var $ulis = $('.slide-img>ul>li');
	var num = 0;
	$('.slide-cont').css('background', arrColor[num]);
	timer = setInterval(function () {
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
			clearInterval(timer);
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
			clearInterval(timer);
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

	/* 右侧导航啦 */
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

	/* 红人穿搭 */

	/* 快抢发新日 */
	/* 轮播图部分 */
	// var timerNew = null;
	// timerNew = setInterval(function () {

	// }, 2000);

	/* 品牌特卖及以下的图片处理 */
	let $imgAnimt = $('.special>.img-animt>div:nth-child(2)');
	let $imgsAnimt = $('.special>.img-animt>.imgs-animt');

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
	var Height = $(window).height();
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
	var tM = null;
	$('.fixed-nav>.nav-t1').hover(function () {
		$('.fixed-nav>ul').css('display', 'block');
		$('.fixed-nav>ol').css('display', 'block');
	}, function () {
		tM = setTimeout(function () {
			$('.fixed-nav>ul').css('display', 'none');
			$('.fixed-nav>ol').css('display', 'none');
		}, 200);
	});
	var tF = null;
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
	var back = null;
	$('.r-sidebar>ol>li:last-child').click(function () {
		$(window).scrollTop(0);
	});

	/* 商品倒计时 */
	var count = null;	// 定义定时器
	var actime = [];
	actime = $('.countdown>p').html().split(':');

	// 计算总时间 (s)
	var allTime = Number(actime[0]) * 3600 + Number(actime[1]) * 60 + Number(actime[2]);
	// 倒计时函数
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

	// 红人穿搭图片的3d旋转
	var rotateNum = 0;
	var f = true;
	var v = 1;
	var timer3 = null;
	var $imgsLis = $('.special > .main-list > .img-ad-list > .imgs > ul > li.l-imgs');

	console.log($imgsLis.length-1);

	timer3 = setInterval(function () {
		if (rotateNum == $imgsLis.length) {
			rotateNum = 0;
			f = !f;
			v++;
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
		console.log(rotateNum);
		rotateNum++;
	}, 5000);

});