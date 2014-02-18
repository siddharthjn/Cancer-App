function advicePage()
{
  
  if (localStorage.getItem("tbRecords") === null)
  {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  }
  else 
  {
    $(location).attr("href", "#pageAdvice");
    
    var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
    
    var user=JSON.parse(localStorage.getItem("user"));
    var TSHLevel=user.TSHRange;
    
    tbRecords.sort(compareDates);

    var i=tbRecords.length-1;
    
    var TSH=tbRecords[i].TSH;
    
    var head=document.getElementById("AdviceCanvas");
    var heading=head.getContext("2d");    
    heading.font="22px Arial";

    var c=document.getElementById("AdviceCanvas");
    //Background color of canvas
    var ctx=c.getContext("2d");
    ctx.fillStyle="#c0c0c0";
    ctx.fillRect(0,0,550,550);

    //For writing if meter is in red zone
    function WriteAdvice(level)
    {
      var adviceLine1="";
      var adviceLine2="";

      if(level=="red")
      {
        adviceLine1="Please consult with your family";
        adviceLine2="physician urgently."; 
      }
      else if(level=="yellow")
      {
        adviceLine1="Contact family physician and recheck bloodwork";
        adviceLine2="in 6-8 weeks.";
      }
      else if(level="green")
      {
        adviceLine1="Repeat bloodwork in 3-6 months.";
      }

      var r=document.getElementById("AdviceCanvas");
      var rtx=r.getContext("2d");
      rtx.font="22px Arial";
      rtx.fillStyle="black";
      rtx.fillText("Your TSH-level is " + TSH+".", 25, 320);
      rtx.fillText(adviceLine1, 25, 380);
      rtx.fillText(adviceLine2, 25, 410);      
    }
  
    //For deciding what to write for given values of TSH Stage A
    function StageAWrite()
    {
      if ((TSH >= 0.01) && (TSH <= 0.1)) 
      {
          WriteAdvice("green");
      }
      else if ((TSH > 0.1) && (TSH <= 0.5)) 
      {
          WriteAdvice("yellow");
      }
      else 
      {
          WriteAdvice("red");
      }
    }

    function StageBWrite()
    {
      if ((TSH >= 0.1) && (TSH <= 0.5))
      {
        WriteAdvice("green");
      }
      else if ((TSH > 0.5) && (TSH <= 2.0))
      {
        WriteAdvice("yellow");
      }
      else if ((TSH >= 0.01) && (TSH < 0.1))
      {
        WriteAdvice("yellow");
      }
      else
      {
        WriteAdvice("red");
      }
    }
           
    function StageCWrite()
    {
      if ((TSH >= 0.35) && (TSH <= 2.0))
      {
        WriteAdvice("green");
      }
      else if ((TSH > 2) && (TSH <= 10))
      {
        WriteAdvice("yellow");
      }
      else if ((TSH >= 0.1) && (TSH < 0.35))
      {
        WriteAdvice("yellow");
      }
      else 
      {
        WriteAdvice("red");
      }
    }

    // Meter properties
    function DrawMeter(g)
    {
      g.Set("chart.value.text.units.post", " mlU/L")
        .Set("chart.value.text.boxed", false)
        .Set("chart.value.text.size", 14)
        .Set("chart.value.text.font", "Verdana")
        .Set("chart.value.text.bold", true)
        .Set("chart.value.text.decimals", 2)
        .Set("chart.shadow.offsetx", 5)
        .Set("chart.shadow.offsety", 5)
        .Set("chart.scale.decimals", 2)
        .Set("chart.title", "TSH LEVEL")
        .Set("chart.radius", 250)
        .Set("chart.centerx", 50)
        .Set("chart.centery", 250)
        .Draw();
    }

    function StageAMeter()
    {
      var cg=new RGraph.CornerGauge("AdviceCanvas", 0, 3, TSH)
        .Set("chart.colors.ranges", [[0.5, 3, "red"], [0.1, 0.5, "yellow"], [0.01, 0.1, "#0f0"]]);
      
      DrawMeter(cg);
      
      //If TSH value is huge
      if (TSH > 3)
      {
        var cg=new RGraph.CornerGauge("AdviceCanvas", 0,TSH,TSH)
          .Set("chart.colors.ranges", [[0.5, 3, "red"], [0.1, 0.5, "yellow"], [0.01, 0.1, "#0f0"], [3.01, TSH, "red"]]);
          DrawMeter(cg);
      }
    } 

    function StageBMeter()
    {
      var bcg=new RGraph.CornerGauge("AdviceCanvas", 0, 3, TSH)
        .Set("chart.colors.ranges", [[2.01, 3, "red"], [0.51, 2, "yellow"], [0.1, 0.5, "#0f0"], [0.01, 0.1, "yellow"]]);
      DrawMeter(bcg);
      
      if (TSH > 3)
      {
        var bcg=new RGraph.CornerGauge("AdviceCanvas", 0, TSH, TSH)
          .Set("chart.colors.ranges", [[2.01, 3, "red"], [0.51, 2,"yellow"], [0.1, 0.5, "#0f0"], [0.01, 0.1, "yellow"], [3, TSH, "red"]]);
        DrawMeter(bcg);
      }
    }
     
    function StageCMeter()
    {
      var ccg=new RGraph.CornerGauge("AdviceCanvas", 0, 15, TSH)
        .Set("chart.colors.ranges", [[10.01, 15, "red"], [2.01, 10,"yellow"], [0.35, 2, "#0f0"], [0.1,.34,"yellow"]]);
      DrawMeter(ccg);

      if (TSH > 15)
      {
        var ccg=new RGraph.CornerGauge("AdviceCanvas", 0, TSH, TSH)
          .Set("chart.colors.ranges", [[10.01, 15, "red"], [2.01, 10, "yellow"], [0.35, 2, "#0f0"], [0.1, 0.34, "yellow"], [15.01, TSH, "red"]]);
        DrawMeter(ccg);
      }
    }
   
    // main 
    if (TSHLevel == "StageA")
    {
      StageAWrite();
      heading.fillText("Your target TSH range is: 0.01-0.1 mlU/L", 25, 350); 
      StageAMeter();
    }
    else if (TSHLevel == "StageB")
    {    
      StageBWrite();
      heading.fillText("Your target TSH range is: 0.1-0.5 mlU/L", 25, 350);
      StageBMeter();
    }
    else if (TSHLevel == "StageC")
    {
      StageCWrite();
      heading.fillText("Your target TSH range is: 0.35-2.0 mlU/L", 25, 350);
      StageCMeter();
    }
    else
    {
      alert("No records exist.");
    }
  }
}