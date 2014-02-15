//Runs the function to display the graph or suggestions, every time their div is shown
$(document).on("pageshow", function(){
	if($('.ui-page-active').attr('id')=="pageAdvice")
	{
		advisePage();
	}
	else if($('.ui-page-active').attr('id')=="pageGraph")
	{
		drawGraph();
	}
});    