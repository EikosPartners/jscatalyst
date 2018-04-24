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
                 return receivedData

            },
            computedView() {
                let localThis = this;
                if (this.currentView) {
                    return () => import('./visualizations/d3/' + localThis.currentView + '.vue')
                }
            }
        },
        watch: {
            computedView: function (data) {
                let localThis = this;
                
                this.$options.components[this.currentView] = data;

                // Create a copy of the component so we can get its properties.
                this.$options.components[this.currentView]()
                    .then ( (comp) => {
                        let props = {};
                        let propNames = Object.keys(comp.default.props);

                        // Filter out dataModel and other props not to be updated.
                        let filteredNames = propNames.filter( (prop) => {
                            return !filterProps.includes(prop);
                        });

                        filteredNames.forEach(name => {
                            props[name] = comp.default.props[name].default;
                        });

                        // Emit that properties were found.
                        this.$emit('UIBuilderProps', props, localThis.compRowIdx, localThis.compColIdx);
                    });
            }
        }
    }
</script>