/*
Parse data for the data table
*/

import $ from 'jquery'

const regex = /(&nbsp;|<([^>]+)>)/ig

export class tableDataParser {
    parse(headingsArray, tableData) {
        return tableData.data.map(item => {
            let parsedData = {}
            item.map((i, index, array) => {
                var key = headingsArray[index]
                if (key !== undefined && key !== '_') {
                    try {
                        if ( i[0] === '<') {
                          var html = $(i)
                          var value = html[0].innerText
                          i = value
                        } else {
                        i = i.replace(regex, '')
                        }
                    } catch (e) {}

                    parsedData[key] = i
                }
            })
            return parsedData
        })
    }

    parseScorecard(headingsArray, tableData) {
        return tableData.map(item => {
            let parsedData = {}
            var key = headingsArray[0]
            parsedData[key] = item.emplid
            key = headingsArray[1]
            parsedData[key] = item.name

            item.stats.map((i, index, array) => {
                var key = headingsArray[index + 2]
                if (key !== undefined && key !== '_') {

                    try {
                        i = i.replace(regex, '')
                    } catch (e) {}

                    parsedData[key] = i
                }
            })
            return parsedData
        })
    }

    parseStats(headingsArray, tableData) {
        const decodeIcons = {"triangle-top": "Up", "triangle-bottom": "Down", "minus": "Down"}

        let parsedResponse = tableData.map(item=>{
            item.name = item.name.split(' <span')[0]
            item.trend = decodeIcons[item.trend.split('glyphicon-')[1].split("'>")[0]]
            item.stats = item.stats.map(subItem=>{

                if (subItem !== '-'){
                    var htmlObject = $(subItem)
                    var value = htmlObject[0].innerText
                    let className = htmlObject[0].className

                    let parsedItem = subItem.split('class=')[1].split('-cell>')
                    let answer
                    if (className === "red-cell") {
                      answer = value
                    } else if (className === "green-cell") {
                      answer = value
                    } else {
                      answer = value
                    }

                    return answer
                } else {

                    return subItem
                }
            })

            return item
        })


        return parsedResponse.map(item => {
            let parsedData = {}

            const keys = Object.keys(item)
            const values = Object.values(item)

            keys.forEach((key, i) => {
                if (key !== 'stats') {
                    parsedData[key] = values[i]
                } else {
                    for (let i = 0; i < item.stats.length; i++) {
                        parsedData[key + '_' + i] = item.stats[i]
                    }

                }
            })


            return parsedData
        })
    }

    categoriesParse(tableData) {
        return tableData.map(item => {
            var headingsArray = ['agent', 'category_1', 'category_2', 'category_3', 'ticket_id', 'priority', 'escalation', 'first_call_dur', 'description', 'reported_date']
            var parsedData = {}
            item.map((i, index, array) => {
                var key = headingsArray[index]
                i = i.replace(regex, '')
                parsedData[key] = i
            })
            return parsedData
        })
    }
}
