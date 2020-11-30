$(function () {
    let form = layui.form
    let layer = layui.layer
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户值失败')
                }
                form.val('formUserInfo', res.data);
            }
        })
    }
    $('#btnReset').click(function (e) {
        e.preventDefault();
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败');
                }
                layer.msg('用户信息获取成功');
                window.parent.getUserInfo()

            }
        })
    })

})