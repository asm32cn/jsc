// js-selectionsort-demo-1.js

import System;
import Accessibility;

class SelectionSortDemo1{
    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function SelectionSort(data){
        var n = data.length;
        for(var i = 0; i < n - 1; i++){
            var nMin = i;
            for(var j = i + 1; j < n; j++){
                if(data[j] < data[nMin]){
                    nMin = j;
                }
            }
            if(nMin != i){
                var temp = data[i];
                data[i] = data[nMin];
                data[nMin] = temp;
            }
        }
    }
}

(function(){
    // var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
    var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

    var ssd = new SelectionSortDemo1();
    ssd.DisplayData(data);
    ssd.SelectionSort(data);
    ssd.DisplayData(data);
})();
