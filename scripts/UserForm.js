$( "#pageUserInfo" ).on("pageinit",function() { //Event : Initializating the page
	showUserForm(); 
});

$( "#btnUserClear" ).click(function() {
	clearUserForm();  
	return false;
});

$( "#frmUserForm" ).submit(function() { //Event : submiting the form
	saveUserForm(); 
	return false;
});

function checkUserForm() { //Check for empty fields in the form
	//for finding current date 
	var d = new Date();
	var month = d.getMonth()+1;
    var day = d.getDate();
    var currentDate = d.getFullYear() + '/' +
    ((''+month).length<2 ? '0' : '') + month + '/' +
    ((''+day).length<2 ? '0' : '') + day;

	if(($("#txtFirstName").val() != "") &&
		($("#txtLastName").val() != "") &&
		($("#txtHealthCardNumber").val() != "") &&
		($("#datBirthdate").val() != "") && ($("#datBirthdate").val() <= currentDate)&&
		($("#slcCancerType option:selected").val()  != "Select Cancer Type") &&
		($("#slcCancerStage option:selected").val() != "Select Cancer Stage") &&
		($("#slcTSHRange option:selected").val() != "Select TSH Range") ) {
		return true;
	}
	else{
		return false;
	}	
}
function saveUserForm() {

	if (typeof(Storage) == "undefined") {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    }
	else if(checkUserForm()){	
		var user = {
		"FirstName"    			: $("#txtFirstName").val(),
		"LastName"  			: $("#txtLastName").val(),
		"HealthCardNumber"  	: $("#txtHealthCardNumber").val(),
		"NewPassword"           : $("#changePassword").val(),
		"DOB" 					: $("#datBirthdate").val(),
		"CancerType" 			: $("#slcCancerType option:selected").val(),
		"CancerStage" 			: $("#slcCancerStage option:selected").val(),
		"TSHRange" 				: $("#slcTSHRange option:selected").val()
		};
		try{
			localStorage.setItem("user", JSON.stringify(user));
			loadUserInformation();
			alert("Saving Information");

			$.mobile.changePage("#pageMenu");
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
	else{
		alert("Please complete the form properly.");		
	}

}

function clearUserForm() {
	localStorage.removeItem("user");
	alert("The stored data have been removed");
	$("#slcCancerStage").val("Select Cancer Stage");
	$('#slcCancerStage').selectmenu('refresh',true);
	$("#slcCancerType").val("Select Cancer Type");
	$('#slcCancerType').selectmenu('refresh',true);
	$("#slcTSHRange").val("Select TSH Range");
	$('#slcTSHRange').selectmenu('refresh',true);
	return true;
}

function showUserForm() { //Load the stored values in the form
	var user = JSON.parse(localStorage.getItem("user"));
	if(user != null){
		$("#txtFirstName").val(user.FirstName);
		$("#txtLastName").val(user.LastName);
		$("#txtHealthCardNumber").val(user.HealthCardNumber);
		$("#changePassword").val(user.NewPassword);
		$("#datBirthdate").val(user.DOB);
		$('#slcCancerType option[value='+user.CancerType+']').attr('selected', 'selected');
		$("#slcCancerType option:selected").val(user.CancerType);
		$('#slcCancerType').selectmenu('refresh', true);
		$('#slcCancerStage option[value='+user.CancerStage+']').attr('selected', 'selected');
		$("#slcCancerStage option:selected").val(user.CancerStage);
		$('#slcCancerStage').selectmenu('refresh', true);
		$('#slcTSHRange option[value='+user.TSHRange+']').attr('selected', 'selected');
		$("#slcTSHRange option:selected").val(user.TSHRange);
		$('#slcTSHRange').selectmenu('refresh', true);
	}
	return true;
}