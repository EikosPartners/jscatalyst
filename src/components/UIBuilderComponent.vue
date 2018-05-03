<template>
    <v-container>
        <section class="description mb-5">
            <h1 class="display-1 mt-5">UI Builder</h1>
            <blockquote class="mt-3">
                In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.
            </blockquote>
        </section>
        <section>
            <div class="add-row">
                <v-btn @click="reset()">Reset</v-btn>
                <v-btn @click="addRow()" >Add Row</v-btn>
            </div>
        </section>
        <section class="uib-grid-wrapper">
            <div v-if="rows.length > 0" v-for="(UIRow, rowIdx) in rows" :key="rowIdx"
                @mouseover="showColumnControls(rowIdx)"
                @mouseout="hideColumnControls(rowIdx)">
                <div class="column-controls" :id="'column-controls-' + rowIdx">
                    <v-btn @click="addColumn(rowIdx)">Add Column</v-btn>
                </div>
                <div class="uib-row" :style="{ 'grid-template-columns': 'repeat(' + UIRow.cols.length + ', 1fr)'}">
                    <div v-for="(col, colIdx) in UIRow.cols" :key="colIdx" class="uib-col"
                        @mouseover="showComponentControls(rowIdx, colIdx)"
                        @mouseout="hideComponentControls(rowIdx, colIdx)">
                        <div class="component-controls" :id="'comp-controls-' + rowIdx + '-' + colIdx">
                            <v-btn @click="show(rowIdx, colIdx)">
                                <span v-if="col.component">Edit</span>
                                <span v-else>Add</span>
                            </v-btn>
                        </div>
                        <div>
                            <div>
                                <dynamic-component
                                    :currentView="col.component"
                                    :dataModel="col.dataModel"
                                    :compRowIdx="rowIdx"
                                    :compColIdx="colIdx">
                                </dynamic-component>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <v-dialog v-model="showModal" persistent max-width="1000px">
            <v-card>
                <v-card-title>
                    Add Component
                </v-card-title>
                <v-card-text>
                    <div class="controls">
                        <div class="control-item">
                            <v-select :items="options" v-model="currentComponent" label="Component" auto>
                                <option v-for="opt in options" :value="opt.value">
                                    {{ opt.text}}
                                </option>
                            </v-select>
                        </div>
                        <div class="control-item">
                          <template v-if='endpoints'>
                            <v-select name="dataSource" :items='endpoints' autocomplete label="Endpoint" v-model="currentDataSource"></v-select>
                          </template>
                          <template v-else>
                            <v-text-field name="dataSource" label="Endpoint" v-model="currentDataSource"></v-text-field>
                          </template>
                        </div>
                    </div>
                    <div v-if="currentCompProps" class="properties">
                        <div class="comp-prop" v-for="prop in Object.keys(currentCompProps)" :key="prop">
                            <v-text-field :name="prop" :label="prop" v-model="currentCompProps[prop]"></v-text-field>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <div class="control-item">
                        <v-btn @click="load(currentRowIdx, currentColIdx)">Load</v-btn>
                        <v-btn @click="close()">Close</v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import DynamicComponent from './DynamicComponent';
    import axios from 'axios';
    import allComponentsList from '../common/allComponentsList';
    import charts from '@/index.js'

    let filterProps = ["dataModel"];

    export default {
        data () {
            return {
                /**
                 * Each row is an object with property cols.
                 */
                rows: [],
                options: allComponentsList,
                showModal: false,
                currentComponent: "",
                currentRowIdx: -1,
                currentColIdx: -1,
                currentDataSource: "",
                currentCompProps: {},
                editing: false
            }
        },
        props: {
          endpoints: {
            type: Array
          }
        },
        methods: {
            addRow () {
                // Push a new row object.
                this.rows.push({
                    cols: [{ dataModel: { dataModel: [] }, propsReceived: false, props: {}, hideControls: false  }]
                });
            },
            addColumn (rowIdx) {
                if (rowIdx < this.rows.length) {
                    this.rows[rowIdx].cols.push({ dataModel: { dataModel: [] }, propsReceived: false, props: {}, hideControls: false });
                }
            },
            // Method to load a dataModel for a given component at the specified indices.
            load (rowIdx, colIdx) {
                if (rowIdx < this.rows.length && colIdx < this.rows[rowIdx].cols.length) {
                    let col = this.rows[rowIdx].cols[colIdx];

                    this.getDataForComponent(this.currentDataSource, (err, data) => {
                        if (err) {
                            console.error(err);
                            this.close();
                            return;
                        }

                        col.dataModel.dataModel = data.dataModel;
                        col.dataSource = this.currentDataSource;

                        // Give column its component.
                        col.component = this.currentComponent;
                        // Add user defined props to the column.
                        Object.keys(this.currentCompProps).forEach( prop => {
                            col.dataModel[prop] = this.currentCompProps[prop];
                        });

                        this.close();
                    });
                }
            },
            // Method to retrieve data from an endpoint.
            getDataForComponent(dataSourceEndpoint, cb) {
                if (dataSourceEndpoint) {
                    axios.get(dataSourceEndpoint)
                        .then( (response) => {
                            cb(null, response.data);
                        })
                        .catch( (err) => {
                            console.log(err);
                            cb(null, { dataModel: []});
                        });
                } else {
                    cb(null, { dataModel: []});
                }
            },
            // Handles add properties as inputs when a component is selected.
            handleProps(props, rowIdx, colIdx) {
                let col = this.rows[rowIdx].cols[colIdx];
                col.propsReceived = true;
                col.props = props;

                // Add the new properties to the dataModel.
                Object.keys(props).forEach(propName => {
                    col.dataModel[propName] = props[propName]
                });
            },
            showColumnControls (rowIdx) {
                let controls = document.querySelector('#column-controls-' + rowIdx);
                controls.style.display = "block";
            },
            hideColumnControls (rowIdx) {
                let controls = document.querySelector('#column-controls-' + rowIdx);
                controls.style.display = "none"
            },
            showComponentControls(rowIdx, colIdx) {
                let controls = document.querySelector('#comp-controls-' + rowIdx + '-' + colIdx);
                controls.style.display = "block";
            },
            hideComponentControls(rowIdx, colIdx) {
                let controls = document.querySelector('#comp-controls-' + rowIdx + '-' + colIdx);
                controls.style.display = "none"
            },
            reset () {
                this.rows = [];
            },
            show (rowIdx, colIdx) {
                if (rowIdx < this.rows.length && colIdx < this.rows[rowIdx].cols.length) {
                    this.currentRowIdx = rowIdx;
                    this.currentColIdx = colIdx;

                    // Check to see if the cell already has a component.
                    // If so, the modal will be for editing rather than adding.
                    let cell = this.rows[rowIdx].cols[colIdx];

                    if (cell.component) {
                        // Set the editing flag to not trigger the watch callback for this.currentComponent.
                        this.editing = true;
                        this.currentDataSource = cell.dataSource;
                        this.currentComponent = cell.component;

                        let props = Object.keys(cell.dataModel).filter( (prop) => {
                            if (!filterProps.includes(prop)) {
                                return cell.dataModel[prop];
                            }
                        });

                        props.forEach( (name) => {
                            this.currentCompProps[name] = cell.dataModel[name];
                        });
                    }

                    this.showModal = true;
                }
            },
            close () {
                this.showModal = false;

                this.currentCompProps = {};
                this.currentDataSource = "";
                this.currentComponent = "";
            }
        },
        watch: {
            currentComponent (data) {
                if (data === "" || data === undefined) { return; }

                // We don't need to load the component's properties if the cell is being edited.
                if (this.editing) {
                    this.editing = false;
                    return;
                }

                let comp = charts[data]
                let props = {};
                let propNames = Object.keys(comp.props);

                // Filter out dataModel and other props not to be updated.
                let filteredNames = propNames.filter( (prop) => {
                    return !filterProps.includes(prop);
                });

                filteredNames.forEach(name => {
                    props[name] = comp.props[name].default;
                });

                this.currentCompProps = props;
            }
        },
        components: {
            'dynamic-component': DynamicComponent
        }
}
</script>

<style scoped>
    .comp-prop {
        margin-right: 15px;
    }

    .controls-modal {
        background-color: white;
        padding: 20px;
    }

    .controls {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 10%;
    }

    .properties {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .add-row {
        text-align: right;
        margin-bottom: 20px;
    }

    .column-controls {
        text-align: right;
        display: none;
    }

    .component-controls {
        float: right;
        display: none;
    }

    .uib-grid-wrapper {
        border: solid 1px red;
    }

    .uib-row {
        border: solid 1px black;
        margin: 2px;

        display: grid;
        grid-template-rows: 1fr;
    }

    .uib-col {
        border: solid 1px orange;
        margin: 2px;
    }
</style>
