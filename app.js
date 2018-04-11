function getDataRangeFromServer(startIndex, endIndex){
     var returnString;
     if(endIndex<startIndex){
        return new Promise(function(reject){
            reject("endIndex should be greater than startIndex");
        });
     }
    return new Promise(function(resolve){
        if((endIndex-startIndex)>1){
            returnString = "["+startIndex+"...."+endIndex+"]";
        }else{
            returnString = "["+startIndex+","+endIndex+"]";
        }
        var startBucket = parseInt(startIndex/25);
        var endBucket = parseInt(endIndex/25);
        var pagesToSearch=[];
        if(startBucket == endBucket){
            pagesToSearch.push(startBucket);
        }else{
            for(var startPage=startBucket;startPage<=endBucket;startPage++){
                pagesToSearch.push(startPage);
            }
        }
        var areStartAndEndBucketsNotSame = false;
        var i = 1;
        if(startBucket<endBucket){
            areStartAndEndBucketsNotSame = true;
            while(areStartAndEndBucketsNotSame){
                startBucket+=1;
                i++;
                if(startBucket==endBucket){
                    areStartAndEndBucketsNotSame = false;
                }
            }
        }
        returnString=returnString+" calls getPageFromServer "+i+" time with pageIndex " + pagesToSearch;
        resolve(returnString);
    });

}

var promise = getDataRangeFromServer(process.argv[2], process.argv[3]);
promise.then(function(resolve){
    console.log(resolve);
})
//getDataRangeFromServer(0, 49);
//getDataRangeFromServer(5, 51);
//getDataRangeFromServer(50, 99);
//getDataRangeFromServer(55, 99);
