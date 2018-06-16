// jsc-additive-hash-demo-1.js
import System;
import Accessibility;

class JscAdditiveHashDemo1{
	function AdditiveHash(s, nPrimary){
		var n = s.length, nHash = n;
		for(var i = 0; i < n; i++){
			nHash += s.charCodeAt(i);
		}
		return nHash % nPrimary;
	}
}

(function(){
	var A_strKeys = ["C", "C++", "Java", "C#", "Python", "Go", "Scala", "vb.net", "JavaScript", "PHP", "Perl", "Ruby"];
	var jahd = new JscAdditiveHashDemo1();

	for(var i = 0, n = A_strKeys.length; i < n; i++){
		var nHash = jahd.AdditiveHash(A_strKeys[i], 31);
		Console.WriteLine("{0,-10} {1,-15} {2,3}", i, A_strKeys[i], nHash);
	}
})();

/*
0          C                 6
1          C++               1
2          Java             18
3          C#               11
4          Python           28
5          Go               29
6          Scala            24
7          vb.net            6
8          JavaScript        2
9          PHP              18
10         Perl              4
11         Ruby             19
*/