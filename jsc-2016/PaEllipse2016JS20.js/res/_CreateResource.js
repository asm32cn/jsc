import System;
import System.Drawing;
import System.IO;
import System.Resources;
import System.Xml.XmlTextReader;
import Accessibility;

class _CreateResource {
	var _this = this;

	public function _CreateResource(){
		var strCrlf = "\r\n";
		var strOutputFile = null;
		var isReady = false;

		try{
			var m_strFile_xml = "_CreateResource.xml";
			var xtr = new System.Xml.XmlTextReader(m_strFile_xml);
			//xtr.ReadToFollowing ("item");//.net2.0+
			while(xtr.Read()){
				if(xtr.Name.Equals("strOutputFile")){
					strOutputFile = xtr.GetAttribute("strFile");
					isReady = true;
					break;
				}
			}
			if(isReady){
				var rw = new ResourceWriter(strOutputFile);
				Console.Write("Output: " + strOutputFile + strCrlf);
				Console.Write("------------------------------" + strCrlf);

				while(xtr.Read()){
					var strTypeName = xtr.Name;
					var strItemName = "key";
					var strResource = "value";
					if(strTypeName.Equals("Icon")){
						var ico = new Icon(strItemName = xtr.GetAttribute("strFile"));
						rw.AddResource(strResource = xtr.GetAttribute("strResourceName"), ico);
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}else if(strTypeName.Equals("Image")){
						var image = Image.FromFile(strItemName = xtr.GetAttribute("strFile"));
						rw.AddResource(strResource = xtr.GetAttribute("strResourceName"), image);
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}else if(strTypeName.Equals("Data")){
						var fs = new FileStream(strItemName = xtr.GetAttribute("strFile"),
							FileMode.Open, FileAccess.Read, FileShare.Read);
						var nFileLength = parseInt(fs.Length);
						var br = new BinaryReader(fs);
						var byteBuffer = br.ReadBytes(nFileLength);
						if(byteBuffer.Length==nFileLength){
							rw.AddResource(strResource = xtr.GetAttribute("strResourceName"), byteBuffer);
						}else{
							Console.Write("Read fail." + strCrlf);
						}
						br.Close();
						fs.Close();
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}else if(strTypeName.Equals("String")){
						rw.AddResource(strItemName = xtr.GetAttribute("strResourceName"),
							strResource = xtr.GetAttribute("strContent"));
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}
				}
				rw.Generate();
				rw.Close();
				Console.Write("------------------------------" + strCrlf);
				Console.Write("Done." + strCrlf);
			}
		}catch(ex){
			Console.Write("Exception: " + ex.message + strCrlf);
		}
	}
}

(new _CreateResource());