/*
	--This file contains codes related to the html DOM elements manipulation, say creating new
		tags and options and chaging the content of tags etc.
*/

/*
	- displays the attribue selector and other informatio of the current chart displayed
	- run once data is processed and ready to plot the chart.
*/

function display(id){
	document.getElementById(id).classList.remove("hide"); 	
}


/*
	- Hide the attribue selector and other informatio of the current chart displayed
	- I don't think it will be used.
*/
function hide(id){
	document.getElementById(id).classList.add("hide");
}
