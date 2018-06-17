// js-MS-GetHashCode-demo-1.js
import System;
import Accessibility;

class CscMsGetHashCodeDemo1{
	function MS_GetHash(s){
		var nHash = 0x15051505;
		var nHash2 = nHash;
		// var nSizeInt = size(int);
		return nHash;
	}
}

(function(){
	var A_strKeys = ["C", "C++", "Java", "C#", "Python", "Go", "Scala", "vb.net", "JavaScript", "PHP", "Perl", "Ruby", "绝世"];

	var cmhcd = new CscMsGetHashCodeDemo1();
	for(var i = 0, n = A_strKeys.length; i < n; i++){
		var nHash = cmhcd.MS_GetHash(A_strKeys[i]);
		Console.WriteLine("{0,-10} {1,-15} {2,10} {3,3}", i, A_strKeys[i], nHash, nHash % 33);
	}
})();