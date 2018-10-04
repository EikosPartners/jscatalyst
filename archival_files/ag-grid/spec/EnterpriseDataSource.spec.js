import Component from '@/components/Tables/EnterpriseDataSource.js'
import axios from 'axios'

const success = (rowsThisPage, lastRow)=>{return rowsThisPage.slice(0, lastRow)}

const fakeData = [ 
      {"one": "a", "two": "b", "three": "c"}, 
      {"one": "d", "two": "e", "three": "f"}, 
      {"one": "g", "two": "h", "three": "i"}, 
      {"one": "j", "two": "k", "three": "l"}, 
    ]

const fakeDataNumbers = [ 
      {"one": 1, "two": 2, "three": 3}, 
      {"one": 4, "two": 5, "three": 6}, 
    ]

describe('EnterpriseDataSource, text-based-data', () =>{
  let source, baseParams
  beforeEach(()=>{
    source = new Component(fakeData)
    baseParams = {request: {startRow: 0, endRow: 100, sortModel: [], filterModel: {}}, successCallback: success}
  })

  it('gets rows', ()=>{
    expect(source.rowDataServerSide).toEqual(fakeData)
  })

  it('sorts', ()=>{
    baseParams.request.sortModel = [{colId: "three", sort: 'desc'}]
    expect(source.getRows(baseParams)).not.toEqual(fakeData)
    expect(source.getRows(baseParams)).toEqual( [ { one: 'j', two: 'k', three: 'l' }, { one: 'g', two: 'h', three: 'i' }, { one: 'd', two: 'e', three: 'f' }, { one: 'a', two: 'b', three: 'c' } ])
  })

  it('filters', ()=>{
    baseParams.request.filterModel = {
      "three": { "type": "equals", "filter": "l", "filterType": "text"}
    };
    expect(source.getRows(baseParams)).not.toEqual(fakeData)
    expect(source.getRows(baseParams)).toEqual([ { one: 'j', two: 'k', three: 'l' } ])
  })

})

describe('EnterpriseDataSource, number-based-data', () =>{
  let source, baseParams
  beforeEach(()=>{
    source = new Component(fakeDataNumbers)
    baseParams = {request: {startRow: 0, endRow: 100, sortModel: [], filterModel: {}}, successCallback: success}
  })

  it('gets rows', ()=>{
    expect(source.rowDataServerSide).toEqual(fakeDataNumbers)
  })

  it('sorts', ()=>{
    baseParams.request.sortModel = [{colId: "three", sort: 'desc'}]
    expect(source.getRows(baseParams)).not.toEqual(fakeDataNumbers)
    expect(source.getRows(baseParams)).toEqual( [ { one: 4, two: 5, three: 6 }, { one: 1, two: 2, three: 3 } ])
  })

  it('filters', ()=>{
    baseParams.request.filterModel = {
      "three": { "type": "equals", "filter": 6, "filterType": "number"}
    };
    expect(source.getRows(baseParams)).not.toEqual(fakeData)
    expect(source.getRows(baseParams)).toEqual([ { one: 4, two: 5, three: 6 } ])
  })

})
