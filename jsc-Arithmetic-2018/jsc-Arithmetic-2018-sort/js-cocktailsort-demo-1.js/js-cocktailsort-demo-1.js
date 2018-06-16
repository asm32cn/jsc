// js-cocktailsort-demo-1.js

import System;
import Accessibility;

class CocktailSortDemo1{
	function DisplayData(data){
		Console.WriteLine(data.join(', '));
	}

	function Swap(data, i, j){
		var temp = data[i];
		data[i] = data[j];
		data[j] = temp;
	}

	function CocktailSort(data){
		var n = data.length;
		var nLeft = 0;
		var nRight = n - 1;
		while(nLeft < nRight){
			for(var i = nLeft; i < nRight; i++){
				if(data[i] > data[i + 1]){
					Swap(data, i, i + 1);
				}
			}
			nRight--;
			for(var i = nRight; i > nLeft; i--){
				if(data[i - 1] > data[i]){
					Swap(data, i - 1, i);
				}
			}
			nLeft++;
		}
	}
}

(function(){
	// var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
	var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

	var csd = new CocktailSortDemo1();
	csd.DisplayData(data);
	csd.CocktailSort(data);
	csd.DisplayData(data);
})();