// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************

(function(){
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

for (name in names) {
  var firstLetter = (names[name].charAt(0)).toLowerCase();
 
  if (firstLetter==="j"){
    byeSpeaker.speak(names[name]);
  }else{
    helloSpeaker.speak(names[name]);
  }
}
})()

