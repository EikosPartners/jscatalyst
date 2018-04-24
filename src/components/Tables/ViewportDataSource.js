// client code (ie your code) will call this constructor, pass in whatever you need for the
// viewport to do its job
export default function ViewportDatasource(mockServer) {
    this.mockServer = mockServer;
    this.connectionId = this.mockServer.connect(this.eventListener.bind(this));
}

// gets called by the grid, tells us what rows the grid is displaying, so time for
// us to tell the server to give us the rows for that displayed range
ViewportDatasource.prototype.setViewportRange = function (firstRow, lastRow) {
    console.log('setViewportRange: ' + firstRow + ' to ' + lastRow);
    this.mockServer.setViewportRange(this.connectionId, firstRow, lastRow);
};

// gets called by the grid, provides us with the callbacks we need
ViewportDatasource.prototype.init = function (params) {
    this.params = params;
};

// gets called by grid, when grid is destroyed or this datasource is swapped out for another one
ViewportDatasource.prototype.destroy = function () {
    this.mockServer.disconnect(this.connectionId);
};

ViewportDatasource.prototype.eventListener = function (event) {
    switch (event.eventType) {
        case 'rowCountChanged':
            this.onRowCountChanged(event);
            break;
        case 'rowData':
            this.onRowData(event);
            break;
        case 'dataUpdated':
            this.onDataUpdated(event);
            break;
    }
};

// process rowData event
ViewportDatasource.prototype.onRowData = function (event) {
    var rowDataFromServer = event.rowDataMap;
    this.params.setRowData(rowDataFromServer);
};

// process dataUpdated event
ViewportDatasource.prototype.onDataUpdated = function (event) {
    var that = this;
    event.changes.forEach(function (change) {
        var rowNode = that.params.getRow(change.rowIndex);
        // if the rowNode is missing, it means the grid is not displaying that row.
        // if the data is missing, it means the rowNode is there, but that data has not
        // loaded into it yet, so to early to set delta changes.
        if (!rowNode || !rowNode.data) {
            return;
        }
        // rowNode.data[change.columnId] = change.newValue;
        // this is a trick, it gets the row to refresh
        rowNode.setDataValue(change.columnId, change.newValue);
    });
};

// process rowCount event
ViewportDatasource.prototype.onRowCountChanged = function (event) {
    var rowCountFromServer = event.rowCount;
    // this will get the grid to make set the height of the row container, so we can scroll vertically properly
    this.params.setRowCount(rowCountFromServer);
};



// import axios from 'axios'

// export default function MyDatasource(response) {
//     this.baseURI = response.url.split('?')[0]
//     this.rowCount = response.count
//     this.allData = null
//     axios.get(this.baseURI).then(item=>{
//         this.allData = item.data
//     })
//     this.firstRow = 0
//     this.lastRow = -1
    
// }
// MyDatasource.prototype.init = function(params) {
//     this.params = params
//     this.params.setRowCount(this.rowCount)
//     this.sortString = ""
//     this.filterStrings = + "" 
// }



// // MyDatasource.prototype.setViewportRange = function(firstRow, lastRow) {
// //     this.firstRow = firstRow
// //     this.lastRow = lastRow 
// // }

// MyDatasource.prototype.getRow = function(index) {
//     return this.allData[index]   
// }


// // MyDatasource.prototype.setRowData = function(data){

// // }


// MyDatasource.prototype.getRows = function(params) {
//     // take a slice of the total rows

//     let filters, filterColumns, filterStrings = "", sorts, sortString = "", pageStrings, data, rowCount 
    
//     let newURI = this.baseURI

//     filterColumns = Object.keys(params.request.filterModel)
//     filters = params.request.filterModel
//     if (filterColumns.length > 0) {
//         filterStrings = filterColumns.map(column=>{ 
//             return column + '_like=' + filters[column].filter})
//     }

//     sorts = params.request.sortModel[0] 
//     if (sorts && sorts.colId) { // text sort so numbers are weird 
//         sortString = "_sort=" + sorts.colId + "&_order=" + sorts.sort
//     }

//     pageStrings = "_start=" + params.request.startRow + "&_end=" + params.request.endRow
//     newURI = newURI + "?" + filterStrings + "&" + sortString + "&" + pageStrings
      
//     console.log(newURI)
//     axios.get(newURI).then(item=>{
//         data = item.data
//         rowCount = item.headers['x-total-count']
//         params.successCallback(item.data, -1)
//     })

//     this.params.setRowCount(rowCount)


//     return data // not strictly necessary 
// }

// // interface IViewportDatasource {

// //     // Gets called exactly once before viewPort is used.
// //     // Passes methods to be used to tell viewPort of data loads / changes.
// //     init(params: IViewportDatasourceParams): void;

// //     // Tell the viewport what the scroll position of the grid is, so it knows what rows it has to get
// //     setViewportRange(firstRow: number, lastRow: number): void;

// //     // Gets called once when viewPort is no longer used. If you need to do any cleanup, do it here.
// //     destroy?(): void;
// // }
        
// // interface IViewportDatasourceParams {

// //     // datasource calls this method when the total row count changes. 
// //     // This in turn sets the height of the grids vertical scroll.
// //     setRowCount: (count:number) => void;

// //     // datasource calls this when new data arrives. The grid then updates 
// //     // the provided rows. The rows are mapped [rowIndex]=>rowData].
// //     setRowData: (rowData:{[key:number]:any}) => void;

// //     // datasource calls this when it wants a row node - typically used
// //     // when it wants to update the row node data
// //     getRow: (rowIndex: number) => RowNode;
// // }
