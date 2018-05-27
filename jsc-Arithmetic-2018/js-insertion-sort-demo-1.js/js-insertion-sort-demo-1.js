// js-insertion-sort-demo-1.js

import System;
import Accessibility;

class InsertionSortDemo1{
    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function InsertionSort(data){
        var n = data.length;
        for(var i = 1; i < n; i++){
            var nGet = data[i];
            var j = i - 1;
            while(j >= 0 && data[j] > nGet){
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

    var isd = new InsertionSortDemo1();
    isd.DisplayData(data);
    isd.InsertionSort(data);
    isd.DisplayData(data);
})();