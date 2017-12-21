window.onload = function () {
	/* 点击图标按钮播放音乐 */
	var cPlay = document.getElementById('cPlay');
	var myAudio = document.getElementById('audioPlay');

	var flag = true;

	cPlay.onclick = function () {
		if (flag) {
			myAudio.play();
			cPlay.className = 'active fa fa-music';
		} else {
			myAudio.pause();
			cPlay.className = 'fa fa-music';
		}
		flag = !flag;
	}
}
$(function () {
	var re = {
		'username': /^(([\u4e00-\u9fa5])|[a-zA-Z0-9]){2,20}$/,
		'password': /^.{6,20}$/g
	};

	/* 判断用户名以及密码是否输入正确 */
	$('#username').focus(function() {
		$(this).next().show().siblings('p').hide();
	});
	$('#username').blur(function () {
		var str = $(this).val();
		if (re.username.test(str)) {
			$('#judgeUser').attr('class', 'right hintTxt');
		} else {
			$('#username').focus();
			$('#judgeUser').attr('class', 'error hintTxt');
		}
	});
	var pwd = '';
	$('#password').focus(function() {
		$(this).next().show().siblings('p').hide();
	});
	$('#password').blur(function () {
		var str = $(this).val();
		if (re.password.test(str)) {
			$('#judgePwd').attr('class', 'right hintTxt');
			pwd = $(this).val();
		} else {
			$('#password').focus();
			$('#judgePwd').attr('class', 'error hintTxt');
		}
	});
	$('#rePwd').focus(function() {
		$(this).siblings('p').hide();
	});
	$('#rePwd').blur(function () {
		if ($(this).val() != '') {
			if ($(this).val() == pwd) {
				$(this).siblings('p').hide();
				$('#judgeRePwd').attr('class', 'right hintTxt');
			} else {
				$(this).next().show().siblings('p').hide();
				$('#judgeRePwd').attr('class', 'error hintTxt');
			}
		}
	});

	/* 点击注册 */
	$('#userRegister').click(function () {
		if ($('#username').val() != '' && $('#password').val() != '' && $('#rePwd').val() != '') {
			/* 设置 cookie */
			setCookie('username', $('#username').val(), 7);
			// setCookie('password', $('#password').val(), 7);

			alert('注册成功，赶快去登录吧~');
		} else {
			alert('请正确填写注册信息！');
			return false;
		}
	});

	// 页面加载完成就判断有没有 cookie
	if (getCookie('username')) {
		$('#user1').val(getCookie('username'));
		$('.userName').html(getCookie('username'));
		$('.userLoginApi').hide();
	} 

	/* 点击登录按钮 */
	$('#Login').click(function () {
		if ($('#user1').val() == getCookie('username')) {
			window.location.href = "index.html";
			alert('登录成功，点击跳转…');
		} else {
			alert('error！');
		}
	});

	// 设置 cookie
	function setCookie (key, value, time) {
		// 获取当前时间点
		var oDate = new Date();
		// 设置过期时间
		oDate.setDate(oDate.getDate() + time);

		document.cookie = key + '=' + encodeURI(value) + ' ;expires=' + oDate.toGMTString();
	}

	// 获取 cookie
	function getCookie (key) {
		var arr1 = document.cookie.split(' ;');
		var arr2 = [];
		// console.log(arr1);
		// 遍历
		for (var i = 0; i < arr1.length; i++) {
			arr2 = arr1[i].split('=');
			if (arr2[0] == key) {
				return decodeURI(arr2[1]);    // 获取 cookie
			}
		}
	}

	// 删除 cookie
	function removeCookie (key) {
		setCookie(key, '', -1);
	}

	/* 轮播图 */
	$('.inner-slideshow').hover(function () {
		$('.leftArrow').stop().fadeIn();
		$('.rightArrow').stop().fadeIn();
	}, function () {
		$('.leftArrow').stop().fadeOut();
		$('.rightArrow').stop().fadeOut();
	});
	$('.leftArrow, .rightArrow').hover(function () {
		$(this).css('color', 'rgba(255, 255, 255, 0.6)');
	}, function () {
		$(this).css('color', 'rgba(255, 255, 255, 0.3)');
	});

	var num = 0;
	$('.leftArrow').click(function () {
		console.log(num);
		if (num == 0) {
			$('.inner-slideshow ul').css('left', -($('.inner-slideshow ul li').size()-1)*618 + 'px');
			num = $('.inner-slideshow ul li').size()-1;
		}
		num--;
		$('.inner-slideshow ul').animate({'left': -num*618 + 'px'}, '1s', 'linear');
	});
	$('.rightArrow').click(function () {
		if (num >= $('.inner-slideshow ul li').size()-1) {
			$('.inner-slideshow ul').css('left', '0');
			num = 0;
		}
		num++;
		$('.inner-slideshow ul').animate({'left': '-' + num*618 + 'px'}, '2s', 'linear');
	});

	/* 图片列表 */
	$('.photos ul li').hover(function () {
		$(this).children('a').children('img').css({
			'transform': 'scale(1.2)',
			'transition': '1s'
		});
	}, function () {
		$(this).children('a').children('img').css({
			'transform': 'scale(1)'
		});
	});

	var T = $('nav').offset().top;
	/* 回到顶部 */
	$(document).on('scroll', function (ev) {
		if ($(window).height() < $(window).scrollTop()) {
			$('.fixDiv').stop().show();
		} else {
			$('.fixDiv').stop().hide();
		}

		/* 固定导航栏 */
		if (T <= $(window).scrollTop()) {
			$('nav').css('top', $(window).scrollTop()+'px');
		} else {
			$('nav').css('top', T);
		}

	});
	$('.fixDiv').click(function () {
		$(window).scrollTop(0);
		$('nav').css('top', T);
	});
});


