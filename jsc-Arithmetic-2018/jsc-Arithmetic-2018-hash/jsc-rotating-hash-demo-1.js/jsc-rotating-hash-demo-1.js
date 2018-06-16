// jsc-rotating-hash-demo-1.js
import System;
import Accessibility;

class CscRotatingHashDemo1{
	function RotatingHash(s, nPrime){
		var n = s.length, nHash = n;
		for(var i = 0; i < n; i++){
			nHash = (nHash << 4 >> 28) ^ s.charCodeAt(i);
		}
		return nHash % nPrime;
	}
}

(function(){
	var A_strKeys = ["C", "C++", "Java", "C#", "Python", "Go", "Scala", "vb.net", "JavaScript", "PHP", "Perl", "Ruby"];

	var crhd = new CscRotatingHashDemo1();
	for(var i = 0, n = A_strKeys.length; i < n; i++){
		Console.WriteLine("{0,-10} {1,-15} {2,3}", i, A_strKeys[i], crhd.RotatingHash(A_strKeys[i], 31));
	}
})();

/*
0          C                 5
1          C++              12
2          Java              4
3          C#                4
4          Python           17
5          Go               18
6          Scala             4
7          vb.net           23
8          JavaScript       23
9          PHP              18
10         Perl             15
11         Ruby             28
*/