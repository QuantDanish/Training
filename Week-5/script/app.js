/*	- chartData class contains data retrived from the ajax call. i.e it is the transformed
		data after applying transformation function.
	- title is the name of data retrived.
	- count coantains number of data records. i.e number of rows of data.
	- attributes is  an array of string containing the attributes provided by the data
		which is to be shown on top of chart after title.
	- datasets is an array of object of type datasetEntry as defined in next code block.
*/

class chartData {
	constructor( dataNum = 0,inputTitle = "", attrbuteArray = [], datasetArray = []) {
		this.title = inputTitle;
		this.count = dataNum;
		this.attributes = attrbuteArray;
		this.datasets = datasetArray;

	}
}


/*	- This is data structure used by the chartjs library to use dataset.
	- each object in the array of dataset must have following property.
*/
class datasetEntry {
	constructor(labelName = "" , myBgColor= getColorArray(1)[0],dataArray = []) {
		let self =  this;
		self.label= labelName,
		self.backgroundColor= myBgColor,
		self.data= dataArray		// numeric array
	}
}


/*	-This class will be used to get the current status of the data containing the chart
	context, chart data, url and map Object.
*/
class chartStatus {
	constructor(chartdata=null, chart=null, url="", mapObject= new Map()) {
		this.chartdata = chartdata;	// in transformed form
		this.chart = chart;			// chart object
		this.url = url;				// current url
	}
}

let currentStatus;
//********************************** When Dom is ready *****************************
$(function() {
	// this will contain current information of slected chart.
	currentStatus = new chartStatus();
	let imageArray = ['./images/Primary-Education-System-in-India.jpg',
					'./images/Secondary-Education-System-in-India-700x393.jpg',
					'./images/boy.jpeg',
					'./images/child-big.jpg',
					'./images/computer.jpeg',
					'./images/head1.jpg',
					'./images/prayer.jpeg',
					'./images/school going girls.jpeg',
					'./images/schools204172.jpg',
					'./images/when teacher comes in.jpeg'
	];

	let i=0;
	let gallery = $('.heading').find('img');
	setInterval(()=>{

		gallery.attr('src' , imageArray[i]);	
		
		/*gallery.fadeIn();*/
		i = (++i)%imageArray.length;	

	},4000);
	
	$('#data-selector').change(currentStatus, responseOnDataSelect);

	$('#chart-type').change(currentStatus, responseOnChartTypeSelect);

	$('#dataset').change(currentStatus, responseOnDatasetSelect);


});





/*	2.
	- This function is used as a callback in the getDataFromServer function.
	- This will make a chart to be shown on the web page.
*/
let startProccessing = ( chart_status ) => {
	// currently data property inside chart_status contains row JSON object.
	
	chart_status.chartdata = transformJSONData(chart_status.chartdata);
	// updating the map to stroe the transformed data instead of received Object.
	
	chart_status.chart = makeChartForThisData( chart_status.chartdata);

	// displaying the hidden contenets.
	$('div.chartArea').removeClass('hide');
	addOptionsToDatasetSelectBox(chart_status);
	addItemToDropdown(chart_status);
}





/*	1.
	- Following function fetches data from the server if not available and return JSON object.
	- If data is already in the Map it wil return data from there
*/
let getDataFromServer = (url, chStatus, callback)=>{
	
	$.getJSON(url)
	.done(( data )=> {
		debugger;
		// on successfull ajax call.
		chStatus.url = url;
		chStatus.chartdata = data;
		callback(chStatus);
	})
	.fail(( jqxhr, textStatus, error ) => {
		
		
		console.log(error,jqxhr,textStatus);
	});

	
}



/*	0.
	- Event listner for the selct box when data is being selected.
*/
let responseOnDataSelect = (event) => {
	// here event.value is the url associated with option tag.
	// event.data is an object passed as an argument in eventlistner function
	// startPorcessing is the callback function for the getDataFrom the server.
	this.blur();
	if(event.target.value ==="")
		$('div.chartArea').removeClass('hide');
	else
		getDataFromServer(event.target.value, event.data, startProccessing);
}

/* event handeler for chart type select box
*/
let responseOnChartTypeSelect = (event) => {
	
	this.blur();
	event.data.chart = changeChartType( event.data, event.target.value );
	$('#dataset').selectedIndex = 0;
}

/*	-Event handler for the dataset select box.
*/
let responseOnDatasetSelect = (event)=> {
	this.blur();
	if(event.target.value !== "") {
		
		let requiredDataset = event.data.chartdata.datasets.find(( arrayItems )=> {
			return arrayItems.label === event.target.value;
		})
		insertOnlyDataset(event.data.chart, requiredDataset);
	} else {
		let type = event.data.chart.config.type;
		event.data.chart = makeChartForThisData(event.data.chartdata, type);
	}
	
}

/*	- Event Handler for Go button
*/
let responseOnGoButton 	=  ( event )=> {
	let labelsToremove 	=	[];
	let labelsToadd 	=	[];
	$('.dropdown-content').children('input[type = "checkbox"]').each((index, ele)=>{
		if(!ele.checked) 
			labelsToremove.push(ele.value);
		else 
			labelsToadd.push(ele.value);
	});

	currentStatus.chart = updateLabels(labelsToadd,
								labelsToremove,
								event.data.chart,
								event.data.chartdata );
}


