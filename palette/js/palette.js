window.onload=function(){
	let canvas=document.querySelector('canvas');
	let ctx=canvas.getContext("2d");
	let xiantiao=document.querySelector('.icon-xiantiao');
	let xuxian=document.querySelector('.icon-xuxian');
	let yuan=document.querySelector('.icon-yuan');
	let juxing=document.querySelector('.icon-juxing');
	let duobian=document.querySelector('.icon-iconfontwubianxing');
	let qianbi=document.querySelector('.icon-pan_icon');
	let duojiao=document.querySelector('.icon-wujiaoxing-copy');
	let chehui=document.querySelector('.icon-chexiaofanhuichehuishangyibu');
	let xp=document.querySelector('.eraser');
	let xps=document.querySelector('.icon-xiangpi')
	let opcity=document.querySelector('.opcity');
	class Palette{
		constructor(canvas,ctx,opcity,xp){
			this.canvas=canvas;
			this.ctx=ctx;
			this.cw=this.canvas.width;
			this.ch=this.canvas.height;
			this.xiantiao=xiantiao;
			this.history=[];
			this.opcity=opcity;
			this.xp=xp;
			this.strokestyle='stroke';
		}
		line(dx,dy,mx,my){	
			this.ctx.beginPath();
			this.ctx.moveTo(dx, dy);
			this.ctx.lineTo(mx, my);
			this.ctx.stroke();				
		}
		dash(dx,dy,mx,my){
			this.ctx.beginPath();
			this.ctx.moveTo(dx, dy);
			this.ctx.setLineDash([3,3]);
			this.ctx.lineTo(mx, my);
			this.ctx.stroke();
		}
		circle(dx,dy,mx,my){
			this.ctx.beginPath();
			let r=Math.sqrt(Math.pow(mx-dx,2)+Math.pow(my-dy,2))
			this.ctx.arc(dx, dy, r, 0, Math.PI*2);
			this.ctx.stroke();
		}
		square(dx,dy,mx,my){
			this.ctx.strokeRect(dx, dy, mx-dx, my-dy);
		}
		ploy(dx,dy,mx,my,n){
			this.ctx.beginPath();
			let r=Math.sqrt(Math.pow(mx-dx,2)+Math.pow(my-dy,2));
			let deg=Math.PI*2/n;
			this.ctx.moveTo(dx+r, dy);
			for(let i=0;i<n;i++){
				let x=dx+Math.cos(deg*i)*r,
					y=dy+Math.sin(deg*i)*r;
					this.ctx.lineTo(x, y);
			}
			this.ctx.closePath();
			this.ctx.stroke();
			// this.ctx.strokestyle[this.strokestyle];
		}
		ployJ(dx,dy,mx,my,n){
			this.ctx.beginPath();
			let r=Math.sqrt(Math.pow(mx-dx,2)+Math.pow(my-dy,2));
			let deg=Math.PI/n;
			this.ctx.moveTo(dx+r, dy);
			for(let i=0;i<2*n;i++){
				let r1;
				r1=i%2==0 ? r:r/2;
				let x=dx+Math.cos(deg*i)*r1,
					y=dy+Math.sin(deg*i)*r1;
					this.ctx.lineTo(x, y);
			}
			this.ctx.closePath();
			this.ctx.stroke();
		}
		pencil(){
			this.opcity.onmousedown=function(e){
				let dx=e.offsetX,dy=e.offsetY;
				this.ctx.beginPath();
				this.ctx.moveTo(dx, dy);
				this.opcity.onmousemove=function(e){
					let mx=e.offsetX,my=e.offsetY;
					this.ctx.clearRect(0, 0, this.cw,this.ch);
					if(this.history.length){
						ctx.putImageData(this.history[this.history.length-1], 0,0);
					}				
					this.ctx.lineTo(mx, my);
					this.ctx.stroke();
				}.bind(this)
				this.opcity.onmouseup=function(){
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
				}.bind(this)
			}.bind(this)
		}
		delete(){
			if(!this.history[this.history.length-1]){return}
			this.history.pop();
			this.ctx.clearRect(0, 0, this.dx, this.dy);
			this.ctx.putImageData(this.history[this.history.length-1],0,0);
		}
		eraser(){
			this.opcity.onmousedown=function(e){
				this.opcity.onmousemove=function(e){
					let mx=e.offsetX-5,my=e.offsetY-5;
					this.xp.style.display='block';
					this.xp.style.left=`${mx}px`;
					this.xp.style.top=`${my}px`;
					this.ctx.clearRect(mx, my, 10, 10)
				}.bind(this)
				this.opcity.onmouseup=function(){
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
					this.xp.style.display='none'
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
				}.bind(this)
			}.bind(this)
		}
		drow(type,num){
			this.opcity.onmousedown=function(e){
				let dx=e.offsetX,dy=e.offsetY;
				this.opcity.onmousemove=function(e){
					let mx=e.offsetX,my=e.offsetY;
					this.ctx.clearRect(0, 0, this.cw,this.ch);
					if(this.history.length){
						ctx.putImageData(this.history[this.history.length-1], 0,0);
					}
					this[type](dx,dy,mx,my,num)
				}.bind(this)
				this.opcity.onmouseup=function(){
					this.ctx.setLineDash([3,0]);
					this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
					this.opcity.onmousemove=null;
					this.opcity.onmouseup=null;
				}.bind(this)
			}.bind(this)
		}
	}
	let palette=new Palette(canvas,ctx,opcity,xp);
	xiantiao.ondblclick=function(){
		palette.drow('line');
	}
	xuxian.ondblclick=function(){
		palette.drow('dash');
	}
	yuan.ondblclick=function(){
		palette.drow('circle');
	}
	juxing.ondblclick=function(){
		palette.drow('square');
	}
	duobian.ondblclick=function(){
		let num=prompt('请输入边数',5);
		palette.drow('ploy',num);
	}
	duojiao.ondblclick=function(){
		let num=prompt('请输入边数',5);
		palette.drow('ployJ',num);
	}
	qianbi.ondblclick=function(){
		palette.pencil();
	}
	chehui.onclick=function(){
		palette.delete();
	}
	xps.ondblclick=function(){
		palette.eraser();
	}
}
