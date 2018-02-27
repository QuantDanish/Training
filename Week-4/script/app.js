
/*	- Codes in this files containing the required defination of objects and some initial 
		function callings.
	- You can call it as Starting java script code.
*/

let currentChart = null;
let currentData = null;
let currentUrl;
// making a map to store the data corresponding to the url.
let urlMap = new Map();


/*	- chartData class contains data retrived from the ajax call. i.e it is the transformed
		data after applying transformation function.
	- title is the name of data retrived.
	- count coantains number of data records. i.e number of rows of data.
	- attributes is  an array of string containing the attributes provided by the data
		which is to be shown on top of chart after title.
	- datasets is an array of object of type datasetEntry as defined in next code block.
*/

function chartData( dataNum = 0,inputTitle = "", attrbuteArray = [], datasetArray = []) {
	let self = this;
	this.title = inputTitle;
	this.count = dataNum;
	this.attributes = attrbuteArray;
	this.datasets = datasetArray;

}


/*	- This is data structure used by the chartjs library to use dataset.
	- each object in the array of dataset must have following property.
*/
function datasetEntry (labelName = "" , myBgColor= getColorArray(1)[0],dataArray = []) {
		let self =  this;
		self.label= labelName,
		self.backgroundColor= myBgColor,
		self.data= dataArray		// numeric array
}

const selectedData = document.getElementById('data-selector');
const selectChartType = document.getElementById('chart-type');
const chartType = document.getElementById('chart-type');
// whenever we selec an option form the select box an event will fire out which is handeled by
// this event handler.
selectedData.addEventListener("change",(event)=>{
	 currentUrl = event.target.value;
	 if( currentUrl != ""){
	 	getDataObjectFromUrl(currentUrl);
	 }
});

chartType.addEventListener("change",(event)=>{
	
	currentChart.destroy();
	makeChartForThisData(currentData,event.target.value);

});