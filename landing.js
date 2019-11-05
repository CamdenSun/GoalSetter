var firebaseConfig = {
	apiKey: "AIzaSyDCk7bWbSnRr1M_9RgpUmGSra7_98OsS80",
	authDomain: "fir-39893.firebaseapp.com",
	databaseURL: "https://fir-39893.firebaseio.com",
	projectId: "fir-39893",
	storageBucket: "fir-39893.appspot.com",
	messagingSenderId: "817598980919",
	appId: "1:817598980919:web:69c9a6e1306703f170b0b2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
				$("#signUp-form").submit();
				message.text("Form has been submitted.");
			} else {
				message.text("This email already exists");
			}
			$("#signUp-content").append(message);
			console.log("message appended");
		});
	});
	$("#logIn-form").submit(function(e){
		e.preventDefault(e);
		var email = $("#logIn-email").val();
		var password = $("#logIn-password").val();

		firebase.database().ref("users").once("value").then(function(snap){
			var users = snap.val();
			var usersArr = Object.keys(users);
			var currentEmail, currentPassword;
			var noUser = true;
			for (var i=0;i<usersArr.length;i++){
				currentEmail = user[usersArr[i]].email;
				currentPassword = user[usersArr[i]].password;
				if (currentEmail.toLowerCase() == email.toLowerCase() && currentPassword == password){
					noUser = false;
					break;
				}
			}
			if (noUser){
				var message = $("<p></p>").text("Email or password is incorrect or does not exist");
				$("#logIn-content").append(message);
			} else {
				$("#logIn-form").submit();
			}
		});
	});
});