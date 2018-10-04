import axios from 'axios'
var CancelToken = axios.CancelToken;

let cancelTokens = [];

export default function MyDatasource(data) {
    this.baseURI = data
}

MyDatasource.prototype.getRows = function(params) {
    while(cancelTokens.length > 3) {
        let source = cancelTokens.pop();
        source.cancel();
    }
    let source = CancelToken.source()
    cancelTokens.unshift(source);
    axios.get(this.baseURI, {
        cancelToken: source.token,
        params: params.request
    }).then(res => {
        params.successCallback(res.data.docs, res.data.total)
    }).catch(error => {
        params.failCallback();
    })
};
