"use strict";

var XHR = new XMLHttpRequest();

var people;

// handle the response

XHR.onreadystatechange = () => {
    // can replace this with XHR
    if(XHR.readyState == 4 && XHR.status == 200){
        people = JSON.parse(XHR.responseText);
        console.log(people);
        
    }if(XHR.readyState == 4 && XHR.status == 404){
        console.log("errrrrror")
    }
}

// open a request -> takes 3 parameters 1) request type get or post 2) url the request to be sent to 3) if its asynchronous true/false
XHR.open("GET", "./phpexample.php", true)
XHR.send();