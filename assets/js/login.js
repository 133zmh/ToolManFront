
function login(){ //在这里进行ajax 文件上传 用户的信息 
        $username = $("input[name='username']").val();//用户文件内容(文件)
        $password = $("input[name='password']").val();
        // 判断用户名是否为空 
        if ($username == "") {
            alert("请填写用户名! ")
            return false;
        }// 判断密码是否为空 
        if ($password == "") {
            alert("请填写密码! ")
            return false;
        }

    $.ajax({
        type : "get",
        url : posturl+"/user/"+$username+"?password="+$password,
        success : function(data){
            console.log(data);
            if (data.msg=="登陆成功"){
                window.localStorage.setItem('loginstate','1');
                window.localStorage.setItem('username',data.data.username);
                window.localStorage.setItem('password',data.data.password);
                window.localStorage.setItem('name',data.data.name);
                window.localStorage.setItem('email',data.data.email);
                window.localStorage.setItem('image',data.data.image);
                window.location.href='';
            }else{
                alert(data.msg);
            }
        }
    });
}

function loginadd(){
    head="<p>用户登录</p>";
    add='';
    change='<input type="submit" class="btn btn-info btn-sm" onclick="login()" value="确认" />&nbsp;'
            +'<input type="submit" class="btn btn-info btn-sm" onclick="registeradd()" value="注册" />';
    document.getElementById("loginhead").innerHTML=head;
    document.getElementById("registeradd").innerHTML=add;
    document.getElementById("registerchange").innerHTML=change;
}


function registeradd(){
    head="<p>用户注册</p>";
    add='<div class="item"><i class="fa fa-sign-in"></i>确认密码：<input type="password" name="password1" id="password1" style="position:absolute;left:115px;border:1px solid #5BC0DE"/></div>'
    +'<div class="item"><i class="fa fa-sign-in"></i>昵称：<input type="text" name="name" id="name" style="position:absolute;left:115px;border:1px solid #5BC0DE"/></div>'
        +'<div class="item"><i class="fa fa-sign-in"></i>邮箱：<input type="text" name="email" id="email" style="position:absolute;left:115px;border:1px solid #5BC0DE"/>'
        +'<br><br>验证码：<input type="submit" style="position:absolute;right:50px" class="btn btn-info btn-sm" onclick="emailcheck()" value="发送验证码" /><input type="text" name="checknumber" id="checknumber" style="width:60px;position:absolute;left:115px;border:1px solid #5BC0DE"/></div>';
    change='<input type="submit" class="btn btn-info btn-sm" onclick="loginadd()" value="登录" />&nbsp;'
            +'<input type="submit" class="btn btn-info btn-sm" onclick="register()" value="确认" />';
    document.getElementById("loginhead").innerHTML=head;
    document.getElementById("registeradd").innerHTML=add;
    document.getElementById("registerchange").innerHTML=change;
}

function emailcheck(){
    $email = $("input[name='email']").val();
    if ($email == "") {
        alert("请填写邮箱! ")
        return false;
    }
    $.ajax({
        type : "get",
        url : posturl+"/getCheckCode?email="+$email,
        success : function(data){
            console.log(data);
            alert(data.msg);
            window.localStorage.setItem('checknumber',data.data);
            localcheck =  window.localStorage.getItem('checknumber');
        }
    });
}

function register(){
    $username = $("input[name='username']").val();//用户文件内容(文件)
    $password = $("input[name='password']").val();
    $password1 = $("input[name='password1']").val();
    $email = $("input[name='email']").val();
    $name = $("input[name='name']").val();
    $checknumber = $("input[name='checknumber']").val();
        // 判断用户名是否为空 
        if ($username == "") {
            alert("请填写用户名! ")
            return false;
        }// 判断密码是否为空 
        if ($password == "") {
            alert("请填写密码! ")
            return false;
        }
        if ($password1 != $password) {
            alert("密码不一致! ")
            return false;
        }
        if ($name == "") {
            alert("请填写昵称! ")
            return false;
        }
        if ($email == "") {
            alert("请填写邮箱! ")
            return false;
        }
        if ($checknumber == "") {
            alert("请填写验证码! ")
            return false;
        }
        if ($checknumber != localcheck){
            alert("验证码错误! ")
            return false;
        }

    $.ajax({
        type : "post",
        url : posturl+"/user/"+$username+"?password="+$password+"&email="+$email+"&name="+$name,
        success : function(data){
            console.log(data);
            alert(data.msg);
            if (data.msg=="注册成功"){
                window.localStorage.setItem('loginstate','1');
                window.localStorage.setItem('username',$username);
                window.localStorage.setItem('password',$password);
                window.localStorage.setItem('name',$name);
                window.localStorage.setItem('email',$email);
                window.localStorage.setItem('image',posturl+"/ToolManResources/user/default.jpg");
                window.localStorage.removeItem('checknumber');
                localcheck =  window.localStorage.getItem('checknumber');
                window.location.href='';
            }
        }
    });
}

var loginstate =  window.localStorage.getItem('loginstate');
var localusername = window.localStorage.getItem('username');
var localpassword = window.localStorage.getItem('password');
var localname = window.localStorage.getItem('name');
var localemail = window.localStorage.getItem('email');
var localimage = window.localStorage.getItem('image');
var localcheck =  window.localStorage.getItem('checknumber');


logined = '<p>'+localname+'，欢迎使用Tool Man</p><div class="footer"><input class="btn btn-info btn-sm" onclick="logout()" value="退出登录" /></div>';
if (loginstate == '1'){
    document.getElementById("loginform").innerHTML=logined;
}
function logout(){
    window.localStorage.removeItem('loginstate');
    window.localStorage.setItem('username','default');
    localusername =  window.localStorage.getItem('username');
    window.localStorage.removeItem('password');
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('image');
    loginstate =  window.localStorage.getItem('loginstate');
    window.location.href='';
}

if (loginstate == '1'){
    document.getElementById("loginimg").innerHTML='<div id="loginimg"><img src="'+localimage+'" style="height:21px;width: 21px;border-radius: 50%;align-items: center;justify-content: center;overflow: hidden;"><b class="caret"></b></div>';
}else{
    window.localStorage.setItem('username','default');
    localusername =  window.localStorage.getItem('username');
}