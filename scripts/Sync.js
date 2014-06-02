var SERVER_URL = "http://localhost:3000";

$("#btnUpload").click(function() {
  if(sessionStorage.tbRecords) {
    var requestBody = {
      email: JSON.parse(sessionStorage.user).email,
      password: sessionStorage.password,
      newRecords: JSON.parse(sessionStorage.tbRecords)
    };
    $.post(SERVER_URL + "/syncRecords", requestBody, function(data) {
      alert("Records uploaded successfully!");
    }).fail(function(error) {
      alert(error.responseText);
    });
  } else {
    alert("No records to save!");
  }
});

$("#btnDownload").click(function() {
  var credentials = {
    email: JSON.parse(sessionStorage.user).email,
    password: sessionStorage.password
  };
  $.post(SERVER_URL + '/getRecords', credentials, function(data) {
    alert('Records downloaded successfully!');
    var tbRecords = JSON.parse(sessionStorage.tbRecords);
    for(var i=0; i<data.length; i++) {
      var exists = false;
      for(var j=0; j<tbRecords.length; j++) {
        if(tbRecords[j].date==data[i].date) {
          exists = true;
        }
      }
      if (!exists) {
        tbRecords.push(data[i]);
      }
    }
    sessionStorage.tbRecords = JSON.stringify(tbRecords);
  }).fail(function(error) {
    alert(error.responseText);
  })
});

$("#btnDownloadOverwrite").click(function() {
  var credentials = {
    email: JSON.parse(sessionStorage.user).email,
    password: sessionStorage.password
  };
  $.post(SERVER_URL + '/getRecords', credentials, function(data) {
    alert('Records downloaded successfully!');
    sessionStorage.tbRecords = JSON.stringify(data);
  }).fail(function(error) {
    alert(error.responseText);
  })
});