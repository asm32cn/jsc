// js-bucket-sort-demo-1.js

import System;
import Accessibility;

class BucketSortDemo1{
	private const MAX = 100;
	private const bn = 5;
	var nFactor = parseInt(MAX % bn ? MAX / bn + 1 : MAX / bn);
	var C = new int[bn];

	function DisplayData(data){
		Console.WriteLine( data.join(", ") );
	}

	function BucketSort(data){
		var n = data.length;
		CountingSort(data);
		for(var i = 0; i < bn; i++){
			var nLeft = C[i];
			var nRight = (i == bn - 1 ? n - 1 : C[i + 1]- 1);
			if(nLeft < nRight){
				InsertionSort(data, nLeft, nRight);
			}
		}
	}

	function CountingSort(data){
		function MapToBucket(x){
			return parseInt(x / nFactor);
		}
		var n = data.length;

		for(var i = 0; i < bn; i++){
			C[i] = 0;
		}
		for(var i = 0; i < n; i++){
			C[MapToBucket(data[i])]++;
		}
		for(var i = 1; i < bn; i++){
			C[i] += C[i - 1];
		}
		var B = new int[n];
		for(var i = n - 1; i >= 0; i--){
			var b1 = MapToBucket(data[i]);
			B[--C[b1]] = data[i];
		}
		for(var i = 0; i < n; i++){
			data[i] = B[i];
		}
	}

	function InsertionSort(data, nLeft, nRight){
		for(var i = nLeft + 1; i <= nRight; i++){
			var nGet = data[i];
			var j = i - 1;
			while(j >= nLeft && data[j] > nGet){
				data[j + 1] = data[j];
				j--;
			}
			data[j + 1] = nGet;
		}
	}
}

(function(){
	// var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
	var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

	var bsd = new BucketSortDemo1();
	bsd.DisplayData(data);
	bsd.BucketSort(data);
	bsd.DisplayData(data);
})();