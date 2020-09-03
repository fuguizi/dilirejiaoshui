$(function () {

    $(function () {
        // 点击“去注册账号”的链接
        $('#link_reg').on('click', function () {
            $('.login-box').hide()
            $('.reg-box').show()
        })

        // 点击“去登录”的链接
        $('#link_login').on('click', function () {
            $('.login-box').show()
            $('.reg-box').hide()
        })
    })
    // layui是自动注入的对象
    var form = layui.form;
    form.verify({
        // 定义了一个叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6~12位，且不能出现空格"]
    })

    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        console.log(88);
        e.preventDefault();

        // 2.发起AJAX的POST请求
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password").val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            console.log(res, "------")
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/login",
            method: "POST",
            // 快速获取表单中的数据
            data: $(this).serialize(),//{username:"xionghui"}
            success: function (res) {
                console.log(res, "-----")
                if (res.status !== 0) {
                    return layer.msg("登陆失败")
                }
                layer.msg("登陆成功")
                //将登陆成功得到的token字符串保存到localStorage中
                localStorage.setItem("token", res.token)
                // 跳转到后台主页
                location.href = `/index.html`
            }
        })
    })
})


