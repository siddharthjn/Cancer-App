function drawGraph()
{
  /* If no recordes exist, notify user and 
   * redirect to main page
   */
  if(localStorage.getItem("tbRecords") === null)
  {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  }
  else
  {
    $(location).attr("href", "#pageGraph");

    var c=document.getElementById("GraphCanvas");
    var ctx=c.getContext("2d");

    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0, 0, 500, 500);

    var gtx=c.getContext("2d");
    
    var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
    
    //Arrays to hold the x and y values
    var TSHarr=new Array();
    var Datearr=new Array();
    
    var m=0;
    var d=0;
    
    tbRecords.sort(compareDates);
    
    /* Iterate through the patients records,
     * Plotting each point in an array
     * for the graph
     */
    for (var i=0; i < tbRecords.length; i++)
    {
      Datearr[i]=new Date(tbRecords[i].Date);

      /*These methods start at 0, must increment
       * by one to compensate
       */
      m=Datearr[i].getMonth() + 1;
      d=Datearr[i].getDate() + 1;

      //The x-axis label
      Datearr[i]=(m + "/" + d);

      //The point to plot
      TSHarr[i]=parseFloat(tbRecords[i].TSH);
    }

    //Get users cancer stage
    var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
    var user=JSON.parse(localStorage.getItem("user"));
    var TSHLevel=user.TSHRange;

   /*These lines show upper and lower bounds
    * of acceptable TSH levels (for each 
    * stage)
    */
    var tshUpper;
    var tshLower;

    if (TSHLevel == "StageA")
    {
      tshUpper=[0.1, 0.1];
      tshLower=[0.01, 0.01];
    }
    else if (TSHLevel == "StageB")
    {
      tshUpper=[0.5, 0.5];
      tshLower=[0.1, 0.1];
    }
    else if (TSHLevel == "StageC")
    {
      tshUpper=[2.0, 2.0];
      tshLower=[0.35, 0.35];
    }

    //Create the line on the graph
    var TSHline=new RGraph.Line("GraphCanvas", TSHarr, tshUpper, tshLower)
      .Set("labels", Datearr)
      .Set("colors", ["blue", "green", "green"])
      .Set("shadow", true)
      .Set("shadow.offsetx", 1)
      .Set("shadow.offsety", 1)
      .Set("linewidth", 1)
      .Set("numxticks", 6)
      .Set("scale.decimals", 2)
      .Set("xaxispos", "bottom")
      .Set("gutter.left", 40)
      .Set("tickmarks", "filledcircle")
      .Set("ticksize", 5)
      .Set("chart.labels.ingraph", [, , ["TSH", "blue", "yellow", 1, 80], , ])
      .Set("chart.title", "TSH")
      .Draw();
    
    //Label axes
    var c=document.getElementById("GraphCanvas");
    var ctx=c.getContext("2d");
    ctx.font="11px Georgia";
    ctx.fillStyle="green";
    ctx.fillText("Value", 0, 60);
    ctx.fillText("Date(MM/DD)", 420, 450);
  }
}