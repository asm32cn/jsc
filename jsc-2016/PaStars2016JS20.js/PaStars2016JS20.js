import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import accessibility;

var PI2 = Math.PI + Math.PI;

class PaStars2016JS20 extends Form{
	var _this = this;
	const nCount = 30;
	var rm = new ResourceManager("PaStars2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly())
	var nClientWidth, nClientHeight;
	//var pen1 = new Pen(Color.FromArgb(255, 255, 0));
	var brush1 = new SolidBrush(Color.FromArgb(255, 255, 0));
	var rand = new Random();

	var nSelectedID = 0;

	var timer1;
	var A_objStart = new Star2016Def[nCount];

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaStars2016JS20(){
		_this.set_Text("PaStars2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));

		for(var i=0; i<nCount; i++){
			A_objStart[i] = new Star2016Def();
		}
		//_this.set_ClientSize(new System.Drawing.Size(600, 450);
		PA_DoFormResize();

		timer1 = new System.Threading.Timer(PaStars2016JS20_Timer, null, 0, 200);
	}

	function PaStars2016JS20_Timer(o){
		nSelectedID = (nSelectedID+1)%nCount;
		PA_DoStarInit(nSelectedID);
		PA_DoInvalidate();
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	protected override function OnPaint(e : PaintEventArgs){
		var g = e.Graphics;

		for(var n=0; n<nCount; n++){
			var pts:PointF[] = new PointF[11];
			for(var i=0; i<11; i++){
				pts[i] = new PointF(A_objStart[n].x[i], A_objStart[n].y[i]);
			}
			//g.DrawLines(pen1, pts);
			brush1.Color = Color.FromArgb(A_objStart[n].cr, A_objStart[n].cg, A_objStart[n].cb);
			g.FillPolygon(brush1, pts);
		}

	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoFormResize();
		}
	}

	protected override function OnKeyPress(e : KeyPressEventArgs){
		PA_DoFormResize();
	}

	function PA_DoFormResize(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;

		for(var i=0; i<nCount; i++){
			PA_DoStarInit(i);
		}
		PA_DoInvalidate();
	}

	function PA_DoStarInit(i : int){
		var r = 20 + rand.Next(parseInt(nClientWidth/20));
		A_objStart[i].init(r,
			r + rand.Next(parseInt(nClientWidth-r-r)),
			r + rand.Next(parseInt(nClientHeight-r-r)), rand);
	}
}

class Star2016Def{
	var x:float[] = new float[11];
	var y:float[] = new float[11];
	var cx, cy;
	var r;
	var cr, cg, cb;
	var _this = this;

	function Star2016Def(){}

	function Star2016Def(r:float, cx:float, cy: float, rand:Random){
		init(r, cx, cy, rand);
	}

	function init(r:float, cx:float, cy: float, rand:Random){
		_this.r = r;
		_this.cx = cx;
		_this.cy = cy;
		var r2 = r / 2;
		var a1 = PI2 / 10;
		for(var i=0; i<5; i++){
			var id = i + i;
			var a2 = PI2 * i / 5;
			x[id] = cx + Math.sin(a2) * r;
			y[id] = cy - Math.cos(a2) * r;
			a2 = PI2 * i / 5 + a1;
			x[id+1] = cx + Math.sin(a2) * r2;
			y[id+1] = cy - Math.cos(a2) * r2;
		}
		x[10] = x[0];
		y[10] = y[0];
		cr = rand.Next(256);
		cg = rand.Next(256);
		cb = rand.Next(256);
	}
}

Application.Run(new PaStars2016JS20());