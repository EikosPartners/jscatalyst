/*
 */
'use strict'

import {
  tableDataParser
} from './tableDataParser.js'

// import {
//   restAPI
// } from './restAPI.js'

export class helper {
  // responseSimple(columns, response) {
  //   const data = []
  //   try {
  //     const parsedData = new tableDataParser().parse(columns, response)
  //
  //     for (let i = 0; i < parsedData.length; i++) {
  //       data.push(parsedData[i])
  //     }
  //   } catch (ex) {
  //     console.log(ex)
  //   }
  //
  //   const returnObj = {
  //     data: data,
  //     count: (response.recordsFiltered === undefined) ? data.length : response.recordsFiltered
  //   }
  //
  //   return returnObj
  // }

  responseAgentPerformance(columns, response) {
    const data = []
    try {
      const parsedData = new tableDataParser().parseStats(columns, response.data)

      for (let i = 0; i < parsedData.length; i++) {
        data.push(parsedData[i])
      }
    } catch (ex) {
      console.log(ex)
    }

    const returnObj = {
      data: data,
      count: response.recordsFiltered
    }

    return returnObj
  }

  // response(columns, response) {
  //   const data = []
  //
  //   try {
  //     const parsedData = new tableDataParser().parseScorecard(columns, response.data)
  //     for (let i = 0; i < parsedData.length; i++) {
  //       data.push(parsedData[i])
  //     }
  //   } catch (ex) {
  //     console.log(ex)
  //   }
  //
  //   const returnObj = {
  //     data: data,
  //     count: (response.recordsFiltered === undefined) ? data.length : response.recordsFiltered
  //   }
  //
  //   return returnObj
  // }
  //
  // request(url, data, restAPI) {
  //   let usefulURL =
  //     restAPI.getRootURI() + url
  //
  //
  //   return axios.get(usefulURL).then(response => {
  //     return Promise.resolve(response.data)
  //   })
  // }
  //
  // requestFormater (columns, data) {
  //   let returnObj = {}
  //   let sortColumn, direction, dataTableParams;
  //
  //   sortColumn = columns.indexOf(data.orderBy)
  //
  //   if (data.ascending === 1) {
  //     direction = "asc"
  //   } else {
  //     direction = "desc"
  //   }
  //
  //   dataTableParams = columns.map((item, index) => {
  //     let columnIdentity = "&columns%5B" + index
  //     return (columnIdentity + "%5D%5Bdata%5D=" + index +
  //       columnIdentity + "%5D%5Bname%5D=" + columnIdentity +
  //       "%5D%5Bsearchable%5D=true" + columnIdentity + "%5D%5Borderable%5D=true" +
  //       columnIdentity + "%5D%5Bsearch%5D%5Bvalue%5D=" + columnIdentity +
  //       "%5D%5Bsearch%5D%5Bregex%5D=false")
  //   }).join('')
  //
  //   returnObj.dataTableParams = dataTableParams
  //   returnObj.sortColumn = sortColumn
  //   returnObj.direction = direction
  //   returnObj.query = data.query
  //   returnObj.page = data.page
  //   returnObj.limit = data.limit
  //
  //   return returnObj
  //
  // }
  //
  // requestFormaterWithForms (columns, data) {
  //   let returnObj = {}
  //   let sortColumn, direction, dataTableParams;
  //
  //   sortColumn = columns.indexOf(data.orderBy)
  //
  //   if (data.ascending === 1) {
  //     direction = "asc"
  //   } else {
  //     direction = "desc"
  //   }
  //
  //   dataTableParams = columns.map((item, index) => {
  //     let columnIdentity = "&columns%5B" + index
  //     if (item === "edit" || item === "delete") {
  //       return (columnIdentity + "%5D%5Bdata%5D=" + index +
  //       columnIdentity + "%5D%5Bname%5D=" + columnIdentity +
  //       "%5D%5Bsearchable%5D=false" + columnIdentity + "%5D%5Borderable%5D=false" +
  //       columnIdentity + "%5D%5Bsearch%5D%5Bvalue%5D=" + columnIdentity +
  //       "%5D%5Bsearch%5D%5Bregex%5D=false")
  //     } else {
  //       return (columnIdentity + "%5D%5Bdata%5D=" + index +
  //       columnIdentity + "%5D%5Bname%5D=" + columnIdentity +
  //       "%5D%5Bsearchable%5D=true" + columnIdentity + "%5D%5Borderable%5D=true" +
  //       columnIdentity + "%5D%5Bsearch%5D%5Bvalue%5D=" + columnIdentity +
  //       "%5D%5Bsearch%5D%5Bregex%5D=false")
  //     }
  //
  //     return (columnIdentity + "%5D%5Bdata%5D=" + index +
  //       columnIdentity + "%5D%5Bname%5D=" + columnIdentity +
  //       "%5D%5Bsearchable%5D=true" + columnIdentity + "%5D%5Borderable%5D=true" +
  //       columnIdentity + "%5D%5Bsearch%5D%5Bvalue%5D=" + columnIdentity +
  //       "%5D%5Bsearch%5D%5Bregex%5D=false")
  //   }).join('')
  //
  //   returnObj.dataTableParams = dataTableParams
  //   returnObj.sortColumn = sortColumn
  //   returnObj.direction = direction
  //   returnObj.query = data.query
  //   returnObj.page = data.page
  //   returnObj.limit = data.limit
  //
  //   return returnObj
  //
  // }
  //
  // categoryTableURL(params, pk) {
  //
  //   let requestURL = new restAPI().getRootURI() + '/dashboards/datatable/categorystats/False/' + pk + '?draw=' + (params.page - 1) + params.dataTableParams + "&order%5B0%5D%5Bcolumn%5D=" + params.sortColumn + "&order%5B0%5D%5Bdir%5D=" + params.direction + "&start=" + ((params.page - 1) * params.limit) + "&length=" + params.limit
  //
  //   if (params.query !== "") {
  //     requestURL = requestURL + "&start=0&length=10&search%5Bvalue%5D=" + params.query + "&search%5Bregex%5D=false"
  //   }
  //
  //   return requestURL
  // }
  //
  // alertURL(params, tableName, company, dateLimit, maxParam) {
  //   let selectedTime = '?'
  //
  //   if (dateLimit && dateLimit.length > 1) {
  //     selectedTime = "?date_column=max_" + maxParam + "&date_min=" + dateLimit[0] + "&date_max=" + dateLimit[1] + "&"
  //   }
  //
  //   let requestURL =
  //     new restAPI().getRootURI() +
  //     "/dashboards/datatable/alert_overview/" + tableName + "/" + company + '/All' +
  //     selectedTime +
  //     "draw=" +
  //     (params.page - 1) +
  //     params.dataTableParams +
  //     "&start=" +
  //     (params.page - 1) * params.limit +
  //     "&length=" +
  //     params.limit +
  //     '&search%5Bvalue%5D=&search%5Bregex%5D=true'
  //
  //   if (params.query !== "") {
  //     requestURL = requestURL + "&start=0&length=10&search%5Bvalue%5D=" + params.query + "&search%5Bregex%5D=false"
  //   }
  //
  //   return requestURL
  // }
  //
  // alertClusterURL(params, company, asset, dateLimit, maxParam) {
  //   let selectedTime = '?'
  //
  //   if (dateLimit && dateLimit.length > 1) {
  //     selectedTime = "?date_column=" + maxParam + "&date_min=" + dateLimit[0] + "&date_max=" + dateLimit[1] + "&"
  //   }
  //
  //   let requestURL =
  //     new restAPI().getRootURI() +
  //     "/dashboards/datatable/alerts/" +
  //     company +
  //     "/cluster__cluster_id/" +
  //     asset +
  //     "/" +
  //     selectedTime +
  //     "draw=" +
  //     (params.page - 1) +
  //     params.dataTableParams +
  //     "&order%5B0%5D%5Bcolumn%5D=" +
  //     params.sortColumn +
  //     "&order%5B0%5D%5Bdir%5D=" +
  //     params.direction +
  //     "&start=" +
  //     (params.page - 1) * params.limit +
  //     "&length=" +
  //     params.limit;
  //
  //   if (params.query !== "") {
  //     requestURL = requestURL + "&search%5Bvalue%5D=" + params.query + "&search%5Bregex%5D=false"
  //   } else {
  //     requestURL = requestURL + "&search%5Bvalue%5D=&search%5Bregex%5D=false"
  //   }
  //   return requestURL
  // }
  //
  // alertCIURL(params, company, asset, dateLimit, maxParam) {
  //
  //   let selectedTime = '?'
  //
  //   if (dateLimit && dateLimit.length > 1) {
  //     selectedTime = "?date_column=" + maxParam + "&date_min=" + dateLimit[0] + "&date_max=" + dateLimit[1] + "&"
  //   }
  //
  //   let requestURL =
  //     new restAPI().getRootURI() +
  //     "/dashboards/datatable/alerts/" + company +
  //     "/ci__name/" + asset +
  //     selectedTime +
  //     "draw=" +
  //     (params.page - 1) +
  //     params.dataTableParams +
  //     "&order%5B0%5D%5Bcolumn%5D=" +
  //     params.sortColumn +
  //     "&order%5B0%5D%5Bdir%5D=" +
  //     params.direction +
  //     "&start=" +
  //     (params.page - 1) * params.limit +
  //     "&length=" +
  //     params.limit;
  //
  //   if (params.query !== "") {
  //     requestURL = requestURL + "&search%5Bvalue%5D=" + params.query + "&search%5Bregex%5D=false"
  //   } else {
  //     requestURL = requestURL + "&search%5Bvalue%5D=&search%5Bregex%5D=false"
  //   }
  //
  //   return requestURL
  // }
  // alertPunchURL(params, company, tag, dateLimit, maxParam) {
  //
  //   let selectedTime = '?'
  //
  //   if (dateLimit && dateLimit.length > 1) {
  //     selectedTime = "?date_column=" + maxParam + "&date_min=" + dateLimit[0] + "&date_max=" + dateLimit[1] + "&"
  //   }
  //
  //   let requestURL =
  //     new restAPI().getRootURI() +
  //     "/dashboards/datatable/alert_window/" +
  //     company +
  //     tag +
  //     selectedTime +
  //     "draw=" +
  //     (params.page - 1) +
  //     params.dataTableParams +
  //     "&order%5B0%5D%5Bcolumn%5D=" +
  //     params.sortColumn +
  //     "&order%5B0%5D%5Bdir%5D=" +
  //     params.direction +
  //     "&start=" +
  //     (params.page - 1) * params.limit +
  //     "&length=" +
  //     params.limit;
  //
  //   if (params.query !== "") {
  //     requestURL = requestURL + "&search%5Bvalue%5D=" + params.query + "&search%5Bregex%5D=false"
  //   }
  //   return requestURL
  // }
}
