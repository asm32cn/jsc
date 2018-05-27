// js-insertion-sort-dichotomy-demo-1.js

import System;
import Accessibility;

class InsertionSortDichotomyDemo1{
    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function InsertionSortDichotomy(data){
        var n = data.length;
        for(var i = 1; i < n; i++){
            var nGet = data[i];
            var nLeft = 0;
            var nRight = i - 1;
            while(nLeft <= nRight){
                var nMid = parseInt( (nLeft + nRight) / 2 );
                if(data[nMid] > nGet){
                    nRight = nMid - 1;
                }else{
                    nLeft = nMid + 1;
                }
            }
            for(var j = i - 1; j >= nLeft; j--){
                data[j + 1] = data[j];
            }
            data[nLeft] = nGet;
        }
    }
}

(function(){
    // var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
    var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

    var isdd = new InsertionSortDichotomyDemo1();
    isdd.DisplayData(data);
    isdd.InsertionSortDichotomy(data);
    isdd.DisplayData(data);
})();