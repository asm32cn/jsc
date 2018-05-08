import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility; // 没有这一行，下面的很多语法都不支持

public class PaTriangle2016JS20 extends Form{
	var _this = this;
	var rm = new ResourceManager("PaTriangle2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var rand = new Random();
	var pts = new PaTriangleDef();
	var pts_t;
	var pen1 = new Pen(Color.White);
	var brush1 = new SolidBrush(Color.Black);
	var nClientWidth, nClientHeight;
	var timer1;
	private const nCount = 50;

	protected override function get_DefaultSize () {
		// protected override function get DefaultSize () : Size
		return new System.Drawing.Size(600, 450);
	}

	function PaTriangle2016JS20(){
		_this.set_Text("PaTriangle2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));
		//_this.set_ClientSize(new System.Drawing.Size(600, 450));

		PA_DoTriangleInit();

		timer1 = new System.Threading.Timer(PaTriangle2016JS20_Timer , null, 0, 10);
	}

	public function PaTriangle2016JS20_Timer(o){
		PA_DoInvalidate();
	}

	function PA_DoTriangleInit(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		for(var i=0; i<3; i++){
			pts.x[i] = rand.Next(nClientWidth);
			pts.y[i] = rand.Next(nClientHeight);
			pts.dx[i] = rand.Next(2, 5);
			pts.dy[i] = rand.Next(2, 5);
		}
		pts.r = rand.Next(256);
		pts.g = rand.Next(256);
		pts.b = rand.Next(256);
		pts.dr = pts.dg = pts.db = 5;
	}

	protected override function OnKeyPress(e : KeyPressEventArgs){
		PA_DoTriangleInit();
	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoTriangleInit();
		}
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	function PA_DoTriangleMove(){
		var nx, ny;
		for(var i=0; i<3; i++){
			nx = pts.x[i] + pts.dx[i];
			if(pts.dx[i]>0 && nx>nClientWidth || pts.dx[i]<0 && nx<0){
				pts.dx[i] = - pts.dx[i];
			}else{
				pts.x[i] = nx;
			}
			ny = pts.y[i] + pts.dy[i];
			if(pts.dy[i]>0 && ny>nClientHeight || pts.dy[i]<0 && ny<0){
				pts.dy[i] = -pts.dy[i];
			}else{
				pts.y[i] = ny;
			}
		}
	}

	function PA_DoTriangleNextColor(){
		var nr, ng, nb;
		nb = pts.b + pts.db;
		if(pts.db>0 && nb>255 || pts.db<0 && nb<0){
			pts.db = - pts.db;
			ng = pts.g + pts.dg;
			if(pts.dg>0 && ng>255 || pts.dg<0 && ng<0){
				pts.dg = - pts.dg;
				nr = pts.r + pts.dr;
				if(pts.dr>0 && nr>255 || pts.dr<0 && nr<0){
					pts.dr = -pts.dr;
				}else{
					pts.r = nr;
				}
			}else{
				pts.g = ng;
			}
		}else{
			pts.b = nb;
		}
	}

	protected override function OnPaint(e : PaintEventArgs){
		var g = e.Graphics;

		for(var i=0; i<nCount; i++){

			if(i==5){
				pts_t = pts.Clone();
			}

			var x1 = parseInt(pts.x[0]);
			var y1 = parseInt(pts.y[0]);
			var x2 = parseInt(pts.x[1]);
			var y2 = parseInt(pts.y[1]);
			var x3 = parseInt(pts.x[2]);
			var y3 = parseInt(pts.y[2]);

			pen1.Color = System.Drawing.Color.FromArgb(
				parseInt(pts.r * i / nCount),
				parseInt(pts.g * i / nCount),
				parseInt(pts.b * i / nCount));

			g.DrawLine(pen1, x1, y1, x2, y2);
			g.DrawLine(pen1, x2, y2, x3, y3);
			g.DrawLine(pen1, x3, y3, x1, y1);

			PA_DoTriangleMove();
		}
		pts = pts_t.Clone();
		PA_DoTriangleNextColor();
	}

};

public class PaTriangleDef {
	var x = new int[3];
	var y = new int[3];
	var dx = new int[3];
	var dy = new int[3];
	var r, g, b;
	var dr=0;
	var dg=0;
	var db=0;
	var _this = this;

	function Clone(){
		var obj1 = new PaTriangleDef();
		for(var i=0; i<3; i++){
			obj1.x[i] = _this.x[i];
			obj1.y[i] = _this.y[i];
			obj1.dx[i] = _this.dx[i];
			obj1.dy[i] = _this.dy[i];
		}
		obj1.r = _this.r;
		obj1.g = _this.g;
		obj1.b = _this.b;
		obj1.dr = _this.dr;
		obj1.dg = _this.dg;
		obj1.db = _this.db;
		return obj1;
	}
}


//(new PaTriangle2016JS20()).ShowDialog();//此方法也能用但不稳定
Application.Run(new PaTriangle2016JS20());
