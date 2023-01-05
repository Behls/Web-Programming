"use strict";

var people;

$.ajax({
    url: "./people.json",
    dataType: "json",
    success: function(response){
        people = response;
        console.log(people);
    } 
})