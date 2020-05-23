posturl = "http://localhost:9010";
function login(){ //在这里进行ajax 文件上传 用户的信息 
        var $username = $("input[name='username']").val();//用户文件内容(文件)
        var $password = $("input[name='username']").val();
        // 判断文件是否为空 
        if ($username == "") {
            alert("请填写用户名! ")
            return false;
        }

    $.ajax({
        type : "get",
        url : posturl+"/user/"+$username+"?password="+$password,
        // processData : false,
        // contentType : false,
        success : function(data){
            console.log(data);
            alert("成功!");
            window.location.href='../user/center.html';
        }
    });
}
