'use strict';

// setting key value pairs in local storage
localStorage.setItem('boo', 'far');
localStorage.setItem('you',  7);

// creating a json array
const jsonArray = {
    "array" :[0,1,2,3,4],
    "value" : 60,
    "type" : "string",
}

// converting array to string using JSON API - cant save data from object to local storage
const jsonString = JSON.stringify(jsonArray);
console.log(jsonString);
console.log(jsonArray);

// sets the local storage item with a key value pair
localStorage.setItem("test key", jsonString);

// returns the item with the key passed in
const jsontest = localStorage.getItem("test key");
console.log(jsontest);

// to be able to manipulate it like an object, then it must be retreived and parse the string and construct a json object
const obj = JSON.parse(jsontest);
console.log(obj);

// adding values to a current value in local storage

// because values are stored as string it will cocatonate them, the relevant values must be parsed first
var addval = 3 + localStorage.getItem("you");
console.log(addval); // returns 37

// parsing a retrieved value to innt
var addval2 = 3 + parseInt(localStorage.getItem("you"));
console.log(addval2); // returns 10

// remove a specific value using a key
localStorage.removeItem('boo');

// clears all local storage
localStorage.clear();