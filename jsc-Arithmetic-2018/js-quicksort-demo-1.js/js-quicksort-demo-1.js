// js-quicksort-demo-1.js

import System;
import Accessibility;

class QuickSortDemo1{
	function DisplayData(data){
		Console.WriteLine(data.join(', '));
	}

	function QuickSort(data, nLeft, nRight){
		if(nLeft < nRight){
			var nKey = data[nLeft];
			var nLow = nLeft;
			var nHigh = nRight;
			while(nLow < nHigh){
				while(nLow < nHigh && data[nHigh] >= nKey){
					nHigh--;
				}
				data[nLow] = data[nHigh];
				while(nLow < nHigh && data[nLow] <= nKey){
					nLow++;
				}
				data[nHigh] = data[nLow];
			}
			data[nLow] = nKey;

			QuickSort(data, nLeft, nLow - 1);
			QuickSort(data, nLow + 1, nRight);
		}
	}
}

(function(){
	// var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
	var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

	var qsd = new QuickSortDemo1();
	qsd.DisplayData(data);
	qsd.QuickSort(data, 0, data.length - 1);
	qsd.DisplayData(data);
})();