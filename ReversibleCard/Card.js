(function(){
    var box=document.getElementById('box');
    box.addEventListener('mouseenter',function(){
        box.className="";
        box.className="in-top"
    },false)
    box.addEventListener('mouseleave',function(){
        box.className="";
        box.className="out-top"
    },false)
})