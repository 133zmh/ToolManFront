//posturl = "http://localhost:9010";

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
    formData.append("username", localusername);
    $.ajax({
        type : "post",
        url : postUrl,
        data : formData,
        processData : false,
        contentType : false,
        beforeSend: function () {
            $("#img_click_trans").attr("src", "../../img/pic.gif");
        },
        complete: function () {
            $("#img_click_trans").attr("src", "../../img/clicktrans1.png");
        },
        success : function(data){
            var url = data.data;
            console.log(data);
            $("#a_audio_download").attr("href", data.data);
            var index = url.lastIndexOf("/");
            var filename = url.substring(index+1);//文件名
            $("#text_filename_back").text(filename);
            $("#img_click_trans").attr("src", "../../img/clicktrans1.png");
        }
    });
}

function audioASR() {
    var $file1 = $("input[name='fileName1']").val();

    if ($file1 == "") {
        alert("请选择上传的目标文件! ")
        return false;
    }
    //判断文件大小
    var size1 = $("input[name='fileName1']")[0].files[0].size;
    /*if (size1>104857600) {
        alert("上传文件不能大于100M!");
        return false;
    }*/

    boo1 = true;
    var type = "file";
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("source", $("#fileName1")[0].files[0]);
    formData.append("username", localusername);
    $.ajax({
        type : "post",
        url : posturl+"/audio/audiofromavi",
        data : formData,
        processData : false,
        contentType : false,
        beforeSend: function () {
            $("#img_click_trans").attr("src", "../../img/pic.gif");
        },
        complete: function () {
            $("#img_click_trans").attr("src", "../../img/clicktrans1.png");
        },
        success : function(data){
            var url = data.data;
            console.log(data);
            $("#a_audio_download").attr("href", data.data);
            var index = url.lastIndexOf("/");
            var filename = url.substring(index+1);//文件名
            $("#text_filename_back").text(filename);
            $("#img_click_trans").attr("src", "../../img/clicktrans1.png");
        }
    });
}

function downloadAudio() {
    window.open($("#a_audio_download").attr("href"))
}

function changeFileImg(){
    var filename = $("#fileName1")[0].files[0].name;
    var index = filename.lastIndexOf(".");
    var suffix = filename.substring(index+1);//文件扩展名
    switch (suffix) {
        case "avi":
            $("#img_audio_input").attr("src", "../../img/avi.png");
            break;
        case "mp3":
            $("#img_audio_input").attr("src", "../../img/mp3.png");
            break;
    };
    $("#text_filename").text(filename);
    $("#img_click_trans").attr("src", "../../img/clicktrans.png");
}


$("#audio_trans").change(function () {
    var selectValue = $("#audio_trans option:selected").val();
    switch (selectValue) {
        case "wav":
            $("#img_audio_back").attr("src", "../../img/wav.png");
            break;
        case "mp3":
            $("#img_audio_back").attr("src", "../../img/mp3.png");
            break;
    }
})