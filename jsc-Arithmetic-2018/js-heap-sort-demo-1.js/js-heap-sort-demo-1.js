// js-heap-sort-demo-1.js

import System;
import Accessibility;

class HeapSortDemo1{
    function DisplayData(data){
        Console.WriteLine(data.join(', '));
    }

    function HeapSort(data){
        // BuildHeap
        var nHeapSize= data.length;
        for(var i = parseInt(nHeapSize / 2) - 1; i >= 0; i--){
            Heapify(data, i, nHeapSize);
        }

        // HeapSort
        while(nHeapSize > 1){
            Swap(data, 0, --nHeapSize);
            Heapify(data, 0, nHeapSize);
        }
    }

    function Heapify(data, i, nSize){
        var nLeftChild = 2 * i + 1;
        var nRightChild = 2 * i + 2;
        var nMax = i;
        if(nLeftChild < nSize && data[nLeftChild] > data[nMax]){
            nMax = nLeftChild;
        }
        if(nRightChild < nSize && data[nRightChild] > data[nMax]){
            nMax = nRightChild;
        }
        if(nMax != i){
            Swap(data, i, nMax);
            Heapify(data, nMax, nSize);
        }
    }

    function Swap(data, i, j){
        var temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
}

(function(){
    // var data = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61, 91, 95, 42, 27, 36];
    var data = [76, 11, 11, 43, 78, 35, 39, 27, 16, 55, 1, 41, 24, 19, 54, 7, 78, 69, 65, 82];

    var hsd = new HeapSortDemo1();
    hsd.DisplayData(data);
    hsd.HeapSort(data);
    hsd.DisplayData(data);
})();