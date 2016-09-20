/**
 * Created by Administrator on 2016/8/30.
 */
function canvas(canvas,cobj,xp){
    this.canvas=canvas;
    this.cobj=cobj;
    this.xp=xp;
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.clienW=canvas.offsetWidth;
    this.clienH=canvas.offsetHeight;
    this.lineWidth=1;
    this.history=[];
    this.style="stroke";
    this.type="";
    this.isback=true;
    this.bianNum="8";
    this.jiaoNum="5";
    this.xpsize="8";
}
canvas.prototype={
    int:function(){
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
        this.isback=true;
        this.xp.style.display="none";
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e) {
            that.int();
            var ox = e.offsetX;
            var oy = e.offsetY;
            that.canvas.onmousemove=function(e) {
                that.cobj.clearRect(0,0,that.clienW,that.clienH);
                endx = e.offsetX;
                endy = e.offsetY;
                that.cobj.clearRect(0, 0, that.clienW, that.clienH);
                if (that.history.length != 0) {
                    that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                that[that.type](ox, oy, endx, endy);
            };
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.clienW,that.clienH));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    line:function(x,y,m,h){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(m,h);
        this.cobj.stroke()
    },
    juxing:function(x,y,m,h){
        this.cobj.beginPath();
        this.cobj.rect(x,y,m-x,h-y);
        this.cobj[this.style]()
    },
    zhenfang:function(x,y,m,h){
        this.cobj.beginPath();
        this.cobj.rect(x,y,m-x,m-x);
        this.cobj[this.style]()
    },
    circle:function(x,y,m,h){
        var r=Math.sqrt((m-x)*(m-x)+(h-y)*(h-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    duobian:function(x,y,m,h){
        var a=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((m-x)*(m-x)+(h-y)*(h-y));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i));
        }
        this.cobj.closePath();
        this.cobj[this.style]()
    },
    duojiao:function(x,y,m,h){
        var a=360/(this.jiaoNum*2)*Math.PI/180;
        var R=Math.sqrt((m-x)*(m-x)+(h-y)*(h-y));
        var r=R/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(x+R*Math.cos(a*i),y+R*Math.sin(a*i));
            }else{
                this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i));
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]()
    },
    xiangpi:function(){
        var that=this;
        that.canvas.onclick=function(e){
            var er=e||window.event;
            var setX=er.offsetX;
            var setY=er.offsetY;
            var ox=setX-that.xpsize/2;
            var oy=setY-that.xpsize/2;
            if(ox<30){
                ox=30
            }
            if(ox>that.clienW-that.xpsize/2){
                ox=that.clienW-that.xpsize/2
            }
            if(oy<30){
                oy=30
            }
            if(oy>that.clienW-that.xpsize/2){
                oy=that.clienW-that.xpsize/2
            }
            that.xp.style.cssText="width:"+that.xpsize+"px;height:"+that.xpsize+"px;left:"+ox+"px;top:"+oy+"px;display: block;"
        }
        that.canvas.onmousedown=function(e){

            that.canvas.onmousemove=function(e){
                var er=e||window.event;
                var setX=er.offsetX;
                var setY=er.offsetY;
                var ox=setX-that.xpsize/2;
                var oy=setY-that.xpsize/2;
                if(ox<30){
                    ox=30
                }
                if(ox>that.clienW-that.xpsize){
                    ox=that.clienW-that.xpsize
                }
                if(oy<30){
                    oy=30
                }
                if(oy>that.clienH-that.xpsize){
                    oy=that.clienH-that.xpsize
                }
                that.xp.style.cssText="width:"+that.xpsize+"px;height:"+that.xpsize+"px;left:"+ox+"px;top:"+oy+"px;display: block;";
                that.cobj.clearRect(ox,oy,that.xpsize,that.xpsize);
            }
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.clienW,that.clienH));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }

    },
    back:function(){
        if(this.history.length==0){
            this.cobj.clearRect(0,0,this.clienW,this.clienH);
            alert("不能后退");
            return;
        }
        if(this.isback){
            if(this.history.length==1){
                this.history.pop();
                this.cobj.clearRect(0,0,this.clienW,this.clienH);
            }else{
                this.history.pop();
                this.cobj.putImageData(this.history.pop(),0,0);
            }
        }else{
            this.cobj.putImageData(this.history.pop(),0,0);
        }
        this.isback=false;
    },
    qian:function (){
        var that=this;
        that.canvas.onmousedown=function(e){
            that.int();
            var ox= e.offsetX;//鼠标到浏览器的位置
            var oy= e.offsetY;
            var endx,endy;
            that.cobj.beginPath();
            that.cobj.moveTo(ox,oy);
            that.canvas.onmousemove=function(e){
                endx=e.offsetX;
                endy=e.offsetY;
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke()

            };
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.clienW,that.clienH));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        };
    }
};