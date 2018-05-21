<template>
    <v-container>
        <!-- Dyanmic Component rendered area -->
        <div style="width: 100%; height: 100%">
            <v-container fluid grid-list-xs grid-list-sm grid-list-md grid-list-lg grid-list-xl class="mb-4" style="width: 100%; height: 100%">
                <h2>{{currentView}}</h2>
                <v-layout row wrap style="width: 100%; height: 100%">
                    <v-flex xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 500px;">
                        <component :is="computedView" v-bind="receivedData" style="height: 500px;"></component>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-container>
</template>

<script>
import charts from '@/index.js'

    let filterProps = ["dataModel"];

    export default {
        props: ['currentView', 'dataModel', 'compRowIdx', 'compColIdx'],
        data: function() {
            return {}
        },
        computed: {
            receivedData: function(){
                 let receivedData = {}
                 Object.keys(this.dataModel || []).forEach(item=>{ receivedData[item] = this.dataModel[item] })

                 if (!receivedData.propID) {
                     receivedData.propID = "uib-comp";
                 }

                 // Add a timestamp to the prop id so that the same component can be rendered multiple times.
                 receivedData.propID += '-' + new Date().getTime();

                 return receivedData

            },
            computedView() {
                if (this.currentView) {
                    return charts[this.currentView]
                }
            }
        },
        watch: {
            computedView: function (data) {
                this.$options.components[this.currentView] = data;
                let comp = data
                let props = {};
                let propNames = Object.keys(comp.props);

                // Filter out dataModel and other props not to be updated.
                let filteredNames = propNames.filter( (prop) => {
                    return !filterProps.includes(prop);
                });

                filteredNames.forEach(name => {
                    props[name] = comp.props[name].default;
                });

                this.$emit('UIBuilderProps', props, this.compRowIdx, this.compColIdx);

            }
        }
    }
</script>
