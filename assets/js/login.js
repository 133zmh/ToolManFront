//posturl = "http://localhost:9010";

var postUrl;
function login(){ //在这里进行ajax 文件上传 用户的信息 
        var $username = $("input[name='username']").val();//用户文件内容(文件)
        var $password = $("input[name='username']").val();
        // 判断用户名是否为空 
        if ($username == "") {
            alert("请填写用户名! ")
            return false;
        }// 判断密码是否为空 
        if ($username == "") {
            alert("请填写密码! ")
            return false;
        }

    $.ajax({
        type : "get",
        url : posturl+"/user/"+$username+"?password="+$password,
        success : function(data){
            console.log(data);
            alert("成功!");
            window.location.href='../user/center.html';
        }
    });
}
