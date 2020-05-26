user = '<h5>请登录</h5>';
user0='<div style="float:left;width:20%;">&nbsp;</div><div style="float:left;width:30%;"><h5><img src="'+localimage+'" style="height:76px;width: 76px;border-radius: 50%;align-items: center;justify-content: center;overflow: hidden;"></h5>'
+'&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-info" onclick="edituser()">编辑</button></div>'
+'<div style="float:left;width:50%;"><h5>用户名：'+localusername+'</h5>'
+'<h5>昵称：'+localname+'</h5>'
+'<h5>邮箱：'+localemail+'</h5></div>';

user1 =''
+'<div style="float:left;width:20%;">&nbsp;</div><div style="float:left;width:30%;"><h5><img src="'+localimage+'" style="height:76px;width: 76px;display: flex;border-radius: 50%;align-items: center;justify-content: center;overflow: hidden;"></h5>'
+'<input style="display:none" type="file" accept="image/*" name="userimg" id="userimg"/><button class="btn btn-info" id="imgup" onclick="upupup()">上传头像</button></div>'
+'<div style="float:left;width:20;"><h5>用户名：</h5>'
+'<h5>昵称：</h5></div>'
+'<div style="float:left;width:40%;"><h5><input type="text" value="'+localusername+'" readonly="true" style="border:1px solid #5BC0DE"/></h5>'
+'<h5><input type="text" name="name" id="name" value="'+localname+'" style="border:1px solid #5BC0DE"/></h5></div>'
+'<div style="float:left;width:50%;"><button class="btn btn-info" onclick="edit()">保存</button>&nbsp;&nbsp;&nbsp;<button class="btn" onclick="cancel()">取消</button></div>';

function upupup(){
    $('#userimg').click();
}

if (loginstate != '1'){
    document.getElementById("yonghu").innerHTML=user;
}else{
    document.getElementById("yonghu0").innerHTML=user0;
    var Main = new Vue({
        el: '#app',
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            update:function(){
                $.ajax({
                    type : "get",
                    url : posturl+"/record/"+localusername,
                    success : function(record){
                        console.log(record);
                        deletebutton = Object.keys(record.data).length;
                        if(deletebutton < 2){
                            document.getElementById("deletebutton").innerHTML='';
                        }
                        if(record.msg!="成功返回default记录"){
                            Main.tableData = record.data;
                        }
                    }
                });
            },
            deleteone(uuid){
                $.ajax({
                    type : "delete",
                    url : posturl+"/record/"+uuid,
                    success : function(data){
                        console.log(data);
                        Main.update();
                        if(data.code==500){
                            alert("删除失败！");
                        }
                    }
                });
            },
            deleteall(){
                var r=confirm("确定删除全部记录？")
                if (r==true){
                    $.ajax({
                        type : "delete",
                        url : posturl+"/record/allRecord/"+localusername,
                        success : function(data){
                            console.log(data);
                            Main.update();
                            if(data.code==500){
                                alert("删除失败！");
                            }
                        }
                    });
                }
            }
        }
    });
    Main.update();
}
function edituser(){ 
    document.getElementById("yonghu").innerHTML=user1;
}
function edit(){
    $name = $("input[name='name']").val();
    $file1 = $("input[name='userimg']").val();
    if($file1 !=""){
        size1 = $("input[name='userimg']")[0].files[0].size;
        if (size1>2097152) {
            alert("图片不能大于2M!");
            return false;
        }
        imgurl="default";
    }else{
        imgurl=localimage;
    }
    if ($name == "") {
        alert("请填写昵称! ")
        return false;
    }

    if($file1 !=""){
        var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
        formData.append("username", localusername);
        formData.append("password", localpassword);
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
                    $.ajax({
                        type : "get",
                        url : posturl+"/user/"+localusername+"?password="+localpassword,
                        success : function(data){
                            console.log(data);
                            if (data.msg=="登陆成功"){
                                window.localStorage.setItem('name',data.data.name);
                                window.localStorage.setItem('image',data.data.image);
                                window.location.href='';
                            }
                        }
                    });
                }else{
                    alert("用户信息修改失败!");
                }
            }
        });
    }else{

        getImgToBase64('../../assets/ico/test.png',function(data){
            var myFile = dataURLtoFile(data,'testimg.png');
            var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
            formData.append("username", localusername);
            formData.append("password", localpassword);
            formData.append("email", localemail);
            formData.append("name", $name);
            formData.append("imageUrl", imgurl);
            formData.append("image", myFile);
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
                        $.ajax({
                            type : "get",
                            url : posturl+"/user/"+localusername+"?password="+localpassword,
                            success : function(data){
                                console.log(data);
                                if (data.msg=="登陆成功"){
                                    window.localStorage.setItem('name',data.data.name);
                                    window.localStorage.setItem('image',data.data.image);
                                    window.location.href='';
                                }
                            }
                        });
                    }else{
                        alert("用户信息修改失败!");
                    }
                }
            });
        });
    }

}
function cancel(){ 
    window.location.href='';
}
function getImgToBase64(url,callback){//将图片转换为Base64
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img,0,0);
      var dataURL = canvas.toDataURL('image/png');
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
}
function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

