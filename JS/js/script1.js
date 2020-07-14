(function(){
    var kevingreeter={};
    kevingreeter.name="Kevin";
    var greet="Hello";
    kevingreeter.Hello=function(){
        console.log(greet + kevingreeter.name)
    };
    window.kevingreeter=kevingreeter;

})(window)
