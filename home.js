$(document).ready(function(){
  $(".bar").attr("style","background-color:blue");
  //hides the goal template
  //$("#template").hide();
  const db = firebase.database();
  //parses url to get just the email, which was submitted by the form on landing.html
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
  }

  //stores email in variable
  var email = getQueryVariable('email');
  var userKey, goalsArr;
  //checks for which user this is based on the email
  db.ref("users").once("value").then(function(snap){
    var users = snap.val();
    var usersArr = Object.keys(users);
    var currentEmail;
    for (var i = 0; i < usersArr.length; i++){
      currentEmail = users[usersArr[i]].email;
      //after finding the user, displays all goals already submitted
      if (currentEmail.toLowerCase() == email.toLowerCase()){
        userKey = usersArr[i];
        try {
          var goalsObj = users[usersArr[i]].goals;
          var goalsArr = Object.keys(goalsObj);
          for (var i = 0; i < goalsArr.length; i++){
            var goals = goalsObj[goalsArr[i]];

            //create elements, add attributes and values
            var div, dtitle, bar, per;
            div = $("<div></div>").attr("id",goalsArr[i]);
            dtitle = $("<p></p>").text(goals.title);
            dtitle.attr("id",goalsArr[i]+"-title").attr("class","title");
            bar = $("<div></div>").attr("id",goalsArr[i]+"-bar").attr("class","bar");
            per = $("<div></div>").text(((goals.completed/goals.milestones)*100)+"%").attr("id",goalsArr[i]+"-per").attr("class", "percent");

            //append everything
            $("#goals-list").append(div);
            $("#"+goalsArr[i]).append(dtitle);
            $("#"+goalsArr[i]+"-title").after(bar);
            $("#"+goalsArr[i]+"-bar").append(per);
          }
        } catch (error){
          console.log(error);
        }
      }
    }
  });
  $("#goal-form").submit(function(e){
    e.preventDefault();
    var title, ms, done;
    title = $("#title").val();
    ms = $("#ms").val();
    done = $("#done").val();
    db.ref("users/"+userKey+"/goals/").push({
      title: title,
      milestones: ms,
      completed: done
    });
    window.location.reload();
  });
});
