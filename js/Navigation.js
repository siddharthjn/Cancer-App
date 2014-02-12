function legalCounter()
		{
	
		localStorage.setItem("counter", "0");
        var counter = JSON.parse(localStorage.getItem("counter"));
        console.log(counter);
    }

 var passwordHome ; 

function checkPassword()
{
	if(JSON.parse(localStorage.getItem("user")) != null)
	{
		passwordHome  = JSON.parse(localStorage.getItem("user")).NewPassword;

	}
	else
	{
		passwordHome = "2345";
	}
}
$( "#btnEnter" ).click(function() {
	checkPassword();
	console.log(passwordHome);
	if(document.getElementById("passcode").value == passwordHome)
	{
	/* if(JSON.parse(localStorage.getItem("user")) != null){
		$("#btnEnter").attr('href',"#pagDialog").attr("data-rel","dialog").button();
	  }
	else{ */
		var count = 0;
		if (localStorage.getItem("counter") == null)
		{   
			$.mobile.changePage("#legalNotice");
			localStorage.setItem("counter", "1");
			$("#btnEnter").attr("href","#legalNotice").button();
			count = 1;
			}
		else if(localStorage.getItem("counter") == "1" && count ==0)	
		 $("#btnEnter").attr("href","#pagMenu").button();	
	//} 
	 } 
	else
	{
		alert("Please enter your password correctly.")
	} 
});

$( "#legalNotice" ).click(function() {

   $("#noticeYes").attr("href","#pagUserInfo").button();	
	});

$( "#btnUserBack" ).click(function() {
	
	if(JSON.parse(localStorage.getItem("user")) != null){
		$("#btnUserBack").attr('href',"#pagMenu").button();
	}
	else{
		$("#btnUserBack").attr("href","#pagMenu").button();	
	}   
});
/*
$( "#btnDialogNo" ).click(function() {
	//If the user click on the button 'NO', than the value of 'skip' is NO
	if (typeof(Storage) == "undefined" ) {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    }
	else {
		try{
			localStorage.setItem("skip", "NO");
		}
		catch (e){
			if (e == QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else {
				alert("Error: Saving to local storage.");
			}
		}
	}	
});

$( "#btnDialogYes" ).click(function() {
	//If the user click on the button 'YES', than the value of 'skip' is YES
	if (typeof(Storage) == "undefined" ) {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    }
	else {
		try{
			localStorage.setItem("skip", "YES");
		}
		catch (e){
			if (e == QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else {
				alert("Error: Saving to local storage.");
			}
		}
		
	}	
});

$( "#pagHome" ).on("pagebeforeshow",function() { 
	//Checking whether the page should be skipped or not 
	
	if(localStorage.getItem("skip") == "YES")
	{	
                    
            
		$.mobile.changePage("#pagMenu");
	
	}
});*/