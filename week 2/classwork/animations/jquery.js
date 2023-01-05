'use strict';

// similar and same functionality as javscript => jquery the index comes first then the item
$("#main div").each((index, item)=>{
    var nextItem = (index +1) % $("#main div").length;
    $(item).click((e) =>{
        $(item).fadeOut(1000, ()=>{
            // callback functions run once original function has executed
            console.log("item is gone")
        });

        // if index = 0, grab the item and show the first sibling 
        if(nextItem == 0){
            $(item).siblings().first().fadeIn(1000);
        }else{
            $(item).next().fadeIn(1000);
        }
    })
})