// javascript is single threaded
// this means:
// cannot add additional threads for heavy duty work/calculations
// however there are ways to mimic it as multi thread

function isPrime (n) {
            
    if(n<2){
        return false;
    }

    for (var x =2; x<n; x++){
        if( n % x == 0){
            return false;
        }
    }
    return true;
}

var value = 100;
var count = 0;

for (var i=0; i<value; i++){
    var a = isPrime(i);
    if(a){
        count++;
        postMessage(count);
    }
}