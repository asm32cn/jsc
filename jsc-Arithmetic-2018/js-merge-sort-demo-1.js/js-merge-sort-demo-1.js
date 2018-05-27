// js-merge-sort-demo-1.js

import System;
import Accessibility;

class MergeSortDemo1{
    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function Merge(data, nLeft, nMid, nRight){
        var nLen = nRight - nLeft + 1;
        var temp = new int[nLen];
        var nIndex = 0;
        var i = nLeft;
        var j = nMid + 1;
        while(i <= nMid && j <= nRight){
            temp[nIndex++] = data[i] <= data[j] ? data[i++] : data[j++];
        }
        while(i <= nMid){
            temp[nIndex++] = data[i++];
        }
        while(j <= nRight){
            temp[nIndex++] = data[j++];
        }
        for(var k = 0; k < nLen; k++){
            data[nLeft++] = temp[k];
        }
    }

    function MergeSortRecursion(data, nLeft, nRight){
        if(nLeft == nRight) return;

        var nMid = parseInt( (nLeft + nRight) / 2 );
        MergeSortRecursion(data, nLeft, nMid);
        MergeSortRecursion(data, nMid + 1, nRight);
        Merge(data, nLeft, nMid, nRight);
    }

    function MergeSortIteration(data){
        var n = data.length;
        var nLeft, nMid, nRight;
        for(var i = 1; i < n; i *= 2){
            nLeft = 0;
            while(nLeft + i < n){
                nMid = nLeft + i - 1;
                nRight = nMid + i < n ? nMid + i : n - 1;
                Merge(data, nLeft, nMid, nRight);
                nLeft = nRight + 1;
            }
        }
    }
}

(function(){
    // var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
    var data1 = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];
    var data2 = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

    var msd = new MergeSortDemo1();
    msd.DisplayData(data1);
    msd.MergeSortRecursion(data1, 0, data1.length - 1);
    msd.DisplayData(data1);

    Console.WriteLine();
    msd.DisplayData(data2);
    msd.MergeSortIteration(data2);
    msd.DisplayData(data2);
})();