// jsc-sort-tiobe-filename-demo-1.js
import System;
import Accessibiity;

class jsc_sort_tiobe_filename_demo_1{
	var _month = {'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
		'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12};
	var _regex = /^TIOBE Index for (\w+) (\d{4})\.html$/;

	function sort_tiobe_filename_demo(files){
		var nCount = files.length;

		// init buff
		var n = 0, buff = [];
		for(var i = 0; i < nCount; i++){
			var m = _regex.exec(files[i]);
			var nDatespan = m ? parseInt(m[2]) * 100 + ( _month[m[1]] || 0 ) : ++n;
			buff.push([i, nDatespan]);
		}

		function getIndex(i){ return buff[i][0]; }
		function setIndex(i, n){ buff[i][0] = n; }
		function getData(i){ return buff[getIndex(i)][1]; }

		// insertion sort
		for(var i = 0; i < nCount - 1; i++){
			var nMin = i;
			for(var j = i + 1; j < nCount; j++){
				if(getData(j) < getData(nMin)){
					nMin = j;
				}
			}
			if( i != nMin ){
				var t = getIndex(i);
				setIndex(i, getIndex(nMin));
				setIndex(nMin, t);
			}
		}

		// generate result
		var sorted = Array(nCount);
		for(var i = 0; i < nCount; i++){
			// Console.WriteLine(i + ' ' + buff[i][0] + ' ' + buff[i][1]);
			sorted[i] = files[getIndex(i)];
		}
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
	Console.WriteLine(System.String.Format(strFormat, '@', 'Source data', 'Sorted data'));
	Console.WriteLine(System.String.Format(strFormat, '==', '==================', '=================='));
	for(var i = 0; i < nCount; i++){
		Console.WriteLine(System.String.Format(strFormat, i, A_strFiles[i], sorted[i]));
	}

})();

/*
@  Source data                          Sorted data
== ==================                   ==================
0  TIOBE Index for April 2018.html      TIOBE-exchange-matrix-data.html
1  TIOBE Index for February 2018.html   TIOBE-exchange-matrix-data.py
2  TIOBE Index for January 2018.html    TIOBE-gernate-index-py2.py
3  TIOBE Index for June 2018.html       TIOBE-index.html
4  TIOBE Index for March 2018.html      TIOBE_matrixData.txt
5  TIOBE Index for May 2018.html        TIOBE Index for January 2018.html
6  TIOBE-exchange-matrix-data.html      TIOBE Index for February 2018.html
7  TIOBE-exchange-matrix-data.py        TIOBE Index for March 2018.html
8  TIOBE-gernate-index-py2.py           TIOBE Index for April 2018.html
9  TIOBE-index.html                     TIOBE Index for May 2018.html
10 TIOBE_matrixData.txt                 TIOBE Index for June 2018.html
*/