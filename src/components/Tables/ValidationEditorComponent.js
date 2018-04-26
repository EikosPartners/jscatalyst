import Vue from 'vue';
import axios from 'axios';

var EditorComponent = Vue.extend({
    template: `<input :ref="'input'" @keydown="onKeyDown($event)" v-model="value"/>`,
    data () {
        return {
            value: null,
            oldValue: null,
            node: null,
            rowID: null,
            columnID: null,
        }
    },
    methods: {
        getValue() {
            return this.value;
        },

        isCancelBeforeStart() {

        },

        isCancelAfterEnd() {
            let truth = (this.value.length > 3)
            if (truth) {
                alert('invalid edit: ' + this.columnID + ' must have only 3 letters')
            }
            return truth
        },

        onKeyDown(event) {
          let code = this.getCharCodeFromEvent(event)
          if (code === 9 || code === 13) {
            let data = {};
            let colID = this.columnID.toString();
            data[colID] = this.value.toUpperCase();
            let config = {headers: {'Content-Type': 'application/json'}}
            axios.patch('http://localhost:3000/data/' + this.rowID, data, config)
          }
        },

        getCharCodeFromEvent(event) {
            event = event || window.event;
            return (typeof event.which === "undefined") ? event.keyCode : event.which;
        },
        // isPopup(){
        //     return true
        // },
    },
    created() {
        this.value = this.oldValue = this.params.value;
        this.node = this.params.node;
        this.rowID = this.params.node.id;
        this.columnID = this.params.column.colId;
    },
    mounted() {
        Vue.nextTick(() => {
            if (this.$refs.input) {
                this.$refs.input.focus();
            }
        });
    }
})

export default EditorComponent
