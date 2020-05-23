image = '<p><img src="'+localimage+'"></p>';
username = '<p>用户名：'+localusername+'</p>';
name = '<p>昵称：'+localname+'</p>';
email = '<p>邮箱：'+localemail+'</p>';
empty = "";
if (loginstate == '1'){
document.getElementById("touxiang").innerHTML=image;
document.getElementById("yonghuming").innerHTML=username;
document.getElementById("nicheng").innerHTML=name;
document.getElementById("youxiang").innerHTML=email;
}
