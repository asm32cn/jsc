import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

class PaClock2016JS20 extends Form{
	var _this = this;
	var rm = new ResourceManager("PaClock2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var nClientWidth, nClientHeight;
	var nClockRadius, nClockDiameter;
	var PI2 = Math.PI + Math.PI;
	var imgInterface = null;
	var bmpInterface = null;
	var pen1 = new Pen(Color.Black, 3);
	var font1 = new System.Drawing.Font("Arial Black", 24);
	var brush = new SolidBrush(Color.FromArgb(87, 183, 119));
	var timer1;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaClock2016JS20(){
		_this.set_Text("PaClock2016JS20");
		_this.set_BackColor(Color.White);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_MinimumSize(new System.Drawing.Size(450, 450));

		PA_DoAppInitialize();

		//_this.set_ClientSize(new System.Drawing.Size(600, 450));

		PA_DoFormResize();

		timer1 = new System.Threading.Timer(PaClock2016JS20_Timer, null, 0, 500);
	}

	function PA_DoAppInitialize(){
		_this.Icon = rm.GetObject("this.ico");
		imgInterface = rm.GetObject("interface.gif");
	}

	public function PaClock2016JS20_Timer(o){
		PA_DoInvalidate();
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	function PA_DoFormResize(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		if(nClientWidth>0 && nClientHeight>0){
			//nClockRadius = parseInt((nClientWidth>nClientHeight ? nClientHeight : nClientWidth) *9 / 10 / 2);
			nClockRadius = parseInt(Math.min(nClientHeight, nClientWidth) * 9 / 10 / 2);
			nClockDiameter = nClockRadius + nClockRadius;
			if(bmpInterface!=null) bmpInterface.Dispose();
			bmpInterface = new Bitmap(Convert.ToInt32(nClockDiameter), Convert.ToInt32(nClockDiameter));

			var g1 = Graphics.FromImage(bmpInterface);
			var x = parseInt((nClockDiameter - imgInterface.Width) / 2) + 15;
			var y = parseInt((nClockDiameter - imgInterface.Height) / 2);
			g1.DrawImage(imgInterface, x, y);
			pen1.Color = Color.Black;
			pen1.Width = 7;
			g1.DrawEllipse(pen1, 3, 3, nClockDiameter-7, nClockDiameter-7);
			g1.DrawEllipse(pen1, nClockRadius-5, nClockRadius-5, 10, 10);

			for(var i=0; i<60; i++){
				var angle1 = PI2 * i / 60;
				var dx1 = Math.sin(angle1) * nClockRadius;
				var dy1 = Math.cos(angle1) * nClockRadius;
				var s1;
				if(i%5==0){
					pen1.Width = 5;
					s1 = 0.9;
				}else{
					pen1.Width = 3;
					s1 = 0.94;
				}
				g1.DrawLine(pen1,
					parseInt(nClockRadius + dx1),
					parseInt(nClockRadius - dy1),
					parseInt(nClockRadius + dx1 * s1),
					parseInt(nClockRadius - dy1 * s1));
				var str = "" + (i/5);
				if(i%5==0){
					g1.DrawString(str, font1, brush,
						parseFloat(nClockRadius + dx1 * 0.8 - 15),
						parseFloat(nClockRadius - dy1 * 0.8 - 25));
				}
			}
		}
		PA_DoInvalidate();
	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoFormResize();
		}
	}

	protected override function OnPaint(e : PaintEventArgs){
		var g = e.Graphics;

		var x = parseInt((nClientWidth - nClockDiameter)/2);
		var y = parseInt((nClientHeight - nClockDiameter)/2);
		g.DrawImage(bmpInterface, x, y);
		
		var cx = parseInt(nClientWidth / 2);
		var cy = parseInt(nClientHeight / 2);

		var dtNow = new Date();//采用JavaScript原生态对象,也可采用.net里的DateTime.Now
		var nHour = dtNow.getHours();
		var nMinute = dtNow.getMinutes();
		var nSecond = dtNow.getSeconds();
		/* 也可以用下面的代码
		var dtNow = DateTime.Now;
		var nHour = dtNow.Hour;
		var nMinute = dtNow.Minute;
		var nSecond = dtNow.Second; */
		var fStart = 0.05;
		var penWidth = [3, 5, 7];
		var A_fEnd = [0.7, 0.5, 0.4];
		var A_fAngle = [
			PI2 * nSecond / 60,
				PI2 * (60 * nMinute + nSecond) / 3600,
				PI2 * (60 * ( 60 * ( nHour % 12 ) + nMinute) + nSecond) / 43200];
		for(var i=0; i<3; i++){
			var dx1 = Math.sin(A_fAngle[i]) * nClockRadius;
			var dy1 = Math.cos(A_fAngle[i]) * nClockRadius;
			pen1.Width = penWidth[i];
			g.DrawLine(pen1,
				parseInt(cx + dx1 * fStart), parseInt(cy - dy1 * fStart),
				parseInt(cx + dx1 * A_fEnd[i]), parseInt(cy - dy1 * A_fEnd[i]));
		}

	}

};

//(new PaClock2016JS20()).ShowDialog();//这个方法也能实现但不大稳定
Application.Run(new PaClock2016JS20());
