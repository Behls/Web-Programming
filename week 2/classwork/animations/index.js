'use strict';

console.log("oh my god");
// get the children of the the main container - which are the the divs inside
// this creates a collection
let divCollection = document.getElementById("main").children;

// if you want an array
let divArray = Array.from(document.getElementById("main").children);

console.log(divArray.length);
// cycle through the array, can use a for loop, but this is easier if dealing with multiple values
// needs two items - the item itself and its index value
divArray.forEach((item, index)=>{
    // textContent is ideal if your looking for the actual text content within an element
    // as item will console log HtmlDivElement
    console.log('the item is ' +item.textContent+ ' at the index value of: '+index);

    item.addEventListener("click", (e) =>{
        e.target.style.display = "none";

        // long way to do this
        // if else statement to basically if the index tries to go further than the array length, reset index to 0
        // length of the array is 4 (length -1) is used here because index starts at 0 (0-3 = 4 items)

        // let arrayLength = divArray.length - 1;
        if(index>=arrayLength){
            index=0;
            divArray[index].style.display = "block";
        }else{
            divArray[index+1].style.display = "block";
        }

        // easier way to use modulus on the length of an array
        // this basically gets the next index value and if the nextItem / array length = 0 it creates a loop
        // if there is a remainder it will continue to the next item 

        let nextItem = (index + 1) % divArray.length;
        divArray[nextItem].style.display = "block";

    })


});