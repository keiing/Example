document.addEventListener("DOMContentLoaded", function(event) {
        ajax({
            type:'get',
            url:'http://127.0.0.1:3000/index',
            data:{uname:"zhangsan",upass:123456},
            dataType:'json'
        }).then((result)=>{
            console.log(result,'result')
        })
    })
