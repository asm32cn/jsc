import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility; // 没有这一行，下面的很多语法都不支持

public class PaStarry2016JS20 extends Form{
	var _this = this;
	var rm = new ResourceManager("PaStarry2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var rand = new Random();
	var brush1 = new SolidBrush(Color.White);
	var nClientWidth, nClientHeight;
	var timer1;
	private const nCount = 100;
	var nSelected = 0;
	var A_objStarry = new PaStarryDef[nCount];

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaStarry2016JS20(){
		_this.set_Text("PaStarry2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));

		for(var i=0; i<nCount; i++){
			A_objStarry[i] = new PaStarryDef();
		}

		//_this.set_ClientSize(new Size(600, 450));

		PA_DoStarryInit();

		timer1 = new System.Threading.Timer(PaStarry2016JS20_Timer, null, 0, 50);
	}

	public function PaStarry2016JS20_Timer(o){
		nSelected = (nSelected+1) % nCount;
		PA_DoStarrySetItem(nSelected);

		PA_DoInvalidate();
	}

	function PA_DoStarryInit(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		for(var i=0; i<nCount; i++){
			PA_DoStarrySetItem(i);
		}
	}

	function PA_DoStarrySetItem(i){
		A_objStarry[i].x = rand.Next(nClientWidth);
		A_objStarry[i].y = rand.Next(nClientHeight);
		A_objStarry[i].d = rand.Next(2, 6);
		A_objStarry[i].r = rand.Next(256);
		A_objStarry[i].g = rand.Next(256);
		A_objStarry[i].b = rand.Next(256);
	}

	function PA_DoInvalidate(){
		_this.Invalidate();
	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoStarryInit();
		}
	}

	protected override function OnPaint(e : PaintEventArgs){
		var g = e.Graphics;
		for(var i=0; i<nCount; i++){
			brush1.Color = Color.FromArgb(A_objStarry[i].r, A_objStarry[i].g, A_objStarry[i].b);
			g.FillEllipse(brush1, new Rectangle(
				A_objStarry[i].x, A_objStarry[i].y, A_objStarry[i].d, A_objStarry[i].d)
			);
		}
	}

};

public class PaStarryDef {
	var x, y, d;
	var r, g, b;
};

//(new PaStarry2016JS20()).ShowDialog();//此方法也能用但不稳定
Application.Run(new PaStarry2016JS20());