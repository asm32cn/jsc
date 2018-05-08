import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

class PaEllipse2016JS20 extends Form{
	var _this = this;
	var rm = new ResourceManager("PaEllipse2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var nClientWitdh, nClientHeight;
	var brush1 = new SolidBrush(Color.FromArgb(255, 255, 0));
	var PI2 = Math.PI + Math.PI;
	var pes1 = {x:0, y:0, a:300, b:75, angle:0, rotate:0};//JavaScript 里面还是使用 JSON 最方便
	var pes2 = {x:0, y:0, a:50, b:200, angle:0, rotate:0};
	var fStartAngle = 0;
	var timer1;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaEllipse2016JS20(){
		_this.set_Text("PaEllipse2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));

		//_this.set_ClientSize(new Size(600, 450));

		timer1 = new System.Threading.Timer(PaEllipse2016JS20_Timer, null, 0, 20);
	}

	public function PaEllipse2016JS20_Timer(o){
		PA_DoEllipseRotate();
		PA_DoInvalidate();
	}

	function PA_DoEllipseRotate(){
		fStartAngle += PI2 / 160;
		if(fStartAngle>=PI2) fStartAngle=0;
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	//protected override function OnResize(e : EventArgs){
	//}

	protected override function OnPaint(e : PaintEventArgs){
		var g = e.Graphics;

		var x0 = parseInt(ClientRectangle.Width / 2);
		var y0 = parseInt(ClientRectangle.Height / 2);
		var step = PI2 / 40;
		var r = 0;
		var d = 0;
		var obj1;
		for(var i=0; i<PI2; i+=step){
			var sin1 = Math.sin(i + fStartAngle);
			var cos1 = Math.cos(i + fStartAngle);
			r = r==3 ? 6 : 3;
			d = r + r;

			obj1 = _Rotate1(pes1.a * sin1, pes1.b * cos1, fStartAngle);
			g.FillEllipse(brush1, parseInt(x0 + obj1.x - r), parseInt(y0 + obj1.y - r), d, d);

			obj1 = _Rotate1(pes2.a * sin1, pes2.b * cos1, fStartAngle);
			g.FillEllipse(brush1, parseInt(x0 + obj1.x - r), parseInt(y0 + obj1.y - r), d, d);
		}
	}

	function _Rotate1(x, y, angle){
		var sin1 = Math.sin(angle);
		var cos1 = Math.cos(angle);
		return {x:parseInt(cos1 * x - sin1 * y), y:parseInt(cos1 * y + sin1 * x)};
	}

};

//(new PaEllipse2016JS20()).ShowDialog();//此方法也能用但不稳定
Application.Run(new PaEllipse2016JS20());
