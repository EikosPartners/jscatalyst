export default function MockServer() {
    this.connections = {};
    this.nextConnectionId = 0;
}

// MockServer.prototype.periodicallyUpdateData = function() {

//     // keep a record of all the items that changed
//     var changes = [];

//     // make some mock changes to the data
//     this.makeSomePriceChanges(changes);
//     this.makeSomeVolumeChanges(changes);

//     // inform the connections of the changes where appropriate
//     this.informConnectionsOfChanges(changes);
// };

MockServer.prototype.informConnectionsOfChanges = function(changes) {
    var that = this;
    // go through each connection
    Object.keys(this.connections).forEach( function(connectionId) {
        var connection = that.connections[connectionId];
        // create a list of changes that are applicable to this connection only
        var changesThisConnection = [];
        changes.forEach( function(change) {
            // see if the index of this change is within the connections viewport
            var changeInRange = change.rowIndex >= connection.firstRow && change.rowIndex <= connection.lastRow;
            if (changeInRange) {
                changesThisConnection.push(change);
            }
        });
        // send msg to this connection if one or more changes
        if (changesThisConnection.length > 0) {
            that.sendEventAsync(
                connectionId, { eventType: 'dataUpdated', changes: changesThisConnection }
            );
        }
    });
};

MockServer.prototype.init = function(allData) {
    this.allData = allData;
    this.saveData = allData

    // the sample data has just name and code, we need to add in dummy figures
};

MockServer.prototype.connect = function(listener) {
    var connectionId = this.nextConnectionId;
    this.nextConnectionId++;
    // keep a record of the connection
    this.connections[connectionId] = {
        // the client callback that receives the events
        listener: listener,
        // we keep track of the rows in the client, so when the viewport changes,
        // we only send rows that are new, eg if viewport is length 10, and moves 2
        // positions, we only send the 2 new rows, as the client already has 8 of them
        rowsInClient: {},
        // keep track of range, so when data items change, we know what to send
        firstRow: 0,
        lastRow: -1 // first row after last row, range doesn't exist
    };
    
    this.sendEventAsync(
        connectionId, { eventType: 'rowCountChanged', rowCount: this.allData.length }
    );

    return connectionId;
};

// pretend we are on a network, send message to client after 20ms
MockServer.prototype.sendEventAsync = function(connectionId, event) {
    var listener = this.connections[connectionId].listener;
    setTimeout( function() {
        listener(event);
    }, 20);
};

MockServer.prototype.disconnect = function(connectionId) {
    delete this.connections[connectionId];
};

MockServer.prototype.setViewportRange = function(connectionId, firstRow, lastRow) {
    var connection = this.connections[connectionId];
    connection.firstRow = firstRow;
    connection.lastRow = lastRow;

    // because the client has moved its viewport, it will have disregarded rows outside the range
    this.purgeFromClientRows(connection.rowsInClient, firstRow, lastRow);
    // send rows newly in the range
    this.sendResultsToClient(connectionId, firstRow, lastRow);
};

// removes any entries outside the viewport (firstRow to lastRow)
MockServer.prototype.purgeFromClientRows = function(rowsInClient, firstRow, lastRow) {
    Object.keys(rowsInClient).forEach( function(rowIndexStr) {
        var rowIndex = parseInt(rowIndexStr);
        if (rowIndex < firstRow || rowIndex > lastRow) {
            delete rowsInClient[rowIndex];
        }
    });
};

MockServer.prototype.sendResultsToClient = function(connectionId, firstRow, lastRow) {
    if (firstRow < 0 || lastRow < firstRow) {
        console.warn('start or end is not valid');
        return;
    }

    // we want to keep track of what rows the client has
    var rowsInClient = this.connections[connectionId].rowsInClient;

    // the map contains row indexes mapped to rows
    var rowDataMap = {};
    for (var i = firstRow; i<=lastRow; i++) {
        // if client already has this row, don't send it again
        // if (rowsInClient[i]) { continue; }
        // otherwise send the row
        rowDataMap[i] = this.allData[i];
        // and record that the client has this row
        rowsInClient[i] = true;
    }

    this.sendEventAsync(
        connectionId, { eventType: 'rowData', rowDataMap: rowDataMap }
    );
};

MockServer.prototype.getRowCount = function() {
    return this.allData.length;
};



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


MockServer.prototype.filterData = function filterData(filterModel, data) {
    var filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
        return data;
    }
    this.allData = this.saveData
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
    this.allData = resultOfFilter
    return resultOfFilter;
}

MockServer.prototype.sortData = function sortData(sortModel, data) {
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
                let numberSorter = (parseFloat(valueA) - parseFloat(valueB))
                return numberSorter / Math.abs(numberSorter) * sortDirection
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

    this.allData = resultOfSort;
    return resultOfSort;
}


MockServer.prototype.sortAndFilter = function sortAndFilter(allOfTheData, sortModel, filterModel, connectionID) {
    this.sortData(sortModel, this.filterData(filterModel, allOfTheData))
    this.setViewportRange(connectionID, this.connections[connectionID].firstRow, this.connections[connectionID].lastRow)
}
