$("#Advise").click(function () {
    if (localStorage.getItem("tbRecords") === null) {
        alert("No records exist.");
        var url = "#pagMenu";
        $(location).attr('href', url);
    }
    else {
     var url = "#pagAdvice";
        $(location).attr('href', url);
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        var user = JSON.parse(localStorage.getItem("user"));
        var TSHLevel = user.TSHRange;
         tbRecords.sort(compareDates);
        var i = tbRecords.length - 1;
        var TSH = tbRecords[i].TSH;
        var head = document.getElementById('myCanvas2');
        var heading = head.getContext("2d");
        heading.font = "22px Arial";
        var c=document.getElementById("myCanvas2");
        //Background color of canvas
        var ctx=c.getContext("2d");
        ctx.fillStyle="#c0c0c0";
        ctx.fillRect(0,0,550,550);

        //For writing if meter is in red zone
        function WriteRed() {
        var r=document.getElementById("myCanvas2");
        var rtx=r.getContext("2d");
        rtx.font = "22px Arial";
        rtx.fillStyle = "black";
        rtx.fillText("Your TSH-level is " + TSH+".", 25, 320);
        rtx.fillText("Please consult with your family physician", 25, 380);
        rtx.fillText("physician urgently. ", 25, 410);
        }
        //For writing if meter is in green zone
        function WriteGreen() {
        var g=document.getElementById("myCanvas2");
        var gtx=g.getContext("2d");
        gtx.font = "22px Arial";
         gtx.fillStyle="black";
         gtx.fillText("Your TSH-level is " + TSH+".", 25, 320);
         gtx.fillText("Repeat bloodwork in 3-6 months. ", 25, 380);

        }
        //For writing if meter is in yellow zone
        function WriteYellow() {
            var y=document.getElementById("myCanvas2");
            var ytx=y.getContext("2d");
            ytx.font = "22px Arial";
            ytx.fillStyle = "black";
            ytx.fillText("Your TSH-level is " + TSH+".", 25, 320);
            ytx.fillText("Contact family physician and recheck bloodwork", 25, 380);
            ytx.fillText("in 6-8 weeks. ", 25, 410);
            }
        //For deciding what to write for given values of TSH Stage A
         function StageAWrite() {
            if ((TSH >= 0.01) && (TSH <= 0.1)) {
                WriteGreen();
                }
            else if ((TSH > 0.1) && (TSH <= 0.5)) {
                WriteYellow();
                }
            else {
                WriteRed();
                }
            }

          function StageBWrite() {
             if ((TSH >= 0.1) && (TSH <= 0.5)) {
                WriteGreen();
                }
            else if ((TSH > 0.5) && (TSH <= 2.0)) {
                WriteYellow();
                }
             else if ((TSH >= 0.01) && (TSH < 0.1)) {
                WriteYellow();
                }
             else { 
                WriteRed();
                }
             }
               
         function StageCWrite() {
            if ((TSH >= 0.35) && (TSH <= 2.0)) {
                WriteGreen();
                }
                else if ((TSH > 2) && (TSH <= 10)) {
                WriteYellow();
                }
            else if ((TSH >= .1) && (TSH < .35)) {
                WriteYellow();
                }
            else {
                WriteRed();
                }
         }
         // Meter properties
	 function DrawMeter(g)
	 {

	    g.Set('chart.value.text.units.post', ' mlU/L')
            .Set('chart.value.text.boxed', false)
            .Set('chart.value.text.size', 14)
            .Set('chart.value.text.font', 'Verdana')
            .Set('chart.value.text.bold', true)
            .Set('chart.value.text.decimals', 2)
            .Set('chart.shadow.offsetx', 5)
            .Set('chart.shadow.offsety', 5)
            .Set('chart.scale.decimals', 2)
            .Set('chart.title', 'TSH LEVEL')
            .Set('chart.radius', 250)
            .Set('chart.centerx', 50)
            .Set('chart.centery', 250)
            .Draw();
	 }
         function StageAMeter()
         {
         var cg = new RGraph.CornerGauge('myCanvas2', 0,3,TSH)
            .Set('chart.colors.ranges', [[.5,3, 'red'], [.1,.5,'yellow'], [.01,.1, '#0f0']]);
	    DrawMeter(cg);
            //If TSH value is huge
            if (TSH > 3)
            {
            var cg = new RGraph.CornerGauge('myCanvas2', 0,TSH,TSH)
            .Set('chart.colors.ranges', [[.5,3, 'red'], [.1,.5,'yellow'], [.01,.1, '#0f0'], [3.01, TSH, 'red']]);
	       DrawMeter(cg);
            }
         }
         
         function StageBMeter() {
         var bcg = new RGraph.CornerGauge('myCanvas2', 0,3,TSH)
            .Set('chart.colors.ranges', [[2.01,3, 'red'], [.51,2,'yellow'], [.1,.5, '#0f0'], [.01,.1,'yellow']]);
	    DrawMeter(bcg);

            if (TSH > 3)
            {
            var bcg = new RGraph.CornerGauge('myCanvas2', 0,TSH,TSH)
            .Set('chart.colors.ranges', [[2.01,3, 'red'], [.51,2,'yellow'], [.1,.5, '#0f0'], [.01,.1, 'yellow'],[3,TSH,'red']]);
	       DrawMeter(bcg);
            }
         }
         
         function StageCMeter() {
         var ccg = new RGraph.CornerGauge('myCanvas2', 0,15,TSH)
            .Set('chart.colors.ranges', [[10.01,15, 'red'], [2.01,10,'yellow'], [.35,2, '#0f0'], [.1,.34,'yellow']]);
	    DrawMeter(ccg);

            if (TSH > 15)
            {
            var ccg = new RGraph.CornerGauge('myCanvas2', 0,TSH,TSH)
            .Set('chart.colors.ranges', [[10.01,15, 'red'], [2.01,10,'yellow'], [.35,2, '#0f0'], [.1,.34, 'yellow'],[15.01,TSH,'red']]);
	       DrawMeter(ccg);
            }
	 }
     
    // main 
    if (TSHLevel == "StageA")
    {
        StageAWrite();
        heading.fillText("Your target TSH range is: '0.01-0.1 mlU/L'", 25, 350); 
        StageAMeter();
    }

    else if (TSHLevel == "StageB")
    {
        
        StageBWrite();
        heading.fillText("Your target TSH range is: '0.1-0.5 mlU/L'", 25, 350);
        StageBMeter();
    }
    else if (TSHLevel == "StageC")
    {
        StageCWrite();
        heading.fillText("Your target TSH range is: '0.35-2.0 mlU/L'", 25, 350);
        StageCMeter();
    }
    else
    {
    alert("No records exist.");
    }

}});
