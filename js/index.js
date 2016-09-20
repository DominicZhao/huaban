/**
 * Created by Administrator on 2016/8/31.
 */
$(function(){
    var canva=document.querySelector("canvas");
    var cobj=canva.getContext("2d");
    var xp=document.querySelector(".xp");
    var copy=document.querySelector(".copy");
    var obj=new canvas(copy,cobj,xp);
    obj.draw();
    var nav=document.getElementsByClassName("nav");
    for(var i=0;i<nav.length;i++){
        nav[i].onclick=function(){
            obj.draw();
            obj.type=this.getAttribute("date-col");
            this.style.color="red"
        }
    }
    var tall=document.getElementsByClassName("tall");
    for(var i=0;i<tall.length;i++){
        tall[i].onclick=function(){
            obj.draw();
            obj.style=this.getAttribute("date-col")
        }
    }
    var stroke=document.querySelector(".stroke");
    stroke.onchange=function(){
        obj.draw();
        obj.strokeStyle=this.value
    };
    var fill=document.querySelector(".fill");
    fill.onchange=function(){
        obj.draw();
        obj.fillStyle =this.value
    };
    var huakuai=document.querySelector(".huakuai");
    huakuai.onchange=function(){
        obj.draw();
        obj.lineWidth =this.value
    };
    var back=document.querySelector(".back");
    back.onclick=function(){
        obj.draw();
        obj.back()
    };
    var nav1=document.querySelector(".nav1");
    nav1.onclick=function(){
        obj.qian()
    }
    var num=document.querySelector(".num");
    num.onchange=function(){
        obj.draw();
        obj.bianNum =this.value;
        obj.jiaoNum =this.value;
        obj.xpsize=this.value;
    };
    var flg=true;
    $(".nav:nth-of-type(8)").click(function(){
        if(flg==true){
            $(".xp").css("display","block");
            flg=false;
        }else if(flg==false){
            $(".xp").css("display","none");
            flg=true;
        }
    })
    $(".baocun").click(function(){
        if(obj.history.length>0){
            location.href=canva.toDataURL().replace("image/png","stream/octet")
        }else{
            alert("请添加内容")
        }

    })
    $(".xinjian").click(function(){
        var pan=confirm("是否保存");
        console.log(pan)
        if(pan==true){
            location.href=canva.toDataURL().replace("image/png","stream/octet")
            obj.history=[];
            cobj.clearRect(0,0,obj.clienW,obj.clienH);
        }else{
            obj.history=[];
            cobj.clearRect(0,0,obj.clienW,obj.clienH);
        }
    });
    var flag=true;
    $(".Tnav:nth-of-type(1)").click(function(){
        if(flag==true){
            $(".menu").css({"height":100,"visibility":"visible"});
            $(".menu li").each(function(index,obj){
                $(obj).css({"transition":"all 0.4s ease "+index*0.2+"s","opacity":1,"transform":"rotateX(0deg) scale(1,1)"})
            });
            flag=false
        }else if(flag==false){
            $(".menu").css({"height":0,"visibility":"hidden"});
            $(".menu li").each(function(index,obj){
                $(obj).css({"transition":"none","opacity":0,"transform":"rotateX(60deg) scale(1,0.3)"})
            });
            flag=true;
        }

    })
})