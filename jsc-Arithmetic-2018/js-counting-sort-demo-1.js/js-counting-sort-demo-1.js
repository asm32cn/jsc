// js-counting-sort-demo-1.js

import System;
import Accessibility;

class CountingSortDemo1{
    private const k = 100;
    var C = new int[k];

    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function CountingSort(data){
        var n = data.length;
        for(var i = 0; i < k; i++){
            C[i] = 0;
        }
        for(var i = 0; i < n; i++){
            C[data[i]]++;
        }
        for(var i = 1; i < k; i++){
            C[i] += C[i -1];
        }
        var B = new int[n];
        for(var i = n - 1; i >= 0; i--){
            B[--C[data[i]]] = data[i];
        }
        for(var i = 0; i < n; i++){
            data[i] = B[i];
        }
    }
}

(function(){
    // var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
    var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

    var csd = new CountingSortDemo1();
    csd.DisplayData(data);
    csd.CountingSort(data);
    csd.DisplayData(data);
})();