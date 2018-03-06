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


/*
	- writing the transformation funciton for the retriving the usefull data for the chart
	- it retrive the title.
	- labels for the the data sets.
	- array of datasets.
	- number of data in each dataset.
*/

function transformJSONData(jsondataObj) {

	let transformedData = new chartData();

	transformedData.title =  jsondataObj.title;
	transformedData.count = jsondataObj.count;

	// extarcting all the attributes name.
	for(let x in jsondataObj.fields) {
		transformedData.attributes.push( jsondataObj.fields[x].name );
		transformedData.datasets.push( new datasetEntry( jsondataObj.fields[x].name ) );
	}


	// extracting the data corresponding to the each attribute.
	// it  is the index of object in dataset arrray specified in the transformedData.	
	
	let datasetIndex;
	// jsondataObj.records is an array of objects.
	for(let i in jsondataObj.records){
		
		/*if( i == jsondataObj.records.length-1){
			// mostly last record is total of all previous records so excluding form data.
			break;
		}*/

		datasetIndex = 0;
		// jsondataObj.records[i] is an object and j point to key of current object.

		for(let j in jsondataObj.records[i] ) {
			datasetIndex  = transformedData.datasets.findIndex((obj)=>{
				// getting the index of object whose label is j.
				return obj.label === j;
			});

			// first entry is row name/ horizontal label.
			transformedData.datasets[datasetIndex].data.push( jsondataObj.records[i][j] );
		}
	}
	return transformedData;
}


let getCopy = (oldObject)=> {
	let newObject = {};
	for(let x in oldObject){
		if(typeof x !== "object")
			newObject[x] = oldObject[x];
		else
			newObject[x] = getCopy(oldObject[x]);
	}

	return newObject;
}