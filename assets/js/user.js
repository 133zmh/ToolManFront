user = '<h5><img src="'+localimage+'" style="height:70px"></h5>'
+'<h5>用户名：<cac style="position:absolute;left:120px;">'+localusername+'</cac></h5>'
+'<h5>昵称：<cac style="position:absolute;left:120px;">'+localname+'</cac></h5>'
+'<h5>邮箱：<cac style="position:absolute;left:120px;">'+localemail+'</cac></h5>'
+'<button class="btn btn-info" onclick="edituser()">编辑</button>';

user1 ='<h5><img src="'+localimage+'" style="height:70px"><input type="file" accept="image/*" name="userimg" id="userimg"/></h5>'
+'<h5>用户名：<input type="text" value="'+localusername+'" readonly="true" style="position:absolute;left:120px;border:1px solid #5BC0DE"/></h5>'
+'<h5>昵称：<input type="text" name="name" id="name" value="'+localname+'" style="position:absolute;left:120px;border:1px solid #5BC0DE"/></h5>'
+'<h5>邮箱：<input type="text" name="email" id="email" value="'+localemail+'" readonly="true" style="position:absolute;left:120px;border:1px solid #5BC0DE"/></h5>'
+'<h5>验证码：<input type="text" name="checknumber" id="checknumber" style="position:absolute;left:120px;width:60px;border:1px solid #5BC0DE"/><button class="btn btn-info btn-sm" style="position:absolute;left:190px;" onclick="emailcheck()">发送验证码</button></h5>'
+'<h5>新密码：<input type="password" name="password" id="password" style="position:absolute;left:120px;border:1px solid #5BC0DE"/></h5>'
+'<h5>确认密码：<input type="password" name="password1" id="password1" style="position:absolute;left:120px;border:1px solid #5BC0DE"/></h5>'
+'<button class="btn btn-info" onclick="edit()">保存</button>&nbsp;&nbsp;&nbsp;<button class="btn" onclick="cancel()">取消</button>';

if (loginstate == '1'){
document.getElementById("yonghu").innerHTML=user;
}
function edituser(){ 
    document.getElementById("yonghu").innerHTML=user1;
}
function edit(){
    $password = $("input[name='password']").val();
    $password1 = $("input[name='password1']").val();
    $name = $("input[name='name']").val();
    $checknumber = $("input[name='checknumber']").val();
    $file1 = $("input[name='userimg']").val();
    if ($file1 == "") {
        imgurl=localimage;
    }else{
        imgurl="";
    }
    size1 = $("input[name='userimg']")[0].files[0].size;
    if (size1>1048576) {
        alert("图片不能大于1M!");
        return false;
    }
    if ($name == "") {
        alert("请填写昵称! ")
        return false;
    }
    if ($password == "") {
        alert("请填写密码! ")
        return false;
    }
    if ($password1 != $password) {
        alert("密码不一致! ")
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

    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("username", localusername);
    formData.append("password", $password);
    formData.append("email", localemail);
    formData.append("name", $name);
    formData.append("imageUrl", imgurl);
    formData.append("image", $("#userimg")[0].files[0]);
    $.ajax({
        type : "put",
        url : posturl+"/user/"+localusername,
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            if(data.code==200){
                alert("用户信息修改成功!");
            }else{
                alert("用户信息修改失败!");
            }
        }
    });
}
function cancel(){ 
    document.getElementById("yonghu").innerHTML=user;
}
