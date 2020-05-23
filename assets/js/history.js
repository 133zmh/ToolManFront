$.ajax({
    type : "get",
    url : posturl+"/record/"+localusername,
    success : function(data){
        console.log(data);
        count = Object.keys(data.data).length;
        historylist = '';
        for(i=0;i<count;i++){
            type=data.data[i].type;
            descreption=data.data[i].descreption;
            historylist = historylist+'<p>'+type+'&nbsp;'+descreption+'</p>';
        }
        document.getElementById("historylist").innerHTML=historylist;
    }
});
