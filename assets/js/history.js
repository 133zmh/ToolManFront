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
                    if(record.msg!="成功返回null记录"){
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
                    if(data.code==200){
                        alert("成功删除！");
                    }
                    if(data.code==500){
                        alert("删除失败！");
                    }
                }
            });
        },
        deleteall(){
            $.ajax({
                type : "delete",
                url : posturl+"/record/allRecord/"+localusername,
                success : function(data){
                    console.log(data);
                    Main.update();
                    if(data.code==200){
                        alert("成功删除！");
                    }
                    if(data.code==500){
                        alert("删除失败！");
                    }
                }
            });
        }
    }
});
Main.update();
