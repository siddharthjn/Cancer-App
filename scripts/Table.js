/* Initializes the page, loads the users info. and
 * their records from the table.
 */
$("#pageRecords").on("pageinit",function(){
	loadUserInformation();
	listRecords();
});

// Removes all record data from localStorage 
$("#btnClearHistory").click(function(){
	localStorage.removeItem("tbRecords");
	listRecords();
	alert("All records have been deleted.");
});

/* The value of the Submit Record button is used
 * to determine which operation should be 
 * performed
 */
$("#btnAddRecord").click(function(){
	/*.button("refresh") function forces jQuery
	 * Mobile to refresh the text on the button
	 */
	$("#btnSubmitRecord").val("Add").button("refresh");
});

$("#frmNewRecordForm").submit(function(){
	var formOperation=$("#btnSubmitRecord").val();

	if(formOperation=="Add")
	{
		addRecord();
		$.mobile.changePage("#pageRecords");
	}
	else if(formOperation=="Edit")
	{
		editRecord($("#btnSubmitRecord").attr("indexToEdit"));
		$.mobile.changePage("#pageRecords");
		$("#btnSubmitRecord").removeAttr("indexToEdit");
	}

	/*Must return false, or else submitting form
	 * results in reloading the page
	 */
	return false;
});

$("#pageNewRecordForm").on("pageshow",function(){
	//We need to know if we are editing or adding a record everytime we show this page
	//If we are adding a record we show the form with blank inputs
	var formOperation=$("#btnSubmitRecord").val();

	if(formOperation=="Add")
	{
		clearRecordForm();
	}
	else if(formOperation=="Edit")
	{ 
		//If we are editing a record we load the stored data in the form
		showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
	}
});

function loadUserInformation()
{
	try
	{
		var user=JSON.parse(localStorage.getItem("user"));
		if(user != null)
		{
			$("#divUserSection").empty();
			var today=new Date();
			var dob=new Date(user.DOB);
			var age=Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
			
			//Display appropriate Cancer Stage
			if(user.CancerStage=="StageOne")
			{
				user.CancerStage="Stage I";
			}
			else if(user.CancerStage=="StageTwo")
			{
				user.CancerStage="Stage II";
			}
			else if(user.CancerStage=="StageThree")
			{
				user.CancerStage="Stage III";
			}
			else
			{
				user.CancerStage="Stage IV";
			}
			
			//Display appropriate TSH Range
			if(user.TSHRange=="StageA")
			{
				user.TSHRange="A: 0.01-0.1 mIU/L";
			}
			else if(user.TSHRange=="StageB")
			{
				user.TSHRange="B: 0.1-0.5 mIU/L";
			}
			else
			{
				user.TSHRange="C: 0.35-2.0 mIU/L";
			}
			
			$("#divUserSection").append("User's Name:"+user.FirstName+" "+user.LastName+"<br>Age: "+age+"<br>Health Card Number: "+user.HealthCardNumber+"<br>New Password : "+user.NewPassword+"<br>Cancer Type: "+user.CancerType+"<br>Cancer Stage: "+user.CancerStage+"<br>TSH Range: "+user.TSHRange);
			$("#divUserSection").append("<br><a href='#pageUserInfo' data-mini='true' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");
			$('#divUserSection [data-role="button"]').button(); // 'Refresh' the button
		}
	}
	catch(e)
	{
		/* Google browsers use different error 
		 * constant
		 */
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

function clearRecordForm()
{
	$('#datExamDate').val("");
	$('#txtTSH').val("");
	$('#txtThyroglobulin').val("");
	$('#txtSynthroidDose').val("");
	return true;
}

function compareDates(a, b)
{
  var x=new Date(a.Date);
  var y=new Date(b.Date);
  
  if(x>y)
  {
  	return 1;
  }
  else
  {
  	return -1;
  }
}

function listRecords()
{
	try
	{
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
	}
	catch(e)
	{
		/* Google browsers use different error 
		 * constant
		 */
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

	//Load previous records, if they exist
	if(tbRecords != null)
	{
		//Order the records by date
		tbRecords.sort(compareDates); 

		//Initializing the table
		$("#tblRecords").html(
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

		//Loop to insert the each record in the table
		for(var i=0;i<tbRecords.length;i++)
		{ 
			var rec=tbRecords[i];
			$("#tblRecords tbody").append("<tr>"+
				 "  <td>"+rec.Date+"</td>" +
				 "  <td>"+rec.TSH+"</td>" +
				 "  <td>"+rec.Tg+"</td>" +
				 "  <td>"+rec.SynthroidDose+"</td>" +
				 "	<td><a data-inline='true'  data-mini='true' data-role='button' href='#pageNewRecordForm' onclick='callEdit("+i+")' data-icon='edit' data-iconpos='notext'></a>"+
				 "	<a data-inline='true'  data-mini='true' data-role='button' href='#' onclick='callDelete("+i+")' data-icon='delete' data-iconpos='notext'></a></td>"+
				 "</tr>");
		}
		
		$('#tblRecords [data-role="button"]').button(); // 'Refresh' the buttons. Without this the delete/edit buttons wont appear
	}
	else
	{
		tbRecords=[]; //If there is no data,set an empty array
		$("#tblRecords").html("");
	}
	return true;
}

function showRecordForm(index)
{
	try
	{
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
		var rec=tbRecords[index];
		$('#datExamDate').val(rec.Date);
		$('#txtTSH').val(rec.TSH);
		$('#txtThyroglobulin').val(rec.Tg);
		$('#txtSynthroidDose').val(rec.SynthroidDose);
	}
	catch(e)
	{
		/* Google browsers use different error 
		 * constant
		 */
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

/* Checks that users have entered all valid info
 * and that the date they have entered is not in 
 * the future
 */
function checkRecordForm()
{
	//for finding current date 
	var d=new Date();
	var month=d.getMonth()+1;
  var day=d.getDate();
  var currentDate=d.getFullYear() + '/' +
  ((''+month).length<2 ? '0' : '') + month + '/' +
  ((''+day).length<2 ? '0' : '') + day;

	if(($("#txtTSH").val() != "") &&
 		  ($("#datExamDate").val() != "") && 
 		  ($("#datExamDate").val() <= currentDate)&&
		  (parseFloat($("#txtSynthroidDose").val()) < 1000000) &&
		  ($("#txtSynthroidDose").val() != ""))
	{
		return true;
	}
	else
	{
		return false;
	}	
}

function callEdit(index)
{
	$("#btnSubmitRecord").attr("indexToEdit", index);
	/*.button("refresh") function forces jQuery
	 * Mobile to refresh the text on the button
	 */
	$("#btnSubmitRecord").val("Edit").button("refresh");
}

// Delete the given index and re-display the table
function callDelete(index)
{
	deleteRecord(index);
	listRecords();
}

function addRecord() 
{
	if (typeof(Storage)===undefined) 
	{
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
  }
	else if(checkRecordForm())
	{	
		var record={
			"Date"  		  	: $('#datExamDate').val(),
			"TSH"			  	  : $('#txtTSH').val(),
			"Tg" 				    : $('#txtThyroglobulin').val(),
			"SynthroidDose" : $('#txtSynthroidDose').val()
		};

		try
		{
			var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));

			tbRecords.push(record);
			localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
			alert("Saving Information");
			listRecords();
			clearRecordForm();
		}
		catch(e)
		{
			/* Google browsers use different error 
			 * constant
			 */
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
	else
	{
		alert("Please complete the form properly.");
	}

	return true;
}

function deleteRecord(index)
{
	try
	{
		var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));

		tbRecords.splice(index, 1);
		
		if(tbRecords.length==0)
		{
			/* No items left in records, remove entire 
			 * array from localStorage
			 */
			localStorage.removeItem("tbRecords");
		}
		else
		{
			localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
		}
	}
	catch(e)
	{
		/* Google browsers use different error 
		 * constant
		 */
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

function editRecord(index)
{
	if(checkRecordForm())
	{
		try
		{
			var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
			tbRecords[index] ={
				"Date"  		    : $('#datExamDate').val(),
				"TSH"			      : $('#txtTSH').val(),
				"Tg"      			: $('#txtThyroglobulin').val(),
				"SynthroidDose" : $('#txtSynthroidDose').val()
			};//Alter the selected item in the array
			localStorage.setItem("tbRecords", JSON.stringify(tbRecords)); //Saving array to local storage
			clearRecordForm();
			listRecords();
		}
		catch(e)
		{
			/* Google browsers use different error 
			 * constant
			 */
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
	else
	{
		alert("Please complete the form properly.");
	}
}