// jsc-sort-tiobe-filename-demo-1.js
import System;
import Accessibiity;

class jsc_sort_tiobe_filename_demo_1{
	function sort_tiobe_filename_demo(files){
		var sorted = files;
		var nCount = sorted.length;

		return sorted;
	}
};

(function(){
	var A_strFiles = [
		"TIOBE Index for April 2018.html",
		"TIOBE Index for February 2018.html",
		"TIOBE Index for January 2018.html",
		"TIOBE Index for June 2018.html",
		"TIOBE Index for March 2018.html",
		"TIOBE Index for May 2018.html",
		"TIOBE-exchange-matrix-data.html",
		"TIOBE-exchange-matrix-data.py",
		"TIOBE-gernate-index-py2.py",
		"TIOBE-index.html",
		"TIOBE_matrixData.txt"];
	var nCount = A_strFiles.length;
	var stfd = new jsc_sort_tiobe_filename_demo_1();
	var sorted = stfd.sort_tiobe_filename_demo(A_strFiles);

	var strFormat = "{0,-2} {1,-36} {2,-36}";
	for(var i = 0; i < nCount; i++){
		Console.WriteLine(System.String.Format(strFormat, i, A_strFiles[i], sorted[i]));
	}

})();