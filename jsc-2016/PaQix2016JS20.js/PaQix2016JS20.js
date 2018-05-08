import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

class PaQix2016JS20 extends Form{
	var _this = this;
	var rm = new ResourceManager("PaQix2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var nClientWidth, nClientHeight;
	var pen1 = new Pen(Color.White);
	var rand = new Random();
	private const nCount = 200;
	var timer1;
	var pqs = new PaQixDef();
	var pqs_t;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaQix2016JS20(){
		_this.set_Text("PaQix2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));

		PA_DoQixInit();
		//_this.set_ClientSize(new Size(600, 450));

		timer1 = new System.Threading.Timer(PaQix2016JS20_Timer, null, 0, 10);
	}

	public function PaQix2016JS20_Timer(o){
		PA_DoInvalidate();
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	protected override function OnKeyPress(e : KeyPressEventArgs){
		PA_DoQixInit();
	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoQixInit();
		}
	}

	protected override function OnPaint(e : PaintEventArgs){
		var g = e.Graphics;

		for(var i=0; i<nCount; i++){
			if(i==5){
				pqs_t = pqs.Clone();
			}
			pen1.Color = Color.FromArgb(parseInt(pqs.r * i / nCount), parseInt(pqs.g * i / nCount), parseInt(pqs.b * i / nCount));
			g.DrawLine(pen1, parseInt(pqs.x[0]), parseInt(pqs.y[0]), parseInt(pqs.x[1]), parseInt(pqs.y[1]));
			PA_DoQixMove();
		}
		pqs = pqs_t.Clone();
		PA_DoQixNextColor();
	}
	
	function PA_DoQixInit(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		for(var i=0; i<2; i++){
			pqs.x[i] = rand.Next(nClientWidth);
			pqs.y[i] = rand.Next(nClientHeight);
			pqs.dx[i] = rand.Next(2, 5);
			pqs.dy[i] = rand.Next(2, 5);
		}
		pqs.r = rand.Next(256);
		pqs.g = rand.Next(256);
		pqs.b = rand.Next(256);
		pqs.dr = pqs.dg = pqs.db = 5;
	}

	function PA_DoQixMove(){
		var nx, ny;
		for(var i=0; i<2; i++){
			nx = pqs.x[i] + pqs.dx[i];
			if(pqs.dx[i]>0 && nx>nClientWidth || pqs.dx[i]<0 && nx<0){
				pqs.dx[i] = -pqs.dx[i];
			}else{
				pqs.x[i] = nx;
			}
			ny = pqs.y[i] + pqs.dy[i];
			if(pqs.dy[i]>0 && ny>nClientHeight || pqs.dy[i]<0 && ny<0){
				pqs.dy[i] = -pqs.dy[i];
			}else{
				pqs.y[i] = ny;
			}
		}
	}

	function PA_DoQixNextColor(){
		var nr, ng, nb;
		nb = pqs.b + pqs.db;
		if(pqs.db>0 && nb>255 || pqs.db<0 && nb<0){
			pqs.db = -pqs.db;
			ng = pqs.g + pqs.dg;
			if(pqs.dg>0 && ng>255 || pqs.dg<0 && ng<0){
				pqs.dg = -pqs.dg;
				nr = pqs.r + pqs.dr;
				if(pqs.dr>0 && nr>255 || pqs.dr<0 && nr<0){
					pqs.dr = -pqs.dr;
				}else{
					pqs.r = nr;
				}
			}else{
				pqs.g = ng;
			}
		}else{
			pqs.b = nb;
		}
	}

};

public class PaQixDef{
	var x = new int[2];
	var y = new int[2];
	var dx = new int[2];
	var dy = new int[2];
	var r, g, b, dr, dg, db;
	var _this = this;

	function Clone(){
		var obj1 = new PaQixDef();
		for(var i=0; i<2; i++){
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

//(new PaQix2016JS20()).ShowDialog();//此方法也能用但不稳定
Application.Run(new PaQix2016JS20());
