$(document).ready(function(){
	$("#signUp-form").submit(function(e){
		e.preventDefault();
		var email = $("#signUp-email").val();
		var password = $("#signUp-password").val();

		firebase.database().ref("users").once("value").then(function(snap){
			var users = snap.val();
			try {
				var usersArr = Object.keys(users);
				var currentEmail, currentPassword;
				var noUser = true;
				for (var i=0;i<usersArr.length;i++){
					currentEmail = users[usersArr[i]].email;
					currentPassword = users[usersArr[i]].password;
					if (currentEmail.toLowerCase() == email.toLowerCase()){
						noUser = false;
						break;
					}
				}
			} catch (error) {
				noUser = true;
			}
			var message = $("<p></p>");
			if (noUser){
				firebase.database().ref("users").push({
					email: email,
					password: password
				});
				document.getElementById("signUp-form").submit();
			} else {
				$("#signUp-message").text("This email already exists").attr("STYLE","color: red;");
			}
		});
	});
	$("#logIn-form").submit(function(e){
		e.preventDefault();
		var email = $("#logIn-email").val();
		var password = $("#logIn-password").val();

		firebase.database().ref("users").once("value").then(function(snap){
			var users = snap.val();
			try {
				var usersArr = Object.keys(users);
				var currentEmail, currentPassword;
				var noUser = true;
				for (var i=0;i<usersArr.length;i++){
					currentEmail = users[usersArr[i]].email;
					currentPassword = users[usersArr[i]].password;
					if (currentEmail.toLowerCase() == email.toLowerCase() && currentPassword == password){
						noUser = false;
						break;
					}
				}
			} catch (error) {
				noUser = true;
			}
			if (!(noUser)){
				document.getElementById("logIn-form").submit();
			} else {
				$("#logIn-message").text("Email or password is incorrect.").attr("STYLE","color: red;");
			}
		});
	});
});