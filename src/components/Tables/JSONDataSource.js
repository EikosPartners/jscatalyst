import axios from 'axios'

export default function MyDatasource(data) {
    this.baseURI = data
}

MyDatasource.prototype.getRows = function(params) {
    // take a slice of the total rows
    let filters, filterColumns, filterStrings = "", sorts, sortString = "", pageStrings, data
    
    let newURI = this.baseURI

    filterColumns = Object.keys(params.request.filterModel)
    filters = params.request.filterModel
    if (filterColumns.length > 0) {
        filterStrings = filterColumns.map(column=>{ 
            return column + '_like=' + filters[column].filter})
    }

    sorts = params.request.sortModel[0] 
    if (sorts && sorts.colId) { // text sort so numbers are weird 
        sortString = "_sort=" + sorts.colId + "&_order=" + sorts.sort
    }

    pageStrings = "_start=" + params.request.startRow + "&_end=" + params.request.endRow
    newURI = newURI + "?" + filterStrings + "&" + sortString + "&" + pageStrings
      
    axios.get(newURI).then(item=>{
        data = item.data
        params.successCallback(item.data, -1)
    })


    return data // not strictly necessary 
};