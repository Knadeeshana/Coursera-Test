// lec 54 55
document.addEventListener("DOMContentLoaded",
    function (event) {
        function sayHello() {
            this.textContent="said it"
            var name = document.getElementById("name").value;
            console.log(name)
            var message = "<h2>Hello " + name + "!</h2>";
            document.getElementById("content").innerHTML = message;
            if (document.getElementById("name").value === "student") {
                //document.getElementById("title").textContent="student"
                document.querySelector("h1")
                    .textContent = "Hello Student"
            }
        };

        /*document.querySelector("button")
        .addEventListener("click",sayHello);*/
        document.querySelector("button")
            .onclick = sayHello;

        document.querySelector("body")
        .addEventListener("mousemove",
        function(event){
            if (event.shiftKey===true) {
                console.log("x :"+event.clientX)
                console.log("y :"+event.clientY)
            }
            
        })
    }
)

