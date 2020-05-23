//posturl = "http://localhost:9010";

function sendToUserDocument(){ //在这里进行ajax 文件上传 用户的信息
    var $file1 = $("input[name='fileNameDodument']").val();//用户文件内容(文件)
    // 判断文件是否为空
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }

    //判断文件大小
    var size1 = $("input[name='fileNameDocument']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }
    boo1 = true;
    var type = "file";
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    var selectValue = $("#document_trans option:selected")
    formData.append("source", $("#fileNameDocument")[0].files[0]);
    formData.append("format", "png");
    formData.append("username","cj");
    $.ajax({
        type : "post",
        url : posturl+"/document/documentChange",
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