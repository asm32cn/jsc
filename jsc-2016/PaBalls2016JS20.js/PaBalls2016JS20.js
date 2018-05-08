import System;
import System.Drawing;
import System.Windows.Forms;
import System.Resources;
import System.Drawing.Imaging;
import Accessibility;


class PaBalls2016JS20 extends Form{
	var _this = this;

	class toolbar1def extends ToolBar{
		protected override function OnButtonClick(e : ToolBarButtonClickEventArgs){
			_this.toolbar1_OnButtonClick(e);
		}
	}

	class panel1def extends Panel{
		var _this1 = this;
		protected override function OnPaint(e : PaintEventArgs){
			_this.panel1_OnPaint(e);
		}
		protected override function OnResize(e : EventArgs){
			_this.panel1_Resize();
		}
		public function panel1def(){
			_this1.SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
			_this1.SetStyle(ControlStyles.AllPaintingInWmPaint, true);
			_this1.SetStyle(ControlStyles.UserPaint, true);
		}
	}

	var rm = new ResourceManager("PaBalls2016JS20",
		System.Reflection.Assembly.GetExecutingAssembly());
	var imagelist1 = new ImageList();
	var toolbar1 = new toolbar1def();
	//var panel1 = new Panel();
	var panel1 = new panel1def();
	var timer1;
	var rand = new Random();
	private var imgBgJpeg = null;
	private var A_imgBalls:Image[] = new Image[10];
	private var imgAttrib;

	private var A_objBalls:BallDef[] = new BallDef[50];

	private const nCount = 50;

	private var nBgJpegWidth, nBgJpegHeight;
	private var nClientWidth, nClientHeight;
	private var nBallRadius:int=40, nBallDiameter:int=80;
	private var nRangeSpaceX, nRangeSpaceY;
	private var nMinD:int=2, nRangeD:int=20;
	private var nBallIconID:int=7;

	private var isRunning = true;
	private var isMinimized = false;

	private const nTimerInterval = 10;
	private var nPathID=0;

	private var PI2 = Math.PI + Math.PI;
	private var nCount1;
	private var nCount2;
	private var fRotate1:float=0, fRotate2:float=0;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(600, 450);
	}

	function PaBalls2016JS20(){
		_this.set_Text("PaBalls2016JS20");
		_this.set_BackColor(Color.Black);
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_DoubleBuffered(true);
		_this.set_Icon(rm.GetObject("this.ico"));

		PA_DoAppInitialize();

		//_this.set_ClientSize(new System.Drawing.Size(600, 450);

		init_Controls();

		timer1 = new System.Threading.Timer(PaBalls2016JS20_Timer, null, 0, nTimerInterval); 
	}

	function init_Controls(){
		panel1.set_BackColor(System.Drawing.Color.Black);
		panel1.set_Dock(DockStyle.Fill);
		panel1.set_BackgroundImage(_this.rm.GetObject("bg.jpg"));
		panel1.set_BackgroundImageLayout(ImageLayout.Center);
		_this.Controls.Add(panel1);

		imagelist1.ImageSize = new System.Drawing.Size(16, 15);
		imagelist1.Images.Add((Image)(rm.GetObject("button-01.png")));
		imagelist1.Images.Add((Image)(rm.GetObject("button-02.png")));
		imagelist1.Images.Add((Image)(rm.GetObject("button-03.png")));
		imagelist1.Images.Add((Image)(rm.GetObject("button-04.png")));
		imagelist1.Images.Add((Image)(rm.GetObject("button-05.png")));
		toolbar1.set_ImageList(imagelist1);
		toolbar1.set_ButtonSize = new System.Drawing.Size(16, 15);
		var nButtonsCount = 7;
		var n=0;
		for(var i=0; i<nButtonsCount; i++){
			var tbb1 = new ToolBarButton();
			if(i==2 || i==5){
				tbb1.Style = ToolBarButtonStyle.Separator;
			}else{
				tbb1.ImageIndex = n;
				n++;
			}
			toolbar1.Buttons.Add(tbb1);
		}

		_this.Controls.Add(toolbar1);
	}

	public function toolbar1_OnButtonClick(e : ToolBarButtonClickEventArgs){
		var nIndex = toolbar1.Buttons.IndexOf(e.Button);
		switch (nIndex){
			case 0:	PA_DoBallsSwitchImage(); break;
			case 1:	PA_DoBallsSwitchImageX(); break;

			case 3: PA_DoEllipsePath(); break;
			case 4:	PA_DoBallsMovePlaced(); break;

			case 6: PA_DoSwitchTimer(); break;
		}
	}

	function PA_DoSwitchTimer(){
		if(isRunning){
			timer1.Change(System.Threading.Timeout.Infinite, nTimerInterval);
		}else{
			timer1.Change(0, nTimerInterval);
		}
		isRunning = !isRunning;
	}

	public function PaBalls2016JS20_Timer(o){
		if(nPathID==0){
			PA_DoBallsMove();
		}else{
			PA_DoEllipsePathMove();
		}
	}

	function PA_DoInvalidate(){
		if(isMinimized) return;
		panel1.Invalidate();
	}

	public function panel1_OnPaint(e : PaintEventArgs){
		var g = e.Graphics;

		/*
		g.DrawImage(imgBgJpeg, new System.Drawing.Rectangle(
			(nClientWidth-nBgJpegWidth)/2,(nClientHeight-nBgJpegHeight)/2, nBgJpegWidth, nBgJpegHeight),
			0, 0, nBgJpegWidth, nBgJpegHeight, GraphicsUnit.Pixel,imgAttrib);
			*/

		for(var i=0; i<nCount; i++){
			//g.DrawImage(A_imgBalls[A_objBalls[i].nIconID], A_objBalls[i].x, A_objBalls[i].y);
			g.DrawImage(A_imgBalls[A_objBalls[i].nIconID],
				new System.Drawing.Rectangle(A_objBalls[i].x, A_objBalls[i].y, nBallDiameter, nBallDiameter),
				0, 0, nBallDiameter, nBallDiameter, GraphicsUnit.Pixel,imgAttrib);
		}

	}

	public function panel1_Resize(){
		PA_DoBallsInit();
	}

	function PA_DoBallsInit(){
		if(panel1.Width>0 && panel1.Height>0){
			nClientWidth = panel1.Width;
			nClientHeight = panel1.Height;
			nRangeSpaceX = nClientWidth - nBallDiameter;
			nRangeSpaceY = nClientHeight - nBallDiameter;
			if(nRangeSpaceX>0 && nRangeSpaceY>0){
				if(nPathID==0){
					PA_DoBallsMovePlaced();
				}else{
					PA_DoEllipsePathPlaced();
				}
				PA_DoInvalidate();
				isMinimized = false;
			}else{
				isMinimized = true;
			}
		}else{
			isMinimized = true;
		}
	}

	function PA_DoAppInitialize(){
		var A_strBalls:String[] = ["ball-01.png", "ball-02.png", "ball-03.png", "ball-04.png", "ball-05.png",
			"ball-06.png", "ball-07.png", "ball-08.png", "ball-09.png", "ball-10.png"];
		var i;

		nCount1 = parseInt(nCount / 3);
		nCount2 = nCount - nCount1;

		imgBgJpeg = rm.GetObject("bg.jpg");
		nBgJpegWidth = imgBgJpeg.Width;
		nBgJpegHeight = imgBgJpeg.Height;

		for(i=0; i<10; i++){
			A_imgBalls[i] = rm.GetObject(A_strBalls[i]);
		}
		imgAttrib = new ImageAttributes(); ;
		imgAttrib.SetWrapMode(System.Drawing.Drawing2D.WrapMode.TileFlipXY);

		for(i=0; i<nCount; i++){
			A_objBalls[i] = new BallDef();
		}
	}

	function PA_DoBallsMovePlaced(){
		nPathID = 0;
		for(var i=0; i<nCount; i++){
			A_objBalls[i].Init(nRangeSpaceX, nRangeSpaceY, nMinD, nRangeD, rand.Next(10), rand);
		}
		PA_DoInvalidate();
	}

	function PA_DoBallsMove(){
		for(var i=0; i<nCount; i++){
			A_objBalls[i].Move();
		}
		PA_DoInvalidate();
	}

	function PA_DoBallsSwitchImage(){
		nBallIconID = (nBallIconID+1) % 10;
		for(var i=0; i<nCount; i++){
			A_objBalls[i].SetIcon(nBallIconID);
		}
		PA_DoInvalidate();
	}

	function PA_DoBallsSwitchImageX(){
		for(var i=0; i<nCount; i++){
			A_objBalls[i].SetIcon(rand.Next(10));
		}
		PA_DoInvalidate();
	}

	function PA_DoEllipsePath(){
		nPathID = 1;
		PA_DoEllipsePathPlaced();
	}

	function PA_DoEllipsePathPlaced(){
		var i;
		var n = 0;
		var a:float, b:float;
		var fAngle:double;
		var cx:int = parseInt((nClientWidth - nBallDiameter)/2);
		var cy:int = parseInt((nClientHeight - nBallDiameter)/2);
		a = nClientWidth / 4;
		b = nClientHeight / 8;
		for(i=0; i<nCount1; i++){
			fAngle = PI2 * i / nCount1 + fRotate1;
			A_objBalls[n].x = cx + parseInt(a * Math.sin(fAngle));
			A_objBalls[n].y = cy + parseInt(b * Math.cos(fAngle));
			A_objBalls[n].dx=0;
			A_objBalls[n].dy=0;
			n++;
		}

		a = nClientWidth * 3 / 7;
		b = nClientHeight * 2 / 7;
		for(i=0; i<nCount2; i++){
			fAngle = PI2 - PI2 * i / nCount2 - fRotate2;
			A_objBalls[n].x = cx + parseInt(a * Math.sin(fAngle));
			A_objBalls[n].y = cy + parseInt(b * Math.cos(fAngle));
			A_objBalls[n].dx=0;
			A_objBalls[n].dy=0;
			n++;
		}
		PA_DoInvalidate();
	}

	function PA_DoEllipsePathMove(){
		fRotate1 += PI2 / 100;
		fRotate2 += PI2 / 200;
		if(fRotate1>PI2) fRotate1=0;
		if(fRotate2>PI2) fRotate2=0;
		PA_DoEllipsePathPlaced();
	}

};

class BallDef {
	var x:int, y:int;
	var dx:int, dy:int;
	var nIconID:int;
	var nMaxX:int, nMaxY:int;
	var _this = this;

	public function SetIcon(nIconID : int){ _this.nIconID = nIconID; }
	public function Init(nMaxX:int, nMaxY:int, nMinD:int, nRangeD:int, nIconID:int, rand:Random){
		_this.nMaxX = nMaxX;
		_this.nMaxY = nMaxY;
		_this.nIconID = nIconID;

		_this.x = rand.Next(nMaxX);
		_this.y = rand.Next(nMaxY);
		_this.dx = nMinD+rand.Next(nRangeD);
		_this.dy = nMinD+rand.Next(nRangeD);
	}
	public function Move(){
		var nx:int, ny:int;
		nx = x + dx;
		if(nx>nMaxX || nx<0){
			dx = -dx;
		}else{
			x = nx;
		}
		ny = y + dy;
		if(ny>nMaxY || ny<0){
			dy = -dy;
		}else{
			y= ny;
		}
	}
};


Application.Run(new PaBalls2016JS20());