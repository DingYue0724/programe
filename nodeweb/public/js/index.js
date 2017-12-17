$(function () {
    var $goRegist = $('.goRegist');
    var $goLogin = $('.goLogin');
    var $Register = $('.Register');
    var $Login = $('.Login');
    var $registBtn = $('.registBtn');
    var $loginBtn = $('.loginBtn');
    var $Msg = $('.Msg');

    // 跳转到注册界面
    $goRegist.click(function () {
        $('.register-warning').html('');
        $('#user').val('');
        $('#pwd').val('');
        $('#repwd').val('');
        $Register.show();
        $Login.hide();
    });

    // 跳转到登录界面
    $goLogin.click(function () {
        $('.login-warning').html('');
        $('#username').val('');
        $('#password').val('');
        $Login.show();
        $Register.hide();
    });

    // 注册：
    $registBtn.click(function () {
        // 通过 ajax 请求
        $.ajax({
            type: 'post',
            url: 'api/user/register',
            data: {
                user: $('#user').val(),
                pwd: $('#pwd').val(),
                repwd: $('#repwd').val()
            },
            dataType: 'json',
            success: function (data) {
                $('.register-warning').html(data.message);
                if (!data.code) {
                    setTimeout(function () {
                        $('.login-warning').html('');
                        $('#username').val('');
                        $('#password').val('');
                        $Login.show();
                        $Register.hide();
                    }, 2000);
                }
            }
        });

        return false;
    });

    // 登录
    $loginBtn.click(function () {
        // 通过 ajax 请求
        $.ajax({
            type: 'post',
            url: 'api/user/login',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('.login-warning').html(data.message);
                if (data.code == 5) {
                    window.location.reload();
                }
            }
        });

        return false;
    });

    // 退出
    $('.logout').click(function () {
        $.ajax({
            url: 'api/user/logout',
            success: function (data) {
                window.location.reload();
            }
        });
    });

});