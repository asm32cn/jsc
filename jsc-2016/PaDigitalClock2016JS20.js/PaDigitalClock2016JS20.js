import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

class PaDigitalClock2016JS20 extends Form{
	var _this = this;
	var nClientWidth, nClientHeight;
	var charMask:char[] = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
	var byteDigitMatrix;
	var bmpDigits = null;
	var A_nDigits = new int[11];
	var A_nDigits1 = new int[11];
	var rm = new ResourceManager("PaDigitalClock2016JS20", System.Reflection.Assembly.GetExecutingAssembly());
	var brush1 = new SolidBrush(Color.FromArgb(0, 0, 255));
	var timer1;
	var isRefresh = true;
	var isVisible = true;
	var d, nItemW, nItemH, nStartX, nStartY;
	var nSecond1 = 0;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(750, 450);
	}

	function PaDigitalClock2016JS20(){
		_this.set_Text("PaDigitalClock2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_MinimumSize(new System.Drawing.Size(300, 180));

		PA_DoAppInitialize();

		//_this.set_ClientSize(new System.Drawing.Size(750, 450));
		PA_DoFormResize();

		timer1 = new System.Threading.Timer(PaDigitalClock2016JS20_Timer, null, 0, 10);
	}

	function PA_DoAppInitialize(){
		_this.set_Icon(rm.GetObject("this.ico"));
		byteDigitMatrix = rm.GetObject("matrix.bin");
		for(var i=0; i<11; i++){
			A_nDigits1[i] = 0;
		}
	}

	public function PaDigitalClock2016JS20_Timer(o){
		PA_DoDisplay();
	}

	public function PA_DoDisplay(){
		if(isVisible==false) return;

		var g = _this.CreateGraphics();

		var dtNow = new Date();//采用JavaScript原生态对象,也可采用.net里的DateTime.Now
		var nHour = dtNow.getHours();
		var nMinute = dtNow.getMinutes();
		var nSecond = dtNow.getSeconds();
		var nMillisecond = dtNow.getMilliseconds();
		/* 也可以用下面的代码
		var dtNow = DateTime.Now;
		var nHour = dtNow.Hour;
		var nMinute = dtNow.Minute;
		var nSecond = dtNow.Second;
		var nMillisecond = dtNow.Millisecond; */
		var nSplitter1 = nMillisecond>500 ? 12 : 10;

		if(nSecond1!=nSecond){
			nSecond1 = nSecond;
			isRefresh = true; // 每秒钟强制重绘所有字符
		}


		A_nDigits[0] = Convert.ToInt32(parseInt(nHour / 10));
		A_nDigits[1] = Convert.ToInt32(nHour % 10);
		A_nDigits[2] = nSplitter1;
		A_nDigits[3] = Convert.ToInt32(parseInt(nMinute / 10));
		A_nDigits[4] = Convert.ToInt32(nMinute % 10);
		A_nDigits[5] = nSplitter1;
		A_nDigits[6] = Convert.ToInt32(parseInt(nSecond / 10));
		A_nDigits[7] = Convert.ToInt32(nSecond % 10);
		A_nDigits[8] = 11;
		A_nDigits[9] = Convert.ToInt32(parseInt(nMillisecond / 100) % 10);
		A_nDigits[10] = Convert.ToInt32(parseInt(nMillisecond / 10) % 10);

		var rectDest = new Rectangle(0, nStartY, nItemW, nItemH);
		try{
			for(var i=0; i<11; i++){
				if(isRefresh || A_nDigits[i]!=A_nDigits1[i]){
					rectDest.X = nStartX + i * nItemW;
					g.DrawImage(bmpDigits, rectDest, 
						A_nDigits[i]*nItemW, parseInt(0), nItemW, nItemH, System.Drawing.GraphicsUnit.Pixel);
				}
				A_nDigits1[i] = A_nDigits[i];
			}
			//Array.Copy(A_nDigits, A_nDigits1, A_nDigits.Length);
			isRefresh = false;
		}catch(ex){
			Console.Write("Exception: " + ex.message + "\r\n");
			isRefresh = true;
		}
	}

	function PA_DoFormResize(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		isRefresh = true;
		if(nClientWidth>0 && nClientHeight>0){
			isVisible = true;

			d = parseInt(nClientWidth / 12 / 11); // 显示 12:00:00.00格式 (11字符,每个字符12点宽)
			if(d<2) d=2;
			nItemW = d * 12;
			nItemH = d * 22;
			nStartX = parseInt((nClientWidth - nItemW * 11)/2);
			nStartY = parseInt((nClientHeight - nItemH)/2);
			var nBitmapDigitW = nItemW * 13;

			if(bmpDigits!=null) bmpDigits.Dispose();
			bmpDigits = new Bitmap(parseInt(nBitmapDigitW), parseInt(nItemH));

			var g1 = Graphics.FromImage(bmpDigits);
			brush1.Color = Color.FromArgb(0, 0, 255);
			g1.FillRectangle(brush1, 0, 0, nBitmapDigitW, nItemH);
			brush1.Color = Color.FromArgb(255, 255, 255);
			var nOffset=0;
			for(var n=0; n<12; n++){
				var x = n * nItemW;
				for(var i=0; i<22; i++){
					var ch:char = byteDigitMatrix[nOffset] | byteDigitMatrix[nOffset+1]<<8;
					var y = i * d;
					for(var ii=0; ii<12; ii++){
						if((ch & charMask[ii])>0){
							g1.FillEllipse(brush1, parseInt(x + ii * d), y, d, d);
						}
					}
					nOffset += 2;
				}
			}
			_this.Invalidate()
		}else{
			isVisible = false;
		}
	}

	protected override function OnPaint(e : PaintEventArgs){
		isRefresh = true;
	}

	protected override function OnResize(e : EventArgs){
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoFormResize();
		}
	}

};

//(new PaDigitalClock2016JS20()).ShowDialog();//此方法也能用但不稳定
Application.Run(new PaDigitalClock2016JS20());
