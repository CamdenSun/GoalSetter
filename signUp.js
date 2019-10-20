var db = firebase.database();

$(document).ready(function(){
	function signUp(){
		
	}
	$("#signUp-button").click(function(){
		var email = $("#signUp-email").val();
		var pass = $("#signUp-password").val();
		db.ref("users/").push({
			email: email,
			password: pass
		});
	});
	$("#logIn-button").click(function(){
		var email = $("#logIn-email").val();
		var pass = $("#logIn-password").val();
		db.ref("users/").once("value", function(snap){
			var users = snap.val();
			var keyArr = Object.keys(users);
			for (var i = 0; i < keyArr.length; i++){
				if (email == users[keyArr[i]].email && pass == users[keyArr[i]].password){
					document.cookie = keyArr[i];
					console.log(document.cookie);
				}
			}
		});
	})
});