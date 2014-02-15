function drawGraph()
{

    if (localStorage.getItem("tbRecords") === null) {
        alert("No records exist.");
        var url = "#pagMenu";
        $(location).attr('href', url);
    }
    else {
        var url = "#pagGraph";
        $(location).attr('href', url);
        var c = document.getElementById('sky1');
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 500, 500);
        var gtx = c.getContext("2d");
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        var TSHarr = new Array();
        var TGarr = new Array();
        var Syntharr = new Array();
        var Datearr = new Array();
        var tshBOk = new Array();
        var tshBLower = new Array();
        var tshAOk = new Array();
        var tshALower = new Array();
        var tshCOk = new Array();
        var tshCLower = new Array();
        var m = 0;
        var d = 0;
        tbRecords.sort(compareDates);
        for (var i = 0; i < tbRecords.length; i++) {
            Datearr[i] = new Date(tbRecords[i].Date);
            m = Datearr[i].getMonth() + 1;
            d = Datearr[i].getDate() + 1;
            if ((m == 2) && (d > 28)) {
                d = 1;
                m++;
            }
            if (((m == 4) || (m == 6) || (m == 9) || (m == 11)) && (d > 30)) {
                d = 1;
                m++;
            }
            if (d > 31) {
                d = 1;
                m++;
            }
            if (m > 12)
                m = 1;
            Datearr[i] = (m + '/' + d);
            TSHarr[i] = parseFloat(tbRecords[i].TSH);
            TGarr[i] = parseFloat(tbRecords[i].Tg);
            Syntharr[i] = parseFloat(tbRecords[i].SynthroidDose);
            tshBOk[i] = 0.5;
            tshBLower[i] = 0.1;
            tshAOk[i] = 0.1;
            tshALower[i] = 0.01;
            tshCOk[i] = 2.0;
            tshCLower[i] = 0.35;

        }



        function TSHplot() {
            //next  three lines to declare TSH level
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        var user = JSON.parse(localStorage.getItem("user"));
        var TSHLevel = user.TSHRange;

        if (TSHLevel == "StageA")
        {
            


            var TSHline = new RGraph.Line('sky1', TSHarr, tshAOk, tshALower)
            .Set('labels', Datearr)
            .Set('colors', ['blue', 'green', 'green'])
            .Set('shadow', true)
            .Set('shadow.offsetx', 1)
            .Set('shadow.offsety', 1)
            .Set('linewidth', 1)
            .Set('numxticks', 6)
            .Set('scale.decimals', 2)
            .Set('xaxispos', 'bottom')
            .Set('gutter.left', 40)
            //.Set('colors.alternate', true)
            .Set('tickmarks', 'filledcircle')
            .Set('ticksize', 5)
            .Set('chart.labels.ingraph', [, , ['TSH', 'blue', 'yellow', 1, 80], , ])
            .Set('chart.title', 'TSH')
            .Draw();
        }

        if (TSHLevel == "StageB")
        {
            
        
            var TSHline = new RGraph.Line('sky1', TSHarr, tshBOk, tshBLower)
            .Set('labels', Datearr)
            .Set('colors', ['blue', 'green', 'green'])
            .Set('shadow', true)
            .Set('shadow.offsetx', 1)
            .Set('shadow.offsety', 1)
            .Set('linewidth', 1)
            .Set('numxticks', 6)
            .Set('scale.decimals', 2)
            .Set('xaxispos', 'bottom')
            .Set('gutter.left', 40)
            //.Set('colors.alternate', true)
            .Set('tickmarks', 'filledcircle')
            .Set('ticksize', 5)
            .Set('chart.labels.ingraph', [, , ['TSH', 'blue', 'yellow', 1, 80], , ])
            .Set('chart.title', 'TSH')
            .Draw();
        }

        if (TSHLevel == "StageC")
        {
            
            /*var tshOk = new Array();
            tshOk.legnth = TSHarr.legnth;
            for (var i = 0; i< tshOk.legnth; i++)
            {
                tshOk[i] = 0.5;
            }*/

            var TSHline = new RGraph.Line('sky1', TSHarr, tshCOk, tshCLower)
            .Set('labels', Datearr)
            .Set('colors', ['blue', 'green', 'green'])
            .Set('shadow', true)
            .Set('shadow.offsetx', 1)
            .Set('shadow.offsety', 1)
            .Set('linewidth', 1)
            .Set('numxticks', 6)
            .Set('scale.decimals', 2)
            .Set('xaxispos', 'bottom')
            .Set('gutter.left', 40)
            //.Set('colors.alternate', true)
            .Set('tickmarks', 'filledcircle')
            .Set('ticksize', 5)
            .Set('chart.labels.ingraph', [, , ['TSH', 'blue', 'yellow', 1, 80], , ])
            .Set('chart.title', 'TSH')
            .Draw();
        }
        }



     

        TSHplot();
       

        var c = document.getElementById("sky1");
        var ctx = c.getContext("2d");
        ctx.font = "11px Georgia";
        ctx.fillStyle = "green";
        ctx.fillText("Value", 0, 60);
        ctx.fillText("Date(MM/DD)", 420, 450);
    }

}