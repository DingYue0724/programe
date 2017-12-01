window.onload = function () {
	var oVideo = document.getElementById('Video');
	/* 视频的操作 */
	/* 单击 暂停/播放 */
	oVideo.onclick = function () {
		// alert(1);
		if (oVideo.paused) {
			oVideo.play();
		} else {
			oVideo.pause();
		}
	}
	/* 双击全屏/退回 */
	fullOrCallScreen(oVideo);
}

/* 双击全屏/退回 */
function fullOrCallScreen (element) {
	// 计算点击的次数
	var count = 0;
	element.addEventListener('dblclick', function () {
		if (count%2 == 0) {
			requestFullScreen(element);
		} else {
			cancelFullScreen(document);
		};
		count++;
	}, false);
};
/* 全屏 */
function requestFullScreen (element) {
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	if (requestMethod) {
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== 'undefined') {
		// F11 -- 系统自带全屏
		// 创建 wsshell 对象，可以调用系统程序或者注册表等
		var wsShell = new ActiveXObject('WSript.shell');

		if (wsShell !== null) {
			wsShell.SendKeys('{F11}');
		}
	}
};
/* 取消全屏 */
function cancelFullScreen (element) {
	var cancelMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msCancelFullScreen;
	if (cancelMethod) {
		cancelMethod.call(element);
	} else if (typeof window.ActiveXObject != 'undefined') {
		// F11 -- 系统自带全屏
		// 创建 wsshell 对象，可以调用系统程序或者注册表等
		var wsShell = new ActiveXObject('WSript.shell');

		if (wsShell !== null) {
			wsShell.SendKeys('{F11}');
		}
	}
};
