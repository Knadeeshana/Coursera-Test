// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", function () {
        
        // Call server to get the name
        // $ajaxUtils
        //   .sendGetRequest("data/name.txt", 
        //     function (request) {
        //       var name = request.responseText;

        //       document.querySelector("#content")
        //         .innerHTML = "<h2>Hello " + name + "!</h2>";
        //     });

        $ajaxUtils
        .sendGetRequest("data/names.json", 
          function (res) {
            console.log(res);
            var message=res.firstName+" "+res.lastName;
            if (res.likesChineseFood){
              message+=" Likes Chinese";
            }else{
              message+=" Hates chinese";
            }

            document.querySelector("#content")
              .innerHTML = "<h2>Hello " + message + "!</h2>";
          });

        
      });
  }
);





