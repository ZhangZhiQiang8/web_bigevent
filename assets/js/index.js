$(function () {
    getUserInfo()
    let layer = layui.layer;
    $('#btnLogout').click(function () {
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/code/login.html'
            layer.close(index);
        })
    })
})
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        let first = name[0].toUpperCase();
        $('.text-avatar').text(first).show()
    }
}