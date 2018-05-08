import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

public class PaForm2016JS extends Form {
	var _this = this;
	var pen1 = new Pen(Color.White);

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaForm2016JS(){
		_this.set_Text("PaForm2016JS");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_MinimumSize(new System.Drawing.Size(300, 300));
		//_this.set_ClientSize(new System.Drawing.Size(600, 450));

	}

	protected override function OnPaint(eventargs : PaintEventArgs){
		var g = eventargs.Graphics;
		g.DrawLine(pen1, 30, 30, 300, 300);
	}

};

//(new PaForm2016JS()).ShowDialog(); // 这么写不稳定
Application.Run(new PaForm2016JS());
