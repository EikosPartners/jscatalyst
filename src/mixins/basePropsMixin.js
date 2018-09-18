/**
 * Mixin for the common properties shared amongst JSCatalyst components
 * 
 * @prop {Array} dataModel - the dataModel for the component
 * @prop {string} xAxisLabel - label for x-axis, optional
 * @prop {string} yAxisLabel - label for the y-axis, optional
 * @prop {string} title - the title of the component, optional
 * 
 */

const basePropsMixin = {
    props: {
        dataModel: {
            type: Array,
            default: () => { return []; }
        },
        xAxisLabel: {
            type: String,
            default: "x"
        },
        yAxisLabel: {
            type: String,
            default: "y"
        },
        title: {
            type: String,
            default: ""
        }
    }
}

export default basePropsMixin;