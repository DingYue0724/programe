$(function () {
    var comments = [];
    /**
     * 处理分页
     */
    var perpage = 5;
    var page = 1;
    var pages = 0;

    // 提交评论
    $('#commentBtn').click(function (req, res) {
        if ($('#Comment').val() != '') {
            $.ajax({
                type: 'post',
                url: 'api/comment/post',
                data: {
                    contentid: $('#contentId').val(),
                    content: $('#Comment').val()
                },
                success: function (responseData) {
                    console.log(responseData);
                    $('#Comment').val('');
                    comments = responseData.data.comments.reverse();
                    renderComment();
                }
            });
        } else {
            $('.commentWarning').html('评论内容不能为空！');
        }
    });
    $('#Comment').focus(function () {
        $('.commentWarning').html('');
    });
    // 每次页面重载时加载该文章的所有评论
    function Reload() {
        $.ajax({
            type: 'get',
            url: '/api/comment',
            data: {
                contentid: $('#contentId').val()
            },
            success: function (responseData) {
                comments = responseData.data.reverse();
                renderComment();
            }
        });
    }
    Reload();

    $('.commentPager > span').delegate('a', 'click', function () {
        if ($(this).parent().hasClass('previous')) {
            page--;
        } else if ($(this).parent().hasClass('next')) {
            page++
        }
        renderComment();
    });

    function renderComment() {
        $('.msgCount').html('一共有 ' + comments.length + ' 条评论');

        pages = Math.max(Math.ceil(comments.length / perpage), 1);
        var $lis = $('.commentPager span');
        $lis.eq(1).html(page + '/' + pages);

        var start = Math.max(0, (page - 1) * perpage);
        var end = Math.min(start + perpage, comments.length);

        if (page <= 1) {
            page = 1;
            $lis.eq(0).html('没有上一页了');
        } else {
            $lis.eq(0).html('<a href="javascript:;">上一页</a>');
        }
        if (page >= pages) {
            page = pages;
            $lis.eq(2).html('没有下一页了');
        } else {
            $lis.eq(2).html('<a hredf"javascript:;">下一页</a>');
        }

        if (comments.length == 0) {
            $('.msgComment').html('还没有留言，快来抢沙发吧～')
            $('.msgComment').css({
                'textAlign': 'center',
                'marginTop': '10px'
            });
        } else {
            $('.msgComment').css({
                'textAlign': 'left'
            });
            var html = '';
            for (var i = start; i < end; i++) {
                html += '<p><span style="float: left; font-size: 16px;">' + comments[i].username + '</span><span style="float: right; color: #999;">' + formatDate(comments[i].postTime) + '</span></p><p class="clear" style="color: #666;">' + comments[i].content + '</p>';
            }
            $('.msgComment').html(html);
        }


    }

    // 格式化时间
    function formatDate(d) {
        var date1 = new Date(d);
        return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日 ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
    }
});