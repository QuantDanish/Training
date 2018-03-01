
// Followings are the functin definations of some usefull functions.
let getColorArray = (len) => {
	let colorArray = [];
	let i = len;
	while(i-- !=0){
		colorArray.push('rgba('+getRandomNumber()+
						','+getRandomNumber()+
		 				','+getRandomNumber()+
		 				',0.5)'
		 				);

	}
	return colorArray;
}


/* it will return a random integer form zero to upperLimit specified */
let getRandomNumber = (upperLimit = 255) => {
	return Math.floor(Math.random()*upperLimit);
}


/* 5.
	- Wrapper function for plotting chart on web page
	-chartContext is the id of canvas tag
	-chartType is predefined chart type as Stirng.
	-data is an object of type as defined in chartjs libaray.
	- It will actually cerates a chart on the webpage
*/
function ploatChart(chartContext, config) {

	let currentChart = new Chart(chartContext, config);
	return currentChart;
}




/* 4.1
	- function for the getting the data in same format as in the chart object
 */
function getDataForChart(inputlabels = [], inputdatasets = []) {
	return {
		labels: inputlabels.slice(0),
		datasets:inputdatasets.slice(0)
	};
}


/* 4.2
	- function for getting the option object for the chart 
*/
function getOptionsOfChart(chartTitle = ''){
	return {
		responsive: true,
		maintainAspectRatio: false,
		events: ['click','mousemove'],
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






/* 3.
	- This functin will be used  as paCrt of resolver function in async fetchData fucntion.
	- It recieve a json data and convert it into transformed data and then perform 
	  chart making tasks.
*/
function makeChartForThisData( currentData, Ctype='bar', context='chart_1'){
	//first argument of getDataForChart is labels of chart and next arg is actual datasets.
	
	let currentChart = ploatChart(context, {
		type: Ctype,
		data: getDataForChart(currentData.datasets[0].data, currentData.datasets.slice(1)),
		options: getOptionsOfChart(currentData.title)
	});
	/*currentChart.options.maintainAspectRatio = false;
	currentData.update();*/
	return currentChart;


}




/*	- this function will change the type of chart e.g form bar to pie.
*/
let changeChartType = (current_status, newtype, chartContext='chart_1') => {
	current_status.chart.destroy();				
	let newChart = makeChartForThisData(current_status.chartdata, newtype)
	$('#dataset').val($('#dataset').find('option')[0].value);
	return newChart;
}

/*	- This function will display the only dataset being passed in arguments.
	- It is called in the event handler of the select dataset.
	- First argument is chart Object and second one is dataset which is to be shown.
*/
let insertOnlyDataset = (chart, requiredDataset)=> {
	let currentData = chart.config.data;
	currentData.datasets.splice(0, currentData.datasets.length, requiredDataset);
	currentData.datasets[0].backgroundColor = getColorArray(currentData.datasets[0].data.length);
	chart.update();

}

let updateLabels = (addList, removeList, chart,orignalData) => {
	let index,orignalIndex;
	let currentData =chart.data;
	debugger;
	for(let label of removeList){
		index = currentData.labels.indexOf( label );
			if(index !== -1) {
				currentData.labels.splice(index, 1);
				for(let i in currentData.datasets) {
					currentData.datasets[i].data.splice(index, 1);
			}
		}
	}


// asumming index as a column number and originalIndex as row number;
	for(let label of addList) {
		// if label is not in the chart
		if(!currentData.labels.includes( label )) {
			//adding label and its corresponding data into chart
			// here index is index of the original data label.
			index 	=	orignalData.datasets[0].data.indexOf( label );

			if(index !== -1) {
				currentData.labels.push( label);

				for(let i in currentData.datasets) {
					// find the index of ith dataset of chart in the originalData
					orignalIndex	=	orignalData.datasets.findIndex( (item )=> {
						return item.label === currentData.datasets[i].label;
					});

					currentData.datasets[i].data.push( orignalData.datasets[ orignalIndex ].data[index] );
				}
			}
		}
	}

	chart.update();
	return chart;
}