/*	url to access the resources on data.gov.in

	- https://api.data.gov.in/resource/4f3a84b7-776f-4246-9324-226ed8b1dad5?format=json&api-key=579b464db66ec23bdd0000019366736b9bf34a5c73087f7eff8d1ac3
*/

/*- it just a helper function to get the random color*/



function getColorArray(len) {
	let colorArray = [];
	let i = len;
	while(i-- !=0){
		colorArray.push('rgba('+getRandomNumber()+
						','+getRandomNumber()+
		 				','+getRandomNumber()+
		 				',0.8)'
		 				);

	}
	return colorArray;
}


/* it will return a random integer form zero to upperLimit specified */
function getRandomNumber(upperLimit = 255) {
	return Math.floor(Math.random()*upperLimit);
}




/*
	- this function will change the number of attributes shown on chart
	- here name is the name of attribute clicked on web page through checkbox.
	- addToChart is the boolean. true if want to add an attribute else remove att.
	- Using currentData as global variable for data object being currently used for the chart.
*/
function updateAttributes(name,addToChart) {
	console.log(name+" : "+addToChart)
	if (addToChart) {
		currentChart.data.datasets.push(currentData.datasets.find((entry) => {
			return entry.label === name;
		}));
	} else {
		let i = getIndex(currentChart.data.datasets,name);
		console.log("index is "+i);
		currentChart.data.datasets.splice(i,1);
	}
	currentChart.update();
}


/* Wrapper function for the getting the data in same format as in the
 	chart object
 */
function getDataForChart(inputlabels = [], inputdatasets = []) {
	return {
		labels: inputlabels,
		datasets:inputdatasets
	};
}


/* Wrapper function for getting the option object for the chart */
function getOptionsOfChart(chartTitle = ''){
	return {
		responsive:true,
		maintainAspectRatio: false,
		title: {
            display: true,
            text: chartTitle
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true	// chart minimum value would be zero
                }
            }]
        }
    }
}

/* Wrapper function for plotting chart on web page
	-chartContext is the id of canvas tag
	-chartType is predefined chart type as Stirng.
	-data is an object of type as defined in chartjs libaray.
	- It will actually cerates a chart on the webpage
*/
function ploatChart(chartContext, chartType, dataToPlot,optionsOfChart) {
	currentChart = new Chart(chartContext, {
		type: chartType,
		data:dataToPlot,
		options: optionsOfChart
	});
}


/* This functin will be used  as part of resolver function in async fetchData fucntion.
	It recieve a json data and convert it into transformed data and then perform 
	chart making tasks.
*/

function makeChartForThisData(currentData,type='bar'){

	let data = getDataForChart(currentData.datasets[0].data, currentData.datasets.slice(1));
	let option = getOptionsOfChart(currentData.title);
	ploatChart("chart_1",type, data, option);


}