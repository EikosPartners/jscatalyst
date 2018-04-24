import Vue from 'vue'
import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/Tables/AgTable.vue'
import axios from 'axios'
import Vuex from 'vuex'
const localVue = createLocalVue();
localVue.use(Vuex)

// import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
// import "../../../../node_modules/ag-grid/dist/styles/theme-material.css";

// HTK - very difficult to test actual properties because Jest does not like css
// https://facebook.github.io/jest/docs/en/webpack.html#handling-static-assets
// the suggested solution, involving remapping the CSS to an empty file, confuses ag-grid
// basically ag-grid must know where ag-material is and jest doesn't wanna tell it

import {AgGridVue} from "ag-grid-vue";

let fakeProps = {
  gridOptions: {
    columnDefs: [
      {headerName: "One (1)", field: "one"},
      {headerName: "Two (2)", field: "two"},
      {headerName: "Three (3)", field: "three"},
    ],
    rowData: [
      {"one": "a", "two": "b", "three": "c"},
      {"one": "d", "two": "e", "three": "f"},
      {"one": "g", "two": "h", "three": "i"},
      {"one": "j", "two": "k", "three": "l"},
      {"one": "m", "two": "n", "three": "o"},
      {"one": "p", "two": "q", "three": "r"},
      {"one": "s", "two": "t", "three": "u"},
      {"one": "v", "two": "w", "three": "x"},
      {"one": "y", "two": "z", "three": "yay"},
    ],
    enableSorting: true
  },
  class: 'ag-theme-material'
}
var store;
describe('AgTable, in memory row model', () => {
    let wrapper
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          themeMod: {
            displayTheme: 'light'
          }
        }
      })
      wrapper = shallow(Component, {
        propsData: fakeProps,
        store,
        localVue
      }) //, attachToDocument: true
    })

    it('it renders at all', () => {
      // console.log(wrapper.html())
      expect(wrapper.vm.$children[0].$options._componentTag).toBe('ag-grid-vue')

    })

})
