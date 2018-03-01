


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