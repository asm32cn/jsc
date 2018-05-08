import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

class PaSin2016JS20 extends Form{
	var _this = this;
	var rm = new ResourceManager("PaSin2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var brush1 = new SolidBrush(Color.FromArgb(0, 255, 0));
	var PI2 = Math.PI + Math.PI;
	var nClientWidth, nClientHeight;
	private const nCount = 200;
	var nOffset = 0;
	var nStartY, nSizeY, nWidth1;
	var timer1;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaSin2016JS20(){
		_this.set_Text("PaSin2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));

		//_this.set_ClientSize(new Size(600, 450);

		PA_DoSin2016_Init();

		timer1 = new System.Threading.Timer(PaSin2016JS20_Timer, null, 0, 10);
	}
	
	public function PaSin2016JS20_Timer(o){
		nOffset = (nOffset+ 5) % nCount;
		PA_DoInvalidate();
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	function PA_DoSin2016_Init(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		nStartY = parseInt(nClientHeight / 2);
		nWidth1 = parseInt(nClientWidth / nCount / 2);
		nSizeY = nClientHeight / 2;
	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoSin2016_Init();
			PA_DoInvalidate();
		}
	}

	protected override function OnPaint(e : PaintEventArgs) {
		var g = e.Graphics;

		for(var i=0; i<nCount; i++){
			var nStartX = nClientWidth * i / nCount;
			var sin1 = Math.sin(PI2 * (i + nOffset) / nCount);
			var nHeight1 = sin1 * nSizeY;
			var nOffsetY = nHeight1<0 ? nHeight1 : (nHeight1 * 0.9);
			var nHeight2 = nHeight1<0 ? -nHeight1 : nHeight1;
			g.FillRectangle(brush1, new Rectangle(parseInt(nStartX), nStartY + parseInt(nOffsetY), nWidth1, parseInt(nHeight2 * 0.1)));
		}
	}

};

//(new PaSin2016JS20()).ShowDialog();//此方法也能用但不稳定
Application.Run(new PaSin2016JS20());