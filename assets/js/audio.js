posturl = "http://localhost:9010";

function sendToUser(){ //在这里进行ajax 文件上传 用户的信息
    var $file1 = $("input[name='fileName1']").val();//用户文件内容(文件)
    // 判断文件是否为空
    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    /*//判断文件类型,我这里根据业务需求判断的是Excel文件
     var fileName1 = $file1.substring($file1.lastIndexOf(".") + 1).toLowerCase();
     if(fileName1 != "xls" && fileName1 !="xlsx"){
     alert("请选择Execl文件!");
     return false;
     }*/
        //判断文件大小
    var size1 = $("input[name='fileName1']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }
    boo1 = true;
    var type = "file";
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    var selectValue = $("#audio_trans option:selected")
    var postUrl;
    if (selectValue.val() == "mp3")
    {
        postUrl = posturl + "/audio/wav2Mp3";
    }else if (selectValue.val() == "wav")
    {
        postUrl = posturl + "/audio/mp32Wave"
    }
    formData.append("source", $("#fileName1")[0].files[0]);
    formData.append("username", "cj");
    $.ajax({
        type : "post",
        url : postUrl,
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            alert("文件上传成功!");
            y='<a download="audio.mp3" href="'+data.data+'">Download</a>'
            document.getElementById("download").innerHTML=y;
        }
    });
}

function audioASR() {
    var $file1 = $("input[name='fileName_ASR']").val();

    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    //判断文件大小
    var size1 = $("input[name='fileName_ASR']")[0].files[0].size;
    if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }

    boo1 = true;
    var type = "file";
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("source", $("#fileName_ASR")[0].files[0]);
    formData.append("username", "cj");
    $.ajax({
        type : "post",
        url : posturl+"/audio/audiofromavi",
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            alert("文件上传成功!");
            y='<a download="audio.wav" href="'+data.data+'">Download</a>'
            document.getElementById("download").innerHTML=y;
        }
    });
}