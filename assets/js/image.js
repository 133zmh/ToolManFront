//posturl = "http://localhost:9010";

function imageHand() {
    var $file1 = $("input[name='fileName_hand']").val();
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    var size1 = $("input[name='fileName_hand']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;
    var type = "file";

    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("picture", $("#fileName_hand")[0].files[0]);
    formData.append("username", "cj");
    $.ajax({
        type : "post",
        url : posturl+"/image/handwriteingREC",
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            alert("文件上传成功!");
            $("#information_back").text(data['data']);
        }
    });
}

function imageCom() {
    var $file1 = $("input[name='fileName_compress']").val();
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    var size1 = $("input[name='fileName_compress']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;
    var type = "file";

    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("picture", $("#fileName_compress")[0].files[0]);
    formData.append("size", $("#img_com_size").val());
    formData.append("username", "cj");
    $.ajax({
        type : "post",
        url : posturl+"/image/imagecompress",
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            alert("文件上传成功!");
            alert($("#img_com_size").val());
            y='<a download="file" href="'+data.data+'">Download</a>'
            document.getElementById("download").innerHTML=y;
            $("#back_img").href = data.data;
        }
    });
}


function imageRender() {
    var $file1 = $("input[name='fileName_render']").val();
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    var size1 = $("input[name='fileName_render']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;
    var type = "file";
    var selectValue = $("#img_render option:selected")
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("style", selectValue.val());
    formData.append("picture", $("#fileName_render")[0].files[0]);
    formData.append("username", "cj");
    $.ajax({
        type : "post",
        url : posturl+"/image/imagerendering",
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            alert("文件上传成功!");
            alert(selectValue.val());
            y='<a download="file" href="'+data.data+'">Download</a>'
            document.getElementById("download").innerHTML=y;
        }
    });
}