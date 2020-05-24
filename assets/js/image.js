//posturl = "http://localhost:9010";

function imageHand() {
    var $file1 = $("input[name='file']").val();
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    var size1 = $("input[name='file']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;
    var type = "file";

    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("picture", $("#file")[0].files[0]);
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
            $("#result_back").text(data.data);
        }
    });
}

function imageCom() {
    var $file1 = $("input[name='file']").val();
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    var size1 = $("input[name='file']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;

    var blobURL;
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("picture", $("#file")[0].files[0]);
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
            $("#download_compress")[0].href = data.data;
        }
    });
}


function imageRender() {
    var $file1 = $("input[name='file']").val();
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    var size1 = $("input[name='file']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;
    var type = "file";
    var selectValue = $("#img_render option:selected")
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("style", selectValue.val());
    formData.append("picture", $("#file")[0].files[0]);
    formData.append("username", "cj");
    $.ajax({
        type : "post",
        url : posturl+"/image/imagerendering",
        data : formData,
        processData : false,
        contentType : false,
        cache:false,
        success : function(data){
            console.log(data);
            alert("文件上传成功!");
            $("#download_render")[0].href = data.data;
            $("#img_render_back").attr("src", data.data)
        }
    });
}

$("#file").change(function() {
    var objUrl = getObjectURL(this.files[0]);
    console.log("objUrl = "+objUrl);
    if (objUrl) {
        $("#image").attr("src", objUrl);
    }
});

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL != undefined) {//firefox
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL != undefined) { //chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}