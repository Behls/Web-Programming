
const allListItems = $('li');
console.log(allListItems);

const getallList = document.getElementsByTagName('li');
console.log(getallList);

const ulList = $('ul li');
console.log(ulList);

var getUl = document.getElementsByTagName('ul');
var newArray =[]

console.log(getUl);
Object.values(getUl).forEach( itemList =>{
    newArray =[...newArray, ...Object.values(itemList.children)]
});
console.log(newArray);