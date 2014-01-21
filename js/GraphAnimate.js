
$("#sidGraph").click(function () {

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
        var c = document.getElementById('sky2');
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 500, 500);
        var c = document.getElementById('sky3');
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#000000";
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        var TSHarr = new Array();
        var TGarr = new Array();
        var Syntharr = new Array();
        var Datearr = new Array();
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
        }



        function TSHplot() {
            var TSHline = new RGraph.Line('sky1', TSHarr)
            .Set('labels', Datearr)
            .Set('colors', ['blue'])
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

        function TGplot() {

            var TGline = new RGraph.Line('sky2', TGarr)
            .Set('labels', Datearr)
            .Set('colors', ['black'])
            .Set('shadow', true)
            .Set('shadow.offsetx', 1)
            .Set('shadow.offsety', 1)
            .Set('linewidth', 1)
            .Set('numxticks', 6)
            .Set('xaxispos', 'bottom')
            .Set('scale.decimals', 2)
            .Set('gutter.left',40)
            //.Set('colors', [['black','red']])
            .Set('tickmarks', 'filledcircle')
            .Set('ticksize', 5)
            .Set('chart.labels.ingraph', [, , ['TG', 'red', 'yellow', 1, 80], , ])
            .Set('chart.title', 'Thyroglobulin')
            .Draw();
        }
        function Synthplot() {

            var Sline = new RGraph.Line('sky3', Syntharr)
            .Set('labels', Datearr)
            //.Set('colors', ['black'])
            .Set('shadow', true)
            .Set('shadow.offsetx', 1)
            .Set('shadow.offsety', 1)
            .Set('linewidth', 1)
            .Set('numxticks', 6)
            .Set('scale.decimals', 2)
            .Set('gutter.left', 40)
            .Set('xaxispos', 'bottom')
            .Set('tickmarks', 'filledcircle')
            .Set('ticksize', 5)
            .Set('chart.labels.ingraph', [, , ['Synthroid', 'black', 'yellow', 1, 80], , ])
             .Set('chart.title', 'Synthroid Dose')
            .Draw();
        }

        TSHplot();
        TGplot();
        Synthplot();

        var c = document.getElementById("sky1");
        var ctx = c.getContext("2d");
        ctx.font = "11px Georgia";
        ctx.fillStyle = "green";
        ctx.fillText("Value", 0, 60);
        ctx.fillText("Date(MM/DD)", 420, 450);
    }

});