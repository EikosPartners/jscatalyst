function myTextComparator (filterKind, value, filterText){
    var filterTextLoweCase = filterText.toLowerCase();
    var valueLowerCase = value.toString().toLowerCase();
    switch (filterKind) {
    case 'contains':
        return valueLowerCase.indexOf(filterTextLoweCase) >= 0;
    case 'notContains':
        return valueLowerCase.indexOf(filterTextLoweCase) === -1;
    case 'equals':
        return valueLowerCase === filterTextLoweCase;
    case 'notEqual':
        return valueLowerCase != filterTextLoweCase;
    case 'startsWith':
        return valueLowerCase.indexOf(filterTextLoweCase) === 0;
    case 'endsWith':
        var index = valueLowerCase.lastIndexOf(filterTextLoweCase);
        return index >= 0 && index === (valueLowerCase.length - filterTextLoweCase.length);
    default:
        // should never happen
        console.warn('invalid filter type ' + filterKind);
        return false;
    }
}

function myNoComparator (filterKind, value, filterValue, filterTo){
    switch (filterKind) {
    case 'equals':
        return parseFloat(value) === filterValue;
    case 'notEqual':
        return parseFloat(value) !== filterValue;
    case 'lessThanOrEqual':
        return parseFloat(value) <= filterValue;
    case 'greaterThan':
		return parseFloat(value) > filterValue;
    case 'greaterThanOrEqual':
        return parseFloat(value) >= filterValue;
    case 'inRange':
    	return parseFloat(value) <= filterValue && parseFloat(value) >= filterTo
    default:
        // should never happen
        console.warn('invalid filter type ' + filterKind);
        return false;
    }
}


function filterData(filterModel, data) {
    var filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
        return data;
    }
    var resultOfFilter = []
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        let filters = Object.keys(filterModel)
		var pushme

        filters.forEach(filter=>{
			var filterKind = filterModel[filter].type
			var filterType = filterModel[filter].filterType 
			var filterContent = filterModel[filter].filter
			
			if (filterType === "text") {
        		pushme = myTextComparator(filterKind, item[filter], filterContent)
			} else if (filterType === "number") {
				pushme = myNoComparator(filterKind, item[filter], filterContent)
			} 

        })

        if (pushme !== false) {
	    	resultOfFilter.push(item)
        }
    }
    return resultOfFilter;
}

function sortData(sortModel, data) {
    var sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
        return data;
    }
    // do an in memory sort of the data, across all the fields
    var resultOfSort = data.slice();
    resultOfSort.sort(function(a, b) {
        for (var k = 0; k < sortModel.length; k++) {
            var sortColModel = sortModel[k];
            var valueA = a[sortColModel.colId];
            var valueB = b[sortColModel.colId];
            // this filter didn't find a difference, move onto the next one
            if (valueA == valueB) {
                continue;
            }
            var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
            if (typeof valueA === "number" && typeof valueB === "number") {
                return ((valueA - valueB) / Math.abs(valueA - valueB)) * sortDirection
            } else if (parseFloat(valueA) && parseFloat(valueB)) {
                return (valueA.localeCompare(valueB, "en-us", {numeric: true})) * sortDirection
            } else {
                if (valueA > valueB) {
                    return sortDirection;
                } else {
                    return sortDirection * -1;
                }
            }
        }
        // no filters found a difference
        return 0;
    });
    return resultOfSort;
}

function sortAndFilter(allOfTheData, sortModel, filterModel) {
    return sortData(sortModel, filterData(filterModel, allOfTheData));
}

export default function MyDatasource(data) {
    this.rowDataServerSide = data
}

MyDatasource.prototype.getRows = function(params) {
    var dataAfterSortingAndFiltering = sortAndFilter(this.rowDataServerSide, params.request.sortModel, params.request.filterModel);
    var rowsThisPage = dataAfterSortingAndFiltering.slice(params.request.startRow, params.request.endRow);
    // if on or after the last page, work out the last row.
    var lastRow = -1;
    if (dataAfterSortingAndFiltering.length <= params.request.endRow) {
        lastRow = dataAfterSortingAndFiltering.length;
    }
    // call the success callback
    params.successCallback(rowsThisPage, lastRow);
    return rowsThisPage // not strictly necessary 
};


// { 
//   "request": {
//     "startRow": 0,
//     "endRow": 100,
//     "rowGroupCols": [],
//     "valueCols": [],
//     "pivotCols": [],
//     "pivotMode": false,
//     "groupKeys": [],
//     "filterModel": {},
//     "sortModel": []
//   }
// }

