/*
	-- Here all functions do jobs regarding the  data fetching ans trnasformation and so on.
*/

/*--	All data must be in this specific form. It is the transformed form of 
	data which has been	loaded from the server.
--*/


function getCopy(oldObject){
	let newObject = {};
	for(let x in oldObject){
		if(typeof x !== "object")
			newObject[x] = oldObject[x];
		else
			newObject[x] = getCopy(oldObject[x]);
	}

	return newObject;
}

// add url and its corresponding data object onto the map if not exist.
function addOntoMap(url,jsonObj) {
	if (!urlMap.has(url) ){
		urlMap	=	set(url,jsonObj);
		return true;
	}
	return false;
}

/* - This functio will return index from the dataset array on attribute changing.
*/
function getIndex(arr,labelName) {
	for(let i in arr) {
		
		if(arr[i].label == labelName) return i;	
	}
	return -1;
}
/*
	- Get the data object of saved url earlier.
*/
function getDataObject(url){
	return urlMap.has(url)? urlMap.get(url) : null;
}

/*	-This will return  a new object of class datasetEntry.
	-It requires when user wants to add attribute to the chart.
*/
function getDataForLabel(url,label) {
	let temp =  getDataObject(currentUrl);

}



/*
	- writing the transformation funciton for the retriving the usefull data for the chart
	- it retrive the title for the charts.
	- labels for the the data sets.
	- array of datasets.
	- number of data in each dataset.
*/

function transformJSONData(jsondataObj) {
	debugger;
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
		
		if( i == jsondataObj.records.length-1){
			// mostly last record is total of all previous records so excluding form data.
			break;
		}

		datasetIndex = 0;
		// jsondataObj.records[i] is an object and j point to key of current object.

		for(j in jsondataObj.records[i] ) {
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


/* fetch data from the server in json format.Using Promises/sync/await
*/
async function fetchData(url) {

	let reponsePromise = new Promise(function(resolve,resject){
		let requestForData = new XMLHttpRequest();

		requestForData.onload = function () {
			if(requestForData.readyState == 4 && requestForData.status == 200){
				resolve(requestForData.responseText);
			} else {
				reject(new Error("Error while fething data"));
			}
		}

		requestForData.open('GET',url, true);
		requestForData.send();
	});

	return ( await reponsePromise );	
}



/* 	- Requsest for the data.
	- First function to exucating after selecting data from the page.
	- It fetch data from url or local map data structrure.
	- Calls the necessary fucntions to be executed after the has been fetched.
*/
function getDataObjectFromUrl(url){
	
	if(urlMap.has(url)){
		currentData =  urlMap.get(url);
		display('chart-info');
		makeChartForThisData(currentData,chartType.value);
	} else {
		fetchData(url).then((jsontext)=> {
			
			currentData = transformJSONData(JSON.parse(jsontext));

			urlMap.set(url,getCopy(currentData));
			display("chart-info");
			makeChartForThisData(currentData,chartType.value);
		})
	}

}