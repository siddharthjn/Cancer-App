$( "#btnEnter" ).click(function() {
	
	if(JSON.parse(localStorage.getItem("user")) != null){
		$("#btnEnter").attr('href',"#pagDialog").attr("data-rel","dialog").button();
	}
	else{
		$("#btnEnter").attr("href","#pagUserInfo").button();	
	}   
});

$( "#btnUserBack" ).click(function() {
	
	if(JSON.parse(localStorage.getItem("user")) != null){
		$("#btnUserBack").attr('href',"#pagMenu").button();
	}
	else{
		$("#btnUserBack").attr("href","#pagHome").button();	
	}   
});

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
});