<template>
    <v-container>
        <!-- Drop down-->
        <div>
            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Choose Component</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-select :items="options" v-model="currentViewSelect" label="Component" auto>
                        <option v-for="opt in options" :value="opt.value">
                            {{ opt.text}}
                        </option>
                    </v-select>
                </v-flex>
            </v-layout>
        </div>

        <!-- Data source input -->
        <div>
            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Data Source Endpoint</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-text-field name="dataSource" label="Endpoint" v-model="dataSource"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs2 offset-xs11>
                    <v-btn @click="getDataModel">Load</v-btn>
                </v-flex>
            </v-layout>
        </div>

        <dynamic-component :currentView="currentView" :dataModel="dataModel"></dynamic-component>
    </v-container>
</template>

<script>
    import DynamicComponent from './DynamicComponent'
    import axios from 'axios';

    export default {
        data () {
            return {
                options: [
                    { text: 'Bar Chart', value: 'BarChart' },
                    { text: 'Line Chart', value: 'LineChart'}
                ],
                dataSource: '', // http://localhost:8000/api/linechartdata // http://localhost:8000/api/barchartdata
                currentViewSelect: '',
                dataModel: {},
                currentView: ''
            }
        },
        methods: {
            getDataModel () {
                if (this.dataSource) {
                    let that = this;
                    axios.get(this.dataSource)
                        .then( (response) => {
                            that.dataModel = response.data;
                            if (that.currentViewSelect) {
                                that.currentView = that.currentViewSelect
                                }

                        })
                        .catch( (err) => {
                            console.error(err);
                        });
                }
            }
        },
        components: {
            'dynamic-component': DynamicComponent
        },
        watch: {
            dataModel: function(data){

            }
        }
    }
</script>
