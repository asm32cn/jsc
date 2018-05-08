//PaDisplayHZ2016JS20
import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import Accessibility;

class PaDisplayHZ2016JS20 extends Form{
	var _this = this;

	var rm = new ResourceManager("PaDisplayHZ2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());

	var rand:Random = new Random();
	var timer1 = null;

	var nClientWidth, nClientHeight;
	var A_matrix:byte[];
	var brush1 = new SolidBrush(Color.FromArgb(255, 255, 0));
	var brush2 = new SolidBrush(Color.FromArgb(31, 31, 31));
	var A_nMatrixBuffer:byte[,] = new byte[24,48];
	var A_nDisplayCache:byte[,] = new byte[24,48];
	var A_nDisplayBuffer:byte[,] = new byte[24,48];
	var nPoints = 24;
	var nPointsHF = 12;
	var nCountX = 48;
	var A_mask:byte[] = [128, 64, 32, 16, 8, 4, 2, 1];
	var nStart = 0;
	var nStart1 = 0;
	var nActionID = 5;
	var nActionID1 = 0;
	var nActionCount = 20;
	var nSleep = 0;
	var d, d1, nStartX, nStartY;
	var isRefresh:boolean = true;

	protected override function get_DefaultSize() {
		return new System.Drawing.Size(600, 450);
	}

	public function PaDisplayHZ2016JS20(){
		_this.set_Text("PaDisplayHZ2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));
		//_this.set_ClientSize(new System.Drawing.Size(600, 450));

		A_matrix = rm.GetObject("matrix24f.bin");

		var id=0;
		for(var n=0; n<2; n++){
			var stx = n * nPoints;
			for(var y=0; y<nPoints; y++){
				for(var x=0; x<nPoints; x++){
					var pos = x % 8;
					A_nMatrixBuffer[y, stx + x] = (byte)((A_matrix[id] & A_mask[pos])>0 ? 1 : 0);
					A_nDisplayBuffer[y, stx + x] = A_nMatrixBuffer[y, stx + x];
					if(pos==7){
						id++;
					}
				}
			}
		}

		PA_DoFormResize();

		timer1 = new System.Threading.Timer(PaDisplayHZ2016JS20_Timer, null, 0, 20);
	}

	private function PA_DoFormResize(){
		nClientWidth = ClientRectangle.Width;
		nClientHeight = ClientRectangle.Height;
		d1 = parseInt(nClientWidth / 48);
		d = d1 - 1;
		nStartX = (nClientWidth - d1 * 48 /*nDisplayW*/) / 2;
		nStartY = (nClientHeight - d1 * 24 /*nDisplayH*/) / 2;
		//isRefresh = true;
		PA_DoInvalidate();
	}

	private function PA_DoInvalidate(){
		_this.Invalidate();
	}

	private function PaDisplayHZ2016JS20_Timer(o){
		PA_DoAction();
		PA_DoDisplay();
		//PA_DoInvalidate();
	}

	protected override function OnResize(e : EventArgs) {
		if(ClientRectangle.Width>0 && ClientRectangle.Height>0){
			PA_DoFormResize();
		}
	}

	protected override function OnPaint(e : PaintEventArgs){
		//var g:Graphics = e.Graphics;
		isRefresh = true;
	}

	private function PA_DoDisplay(){
		var g:Graphics = _this.CreateGraphics();
		try{
			for(var y=0; y<nPoints; y++){
				for(var x=0; x<nCountX; x++){
					if(isRefresh || A_nDisplayBuffer[y, x]!=A_nDisplayCache[y, x]){
						g.FillEllipse((A_nDisplayBuffer[y, x]==1 ? brush1 : brush2),
							parseInt(nStartX + x*d1), parseInt(nStartY + y*d1), d, d);
					}
					A_nDisplayCache[y, x] = A_nDisplayBuffer[y, x];
				}
			}
			isRefresh = false;
		}catch(e){
			isRefresh = true;
			Console.Write("Exception:" + e.message + "\r\n");
		}
		g.Dispose();
	}

	private function PA_DoGetNextAction(){
		do{
			nActionID = rand.Next(nActionCount);
		}while(nActionID1==nActionID);
		nActionID1 = nActionID;
		//nActionID = (nActionID + 1) % nActionCount;
	}

	private function PA_DoAction(){
		if(nSleep>0){
			nSleep--;
		}else{
			switch(nActionID){
				case 1: PA_DoAction1(); break;
				case 2: PA_DoAction2(); break;
				case 3: PA_DoAction3(); break;
				case 4: PA_DoAction4(); break;
				case 5: PA_DoAction5(); break;
				case 6: PA_DoAction6(); break;
				case 7: PA_DoAction7(); break;
				case 8: PA_DoAction8(); break;
				case 9: PA_DoAction9(); break;
				case 10: PA_DoAction10(); break;
				case 11: PA_DoAction11(); break;
				case 12: PA_DoAction12(); break;
				case 13: PA_DoAction13(); break;
				case 14: PA_DoAction14(); break;
				case 15: PA_DoAction15(); break;
				case 16: PA_DoAction16(); break;
				case 17: PA_DoAction17(); break;
				case 18: PA_DoAction18(); break;
				case 19: PA_DoAction19(); break;
				default: PA_DoAction0(); break;
			}
			if(nStart1==0){
				nSleep = 25;
				PA_DoGetNextAction();
			}
		}
	}

	private function PA_DoAction0(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x<nStart){
					A_nDisplayBuffer[y, x] = 0;
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x-nStart];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction1(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, (nStart + x - 1)];
				}else{
					A_nDisplayBuffer[y, x] = 0;
				}
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction2(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, (x + nStart1) % nCountX];
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction3(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, (nCountX + x + nStart - 1) % nCountX];
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction4(){
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x < nPoints - nStart1 || x > nPoints + nStart1){
					A_nDisplayBuffer[y, x] = 0;
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction5(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x < nPoints-nStart + 1 || x > nPoints + nStart - 1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					A_nDisplayBuffer[y, x] = 0;
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction6(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, nStart1];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction7(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x<nStart){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, nStart - 1];
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction8(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, nStart1 + (int)((x - nStart1) / 2) ];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction9(){
		nStart = nCountX - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(x<nStart){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, nStart1 + (int)((nStart-x) / 2)];
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nCountX;
	}

	private function PA_DoAction10(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					A_nDisplayBuffer[y, x] = 0;
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction11(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart){
					A_nDisplayBuffer[y, x] = 0;
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction12(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y  + nStart, x];
				}else{
					A_nDisplayBuffer[y, x] = 0;
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction13(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart){
					A_nDisplayBuffer[y, x] = 0;
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y - nStart, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction14(){
		nStart = nPointsHF - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart || y>nPointsHF + nStart1){
					A_nDisplayBuffer[y, x] = 0;
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPointsHF;
	}

	private function PA_DoAction15(){
		nStart = nPointsHF - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nPointsHF - nStart + 1 || y>nPointsHF + nStart - 2){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					A_nDisplayBuffer[y, x] = 0;
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPointsHF;
	}

	private function PA_DoAction16(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[nStart1 + (int)((y - nStart1) / 2), x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction17(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[nStart1 + (int)((nStart - y) / 2), x];
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction18(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart1){
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}else{
					var y1 = nStart1 + parseInt((y - nStart1) / 2);
					A_nDisplayBuffer[y, x] = ((y1 % 2==0) ^ (x % 2==0) ? A_nMatrixBuffer[y1, x] : 0);
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

	private function PA_DoAction19(){
		nStart = nPoints - nStart1;
		for(var y = 0; y<nPoints; y++){
			for(var x = 0; x<nCountX; x++){
				if(y<nStart){
					var y1 = nStart1 + parseInt((nStart - y) / 2);
					A_nDisplayBuffer[y, x] = (((y1 % 2)==0) ^ (x % 2==0) ? A_nMatrixBuffer[y1 , x] : 0);
				}else{
					A_nDisplayBuffer[y, x] = A_nMatrixBuffer[y, x];
				}
			}
		}
		nStart1 = (nStart1 + 1) % nPoints;
	}

}

Application.Run(new PaDisplayHZ2016JS20());
