var SERVER_URL = 'http://localhost:3000';

$( "#btnUserClear" ).click(function(){
  clearUserForm();  
});

$( "#btnUserUpdate" ).click(function(){ //Event : submitting the form
  saveUserForm(); 
  return true;
});

function checkUserForm()
{ //Check for empty fields in the form
  //for finding current date 
  var d = new Date();
  var month = d.getMonth()+1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate = year + '/' +
  ((''+month).length<2 ? '0' : '') + month + '/' +
  ((''+date).length<2 ? '0' : '') + date;

  if(($("#txtEmail").val() != "") &&
    ($("#txtFirstName").val() != "") &&
    ($("#txtLastName").val() != "") &&
    ($("#txtHealthCardNumber").val() != "") &&
    ($("#datBirthdate").val() != "") && ($("#datBirthdate").val() <= currentDate)&&
    ($("#slcCancerType option:selected").val()  != "Select Cancer Type") &&
    ($("#slcCancerStage option:selected").val() != "Select Cancer Stage") &&
    ($("#slcTSHRange option:selected").val() != "Select TSH Range") ) 
  {
    return true;
  }
  else
  {
    return false;
  }  
}
function saveUserForm()
{
  if(checkUserForm())
  {  
    var user = {
      "Email": $("#txtEmail").val(),
      "FirstName": $("#txtFirstName").val(),
      "LastName": $("#txtLastName").val(),
      "HealthCardNumber": $("#txtHealthCardNumber").val(),
      "NewPassword": $("#changePassword").val(),
      "DOB": $("#datBirthdate").val(),
      "CancerType": $("#slcCancerType option:selected").val(),
      "CancerStage": $("#slcCancerStage option:selected").val(),
      "TSHRange": $("#slcTSHRange option:selected").val()
    };
    if($("#btnUserUpdate").val() == "Create") {
      var userData = {
        newUser: user
      }
      $.post(SERVER_URL + '/saveNewUser', userData, function(data) {
        alert("New User Created Successfully!");
        sessionStorage.user = JSON.stringify(data);
        $("#btnUserUpdate").val("Update");
        $.mobile.changePage("#pageMenu");
      }).fail(function(error) {
        alert(error.responseText);
      });
    } else {
      sessionStorage.user = JSON.stringify(user);
      $.mobile.changePage("#pageMenu");
    }
  }
  else
  {
    alert("Please complete the form properly.");    
  }
}

function clearUserForm()
{
  sessionStorage.clear("user");
  alert("The stored data have been removed");
  $("#slcCancerStage").val("Select Cancer Stage");
  $('#slcCancerStage').selectmenu('refresh',true);
  $("#slcCancerType").val("Select Cancer Type");
  $('#slcCancerType').selectmenu('refresh',true);
  $("#slcTSHRange").val("Select TSH Range");
  $('#slcTSHRange').selectmenu('refresh',true);
}

function showUserForm()
{ //Load the stored values in the form
  if(sessionStorage.user != null)
  {
    $("#btnUserUpdate").val("Update").button("refresh");
    var user = JSON.parse(sessionStorage.user);
    $("#txtEmail").val(user.email);
    $("#txtFirstName").val(user.firstName);
    $("#txtLastName").val(user.lastName);
    $("#txtHealthCardNumber").val(user.healthCardNumber);
    $("#changePassword").val(user.newPassword);
    $("#datBirthdate").val(user.dateOfBirth);
    $('#slcCancerType option[value='+user.cancerType+']').attr('selected', 'selected');
    $("#slcCancerType option:selected").val(user.cancerType);
    $('#slcCancerType').selectmenu('refresh', true);
    $('#slcCancerStage option[value='+user.cancerStage+']').attr('selected', 'selected');
    $("#slcCancerStage option:selected").val(user.cancerStage);
    $('#slcCancerStage').selectmenu('refresh', true);
    $('#slcTSHRange option[value='+user.tshRange+']').attr('selected', 'selected');
    $("#slcTSHRange option:selected").val(user.tshRange);
    $('#slcTSHRange').selectmenu('refresh', true);
  } else {
    $("#btnUserUpdate").val("Create").button("refresh");
  }
}
