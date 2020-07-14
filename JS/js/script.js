// var x = "Hello World!";
// message="in global"
// console.log("message :"+message);

// var a=function() {
//     var message="in a";
//     console.log("message :"+message);

//     var b=function(){
//         console.log("message :"+message);
//     }
//     b();
// }
// a();

//object creation---
// var company=new Object();
// company["name"]="facebook";
// company.ceo=new Object();
// company.ceo.name="mark";
// company.stock=110
// console.log(company);

// var facebook={
//     name:"facebook",
//     ceo:{
//         name:"makr",
//         next:"suckerburg",
//     },
// };
// console.log(facebook);
/*
function multiply(x,y){
    return x*y
}

console.log(multiply(5,4));
multiply.version="kavindu";
console.log(multiply.version);

function Circle(radius) {
    this.radius=radius;
}

Circle.prototype.area=
function() {
    return Math.PI*Math.pow(this.radius,2);
}
mycircle=new Circle(10,20);
console.log(mycircle);*/
(function(window){
    var Kumaragreeter={};
    Kumaragreeter.name="kumara";
    var greet="Hi"
    Kumaragreeter.Hi=function(){
        console.log(greet + Kumaragreeter.name)
        console.log(this)
    };
    window.Kumaragreeter=Kumaragreeter;
})(window)
