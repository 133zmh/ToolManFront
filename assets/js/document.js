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
    var selectValue = $("#document_trans option:selected").val()
    formData.append("source", $("#fileNameDocument")[0].files[0]);
    formData.append("format", selectValue.val());
    formData.append("username",localusername);
    $.ajax({
        type : "post",
        url : posturl+"/document/documentChange",
        data : formData,
        processData : false,
        contentType : false,
        success : function(data){
            console.log(data);
            var url = data.data;
            alert("文件上传成功!");
            $("#a_doc_download").attr("href", data.data);
            alert(selectValue);
            var index = url.lastIndexOf("/");
            var filename = url.substring(index+1);//文件名
            $("#text_filename_back").text(filename);
        }
    });
}
function downloadPic() {
    window.open($("#a_doc_download").attr("href"))
}

$("#document_trans").change(function () {
    var selectValue = $("#document_trans option:selected").val();
    switch (selectValue) {
        case "html":
            $("#img_doc_back").attr("src", "../../img/html.png");
            break;
        case "png":
            $("#img_doc_back").attr("src", "../../img/png.png");
            break;
        case "jpeg":
            $("#img_doc_back").attr("src", "../../img/jpeg.png");
            break;
        case "doc":
            $("#img_doc_back").attr("src", "../../img/doc.png");
            break;
        case "docx":
            $("#img_doc_back").attr("src", "../../img/docx.png");
            break;
        case "pdf":
            $("#img_doc_back").attr("src", "../../img/pdf.png");
            break;
    }
})

function changeFileImg(){
    var filename = $("#fileNameDocument")[0].files[0].name;
    var index = filename.lastIndexOf(".");
    var suffix = filename.substring(index+1);//文件扩展名
    switch (suffix) {
        case "html":
            $("#img_doc_input").attr("src", "../../img/html.png");
            break;
        case "png":
            $("#img_doc_input").attr("src", "../../img/png.png");
            break;
        case "jpeg":
            $("#img_doc_input").attr("src", "../../img/jpeg.png");
            break;
        case "doc":
            $("#img_doc_input").attr("src", "../../img/doc.png");
            break;
        case "docx":
            $("#img_doc_input").attr("src", "../../img/docx.png");
            break;
        case "pdf":
            $("#img_doc_input").attr("src", "../../img/pdf.png");
            break;
    };
    $("#text_filename").text(filename);
}
