$("#setGoal-form").submit(function(e){
  e.preventDefault();
  var x,y,name,a,b,answer;
  milestones=$("#milestones").val();

  $("#box").text(milstones + " done!");
  var x,y,input2,a,b,answer;
  completed=document.getElementById("completed").value;
  var b = y;
  var c =(100 /(b/ r));
  var element = document.getElementById("Bar");    
  var width = 0;
  var width2 = ( c);

  var identity = setInterval(BarGrowth, c);
  function BarGrowth() {
 
    if (width >= c) {
      clearInterval(identity);
    } else {

      width++;
      element.style.width = width2 +"%";  
      element.innerHTML = width2 +"%";
    }
  }
});

 