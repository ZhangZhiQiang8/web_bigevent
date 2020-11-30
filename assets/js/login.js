$(function () {
    $('#link_login').click(function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    $('#link_reg').click(function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                return '俩次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            } else {
                layui.layer.msg(res.message);
                $('#link_login').click()
            }
        })
    })
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.post('/api/login', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('用户名或者密码错误');
            } else {
                layui.layer.msg(res.message);
                localStorage.setItem('token', res.token)
                window.location = 'index.html'
            }
        })
    })

})