/*	- In this file we manipulate dom elements.
*/

let addOptionTag = (cssSelector, val, html)=> {
	$(cssSelector).append(`<option value = ${val}>${html}</option>`);
}


let addOptionsToDatasetSelectBox = ( chart_status ) => {

	$('#dataset').html("");
	for(let attrIndex in chart_status.chartdata.attributes) {
		if( attrIndex != 0) {
				addOptionTag('#dataset',
					`${chart_status.chartdata.attributes[attrIndex]}`,
					`${chart_status.chartdata.attributes[attrIndex]}`);
		} else {
			addOptionTag('#dataset', "", "Default- All datasets")
		}
	}
}

/*	- Add labels to dropdown menu
*/

let addItemToDropdown = ( chart_status )=> {
	
	$('.dropdown-content').html("");
	let labelList = chart_status.chartdata.datasets[0].data;
	for(let label of labelList) {
		$('.dropdown-content').
		append(`<input type=checkbox value= '${label}' checked><span>${label}</span><br>`);
	}
	$('.dropdown-content').append(`<button class="go">Go</button>`);
	$('.dropdown-content').find('.go').click(chart_status, responseOnGoButton);
}



