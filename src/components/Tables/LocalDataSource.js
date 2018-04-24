export default function LocalDataSource(data) {
    this.data = data
}

LocalDataSource.prototype.getRows = function(params) {    
    params.successCallback(this.data.slice(params.startRow, params.endRow), this.data.length)
};