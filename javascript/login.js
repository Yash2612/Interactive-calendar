function validate()
{
	var uname=document.getElementById("uname").value;
	var pas=document.getElementById("passw").value;
	
	if(uname=="admin" && pas=="password") return true;
	else
	{
		alert("Username or password is wrong");
		return false;
	}
}