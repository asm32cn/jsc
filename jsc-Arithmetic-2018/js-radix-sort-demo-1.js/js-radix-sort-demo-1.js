// js-radix-sort-demo-1.js

import System;
import Accessibility;

class LsdRedixSortDemo1{
    private const DN = 3;
    private const K = 10;
    private const radix = [1, 1, 10, 100];
    private var C = new Array(K);

    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function LsdRedixSort(data){
        for(var d = 1; d < DN; d++){
            CountingSort(data, d);
        }
    }

    function CountingSort(data, d){
        function GetDigit(x, d){
            return parseInt(x / radix[d]) % 10;
        }

        var n = data.length;
        for(var i = 0; i < K; i++){
            C[i] = 0;
        }
        for(var i = 0; i < n; i++){
            C[GetDigit(data[i], d)]++;
        }
        for(var i = 1; i < K; i++){
            C[i] += C[i - 1];
        }
        var B = new Array(n);
        for(var i = n - 1; i >= 0; i--){
            B[--C[GetDigit(data[i], d)]] = data[i];
        }
        for(var i = 0; i < n; i++){
            data[i] = B[i];
        }
    }
}

(function(){
    // var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
    var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

    var lrsd = new LsdRedixSortDemo1();
    lrsd.DisplayData(data);
    lrsd.LsdRedixSort(data);
    lrsd.DisplayData(data);
})();