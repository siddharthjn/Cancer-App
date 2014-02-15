//Global variables definition 
var operation; //"A"=Adding; "E"=Editing
var selected_index;//Index of the selected record item
var tbRecords;//Array of records 

$( "#pageRecords" ).on("pageinit",function() {
	selected_index = -1;
	loadUserInformation();
	listRecords();
});
$( "#btnClearHistory" ).click(function() {
	localStorage.removeItem("tbRecords");
	listRecords();
	alert("The history was reseted");
	return false;
});
$( "#btnAddRecord" ).click(function() {
	operation = "A"; 
	$("#btnSubmitRecord").val("Submit New Record");
});

$( "#frmNewRecordForm" ).submit(function() {
	if(operation=="A"){
		addRecord();
		$.mobile.changePage("#pagRecords");
		return false;
	}
	else{
		editRecord();
		$.mobile.changePage("#pagRecords");
		return false;
	}
});
$( "#pagNewRecordForm" ).on("pageshow",function() {
	//We need to know if we are editing or adding a record everytime we show this page
	//If we are adding a record we show the form with blank inputs
	if(operation=="A"){
		clearRecordForm();
	}
	else{ 
		//If we are editing a record we load the stored data in the form
		showRecordForm();
	}
});

function loadUserInformation() {
	var user = JSON.parse(localStorage.getItem("user"));
	if(user != null){
		$("#divUserSection").empty();
		var today = new Date();
		var dob = new Date(user.DOB);
		var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
		
		if(user.CancerStage=="StageOne") {user.CancerStage="Stage I";}
		else if(user.CancerStage=="StageTwo") {user.CancerStage="Stage II";}
		else if(user.CancerStage=="StageThree") {user.CancerStage="Stage III";}
		else {user.CancerStage="Stage IV";}
		
		if(user.TSHRange=="StageA") {user.TSHRange="A: 0.01-0.1 mIU/L";}
		else if(user.TSHRange=="StageB") {user.TSHRange="B: 0.1-0.5 mIU/L";}
		else {user.TSHRange="C: 0.35-2.0 mIU/L";}
		
		$("#divUserSection").append("User's Name:"+user.FirstName+" "+user.LastName+"<br>Age: "+age+"<br>Health Card Number: "+user.HealthCardNumber+"<br>New Password : "+user.NewPassword+"<br>Cancer Type: "+user.CancerType+"<br>Cancer Stage: "+user.CancerStage+"<br>TSH Range: "+user.TSHRange);
		$("#divUserSection").append("<br><a href='#pageUserInfo' data-mini='true' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");
		$('#divUserSection [data-role="button"]').button(); // 'Refresh' the button
	}
	return true;
}

function clearRecordForm() {
	$('#datExamDate').val("");
	$('#txtTSH').val("");
	$('#txtThyroglobulin').val("");
	$('#txtSynthroidDose').val("");
	return true;
}

function compareDates(a, b)
{
  var x = new Date(a.Date);
  var y = new Date(b.Date);
  if(x>y){return 1;}
  else{return -1;}
}

function listRecords() {
	tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
	if(tbRecords != null){ //We need to know if there are stored information( and load the table case true )
		tbRecords.sort(compareDates); //Ordering the records by date
		$("#tblRecords").html( //Initializing the table
			"<thead>"+
			"   <tr>"+
			"   	<th>Date</th>"+
			"   	<th><abbr title='Thyroid Stimulating Hormone'>TSH(mlU/l)</abbr></th>"+
			"   	<th><abbr title='Thyroglobulin'>Tg(ug/L)</abbr></th>"+
			"   	<th>Synthroid Dose(ug)</th>"+
			"   	<th>Edit / Delete</th>"+
			"   </tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
		);

		for(var i=0;i<tbRecords.length;i++){ //Loop to insert the each record in the table
			var rec = tbRecords[i];
			$("#tblRecords tbody").append("<tr>"+
										 "  <td>"+rec.Date+"</td>" +
										 "  <td>"+rec.TSH+"</td>" +
										 "  <td>"+rec.Tg+"</td>" +
										 "  <td>"+rec.SynthroidDose+"</td>" +
										 "	<td><a data-inline='true'  data-mini='true' data-role='button' href='#pagNewRecordForm' onclick='callEdit("+i+")' data-icon='edit' data-iconpos='notext'></a>"+
										 "	<a data-inline='true'  data-mini='true' data-role='button' href='#' onclick='callDelete("+i+")' data-icon='delete' data-iconpos='notext'></a></td>"+
										 "</tr>");
		}
		$('#tblRecords [data-role="button"]').button(); // 'Refresh' the buttons. Without this the delete/edit buttons wont appear
	}
	else{
		tbRecords = []; //If there is no data,set an empty array
		$("#tblRecords").html("");
	}
	return true;
}

function showRecordForm(){
	var rec = tbRecords[selected_index];
	$('#datExamDate').val(rec.Date);
	$('#txtTSH').val(rec.TSH);
	$('#txtThyroglobulin').val(rec.Tg);
	$('#txtSynthroidDose').val(rec.SynthroidDose);
}

function checkRecordForm() {
	//for finding current date 
	var d = new Date();
	var month = d.getMonth()+1;
    var day = d.getDate();
    var currentDate = d.getFullYear() + '/' +
    ((''+month).length<2 ? '0' : '') + month + '/' +
    ((''+day).length<2 ? '0' : '') + day;
	if( ($("#txtTSH").val() != "") &&
		($("#datExamDate").val() != "") && ($("#datExamDate").val() <= currentDate)&&
		(parseFloat($("#txtSynthroidDose").val()) < 1000000) &&
		($("#txtSynthroidDose").val() != "")){
		return true;
	}
	else{
		return false;
	}	
}

function callEdit(index) {
	selected_index = index;
	operation = "E";
	$("#btnSubmitRecord").val("Edit Record");
	return true;
}

function callDelete(index) {
	selected_index = index;
	deleteRecord();
	listRecords();
	return true;
}

function addRecord() 
{
	if (typeof(Storage)===undefined ) 
	{
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
  }
	else if(checkRecordForm())
	{	
		var record = {
		"Date"  		  	: $('#datExamDate').val(),
		"TSH"			  	  : $('#txtTSH').val(),
		"Tg" 				    : $('#txtThyroglobulin').val(),
		"SynthroidDose" : $('#txtSynthroidDose').val()
		};
		try{
			tbRecords.push(record);
			localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
			alert("Saving Information");
			listRecords();
			clearRecordForm();
		}
		catch (e){
			if (window.navigator.vendor==="Google Inc.")
			{
				if(e == DOMException.QUOTA_EXCEEDED_ERR) 
				{
					alert("Error: Local Storage limit exceeds.");
				}
			}
			else if(e == QUOTA_EXCEEDED_ERR){
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
	}
	else{
		alert("Please complete the form properly.");
	}
	return true;
}
function deleteRecord() {
	tbRecords.splice(selected_index, 1);
	if(tbRecords.length==0){
		localStorage.removeItem("tbRecords");
	}
	else{
		localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
	}
	return true;
}
function editRecord() {
	if(checkRecordForm()){
		tbRecords[selected_index] = {
			"Date"  		  	: $('#datExamDate').val(),
			"TSH"			  	: $('#txtTSH').val(),
			"Tg" 				: $('#txtThyroglobulin').val(),
			"SynthroidDose" 	: $('#txtSynthroidDose').val()
		};//Alter the selected item in the array
		localStorage.setItem("tbRecords", JSON.stringify(tbRecords)); //Saving array to local storage
		clearRecordForm();
		listRecords();
	}
	else{
		alert("Please complete the form properly.");
	}
    return true;
}