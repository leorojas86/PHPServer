function LoginRenderer()
{
}

LoginRenderer.prototype.render = function()
{
	var body 	   = document.getElementById("body");
	body.innerHTML = 	"<p>User Email</p>" +
						"<input type='text' id='user_email'    value = 'leo'> <br/><br/>" +
	  					"<p>User Password</p>" +
	  					"<input type='text' id='user_password' value = 'leo'> <br/><br/>" + 
	  					"<button type='button' onclick='onLoginButtonClick();'>Login</button>" +
	  					"<br><br><br>" +
	  					"<button type='button' onclick='onRegisterButtonClick();'>Register</button>";
};