/*!
 * jscatalyst v1.0.0
 * (c) 2018 Eikos Partners
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 104);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/universal/PanelHeading.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var PanelHeading = ({
  data: function data() {
    return {
      showReset: false
    };
  },
  props: {
    tooltipInfo: {
      required: false,
      default: "Tooltip TBD"
    },
    headerText: {
      type: String,
      required: true
    },
    titleText: {
      type: String
    },
    reset: {
      type: Function,
      default: undefined
    },
    icon: {
      type: String
    },
    collapsed: {
      type: Boolean
    },
    resetFunction: {
      type: Function
    },
    tableOptions: {
      required: false
    },
    downloadURL: {
      type: String
    },
    actions: {
      Type: Array
    },
    propID: {
      type: String,
      required: false,
      default: 'panelHeadingID'
    }
  },
  mounted: function mounted() {
    if (this._props.reset !== undefined) {
      this.showReset = true;
    }
  },
  methods: {
    onreset: function onreset() {
      if (this._props.reset.default !== undefined) {
        this._props.reset();
      }

      alert('reset clicked');
    }
  },
  computed: {
    collapsedTooltip: function collapsedTooltip() {
      if (this.headerText === "Interval Selector") {
        var useableStart = external__moment__default()(this.tooltipInfo.start_date);
        var useableEnd = external__moment__default()(this.tooltipInfo.end_date);
        // + "\n" + " Start: " + " End: "
        return "Interval: " + useableStart.format("M/D/YYYY") + " - " + useableEnd.format("M/D/YYYY");
      } else if (this.headerText === "Volume Selector") {
        return "Volume: " + this.tooltipInfo;
      } else if (this.headerText === "Category Controls") {
        return "Category 1: " + this.tooltipInfo[0] + " - " + "Category 2: " + this.tooltipInfo[1] + " - " + "Category 3: " + this.tooltipInfo[2];
      } else {
        return this.tooltipInfo;
      }
    }

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3aaa78d2","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/universal/PanelHeading.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"id":_vm.propID}},[_c('div',{class:{'panel-heading': !_vm.collapsed, 'collapsedBar': _vm.collapsed}},[(_vm.collapsed)?_c('span',[_c('v-tooltip',{attrs:{"right":"","allow-overflow":""}},[_c('i',{staticClass:"iconHover",attrs:{"slot":"activator","color":""},slot:"activator"},[_vm._v(_vm._s(_vm.icon))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.collapsedTooltip))])])],1):_c('span',[_c('i',{attrs:{"color":""}},[_vm._v(_vm._s(_vm.icon))]),_vm._v("\n      "+_vm._s(_vm.headerText)+"\n    "),(_vm.titleText)?_c('v-tooltip',{attrs:{"right":""}},[_c('img',{staticStyle:{"width":"16px","height":"16px"},attrs:{"slot":"activator","src":"/src/assets/img/info.png","alt":"info"},slot:"activator"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.titleText))])]):_vm._e(),_vm._v(" "),(_vm.resetFunction)?_c('span',[(_vm.headerText.toLowerCase().includes('interval'))?_c('a',{attrs:{"id":"reset-interval"},on:{"click":_vm.resetFunction}},[_vm._v("Default")]):_c('a',{attrs:{"id":"reset-filter"},on:{"click":_vm.resetFunction}},[_vm._v("Reset")])]):_vm._e()],1),_vm._v(" "),_vm._l((_vm.actions),function(action){return (_vm.actions)?_c('span',[_c('a',{staticStyle:{"float":"right"},attrs:{"target":"blank","title":action.title},on:{"click":action.click}},[_c('i',{attrs:{"color":"black"}},[_vm._v(_vm._s(action.icon))])])]):_vm._e()}),_vm._v(" "),(_vm.downloadURL)?_c('span',[_c('a',{staticStyle:{"float":"right"},attrs:{"href":_vm.downloadURL,"target":"blank","id":"downloadExcel","title":"Download to Excel"}},[_c('i',{attrs:{"color":""}},[_vm._v("file_download")])])]):_vm._e()],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var universal_PanelHeading = (esExports);
// CONCATENATED MODULE: ./src/components/universal/PanelHeading.vue
function injectStyle (ssrContext) {
  __webpack_require__(138)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PanelHeading,
  universal_PanelHeading,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_universal_PanelHeading = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeObserver; });
function getInternetExplorerVersion() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return -1;
}

var isIE = void 0;

function initCompat() {
	if (!initCompat.init) {
		initCompat.init = true;
		isIE = getInternetExplorerVersion() !== -1;
	}
}

var ResizeObserver = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "resize-observer", attrs: { "tabindex": "-1" } });
	}, staticRenderFns: [], _scopeId: 'data-v-b329ee4c',
	name: 'resize-observer',

	methods: {
		notify: function notify() {
			this.$emit('notify');
		},
		addResizeHandlers: function addResizeHandlers() {
			this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.notify);
			if (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) {
				this.notify();
			}
		},
		removeResizeHandlers: function removeResizeHandlers() {
			if (this._resizeObject && this._resizeObject.onload) {
				if (!isIE && this._resizeObject.contentDocument) {
					this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.notify);
				}
				delete this._resizeObject.onload;
			}
		}
	},

	mounted: function mounted() {
		var _this = this;

		initCompat();
		this.$nextTick(function () {
			_this._w = _this.$el.offsetWidth;
			_this._h = _this.$el.offsetHeight;
		});
		var object = document.createElement('object');
		this._resizeObject = object;
		object.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
		object.setAttribute('aria-hidden', 'true');
		object.onload = this.addResizeHandlers;
		object.type = 'text/html';
		if (isIE) {
			this.$el.appendChild(object);
		}
		object.data = 'about:blank';
		if (!isIE) {
			this.$el.appendChild(object);
		}
	},
	beforeDestroy: function beforeDestroy() {
		this.removeResizeHandlers();
	}
};

// Install the components
function install(Vue) {
	Vue.component('resize-observer', ResizeObserver);
	/* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
var plugin = {
	// eslint-disable-next-line no-undef
	version: "0.4.3",
	install: install
};

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}


/* unused harmony default export */ var _unused_webpack_default_export = (plugin);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(137)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = jquery;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = d3;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  displayTheme: function displayTheme() {
    if (this.$store.state.themeMod) return this.$store.state.themeMod.displayTheme;
    return 'light';
  },
  colors: function colors() {
    if (this.$store.state.themeMod) return this.$store.state.themeMod.themeColors;
    return ['#081A4E', '#092369', '#1A649F', '#2485B4', '#2DA8C9', '#5DC1D0', '#9AD5CD', '#D5E9CB'];
  },
  theme: function theme() {
    if (this.$store.state.themeMod) return this.$store.state.themeMod.colorTheme;
    return 'blue';
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = vue;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = moment;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var formatTimeMixin;

/* harmony default export */ __webpack_exports__["a"] = (formatTimeMixin = {
	// methods: {

	// formatTime: function(option){
	//     let now = this.moment()
	//     let dateMax = this.moment().add(1, 'day')
	//     let dateMin
	//     let returnValue = []
	// if (option === "Today") {
	//       dateMin = now
	//       returnValue = [dateMin.format('YYYY-MM-DD'), dateMax.format('YYYY-MM-DD')]
	//     } else if (option === "Last Week") {
	//       dateMin = now.subtract(1, 'week')
	//       returnValue = [dateMin.format('YYYY-MM-DD'), dateMax.format('YYYY-MM-DD')]
	//     } else if (option === "Last Month") {
	//       dateMin = now.subtract(1, 'month')
	//       returnValue = [dateMin.format('YYYY-MM-DD'), dateMax.format('YYYY-MM-DD')]
	//     } else if (option === "Last 3 Months") {
	//       dateMin = now.subtract(3, 'months')
	//       returnValue = [dateMin.format('YYYY-MM-DD'), dateMax.format('YYYY-MM-DD')]
	//     } else if (option === "Custom Range") {
	//       // returnValue =  // HTK
	//     } else if (option === "Reset") {
	//
	//     }
	//     return returnValue
	//   },

	// }

	// 	}
	// }
	data: function data() {
		return {
			d3Time: {
				'HH:mm:ss': '%H:%M:%S',
				'H:mm:ss': '%H:%M:%S',
				'hh:mm:ss': '%I:%M:%S',
				'h:mm:ss': '%I:%M:%S',
				'MM/YYYY': '%m/%Y',
				'M/YYYY': '%m/%Y',
				'M/YY': '%m/%y',
				'MMM YYYY': '%b %Y',
				'MMM YY': '%b %y',
				'MM/DD/YY': '%m/%d/%y',
				'MM/DD/YYYY': '%m/%d/%Y',
				'MM-DD-YY': '%m-%d-%y',
				'MM-DD-YYYY': '%m-%d-%Y',
				'MMMM YYYY': '%B %Y',
				'MMMM YY': '%B %y',
				'M/DD/YY': '%m/%d/%y',
				'M/DD/YYYY': '%m/%d/%Y',
				'M-DD-YY': '%m-%d-%y',
				'M-DD-YYYY': '%m-%d-%Y',
				'M/D/YY': '%m/%e/%y',
				'M/D/YYYY': '%m/%e/%Y',
				'M-D-YY': '%m-%e-%y',
				'M-D-YYYY': '%m-%e-%Y',
				'MM/D/YY': '%m/%e/%y',
				'MM/D/YYYY': '%m/%e/%Y',
				'MM-D-YY': '%m-%e-%y',
				'MM-D-YYYY': '%m-%e-%Y',
				'YYYY-MM-DD': '%Y-%m-%d',
				'YYYY-DD-MM': '%Y-%d-%m',
				'D-MMM-YY': '%d-%b-%y',
				'MMMM': '%B',
				'MMM': '%b',
				'ddd': '%a',
				'dddd': '%A',
				'D/MM/YY': '%e/%m/%y',
				'D/MM/YYYY': '%e/%m/%Y',
				'D-MM-YY': '%e-%m-%y',
				'D-MM-YYYY': '%e-%m-%Y',
				'D/M/YY': '%e/%m/%y',
				'D/M/YYYY': '%e/%m/%Y',
				'D-M-YY': '%e-%m-%y',
				'D-M-YYYY': '%e-%m-%Y',
				'DD/M/YY': '%d/%m/%y',
				'DD/M/YYYY': '%d/%m/%Y',
				'DD-M-YY': '%d-%m-%y',
				'DD-M-YYYY': '%d-%m-%Y',
				'DD/MM/YY': '%d/%m/%y',
				'DD/MM/YYYY': '%d/%m/%Y',
				'DD-MM-YY': '%d-%m-%y',
				'DD-MM-YYYY': '%d-%m-%Y',
				'MMMM D': '%B %e',
				'MMM D': '%b %e',
				'M/D': '%m/%e',
				"MMM DD YYYY HH:mm:ss": '%b %d %Y %H:%M:%S'
			}
		};
	}

});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(129), __esModule: true };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-chartjs/es/mixins/index.js
function dataHandler(newData, oldData) {
  if (oldData) {
    var chart = this.$data._chart;
    var newDatasetLabels = newData.datasets.map(function (dataset) {
      return dataset.label;
    });
    var oldDatasetLabels = oldData.datasets.map(function (dataset) {
      return dataset.label;
    });
    var oldLabels = JSON.stringify(oldDatasetLabels);
    var newLabels = JSON.stringify(newDatasetLabels);

    if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
      newData.datasets.forEach(function (dataset, i) {
        var oldDatasetKeys = Object.keys(oldData.datasets[i]);
        var newDatasetKeys = Object.keys(dataset);
        var deletionKeys = oldDatasetKeys.filter(function (key) {
          return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
        });
        deletionKeys.forEach(function (deletionKey) {
          delete chart.data.datasets[i][deletionKey];
        });

        for (var attribute in dataset) {
          if (dataset.hasOwnProperty(attribute)) {
            chart.data.datasets[i][attribute] = dataset[attribute];
          }
        }
      });

      if (newData.hasOwnProperty('labels')) {
        chart.data.labels = newData.labels;
      }

      if (newData.hasOwnProperty('xLabels')) {
        chart.data.xLabels = newData.xLabels;
      }

      if (newData.hasOwnProperty('yLabels')) {
        chart.data.yLabels = newData.yLabels;
      }

      chart.update();
    } else {
      chart.destroy();
      this.renderChart(this.chartData, this.options);
    }
  } else {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }

    this.renderChart(this.chartData, this.options);
  }
}

var reactiveData = {
  data: function data() {
    return {
      chartData: null
    };
  },
  watch: {
    'chartData': dataHandler
  }
};
var reactiveProp = {
  props: {
    chartData: {
      required: true
    }
  },
  watch: {
    'chartData': dataHandler
  }
};
/* harmony default export */ var mixins = ({
  reactiveData: reactiveData,
  reactiveProp: reactiveProp
});
// EXTERNAL MODULE: external "chart.js"
var external__chart_js_ = __webpack_require__(172);
var external__chart_js__default = /*#__PURE__*/__webpack_require__.n(external__chart_js_);

// CONCATENATED MODULE: ./node_modules/vue-chartjs/es/BaseCharts.js


function generateChart(chartId, chartType) {
  return {
    render: function render(createElement) {
      return createElement('div', {
        style: this.styles,
        class: this.cssClasses
      }, [createElement('canvas', {
        attrs: {
          id: this.chartId,
          width: this.width,
          height: this.height
        },
        ref: 'canvas'
      })]);
    },
    props: {
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 400,
        type: Number
      },
      height: {
        default: 400,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object
      },
      plugins: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },
    data: function data() {
      return {
        _chart: null,
        _plugins: this.plugins
      };
    },
    methods: {
      addPlugin: function addPlugin(plugin) {
        this.$data._plugins.push(plugin);
      },
      renderChart: function renderChart(data, options) {
        this.$data._chart = new external__chart_js__default.a(this.$refs.canvas.getContext('2d'), {
          type: chartType,
          data: data,
          options: options,
          plugins: this.$data._plugins
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
    }
  };
}

var Bar = generateChart('bar-chart', 'bar');
var HorizontalBar = generateChart('horizontalbar-chart', 'horizontalBar');
var Doughnut = generateChart('doughnut-chart', 'doughnut');
var Line = generateChart('line-chart', 'line');
var Pie = generateChart('pie-chart', 'pie');
var PolarArea = generateChart('polar-chart', 'polarArea');
var Radar = generateChart('radar-chart', 'radar');
var Bubble = generateChart('bubble-chart', 'bubble');
var Scatter = generateChart('scatter-chart', 'scatter');
/* harmony default export */ var BaseCharts = ({
  Bar: Bar,
  HorizontalBar: HorizontalBar,
  Doughnut: Doughnut,
  Line: Line,
  Pie: Pie,
  PolarArea: PolarArea,
  Radar: Radar,
  Bubble: Bubble,
  Scatter: Scatter
});
// CONCATENATED MODULE: ./node_modules/vue-chartjs/es/index.js
/* unused harmony export VueCharts */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return Bar; });
/* unused concated harmony import HorizontalBar */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return HorizontalBar; });
/* unused concated harmony import Doughnut */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return Doughnut; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "c", function() { return Line; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "d", function() { return Pie; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "e", function() { return PolarArea; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "f", function() { return Radar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return Bubble; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "g", function() { return Scatter; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "h", function() { return mixins; });


var VueCharts = {
  Bar: Bar,
  HorizontalBar: HorizontalBar,
  Doughnut: Doughnut,
  Line: Line,
  Pie: Pie,
  PolarArea: PolarArea,
  Radar: Radar,
  Bubble: Bubble,
  Scatter: Scatter,
  mixins: mixins
};
/* harmony default export */ var es = (VueCharts);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);





var ChartjsHelper = function () {
  function ChartjsHelper() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ChartjsHelper);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ChartjsHelper, [{
    key: 'lineChartParser',

    /* The data needed for Line graph can be in two forms
      (1) an array with of data points
        {
          date: 'date string',
          value: number value on that date
        }
      (2) an array of objects, each corresponding to a separate line.
        the key of each object will be the label for that line, the value
        at that key should be the array of data points like above
        [
          {
            'line1': [
              {
                date: 'date string',
                value: number value on that date
              }, ...
            ]
          },
          {
            'line2': [
              {
                date: 'date string',
                value: number value on that date
              }, ...
            ]
          }
        ]
    */
    value: function lineChartParser(data, chartLabel, lineColors, area) {
      // loop over the data to separate out the label for x axis
      // and the datapoint value
      var labels = [];

      // If dataModel is an array of data for only one line
      if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(data[0]).indexOf('value') !== -1) {
        data.sort(function (a, b) {
          return __WEBPACK_IMPORTED_MODULE_3_moment___default()(a.date, 'YYYY-MM-DD') - __WEBPACK_IMPORTED_MODULE_3_moment___default()(b.date, 'YYYY-MM-DD');
        });
        var lineData = {
          data: [],
          label: chartLabel,
          fill: area,
          borderColor: lineColors[0],
          backgroundColor: lineColors[0]
        };
        data.forEach(function (el) {
          labels.push(__WEBPACK_IMPORTED_MODULE_3_moment___default()(el.date, 'YYY-MM-DD').format('MMM Do YY'));
          lineData.data.push(el.value);
        });
        // put the single line's data into an array so it can be used by chartjs
        var dataset = [lineData];
      } else {
        // If dataModel is an array of objects, each corresponding to a line
        var dataset = [];
        data.forEach(function (el, ind) {
          var key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(el)[0];
          // The key of the line data object will be its label
          el[key].sort(function (a, b) {
            return __WEBPACK_IMPORTED_MODULE_3_moment___default()(a.date, 'YYYY-MM-DD') - __WEBPACK_IMPORTED_MODULE_3_moment___default()(b.date, 'YYYY-MM-DD');
          });
          var lineData = {
            label: [key],
            data: [],
            fill: area,
            // set color of line depending on index
            borderColor: lineColors[ind],
            backgroundColor: lineColors[ind]
          };
          el[key].forEach(function (datapoint) {
            // only copy the labels of the x-axis once
            if (labels.length < el[key].length) {
              labels.push(__WEBPACK_IMPORTED_MODULE_3_moment___default()(datapoint.date, 'YYYY-MM-DD').format('MMM Do YY'));
            }
            // push the individual line's data point into it's data array
            lineData.data.push(datapoint.value);
          });
          // add the line's data to the dataset array
          dataset.push(lineData);
        });
      }
      return { labels: labels, datasets: dataset };
    }
  }, {
    key: 'barChartParser',
    value: function barChartParser(data, metric, colors) {
      var labels = [];
      var bars = [];
      data.forEach(function (el) {
        labels.push(el.x);
        bars.push(el.y);
      });
      return { labels: labels, datasets: [{ data: bars, label: metric, backgroundColor: colors }] };
    }
  }, {
    key: 'polarChartParser',
    value: function polarChartParser(data, colors) {
      var labels = [];
      var slices = [];
      data.forEach(function (el) {
        labels.push(el.label);
        slices.push(el.value);
      });
      return { labels: labels, datasets: [{ data: slices, backgroundColor: colors }] };
    }
  }, {
    key: 'bubbleChartParser',
    value: function bubbleChartParser(data, colors) {
      var datasets = [];
      data.forEach(function (el, ind) {
        var bubbleData = {
          label: el.label,
          data: [{
            x: el.x,
            y: el.y,
            value: el.value
          }],
          backgroundColor: colors[ind]
        };
        datasets.push(bubbleData);
      });
      return { datasets: datasets };
    }
  }, {
    key: 'scatterParser',
    value: function scatterParser(data, colors) {
      var datasets = [];
      data.forEach(function (el, ind) {
        var scatterData = {
          label: el.label,
          data: [{
            x: el.x,
            y: el.y
          }],
          backgroundColor: colors[ind]
        };
        datasets.push(scatterData);
      });
      return { datasets: datasets };
    }
  }, {
    key: 'barLineParser',
    value: function barLineParser(data, colors) {
      data.sort(function (a, b) {
        return __WEBPACK_IMPORTED_MODULE_3_moment___default()(a.date, 'YYYY-MM-DD') - __WEBPACK_IMPORTED_MODULE_3_moment___default()(b.date, 'YYYY-MM-DD');
      });
      var datapoints = [];
      var labels = [];
      for (var i = 0; i < data.length / colors.length; i++) {
        colors = colors.concat(colors.slice(1));
      }

      data.forEach(function (el) {
        labels.push(__WEBPACK_IMPORTED_MODULE_3_moment___default()(el.date, 'YYYY-MM-DD').format('MMM DD YY'));
        datapoints.push(el.value);
      });
      var lineData = {
        type: 'line',
        data: datapoints,
        borderColor: colors[0],
        backgroundColor: colors[0],
        fill: false,
        label: 'Line Data'
      };
      var barData = {
        type: 'bar',
        data: datapoints,
        backgroundColor: colors.slice(1),
        label: 'Bar Data'
      };
      return { labels: labels, datasets: [barData, lineData] };
    }
  }, {
    key: 'radarChartParser',
    value: function radarChartParser(data, colors) {
      var labels = [];
      var datasets = [];

      data.forEach(function (el, ind) {
        var radar = {
          label: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(el)[0],
          data: [],
          backgroundColor: colors[ind]
        };
        el[radar.label].forEach(function (datapoint) {
          if (labels.length < el[radar.label].length) {
            labels.push(datapoint.label);
          }
          radar.data.push(datapoint.value);
        });
        datasets.push(radar);
      });
      return { labels: labels, datasets: datasets };
    }
  }, {
    key: 'baseDarkOptions',
    value: function baseDarkOptions(chart, maxX, maxY) {
      var options = { scales: {}, legend: { labels: {} } };
      if (chart === 'radar' || chart === 'polar') {
        options = { scale: { gridLines: {}, ticks: {} }, legend: { labels: {} } };
        options.scale = {
          gridLines: { color: 'lightgrey' },
          angleLines: { color: 'lightgrey' },
          // options.scale.ticks.backdropColor ='rgba(0,0,0,0),
          ticks: { color: 'lightgrey' }
        };
        options.legend.labels.fontColor = 'lightgrey';
        options.maintainAspectRatio = false;
      } else if (chart === 'pie') {
        options = { legend: { labels: {} } };
        options.legend.labels.fontColor = 'lightgrey';
        options.maintainAspectRatio = false;
      } else if (chart === 'bubble' || chart === 'scatter') {
        options = {
          maintainAspectRatio: false,
          legend: {
            labels: { fontColor: 'lightgrey' }
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'lightgrey'
              },
              ticks: {
                "beginAtZero": true,
                max: maxX,
                fontColor: 'lightgrey'
              }
            }],
            yAxes: [{
              gridLines: {
                color: 'lightgrey'
              },
              ticks: {
                "beginAtZero": true,
                max: maxY,
                fontColor: 'lightgrey'
              }
            }]
          }
        };
      } else {
        options.scales = {
          xAxes: [{
            gridLines: {
              color: 'lightgrey'
            },
            ticks: {
              fontColor: 'lightgrey'
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'lightgrey'
            },
            ticks: {
              fontColor: 'lightgrey'
            }
          }],
          gridLines: { color: 'lightgrey' },
          angleLines: { color: 'lightgrey' },
          ticks: { color: 'lightgrey' }
        };
        options.legend.labels.fontColor = 'lightgrey';
        options.maintainAspectRatio = false;
      }
      return options;
    }
  }, {
    key: 'scatterBubbleOptions',
    value: function scatterBubbleOptions(maxX, maxY) {
      return {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              "beginAtZero": true,
              max: maxX
            }
          }],
          yAxes: [{
            ticks: {
              "beginAtZero": true,
              max: maxY
            }
          }]
        }
      };
    }
  }]);

  return ChartjsHelper;
}();

/* harmony default export */ __webpack_exports__["a"] = (ChartjsHelper);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(97)('wks');
var uid = __webpack_require__(98);
var Symbol = __webpack_require__(18).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = plotly.js;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(18);
var core = __webpack_require__(10);
var ctx = __webpack_require__(91);
var hide = __webpack_require__(22);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(23);
var IE8_DOM_DEFINE = __webpack_require__(111);
var toPrimitive = __webpack_require__(112);
var dP = Object.defineProperty;

exports.f = __webpack_require__(20) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(24)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var PlotlyHelper = function () {
  function PlotlyHelper() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PlotlyHelper);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PlotlyHelper, [{
    key: 'barChartParser',
    value: function barChartParser(data, colors) {
      var xValues = data.map(function (el) {
        return el.x;
      });
      var barsData = {};

      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(data[0]).filter(function (el) {
        return el !== 'x';
      }).forEach(function (key) {
        return barsData[key] = [];
      });
      data.forEach(function (el) {
        for (var bar in barsData) {
          barsData[bar].push(el[bar]);
        }
      });

      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(barsData).map(function (bar, i) {
        return {
          x: xValues,
          name: bar,
          y: barsData[bar],
          type: 'bar',
          marker: {
            color: colors[i]
          },
          hoverinfo: 'none'
        };
      });
    }
  }, {
    key: 'areaChartParser',
    value: function areaChartParser(data, colors) {
      var xValues = data.map(function (el) {
        return el.x;
      });
      var linesData = {};
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(data[0]).filter(function (el) {
        return el !== 'x';
      }).forEach(function (key) {
        return linesData[key] = [];
      });
      data.forEach(function (el) {
        for (var line in linesData) {
          linesData[line].push(el[line]);
        }
      });

      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(linesData).map(function (line, i) {
        return {
          x: xValues,
          name: line,
          y: linesData[line],
          type: 'scatter',
          line: {
            color: colors[i]
          },
          fill: 'tonexty'
          //hoverinfo: 'none'
        };
      });
    }
  }, {
    key: 'scatterChartParser',
    value: function scatterChartParser(data, colors) {
      var categories = data.map(function (el) {
        return el.category;
      });
      var seen = {};
      var categoryData = {};
      categories = categories.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : seen[item] = true;
      }).forEach(function (category) {
        return categoryData[category] = { x: [], y: [], labels: [] };
      });

      data.forEach(function (el) {
        categoryData[el.category].x.push(el.x);
        categoryData[el.category].y.push(el.y);
        categoryData[el.category].labels.push(el.label);
      });
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(categoryData).map(function (category, i) {
        var color = i % 2 === 1 ? colors[colors.length - i] : colors[i];
        return {
          name: category,
          x: categoryData[category].x,
          y: categoryData[category].y,
          mode: 'markers+text',
          type: 'scatter',
          text: categoryData[category].labels,
          textposition: 'top center',
          marker: {
            color: color,
            size: '12'
          },
          hoverinfo: 'none'
        };
      });
    }
  }, {
    key: 'donutChartParser',
    value: function donutChartParser(data, colors) {
      var charts = data.map(function (el) {
        return el.chart;
      });
      var seen = {};
      var chartData = {};
      var charts = charts.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : seen[item] = true;
      }).forEach(function (chart) {
        return chartData[chart] = { labels: [], values: [] };
      });

      data.forEach(function (el) {
        chartData[el.chart].labels.push(el.label);
        chartData[el.chart].values.push(el.value);
      });

      var numOfCharts = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(chartData).length;
      var range = 1.0 / numOfCharts;

      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(chartData).map(function (chart, i) {
        var start, finish;
        i === 0 ? start = 0 : start = i * range + .02;
        finish = (i + 1) * range - .02;

        return {
          name: chart,
          values: chartData[chart].values,
          labels: chartData[chart].labels,
          marker: {
            colors: colors
          },
          hoverinfo: 'label+percent+name',
          hole: 0.4,
          type: 'pie',
          domain: {
            x: [start, finish]
          }
        };
      });
    }
  }, {
    key: 'bubbleChartParser',
    value: function bubbleChartParser(data, colors) {
      var bubbleData = {
        x: [],
        y: [],
        text: [],
        mode: 'markers',
        marker: {
          size: [],
          color: colors
        },
        hoverinfo: 'none'
      };
      data.forEach(function (el) {
        bubbleData.x.push(el.x);
        bubbleData.y.push(el.y);
        bubbleData.text.push(el.label);
        bubbleData.marker.size.push(el.value);
      });
      return [bubbleData];
    }
  }]);

  return PlotlyHelper;
}();

/* harmony default export */ __webpack_exports__["a"] = (PlotlyHelper);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(19);
var createDesc = __webpack_require__(57);
module.exports = __webpack_require__(20) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(56);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(55);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/BarChart.vue
//
//
//
//
//
//
//
//







/** Bar Chart D3 component
* @module Bar chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} xaxisvalue - label for x-axis, optional
* @param {string} yaxisvalue - label for y-axis, optional
*
* @example
* usage on a page:
* <bar-chart
* :dataModel='barChartData'
* propID='exampleBarChart'
* :xaxisLabel='time'
* :yaxisLabel='distance'
* ></bar-chart>
*
*/

/* harmony default export */ var BarChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} date - date string on x-axis ("5/15 - 6/14")
     * @property {Number} value - y-axis value
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    xaxisLabel: {
      type: String,
      default: ""
    },
    yaxisLabel: {
      type: String,
      default: ""
    },
    propID: {
      type: String,
      default: "container-barchart"
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  mounted: function mounted() {
    this.drawBarPlot(this._props.dataModel, this._props.propID, this._props.yaxisLabel, this._props.xaxisLabel);
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      var localThis = this;
      external__vue__default.a.nextTick(function () {
        localThis.drawBarPlot();
      });
    }
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
  },

  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.drawBarPlot();
    },

    /**
    * @function drawBarPlot - function that draws the barchart
    * @param {Array} data
    * the dataModel
    * @param {string} propID
    * the ID for the visualization, optional
    * @param {string} xaxisvalue
    * label for x-axis, optional
    * @param {string} yaxisvalue
    * label for y-axis, optional
    * @param {function} mouseover_callback
    * callback for mouseover function
    */

    drawBarPlot: function drawBarPlot() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataModel;
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.propID;
      var yaxisvalue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._props.yaxisLabel;
      var xaxisvalue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this._props.xaxisLabel;
      var mouseover_callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (x) {
        return x;
      };

      external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
      var selection_string = "#" + id;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);
      var margin = { top: 20, right: 30, bottom: 40, left: 40 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      var x = external__d3_["scaleBand"]().range([0, width]).paddingInner(.2).paddingOuter(.2);

      var y = external__d3_["scaleLinear"]().range([height, 0]);

      var xAxis = external__d3_["axisBottom"]().scale(x).tickSizeOuter(0);

      var yAxis = external__d3_["axisLeft"]().scale(y).tickSizeInner(-width).tickSizeOuter(0);

      var tooltip = external__d3_["select"]("body").append("div").attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip").style("opacity", 0);

      var chart = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      if (data.length > 0) {
        y.domain([0, external__d3_["max"](data, function (d) {
          return d.y;
        })]);
        x.domain(data.map(function (d) {
          return d.x;
        }));
      }

      chart.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width / 2 + margin.right).attr("y", 30).style("text-anchor", "end").text(xaxisvalue);

      chart.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(yaxisvalue);

      if (data.length > 0) {
        chart.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
          return x(d.x);
        }).attr("y", function (d) {
          return y(d.y);
        }).attr("height", function (d) {
          return height - y(d.y);
        }).attr("width", x.bandwidth() - x.paddingInner()).style("fill", "var(--fifth)").on("mouseover", function (d) {
          var yval = mouseover_callback(d.y);
          tooltip.transition().duration(100).style("opacity", 1);
          tooltip.html(xaxisvalue + ": <b>" + d.x + "</b><br>" + yaxisvalue + ": <b>" + yval + "</b>").style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
          external__d3_["select"](this).transition().duration(50).style("fill", "var(--fourth)");
        }).on("mouseout", function (d) {
          external__d3_["select"](this).transition().duration(100).style("fill", "var(--fifth)");
          tooltip.transition().duration(300).style("opacity", 0);
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-32d783a3","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/BarChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_BarChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/BarChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(136)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  BarChart,
  d3_BarChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_BarChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var object_keys = __webpack_require__(11);
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/BoxPlot.vue

//
//
//
//
//
//
//
//







/** Box Plot D3 component
* @module Box Plot
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} metric - label for x-axis, optional
* @param {string} yLabel - label for y-axis, optional
*
* @example
* usage on a page:
* <box-plot
* :dataModel="boxPlotData"
* propID="container-boxplot"
* ></box-plot>
*
*/

/* harmony default export */ var BoxPlot = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} value - time ("Q1") with the value for that time
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: 'container-boxplot'
    },
    metric: {
      type: String,
      default: 'Revenue in $'
    },
    yLabel: {
      type: String,
      default: 'Revenue'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData && data.length !== 0) {
        this.internalData = data;
        this.internalData.length !== 0 ? this.render() : null;
      }
    }
  },
  mounted: function mounted() {
    this.dataModel.length === 0 ? null : this.render();
  },

  methods: {

    /**
    * @function render - function that draws the box chart
    * called in mounted
    */

    render: function render() {
      external__d3_["selectAll"]('.d3_visuals_tooltip').style('opacity', 0);

      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " > svg") != null) {
        external__jquery__default()(selection_string + " > svg").remove();
      }

      var element = external__jquery__default()(selection_string);
      var margin = { top: 20, right: 30, bottom: 60, left: 50 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;
      var min = Infinity,
          max = -Infinity;

      // using an array of arrays with
      // data[n][2]
      // where n = number of columns in the csv file
      // data[i][0] = name of the ith column
      // data[i][1] = array of values of ith column
      // get the keys of the data to use as the labels
      var data = [];
      var dataLabels = keys_default()(this.dataModel[0]);
      for (var i = 0; i < dataLabels.length; i++) {
        data[i] = [];
        data[i][0] = dataLabels[i];
        data[i][1] = [];
      }

      // parse in the data
      this.dataModel.forEach(function (el) {
        var keys = keys_default()(el);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
          values.push(Math.floor(el[keys[i]]));
          data[i][1].push(el[keys[i]]);
        }

        var rowMax = external__d3_["max"](values);
        var rowMin = external__d3_["min"](values);

        if (rowMax > max) max = rowMax;
        if (rowMin < min) min = rowMin;
      });

      // var chart = this.drawChart(data, min, max, iqr(1.5), height)

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("class", "box").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // the x-axis
      var x = external__d3_["scaleBand"]().domain(data.map(function (d) {
        return d[0];
      })).range([0, width]).paddingInner(.4).paddingOuter(.2);

      var xAxis = external__d3_["axisBottom"]().scale(x);

      // the y-axis
      var y = external__d3_["scaleLinear"]().domain([min, max]).range([height, 0]);

      var yAxis = external__d3_["axisLeft"]().scale(y);

      // draw the boxplots
      svg.selectAll(".box").data(data).enter().append("g").attr("transform", function (d) {
        return "translate(" + x(d[0]) + "," + 0 + ")";
      }).each(function (data, i) {
        var width = x.bandwidth(),
            duration = 0,
            domain = [min, max],
            whiskers = iqr(2),
            quartiles = boxQuartiles,
            tickFormat = null;

        var d = data[1].sort(external__d3_["ascending"]);

        var g = external__d3_["select"](this),
            n = d.length,
            plotMin = d[0],
            plotMax = d[n - 1];

        // Compute quartiles. Must return exactly 3 elements.
        var quartileData = d.quartiles = quartiles(d);

        // Compute whiskers. Must return exactly 2 elements, or null.
        var whiskerIndices = whiskers && whiskers.call(this, d, i),
            whiskerData = whiskerIndices && whiskerIndices.map(function (i) {
          return d[i];
        });

        // Compute outliers. If no whiskers are specified, all data are "outliers".
        // We compute the outliers as indices, so that we can join across transitions!
        var outlierIndices = whiskerIndices ? external__d3_["range"](0, whiskerIndices[0]).concat(external__d3_["range"](whiskerIndices[1] + 1, n)) : external__d3_["range"](n);

        // Compute the new x-scale.
        var x1 = y;

        // Note: the box, median, and box tick elements are fixed in number,
        // so we only have to handle enter and update. In contrast, the outliers
        // and other elements are variable, so we need to exit them! Variable
        // elements also fade in and out.

        // Update center line: the vertical line spanning the whiskers.
        var center = g.selectAll("line.center").data(whiskerData ? [whiskerData] : []);

        //vertical line
        center.enter().insert("line", "rect").attr("class", "center").attr("x1", width / 2).attr("y1", function (d) {
          return x1(d[0]);
        }).attr("x2", width / 2).attr("y2", function (d) {
          return x1(d[1]);
        });

        // Update innerquartile box.
        var box = g.selectAll("rect.box").data([quartileData]);

        box.enter().append("rect").attr("class", "box").attr("x", 0).attr("y", function (d) {
          return x1(d[2]);
        }).attr("width", width).attr("height", function (d) {
          return x1(d[0]) - x1(d[2]);
        });

        // Update median line.
        var medianLine = g.selectAll("line.median").data([quartileData[1]]);

        medianLine.enter().append("line").attr("class", "median").attr("x1", 0).attr("y1", x1).attr("x2", width).attr("y2", x1);

        // Update whiskers.
        var whisker = g.selectAll("line.whisker").data(whiskerData || []);

        whisker.enter().insert("line", "circle, text").attr("class", "whisker").attr("x1", 0).attr("y1", x1).attr("x2", 0 + width).attr("y2", x1);

        // Update outliers.
        var outlier = g.selectAll("circle.outlier").data(outlierIndices, Number);

        outlier.enter().insert("circle", "text").attr("class", "outlier").attr("r", 5).attr("cx", width / 2).attr("cy", function (i) {
          return x1(d[i]);
        });

        // Compute the tick format.
        var format = tickFormat || x1.tickFormat(8);

        // Update box ticks.
        var boxTick = g.selectAll("text.box").data(quartileData);

        boxTick.enter().append("text").attr("class", "box").attr("dy", ".3em").attr("dx", function (d, i) {
          return i & 1 ? 6 : -6;
        }).attr("x", function (d, i) {
          return i & 1 ? +width : 0;
        }).attr("y", x1).attr("text-anchor", function (d, i) {
          return i & 1 ? "start" : "end";
        }).text(format);

        // Update whisker ticks. These are handled separately from the box
        // ticks because they may or may not exist, and we want don't want
        // to join box ticks pre-transition with whisker ticks post-.
        var whiskerTick = g.selectAll("text.whisker").data(whiskerData || []);

        whiskerTick.enter().append("text").attr("class", "whisker").attr("dy", ".3em").attr("dx", 6).attr("x", width).attr("y", x1).text(format);

        function boxQuartiles(d) {
          return [external__d3_["quantile"](d, .25), external__d3_["quantile"](d, .5), external__d3_["quantile"](d, .75)];
        }
      });

      // add a title
      svg.append("text").attr("x", width / 2).attr("y", 0 + margin.top / 2).attr("text-anchor", "middle").style("font-size", "18px")
      //.style("text-decoration", "underline")
      .text(this.yLabel);

      // draw y axis
      svg.append("g").attr("class", "y axis").call(yAxis).append("text") // and text1
      .attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").style("font-size", "16px").style('text-color', 'black').text(this.metric);

      // draw x axis
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (height + margin.top + 10) + ")").call(xAxis).append("text") // text label for the x axis
      .attr("x", width / 2).attr("y", 10).attr("dy", ".71em").style("text-anchor", "middle").style("font-size", "16px").text("Year");

      // Returns a function to compute the interquartile range.
      function iqr(k) {
        return function (d, i) {
          var q1 = d.quartiles[0],
              q3 = d.quartiles[2],
              iqr = (q3 - q1) * k,
              i = -1,
              j = d.length;
          while (d[++i] < q1 - iqr) {}
          while (d[--j] > q3 + iqr) {}
          return [i, j];
        };
      }
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      var _this = this;

      // setTimeout to prevent flashing when resizing
      setTimeout(function () {
        _this.render();
      }, 10);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-034f7d12","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/BoxPlot.vue
var BoxPlot_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: BoxPlot_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_BoxPlot = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/BoxPlot.vue
function injectStyle (ssrContext) {
  __webpack_require__(139)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  BoxPlot,
  d3_BoxPlot,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_BoxPlot = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/BubbleChart.vue
//
//
//
//
//
//
//
//




// import 'moment-duration-format'




/** Bubble Chart D3 component
 * @module Bubble Chart
 *
 * @param {Array} dataModel - the dataModel for the component
 * @param {string} propID - the ID for the component
 *
 * @example
 * usage on a page:
 * <bubble-chart
 * :dataModel='bubbleChartData'
 * propID='exampleBubbleChart'
 * :xaxisLabel='time'
 * :yaxisLabel='distance'
 * ></bubble-chart>
 *
 */

/* harmony default export */ var BubbleChart = ({
	components: {
		'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
		'panel-heading': PanelHeading["a" /* default */]
	},
	props: {
		type: {
			type: String,
			default: 'category'
		},
		dataModel: {
			type: Array
		},
		propID: {
			type: String,
			default: "bubble-chart"
		},
		currentCategories: {
			type: Array,
			default: function _default() {
				return ["all", "all", "all"];
			}
		},
		xAxisLabel: {
			type: String,
			default: "Duration"
		},
		yAxisLabel: {
			type: String,
			default: "Escalation"
		},
		isTime: {
			type: Boolean,
			default: true
		},
		title: {
			type: String
		}
	},
	data: function data() {
		return {
			margin: { top: 20, right: 10, bottom: 30, left: 20 },
			updateGraph: false,
			internalData: [],
			moment: null,
			firstDraw: true,
			countingDots: 0,
			zooming: false
		};
	},
	computed: {
		processedData: function processedData() {
			var data = this.dataModel;
			try {
				data.sort(function (x, y) {
					return external__d3_["descending"](x.value, y.value);
				});
			} catch (err) {
				console.log(err);
			}
			return data;
		}
	},
	watch: {
		zooming: function zooming(data) {
			console.log(data);
		},
		dataModel: function dataModel(data) {
			if (this.internalData.length === 0) {
				this.updateGraph = false;
			} else {
				this.updateGraph = true;
			}
			if (this.internalData !== data) {
				// why is this called twice for each graph on initial load? HTK
				this.internalData = data;
				this.drawTopPlotX(data);
			}
		}
	},
	mounted: function mounted() {
		this.processedData ? this.drawTopPlotX(this.processedData) : null;
	},
	destroyed: function destroyed() {
		external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
	},

	methods: {
		xValue: function xValue(d) {
			return d.x;
		},
		yValue: function yValue(d) {
			return d.y;
		},
		zValue: function zValue(d) {
			return d.value;
		},
		wValue: function wValue(d) {
			return d.label;
		},
		/**
  * @function drawTopPlotX - function that draws the box chart
  * called in mounted
  * @param {Array} data - the data model
  */
		drawTopPlotX: function drawTopPlotX(data) {
			if (!data) {
				return;
			}
			var localThis = this;
			var selection_string = "#" + this.propID;
			var pretty_duration = this.pretty_duration;
			var xValue = this.xValue;
			var yValue = this.yValue;
			var zValue = this.zValue;
			var wValue = this.wValue;
			var element = external__jquery__default()(selection_string);
			var margin = this.margin;
			var elementWidth = element.width();
			var elementHeight = element.height();
			var ternaryWidth = elementWidth > 0 ? elementWidth : 400;
			var width = ternaryWidth - margin.left - margin.right;
			var ternaryHeight = elementHeight > 0 ? elementHeight : 400;
			var height = ternaryHeight - margin.top - margin.bottom;
			//retrieving globals

			var svg,
			    category = this.currentCategories.join(' '),
			    containerId = "#" + this._props.propID,
			    containerIdSvg = containerId + " svg",
			    containerIdG = containerIdSvg + " g";

			external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
			if (external__jquery__default()(containerIdSvg) != null) {
				external__jquery__default()(containerIdSvg).remove();
			}

			var svg,
			    category = this.currentCategories.join(' '),
			    containerId = "#" + this._props.propID,
			    containerIdSvg = containerId + " svg",
			    containerIdG = containerIdSvg + " g";

			var xScale = external__d3_["scaleLinear"]().range([0, width]),
			    xMap = function xMap(d) {
				return xScale(xValue(d));
			},
			    xAxis = external__d3_["axisBottom"]().scale(xScale).tickSizeInner(-height).ticks(6).tickFormat(function (d) {
				return localThis.isTime ? pretty_duration(60 * d) : d;
			});

			var yScale = external__d3_["scaleLinear"]().range([height, 0]),
			    yMap = function yMap(d) {
				return yScale(yValue(d));
			},
			    yAxis = external__d3_["axisLeft"]().scale(yScale).tickSizeInner(-width).ticks(4);

			var max_value_size = Math.sqrt(external__d3_["max"](data, function (d) {
				return +d.value;
			}));
			var bubble_sizes = this.get_bubble_sizes(max_value_size);
			var min_bubble_size = bubble_sizes['min'];
			var max_bubble_size = bubble_sizes['max'];

			var zScale = external__d3_["scaleLinear"]().domain([1, max_value_size]).range([min_bubble_size, max_bubble_size]),
			    zMap = function zMap(d) {
				return zScale(Math.sqrt(zValue(d)));
			};

			var cValue = function cValue(d) {
				return d.label;
			};
			var color = external__d3_["scaleOrdinal"](external__d3_["schemePaired"]);

			var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

			// var zoom = d3.zoom()
			// 	.scaleExtent(this.get_x_zoom_range(data, xValue))
			// 	// .on("zoom", null)
			// 	.on("zoom", zoomBehavior)

			// Get min and max values for x and y axis
			var xMin = external__d3_["min"](data, xValue);
			var xMax = external__d3_["max"](data, xValue);
			var yMin = external__d3_["min"](data, yValue);
			var yMax = external__d3_["max"](data, yValue);
			// Subtract half the min value from min and add one fourth
			// of the max to the max so that the bubbles never go outside of the graph
			xScale.domain([xMin - xMin / 2, xMax + xMax / 4]);
			yScale.domain([yMin - yMin / 2, yMax + yMax / 4]);
			svg = external__d3_["select"](containerId).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			// .call(zoom)
			// .on("wheel.zoom", function(){
			// 	if (localThis.zooming) {
			// 		svg.call(zoom.x(xScale))
			// 	}
			// });

			svg.append("rect").attr("fill-opacity", "0").attr("width", width).attr("height", height);

			svg.append("g").attr("class", "x axis").attr("id", "top-x").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -10).style("text-anchor", "end").text(this.xAxisLabel);

			svg.append("g").attr("class", "y axis").attr("id", "top-y").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(this.yAxisLabel);

			if (this.type === 'agent') {
				svg.append("text").attr("class", "plot-title").attr("x", width / 2).attr("y", 0).style("text-anchor", "middle").text("Category: " + category + ", Overall value: " + external__d3_["sum"](data, function (d) {
					return d.value;
				}) + ", Agents: " + data.length);
			} else if (this.type === 'agentPanel') {
				svg.append("text").attr("class", "plot-title").attr("x", width / 2).attr("y", -3).style("text-anchor", "middle").text("Category: " + category + ", Overall value: " + external__d3_["sum"](data, function (d) {
					return d.value;
				}));
			} else {
				svg.append("text").attr("class", "plot-title").attr("x", width / 2).attr("y", -3).style("text-anchor", "middle").text("Category: " + category + ", Overall value: " + external__d3_["sum"](data, function (d) {
					return d.value;
				}));
			}

			var mouseOver = this.mouseOverBubble;
			if (this.type.includes('agent')) {
				mouseOver = this.agentMouseOverBubble;
			}
			// HTK if we want to rewrite the tooltips on the agent's tab to match the original we would insert that new function call here

			var click = this.clickedOnBubble;
			if (this.type.includes('agent')) {
				click = this.agentClickedOnBubble;
			}

			svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", zMap).attr("cx", xMap).attr("cy", yMap).attr("stroke", "gray").attr("stroke-width", 1).style("fill", function (d) {
				var saveThisColor = color(cValue(d));
				return saveThisColor;
			}).style("opacity", 0.75).on("mouseover", mouseOver).on("mouseout", this.mouseOutBubble).on("click", click);
		},
		mouseOverBubble: function mouseOverBubble(d) {
			var tooltip = external__d3_["select"]('.' + this.propID + '_tooltip');
			tooltip.transition().duration(100).style("opacity", 1);
			tooltip.html('<b class="tooltip-header">' + d.label + '</b>' + "<br/><b>" + this.xAxisLabel + "</b> " + (this.isTime ? this.pretty_duration(60 * this.xValue(d)) : this.xValue(d)) + "<br/><b>" + this.yAxisLabel + ": </b>" + this.yValue(d).toFixed(2) + "<br> <b>value:</b> " + this.zValue(d)).style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
			external__d3_["select"](tooltip[0]).transition().duration(50).style("opacity", 1);
		},
		mouseOutBubble: function mouseOutBubble(d) {
			var tooltip = external__d3_["select"]('.' + this.propID + '_tooltip');
			tooltip.transition().duration(300).style("opacity", 0);
			external__d3_["select"](tooltip[0]).transition().duration(200).style("opacity", 0);
		},
		clickedOnBubble: function clickedOnBubble(d) {
			var click_cats = [d.category_1, d.category_2, d.category_3];
			if (click_cats.indexOf('NULL') < 0) {
				external__d3_["select"](".d3_visuals_tooltip").transition().style('opacity', 0);
			}
			// Make sure we propogate the click out of the chart
			if (this.bubbleSelected !== undefined) {
				this.bubbleSelected(d);
			}
		},
		agentClickedOnBubble: function agentClickedOnBubble(d) {
			var tooltip = external__d3_["select"](".d3_visuals_tooltip");
			tooltip.transition().style("opacity", 0);
		},
		pretty_duration: function pretty_duration(d) {
			return external__moment_["duration"](d, "seconds").format("h[h] m[m] s[s]"); //this.moment??
		},
		get_min_bubble_size: function get_min_bubble_size(max_value_size, cutoff, min_pixels) {
			return max_value_size >= cutoff ? min_pixels : max_value_size;
		},
		get_max_bubble_size: function get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels) {
			return max_value_size >= cutoff ? max_pixels : min_bubble_size * max_value_size + 25;
		},
		get_bubble_sizes: function get_bubble_sizes(max_value_size) {
			var cutoff = 10,
			    min_pixels = 5,
			    max_pixels = 125;
			var min_bubble_size = max_value_size < min_pixels ? min_pixels : this.get_min_bubble_size(max_value_size, cutoff, min_pixels);
			return {
				'min': min_bubble_size,
				'max': this.get_max_bubble_size(max_value_size, min_bubble_size, cutoff, max_pixels)
			};
		},
		get_duration_zoom_range: function get_duration_zoom_range(max_value_mins) {
			var min_zoom_mins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

			return [1, max_value_mins / min_zoom_mins];
		},
		get_x_zoom_range: function get_x_zoom_range(asrs, xval) {
			var min_zoom_mins = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

			return this.get_duration_zoom_range(external__d3_["max"](asrs, xval), min_zoom_mins);
		},
		/**
  * @function resizeSVG - redraws the SVG on window resize
  */
		resizeSVG: function resizeSVG() {
			setTimeout(this.drawTopPlotX, 1000, this.processedData);
		},
		toggleZooming: function toggleZooming() {
			this.zooming = !this.zooming;
		}
	}

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0d1c3d1f","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/BubbleChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"bubbleChart",staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_BubbleChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/BubbleChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(140)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  BubbleChart,
  d3_BubbleChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_BubbleChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/BulletChart.vue
//
//
//
//
//
//
//
//








/** Bullet Chart D3 component
* @module Bullet Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {Boolean} isStock - used to visualize live stock, default false
*
* @example
* usage on a page:
* <bullet-chart
*   :dataModel="bulletChartData"
*   propID="container-bulletchart"
* ></bullet-chart>
*
*/

/* harmony default export */ var BulletChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {

    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {string} title - 'title of a bullet chart'
     * @property {string} subtitle - 'subtitle of chart, usaully to show the units'
     * @property {Array} ranges - [array of 3 values to show the y-value limit of the bad, ok, and good performance]; the last value will be the limit of the chart
     * @property {Array} measures - [array of 1 or 2 values to show the actual value of this bullet chart]; if two values are used they can show expected and actual values
     * @property {Array} markers - [array of one or more values to show a tick marker that is used to show the target value of the data] values
     */

    dataModel: {
      type: Array,
      default: function _default() {
        return [{ "title": "Revenue", "subtitle": "US$, in thousands", "ranges": [150, 225, 300], "measures": [220, 270], "markers": [250] }];
      }
    },
    propID: {
      type: String,
      default: 'container-bulletchart'
    },
    isStock: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData && data.length !== 0) {
        this.internalData = data;
        this.internalData[0].measures !== undefined ? this.draw() : null;
      }
    }
  },
  mounted: function mounted() {
    this.dataModel[0].measures !== undefined ? this.draw() : null;
  },

  methods: {
    /**
    * @function draw - function that draws the bullet chart
    */
    draw: function draw() {
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      // sets height and with of each individual bullet chart
      var margin = { top: 5, right: 40, bottom: 25, left: 200 },
          width = element.width() - margin.left - margin.right,
          height = 75 - margin.top - margin.bottom;
      var localThis = this;

      var svg = external__d3_["select"](selection_string).selectAll("svg").data(this.dataModel).enter().append("svg").attr("class", "bullet").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      // renders each individual bullet chart for each object in the data array
      .each(function (d, i) {
        // if reverse is true the chart is right aligned
        var reverse = false,

        // duration controls the intial load animation
        duration = 0,

        // can be used to set the tick format of the charts
        tickFormat = null;

        var ranges = d.ranges.slice().sort(external__d3_["descending"]),
            markers = d.markers.slice().sort(external__d3_["descending"]),
            measures = d.measures.slice().sort(external__d3_["descending"]),
            g = external__d3_["select"](this);

        // If visualizing live stock data then set the bottom of range to 10 less than the min of data
        var xMin = localThis.isStock ? Math.min(ranges[0], markers[0], measures[0]) - 10 : 0;

        // Compute the new x-scale.
        var x1 = external__d3_["scaleLinear"]().domain([xMin, Math.max(ranges[0], markers[0], measures[0])]).range(reverse ? [width, 0] : [0, width]);

        // Derive width-scales from the x-scales.
        var w1 = function w1(d) {
          return Math.abs(x1(d) - x1(xMin));
        };

        // Update the range rects.
        var range = g.selectAll("rect.range").data(ranges);

        range.enter().append("rect").attr("class", function (d, i) {
          return "range s" + i;
        }).attr("width", w1).attr("height", height).attr("x", reverse ? x1 : 0);

        // Update the measure rects.
        var measure = g.selectAll("rect.measure").data(measures);

        measure.enter().append("rect").attr("class", function (d, i) {
          return "measure s" + i;
        }).attr("width", w1).attr("height", height / 3).attr("x", reverse ? x1 : 0).attr("y", height / 3);

        // Update the marker lines.
        var marker = g.selectAll("line.marker").data(markers);

        marker.enter().append("line").attr("class", "marker").attr("x1", x1).attr("x2", x1).attr("y1", height / 6).attr("y2", height * 5 / 6);

        // Compute the tick format.
        var format = tickFormat || x1.tickFormat(8);

        // Update the tick groups.
        var tick = g.selectAll("g.tick").data(x1.ticks(8), function (d) {
          return this.textContent || format(d);
        });

        // Initialize the ticks with the old scale, x0.
        var tickEnter = tick.enter().append("g").attr("class", "tick").attr("transform", bulletTranslate(x1)).style("opacity", 1e-6);

        tickEnter.append("line").attr("y1", height).attr("y2", height * 7 / 6);

        tickEnter.append("text").attr("text-anchor", "middle").attr("class", "anchor-text").attr("dy", "1em").attr("y", height * 7 / 6).text(format);

        // Transition the entering ticks to the new scale, x1.
        tickEnter.transition().duration(duration).attr("transform", bulletTranslate(x1)).style("opacity", 1);

        // responsible for moving the ticks as the data updates
        function bulletTranslate(x) {
          return function (d) {
            return "translate(" + x(d) + ",0)";
          };
        }
      });

      // add all the titles to the bullet charts
      var title = svg.append("g").style("text-anchor", "end").attr("transform", "translate(-6," + height / 2 + ")");

      title.append("text").attr("class", "title").text(function (d) {
        return d.title;
      });

      title.append("text").attr("class", "subtitle").attr("dy", "1em").text(function (d) {
        return d.subtitle;
      });
    },

    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      // added to make resizing smooth
      // without setTimeout the graph flashes while being resized
      if (this.dataModel[0].measures) {
        var localThis = this;
        setTimeout(function () {
          localThis.draw();
        }, 10);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-20897290","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/BulletChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%","margin-top":"15px"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_BulletChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/BulletChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(141)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  BulletChart,
  d3_BulletChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_BulletChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/Dendrogram.vue
//
//
//
//
//
//
//
//







/** Dendrogram D3 component
* @module Dendrogram
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <dendrogram
*   :dataModel="dendrogramData"
*   propID="container-dendrogram"
* ></dendrogram>
*/

/* harmony default export */ var Dendrogram = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Array} children - nested child nodes to show parent/child relationships
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-dendrogram"
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawDendrogram();
    }
  },
  mounted: function mounted() {
    // console.log(this.dataModel)
    this.drawDendrogram(this._props.dataModel, this._props.propID);
    this.update = true;
  },
  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.drawDendrogram();
    },

    /**
    * @function drawDendrogram - function that draws the dendrogram
    * @param {Array} data
    * the dataModel
    * @param {string} propID
    * the ID for the visualization, optional
    */

    drawDendrogram: function drawDendrogram() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.dataModel;
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.propID;


      var selection_string = "#" + id;
      if (external__jquery__default()(selection_string + ' svg') != null) {
        external__jquery__default()(selection_string + ' svg').remove();
      }
      //component will still mount if there is no data
      if (data.length < 1) {
        return;
      }

      var element = external__jquery__default()(selection_string);
      var width = element.width(),
          height = element.height();

      //cluster layout to organize data into a tree structure
      var cluster = external__d3_["cluster"]().size([height, width - 160]);

      //diagonal objects defines the curves between two specific points
      // var diagonal = d3.svg.diagonal()
      //     .projection(function(d) { return [d.y, d.x]; });

      //make svg, set width and height
      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width).attr("height", height).attr('class', 'dendrogram').append("g").attr("transform", "translate(40,0)");
      // debugger

      //parses data starting from the root element of the data structure.
      // creates a root node and which then has all other nodes included in children
      var root = external__d3_["hierarchy"](this.dataModel[0]);
      // paas the root node to the cluster
      cluster(root);

      //draws a path for each link in the links array
      var link = svg.selectAll(".link")
      // pass the root nodes descendants to create the links
      .data(root.descendants().slice(1)).enter().append("path").attr("class", "link")
      // function for drawing curve lines between the points
      .attr("d", function (d) {
        return "M" + d.y + "," + d.x + "C" + (d.parent.y + 100) + "," + d.x + " " + (d.parent.y + 100) + "," + d.parent.x + " " + d.parent.y + "," + d.parent.x;
      });

      //draws the nodes at x,y position (defined within the node object)
      var node = svg.selectAll(".node").data(root.descendants()).enter().append("g").attr("class", "node").attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

      node.append("circle").attr("class", "dot").attr("r", 4.5);

      //text for each node
      node.append("text").attr("dx", function (d) {
        return d.children ? -8 : 8;
      }).attr("dy", 3).style("text-anchor", function (d) {
        return d.children ? "end" : "start";
      }).text(function (d) {
        return d.data.name;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7c163b2e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/Dendrogram.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"dendrogram",staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_Dendrogram = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/Dendrogram.vue
function injectStyle (ssrContext) {
  __webpack_require__(142)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Dendrogram,
  d3_Dendrogram,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_Dendrogram = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/DifferenceChart.vue

//
//
//
//
//
//
//
//









/** Difference Chart D3 component
* @module Difference Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} metric - y-axis label
* @param {string} dateFormat - 'YYYY-MM-DD'
* @param {Array} keys - overwrite what the displayed labels will be for the data, instead of expected and actual
*
* @example
* usage on a page:
* <difference-chart
*   :dataModel="differenceChartData"
*   propID="container-differencechart"
*   metric="Volume"
*   dateFormat="YYYY-DD-MM"
* ></difference-chart>
*
*/

/* harmony default export */ var DifferenceChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  mixins: [formatTimeMixin["a" /* default */]],
  props: {

    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {string} date - 'date string' (ex. '2017-01-01')
     * @property {Number} expected - expected value number
     * @property {Number} actual - actual value number
     */

    dataModel: {
      type: Array,
      default: function _default() {
        return [{ "date": "2017-1-1", "expected": 100, "actual": 50 }];
      }
    },
    propID: {
      type: String,
      default: 'container-differencechart'
    },
    metric: {
      type: String
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    keys: {
      type: Array,
      default: function _default() {
        return ["Expected", "Actual"];
      }
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData) {
        this.internalData = data;
        this.internalData.length !== 0 ? this.draw(data) : null;
      }
    }
  },
  mounted: function mounted() {
    this.dataModel.length !== 0 ? this.draw(this.dataModel) : null;
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function draw - function that draws the graphic
    */
    draw: function draw(allData) {

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);
      // copy the data array so that we do not mutate the original data (ex. change data value to date object)
      var data = [];
      allData.forEach(function (el) {
        return data.push(assign_default()({}, el));
      });

      var margin = { top: 20, right: 20, bottom: 40, left: 50 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      // var parseDate = d3.timeParse(this.d3Time[this.dateFormat])
      var formatDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);

      if (typeof data[0].date == 'string') {
        data = data.map(function (d) {
          d.date = formatDate(d.date);
          return d;
        });
      }

      data.sort(function (a, b) {
        return a.date - b.date;
      });

      // console.log(data)

      var x = external__d3_["scaleTime"]().range([0, width]);

      // console.log(data)

      var ticks = data.slice().map(function (d) {
        return d.date;
      });
      // console.log(ticks)

      if (ticks.length > 365) {
        ticks = ticks.filter(function (t, i) {
          return i % 120 === 0;
        });
      } else if (ticks.length > 60) {
        ticks = ticks.filter(function (t, i) {
          return i % 25 === 0;
        });
      } else if (ticks.length > 31) {
        ticks = ticks.filter(function (t, i) {
          return i % 15 === 0;
        });
      } else {
        ticks = ticks.filter(function (t, i) {
          return i % 5 === 0;
        });
      }

      var y = external__d3_["scaleLinear"]().range([height, 0]);

      var xAxis = external__d3_["axisBottom"]().scale(x).tickValues(ticks).tickFormat(external__d3_["timeFormat"](this.d3Time[this.dateFormat]));

      var yAxis = external__d3_["axisLeft"]().scale(y);

      // create main line
      var line = external__d3_["area"]().curve(external__d3_["curveCardinal"]).x(function (d) {
        return x(d.date);
      }).y(function (d) {
        return y(d["actual"]);
      });

      // create area between lines
      var area = external__d3_["area"]().curve(external__d3_["curveCardinal"]).x(function (d) {
        return x(d.date);
      }).y1(function (d) {
        return y(d["actual"]);
      });

      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // format date


      x.domain(external__d3_["extent"](data, function (d) {
        return d.date;
      }));

      // find min and max values for y axis
      y.domain([external__d3_["min"](data, function (d) {
        return Math.min(d["actual"], d["expected"]);
      }), external__d3_["max"](data, function (d) {
        return Math.max(d["actual"], d["expected"]);
      })]);

      svg.datum(data);

      // clip path below the 'actual' line
      // green color
      svg.append("clipPath").attr("id", "clip-below").append("path").attr("d", area.y0(height));

      // clip path above the 'actual' line
      // red color
      svg.append("clipPath").attr("id", "clip-above").append("path").attr("d", area.y0(0));

      svg.append("path").attr("class", 'area above').attr("clip-path", "url(#clip-above)").attr("d", area.y0(function (d) {
        return y(d["expected"]);
      }));

      svg.append("path").attr("class", 'area below').attr("clip-path", "url(#clip-below)").attr("d", area);

      svg.append("path").attr("class", "difference-line").attr("d", line);

      svg.append("g").attr("class", "x axis x-axis-label").attr("transform", "translate(0," + height + ")").call(xAxis);

      svg.append("g").attr("class", "y axis y-axis-label").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr("class", "difference-chart-metric").text(this.metric);

      var localThis = this;
      svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 5).attr("cx", function (d) {
        return x(d.date);
      }).attr("cy", function (d) {
        return y(d.actual);
      }).attr("opacity", 0).on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html('Date: ' + external__moment__default()(d.date).format('MMMM Do YYYY') + '<br/>' + localThis.keys[0] + ': ' + d.expected + '<br/>' + localThis.keys[1] + ': ' + d.actual).style("left", external__d3_["event"].pageX + "px").style("top", external__d3_["event"].pageY + "px");
        external__d3_["select"](this).transition().duration(50).style("fill", 'steelblue').attr("opacity", 1);
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
        external__d3_["select"](this).transition().duration(50).attr("opacity", 0);
      });
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.dataModel.length !== 0 ? this.draw(this.dataModel) : null;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6c217b4c","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/DifferenceChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_DifferenceChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/DifferenceChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(143)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  DifferenceChart,
  d3_DifferenceChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_DifferenceChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/ForceDirectedGraph.vue
//
//
//
//
//
//
//
//








/** Force Directed Graph D3 component
* @module Force Directed Graph
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <forcedirected-graph
*   :dataModel="forceDirectedGraphData"
*   propID="container-forcedirectedgraph"
* ></forcedirected-graph>
*
*/

/* harmony default export */ var ForceDirectedGraph = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {Array} nodes - array of objects noting id(string) and group(string)
     */
    dataModel: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    propID: {
      type: String,
      default: 'forcedirected'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      name: "ForceDirected",
      update: false,
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      // console.log('BarChart dataModel changed')
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawForceDirected(data, this.propID);
    }
  },
  mounted: function mounted() {
    this.drawForceDirected(this._props.dataModel, this._props.propID);
  },
  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.drawForceDirected();
    },

    /**
    * @function drawForceDirectedGraph - function that draws the graph
    * @param {Array} data
    * the dataModel
    * @param {string} propID
    * the ID for the visualization, optional
    */

    drawForceDirected: function drawForceDirected() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.dataModel;
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.propID;


      var selection_string = "#" + id;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);
      var width = element.width(),
          height = element.height();

      var svg = external__d3_["select"](".forcedirected").append("svg").attr("width", width).attr("height", height);

      var color = external__d3_["scaleOrdinal"](external__d3_["schemePaired"]);

      var simulation = external__d3_["forceSimulation"]().force("link", external__d3_["forceLink"]().id(function (d) {
        return d.id;
      })).force("charge", external__d3_["forceManyBody"]()).force("center", external__d3_["forceCenter"](width / 2, height / 2));

      var link = svg.append("g").attr("class", "links").selectAll("line").data(data.links).enter().append("line").attr("stroke-width", function (d) {
        return Math.sqrt(d.value);
      });

      var node = svg.append("g").attr("class", "nodes").selectAll("circle").data(data.nodes).enter().append("circle").attr("r", 8).attr("fill", function (d) {
        return color(d.group);
      }).call(external__d3_["drag"]().on("start", dragstarted).on("drag", dragged).on("end", dragended));

      node.append("title").text(function (d) {
        return d.id;
      });

      simulation.nodes(data.nodes).on("tick", ticked);

      simulation.force("link").links(data.links);

      function ticked() {
        link.attr("x1", function (d) {
          return d.source.x;
        }).attr("y1", function (d) {
          return d.source.y;
        }).attr("x2", function (d) {
          return d.target.x;
        }).attr("y2", function (d) {
          return d.target.y;
        });

        node.attr("cx", function (d) {
          return d.x;
        }).attr("cy", function (d) {
          return d.y;
        });
      }

      function dragstarted(d) {
        if (!external__d3_["event"].active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = external__d3_["event"].x;
        d.fy = external__d3_["event"].y;
      }

      function dragended(d) {
        if (!external__d3_["event"].active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-87933cbc","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/ForceDirectedGraph.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"forcedirected",staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_ForceDirectedGraph = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/ForceDirectedGraph.vue
function injectStyle (ssrContext) {
  __webpack_require__(149)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ForceDirectedGraph,
  d3_ForceDirectedGraph,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_ForceDirectedGraph = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/GanttChart.vue

//
//
//
//
//
//
//
//









/** Gantt Chart D3 component
* @module Gantt Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {Object} taskStatuses - statuses of tasks (SUCCEEDED, FAILED, etc.)
* @param {string} dateFormat - format of the x-axis ex HH:MM
*
* @example
* usage on a page:
* <gantt-chart
*   style="height:100%"
*   :dataModel="ganttChartData"
*   propID='container-ganttchart'
* ></gantt-chart>
*
*/

/* harmony default export */ var GanttChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  mixins: [formatTimeMixin["a" /* default */]],
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Object} startDate - JS dateObject
     * @property {Object} endDate - JS dateObject
     * @property {string} taskStatuses - statuses of tasks (SUCCEEDED, FAILED, etc.)
     * @property {string} actual - class that determines color
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [{ "startDate": new Date("Sun Dec 09 00:00:45 EST 2012"), "endDate": new Date("Sun Dec 09 02:36:45 EST 2012"), "taskName": "E Job", "status": "RUNNING" }];
      }
    },
    propID: {
      type: String,
      default: "container-ganttchart"
    },
    // classes for styling
    // could be changed in the future
    taskStatuses: {
      type: Object,
      default: function _default() {
        return { "SUCCEEDED": "bar-succeeded", "FAILED": "bar-failed", "RUNNING": "bar-running", "KILLED": "bar-killed" };
      }
    },
    // format of the date string being passed in
    dateFormat: {
      type: String,
      default: "MMM DD YYYY HH:mm:ss"
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      updateVisual: false,
      internalData: [],
      chart: {}
    };
  },
  watch: {
    // this could be used in the future to update
    // the chart data dynamically
    //dataModel: function(data) {
    //this.render()
    //this.internalData = data;
    //}
  },
  mounted: function mounted() {
    this.render();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
  },

  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.render();
    },
    render: function render() {

      var data = this.dataModel;
      var tasks = [];

      data.forEach(function (el) {
        return tasks.push(assign_default()({}, el));
      });
      var formatDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);
      if (typeof tasks[0].startDate == 'string') {
        tasks = tasks.map(function (d) {
          d.startDate = formatDate(d.startDate);
          d.endDate = formatDate(d.endDate);
          return d;
        });
      }

      // sort tasks to determing the max value on the x-axis
      tasks.sort(function (a, b) {
        return a.endDate - b.endDate;
      });
      var maxDate = tasks[tasks.length - 1].endDate;

      // sort tasks to determine the min value on thex- axis
      tasks.sort(function (a, b) {
        return a.startDate - b.startDate;
      });
      var minDate = tasks[0].startDate;

      // array of all task names (labels for the y-axis)
      var taskNames = tasks.map(function (el) {
        return el.taskName;
      });

      // supply drawGantt() with all of the arguments
      this.drawGantt(tasks, taskNames, this.taskStatuses, this.dateFormat, [minDate, maxDate]);
    },

    /**
    * @function drawGantt - function that draws the graph
    * @param {Array} tasks - the dataModel
    * @param {string} taskNames
    * @param {string} taskStatuses
    * @param {string} dateFormat
    * @param {string} timeDomain
    */

    drawGantt: function drawGantt(tasks, taskNames, taskStatuses, dateFormat, timeDomain) {

      external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      var margin = { top: 10, right: 40, bottom: 20, left: 40 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;
      // declares all variables used to create gantt
      var timeDomainStart = timeDomain[0];
      var timeDomainEnd = timeDomain[1];
      var x, y, xAxis, yAxis;

      var keyFunction = function keyFunction(d) {
        return d.startDate + d.taskName + d.endDate;
      };

      var rectTransform = function rectTransform(d) {
        return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
      };

      // creates x and y axis with ticks
      x = external__d3_["scaleTime"]().domain([timeDomainStart, timeDomainEnd]).range([0, width]).clamp(true);

      y = external__d3_["scaleBand"]().domain(taskNames).range([0, height], .6);

      xAxis = external__d3_["axisBottom"]().scale(x).tickFormat(external__d3_["timeFormat"]('%m/%d'))
      // .tickSubdivide(true)
      .tickSize(8).tickPadding(8).tickSizeInner(-height);

      yAxis = external__d3_["axisLeft"]().scale(y).ticks(taskNames.length).tickSizeInner(-width);

      // function that actually draws the gantt chart

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("class", "gantt-chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      svg.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")").transition().call(xAxis);

      svg.append("g").attr("class", "y axis").transition().call(yAxis);

      var tooltip = external__d3_["select"]("body").append("div").attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip").style("opacity", 0);

      var rectHeight = height / taskNames.length * 1.0 - margin.top - margin.bottom;

      svg.selectAll(".gantt-chart").data(tasks, keyFunction).enter().append("rect").attr("rx", 5).attr("ry", 5).attr("class", function (d) {
        if (taskStatuses[d.status] == null) {
          return "bar";
        }
        return taskStatuses[d.status];
      }).attr("y", -((rectHeight - y.step()) / 2)).attr("transform", rectTransform).attr("height", function (d) {
        return rectHeight;
      }).attr("width", function (d) {
        return x(d.endDate) - x(d.startDate);
      }).on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);

        tooltip.html("<b>" + d.taskName + "</b><br/>" + "Status: " + "<b>" + d.status + "</b><br/>" + external__moment_(d.startDate).format('MMMM Do YYYY, h:mm:ss a') + " - " + external__moment_(d.endDate).format('MMMM Do YYYY, h:mm:ss a')).style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f6618102","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/GanttChart.vue
var GanttChart_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: GanttChart_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_GanttChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/GanttChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(150)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  GanttChart,
  d3_GanttChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_GanttChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/HeatMap.vue

//
//
//
//
//
//
//







/** Heat Map D3 component
* @module Heat Map
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} alertText - name of the data being displayed ('Incident', etc.)
*
* @example
* usage on a page:
* <heat-map
* 	:dataModel="heatMapData"
* 	alertText="Incident"
* 	propID='heatMap'
* ></heat-map>
*
*/

/* harmony default export */ var HeatMap = ({
	components: {
		'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
		'panel-heading': PanelHeading["a" /* default */]
	},
	props: {
		/**
   * The data for this component can be customized; it currently contains:
   * @typedef {Array} dataModel
   * @property {string} date - date string
   * @property {string} volume - the number of incidents on a particular day
   */
		dataModel: {
			type: Array,
			default: function _default() {
				return [{ "date": "2017-11-30", "volume": 2 }, { "date": "2017-11-29", "volume": 0 }, { "date": "2017-11-30", "volume": 0 }, { "date": "2017-11-28", "volume": 1 }];
			}
		},
		propID: {
			type: String,
			default: "heatMap"
		},
		alertText: {
			type: String,
			default: "Incident"
		},
		title: {
			type: String
		}
	},
	data: function data() {
		return {
			internalData: []
		};
	},
	watch: {
		dataModel: function dataModel(data) {
			this.internalData = data;
			this.draw(this.internalData, "#" + this._props.propID);
		},
		theme: function theme(data) {
			this.draw(this.dataModel, "#" + this._props.propID);
		}
	},
	computed: extends_default()({}, themeHelper["a" /* default */]),
	mounted: function mounted() {
		this.draw(this.dataModel, "#" + this._props.propID);
	},
	destroyed: function destroyed() {
		external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
	},

	methods: {
		/**
  * @function draw - function that draws the heat map -
  * called in mounted
  * @param {Array} data
  * the dataModel
  * @param {string} selection_string
  * the div where the svg is to be mounted
  */
		draw: function draw(data, selection_string) {
			var component = this;
			var width = 900,
			    height = 105,
			    cellSize = 13; // cell size
			var week_days = [, "Mon",, "Wed",, "Fri"];
			var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var localThis = this;
			var day = external__d3_["timeFormat"]("%w"),
			    week = external__d3_["timeFormat"]("%U"),

			//percent = d3.format(".1%"),
			format = external__d3_["timeFormat"]("%Y-%m-%d");
			var parseDate = external__d3_["timeParse"]("%Y-%m-%d");

			var min_year = 9999;
			var max_year = 0;

			if (data !== undefined && data.length > 0) {
				data.forEach(function (datum) {
					var date_year = parseDate(datum.date).getFullYear();
					min_year = date_year < min_year ? date_year : min_year;
					max_year = date_year > max_year ? date_year : max_year;
				});
			}

			external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
			if (external__jquery__default()(selection_string + " svg") != null) {
				external__jquery__default()(selection_string + " svg").remove();
			}

			var svg = external__d3_["select"](selection_string).selectAll("svg").data(external__d3_["range"](min_year, max_year + 1)).enter().append("svg").attr("width", "100%").attr("data-height", "0.5678").attr("viewBox", "0 0 900 105").attr("preserveAspectRatio", "xMaxYMax meet")
			// http://tutorials.jenkov.com/svg/svg-viewport-view-box.html
			// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
			// http://jonibologna.com/svg-viewbox-and-viewport/
			.attr("class", "RdYlGn")
			// .style('fill', 'black')
			.append("g").attr("transform", "translate(" + (width - cellSize * 53) / 2 + "," + (height - cellSize * 7 - 1) + ")");

			svg.append("text").attr("transform", "translate(-38," + cellSize * 3.5 + ")rotate(-90)").style("text-anchor", "middle").text(function (d) {
				return d;
			});

			var maxColor = this.colors[4];
			var color = external__d3_["scaleLinear"]().range(['#ebedf0', maxColor]).domain([0, 1]);

			var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

			for (var i = 0; i < 7; i++) {
				svg.append("text").style("font-size", "12px").attr("transform", "translate(-5," + cellSize * (i + 1) + ")").style("text-anchor", "end").attr("dy", "-.25em").text(function (d) {
					return week_days[i];
				});
			}

			var rect = svg.selectAll(".day").data(function (d) {
				return external__d3_["timeDays"](new Date(d, 0, 1), new Date(d + 1, 0, 1));
			}).enter().append("rect").attr("stroke-width", ".5").attr("class", "day").style("font-size", "12px").attr("width", cellSize).attr("height", cellSize).attr("x", function (d) {
				return week(d) * cellSize;
			}).attr("y", function (d) {
				return day(d) * cellSize;
			}).attr("fill", '#D3D3D3').datum(format);

			var legend = svg.selectAll(".legend").data(month).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
				return "translate(" + ((i + 1) * 55 + 8) + ",0)";
			});

			legend.append("text").attr("class", function (d, i) {
				return month[i];
			}).style("text-anchor", "end").attr("dy", "-.25em").style("font-size", "12px").text(function (d, i) {
				return month[i];
			});

			svg.selectAll(".month").data(function (d) {
				return external__d3_["timeMonths"](new Date(d, 0, 1), new Date(d + 1, 0, 1));
			}).enter().append("path").attr("class", "month");
			// .attr("id", function(d, i) {
			//   return month[i];
			// })
			// .attr("d", this.monthPath);

			// data
			var count_Max = external__d3_["max"](data, function (d) {
				return d.volume;
			});

			var ndata = external__d3_["nest"]().key(function (d) {
				return d.date;
			}).rollup(function (d) {
				return Math.sqrt(d[0].volume / count_Max);
			}).map(data);

			rect.filter(function (d) {
				return '$' + d in ndata && ndata['$' + d] != 0;
			}).attr("class", "hasData").attr("fill", function (d) {
				return color(ndata['$' + d]);
			}).attr('stroke', '#666').attr("data-title", function (d) {
				return localThis.alertText + " : " + ndata[d];
			}).on("mouseover", function (d) {
				component.mouseOver(tooltip, d);
				external__d3_["select"](this).transition().duration(50).attr("fill", maxColor);
			}).on("mouseout", function (d) {
				external__d3_["select"](this).transition().duration(100).attr("fill", function (d) {
					return color(ndata['$' + d]);
				});
				tooltip.transition().duration(300).style("opacity", 0);
			});
		},
		numberWithCommas: function numberWithCommas(x) {
			x = x.toString();
			var pattern = /(-?\d+)(\d{3})/;
			while (pattern.test(x)) {
				x = x.replace(pattern, "$1,$2");
			}return x;
		},

		mouseOver: function mouseOver(tooltip, d) {
			var localThis = this;
			var item = this.dataModel.filter(function (item) {
				return item.date == d;
			});

			tooltip.html(localThis.alertText + ": " + "<b>" + item[0].volume + "</b>" + "<br>Date: " + "<b>" + d + "</b>").style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");

			tooltip.transition().duration(100).style("opacity", 1);

			external__d3_["select"](tooltip[0]).transition().duration(50).style("opacity", 1);
		},
		monthPath: function monthPath(t0) {
			var day = external__d3_["timeFormat"]("%w");
			var week = external__d3_["timeFormat"]("%U");
			var cellSize = 12; // cell size

			var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
			    d0 = +day(t0),
			    w0 = +week(t0),
			    d1 = +day(t1),
			    w1 = +week(t1);
			return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize + "H" + w0 * cellSize + "V" + 7 * cellSize + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize + "H" + (w1 + 1) * cellSize + "V" + 0 + "H" + (w0 + 1) * cellSize + "Z";
		},
		/**
  * @function resizeSVG - redraws the SVG on window resize
  */
		resizeSVG: function resizeSVG() {
			this.draw(this.dataModel, "#" + this._props.propID);
		}
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8c5e014a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/HeatMap.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"heatmap-wrappper",attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_HeatMap = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/HeatMap.vue
function injectStyle (ssrContext) {
  __webpack_require__(151)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  HeatMap,
  d3_HeatMap,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_HeatMap = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/Histogram.vue

//
//
//
//
//
//
//
//







/** Histogram D3 component
* @module Histogram
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <histogram
*   :dataModel="histogramData"
*   propID="container-histogram"
* ></histogram>
*/

/* harmony default export */ var Histogram = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {Array} - array of numbers
     */
    dataModel: {
      type: Array
    },
    propID: {
      type: String,
      default: 'container-histogram'
    },
    title: {
      type: String
    }
  },
  watch: {
    dataModel: function dataModel() {
      this.drawHistogram();
    },
    theme: function theme(data) {
      this.drawHistogram();
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  mounted: function mounted() {
    this.drawHistogram();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.drawHistogram();
    },
    formatMinutes: function formatMinutes(d) {
      // debugger
      var formatTime = external__d3_["timeFormat"]("%H:%M");
      return formatTime(new Date(2018, 0, 1, 0, d));
    },

    // formatMonths: function(d) {
    //   let formatTime = d3.time.format("%m:%Y")
    // },
    // formatTime: function(d){
    //   switch (this.units.toLowerCase()){
    //     case 'minutes':
    //       return this.formatMinutes(d)
    //       break;
    //     case 'months':
    //       return this.formatMonths(d)
    //       break;
    //     default:
    //       return this.formatMinutes(d)
    //   }
    // },

    /**
    * @function drawHistogram - function that draws the histogram
    * called in mounted
    */
    drawHistogram: function drawHistogram() {

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var formatCount = external__d3_["format"](",.0f");
      var element = external__jquery__default()(selection_string);
      var data = this.dataModel;

      var margin = { top: 30, right: 30, bottom: 30, left: 30 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      var x = external__d3_["scaleLinear"]().domain([0, 100]).range([0, width]);

      // Generate a histogram using twenty uniformly-spaced bins.
      var bins = external__d3_["histogram"]().domain(x.domain()).thresholds(x.ticks(20))(data);

      var y = external__d3_["scaleLinear"]().range([height, 0]);

      var xAxis = external__d3_["axisBottom"]().scale(x).tickFormat(this.formatMinutes);

      var yMax = external__d3_["max"](bins, function (d) {
        return d.length;
      });
      var yMin = external__d3_["min"](bins, function (d) {
        return d.length;
      });
      y.domain([0, yMax]);

      var yAxis = external__d3_["axisLeft"]().scale(y);

      var colorScale = external__d3_["scaleLinear"]().domain([yMin, yMax]).range([external__d3_["rgb"](this.colors[7]), external__d3_["rgb"](this.colors[0])]);

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var bar = svg.selectAll(".bar").data(bins).enter().append("g").attr("class", "bar").attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      });

      bar.append("rect").attr("x", 1).attr("width", x(bins[0].x1) - x(bins[0].x0) - 1).attr("height", function (d) {
        return height - y(d.length);
      }).attr("fill", function (d) {
        return colorScale(d.length);
      });

      bar.append("text").attr("dy", ".75em").attr("y", -12).attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2).attr("text-anchor", "middle").text(function (d) {
        return formatCount(d.length);
      });

      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

      svg.append("g").attr("class", "y axis").call(yAxis);

      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      var rect = svg.selectAll('rect');

      rect.on('mouseover', function (d, a, b, c, e) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html(d.length + " values - see console").style("left", external__d3_["event"].pageX + "px").style("top", external__d3_["event"].pageY + "px");
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2383d944","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/Histogram.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"height":"100%","width":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_Histogram = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/Histogram.vue
function injectStyle (ssrContext) {
  __webpack_require__(152)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Histogram,
  d3_Histogram,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_Histogram = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/HorizonChart.vue


//
//
//
//
//
//
//
//



var d3HorizonChart = __webpack_require__(154);




/** Horizon Chart D3 component
* @module Horizon Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <horizon-chart
*   :dataModel="horizonChartData"
*   propID="container-horizonchart"
* ></horizon-chart>
*
*/

/* harmony default export */ var HorizonChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    dataModel: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    propID: {
      type: String,
      default: 'container-horizonchart'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: {}
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData) {
        this.internalData = data;
        this.internalData.length !== 0 ? this.draw() : null;
      }
    },
    theme: function theme(data) {
      this.draw();
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  mounted: function mounted() {
    this.draw();
  },

  methods: {
    /**
    * @function draw - function that draws the heat map -
    * called in mounted
    */
    draw: function draw() {

      var selection_string = "#" + this.propID;
      if (external__jquery__default()('.horizon') != null) {
        external__jquery__default()('.horizon').remove();
      }
      var element = external__jquery__default()(selection_string);

      var margin = { top: 30, right: 30, bottom: 30, left: 30 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      var data = assign_default()({}, this.dataModel);
      var formattedData = [];
      for (var key in data) {
        data[key] = data[key].map(function (d) {
          return [external__d3_["timeParse"](d.Date), +d.Open];
        }).filter(function (d) {
          return d[1] !== false;
        }).reverse();

        var compare = data[key][400][1],
            value = data[key][0][1],
            values = [];

        data[key].forEach(function (d, i) {
          values.push(value = (d[1] - compare) / compare);
        });

        formattedData.push({ name: key, values: values });
      }
      var localThis = this;
      external__d3_["select"](selection_string).selectAll('.horizon').data(formattedData).enter().append('g').attr('class', 'horizon').attr('width', width).attr('height', height).each(function (d, i) {
        var chartHeight = height * .75 / formattedData.length;
        d3HorizonChart.horizonChart().height(chartHeight).colors(localThis.colors).title(d.name).call(this, d.values);
      });
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.draw();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2f39061b","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/HorizonChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_HorizonChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/HorizonChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(153)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  HorizonChart,
  d3_HorizonChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_HorizonChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/LineChart.vue

//
//
//
//
//
//
//






/** Line Chart D3 component
* @module Line Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} dateFormat - default: 'YYYY-MM-DD'
* @param {string} alertText - name of the data being displayed ('Incident', etc.)
*
* @example
* usage on a page:
* <line-chart
*   :dataModel="lineChartData"
*   propID="container-linechart"
*   dateFormat='YYYY-MM-DD'
* ></line-chart>
*
*/
/* harmony default export */ var LineChart = ({
    components: {
        'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
        'panel-heading': PanelHeading["a" /* default */]
    },
    mixins: [formatTimeMixin["a" /* default */]],
    props: {
        /**
         * The data for this component can be customized; it currently contains:
         * @typedef {Array} dataModel
         * @property {string} date - date string on x-axis
         * @property {string} value - y-axis value
         */
        dataModel: {
            type: Array,
            default: function _default() {
                return [{ "date": "2017-11-30", "value": 2 }];
            }
        },
        propID: {
            type: String,
            default: "container-linechart"
        },
        dateFormat: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        alertText: {
            type: String,
            default: "Incidents Volume"
        },
        title: {
            type: String
        }
    },
    data: function data() {
        return {
            internalData: []
        };
    },
    watch: {
        dataModel: function dataModel(data) {
            if (this.internalData !== data) {
                this.internalData = data;
                this.draw();
            }
        }
    },
    mounted: function mounted() {
        this.draw();
    },
    destroyed: function destroyed() {
        external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
    },

    methods: {
        /**
        * @function drawd3 - function that draws the line chart -
        * called in mounted
        * @param {Array} dataArray
              * the dataModel
              * @param {string} selection_string
              * the div where the svg is to be mounted
        */
        drawd3: function drawd3(dataArray, selection_string) {
            if (dataArray === undefined) return;
            if (dataArray.length === 0) return;

            external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
            if (external__jquery__default()(selection_string + ' svg') != null) {
                external__jquery__default()(selection_string + ' svg').remove();
            }
            // make copy of dataArray so we do not mutate the original data
            var data = [];
            dataArray.forEach(function (el) {
                return data.push(assign_default()({}, el));
            });

            var formatDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);
            if (typeof data[0].date == 'string') {
                data = data.map(function (d) {
                    d.date = formatDate(d.date);
                    return d;
                });
            }

            data.sort(function (x, y) {
                return external__d3_["ascending"](x.date, y.date);
            });
            var element = external__jquery__default()(selection_string);
            var margin = { top: 20, right: 20, bottom: 30, left: 50 };
            var width = element.width() - margin.left - margin.right;
            var height = element.height() - margin.top - margin.bottom;
            var xValue = function xValue(d) {
                return d.date;
            };
            var xScale = external__d3_["scaleTime"]().range([0, width]);
            var xMap = function xMap(d) {
                return xScale(xValue(d));
            };
            var xAxis = external__d3_["axisBottom"]().scale(xScale).tickSizeInner(-height).tickSizeOuter(0).ticks(6);
            xAxis.tickFormat(external__d3_["timeFormat"]("%b %d, %Y"));
            var yValue = function yValue(d) {
                return d.value;
            };
            var yScale = external__d3_["scaleLinear"]().range([height, 0]);
            var yMap = function yMap(d) {
                return yScale(yValue(d));
            };
            var yAxis = external__d3_["axisLeft"]().scale(yScale).tickSizeInner(-width).tickSizeOuter(0).ticks(4);
            xScale.domain(external__d3_["extent"](data, xValue));
            yScale.domain([0, external__d3_["max"](data, function (d) {
                return d.value;
            })]);
            var clip_orig_x = 0;
            var clip_orig_y = 0;
            var line = external__d3_["line"]().x(xMap).y(yMap);
            var area = external__d3_["area"]().x(xMap).y0(height).y1(yMap);
            var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);
            var component = this;
            var clip_id = "clip-" + selection_string;
            var clip = svg.append("clipPath").attr("id", clip_id).append("rect").attr("x", clip_orig_x).attr("y", clip_orig_y).attr("width", width).attr("height", height);
            svg.append("g").attr("class", "x axis xaxis").attr("transform", "translate(0," + height + ")").call(xAxis);
            svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(component.alertText);
            svg.append("path").datum(data).attr("class", "area").attr("d", area).attr("clip-path", "url(#" + clip_id + ")").attr("opacity", 0.5);
            svg.append("path").datum(data).attr("class", "line").attr("fill", "none").attr("clip-path", "url(#" + clip_id + ")").attr("d", line);
            svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 5).attr("cx", xMap).attr("cy", yMap).attr("clip-path", "url(#" + clip_id + ")").attr("fill", "steelblue").attr("opacity", 0);
            var dot_mtd,
                vertical_bar,
                bisectDate = external__d3_["bisector"](function (d) {
                return d.date;
            }).left; // check if elements are ordered
            svg.on("mousemove", function () {
                if (dot_mtd) {
                    dot_mtd.remove();
                    vertical_bar.remove();
                }
                var x = external__d3_["mouse"](this)[0],
                    x0 = xScale.invert(x),
                    i = bisectDate(data, x0, 1),
                    d = data[i];
                vertical_bar = svg.append("rect").attr("x", xMap(d)).attr("y", 0).attr("height", height).attr("fill", "#555").attr("width", 1);
                dot_mtd = svg.append("circle").attr("class", "dot").attr("r", 5).attr("cx", xMap(d)).attr("cy", yMap(d)).attr("fill", "blue");
                var formattedDate = xValue(d).toString().split(" ").slice(0, 4).join(" ");
                tooltip.html("Date: " + "<b>" + formattedDate + "</b>" + "<br>" + component.alertText + ": <b>" + yValue(d) + "</b>").style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
                tooltip.transition().duration(100).style("opacity", 1);
            }).on("mouseout", function () {
                if (dot_mtd) {
                    dot_mtd.remove();
                    vertical_bar.remove();
                    tooltip.transition().duration(500).style("opacity", 0);
                }
            });
        },
        draw: function draw() {
            this.drawd3(this.dataModel, '#' + this._props.propID);
        },
        /**
              * @function resizeSVG - redraws the SVG on window resize
              */
        resizeSVG: function resizeSVG() {
            this.draw();
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8d94aede","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/LineChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_LineChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/LineChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(155)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  LineChart,
  d3_LineChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_LineChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/LineChartZoomable.vue

//
//
//
//
//
//
//
//







/** Line Chart Zoomable D3 component
* @module Line Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} metric - value
* @param {string} dateFormat - default: 'YYYY-MM-DD'
*
* @example
* usage on a page:
* <line-chart-zoomable
*   :dataModel="lineChartZoomableData"
*   propID="container-linechartzoomable"
*   dateFormat='YYYY-MM-DD'
* ></line-chart-zoomable>
*
*/

/* harmony default export */ var LineChartZoomable = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  mixins: [formatTimeMixin["a" /* default */]],
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Object} dataModel
     * @property {string} date - 'date string' (ex. '2017-01-01')
     * @property {Number} volume - value
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [{ "date": '2017-11-23', "volume": 7 }];
      }
    },
    propID: {
      type: String,
      default: "container-linechartzoomable"
    },
    metric: {
      type: String,
      default: 'Metric'
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData) {
        this.internalData = data;
        this.draw(data);
      }
    }
  },
  mounted: function mounted() {
    this.draw();
  },

  methods: {
    /**
    * @function draw - function that draws the graphic -
    * called in mounted
    */
    draw: function draw() {

      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      var margin = { top: 20, right: 20, bottom: 120, left: 40 },
          margin2 = { top: 390, right: 20, bottom: 40, left: 40 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom,
          height2 = element.height() - height - margin.top - margin2.bottom - 20;

      var parseDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);
      var data = [];
      this.dataModel.forEach(function (el) {
        return data.push(assign_default()({}, el));
      });
      if (typeof data[0].date === 'string') {
        data = data.map(function (el) {
          el.date = parseDate(el.date);return el;
        });
      }
      data = data.sort(function (a, b) {
        return a.date - b.date;
      });

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = external__d3_["scaleTime"]().range([0, width]),
          x2 = external__d3_["scaleTime"]().range([0, width]),
          y = external__d3_["scaleLinear"]().range([height, 0]),
          y2 = external__d3_["scaleLinear"]().range([height2, 0]);

      var xAxis = external__d3_["axisBottom"](x),
          xAxis2 = external__d3_["axisBottom"](x2),
          yAxis = external__d3_["axisLeft"](y),
          yAxis2 = external__d3_["axisLeft"](y2).ticks([2]);

      var brush = external__d3_["brushX"]().extent([[0, 0], [width, height2]]).on("brush end", brushed);

      var zoom = external__d3_["zoom"]().scaleExtent([1, 200]).translateExtent([[0, 0], [width, height]]).extent([[0, 0], [width, height]]).on("zoom", zoomed);

      var area = external__d3_["area"]().curve(external__d3_["curveMonotoneX"]).x(function (d) {
        return x(d.date);
      }).y0(height).y1(function (d) {
        return y(d.value);
      });

      var area2 = external__d3_["area"]().curve(external__d3_["curveMonotoneX"]).x(function (d) {
        return x2(d.date);
      }).y0(height2).y1(function (d) {
        return y2(d.value);
      });

      svg.append("defs").append("clipPath").attr("id", "zoom-clip").append("rect").attr("width", width).attr("height", height);

      var focus = svg.append("g").attr("class", "focus").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var context = svg.append("g").attr("class", "context").attr("transform", "translate(" + margin2.left + "," + (height + 40) + ")");

      x.domain(external__d3_["extent"](data, function (d) {
        return d.date;
      }));
      y.domain([0, external__d3_["max"](data, function (d) {
        return d.value;
      })]);
      x2.domain(x.domain());
      y2.domain(y.domain());

      focus.append("path").datum(data).attr("class", "area zoom").attr("d", area);

      focus.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(xAxis);

      focus.append("g").attr("class", "axis axis--y").call(yAxis);

      context.append("path").datum(data).attr("class", "area zoom").attr("d", area2);

      context.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height2 + ")").call(xAxis2);

      context.append("g").attr("class", "axis axis--y")
      // .attr("transform", "translate(0," + height2 + ")")
      .call(yAxis2);

      context.append("g").attr("class", "brush").call(brush).call(brush.move, x.range());

      svg.append("rect").attr("class", "zoom").attr("width", width).attr("height", height).attr("transform", "translate(" + margin.left + "," + margin.top + ")").call(zoom);

      function brushed() {
        if (external__d3_["event"].sourceEvent && external__d3_["event"].sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = external__d3_["event"].selection || x2.range();
        x.domain(s.map(x2.invert, x2));
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        svg.select(".zoom").call(zoom.transform, external__d3_["zoomIdentity"].scale(width / (s[1] - s[0])).translate(-s[0], 0));
      }

      function zoomed() {
        if (external__d3_["event"].sourceEvent && external__d3_["event"].sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = external__d3_["event"].transform;
        x.domain(t.rescaleX(x2).domain());
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
      }
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.draw();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a81f468a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/LineChartZoomable.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_LineChartZoomable = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/LineChartZoomable.vue
function injectStyle (ssrContext) {
  __webpack_require__(156)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  LineChartZoomable,
  d3_LineChartZoomable,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_LineChartZoomable = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/LinePlot.vue

//
//
//
//
//
//
//
//








/** Line Plot D3 component
* @module Line Plot
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} metric - what you are measuring
* @param {string} color - color of the chart
* @param {string} dateFormat - default: 'YYYY-MM-DD'
*
* @example
* usage on a page:
* <line-plot
*   :dataModel='linePlotData'
*   propID='line-plot1'
*   metric='Ticket Volume'
*   dateFormat='YYYY-MM-DD'
* ></line-plot>
*/

/* harmony default export */ var LinePlot = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  mixins: [formatTimeMixin["a" /* default */]],
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} date - 'YYYY-MM-DD'
     * @property {string} value - the value at that date
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [{ "id": 2922, "dashboard_metric": "Ticket Volume", "object_id": 1, "date": "2017-06-01", "value": 120, "period": 604800, "time": null, "object_type": 9 }];
      }
    },
    propID: {
      type: String,
      default: "lineplot"
    },
    metric: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "black"
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData) {
        this.internalData = data;
        this.internalData.length !== 0 ? this.draw() : null;
      }
    }
  },
  mounted: function mounted() {
    this.dataModel.length === 0 ? null : this.draw();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
  },

  methods: {
    /**
    * @function drawd3 - function that draws the graphic
    * @param {Array} dataArray
    * the dataModel
    * @param {string} metric - what you are measuring
    * @param {string} selection_string - the id of the div where the svg will be mounted
    * @param {string} color - color of the chart
    */
    drawd3: function drawd3(dataArray, metric, selection_string, color) {
      external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }
      // make copy of the original data so we do not mutate it
      var data = [];
      dataArray.forEach(function (el) {
        return data.push(assign_default()({}, el));
      });

      var localThis = this;
      var formatDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);

      if (typeof data[0].date == 'string') {
        data.forEach(function (d) {
          d.date = formatDate(d.date);
        });
      }

      data.sort(function (a, b) {
        return a.date - b.date;
      });

      var detected_percent = external__d3_["max"](data, function (d) {
        return d.value;
      }) <= 1 ? true : false;
      var element = external__jquery__default()(selection_string);

      var margin = { top: 20, right: 30, bottom: 30, left: 40 },
          width = external__jquery__default()(element).width() - margin.left - margin.right,
          height = external__jquery__default()(element).height() - margin.top - margin.bottom;

      var xValue = function xValue(d) {
        return d.date;
      },
          xScale = external__d3_["scaleTime"]().range([0, width]),
          xMap = function xMap(d) {
        return xScale(xValue(d));
      },
          xAxis = external__d3_["axisBottom"]().scale(xScale).tickSizeInner(-height).ticks(6);

      if (detected_percent) {
        var format_attribute = external__d3_["format"]("%");
      } else {
        var format_attribute = external__d3_["format"]("");
      }

      var yValue = function yValue(d) {
        return d.value;
      },
          yScale = external__d3_["scaleLinear"]().range([height, 0]),
          yMap = function yMap(d) {
        return yScale(yValue(d));
      };

      xScale.domain(external__d3_["extent"](data, xValue));
      yScale.domain([external__d3_["min"](data, yValue), external__d3_["max"](data, yValue)]);

      var yAxis = external__d3_["axisLeft"]().scale(yScale).tickSizeInner(-width).ticks(4).tickFormat(format_attribute);

      var line = external__d3_["line"]().x(xMap).y(yMap);

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var tooltip = external__d3_["select"]("body").append("div").attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip").style("opacity", 0);

      svg.style("fill", "transparent");
      svg.append("g").attr("class", "x axis xaxis axis-line-plot1").attr("transform", "translate(0," + height + ")").style('fill', 'black').style("font-size", "14px").call(xAxis);

      svg.append("g").attr("class", "y axis axis-line-plot").style("fill", "black").call(yAxis).append("foreignObject").attr("transform", "rotate(-90)").attr("y", 6).attr("x", -height).attr("width", height).attr("dy", ".71em").html("<div class=metric-label>" + metric + "</div>");

      var clip_id = "clip-" + this._props.propID;

      var clip = svg.append("clipPath").attr("id", clip_id).append("rect").attr("x", 0).attr("y", 0).attr("width", width > 0 ? width : 0).attr("height", height > 0 ? height : 0);

      svg.append("rect").attr("class", "pane").attr("width", element.width()).attr("height", height).attr("clip-path", "url(#" + clip_id + ")");

      svg.append("path").datum(data).attr("class", "line lineplotline").attr("d", line).attr("clip-path", "url(#" + clip_id + ")").attr("stroke", color);

      svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 5).attr("cx", xMap).attr("cy", yMap).attr("clip-path", "url(#" + clip_id + ")").attr("fill", "black").attr("opacity", 0).on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Date: " + external__moment__default()(d.date).format(localThis.dateFormat) + "<br>" + metric + ": " + format_attribute(yValue(d))).style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
        external__d3_["select"](this).transition().duration(50).style("fill", "black").attr("opacity", 1);
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
        external__d3_["select"](this).transition().duration(50).attr("opacity", 0);
      });

      svg.selectAll(".tick").filter(function (d) {
        return d === 0;
      }).remove();
    },

    draw: function draw() {
      this.drawd3(this.dataModel, this.metric, "#" + this.propID, this.color);
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.dataModel.length === 0 ? null : this.draw();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-60fbfeca","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/LinePlot.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"height":"100%","width":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_LinePlot = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/LinePlot.vue
function injectStyle (ssrContext) {
  __webpack_require__(157)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  LinePlot,
  d3_LinePlot,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_LinePlot = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/PieChart.vue

//
//
//
//
//
//
//
//







/** Pie Chart D3 component
* @module Pie Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} units - what you are measuring
* @param {Number} donutWidth - if this prop is specified, will turn the pie chart into a donut chart. the number indicates the pixel radius of the inner white circle
*
* @example
* usage on a page:
* <pie-chart
*   :dataModel="pieChartData"
*   propID="container-piechart"
* ></pie-chart>
*/

/* harmony default export */ var PieChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} label - what you are measuring
     * @property {string} value - the value of that label
     */
    dataModel: {
      type: Array
    },
    propID: {
      type: String,
      default: 'container-piechart'
    },
    // depending on how dataModel is formatted this could
    // be implemented to display units for each slice within the tooltip
    units: {
      type: String
    },
    donutWidth: {
      // if this prop is specified, will turn the pie chart into a donut chart. the number indicates the pixel radius of the inner white circle
      type: Number,
      default: 0
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      total: 0
    };
  },
  watch: {
    dataModel: function dataModel() {
      this.drawPieChart();
    },
    colors: function colors() {
      this.drawPieChart();
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  mounted: function mounted() {
    this.drawPieChart();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.drawPieChart();
    },
    /**
    * @function drawPieChart - function that draws the graphic
    */
    drawPieChart: function drawPieChart() {
      var _this = this;

      if (this.total === 0 && this.dataModel) {
        this.dataModel.forEach(function (el) {
          _this.total += el['value'];
        });
      }

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var localThis = this;
      var element = external__jquery__default()(selection_string);

      var margin = { top: 10, right: 0, bottom: 20, left: 0 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom,
          radius = height > width ? width / 2 : height / 2;

      var svg = external__d3_["select"](selection_string).append("svg").data([this.dataModel]).attr("width", width).attr("height", height).append("g")
      // sets the center of the piechart to center of container
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      //add tooltip div to the DOM
      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      // create function that will be used to draw slices
      var pie = external__d3_["pie"]().value(function (d) {
        return d.value;
      });

      // Declare an arc generator function
      var donut = this.donutWidth > 0 ? this.donutWidth : radius;
      // if donutWidth prop is present, innerWidth uses that number as a radius; otherwise, innerWidth is 0

      var arc = external__d3_["arc"]().innerRadius(radius - donut).outerRadius(radius);

      // Select paths, use arc generator to draw
      var arcs = svg.selectAll("g.slice").data(pie).enter().append("g").attr("class", "slice");

      // add tooltip on mouseover of slice
      arcs.on("mouseover", function (d) {
        // calculate the percent of total for the slice
        var percent = Math.round(d.data.value / localThis.total * 100);
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html(d.data.label + ': ' + '<b>' + d.data.value + '</b>' + '<br/>' + '<b>' + percent + '</b>' + '% of total').style("left", external__d3_["event"].pageX + "px").style("top", external__d3_["event"].pageY + "px");
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
      });

      var colors = this.colors;

      // add colors to each slice
      arcs.append("path").attr("fill", function (d, i) {
        var length = colors.length;
        var color;
        i >= length ? color = colors[i - length] : color = colors[i];
        return color;
      }).attr("d", arc);

      // This is built in for smaller viewports
      // if the width is less than 800px then the legend won't be added
      // to the SVG the user is still able to hover or click on the pie
      // secion to see the label and value of the section
      if (width > 800) {
        var legend = svg.selectAll(".legend").data(this.dataModel).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
          return "translate(30," + 25 * i + ")";
        });

        legend.append("rect").attr("x", radius + 20).attr("y", -radius + 20).attr("width", 20).attr("height", 20).attr("fill", function (d, i) {
          var length = colors.length;
          var color;
          i >= length ? color = colors[i - length] : color = colors[i];
          return color;
        }).attr("d", arc);

        legend.append("text").attr("x", radius + 45).attr("y", -radius + 30).attr("dy", ".35em").attr("font-size", 14).style("text-anchor", "start").text(function (d, i) {
          return localThis.dataModel[i].label;
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2d62538e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/PieChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"piechart-wrapper",staticStyle:{"height":"100%","width":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_PieChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/PieChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(158)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PieChart,
  d3_PieChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_PieChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__(27);
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(44);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__(45);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// CONCATENATED MODULE: ./src/common/referenceData.js


/*
Parse data for the data table
*/
var referenceData_referenceData = function () {
  function referenceData() {
    classCallCheck_default()(this, referenceData);
  }

  createClass_default()(referenceData, [{
    key: 'getDays',
    value: function getDays() {
      var days = [{ name: 'Mon', value: 2, description: 'Monday' }, { name: 'Tue', value: 3, description: 'Tuesday' }, { name: 'Wed', value: 4, description: 'Wednesday' }, { name: 'Thu', value: 5, description: 'Thursday' }, { name: 'Fri', value: 6, description: 'Friday' }, { name: 'Sat', value: 7, description: 'Saturday' }, { name: 'Sun', value: 1, description: 'Sunday' }];
      return days;
    }
  }, {
    key: 'getMonths',
    value: function getMonths() {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months;
    }
  }, {
    key: 'getFullDays',
    value: function getFullDays() {
      var data = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return data;
    }
  }]);

  return referenceData;
}();
// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/PunchCard.vue


//
//
//
//
//
//
//
//




// import "moment-duration-format";







/** PunchCard D3 component
* @module Punch Card
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {Function} bubbleSelected
* @param {string} axisLabel - label of the axis
* @param {Function} onClick
* @param {Array} axisColors - color of the punchcard datapoints, currently takes two colors
* @param {Function} changeHeight
*
* <punch-card
*   :axisColors="punchAxisColors"
*   :dataModel="punchCardData"
*   alertText="Incident"
*   propID='container-punchcard'
* ></punch-card>
*/

/* harmony default export */ var PunchCard = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    alertText: {
      type: String,
      default: "Incident"
    },
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} day_of_week - number from 0-6
     * @property {Array} value - array of number values for each hour in that day, ex. [4,6,10,...2] (24 elements)
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-punchcard"
    },
    bubbleSelected: {
      type: Function
    },
    axisLabel: {
      type: String,
      default: ""
    },
    onClick: {
      type: Function,
      default: function _default(a, b, c) {
        console.log(a + ': day #' + b + " hour #" + c);
      }
    },
    axisColors: {
      type: Array,
      default: function _default() {
        return ["#e5b1a5", "#ff2b2b"];
      }
    },
    changeHeight: {
      type: Function
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      updateVisual: false,
      internalData: []
    };
  },
  computed: extends_default()({
    processedData: function processedData() {
      var data = this._props.dataModel;
      return data;
    }
  }, themeHelper["a" /* default */]),
  watch: {
    dataModel: function dataModel(data) {

      this.internalData = data;
      this.drawPunchCard(this.internalData);
    },
    theme: function theme(data) {
      this.drawPunchCard(this.processedData);
    }
  },
  mounted: function mounted() {
    this.drawPunchCard(this.processedData);
  },
  methods: {
    getDay: function getDay(day) {
      var days = new referenceData_referenceData().getDays();
      var result = days.filter(function (d) {
        return d.name == day;
      });
      return result[0].value;
    },
    /**
    * @function resizeSVG - redraws the SVG on window
    */
    resizeSVG: function resizeSVG() {
      this.drawPunchCard(this.processedData);
    },
    /**
    * @function drawPunchCard - function that draws the graphic
    * - called in mounted
    * @param {string} orig_data - data
    */
    drawPunchCard: function drawPunchCard(orig_data) {
      if (orig_data === undefined) return;
      try {
        if (orig_data.length === 0) return;
      } catch (e) {
        return;
      }

      var localThis = this;
      // This was needed for the Incident Set Modal Test to pass.
      // localThis loses reference to moment or the reference to localThis gets lost
      localThis.moment = external__moment__default.a;

      var elementName = "#" + this._props.propID;

      var data = JSON.parse(stringify_default()(orig_data)); // deep copy

      var svgElement = external__jquery__default()(elementName + " svg");

      if (svgElement != null) {
        svgElement.remove();
      }

      var margin = { top: 10, right: 5, bottom: 15, left: 15 };
      var padding = 3;
      var xLabelHeight = 30;
      var yLabelWidth = 50;
      var borderWidth = 1;
      var duration = 500;
      var width = 500;
      var height = 181;
      // var width =
      //   $(elementName).width() - margin.left - margin.right - 2 * yLabelWidth;
      // var height =
      //   width / data[0]["hour_volumes"].length * data.length +
      //   2 * xLabelHeight - margin.top - margin.bottom;

      if (this._props.changeHeight !== undefined) this._props.changeHeight(height + margin.top + margin.bottom + 2 * xLabelHeight);

      var chart = external__d3_["select"](elementName).append("svg").attr("width", "100%").attr("data-height", "0.5678").attr("viewBox", "0 0 650 300").attr("preserveAspectRatio", "xMaxYMax meet")
      // .attr("width", width + margin.left + margin.right + 2 * yLabelWidth)
      // .attr("height", height + margin.top + margin.bottom + 2 * xLabelHeight)
      .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //array of all values in the data, for min maxing and length calculations
      var allValues = Array.prototype.concat.apply([], data.map(function (d) {
        return d.hour_volumes;
      }));
      //finds longest array in data
      var maxWidth = external__d3_["max"](data.map(function (d) {
        return d.hour_volumes.length;
      }));
      //maximum radius for bubble.
      var maxR = external__d3_["min"]([(width - yLabelWidth) / maxWidth, (height - xLabelHeight) / data.length]) / 2;

      //sort data and translate into human-readable
      data.sort(function (a, b) {
        parseInt(a["day_of_week"]) > parseInt(b["day_of_week"]);
      });

      data.push(data.shift());

      if (data[0]["day_of_week"].length == 1) {
        data = data.map(function (d) {
          var mo = localThis.moment().weekday(parseInt(d["day_of_week"]));
          d["day_of_week"] = mo.format("ddd");
          return d;
        });
      }

      //create labels
      var labelsX = [];
      for (var i = 0; i < 24; i++) {
        var mo = localThis.moment().hour(i);
        var label = mo.format("ha").slice(0, -1);
        labelsX.push(label);
      }

      //calc total volumes per day, for sumsY label
      var sumsY = [];
      for (var i = 0; i < data.length; i++) {
        var sum = data[i]["hour_volumes"].reduce(function (acc, val) {
          return acc + val;
        }, 0);
        sumsY.push(sum);
      }

      //calc total volumes per hour, for sumsX label
      var sumsX = [];
      for (var i = 0; i < data[0]["hour_volumes"].length; i++) {
        var _sum = data.reduce(function (acc, val) {
          return acc + val["hour_volumes"][i];
        }, 0);
        sumsX.push(_sum);
      }

      //this essentially scales radius values according to the maxR
      var sizeScale = function sizeScale(d, dataset) {
        if (d === 0) return 0;
        var f = external__d3_["scaleSqrt"]().domain([external__d3_["min"](dataset), external__d3_["max"](dataset)]).rangeRound([2, maxR - padding]);
        return f(d);
      };

      var colorScale = function colorScale(d, dataset) {
        var f = external__d3_["scaleLinear"]().domain([external__d3_["min"](dataset), external__d3_["max"](dataset)]).range([localThis.colors[7], localThis.colors[0]]);

        return f(d);
      };

      var colorScaleAxes = function colorScaleAxes(d, dataset) {
        var f = external__d3_["scaleLinear"]().domain([external__d3_["min"](dataset), external__d3_["max"](dataset)]).range(localThis.axisColors);
        return f(d);
      };

      //draw boxes for sums
      var yAxisBorder = chart.append("rect").attr("x", yLabelWidth).attr("y", xLabelHeight + 2 * maxR).attr("width", 2 * maxR).attr("height", height - xLabelHeight - 20).attr("stroke-width", 2).attr("fill", "transparent").attr("shape-rendering", "crispEdges").attr("class", "punch-border");

      var xAxisBorder = chart.append("rect").attr("x", yLabelWidth + 2 * maxR).attr("y", xLabelHeight).attr("width", width - yLabelWidth).attr("height", 2 * maxR).attr("stroke-width", 2).attr("fill", "transparent").attr("shape-rendering", "crispEdges").attr("class", "punch-border");

      //creates rows according to data labels
      var rows = chart.selectAll(".row").data(data, function (d) {
        return d.day_of_week;
      }).enter().append("g").attr("class", "row").attr("transform", function (d, i) {
        return "translate(" + (yLabelWidth + 2 * maxR) + "," + (maxR * i * 2 + 3 * maxR + xLabelHeight) + ")";
      });

      //creating the elements that will hold and represent our data
      var dots = rows.selectAll("circle").data(function (d) {
        return d.hour_volumes;
      }).enter().append("circle").attr("cy", 0).style("fill", "transparent").text(function (d) {
        return d;
      }).attr("r", function (d) {
        return sizeScale(d, allValues);
      }).attr("cx", function (d, i) {
        return i * maxR * 2 + maxR;
      }).attr("shape-rendering", "auto").style("fill", function (d) {
        return colorScale(d, allValues);
      });

      //adds labels
      var dotLabels = rows.selectAll(".dot-label").data(function (d) {
        return d.hour_volumes.map(function (v) {
          return [v, d.day_of_week];
        });
      }).enter().append("g").attr("class", "dot-label").on("mouseover", function (d) {
        var selection = external__d3_["select"](this);
        if (d[0] > 0) {
          selection.style("cursor", "pointer");
        }
        selection.select("circle").transition().duration(100).style("opacity", 1);
        selection.select("text").transition().duration(100).style("opacity", 1);
      }).on("mouseout", function (d) {
        var selection = external__d3_["select"](this);
        selection.style("cursor", "default");
        selection.select("circle").transition().style("opacity", 0);
        selection.select("text").transition().style("opacity", 0);
      }).on("click", function (d, i) {
        if (localThis.onClick !== undefined) {
          if (d[0] > 0) {
            localThis.onClick("point", localThis.getDay(d[1]), i);
          }
        }
      });

      dotLabels.append("circle").attr("r", function (d) {
        return maxR;
      }).attr("cx", function (d, i) {
        return maxR;
      }).attr("cy", function (d, i) {
        return maxR;
      }).style("fill", localThis.colors[0]).style("opacity", 0);

      dotLabels.append("text").style("text-anchor", "middle").style("fill", "#ffffff").style("opacity", 0).style('font-size', 8);

      dotLabels.exit().remove();

      //centers and resizes the text so it doesn't exceed its rect
      dotLabels.attr("transform", function (d, i) {
        return "translate(" + i * maxR * 2 + "," + -maxR + ")";
      }).select("text").text(function (d) {
        return d[0];
      }).attr("y", maxR + 4).attr("x", maxR);

      //ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
      dotLabels.select("rect").attr("width", maxR * 2).attr("height", maxR * 2);

      //creates labels for the x axis (hour)
      var xLabels = chart.selectAll(".xLabel").data(labelsX)
      //styling for the labels
      .enter().append("text").attr("y", xLabelHeight).attr("transform", "translate(0,-6)").attr("class", "xLabel").style("text-anchor", "middle").style("fill-opacity", 0).text(function (d) {
        return d;
      }).attr("x", function (d, i) {
        return maxR * i * 2 + 3 * maxR + yLabelWidth;
      }).style("fill-opacity", 1);

      //creates labels for the y axis (day of week)
      var yLabels = chart.selectAll(".yLabel").data(data, function (d) {
        return d.day_of_week;
      })
      //y label creation
      .enter().append("text").text(function (d) {
        return d.day_of_week;
      }).attr("x", yLabelWidth).attr("class", "yLabel").style("text-anchor", "end").style("fill-opacity", 0).attr("y", function (d, i) {
        return maxR * i * 2 + 3 * maxR + xLabelHeight;
      }).attr("transform", "translate(-6," + maxR / 2.5 + ")").style("fill-opacity", 1);

      //append sums to rows
      var sumsYAxis = chart.selectAll(".sums-y").data(sumsY).enter().append("circle").text(function (d) {
        return d;
      }).attr("cy", 0).attr("class", "sums-y").style("fill", "#ffffff").style("fill-opacity", 0).attr("cy", function (d, i) {
        return maxR * i * 2 + 3 * maxR + xLabelHeight;
      }).attr("r", function (d) {
        return sizeScale(d, sumsY);
      }).attr("cx", yLabelWidth + maxR).attr("shape-rendering", "auto").style("fill", function (d) {
        return colorScaleAxes(d, sumsY);
      }).style("fill-opacity", 1).style("stroke", "#9e9999").style("stroke-width", 1);

      var sumsYValues = chart.selectAll(".sums-y-value").data(sumsY)
      // //adds mouseover transition
      .enter().append("g").attr("class", "sums-y-value").on("mouseover", function (d) {
        var selection = external__d3_["select"](this);
        if (d > 0) {
          selection.style("cursor", "pointer");
        }
        selection.select("circle").transition().duration(0).style("opacity", 1);
        selection.select("text").transition().duration(0).style("opacity", 1);
      }).on("mouseout", function (d) {
        var selection = external__d3_["select"](this);
        selection.style("cursor", "default");
        selection.select("circle").transition().style("opacity", 0);
        selection.select("text").transition().style("opacity", 0);
      }).on("click", function (d, i) {
        if (d > 0) {
          if (localThis !== undefined) localThis.onClick("day", localThis.getDay(yLabels[0][i].textContent), -1);

          //window.location.href = redirect_url + yLabels[0][i].textContent + '/-1';
        }
      });

      //creates the needed svg and text elements to make the labels actually readable
      sumsYValues.append("circle").attr("r", function (d) {
        return maxR;
      }).attr("cx", function (d, i) {
        return maxR;
      }).attr("cy", function (d, i) {
        return maxR;
      }).style("fill", this.axisColors[1]).style("opacity", 0);

      sumsYValues.append("text").style("text-anchor", "middle").style("fill", "#ffffff").style("opacity", 0).style('font-size', 8);

      sumsYValues.exit().remove();

      //centers and resizes the text so it doesn't exceed its rect
      sumsYValues.attr("transform", function (d, i) {
        return "translate(" + yLabelWidth + "," + (xLabelHeight + 2 * maxR + 2 * maxR * i) + ")";
      }).select("text").text(function (d) {
        return d;
      }).attr("y", maxR + 4).attr("x", maxR);

      //ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
      sumsYValues.select("rect").attr("width", maxR * 2).attr("height", maxR * 2);

      //create top label for y
      chart.append("text").attr("x", yLabelWidth).attr("y", height + maxR * 2).append("tspan").attr("class", "sum-label-y").style("text-anchor", "start").text("Total/").append("tspan").attr("dy", 15).attr("x", yLabelWidth).text("Day").attr("class", "sum-label-y").style("text-anchor", "start");
      //x axis sums

      var sumsXAxis = chart.selectAll(".sums-x").data(sumsX);

      //styling for the labels
      sumsXAxis.enter().append("circle").text(function (d) {
        return d;
      }).attr("cy", 0).attr("class", "sums-x").style("fill", "#ffffff").style("fill-opacity", 0).attr("cy", xLabelHeight + maxR).attr("r", function (d) {
        return sizeScale(d, sumsX);
      }).attr("cx", function (d, i) {
        return yLabelWidth + 3 * maxR + maxR * i * 2;
      }).attr("shape-rendering", "auto").style("fill", function (d) {
        return colorScaleAxes(d, sumsX);
      }).style("fill-opacity", 1).style("stroke", "#9e9999").style("stroke-width", 1);

      var sumsXValues = chart.selectAll(".sums-x-value").data(sumsX)
      // //adds mouseover transition
      .enter().append("g").attr("class", "sums-x-value").on("mouseover", function (d) {
        var selection = external__d3_["select"](this);
        if (d > 0) {
          selection.style("cursor", "pointer");
        }
        selection.select("circle").transition().duration(100).style("opacity", 1);
        selection.select("text").transition().duration(100).style("opacity", 1);
      }).on("mouseout", function (d) {
        var selection = external__d3_["select"](this);
        selection.style("cursor", "default");
        selection.select("circle").transition().style("opacity", 0);
        selection.select("text").transition().style("opacity", 0);
      }).on("click", function (d, i) {
        if (d > 0) {
          localThis.onClick("hour", 0, i);
        }
      });

      //creates the needed svg and text elements to make the labels actually readable
      sumsXValues.append("circle").attr("r", function (d) {
        return maxR;
      }).attr("cx", function (d, i) {
        return maxR;
      }).attr("cy", function (d, i) {
        return maxR;
      }).style("fill", this.axisColors[1]).style("opacity", 0);

      sumsXValues.append("text").style("text-anchor", "middle").style("fill", "#ffffff").style("opacity", 0).style('font-size', 8);

      sumsXValues.exit().remove();

      //centers and resizes the text so it doesn't exceed its rect
      sumsXValues.attr("transform", function (d, i) {
        return "translate(" + (yLabelWidth + 2 * maxR * i + 2 * maxR) + ", " + xLabelHeight + ")";
      }).select("text").text(function (d) {
        return d;
      }).attr("y", maxR + 4).attr("x", maxR);

      //ensures the colored rect on the label is the width and height of the circle diameter (maxR * 2)
      sumsXValues.select("rect").attr("width", maxR * 2).attr("height", maxR * 2);

      //create left label for sumsX
      chart.append("text").attr("x", width + 2 * maxR + 7).attr("y", xLabelHeight + maxR / 2).append("tspan").attr("class", "sum-label-y").style("text-anchor", "start").text("Total/").append("tspan").attr("dy", 15).attr("x", width + 2 * maxR + 7).text("Hr").attr("class", "sum-label-y").style("text-anchor", "start");

      //draw in-chart light axes separating squares
      var vert = chart.selectAll(".vert").data(labelsX).enter().append("line").attr("class", "vert").attr("y1", xLabelHeight + borderWidth / 2).attr("stroke", "#888").attr("stroke-width", 1).style("shape-rendering", "crispEdges").style("stroke-opacity", 0).attr("x1", function (d, i) {
        return maxR * i * 2 + yLabelWidth + 2 * maxR;
      }).attr("x2", function (d, i) {
        return maxR * i * 2 + yLabelWidth + 2 * maxR;
      }).attr("y2", height - 20 + 2 * maxR).style("stroke-opacity", function (d, i) {
        return i ? 0.5 : 0;
      });

      var horiz = chart.selectAll(".horiz").data(data, function (d) {
        return d.day_of_week;
      }).enter().append("line").attr("class", "horiz").attr("x1", yLabelWidth + borderWidth / 2).attr("stroke", "#888").attr("stroke-width", 1).style("shape-rendering", "crispEdges").style("stroke-opacity", 0).attr("x2", width + 2 * maxR).attr("y1", function (d, i) {
        return i * maxR * 2 + xLabelHeight + 2 * maxR;
      }).attr("y2", function (d, i) {
        return i * maxR * 2 + xLabelHeight + 2 * maxR;
      }).style("stroke-opacity", function (d, i) {
        return i ? 0.5 : 0;
      });

      var outerBorderBottom = chart.append("line").attr("x1", yLabelWidth).attr("y1", height - 20 + 2 * maxR).attr("x2", width + 2 * maxR).attr("y2", height - 20 + 2 * maxR).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").attr('class', 'punch-border');

      var outerBorderRight = chart.append("line").attr("x1", width + 2 * maxR).attr("y1", xLabelHeight).attr("x2", width + 2 * maxR).attr("y2", height - 20 + 2 * maxR).attr("stroke-width", 1).style("shape-rendering", "crispEdges").attr('class', 'punch-border');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e2285078","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/PunchCard.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_PunchCard = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/PunchCard.vue
function injectStyle (ssrContext) {
  __webpack_require__(159)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PunchCard,
  d3_PunchCard,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_PunchCard = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(160);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/Scatterplot.vue
//
//
//
//
//
//
//
//








/** Scatterplot D3 component
* @module Scatterplot
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <scatterplot
*   :dataModel="scatterplotData"
*   propID="scatterplot"
* ></scatterplot>
*
*/

/* harmony default export */ var Scatterplot = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} Value1 - description
     * @property {string} Value2 - description
     * @property {Number} x - x-axis value
     * @property {Number} y - y-axis value
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: 'scatterplot'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      name: "Scatterplot",
      update: false,
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      // console.log('BarChart dataModel changed')
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawScatterplot(data, this.propID);
    }
  },
  mounted: function mounted() {
    this.drawScatterplot(this._props.dataModel, this._props.propID);
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.drawScatterplot();
    },
    /**
    * @function drawScatterplot - function that draws the graphic
    * @param {Array} data
    * the dataModel
    * @param {string} propID - ID of the component
    */
    drawScatterplot: function drawScatterplot() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.dataModel;
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.propID;


      var selection_string = "#" + id;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }
      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();

      var element = external__jquery__default()(selection_string);

      //set margins
      //leave room in right margin for legend
      var margin = { top: 20, right: 60, bottom: 30, left: 40 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      //make tooltips
      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      // setup x
      var xValue = function xValue(d) {
        return d.x;
      },
          // data -> value
      xScale = external__d3_["scaleLinear"]().range([0, width]),
          // value -> display
      xMap = function xMap(d) {
        return xScale(xValue(d));
      },
          // data -> display
      xAxis = external__d3_["axisBottom"]().scale(xScale);

      // setup y
      var yValue = function yValue(d) {
        return d.y;
      },
          // data -> value
      yScale = external__d3_["scaleLinear"]().range([height, 0]),
          // value -> display
      yMap = function yMap(d) {
        return yScale(yValue(d));
      },
          // data -> display
      yAxis = external__d3_["axisLeft"]().scale(yScale);

      // setup fill color
      var cValue = function cValue(d) {
        return d.Value2;
      },
          color = external__d3_["scaleOrdinal"](external__d3_["schemeCategory10"]);

      // add the graph canvas to the body of the webpage
      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([external__d3_["min"](data, xValue) - 1, external__d3_["max"](data, xValue) + 1]);
      yScale.domain([external__d3_["min"](data, yValue) - 1, external__d3_["max"](data, yValue) + 1]);

      // x-axis
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -6).style("text-anchor", "end").text("x-axis label");

      // y-axis
      svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("y-axis label");

      // draw dots
      svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 3.5).attr("cx", xMap).attr("cy", yMap).style("fill", function (d) {
        return color(cValue(d));
      })

      //tooltips
      .on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html(d.Value1 + "<br/> (" + xValue(d) + ", " + yValue(d) + ")").style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
      });

      // draw legend
      var legend = svg.selectAll(".legend").data(color.domain()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
        return "translate(30," + 25 * i + ")";
      });

      // draw legend colored rectangles
      legend.append("rect").attr("x", width - 20).attr("width", 20).attr("height", 20).style("fill", color);

      //append legend text using Value2
      legend.append("text").attr("x", width + 5).attr("y", 9).attr("dy", ".35em").style("text-anchor", "start").text(function (d) {
        return d;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-432c04cf","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/Scatterplot.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"scatterplot",staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_Scatterplot = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/Scatterplot.vue
function injectStyle (ssrContext) {
  __webpack_require__(163)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Scatterplot,
  d3_Scatterplot,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_Scatterplot = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var object_keys = __webpack_require__(11);
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/StackedBarChart.vue

//
//
//
//
//
//
//
//









/** Stacked Bar Chart D3 component
* @module Stacked Bar Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} xaxisLabel - label for x-axis
* @param {string} yaxisLabel - label for y-axis
* @param {string} dateFormat - Momentjs format of the date in the dataModel
*
* @example
* usage on a page:
* <stacked-bar-chart
*   :dataModel="stackedBarChartData"
*   propID='stackedBarChart'
*   dateFormat='MMMM'
* ></stacked-bar-chart>
*
*/

/* harmony default export */ var StackedBarChart = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  mixins: [formatTimeMixin["a" /* default */]],
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} month - month for x axis value OR use date
     * @property {string} date - date for x-axis value OR use month
     * @property {string} A - y-axis value
     * @property {string} B - y-axis value
     * @property {string} C - y-axis value
     * you can specify as many values as you need.
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [{ "month": "January", "A": 20, "B": 5, "C": 10 }];
      }
    },
    xaxisLabel: {
      type: String,
      default: ''
    },
    yaxisLabel: {
      type: String,
      default: ''
    },
    propID: {
      type: String,
      default: 'stackedBarChart'
    },
    dateFormat: {
      type: String,
      default: 'MMMM'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      name: "StackedBarChart",
      update: false,
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      // console.log('BarChart dataModel changed')
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawStackedBarChart(data);
    }
  },
  mounted: function mounted() {
    this.dataModel.length !== 0 ? this.drawStackedBarChart(this._props.dataModel, this._props.propID, this._props.yaxisLabel, this._props.xaxisLabel) : null;
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.dataModel.length !== 0 ? this.drawStackedBarChart() : null;
    },

    /**
    * @function drawStackedBarChart - function that draws the graphic
    * @param {Array} data
    * the dataModel
    * @param {string} propID - ID of the component
    * @param {string} xAxis - label for x-axis
    * @param {string} yAxis - label for y-axis
    */
    drawStackedBarChart: function drawStackedBarChart() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataModel;
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._props.propID;
      var yAxis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._props.yaxisLabel;
      var xAxis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this._props.xaxisLabel;

      var timeKey;
      keys_default()(data[0]).includes('month') ? timeKey = 'month' : timeKey = 'date';
      var keys = keys_default()(data[0]).filter(function (el) {
        return el !== timeKey;
      });

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + id;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      //set margins
      //leave room in right margin for legend

      var margin = { top: 30, right: 60, bottom: 30, left: 40 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      //make tooltips
      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      //make svg
      var svg = external__d3_["select"](".stackedBarChart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //set x, y axis and color
      var x = external__d3_["scaleBand"]()
      //width leaves room for legend
      .range([0, width - 25], .1).padding(0.1);

      var y = external__d3_["scaleLinear"]().range([height, 0]);

      // var colors = ["#98abc5", "#8a89a6", "#7b6888"]
      //var colors = ["#4F1E71", "#A93B8D", "#F38595"]
      var colors = ["#081A4E", "#1A649F", "#2DA8C9", "#9AD5CD"].slice(0, keys.length);
      var parseDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);

      var stack = external__d3_["stack"]().keys(keys).order(external__d3_["stackOrderNone"]).offset(external__d3_["stackOffsetNone"]);
      var layers = stack(data);

      x.domain(data.map(function (d) {
        return parseDate(d[timeKey]);
      }));
      y.domain([0, external__d3_["max"](layers[layers.length - 1], function (d) {
        return d[1];
      })]).nice();

      var ticks = data.map(function (d) {
        return parseDate(d[timeKey]);
      });

      if (ticks.length > 11) {
        ticks = ticks.filter(function (t, i) {
          return i % 6 === 0;
        });
      }
      //make x and y axises
      var xAxis = external__d3_["axisBottom"]().scale(x).tickValues(ticks).tickFormat(external__d3_["timeFormat"](this.d3Time[this.dateFormat]));

      var yAxis = external__d3_["axisLeft"]().scale(y).tickSizeInner(-width + 25, 0, 0).ticks(6).tickFormat(function (d) {
        return d;
      });

      //append x and y axises

      svg.append("g").attr("class", "y axis-stacked").call(yAxis);

      svg.append("g").attr("class", "x axis-stacked").attr("transform", "translate(0," + height + ")").call(xAxis);

      var layer = svg.selectAll(".stack").data(layers).enter().append("g").attr("class", function (d, i) {
        return 'stack' + i;
      });
      // .style("fill", function (d, i) {return colors[i];});

      var rect = layer.selectAll("rect").data(function (d) {
        return d;
      }).enter().append("rect").attr("class", "stackedBar").attr("x", function (d) {
        return x(parseDate(d.data[timeKey]));
      }).attr("y", function (d) {
        return y(d[1]);
      }).attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      }).attr("width", x.bandwidth())

      //tooltips
      .on("mouseover", function (d) {
        // find the amount by subtracting the two values in array
        var difference = d[1] - d[0];
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Date: " + "<b>" + d.data[timeKey] + "</b>" + "<br>" + "Amount" + ": " + "<b>" + difference + "</b>").style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
      });

      // Draw legend
      var legend = svg.selectAll(".legend").data(colors).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
        return "translate(30," + i * 19 + ")";
      });

      legend.append("rect").attr("x", width - 50).attr("width", 25).attr("height", 25).attr("class", function (d, i) {
        return 'stack' + (keys.length - 1 - i);
      });

      legend.append("text").attr("x", width - 20).attr("y", 9).attr("dy", ".35em").style("text-anchor", "start").text(function (d, i) {
        return keys[i].slice(0, 1).toUpperCase() + keys[i].slice(1);
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-dc181040","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/StackedBarChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"stackedBarChart",staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_StackedBarChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/StackedBarChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(164)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  StackedBarChart,
  d3_StackedBarChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_StackedBarChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var object_keys = __webpack_require__(11);
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/StreamGraph.vue


//
//
//
//
//
//
//
//









/** StreamGraph D3 component
* @module Stream Graph
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} dateFormat - 'MM/YYYY'
*
* @example
* usage on a page:
* <stream-graph
*   :dataModel="streamGraphData"
*   propID="container-streamgraph"
*   dateFormat='MMMM'
* ></stream-graph>
*
*/

/* harmony default export */ var StreamGraph = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  mixins: [formatTimeMixin["a" /* default */]],
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} month - month for x axis value OR use date
     * @property {string} date - date for x-axis value OR use month
     * @property {string} A - y-axis value
     * @property {string} B - y-axis value
     * @property {string} C - y-axis value
     * you can specify as many values as you need.
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: 'container-streamgraph'
    },
    dateFormat: {
      type: String,
      default: 'MM/YYYY'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData) {
        this.internalData = data;
        this.internalData.length !== 0 ? this.draw() : null;
      }
    },
    theme: function theme(data) {
      this.draw();
    }
  },
  mounted: function mounted() {
    this.dataModel.length !== 0 ? this.draw() : null;
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function draw - function that draws the graphic
    */
    draw: function draw() {
      var _this = this;

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " > svg") != null) {
        external__jquery__default()(selection_string + " > svg").remove();
      }

      var data = this.dataModel;
      var element = external__jquery__default()(selection_string);
      var parseDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);
      var timeKey;
      keys_default()(data[0]).includes('month') ? timeKey = 'month' : timeKey = 'date';
      var keys = keys_default()(data[0]).filter(function (el) {
        return el !== timeKey;
      });

      data.sort(function (a, b) {
        return external__moment__default()(a[timeKey], _this.dateFormat) - external__moment__default()(b[timeKey], _this.dateFormat);
      });

      var margin = { top: 5, right: 40, bottom: 20, left: 50 },
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

      var stack = external__d3_["stack"]().keys(keys).offset(external__d3_["stackOffsetWiggle"]),
          layers = stack(data);

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = external__d3_["scaleTime"]().domain([parseDate(data[0][timeKey]), parseDate(data[data.length - 1][timeKey])]).range([0, width]);

      var y = external__d3_["scaleLinear"]().domain([external__d3_["min"](layers, stackMin), external__d3_["max"](layers, stackMax)]).range([height, 0]);

      var xAxis = external__d3_["axisBottom"]().scale(x).tickFormat(external__d3_["timeFormat"](this.d3Time[this.dateFormat]));

      var yAxis = external__d3_["axisLeft"]().scale(y).tickSizeInner(-width + 25, 0, 0).ticks(6).tickFormat(function (d) {
        return d;
      });

      var z = this.colors;

      var area = external__d3_["area"]().x(function (d, i) {
        return x(parseDate(d.data[timeKey]));
      }).y0(function (d) {
        return y(d[0]);
      }).y1(function (d) {
        return y(d[1]);
      }).curve(external__d3_["curveMonotoneX"]);

      svg.append("g").attr("class", "y axis").call(yAxis);

      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

      svg.selectAll("streams").data(layers).enter().append("path").attr("d", area).attr('class', 'layer').attr("fill", function (d, i) {
        return z[i];
      });

      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      var localThis = this;
      svg.selectAll(".layer").attr("opacity", 1).on("mouseover", function (d, i) {
        svg.selectAll(".layer").transition().duration(250).attr("opacity", function (d, j) {
          return j != i ? 0.6 : 1;
        });
      }).on("mousemove", function (d, i) {
        var mousex = external__d3_["mouse"](this);
        // get x coordinate of mouse
        mousex = mousex[0];
        // get x value based on mouse position
        // x value is a JS date
        var invertedx = x.invert(mousex);
        // change the js date into a moment that matches a date in dataModel
        var date = external__moment__default()(invertedx).format(localThis.dateFormat);
        // data for that stream
        var selected = d;
        // key is the label of the stream
        var key = d['key'];
        // get value of stream at that date
        var value = d.filter(function (el) {
          return el.data[timeKey] == date;
        })[0].data[key];

        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Date: " + "<b>" + date + '</b>' + '<br/>' + 'Label: <b>' + key + '</b>' + "<br>" + "Amount" + ": " + "<b>" + value + "</b>").style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
      }).on("mouseout", function (d, i) {
        svg.selectAll(".layer").transition().duration(250).attr("opacity", "1");
        tooltip.transition().duration(300).style("opacity", 0);
      }).on('click', function (d) {
        console.log(d['key'] + ' was clicked');
      });

      function stackMax(layer) {
        return external__d3_["max"](layer, function (d) {
          return d[1];
        });
      }

      function stackMin(layer) {
        return external__d3_["min"](layer, function (d) {
          return d[0];
        });
      }
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.dataModel.length !== 0 ? this.draw() : null;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3b341ba4","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/StreamGraph.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_StreamGraph = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/StreamGraph.vue
function injectStyle (ssrContext) {
  __webpack_require__(165)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  StreamGraph,
  d3_StreamGraph,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_StreamGraph = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/Sunburst.vue
//
//
//
//
//
//
//
//







/** Sunburst D3 component
* @module Sunburst
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <sunburst
*   v-on:click="clicked"
*   :dataModel="flareData"
*   propID="sunburst"
* ></sunburst>
*
*/

/* harmony default export */ var Sunburst = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} name
     * @property {Array} children - array of objects consisting of names and values.
     */
    dataModel: {
      type: Array
    },
    propID: {
      type: String,
      default: 'sunburst'
    },
    title: {
      type: String
    }
  },
  watch: {
    dataModel: function dataModel(data) {
      this.draw();
    }
  },
  mounted: function mounted() {
    this.draw();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  methods: {
    /**
    * @function draw - function that draws the graphic
    */
    draw: function draw() {

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      var width = element.width();
      var height = element.height();

      if (height === undefined || height === 0) height = width / 4;

      var radius = Math.min(width, height) / 2;
      var color = external__d3_["scaleOrdinal"](external__d3_["schemePaired"]);

      var formatNumber = external__d3_["format"](",d");

      var x = external__d3_["scaleLinear"]().range([0, 2 * Math.PI]);

      var y = external__d3_["scaleSqrt"]().range([0, radius]);

      var partition = external__d3_["partition"]();

      var arc = external__d3_["arc"]().startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
      }).endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
      }).innerRadius(function (d) {
        return Math.max(0, y(d.y0));
      }).outerRadius(function (d) {
        return Math.max(0, y(d.y1));
      });

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      var root = external__d3_["hierarchy"](this.dataModel[0]);
      root.sum(function (d) {
        return d.size;
      });
      var nodes = partition(root).descendants();

      svg.selectAll("path").data(nodes).enter().append("path").attr("d", arc).attr('class', 'segment').style("fill", function (d) {
        return color((d.children ? d : d.parent).data.name);
      }).on("click", click).on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Name: " + d.data.name + "<br/>" + (d.data.size ? "Value: " + d.data.size : "")).style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
      }).append("title").text(function (d) {
        return d.data.name + "\n" + formatNumber(d.value);
      });

      function click(d) {
        svg.transition().duration(750).tween("scale", function () {
          var xd = external__d3_["interpolate"](x.domain(), [d.x0, d.x1]),
              yd = external__d3_["interpolate"](y.domain(), [d.y0, 1]),
              yr = external__d3_["interpolate"](y.range(), [d.y0 ? 20 : 0, radius]);
          return function (t) {
            x.domain(xd(t));y.domain(yd(t)).range(yr(t));
          };
        }).selectAll("path").attrTween("d", function (d) {
          return function () {
            return arc(d);
          };
        });
      }

      external__d3_["select"](self.frameElement).style("height", height + "px");
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.draw();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2e81f290","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/Sunburst.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticClass:"liceChart",staticStyle:{"height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_Sunburst = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/Sunburst.vue
function injectStyle (ssrContext) {
  __webpack_require__(166)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Sunburst,
  d3_Sunburst,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_Sunburst = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(12);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/TwoLinePlot.vue

//
//
//
//
//
//
//
//









/** Two Line Plot D3 component
* @module Two Line Plot
*
* @param {Array} dataModel - the dataModel for one line
* @param {Array} dataModel2 - the dataModel for the other line
* @param {string} propID - the ID for the component
* @param {string} metric1 - the name for first set of data you are measuring
* @param {string} metric2 - the name for the second set of data you are measuring
* @param {string} dateFormat - 'YYYY-MM-DD'
*
* @example
* usage on a page:
* <two-line-plot
*   :dataModel="linePlotData"
*   :dataModel2="lineData"
*   metric="Open Tickets"
*   metric2="Resolved Tickets"
*   propID='container-twolineplot'
*   dateFormat='YYYY-MM-DD'
* ></two-line-plot>
*
*/

/* harmony default export */ var TwoLinePlot = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  mixins: [formatTimeMixin["a" /* default */]],
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} date - date String'(ex. "2017-06-01")
     * @property {string} value - the value at the date
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return ["data", "data"];
      }
    },
    dataModel2: {
      type: Array,
      default: function _default() {
        return ["data", "data"];
      }
    },
    propID: {
      type: String,
      default: "container-twolineplot"
    },
    metric: {
      type: String,
      default: ""
    },
    metric2: {
      type: String,
      default: ""
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      internalData: [],
      internalData2: []
    };
  },
  watch: {
    dataModel: function dataModel(data) {
      if (data !== this.internalData && data.length !== 0) {
        this.internalData = data;
        this.internalData.length !== 0 ? this.drawd3(data, this.dataModel2, this.metric, this.metric2, "#" + this.propID) : null;
      }
    },
    dataModel2: function dataModel2(data) {
      if (data !== this.internalData2 && data.length !== 0) {
        this.internalData2 = data;
        this.internalData2.length !== 0 ? this.drawd3(this.dataModel, data, this.metric, this.metric2, "#" + this.propID) : null;
      }
    },
    displayTheme: function displayTheme(data) {
      this.drawd3(this.dataModel, this.dataModel2, this.metric, this.metric2, "#" + this.propID);
    }
  },
  mounted: function mounted() {
    this.dataModel.length === 0 ? null : this.draw();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
  },

  computed: {
    displayTheme: function displayTheme() {
      return this.$store.state.displayTheme;
    }
  },
  methods: {
    drawd3: function drawd3(dataArray, dataArray2, metric, metric2, selection_string) {
      external__d3_["selectAll"]("." + this.propID + "_tooltip").remove();
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }
      var data = [];
      var data2 = [];
      dataArray.forEach(function (el, i) {
        data.push(assign_default()({}, el));
        data2.push(assign_default()({}, dataArray2[i]));
      });

      var localThis = this;
      var formatDate = external__d3_["timeParse"](this.d3Time[this.dateFormat]);

      if (typeof data[data.length - 1].date == 'string') {
        data.forEach(function (d) {
          if (typeof d.date == 'string') {
            d.date = formatDate(d.date);
          }
        });
      }
      data.sort(function (a, b) {
        return a.date - b.date;
      });

      if (typeof data2[data2.length - 1].date == 'string') {
        data2.forEach(function (d) {
          if (typeof d.date == 'string') {
            d.date = formatDate(d.date);
          }
        });
      }
      data2.sort(function (a, b) {
        return a.date - b.date;
      });

      var detected_percent = function detected_percent(d) {
        var detected = external__d3_["max"](d, function (obj) {
          return obj.value;
        }) <= 1 ? "%" : "";
        return detected;
      };

      var margin = { top: 20, right: 50, bottom: 30, left: 75 },
          width = external__jquery__default()(selection_string).width() - margin.left - margin.right,
          height = external__jquery__default()(selection_string).height() - margin.top - margin.bottom;

      var xValue = function xValue(d) {
        return d.date;
      },
          xScale = external__d3_["scaleTime"]().range([0, width]),
          xMap = function xMap(d) {
        return xScale(xValue(d));
      },
          xAxis = external__d3_["axisBottom"]().scale(xScale).tickSizeInner(-height).ticks(6);

      var format_attribute = external__d3_["format"](detected_percent(data));
      var format_attribute2 = external__d3_["format"](detected_percent(data2));

      var yValue = function yValue(d) {
        return d.value;
      },
          yScale = external__d3_["scaleLinear"]().range([height, 0]),
          yScale2 = external__d3_["scaleLinear"]().range([height, 0]),
          yMap = function yMap(d) {
        return yScale(yValue(d));
      },
          yMap2 = function yMap2(d) {
        return yScale2(yValue(d));
      };

      var y_max = void 0,
          y_max2 = void 0;
      y_max = external__d3_["max"](data, yValue);
      y_max2 = external__d3_["max"](data2, yValue);

      var y_min = void 0,
          y_min2 = void 0;
      y_min = external__d3_["min"](data, yValue);
      y_min2 = external__d3_["min"](data2, yValue);

      var x_domain = external__d3_["extent"](data, xValue);

      xScale.domain(x_domain);
      yScale.domain([y_min, y_max]);
      yScale2.domain([y_min2, y_max2]);

      var yAxis2 = external__d3_["axisRight"]().scale(yScale2).ticks(6).tickFormat(format_attribute2);

      var yAxis = external__d3_["axisLeft"]().scale(yScale).ticks(6).tickSizeInner(-width).tickFormat(format_attribute);

      var line = external__d3_["line"]().x(xMap).y(yMap);

      var line2 = external__d3_["line"]().x(xMap).y(yMap2);

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var tooltip = external__d3_["select"]("body").append("div").attr("class", "d3_visuals_tooltip " + this.propID + "_tooltip").style("opacity", 0);

      svg.append("g").attr("class", "x axis xaxis axis-two-plot").attr("transform", "translate(0," + height + ")").call(xAxis);

      svg.append("g").attr("class", "y axis axis-two-plot").style("fill", "black").call(yAxis).append("foreignObject").attr("class", "metric-label-two-plot").attr("transform", "rotate(-90)").attr("y", 6).attr("x", -height).attr("width", height).attr("dy", ".71em").style("text-anchor", "end").text(metric);

      svg.append("g").attr("class", "y axis yaxis2 axis-two-plot").attr("transform", "translate(" + width + " ,0)").style("fill", "black").call(yAxis2).append("text").attr("transform", "rotate(-90)").attr("dy", "-.71em").style("text-anchor", "end").style("font-size", "16px").text(metric2);

      var displayTheme = this.displayTheme;
      svg.append("path").datum(data).attr("class", "twoplotline").attr('stroke', function () {
        if (displayTheme === "light") {
          return "var(--first)";
        } else {
          return "var(--sixth)";
        }
      }).attr("d", line).attr('stroke-width', '3');

      svg.append("path").datum(data2).attr("class", "line-2").attr("d", line2).attr('stroke-width', '3').attr('stroke', "var(--fifth)").attr('fill', 'none');

      svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 5).attr("cx", xMap).attr("cy", yMap).attr("fill", "steelblue").attr("opacity", 0).on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Date: " + external__moment__default()(d.date).format(localThis.dateFormat) + "<br>" + metric + ": " + format_attribute(yValue(d))).style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
        external__d3_["select"](this).transition().duration(50).style("fill", "blue").attr("opacity", 1);
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
        external__d3_["select"](this).transition().duration(50).attr("opacity", 0);
      });

      svg.selectAll(".dot2").data(data2).enter().append("circle").attr("class", "dot2").attr("r", 5).attr("cx", xMap).attr("cy", yMap2).attr("fill", "#222222").attr("opacity", 0).on("mouseover", function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html("Date: " + external__moment__default()(d.date).format(localThis.dateFormat) + "<br>" + metric2 + ": " + format_attribute2(yValue(d))).style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
        external__d3_["select"](this).transition().duration(50).style("fill", "blue").attr("opacity", 1);
      }).on("mouseout", function (d) {
        tooltip.transition().duration(300).style("opacity", 0);
        external__d3_["select"](this).transition().duration(50).attr("opacity", 0);
      });

      svg.selectAll(".tick").filter(function (d) {
        return d === 0;
      }).remove();
    },
    /**
    * @function draw - function that draws the graphic
    * @param {Array} dataModel - the first dataModel
    * @param {Array} dataModel2 - the second dataModel
    * @param {string} metric - name of the first set of data
    * @param {string} metric2 - name for the second set of data
    * @param {string} propID - the ID of the component
    */
    draw: function draw() {
      this.drawd3(this.dataModel, this.dataModel2, this.metric, this.metric2, "#" + this.propID);
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.propWidth = window.innerWidth - 30;
      this.dataModel.length !== 0 ? this.draw() : null;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3c312687","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/TwoLinePlot.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"height":"100%","width":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_TwoLinePlot = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/TwoLinePlot.vue
function injectStyle (ssrContext) {
  __webpack_require__(167)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  TwoLinePlot,
  d3_TwoLinePlot,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_TwoLinePlot = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "topojson-client"
var external__topojson_client_ = __webpack_require__(102);
var external__topojson_client__default = /*#__PURE__*/__webpack_require__.n(external__topojson_client_);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/USMap.vue

//
//
//
//
//
//
//








/** US Map D3 component
* @module US Map
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {string} county - By passing County the map is split by counties; by passing State the map is split by states
* @param {string} metric - title of the data for the chart
* @param {Array} colorDomain - determines the threshhold points for where the graph changes color; should always be 5 values
* @param {Array} legendDomain - determines the number of colored rectangles in the legend; should always be one step more than the colorDomains final value
*
* @example
* usage on a page:
* <us-map
*   :dataModel="usMapCountyData"
*   propID="container-usmap"
* ></us-map>
*
*/

/* harmony default export */ var USMap = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} id - the state or county id depending on the format
     * @property {string} value - the value for that id (passed in as a float percent)
     * @property {string} state - optional name of state if rendering the state map
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: 'container-usmap'
    },
    // By passing County the map is split by counties
    // By passing State the map is split by states
    format: {
      type: String,
      default: 'County'
    },
    // the title of the data for the chart
    metric: {
      type: String,
      default: 'Unemployment rate'
    },
    // the colorDomain determines the threshhold points for where the graph changes color
    // should always be 5 values
    colorDomain: {
      type: Array,
      default: function _default() {
        return [2, 4, 6, 8, 10];
      }
    },
    // the legendDomain is what determines the number of colored rectangles in the legend
    // should always be one step more than the colorDomains final value
    legendDomain: {
      type: Array,
      default: function _default() {
        return [1, 12];
      }
    },
    title: {
      type: String
    }
  },
  mounted: function mounted() {
    this.draw();
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  watch: {
    theme: function theme(data) {
      this.draw();
    }
  },
  methods: {
    /**
    * @function draw - function that draws the graphic
    */
    draw: function draw() {
      var _this = this;

      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      var margin = { top: 20, right: 20, bottom: 30, left: 50 },
          width = element.width(),
          height = element.height() - margin.top - margin.bottom;

      var color = external__d3_["scaleThreshold"]().domain(this.colorDomain).range(this.colors.slice().reverse());

      // scales the chart to fit within a box with 400px height
      function scale(scaleFactor) {
        return external__d3_["geoTransform"]({
          point: function point(x, y) {
            this.stream.point(x * scaleFactor, y * scaleFactor);
          }
        });
      }

      var path = external__d3_["geoPath"]().projection(scale(0.7));

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width).attr("height", height);

      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      var x = external__d3_["scaleLinear"]().domain(this.legendDomain).rangeRound([500, 700]);

      var g = svg.append("g").attr("class", "key").attr("transform", "translate(-100,30)");

      g.selectAll("rect").data(color.range().map(function (d) {
        d = color.invertExtent(d);
        if (d[0] === undefined && d[1] === undefined) return null;
        if (d[0] === undefined) d[0] = 0;
        if (d[1] === undefined) d[1] = x.domain()[1];
        return d;
      }).filter(function (d) {
        return d !== null;
      })).enter().append("rect").attr("height", 8).attr("x", function (d) {
        return x(d[0]);
      }).attr("width", function (d) {
        return x(d[1]) - x(d[0]);
      }).attr("fill", function (d) {
        return color(d[0]);
      });

      g.append("text").attr("class", "caption").attr("x", x.range()[0]).attr("y", -6).attr("fill", "#000").attr("text-anchor", "start").attr("font-weight", "bold").text(this.metric);

      g.call(external__d3_["axisBottom"](x).tickSize(10).tickFormat(function (x, i) {
        return i ? x : x + "%";
      }).tickValues(color.domain())).attr('x', 500).select(".domain").remove();

      g.selectAll('.tick').each(function (d, i) {
        external__d3_["select"](this).attr('transform', 'translate(' + (520 + i * 36) + ',0)');
      });

      var data = this.dataModel;
      // fetches the json for the US map from d3
      external__d3_["json"]('https://d3js.org/us-10m.v1.json').then(function (us) {
        var valueById = {};
        data.forEach(function (d) {
          valueById[d.id] = +d.value;
        });

        // sets the correct classes for the map and chooses the correct
        // data depending ont whether the map shopuld display counties or states
        var attributes = {};
        if (_this.format === 'County') {
          attributes = {
            class1: 'counties',
            class2: 'state-boundaries',
            feature: us.objects.counties
          };
        } else {
          attributes = {
            class1: 'states',
            class2: 'state-borders',
            feature: us.objects.states
          };
        }

        svg.append("g").attr("class", attributes['class1']).selectAll("path").data(external__topojson_client_["feature"](us, attributes['feature']).features).enter().append("path").attr("d", path).style("fill", function (d) {
          return color(valueById[d.id] * 100);
        }).on("mouseover", function (d) {
          tooltip.transition().duration(100).style("opacity", 1);
          var selected = data.find(function (el) {
            return parseInt(el.id) === parseInt(d.id);
          });
          tooltip.html((d.id < 60 ? "State: " + selected.state + "<br/>" : "") + "Value: " + Math.round(selected.value * 100) + '%').style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
        }).on("mouseout", function (d) {
          tooltip.transition().duration(300).style("opacity", 0);
        });

        svg.append("path").datum(external__topojson_client_["mesh"](us, us.objects.states, function (a, b) {
          return a.id !== b.id;
        })).attr("class", attributes['class2']).attr("d", path(external__topojson_client_["mesh"](us, us.objects.states, function (a, b) {
          return a.id !== b.id;
        })));
      });
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.draw();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-339912a9","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/USMap.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%","overflow-x":"scroll!important"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_USMap = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/USMap.vue
function injectStyle (ssrContext) {
  __webpack_require__(168)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  USMap,
  d3_USMap,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_USMap = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: external "d3"
var external__d3_ = __webpack_require__(4);
var external__d3__default = /*#__PURE__*/__webpack_require__.n(external__d3_);

// EXTERNAL MODULE: external "topojson-client"
var external__topojson_client_ = __webpack_require__(102);
var external__topojson_client__default = /*#__PURE__*/__webpack_require__.n(external__topojson_client_);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/d3/WorldMap.vue

//
//
//
//
//
//
//
//








/** World Map D3 component
* @module World Map
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
* @param {Array} colorDomain - determines the threshhold points for where the graph changes color; should always be 5 values
*
* @example
* usage on a page:
* <world-map
*   :dataModel="worldMapData"
*   propID="container-worldmap"
* ></world-map>
*
*/

/* harmony default export */ var WorldMap = ({
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} id - "3 digit country code", see https://en.wikipedia.org/wiki/ISO_3166-1_numeric
     * @property {string} value - value for that country (as a float percent)
     * @property {string} name - country name
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: 'container-worldmap'
    },
    colorDomain: {
      type: Array,
      default: function _default() {
        return [2, 4, 6, 8, 10];
      }
    },
    title: {
      type: String
    }
  },
  mounted: function mounted() {
    // this.draw()
  },
  destroyed: function destroyed() {
    external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
  },

  watch: {
    theme: function theme(data) {
      this.draw();
    }
  },
  methods: {
    /**
    * @function draw - function that draws the graphic
    */
    draw: function draw() {
      external__d3_["selectAll"]('.' + this.propID + '_tooltip').remove();
      var selection_string = "#" + this.propID;
      if (external__jquery__default()(selection_string + " svg") != null) {
        external__jquery__default()(selection_string + " svg").remove();
      }

      var element = external__jquery__default()(selection_string);

      var margin = { top: 20, right: 20, bottom: 0, left: 50 },
          width = element.width() - margin.right - margin.left,
          height = element.height() - margin.top - margin.bottom;

      var color = external__d3_["scaleThreshold"]().domain(this.colorDomain).range(this.colors.slice().reverse());

      var projection = external__d3_["geoMercator"]().scale(120).translate([width / 2, height - 150]).precision(.1);

      var path = external__d3_["geoPath"]().projection(projection);

      var graticule = external__d3_["geoGraticule"]();

      var svg = external__d3_["select"](selection_string).append("svg").attr("width", width).attr("height", height).append("svg").call(external__d3_["zoom"]().scaleExtent([1, 10]).on("zoom", function () {
        svg.attr("transform", external__d3_["event"].transform);
      })).append("g");

      svg.append("path").datum(graticule).attr("class", "graticule").attr("d", path);

      var tooltip = external__d3_["select"]("body").append("div").attr("class", 'd3_visuals_tooltip ' + this.propID + '_tooltip').style("opacity", 0);

      var data = this.dataModel;

      external__d3_["json"]("https://unpkg.com/world-atlas@1.1.4/world/50m.json").then(function (world) {

        var valueById = {};
        data.forEach(function (d) {
          valueById[d.id] = +d.value;
        });

        var countries = external__topojson_client_["feature"](world, world.objects.countries).features,
            neighbors = external__topojson_client_["neighbors"](world.objects.countries.geometries);

        svg.selectAll(".country").data(countries).enter().insert("path", ".graticule").attr("class", "country").attr("d", path).style("fill", function (d, i) {
          return color(valueById[d.id] * 100);
        }).on("mouseover", function (d) {
          tooltip.transition().duration(100).style("opacity", 1);
          var selected = data.find(function (el) {
            return parseInt(el.id) === parseInt(d.id);
          });
          tooltip.html("Country: " + selected.name + "<br/>" + "Value: " + Math.round(selected.value * 100) + '%').style("left", external__d3_["event"].pageX + 5 + "px").style("top", external__d3_["event"].pageY - 28 + "px");
        }).on("mouseout", function (d) {
          tooltip.transition().duration(300).style("opacity", 0);
        });

        svg.insert("path", ".graticule").datum(external__topojson_client_["mesh"](world, world.objects.countries, function (a, b) {
          return a !== b;
        })).attr("class", "boundary").attr("d", path);
      });

      external__d3_["select"](self.frameElement).style("height", height + "px");
    },
    /**
    * @function resizeSVG - redraws the SVG on window resize
    */
    resizeSVG: function resizeSVG() {
      this.draw();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a8b0cbd6","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/d3/WorldMap.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeSVG}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var d3_WorldMap = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/d3/WorldMap.vue
function injectStyle (ssrContext) {
  __webpack_require__(169)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  WorldMap,
  d3_WorldMap,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_d3_WorldMap = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(117);
var enumBugKeys = __webpack_require__(99);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(97)('keys');
var uid = __webpack_require__(98);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(53);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsBarChart.js
var ChartjsBarChart = __webpack_require__(63);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsBarChartComp.vue

//
//
//
//
//
//
//
//
//
//
//
//






/** Bar Chart Chart.js component
* @module Chartjs Bar Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-bar
* :dataModel='barChartData'
* propID='exampleBarChart'
* ></chartjs-bar>
*
*/

/* harmony default export */ var ChartjsBarChartComp = ({
  components: {
    'chartjs-bar-chart': ChartjsBarChart["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {String} date - date string on x-axis ("5/15 - 6/14")
     * @property {Number} value - y-axis value
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-bar'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {}
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = { maintainAspectRatio: false };
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.barChartParser(this.dataModel, 'Bars', this.colors);
    }
  },
  created: function created() {
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.barChartParser(this.dataModel, 'Bars', this.colors);
  },

  methods: {
    setDarkOptions: function setDarkOptions() {
      this.options = new chartjsHelper["a" /* default */]().baseDarkOptions('bar');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-57b3b4ee","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsBarChartComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-bar-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsBarChartComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsBarChartComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(171)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsBarChartComp,
  Chartjs_ChartjsBarChartComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsBarChartComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Bar Chart.js Base
* @module BaseChart.jsBar
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["a" /* Bar */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsBarLineMixed.js
var ChartjsBarLineMixed = __webpack_require__(65);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsBarLineComp.vue

//
//
//
//
//
//
//
//
//
//
//
//






/** BarLine Chart Chart.js component
* @module Chartjs BarLine Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-barline
* :dataModel='barLineData'
* propID='exampleBarLineChart'
* ></chartjs-barline>
*
*/

/* harmony default export */ var ChartjsBarLineComp = ({
  components: {
    'chartjs-bar-line': ChartjsBarLineMixed["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {String} date - date string on x-axis
     * @property {Number} value - y-axis value
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-barline'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {}
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = { maintainAspectRatio: false };
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.barLineParser(this.dataModel, this.colors);
    }
  },
  created: function created() {
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.barLineParser(this.dataModel, this.colors);
  },

  methods: {
    setDarkOptions: function setDarkOptions() {
      this.options = new chartjsHelper["a" /* default */]().baseDarkOptions('barline');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4b613918","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsBarLineComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-bar-line',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsBarLineComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsBarLineComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsBarLineComp,
  Chartjs_ChartjsBarLineComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsBarLineComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** BarLine Chart.js Base
* @module BaseChart.jsBarLine
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["a" /* Bar */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(61);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsBubbleChart.js
var ChartjsBubbleChart = __webpack_require__(67);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsBubbleComp.vue


//
//
//
//
//
//
//
//
//
//
//
//






/** Bubble Chart Chart.js component
* @module Chartjs Bubble Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-bubble
* :dataModel='bubbleData'
* propID='exampleBubbleChart'
* ></chartjs-bubble>
*
*/
/* harmony default export */ var ChartjsBubbleComp = ({
  components: {
    'chartjs-bubble-chart': ChartjsBubbleChart["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} x - x-axis value
     * @property {Number} y - y-axis value
     * @property {Number} value - value of datapoint (determines the diameter of the bubble)
     * @property {String} label - label for datapoint
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-bubble'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {},
      maxBubY: 0,
      maxBubX: 0
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.setOptions();
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.bubbleChartParser(this.dataModel.slice(), this.colors);
    }
  },
  created: function created() {
    this.setOptions();
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.bubbleChartParser(this.dataModel.slice(), this.colors);
  },

  methods: {
    setOptions: function setOptions() {
      var maxX = Math.max.apply(Math, toConsumableArray_default()(this.dataModel.map(function (item) {
        return item.x;
      })));
      var maxY = Math.max.apply(Math, toConsumableArray_default()(this.dataModel.map(function (item) {
        return item.y;
      })));
      this.maxBubX = maxX + maxX / 4;
      this.maxBubY = maxY + maxY / 4;
      var options = new chartjsHelper["a" /* default */]().scatterBubbleOptions(this.maxBubX, this.maxBubY);
      options.elements = {
        point: {
          radius: function radius(context) {
            var index = context.dataIndex;
            var data = context.dataset.data[index];
            var size = context.chart.width;
            var base = data.value / 100;
            return size / 10 * base;
          }
        }
      };
      this.options = options;
    },
    setDarkOptions: function setDarkOptions() {
      var options = new chartjsHelper["a" /* default */]().baseDarkOptions('bubble', this.maxBubX, this.maxBubY);
      options.elements = {
        point: {
          radius: function radius(context) {
            var index = context.dataIndex;
            var data = context.dataset.data[index];
            var size = context.chart.width;
            var base = data.value / 100;
            return size / 10 * base;
          },
          borderColor: 'lightgrey'
        }
      };
      this.options = options;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4c70e6ca","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsBubbleComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-bubble-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsBubbleComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsBubbleComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(174)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsBubbleComp,
  Chartjs_ChartjsBubbleComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsBubbleComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Bubble Chart.js Base
* @module BaseChart.jsBubble
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["b" /* Bubble */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsLineChart.js
var ChartjsLineChart = __webpack_require__(69);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsLineChartComp.vue

//
//
//
//
//
//
//
//
//
//
//
//






/** Line Chart Chart.js component
* @module Chartjs Line Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-line
* :dataModel='lineChartData'
* propID='exampleLineChart'
* ></chartjs-line>
*
*/
/* harmony default export */ var ChartjsLineChartComp = ({
  components: {
    'chartjs-line-chart': ChartjsLineChart["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {String} date - date string on x-axis
     * @property {Number} value - y-axis value
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-line'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {}
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = { maintainAspectRatio: false };
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.lineChartParser(this.dataModel, 'Line', this.colors.slice(2, 6), false);
    }
  },
  created: function created() {
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.lineChartParser(this.dataModel, 'Line', this.colors.slice(2, 6), false);
  },

  methods: {
    setDarkOptions: function setDarkOptions() {
      this.options = new chartjsHelper["a" /* default */]().baseDarkOptions('line');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-278e7eb4","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsLineChartComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-line-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsLineChartComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsLineChartComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(175)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsLineChartComp,
  Chartjs_ChartjsLineChartComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsLineChartComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Line Chart.js Base
* @module BaseChart.jsLine
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["c" /* Line */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    options: {
      type: Object
    }
  },
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  },
  methods: {
    // Update function tell chart it has new data and needs to be updated
    // Calls the chart instance's update function
    update: function update() {
      this.$data._chart.update();
    }
  }
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsPieChart.js
var ChartjsPieChart = __webpack_require__(71);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsPieComp.vue

//
//
//
//
//
//
//
//
//
//
//
//






/** Pie Chart Chart.js component
* @module Chartjs Pie Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-pie
* :dataModel='pieChartData'
* propID='examplePieChart'
* ></chartjs-pie>
*
*/
/* harmony default export */ var ChartjsPieComp = ({
  components: {
    'chartjs-pie-chart': ChartjsPieChart["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} value - value of datapoint
     * @property {String} label - label for datapoint
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-pie'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {}
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = { maintainAspectRatio: false };
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.polarChartParser(this.dataModel, this.colors);
    }
  },
  created: function created() {
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.polarChartParser(this.dataModel, this.colors);
  },

  methods: {
    setDarkOptions: function setDarkOptions() {
      this.options = new chartjsHelper["a" /* default */]().baseDarkOptions('pie');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-61bd3f5f","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsPieComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-pie-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsPieComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsPieComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(176)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsPieComp,
  Chartjs_ChartjsPieComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsPieComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Pie Chart.js Base
* @module BaseChart.jsPie
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/
/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["d" /* Pie */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsPolarArea.js
var ChartjsPolarArea = __webpack_require__(73);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsPolarComp.vue

//
//
//
//
//
//
//
//
//
//
//
//






/** Polar Area Chart Chart.js component
* @module Chartjs Polar Area Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-polar
* :dataModel='polarChartData'
* propID='examplePolarChart'
* ></chartjs-polar>
*
*/
/* harmony default export */ var ChartjsPolarComp = ({
  components: {
    'chartjs-polar-chart': ChartjsPolarArea["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} value - value of datapoint
     * @property {String} label - label for datapoint
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-polar'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {}
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = { maintainAspectRatio: false };
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.polarChartParser(this.dataModel, this.colors);
    }
  },
  created: function created() {
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.polarChartParser(this.dataModel, this.colors);
  },

  methods: {
    setDarkOptions: function setDarkOptions() {
      this.options = new chartjsHelper["a" /* default */]().baseDarkOptions('polar');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3828fa6e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsPolarComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-polar-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsPolarComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsPolarComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(177)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsPolarComp,
  Chartjs_ChartjsPolarComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsPolarComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Polar Area Chart.js Base
* @module BaseChart.jsPolarArea
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["e" /* PolarArea */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsRadarChart.js
var ChartjsRadarChart = __webpack_require__(75);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsRadarComp.vue

//
//
//
//
//
//
//
//
//
//
//
//






/** Radar Chart Chart.js component
* @module Chartjs Radar Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-radar
* :dataModel='radarChartData'
* propID='exampleRadarChart'
* ></chartjs-radar>
*
*/
/* harmony default export */ var ChartjsRadarComp = ({
  components: {
    'chartjs-radar-chart': ChartjsRadarChart["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} x - x-axis value
     * @property {Number} y - y-axis value
     * @property {String} label - label for datapoint
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-radar'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {}
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.options = { maintainAspectRatio: false };
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.radarChartParser(this.dataModel, this.colors);
    }
  },
  created: function created() {
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.radarChartParser(this.dataModel, this.colors);
  },

  methods: {
    setDarkOptions: function setDarkOptions() {
      this.options = new chartjsHelper["a" /* default */]().baseDarkOptions('radar');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-33d7845a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsRadarComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-radar-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsRadarComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsRadarComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(178)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsRadarComp,
  Chartjs_ChartjsRadarComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsRadarComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Radar Chart.js Base
* @module BaseChart.jsRadar
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["f" /* Radar */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(61);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/base/ChartjsScatterChart.js
var ChartjsScatterChart = __webpack_require__(77);

// EXTERNAL MODULE: ./src/common/chartjsHelper.js
var chartjsHelper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartjs/ChartjsScatterComp.vue


//
//
//
//
//
//
//
//
//
//
//
//






/** Scatter Plot Chart.js component
* @module Chartjs Scatter Plot
*
* @param {Array} dataModel - the dataModel for the component
* @param {string} propID - the ID for the component
*
* @example
* usage on a page:
* <chartjs-scatter
* :dataModel='scatterPlotData'
* propID='exampleScatterPlot'
* ></chartjs-scatter>
*
*/
/* harmony default export */ var ChartjsScatterComp = ({
  components: {
    'chartjs-scatter-chart': ChartjsScatterChart["default"],
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} value - value for the datapoint
     * @property {String} label - label for datapoint
     */
    dataModel: {
      type: Array,
      required: true
    },
    propID: {
      type: String,
      default: 'chartjs-scatter'
    },
    title: {
      type: String
    }
  },
  data: function data() {
    return {
      options: { maintainAspectRatio: false },
      chartData: {},
      maxScatterY: 0,
      maxScatterX: 0
    };
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  watch: {
    displayTheme: function displayTheme() {
      this.displayTheme === 'dark' ? this.setDarkOptions() : this.setOptions();
    },
    colors: function colors() {
      var dataFormatter = new chartjsHelper["a" /* default */]();
      this.chartData = dataFormatter.scatterParser(this.dataModel, this.colors);
    }
  },
  created: function created() {
    this.setOptions();
    this.displayTheme === 'dark' ? this.setDarkOptions() : null;
    var dataFormatter = new chartjsHelper["a" /* default */]();
    this.chartData = dataFormatter.scatterParser(this.dataModel, this.colors);
  },

  methods: {
    setOptions: function setOptions() {
      var maxX = Math.max.apply(Math, toConsumableArray_default()(this.dataModel.map(function (item) {
        return item.x;
      })));
      var maxY = Math.max.apply(Math, toConsumableArray_default()(this.dataModel.map(function (item) {
        return item.y;
      })));
      this.maxScatterX = maxX + maxX / 4;
      this.maxScatterY = maxY + maxY / 4;
      this.options = new chartjsHelper["a" /* default */]().scatterBubbleOptions(this.maxScatterX, this.maxScatterY);
    },
    setDarkOptions: function setDarkOptions() {
      var options = new chartjsHelper["a" /* default */]().baseDarkOptions('scatter', this.maxScatterX, this.maxScatterY);
      options.elements = { point: { borderColor: 'lightgrey' } };
      this.options = options;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2007e759","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartjs/ChartjsScatterComp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"100%","width":"100%","position":"relative"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartjs-scatter-chart',{attrs:{"chart-data":_vm.chartData,"options":_vm.options,"chart-id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartjs_ChartjsScatterComp = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartjs/ChartjsScatterComp.vue
function injectStyle (ssrContext) {
  __webpack_require__(179)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartjsScatterComp,
  Chartjs_ChartjsScatterComp,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartjs_ChartjsScatterComp = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(13);


/** Scatter Chart.js Base
* @module BaseChart.jsScatter
*
* @param {Array} chartData - the data for the chart
* @param {Object} options - the options that change based on theming
*/

/* harmony default export */ __webpack_exports__["default"] = ({
  extends: __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["g" /* Scatter */],
  // Use the mixin to make chart reactive
  // This will create the chartData prop and will attach a watcher to it and will update when new data is passed
  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["h" /* mixins */].reactiveProp],
  props: ['chartData', 'options'],
  data: function data() {
    return {
      internalOptions: {}
    };
  },
  mounted: function mounted() {
    this.chartData && this.options ? this.renderChart(this.chartData, this.options) : null;
    this.internalOptions = this.options;
  },

  watch: {
    options: function options(newOptions) {
      if (this.internalOptions !== newOptions) {
        this._data._chart.destroy();
        this.renderChart(this.chartData, newOptions);
        this.internalOptions = newOptions;
      }
    }
  }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue-chartist/index.js
var vue_chartist = __webpack_require__(79);
var vue_chartist_default = /*#__PURE__*/__webpack_require__.n(vue_chartist);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./src/common/chartistHelper.js
var chartistHelper = __webpack_require__(80);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartist/ChartistBarChart.vue
//
//
//
//
//
//
//
//
//
//
//
//
//






/** Bar Chart Chartist component
* @module Chartist Bar Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
* @param {Object} options - an object containing options for configuring the chart
*
* @example
* usage on a page:
* <chartist-bar-chart
*  :dataModel='barChartData'
* ></chartist-bar-chart>
*
*/

/* harmony default export */ var ChartistBarChart = ({
  components: {
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {String} date - date string on x-axis ("5/15 - 6/14")
     * @property {Number} value - y-axis value
     */
    dataModel: {
      type: Array
    },
    propID: {
      type: String,
      default: 'chartist-bar-chart'
    },
    title: {
      type: String
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          // Options for X-Axis
          axisX: {
            // The offset of the labels to the chart area
            offset: 30,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'end',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label
            labelInterpolationFnc: function labelInterpolationFnc(value, index, labels) {
              return value;
            },
            // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
            type: undefined
          },
          // Options for Y-Axis
          axisY: {
            // The offset of the labels to the chart area
            offset: 40,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'start',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label

            // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
            type: undefined,
            // This value specifies the minimum height in pixel of the scale steps
            scaleMinSpace: 20,
            // Use only integer values (whole numbers) for the scale steps
            onlyInteger: false
          },
          // Specify the distance in pixel of bars in a group
          seriesBarDistance: 15,
          // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
          stackBars: false,
          // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
          // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
          stackMode: 'accumulate',
          // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
          horizontalBars: false,
          // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
          distributeSeries: false,
          // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
          reverseData: false,
          // If the bar chart should add a background fill to the .ct-grids group.
          showGridBackground: false,
          // Override the class names that get used to generate the SVG structure of the chart
          classNames: {
            chart: 'ct-chart-bar',
            horizontalBars: 'ct-horizontal-bars',
            label: 'ct-label',
            labelGroup: 'ct-labels',
            series: 'ct-series',
            bar: 'ct-bar',
            grid: 'ct-grid',
            gridGroup: 'ct-grids',
            gridBackground: 'ct-grid-background',
            vertical: 'ct-vertical',
            horizontal: 'ct-horizontal',
            start: 'ct-start',
            end: 'ct-end'
          }
        };
      }
    }
  },
  computed: {
    chartData: function chartData() {
      return new chartistHelper["a" /* default */]().barChartParser(this.dataModel);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-23122cd2","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartist/ChartistBarChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartist',{staticStyle:{"height":"100%"},attrs:{"type":"Bar","data":_vm.chartData,"options":_vm.options,"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartist_ChartistBarChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartist/ChartistBarChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(181)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartistBarChart,
  Chartist_ChartistBarChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartist_ChartistBarChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaultOptions = { messageNoData: '', classNoData: 'ct-nodata' };
  options = Object.assign({}, defaultOptions, options);

  Vue.chartist = __webpack_require__(103);
  Vue.prototype.$chartist = __webpack_require__(103);

  Vue.component('chartist', {
    render: function render(h) {
      return h('div', {
        ref: 'chart',
        'class': [this.ratio, _defineProperty({}, this.classNoData, this.noData)]
      }, this.message);
    },
    mounted: function mounted() {
      this.draw();
    },

    props: {
      ratio: { type: String },
      data: { type: Object },
      options: { type: Object },
      type: { type: String, required: true, validator: function validator(val) {
          return val === 'Pie' || val === 'Line' || val === 'Bar';
        }
      },
      eventHandlers: { type: Array },
      responsiveOptions: { type: Array }
    },
    data: function data() {
      return {
        chart: null,
        error: { onError: false, message: '' },
        noData: false,
        message: '',
        classNoData: options.classNoData
      };
    },

    methods: {
      clear: function clear() {
        this.noData = false; // remove class no data
        this.message = ''; // remove message no data
        if (this.error.onError) {
          this.error = { onError: false, message: '' };
        } // clear error
      },
      draw: function draw() {
        if (this.haveNoData()) {
          return this.setNoData();
        }
        this.clear();
        this.chart = new this.$chartist[this.type](this.$refs.chart, this.data, this.options, this.responsiveOptions);
        this.setEventHandlers();
      },
      haveNoData: function haveNoData() {
        return !this.data || !this.data.series || this.data.series.length < 1 || this.type !== 'Pie' && !this.options.distributeSeries && (this.data.labels.length < 1 || this.data.series.every(function (serie) {
          if (Array.isArray(serie)) {
            return !serie.length;
          }
          return !serie.data.length;
        }));
      },
      redraw: function redraw(newValue, oldValue) {
        if (this.error.onError) {
          return this.draw();
        } else if (this.haveNoData()) {
          return this.setNoData();
        }
        this.clear();
        this.chart.update(this.data, this.options);
      },
      resetEventHandlers: function resetEventHandlers(eventHandlers, oldEventHanlers) {
        if (!this.chart) {
          return;
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = oldEventHanlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            this.chart.off(item.event, item.fn);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = eventHandlers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _item = _step2.value;

            this.chart.on(_item.event, _item.fn);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      },
      setEventHandlers: function setEventHandlers() {
        if (this.eventHandlers) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.eventHandlers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var item = _step3.value;

              this.chart.on(item.event, item.fn);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      },
      setNoData: function setNoData() {
        this.error = { onError: true, message: options.messageNoData };
        this.noData = true;
        this.message = this.error.message;
      }
    },
    watch: {
      'ratio': 'redraw',
      'options': 'redraw',
      'data': { handler: 'redraw', deep: true },
      'type': 'draw',
      'eventHandlers': 'resetEventHandlers'
    }
  });
};


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var ChartistHelper = function () {
  function ChartistHelper() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ChartistHelper);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ChartistHelper, [{
    key: "barChartParser",
    value: function barChartParser(data) {
      var labels = [];
      var series = [];
      data.forEach(function (el) {
        labels.push(el.x);
        series.push(el.y);
      });
      return { labels: labels, series: [series] };
    }
  }, {
    key: "lineChartParser",
    value: function lineChartParser(data) {
      var labels = [];
      var series = [];
      data.forEach(function (el) {
        labels.push(el.date);
        series.push(el.value);
      });
      return { labels: labels, series: [series] };
    }
  }, {
    key: "pieChartParser",
    value: function pieChartParser(data) {
      var formattedData = [];
      var labels = [];
      var series = [];
      data.forEach(function (el) {
        labels.push(el.label);
        series.push(el.value);
      });
      return { labels: labels, series: series };
    }
  }]);

  return ChartistHelper;
}();

/* harmony default export */ __webpack_exports__["a"] = (ChartistHelper);

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue-chartist/index.js
var vue_chartist = __webpack_require__(79);
var vue_chartist_default = /*#__PURE__*/__webpack_require__.n(vue_chartist);

// EXTERNAL MODULE: ./src/common/chartistHelper.js
var chartistHelper = __webpack_require__(80);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartist/ChartistLineChart.vue
//
//
//
//
//
//
//
//
//
//
//
//
//






/** Line Chart Chartist component
* @module Chartist Line Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
* @param {Object} options - an object containing options for configuring the chart
*
* @example
* usage on a page:
* <chartist-line-chart
*  :dataModel='lineChartData'
* ></chartist-line-chart>
*
*/

/* harmony default export */ var ChartistLineChart = ({
  components: {
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {string} date - date string on x-axis
     * @property {string} value - y-axis value
     */
    dataModel: {
      type: Array
    },
    propID: {
      type: String,
      default: 'chartist-line-chart'
    },
    title: {
      type: String
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          // Options for X-Axis
          axisX: {
            // The offset of the labels to the chart area
            offset: 30,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'end',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label
            labelInterpolationFnc: function labelInterpolationFnc(value, index, labels) {
              return external__moment__default()(value, 'YYY-MM-DD').format('MMM DD');
            },
            // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
            type: vue_chartist_default.a.AutoScaleAxis
          },
          // Options for Y-Axis
          axisY: {
            // The offset of the labels to the chart area
            offset: 40,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'start',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label

            // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
            type: vue_chartist_default.a.AutoScaleAxis,
            // This value specifies the minimum height in pixel of the scale steps
            scaleMinSpace: 20,
            // Use only integer values (whole numbers) for the scale steps
            onlyInteger: false
          },
          // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
          width: undefined,
          // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
          height: undefined,
          // If the line should be drawn or not
          showLine: true,
          // If dots should be drawn or not
          showPoint: true,
          // If the line chart should draw an area
          showArea: false,
          // The base for the area chart that will be used to close the area shape (is normally 0)
          areaBase: 0,
          // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
          lineSmooth: true,
          // If the line chart should add a background fill to the .ct-grids group.
          showGridBackground: false,
          // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
          low: undefined,
          // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
          high: undefined,
          // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
          chartPadding: {
            top: 15,
            right: 15,
            bottom: 5,
            left: 10
          },
          // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
          fullWidth: false,
          // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
          reverseData: false,
          // Override the class names that get used to generate the SVG structure of the chart
          classNames: {
            chart: 'ct-chart-line',
            label: 'ct-label',
            labelGroup: 'ct-labels',
            series: 'ct-series',
            line: 'ct-line',
            point: 'ct-point',
            area: 'ct-area',
            grid: 'ct-grid',
            gridGroup: 'ct-grids',
            gridBackground: 'ct-grid-background',
            vertical: 'ct-vertical',
            horizontal: 'ct-horizontal',
            start: 'ct-start',
            end: 'ct-end'
          }
        };
      }
    }
  },
  computed: {
    chartData: function chartData() {
      return new chartistHelper["a" /* default */]().lineChartParser(this.dataModel);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1756c968","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartist/ChartistLineChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartist',{staticStyle:{"height":"100%"},attrs:{"type":"Line","data":_vm.chartData,"options":_vm.options,"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartist_ChartistLineChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartist/ChartistLineChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(182)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartistLineChart,
  Chartist_ChartistLineChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartist_ChartistLineChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue-chartist/index.js
var vue_chartist = __webpack_require__(79);
var vue_chartist_default = /*#__PURE__*/__webpack_require__.n(vue_chartist);

// EXTERNAL MODULE: ./src/common/chartistHelper.js
var chartistHelper = __webpack_require__(80);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(8);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Chartist/ChartistPieChart.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/** Pie Chart Chartist component
* @module Chartist Pie Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
* @param {Object} options - an object containing options for configuring the chart
*
* @example
* usage on a page:
* <chartist-pie-chart
*  :dataModel='pieChartData'
* ></chartist-pie-chart>
*
*/

/* harmony default export */ var ChartistPieChart = ({
  components: {
    'panel-heading': PanelHeading["a" /* default */]
  },
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} value - value of datapoint
     * @property {String} label - label for datapoint
     */
    dataModel: {
      type: Array
    },
    propID: {
      type: String,
      default: 'chartist-pie-chart'
    },
    title: {
      type: String
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
          width: undefined,
          // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
          height: '100%',
          // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
          chartPadding: 5,
          // Override the class names that are used to generate the SVG structure of the chart
          classNames: {
            chartPie: 'ct-chart-pie',
            chartDonut: 'ct-chart-donut',
            series: 'ct-series',
            slicePie: 'ct-slice-pie',
            sliceDonut: 'ct-slice-donut',
            sliceDonutSolid: 'ct-slice-donut-solid',
            label: 'ct-label'
          },
          // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
          startAngle: 0,
          // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
          total: undefined,
          // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
          donut: false,
          // If specified the donut segments will be drawn as shapes instead of strokes.
          donutSolid: false,
          // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
          // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
          donutWidth: 60,
          // If a label should be shown or not
          showLabel: true,
          // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
          labelOffset: 0,
          // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
          labelPosition: 'inside',
          // An interpolation function for the label value
          labelInterpolationFnc: function labelInterpolationFnc(value, index, labels) {},
          // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
          labelDirection: 'neutral',
          // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
          reverseData: false,
          // If true empty values will be ignored to avoid drawing unncessary slices and labels
          ignoreEmptyValues: false
        };
      }
    },
    responsiveOptions: {
      type: Array,
      default: function _default() {
        return [['screen and (min-width: 640px)', {
          chartPadding: 30,
          labelOffset: 100,
          labelDirection: 'explode',
          labelInterpolationFnc: function labelInterpolationFnc(value, index) {
            return value;
          }
        }]];
      }
    }
  },
  computed: {
    chartData: function chartData() {
      return new chartistHelper["a" /* default */]().pieChartParser(this.dataModel);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-fc39b648","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Chartist/ChartistPieChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('chartist',{staticStyle:{"height":"100%"},attrs:{"type":"Pie","data":_vm.chartData,"options":_vm.options,"responsiveOptions":_vm.responsiveOptions,"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Chartist_ChartistPieChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Chartist/ChartistPieChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(183)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartistPieChart,
  Chartist_ChartistPieChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Chartist_ChartistPieChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/common/plotlyHelper.js
var plotlyHelper = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlyAreaChart.vue

//
//
//
//
//
//
//
//







/** Area Chart Plotly component
* @module Plotly Area Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-areachart
*  :dataModel="areaChartData"
* ></plotly-areachart>
*
*/

/* harmony default export */ var PlotlyAreaChart = ({
  props: {
    /**
     * The data for this consists of an x key, which is the x-axis value for that point, and any key after that is a line to be drawn on the graph with its value as the data for that line (ex. 'myLine': 4) it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} x - x-axis label for that point
     * @property {Number} nameOfYourLine - key will be used as the line's name, number value is the value at that x
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-plotlyareachart"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)
  },
  mounted: function mounted() {
    this.drawAreaChart();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawAreaChart();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var update = {
        'line.color': this.colors
      };
      external__plotly_js__default.a.restyle(this.propID, update);
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawAreaChart: function drawAreaChart() {
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Area Chart',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };
      var data = new plotlyHelper["a" /* default */]().areaChartParser(this.dataModel, this.colors);

      //draw plot
      external__plotly_js__default.a.plot(this.propID, data, layout, { displayModeBar: false });
      this.setDisplayTheme();
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d2bd4654","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlyAreaChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlyAreaChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlyAreaChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(185)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlyAreaChart,
  Plotly_PlotlyAreaChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlyAreaChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/common/plotlyHelper.js
var plotlyHelper = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlyBarGraph.vue

//
//
//
//
//
//
//
//
//







/** Bar Chart Plotly component
* @module Plotly Bar Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-barchart
*  :dataModel="barChartData"
* ></plotly-barchart>
*
*/

/* harmony default export */ var PlotlyBarGraph = ({
  props: {
    /**
     * The data for this consists of an x key, which is the x-axis value for that point, and any key after that is a bar to be drawn on the graph with its value as the data for that bar (ex. 'myBar': 4) it currently contains:
     * @typedef {Array} dataModel
     * @property {Number} x - x-axis label for that point
     * @property {Number} nameOfYourBar - key will be used as the bar's name, number value is the value at that x
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-barchart"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)

  },
  mounted: function mounted() {
    this.drawBarPlot();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawBarPlot();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var update = {
        'marker.color': this.colors
      };
      external__plotly_js__default.a.restyle(this.propID, update);
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawBarPlot: function drawBarPlot() {
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        hoverinfo: 'none',
        title: 'Example Bar Chart',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        bargap: 0.05
      };

      var plotlyBarGraph = document.getElementById(this.propID);
      var data = new plotlyHelper["a" /* default */]().barChartParser(this.dataModel, this.colors);

      //draw plot
      external__plotly_js__default.a.plot(plotlyBarGraph, data, layout, {
        barmode: 'group',
        margin: { t: 0, l: 0, b: 0, r: 0 },
        displayModeBar: false
      });
      this.setDisplayTheme();
      //make custom tooltip
      var localThis = this;
      plotlyBarGraph.on('plotly_hover', function (eventData) {
        var infotext = eventData.points[0].x + '<br/>';
        eventData.points.forEach(function (d) {
          infotext += d.data.name + ': ' + d.y + '<br/>';
        });

        var customTooltip = document.getElementById(localThis.propID + 'tooltip');
        customTooltip.innerHTML = infotext;
        customTooltip.style.left = +eventData.points[0].xaxis.d2p(eventData.points[0].x) + eventData.points[0].xaxis._offset + 'px';
        customTooltip.style.top = +eventData.points[0].yaxis.d2p(eventData.points[0].y) + eventData.points[0].yaxis._offset + 'px';
        customTooltip.style.opacity = 1;
      }).on('plotly_unhover', function (data) {
        document.getElementById(localThis.propID + 'tooltip').style.opacity = 0;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7328e298","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlyBarGraph.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}}),_vm._v(" "),_c('div',{staticClass:"d3_visuals_tooltip",staticStyle:{"position":"absolute","z-index":"1000","opacity":"0"},attrs:{"id":_vm.propID + 'tooltip'}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlyBarGraph = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlyBarGraph.vue
function injectStyle (ssrContext) {
  __webpack_require__(186)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlyBarGraph,
  Plotly_PlotlyBarGraph,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlyBarGraph = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/common/plotlyHelper.js
var plotlyHelper = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlyBubbleChart.vue

//
//
//
//
//
//
//
//
//







/** Bubble Chart Plotly component
* @module Plotly Bubble Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-bubblechart
*  :dataModel="bubbleChartData"
* ></plotly-bubblechart>
*
*/

/* harmony default export */ var PlotlyBubbleChart = ({
  props: {
    /**
     * The data for this component can be customized; it currently contains:
     * @typedef {Array} dataModel
     * @property {Array} x - x value for that bubble
     * @property {Array} y - y value for that bubble
     * @property {Number} value - number value that determines the size of bubble
     * @property {String} label - label for that bubble, which will appear in the tooltip
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-plotlybubblechart"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)
  },
  mounted: function mounted() {
    this.drawBubbleChart();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawBubbleChart();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var update = {
        'marker.color': [this.colors]
      };
      external__plotly_js__default.a.restyle(this.propID, update);
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawBubbleChart: function drawBubbleChart() {
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Bubble Chart',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        },
        bargap: 0.05
      };

      var plotlyBubbleChart = document.getElementById(this.propID);
      // make a copy of the datamodel and then add set the colors of the chart based on the current color theme
      var data = new plotlyHelper["a" /* default */]().bubbleChartParser(this.dataModel, this.colors);
      //draw plot
      external__plotly_js__default.a.newPlot(plotlyBubbleChart, data, layout, { displayModeBar: false });
      this.setDisplayTheme();
      //make custom tooltip
      var localThis = this;
      plotlyBubbleChart.on('plotly_hover', function (eventData) {
        var infotext = eventData.points[0].text + '<br/>' + eventData.points[0].x + ', ' + eventData.points[0].y;

        var customTooltip = document.getElementById(localThis.propID + 'tooltip');
        // debugger
        customTooltip.innerHTML = infotext;
        customTooltip.style.left = +eventData.points[0].xaxis.d2p(eventData.points[0].x) + eventData.points[0].xaxis._offset + 'px';
        customTooltip.style.top = +eventData.points[0].yaxis.d2p(eventData.points[0].y) + eventData.points[0].yaxis._offset + 550 + 'px';
        customTooltip.style.opacity = 1;
      }).on('plotly_unhover', function (data) {
        document.getElementById(localThis.propID + 'tooltip').style.opacity = 0;
      });
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ebf094e6","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlyBubbleChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}}),_vm._v(" "),_c('div',{staticClass:"d3_visuals_tooltip",staticStyle:{"position":"absolute","z-index":"1000","opacity":"0"},attrs:{"id":_vm.propID + 'tooltip'}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlyBubbleChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlyBubbleChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(187)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlyBubbleChart,
  Plotly_PlotlyBubbleChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlyBubbleChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/common/plotlyHelper.js
var plotlyHelper = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlyDonutChart.vue

//
//
//
//
//
//
//
//







/** Donut Chart Plotly component
* @module Plotly Donut Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-donutchart
*  :dataModel="donutChartData"
* ></plotly-donutchart>
*
*/

/* harmony default export */ var PlotlyDonutChart = ({
  props: {
    /**
     * The data for this component consists of chart, value, and label keys. If you would like to draw multiple donuts in one chart specify different chart values and the data points will be grouped accordingly.
     * @typedef {Array} dataModel
     * @property {Array} chart - the name of the chart this data belongs to
     * @property {Number} value - number value that for the given label
     * @property {String} label - label for the section of the donut, corresponds to the value
     */
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-plotlydonutchart"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)
  },
  mounted: function mounted() {
    this.drawDonutChart();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawDonutChart();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var update = {
        'marker.colors': [this.colors]
      };
      external__plotly_js__default.a.restyle(this.propID, update);
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawDonutChart: function drawDonutChart() {
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Donut Chart',
        annotations: [{
          font: {
            size: 20
          },
          showarrow: false,
          text: 'GHG',
          x: 0.17,
          y: 0.5
        }, {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'CO2',
          x: 0.82,
          y: 0.5
        }],
        // height: 600,
        // width: 600,
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };
      var data = new plotlyHelper["a" /* default */]().donutChartParser(this.dataModel, this.colors);

      //draw plot
      external__plotly_js__default.a.newPlot(this.propID, data, layout, { displayModeBar: false });
      this.setDisplayTheme();
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-56e450d1","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlyDonutChart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlyDonutChart = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlyDonutChart.vue
function injectStyle (ssrContext) {
  __webpack_require__(188)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlyDonutChart,
  Plotly_PlotlyDonutChart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlyDonutChart = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__(27);
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlyHeatMap.vue


//
//
//
//
//
//
//
//






/** Heat Map Plotly component
* @module Plotly Heat Map
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-heatmap
*  :dataModel="heatMapData"
* ></plotly-heatmap>
*
*/

/* harmony default export */ var PlotlyHeatMap = ({
  props: {
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-plotlyheatmap"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)
  },
  mounted: function mounted() {
    this.drawHeatMap();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawHeatMap();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var _this = this;

      var graph = document.getElementById(this.propID);
      var data = JSON.parse(stringify_default()(graph.data));
      var colorscale = data[0].colorscale.map(function (el, i) {
        _this.colors[i] ? el[1] = _this.colors[i] : null;
        return el;
      });
      external__plotly_js__default.a.restyle(this.propID, { colorscale: [colorscale] });
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawHeatMap: function drawHeatMap() {
      var _this2 = this;

      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Heat Map',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };
      var data = JSON.parse(stringify_default()(this.dataModel.slice()));
      data[0].colorscale = data[0].colorscale.map(function (el, i) {
        _this2.colors[i] ? el[1] = _this2.colors[i] : null;
        return el;
      });
      //draw plot
      external__plotly_js__default.a.plot(this.propID, data, layout, { displayModeBar: false });
      this.setDisplayTheme();
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-07f18e70","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlyHeatMap.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlyHeatMap = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlyHeatMap.vue
function injectStyle (ssrContext) {
  __webpack_require__(189)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlyHeatMap,
  Plotly_PlotlyHeatMap,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlyHeatMap = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/common/plotlyHelper.js
var plotlyHelper = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlyScatterplot.vue

//
//
//
//
//
//
//
//
//







/** Scatterplot Chart Plotly component
* @module Plotly Scatterplot Chart
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-scatterplot
*  :dataModel="scatterplotData"
* ></plotly-scatterplot>
*
*/

/* harmony default export */ var PlotlyScatterplot = ({
  /**
   * The data for this component can be customized; it currently contains:
   * @typedef {Array} dataModel
   * @property {String} category - the category value alllows you to show data from multiple sources on the same graph (ex. 'office1', 'office2'), this makes it easy to filter the graph
   * @property {Number} x - x value for that datapoint
   * @property {Number} y - y value for that datapoint
   * @property {String} label - label for that datapoint, appears by the point on the graph, will be grouped under the category specified
   */
  props: {
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-plotlyscatterplot"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)
  },
  mounted: function mounted() {
    this.drawScatterplot();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawScatterplot();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var update = {
        'marker.color': this.colors
      };
      external__plotly_js__default.a.restyle(this.propID, update);
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawScatterplot: function drawScatterplot() {
      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Scatterplot',
        xaxis: {
          range: [0.75, 5.25]
        },
        yaxis: {
          range: [0, 8]
        },
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      };

      var plotlyScatterplot = document.getElementById(this.propID);
      var data = new plotlyHelper["a" /* default */]().scatterChartParser(this.dataModel, this.colors);

      //draw plot
      external__plotly_js__default.a.newPlot(this.propID, data, layout, { displayModeBar: false });
      this.setDisplayTheme();
      //make custom tooltip
      var localThis = this;
      plotlyScatterplot.on('plotly_hover', function (eventData) {
        var infotext = eventData.points[0].x + '<br/>';
        eventData.points.forEach(function (d) {
          infotext += d.data.name + ': ' + d.y + '<br/>';
        });

        var customTooltip = document.getElementById(localThis.propID + 'tooltip');
        customTooltip.innerHTML = infotext;
        customTooltip.style.left = +eventData.points[0].xaxis.d2p(eventData.points[0].x) + eventData.points[0].xaxis._offset + 'px';
        customTooltip.style.top = +eventData.points[0].yaxis.d2p(eventData.points[0].y) + eventData.points[0].yaxis._offset + 'px';
        customTooltip.style.opacity = 1;
      }).on('plotly_unhover', function (data) {
        document.getElementById(localThis.propID + 'tooltip').style.opacity = 0;
      });
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-64f44142","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlyScatterplot.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}}),_vm._v(" "),_c('div',{staticClass:"d3_visuals_tooltip",staticStyle:{"position":"absolute","z-index":"1000","opacity":"0"},attrs:{"id":_vm.propID + 'tooltip'}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlyScatterplot = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlyScatterplot.vue
function injectStyle (ssrContext) {
  __webpack_require__(190)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlyScatterplot,
  Plotly_PlotlyScatterplot,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlyScatterplot = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__(5);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__(27);
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: external "plotly.js"
var external__plotly_js_ = __webpack_require__(16);
var external__plotly_js__default = /*#__PURE__*/__webpack_require__.n(external__plotly_js_);

// EXTERNAL MODULE: external "jquery"
var external__jquery_ = __webpack_require__(3);
var external__jquery__default = /*#__PURE__*/__webpack_require__.n(external__jquery_);

// EXTERNAL MODULE: external "vue"
var external__vue_ = __webpack_require__(7);
var external__vue__default = /*#__PURE__*/__webpack_require__.n(external__vue_);

// EXTERNAL MODULE: ./node_modules/vue-resize/dist/vue-resize.esm.js
var vue_resize_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/universal/PanelHeading.vue + 2 modules
var PanelHeading = __webpack_require__(1);

// EXTERNAL MODULE: ./src/common/themeHelper.js
var themeHelper = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/visualizations/Plotly/PlotlySurfacePlot.vue


//
//
//
//
//
//
//
//








/** Surface Plot Plotly component
* @module Plotly Surface Plot
*
* @param {Array} dataModel - the dataModel for the component
* @param {String} propID - the ID for the component
*
* @example
* usage on a page:
* <plotly-surfaceplot
*  :dataModel="surfacePlotData"
* ></plotly-surfaceplot>
*
*/

/* harmony default export */ var PlotlySurfacePlot = ({
  props: {
    dataModel: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    propID: {
      type: String,
      default: "container-plotlysurfaceplot"
    },
    title: {
      type: String
    }
  },
  components: {
    'resize-observer': vue_resize_esm["a" /* ResizeObserver */],
    'panel-heading': PanelHeading["a" /* default */]
  },
  data: function data() {
    return {
      update: false,
      internalData: []
    };
  },
  created: function created() {
    // console.log(this.dataModel)
  },
  mounted: function mounted() {
    this.drawSurfacePlot();
    this.update = true;
  },
  watch: {
    dataModel: function dataModel(data) {
      if (this.internalData.length === 0) {
        this.update = false;
      } else {
        this.update = true;
      }
      this.internalData = data;
      this.drawSurfacePlot();
    },
    displayTheme: function displayTheme() {
      this.setDisplayTheme();
    },
    colors: function colors() {
      var _this = this;

      var graph = document.getElementById(this.propID);
      var data = JSON.parse(stringify_default()(graph.data));
      var colorscale = data[0].colorscale.map(function (el, i) {
        _this.colors[i] ? el[1] = _this.colors[i] : null;
        return el;
      });
      external__plotly_js__default.a.restyle(this.propID, { colorscale: [colorscale] });
    }
  },
  computed: extends_default()({}, themeHelper["a" /* default */]),
  methods: {
    resizeChart: function resizeChart() {
      external__plotly_js__default.a.Plots.resize(this.propID);
    },
    setDisplayTheme: function setDisplayTheme() {
      var fontColor;
      this.displayTheme === 'dark' ? fontColor = 'lightgrey' : fontColor = '#7f7f7f';
      var update = {
        'font.color': fontColor
      };
      external__plotly_js__default.a.relayout(this.propID, update);
    },
    drawSurfacePlot: function drawSurfacePlot() {
      var _this2 = this;

      //example styling
      var layout = {
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Example Zoomable 3D Surface Plot',
        autosize: true,
        font: {
          family: 'Courier New, monospace',
          size: 12,
          color: '#7f7f7f'
        }
      };
      var data = JSON.parse(stringify_default()(this.dataModel.slice()));
      data[0].colorscale = data[0].colorscale.map(function (el, i) {
        _this2.colors[i] ? el[1] = _this2.colors[i] : null;
        return el;
      });
      //draw plot
      external__plotly_js__default.a.newPlot(this.propID, data, layout, { displayModeBar: false });
      this.setDisplayTheme();
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-80c01458","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/visualizations/Plotly/PlotlySurfacePlot.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%","height":"100%"}},[(_vm.title)?_c('panel-heading',{attrs:{"headerText":_vm.title}}):_vm._e(),_vm._v(" "),_c('resize-observer',{on:{"notify":_vm.resizeChart}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.propID}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Plotly_PlotlySurfacePlot = (esExports);
// CONCATENATED MODULE: ./src/components/visualizations/Plotly/PlotlySurfacePlot.vue
function injectStyle (ssrContext) {
  __webpack_require__(191)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PlotlySurfacePlot,
  Plotly_PlotlySurfacePlot,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var visualizations_Plotly_PlotlySurfacePlot = __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./BarChart.vue": [
		28
	],
	"./BoxPlot.vue": [
		29
	],
	"./BubbleChart.vue": [
		30
	],
	"./BulletChart.vue": [
		31
	],
	"./Dendrogram.vue": [
		32
	],
	"./DifferenceChart.vue": [
		33
	],
	"./ForceDirectedGraph.vue": [
		34
	],
	"./GanttChart.vue": [
		35
	],
	"./HeatMap.vue": [
		36
	],
	"./Histogram.vue": [
		37
	],
	"./HorizonChart.vue": [
		38
	],
	"./LineChart.vue": [
		39
	],
	"./LineChartZoomable.vue": [
		40
	],
	"./LinePlot.vue": [
		41
	],
	"./PieChart.vue": [
		42
	],
	"./PunchCard.vue": [
		43
	],
	"./Scatterplot.vue": [
		46
	],
	"./StackedBarChart.vue": [
		47
	],
	"./StreamGraph.vue": [
		48
	],
	"./Sunburst.vue": [
		49
	],
	"./TwoLinePlot.vue": [
		50
	],
	"./USMap.vue": [
		51
	],
	"./WorldMap.vue": [
		52
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 90;
module.exports = webpackAsyncContext;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(110);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(56);
var document = __webpack_require__(18).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(94);
var defined = __webpack_require__(55);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(95);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(54);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(18);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 99 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(19).f;
var has = __webpack_require__(25);
var TAG = __webpack_require__(15)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = axios;

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = topojson-client;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = chartist;

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/mixins/formatTimeMixin.js
var formatTimeMixin = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/array/from.js
var from = __webpack_require__(53);
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// CONCATENATED MODULE: ./src/mixins/styleTogglerMixin.js

var styleTogglerMixin;

/* harmony default export */ var mixins_styleTogglerMixin = (styleTogglerMixin = {

	methods: {
		toggleDark: function toggleDark() {
			var current = from_default()(this.$root.$el.classList).filter(function (el) {
				return el.includes('theme--');
			});
			var classes = this.$root.$el.className.slice().split(' ').filter(function (el) {
				return !el.includes('-theme');
			});
			var opposite = 'theme--' + (current[0].split('--')[1] === 'light' ? 'dark' : 'light');
			this.$root.$el.className = this.$root.$el.className.replace(current, opposite);
			this.$store.commit('changeDisplay', opposite.split('--')[1]);
			if (current[0] === "theme--dark") {
				document.getElementById('logo').src = "/static/img/ep-logo-black.png";
			} else {
				document.getElementById('logo').src = "/static/img/ep-logo-yellow.png";
			}
		},
		chooseTheme: function chooseTheme(theme) {
			var newTheme = theme.toLowerCase() + '-theme';
			var classes = this.$root.$el.className.slice().split(' ').filter(function (el) {
				return !el.includes('-theme');
			});
			classes.push(newTheme);
			classes = classes.join(' ');
			this.$root.$el.className = classes;
			this.$store.commit('changeColor', newTheme.split('-')[0]);
			this.$store.commit('changeColorArray', this.themeColorArray(newTheme));
		},
		themeColorArray: function themeColorArray(theme) {
			var styleSheets = from_default()(document.getElementsByTagName("STYLE")).map(function (el) {
				return el.sheet.cssRules;
			}).filter(function (el) {
				return el.length;
			});
			var themeStyles;
			styleSheets.forEach(function (el) {
				var style = from_default()(el).filter(function (rule) {
					return rule.selectorText === '.' + theme;
				});
				style.length ? themeStyles = style[0].cssText : null;
			});
			var colors = themeStyles.split(': ').slice(1).map(function (hex) {
				return hex.slice(0, 7);
			});
			return colors;
		}
	}
});
// EXTERNAL MODULE: external "axios"
var external__axios_ = __webpack_require__(101);
var external__axios__default = /*#__PURE__*/__webpack_require__.n(external__axios_);

// CONCATENATED MODULE: ./src/plugins/auth.js


var auth = {
  install: function install(Vue, options) {
    var router = options.router,
        store = options.store,
        baseURL = options.baseURL;

    if (!store) {
      throw new Error("Please provide vuex store.");
    }
    if (!router) {
      throw new Error("Please provide vue router.");
    }
    router.beforeEach(function (to, from, next) {
      var path = to.path;
      if (store.state.authMod.authenticated === false || store.state.authMod.expiresSoon === false) {
        store.dispatch('checkAuth').then(function (auth) {
          if (!auth.authenticated && path !== '/' && path !== '/auth/login' && path !== '/auth/signup') {
            store.commit('isAuthenticated', false);
            next('/');
          } else if (auth.expiresSoon) {
            store.commit('expiresSoon', auth.expiresSoon);
            next();
          } else {
            next();
          }
        });
      } else {
        next();
      }
    });

    store.registerModule('authMod', {
      state: {
        authenticated: false,
        authMessage: '',
        expiresSoon: false
      },
      mutations: {
        authMessage: function authMessage(state, payload) {
          state.authMessage = payload;
        },
        isAuthenticated: function isAuthenticated(state, payload) {
          state.authenticated = payload;
        },
        expiresSoon: function expiresSoon(state, payload) {
          state.expiresSoon = payload;
        }
      },
      actions: {
        // login action for authentication
        login: function login(_ref, user) {
          var commit = _ref.commit;

          external__axios__default.a.post(baseURL + '/auth/login', {
            username: user.username,
            password: user.password
          }).then(function (res) {
            if (res.data.success) {
              commit('isAuthenticated', true);
              router.replace('/');
            }
            commit('authMessage', res.data.message);
            commit('expiresSoon', res.data.expiresSoon);
          });
        },
        signup: function signup(_ref2, user) {
          var commit = _ref2.commit;

          external__axios__default.a.post(baseURL + '/auth/signup', {
            username: user.username,
            password: user.password
          }).then(function (res) {
            if (res.data.success) {
              commit('isAuthenticated', true);
              router.replace('/');
            }
            commit('authMessage', res.data.message);
            commit('expiresSoon', res.data.expiresSoon);
          });
        },
        checkAuth: function checkAuth(_ref3) {
          var commit = _ref3.commit;

          return external__axios__default.a.get(baseURL + '/checkAuth').then(function (res) {
            commit('isAuthenticated', res.data.authenticated);
            return res.data;
          });
        },
        logout: function logout(_ref4) {
          var commit = _ref4.commit;

          external__axios__default.a.post(baseURL + '/auth/logout').then(function (res) {
            commit('isAuthenticated', res.data.authenticated);
          });
        }
      }
    });
  }
};
/* harmony default export */ var plugins_auth = (auth);
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(61);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(11);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__(27);
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// CONCATENATED MODULE: ./src/plugins/screenshare.js




var screensharePlugin = {
  install: function install(Vue, options) {
    // the createSendableComponents and getStyles functions are declared outside of the pulgin mixin
    // the developer or designer should not have to use these functions directly
    function createSendableComponents(components) {
      var _this = this;

      var toSend = components.map(function (child) {
        // if someone receives a dashboard all the components on the page will be actually be LoaderComponents
        // if they are LoaderComponents then we want to get the child of that component which is the actual chart
        child._name === '<LoaderComponent>' ? child = child.$children[0] : null;
        var childName = child._name.replace(/(<|>)/g, ''),
            filePath = void 0,
            props = void 0,
            returnObj = { chartName: childName },
            localThis = _this,
            height = child.$el.offsetHeight;

        // If it is a button then get hte inner text so that it can be added back to it in the loader component
        returnObj.class = child.$el.parentNode.className;
        returnObj.filePath = child.$options.__file;
        returnObj.inlineStyles = child.$el.style.cssText;
        returnObj.height = height;

        // deep clone props, cannot use Object.assign()
        var adjustProps = JSON.parse(stringify_default()(child.$props));
        returnObj.props = adjustProps;

        return returnObj;
      });
      return toSend;
    }

    function getStyles(component) {
      var currentWrapper = component.$el.className;
      // get all the styles applied to the current page and select out the one that has @support queries (ie it has the conditional css grid styling for this page)
      var style = from_default()(from_default()(document.getElementsByTagName("STYLE")).map(function (el) {
        return el.sheet.cssRules;
      })).filter(function (item) {
        return item[0] ? item[0].conditionText : null;
      }).filter(function (list) {
        return list[0].cssText.includes('.' + currentWrapper);
      });

      // map over the selected style objects (for both @supports queries) and take out all of its style rules
      style = from_default()(from_default()(style[0])).map(function (supports) {
        return supports.cssText;
      });
      return style;
    }

    function shareAll() {
      var realThis;
      this.$el.id === 'chart-sender' ? realThis = this.$parent : realThis = this;
      var sendable = { dataSource: realThis.currentData },
          toSend = createSendableComponents(realThis.$children.filter(function (comp) {
        return comp.$el.id !== 'chart-sender';
      }));
      // attach styles to the object being sent
      sendable.currentWrapper = realThis.$el.className;
      sendable.styles = getStyles(realThis);
      sendable.props = toSend;
      sendable.theme = realThis.$store.state.colorTheme || 'blue';
      sendable.displayTheme = realThis.$store.state.displayTheme;
      sendable.receiveChart = true;

      realThis.$socket.emit('sendCharts', stringify_default()(sendable));
    }

    function submit() {
      var realThis;
      this._name === '<ChartSender>' ? realThis = this.$parent : realThis = this;
      // If the dashboard was received all components are loader components. In order to get the correct shareableChart find the select and find the value of it's v-model
      var chartName = this.shareableChart,
          chartsToShare = realThis.$children.filter(function (item, index, arr) {
        return item._name === '<LoaderComponent>' ? item.$children[0]._name === '<' + chartName + '>' : item._name === '<' + chartName + '>';
      }),
          sendable = { dataSource: realThis.currentData };
      var toSend = createSendableComponents(chartsToShare);

      // attach styles to the object being sent
      sendable.currentWrapper = '';
      sendable.styles = [[''], ['']];
      sendable.props = toSend;
      sendable.theme = this.$store.state.colorTheme || 'blue';
      sendable.displayTheme = this.$store.state.displayTheme;
      sendable.receiveChart = true;
      this.$socket.emit('sendCharts', stringify_default()(sendable));
    }

    function charts() {
      var realThis;
      this._name === '<ChartSender>' ? realThis = this.$parent : realThis = this;
      var initialNames = void 0;
      if (keys_default()(realThis.$options.components).includes('loader-component')) {
        initialNames = realThis.$children.slice(1).map(function (comp) {
          return comp.$children[0]._name;
        }).filter(function (item) {
          return !item.includes('panel');
        });
      } else {
        initialNames = keys_default()(realThis.$options.components).filter(function (item) {
          return !item.includes('panel') && !item.includes('chart-sender');
        });
      }
      // kebab-case to CamelCase
      var newNames = initialNames.map(function (splitFirst) {
        var splitName = splitFirst.split('-');
        return splitName.map(function (splitSecond) {
          return splitSecond[0].toUpperCase() + splitSecond.slice(1);
        }).join('');
      });
      return newNames;
    }

    // method for receiving charts. cannot directly use a sockets function because any component
    // connected to websockets would receive the dashboard
    function receiveCharts(msg) {
      var localThis = this,
          tempProps = void 0;
      var newMsg = JSON.parse(msg);

      // store the received themes in an object that will then be passed to the receiver component
      this.themes = { colorTheme: newMsg.theme, displayTheme: newMsg.displayTheme };
      this.wrapperClass = newMsg.currentWrapper;

      // Need to get both of the styling for CSS grid suppoprt and no support so that the dashboard can get passed along
      var styles = newMsg.styles[0] + newMsg.styles[1];
      // create a new style element and add the style string as the inner text
      var style = document.createElement('style');
      style.type = "text/css";
      style.appendChild(document.createTextNode(''));
      style.innerText = styles;
      // append style element to document head
      document.head.appendChild(style);
      if (newMsg.receiveChart !== true) {
        // execute only if we've flagged message to be relevant to this interface
        return;
      } else {
        this.dataSource = newMsg.dataSource;
        tempProps = [].concat(toConsumableArray_default()(newMsg.props));
        this.componentArray = tempProps;
      }
    }

    // declare a global mixin that will be accessed from any Vue instance
    // by checking if a component has the screenshare custom option on the vue instance
    // we can scope the mixin to only components that need it
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        if (this.$options.screenshare) {
          var role = this.$options.screenshare;
          if (role === 'receiverComp') {
            this.receiveCharts = receiveCharts.bind(this);
            this.$options.sockets = {
              connect: function connect() {
                this.connected = true;
              },
              shareCharts: function shareCharts(msg) {
                this.receiveCharts(msg);
              }
            };
          } else if (role) {
            this.shareableChart = null;
            this.shareAll = shareAll.bind(this);
            this.submit = submit.bind(this);
            this.charts = charts.bind(this);
          }
        }
      }
    });
  }
};
/* harmony default export */ var screenshare = (screensharePlugin);
// CONCATENATED MODULE: ./src/plugins/themes.js
var themes = {
  install: function install(Vue, options) {
    if (!store) {
      throw new Error("Please provide vuex store.");
    }
    var store = options.store;

    store.registerModule('themeMod', {
      state: {
        colorTheme: 'blue',
        displayTheme: 'light',
        allThemes: ['Blue', 'Pink', 'Brown', 'Green', 'Red', 'Grey'],
        themeColors: []
      },
      mutations: {
        changeColor: function changeColor(state, payload) {
          state.colorTheme = payload;
        },
        changeDisplay: function changeDisplay(state, payload) {
          state.displayTheme = payload;
        },
        changeEndpoint: function changeEndpoint(state, payload) {
          state.gridEndpoint = payload;
        },
        changeColorArray: function changeColorArray(state, payload) {
          state.themeColors = payload;
        }
      }
    });
  }
};

/* harmony default export */ var plugins_themes = (themes);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/ChartSenderComponent.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ChartSenderComponent = ({
  props: ['components'],
  screenshare: true
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4991912a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/ChartSenderComponent.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"chart-sender"}},[(_vm.components)?[_c('v-select',{attrs:{"items":_vm.components,"label":"Select Single Chart to Share","single-line":"","bottom":"","append-icon":"trending_up"},model:{value:(_vm.shareableChart),callback:function ($$v) {_vm.shareableChart=$$v},expression:"shareableChart"}})]:[_c('v-select',{attrs:{"items":_vm.charts(),"label":"Select Single Chart to Share","single-line":"","bottom":"","append-icon":"trending_up"},model:{value:(_vm.shareableChart),callback:function ($$v) {_vm.shareableChart=$$v},expression:"shareableChart"}})],_vm._v(" "),_c('div',[_c('v-btn',{attrs:{"color":"primary"},on:{"click":_vm.submit}},[_vm._v("Share Chart")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary"},on:{"click":_vm.shareAll}},[_vm._v("Share Dashboard")])],1)],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_ChartSenderComponent = (esExports);
// CONCATENATED MODULE: ./src/components/ChartSenderComponent.vue
function injectStyle (ssrContext) {
  __webpack_require__(133)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ChartSenderComponent,
  components_ChartSenderComponent,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_ChartSenderComponent = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/LoaderComponent.vue
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var LoaderComponent = ({
  name: 'LoaderComponent',
  computed: {
    componentLoader: function componentLoader() {
      // get the actual file name because the this.chartName is not always correct
      var fileName = this.filePath ? this.filePath.split('/').slice(-1)[0] : '';
      if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("d3")) {
        if (fileName === 'SankeyDiagram.vue') return;
        return function () {
          return __webpack_require__(135)("./" + fileName);
        };
      } else if (this.filePath && this.filePath.includes("universal")) {
        // return () => import('./universal/' + fileName)
      } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Chartjs")) {
        return function () {
          return __webpack_require__(170)("./" + fileName);
        };
      } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Chartist")) {
        return function () {
          return __webpack_require__(180)("./" + fileName);
        };
      } else if (this.filePath && this.filePath.includes("visualizations") && this.filePath.includes("Plotly")) {
        return function () {
          return __webpack_require__(184)("./" + fileName);
        };
      } else {}
      // HTK need to deal with other locations
    }
  },
  updated: function updated() {
    // debugger
  },

  props: ['props', 'filePath', 'chartName', 'height', 'inlineStyles'],
  watch: {
    componentLoader: function componentLoader(data) {
      this.$options.components[this.chartName] = data;
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4c5490cd","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/LoaderComponent.vue
var LoaderComponent_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"loaderComponent",staticStyle:{"height":"100%","width":"100%"}},[_c(_vm.componentLoader,_vm._b({tag:"component",style:(_vm.inlineStyles)},'component',_vm.props,false))],1)}
var LoaderComponent_staticRenderFns = []
var LoaderComponent_esExports = { render: LoaderComponent_render, staticRenderFns: LoaderComponent_staticRenderFns }
/* harmony default export */ var components_LoaderComponent = (LoaderComponent_esExports);
// CONCATENATED MODULE: ./src/components/LoaderComponent.vue
function LoaderComponent_injectStyle (ssrContext) {
  __webpack_require__(134)
}
var LoaderComponent_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var LoaderComponent___vue_template_functional__ = false
/* styles */
var LoaderComponent___vue_styles__ = LoaderComponent_injectStyle
/* scopeId */
var LoaderComponent___vue_scopeId__ = "data-v-4c5490cd"
/* moduleIdentifier (server only) */
var LoaderComponent___vue_module_identifier__ = null
var LoaderComponent_Component = LoaderComponent_normalizeComponent(
  LoaderComponent,
  components_LoaderComponent,
  LoaderComponent___vue_template_functional__,
  LoaderComponent___vue_styles__,
  LoaderComponent___vue_scopeId__,
  LoaderComponent___vue_module_identifier__
)

/* harmony default export */ var src_components_LoaderComponent = (LoaderComponent_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/ReceiverComponent.vue
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ReceiverComponent = ({
  mixins: [mixins_styleTogglerMixin],
  screenshare: 'receiverComp',
  components: {
    'loader-component': src_components_LoaderComponent,
    'chart-sender': src_components_ChartSenderComponent
  },
  data: function data() {
    return {
      componentArray: [],
      themes: {},
      wrapperClass: ''
    };
  },
  watch: {
    themes: function themes(themeObj) {
      if (this.$store.state.themeMod) {
        if (this.$store.state.themeMod.displayTheme !== themeObj.displayTheme) {
          this.toggleDark();
        }
        this.chooseTheme(themeObj.colorTheme);
      }
    }
  },
  computed: {
    components: function components() {
      return this.componentArray.map(function (comp) {
        return comp.chartName;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5ebbbf7f","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/ReceiverComponent.vue
var ReceiverComponent_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.wrapperClass, 'receiver']},[(_vm.componentArray.length)?_c('chart-sender',{attrs:{"components":_vm.components}}):_vm._e(),_vm._v(" "),_vm._l((_vm.componentArray),function(item,index){return [_c('div',{key:index,class:_vm.componentArray[index].class,style:({height: ( _vm.componentArray[index].height + 'px' )})},[_c('loader-component',_vm._b({},'loader-component',item,false))],1)]})],2)}
var ReceiverComponent_staticRenderFns = []
var ReceiverComponent_esExports = { render: ReceiverComponent_render, staticRenderFns: ReceiverComponent_staticRenderFns }
/* harmony default export */ var components_ReceiverComponent = (ReceiverComponent_esExports);
// CONCATENATED MODULE: ./src/components/ReceiverComponent.vue
function ReceiverComponent_injectStyle (ssrContext) {
  __webpack_require__(192)
}
var ReceiverComponent_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var ReceiverComponent___vue_template_functional__ = false
/* styles */
var ReceiverComponent___vue_styles__ = ReceiverComponent_injectStyle
/* scopeId */
var ReceiverComponent___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ReceiverComponent___vue_module_identifier__ = null
var ReceiverComponent_Component = ReceiverComponent_normalizeComponent(
  ReceiverComponent,
  components_ReceiverComponent,
  ReceiverComponent___vue_template_functional__,
  ReceiverComponent___vue_styles__,
  ReceiverComponent___vue_scopeId__,
  ReceiverComponent___vue_module_identifier__
)

/* harmony default export */ var src_components_ReceiverComponent = (ReceiverComponent_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/DynamicComponent.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var filterProps = ["dataModel"];

/* harmony default export */ var DynamicComponent = ({
    props: ['currentView', 'dataModel', 'compRowIdx', 'compColIdx'],
    data: function data() {
        return {};
    },
    computed: {
        receivedData: function receivedData() {
            var _this = this;

            var receivedData = {};
            keys_default()(this.dataModel || []).forEach(function (item) {
                receivedData[item] = _this.dataModel[item];
            });
            return receivedData;
        },
        computedView: function computedView() {
            var localThis = this;
            if (this.currentView) {
                return function () {
                    return __webpack_require__(90)("./" + localThis.currentView + '.vue');
                };
            }
        }
    },
    watch: {
        computedView: function computedView(data) {
            var _this2 = this;

            var localThis = this;

            this.$options.components[this.currentView] = data;

            // Create a copy of the component so we can get its properties.
            this.$options.components[this.currentView]().then(function (comp) {
                var props = {};
                var propNames = keys_default()(comp.default.props);

                // Filter out dataModel and other props not to be updated.
                var filteredNames = propNames.filter(function (prop) {
                    return !filterProps.includes(prop);
                });

                filteredNames.forEach(function (name) {
                    props[name] = comp.default.props[name].default;
                });

                // Emit that properties were found.
                _this2.$emit('UIBuilderProps', props, localThis.compRowIdx, localThis.compColIdx);
            });
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-534a473c","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/DynamicComponent.vue
var DynamicComponent_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('div',{staticStyle:{"width":"100%","height":"100%"}},[_c('v-container',{staticClass:"mb-4",staticStyle:{"width":"100%","height":"100%"},attrs:{"fluid":"","grid-list-xs":"","grid-list-sm":"","grid-list-md":"","grid-list-lg":"","grid-list-xl":""}},[_c('h2',[_vm._v(_vm._s(_vm.currentView))]),_vm._v(" "),_c('v-layout',{staticStyle:{"width":"100%","height":"100%"},attrs:{"row":"","wrap":""}},[_c('v-flex',{staticStyle:{"width":"100%","height":"500px"},attrs:{"xs12":"","sm12":"","md12":"","lg12":"","xl12":""}},[_c(_vm.computedView,_vm._b({tag:"component",staticStyle:{"height":"500px"}},'component',_vm.receivedData,false))],1)],1)],1)],1)])}
var DynamicComponent_staticRenderFns = []
var DynamicComponent_esExports = { render: DynamicComponent_render, staticRenderFns: DynamicComponent_staticRenderFns }
/* harmony default export */ var components_DynamicComponent = (DynamicComponent_esExports);
// CONCATENATED MODULE: ./src/components/DynamicComponent.vue
var DynamicComponent_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var DynamicComponent___vue_template_functional__ = false
/* styles */
var DynamicComponent___vue_styles__ = null
/* scopeId */
var DynamicComponent___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DynamicComponent___vue_module_identifier__ = null
var DynamicComponent_Component = DynamicComponent_normalizeComponent(
  DynamicComponent,
  components_DynamicComponent,
  DynamicComponent___vue_template_functional__,
  DynamicComponent___vue_styles__,
  DynamicComponent___vue_scopeId__,
  DynamicComponent___vue_module_identifier__
)

/* harmony default export */ var src_components_DynamicComponent = (DynamicComponent_Component.exports);

// CONCATENATED MODULE: ./src/common/allComponentsList.js
/**
 * An array of component names to be used for UIBuilder.
 *
 */
/* harmony default export */ var allComponentsList = ({
    d3: [{ text: 'Bar Chart', value: 'BarChart' }, { text: 'Box Plot', value: 'BoxPlot' }, { text: 'Bubble Chart', value: 'BubbleChart' }, { text: 'Bullet Chart', value: 'BulletChart' }, { text: 'Dendrogram', value: 'Dendrogram' }, { text: 'Difference Chart', value: 'DifferenceChart' }, { text: 'Force Directed Graph', value: 'ForceDirectedGraph' }, { text: 'Gantt Chart', value: 'GanttChart' }, { text: 'Heat Map', value: 'HeatMap' }, { text: 'Histogram', value: 'Histogram' }, { text: 'Horizon Chart', value: 'HorizonChart' }, { text: 'Line Chart', value: 'LineChart' }, { text: 'Line Chart Zoomable', value: 'LineChartZoomable' }, { text: 'Line Plot', value: 'LinePlot' }, { text: 'Pie Chart', value: 'PieChart' }, { text: 'Punch Card', value: 'PunchCard' },
    // { text: 'Sankey Diagram', value: 'SankeyDiagram' },
    { text: 'Scatterplot', value: 'Scatterplot' }, { text: 'Stacked Bar Chart', value: 'StackedBarChart' }, { text: 'Stream Graph', value: 'StreamGraph' }, { text: 'Sunburst', value: 'Sunburst' }, { text: 'Two Line Plot', value: 'TwoLinePlot' }, { text: 'U S Map', value: 'USMap' }, { text: 'World Map', value: 'WorldMap' }]
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/UIBuilderComponent.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var UIBuilderComponent_filterProps = ["dataModel"];

/* harmony default export */ var UIBuilderComponent = ({
    data: function data() {
        return {
            /**
             * Each row is an object with property cols.
             */
            rows: [],
            options: allComponentsList.d3,
            showModal: false,
            currentComponent: "",
            currentRowIdx: -1,
            currentColIdx: -1,
            currentDataSource: "",
            currentCompProps: {},
            editing: false
        };
    },

    methods: {
        addRow: function addRow() {
            // Push a new row object.
            this.rows.push({
                cols: [{ dataModel: { dataModel: [] }, propsReceived: false, props: {}, hideControls: false }]
            });
        },
        addColumn: function addColumn(rowIdx) {
            if (rowIdx < this.rows.length) {
                this.rows[rowIdx].cols.push({ dataModel: { dataModel: [] }, propsReceived: false, props: {}, hideControls: false });
            }
        },

        // Method to load a dataModel for a given component at the specified indices.
        load: function load(rowIdx, colIdx) {
            var _this = this;

            if (rowIdx < this.rows.length && colIdx < this.rows[rowIdx].cols.length) {
                var col = this.rows[rowIdx].cols[colIdx];

                this.getDataForComponent(this.currentDataSource, function (err, data) {
                    if (err) {
                        console.error(err);
                        _this.close();
                        return;
                    }

                    col.dataModel.dataModel = data.dataModel;
                    col.dataSource = _this.currentDataSource;

                    // Give column its component.
                    col.component = _this.currentComponent;
                    // Add user defined props to the column.
                    keys_default()(_this.currentCompProps).forEach(function (prop) {
                        col.dataModel[prop] = _this.currentCompProps[prop];
                    });

                    _this.close();
                });
            }
        },

        // Method to retrieve data from an endpoint.
        getDataForComponent: function getDataForComponent(dataSourceEndpoint, cb) {
            if (dataSourceEndpoint) {
                external__axios__default.a.get(dataSourceEndpoint).then(function (response) {
                    cb(null, response.data);
                }).catch(function (err) {
                    return function () {
                        return __webpack_require__(90)("./" + localThis.currentView + '.vue');
                    };
                    cb(err, null);
                });
            } else {
                cb(null, { dataModel: [] });
            }
        },

        // Handles add properties as inputs when a component is selected.
        handleProps: function handleProps(props, rowIdx, colIdx) {
            var col = this.rows[rowIdx].cols[colIdx];
            col.propsReceived = true;
            col.props = props;

            // Add the new properties to the dataModel.
            keys_default()(props).forEach(function (propName) {
                col.dataModel[propName] = props[propName];
            });
        },
        loadComponent: function loadComponent(name) {
            if (name) {
                return function () {
                    return __webpack_require__(90)("./" + name + '.vue');
                };
            }
        },
        showColumnControls: function showColumnControls(rowIdx) {
            var controls = document.querySelector('#column-controls-' + rowIdx);
            controls.style.display = "block";
        },
        hideColumnControls: function hideColumnControls(rowIdx) {
            var controls = document.querySelector('#column-controls-' + rowIdx);
            controls.style.display = "none";
        },
        showComponentControls: function showComponentControls(rowIdx, colIdx) {
            var controls = document.querySelector('#comp-controls-' + rowIdx + '-' + colIdx);
            controls.style.display = "block";
        },
        hideComponentControls: function hideComponentControls(rowIdx, colIdx) {
            var controls = document.querySelector('#comp-controls-' + rowIdx + '-' + colIdx);
            controls.style.display = "none";
        },
        reset: function reset() {
            this.rows = [];
        },
        show: function show(rowIdx, colIdx) {
            var _this2 = this;

            if (rowIdx < this.rows.length && colIdx < this.rows[rowIdx].cols.length) {
                this.currentRowIdx = rowIdx;
                this.currentColIdx = colIdx;

                // Check to see if the cell already has a component.
                // If so, the modal will be for editing rather than adding.
                var cell = this.rows[rowIdx].cols[colIdx];

                if (cell.component) {
                    // Set the editing flag to not trigger the watch callback for this.currentComponent.
                    this.editing = true;
                    this.currentDataSource = cell.dataSource;
                    this.currentComponent = cell.component;

                    var props = keys_default()(cell.dataModel).filter(function (prop) {
                        if (!UIBuilderComponent_filterProps.includes(prop)) {
                            return cell.dataModel[prop];
                        }
                    });

                    props.forEach(function (name) {
                        _this2.currentCompProps[name] = cell.dataModel[name];
                    });
                }

                this.showModal = true;
            }
        },
        close: function close() {
            this.showModal = false;

            this.currentCompProps = {};
            this.currentDataSource = "";
            this.currentComponent = "";
        }
    },
    watch: {
        currentComponent: function currentComponent(data) {
            if (data === "" || data === undefined) {
                return;
            }

            // We don't need to load the component's properties if the cell is being edited.
            if (this.editing) {
                this.editing = false;
                return;
            }

            var comp = this.loadComponent(data);
            var localThis = this;

            comp().then(function (component) {
                var props = {};
                var propNames = keys_default()(component.default.props);

                // Filter out dataModel and other props not to be updated.
                var filteredNames = propNames.filter(function (prop) {
                    return !UIBuilderComponent_filterProps.includes(prop);
                });

                filteredNames.forEach(function (name) {
                    props[name] = component.default.props[name].default;
                });

                localThis.currentCompProps = props;
            });
        }
    },
    components: {
        'dynamic-component': src_components_DynamicComponent
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5c6319cb","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/UIBuilderComponent.vue
var UIBuilderComponent_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[_c('section',{staticClass:"description mb-5"},[_c('h1',{staticClass:"display-1 mt-5"},[_vm._v("UI Builder")]),_vm._v(" "),_c('blockquote',{staticClass:"mt-3"},[_vm._v("\n            In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.\n        ")])]),_vm._v(" "),_c('section',[_c('div',{staticClass:"add-row"},[_c('v-btn',{on:{"click":function($event){_vm.reset()}}},[_vm._v("Reset")]),_vm._v(" "),_c('v-btn',{on:{"click":function($event){_vm.addRow()}}},[_vm._v("Add Row")])],1)]),_vm._v(" "),_c('section',{staticClass:"uib-grid-wrapper"},_vm._l((_vm.rows),function(UIRow,rowIdx){return (_vm.rows.length > 0)?_c('div',{key:rowIdx,on:{"mouseover":function($event){_vm.showColumnControls(rowIdx)},"mouseout":function($event){_vm.hideColumnControls(rowIdx)}}},[_c('div',{staticClass:"column-controls",attrs:{"id":'column-controls-' + rowIdx}},[_c('v-btn',{on:{"click":function($event){_vm.addColumn(rowIdx)}}},[_vm._v("Add Column")])],1),_vm._v(" "),_c('div',{staticClass:"uib-row",style:({ 'grid-template-columns': 'repeat(' + UIRow.cols.length + ', 1fr)'})},_vm._l((UIRow.cols),function(col,colIdx){return _c('div',{key:colIdx,staticClass:"uib-col",on:{"mouseover":function($event){_vm.showComponentControls(rowIdx, colIdx)},"mouseout":function($event){_vm.hideComponentControls(rowIdx, colIdx)}}},[_c('div',{staticClass:"component-controls",attrs:{"id":'comp-controls-' + rowIdx + '-' + colIdx}},[_c('v-btn',{on:{"click":function($event){_vm.show(rowIdx, colIdx)}}},[(col.component)?_c('span',[_vm._v("Edit")]):_c('span',[_vm._v("Add")])])],1),_vm._v(" "),_c('div',[_c('div',[_c('dynamic-component',{attrs:{"currentView":col.component,"dataModel":col.dataModel,"compRowIdx":rowIdx,"compColIdx":colIdx}})],1)])])}))]):_vm._e()})),_vm._v(" "),_c('v-dialog',{attrs:{"persistent":"","max-width":"1000px"},model:{value:(_vm.showModal),callback:function ($$v) {_vm.showModal=$$v},expression:"showModal"}},[_c('v-card',[_c('v-card-title',[_vm._v("\n                Add Component\n            ")]),_vm._v(" "),_c('v-card-text',[_c('div',{staticClass:"controls"},[_c('div',{staticClass:"control-item"},[_c('v-select',{attrs:{"items":_vm.options,"label":"Component","auto":""},model:{value:(_vm.currentComponent),callback:function ($$v) {_vm.currentComponent=$$v},expression:"currentComponent"}},_vm._l((_vm.options),function(opt){return _c('option',{domProps:{"value":opt.value}},[_vm._v("\n                                "+_vm._s(opt.text)+"\n                            ")])}))],1),_vm._v(" "),_c('div',{staticClass:"control-item"},[_c('v-text-field',{attrs:{"name":"dataSource","label":"Endpoint"},model:{value:(_vm.currentDataSource),callback:function ($$v) {_vm.currentDataSource=$$v},expression:"currentDataSource"}})],1)]),_vm._v(" "),(_vm.currentCompProps)?_c('div',{staticClass:"properties"},_vm._l((Object.keys(_vm.currentCompProps)),function(prop){return _c('div',{key:prop,staticClass:"comp-prop"},[_c('v-text-field',{attrs:{"name":prop,"label":prop},model:{value:(_vm.currentCompProps[prop]),callback:function ($$v) {_vm.$set(_vm.currentCompProps, prop, $$v)},expression:"currentCompProps[prop]"}})],1)})):_vm._e()]),_vm._v(" "),_c('v-card-actions',[_c('div',{staticClass:"control-item"},[_c('v-btn',{on:{"click":function($event){_vm.load(_vm.currentRowIdx, _vm.currentColIdx)}}},[_vm._v("Load")]),_vm._v(" "),_c('v-btn',{on:{"click":function($event){_vm.close()}}},[_vm._v("Close")])],1)])],1)],1)],1)}
var UIBuilderComponent_staticRenderFns = []
var UIBuilderComponent_esExports = { render: UIBuilderComponent_render, staticRenderFns: UIBuilderComponent_staticRenderFns }
/* harmony default export */ var components_UIBuilderComponent = (UIBuilderComponent_esExports);
// CONCATENATED MODULE: ./src/components/UIBuilderComponent.vue
function UIBuilderComponent_injectStyle (ssrContext) {
  __webpack_require__(193)
}
var UIBuilderComponent_normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var UIBuilderComponent___vue_template_functional__ = false
/* styles */
var UIBuilderComponent___vue_styles__ = UIBuilderComponent_injectStyle
/* scopeId */
var UIBuilderComponent___vue_scopeId__ = "data-v-5c6319cb"
/* moduleIdentifier (server only) */
var UIBuilderComponent___vue_module_identifier__ = null
var UIBuilderComponent_Component = UIBuilderComponent_normalizeComponent(
  UIBuilderComponent,
  components_UIBuilderComponent,
  UIBuilderComponent___vue_template_functional__,
  UIBuilderComponent___vue_styles__,
  UIBuilderComponent___vue_scopeId__,
  UIBuilderComponent___vue_module_identifier__
)

/* harmony default export */ var src_components_UIBuilderComponent = (UIBuilderComponent_Component.exports);

// EXTERNAL MODULE: ./src/components/visualizations/Chartist/ChartistBarChart.vue + 2 modules
var ChartistBarChart = __webpack_require__(78);

// EXTERNAL MODULE: ./src/components/visualizations/Chartist/ChartistLineChart.vue + 2 modules
var ChartistLineChart = __webpack_require__(81);

// EXTERNAL MODULE: ./src/components/visualizations/Chartist/ChartistPieChart.vue + 2 modules
var ChartistPieChart = __webpack_require__(82);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsBarChartComp.vue + 2 modules
var ChartjsBarChartComp = __webpack_require__(62);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsBarLineComp.vue + 2 modules
var ChartjsBarLineComp = __webpack_require__(64);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsBubbleComp.vue + 2 modules
var ChartjsBubbleComp = __webpack_require__(66);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsLineChartComp.vue + 2 modules
var ChartjsLineChartComp = __webpack_require__(68);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsPieComp.vue + 2 modules
var ChartjsPieComp = __webpack_require__(70);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsPolarComp.vue + 2 modules
var ChartjsPolarComp = __webpack_require__(72);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsRadarComp.vue + 2 modules
var ChartjsRadarComp = __webpack_require__(74);

// EXTERNAL MODULE: ./src/components/visualizations/Chartjs/ChartjsScatterComp.vue + 2 modules
var ChartjsScatterComp = __webpack_require__(76);

// EXTERNAL MODULE: ./src/components/visualizations/d3/BarChart.vue + 2 modules
var BarChart = __webpack_require__(28);

// EXTERNAL MODULE: ./src/components/visualizations/d3/BoxPlot.vue + 2 modules
var BoxPlot = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/visualizations/d3/BubbleChart.vue + 2 modules
var BubbleChart = __webpack_require__(30);

// EXTERNAL MODULE: ./src/components/visualizations/d3/BulletChart.vue + 2 modules
var BulletChart = __webpack_require__(31);

// EXTERNAL MODULE: ./src/components/visualizations/d3/Dendrogram.vue + 2 modules
var Dendrogram = __webpack_require__(32);

// EXTERNAL MODULE: ./src/components/visualizations/d3/DifferenceChart.vue + 2 modules
var DifferenceChart = __webpack_require__(33);

// EXTERNAL MODULE: ./src/components/visualizations/d3/ForceDirectedGraph.vue + 2 modules
var ForceDirectedGraph = __webpack_require__(34);

// EXTERNAL MODULE: ./src/components/visualizations/d3/GanttChart.vue + 2 modules
var GanttChart = __webpack_require__(35);

// EXTERNAL MODULE: ./src/components/visualizations/d3/HeatMap.vue + 2 modules
var HeatMap = __webpack_require__(36);

// EXTERNAL MODULE: ./src/components/visualizations/d3/Histogram.vue + 2 modules
var Histogram = __webpack_require__(37);

// EXTERNAL MODULE: ./src/components/visualizations/d3/HorizonChart.vue + 2 modules
var HorizonChart = __webpack_require__(38);

// EXTERNAL MODULE: ./src/components/visualizations/d3/LineChart.vue + 2 modules
var LineChart = __webpack_require__(39);

// EXTERNAL MODULE: ./src/components/visualizations/d3/LineChartZoomable.vue + 2 modules
var LineChartZoomable = __webpack_require__(40);

// EXTERNAL MODULE: ./src/components/visualizations/d3/LinePlot.vue + 2 modules
var LinePlot = __webpack_require__(41);

// EXTERNAL MODULE: ./src/components/visualizations/d3/PieChart.vue + 2 modules
var PieChart = __webpack_require__(42);

// EXTERNAL MODULE: ./src/components/visualizations/d3/PunchCard.vue + 3 modules
var PunchCard = __webpack_require__(43);

// EXTERNAL MODULE: ./src/components/visualizations/d3/Scatterplot.vue + 2 modules
var Scatterplot = __webpack_require__(46);

// EXTERNAL MODULE: ./src/components/visualizations/d3/StackedBarChart.vue + 2 modules
var StackedBarChart = __webpack_require__(47);

// EXTERNAL MODULE: ./src/components/visualizations/d3/StreamGraph.vue + 2 modules
var StreamGraph = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/visualizations/d3/Sunburst.vue + 2 modules
var Sunburst = __webpack_require__(49);

// EXTERNAL MODULE: ./src/components/visualizations/d3/TwoLinePlot.vue + 2 modules
var TwoLinePlot = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/visualizations/d3/USMap.vue + 2 modules
var USMap = __webpack_require__(51);

// EXTERNAL MODULE: ./src/components/visualizations/d3/WorldMap.vue + 2 modules
var WorldMap = __webpack_require__(52);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlyAreaChart.vue + 2 modules
var PlotlyAreaChart = __webpack_require__(83);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlyBarGraph.vue + 2 modules
var PlotlyBarGraph = __webpack_require__(84);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlyBubbleChart.vue + 2 modules
var PlotlyBubbleChart = __webpack_require__(85);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlyDonutChart.vue + 2 modules
var PlotlyDonutChart = __webpack_require__(86);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlyHeatMap.vue + 2 modules
var PlotlyHeatMap = __webpack_require__(87);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlyScatterplot.vue + 2 modules
var PlotlyScatterplot = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/visualizations/Plotly/PlotlySurfacePlot.vue + 2 modules
var PlotlySurfacePlot = __webpack_require__(89);

// EXTERNAL MODULE: ./src/assets/stylus/main.styl
var main = __webpack_require__(194);
var main_default = /*#__PURE__*/__webpack_require__.n(main);

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "formatTimeMixin", function() { return formatTimeMixin["a" /* default */]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "styleTogglerMixin", function() { return mixins_styleTogglerMixin; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "authPlugin", function() { return plugins_auth; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "screensharePlugin", function() { return screenshare; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "themePlugin", function() { return plugins_themes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartSender", function() { return src_components_ChartSenderComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return src_components_LoaderComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ReceiverComponent", function() { return src_components_ReceiverComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DynamicComponent", function() { return src_components_DynamicComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "UIBuilderComponent", function() { return src_components_UIBuilderComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlyAreaChart", function() { return PlotlyAreaChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlyBarGraph", function() { return PlotlyBarGraph["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlyBubbleChart", function() { return PlotlyBubbleChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlyDonutChart", function() { return PlotlyDonutChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlyHeatMap", function() { return PlotlyHeatMap["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlyScatterPlot", function() { return PlotlyScatterplot["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PlotlySurfacePlot", function() { return PlotlySurfacePlot["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3BarChart", function() { return BarChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3BoxPlot", function() { return BoxPlot["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3BubbleChart", function() { return BubbleChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3BulletChart", function() { return BulletChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3Dendrogram", function() { return Dendrogram["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3DifferenceChart", function() { return DifferenceChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3ForceGraph", function() { return ForceDirectedGraph["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3GanttChart", function() { return GanttChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3HeatMap", function() { return HeatMap["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3Histogram", function() { return Histogram["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3HorizonChart", function() { return HorizonChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3AreaChart", function() { return LineChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3ZoomableLineChart", function() { return LineChartZoomable["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3LineChart", function() { return LinePlot["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3PieChart", function() { return PieChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3PunchCard", function() { return PunchCard["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3ScatterPlot", function() { return Scatterplot["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3StackedBarChart", function() { return StackedBarChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3StreamGraph", function() { return StreamGraph["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3Sunburst", function() { return Sunburst["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3TwoLinePlot", function() { return TwoLinePlot["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3USMap", function() { return USMap["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "D3WorldMap", function() { return WorldMap["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsBarChart", function() { return ChartjsBarChartComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsBarLineChart", function() { return ChartjsBarLineComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsBubbleChart", function() { return ChartjsBubbleComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsLineChart", function() { return ChartjsLineChartComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsPieChart", function() { return ChartjsPieComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsPolarChart", function() { return ChartjsPolarComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsRadarChart", function() { return ChartjsRadarComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartjsScatterChart", function() { return ChartjsScatterComp["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartistBarChart", function() { return ChartistBarChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartistLineChart", function() { return ChartistLineChart["default"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ChartistPieChart", function() { return ChartistPieChart["default"]; });




























































var src_charts = {
  formatTimeMixin: formatTimeMixin["a" /* default */],
  styleTogglerMixin: mixins_styleTogglerMixin,
  authPlugin: plugins_auth,
  screensharePlugin: screenshare,
  themePlugin: plugins_themes,
  ChartSender: src_components_ChartSenderComponent,
  LoaderComponent: src_components_LoaderComponent,
  ReceiverComponent: src_components_ReceiverComponent,
  DynamicComponent: src_components_DynamicComponent,
  UIBuilderComponent: src_components_UIBuilderComponent,
  PlotlyAreaChart: PlotlyAreaChart["default"],
  PlotlyBarGraph: PlotlyBarGraph["default"],
  PlotlyBubbleChart: PlotlyBubbleChart["default"],
  PlotlyDonutChart: PlotlyDonutChart["default"],
  PlotlyHeatMap: PlotlyHeatMap["default"],
  PlotlyScatterPlot: PlotlyScatterplot["default"],
  PlotlySurfacePlot: PlotlySurfacePlot["default"],
  D3BarChart: BarChart["default"],
  D3BoxPlot: BoxPlot["default"],
  D3BubbleChart: BubbleChart["default"],
  D3BulletChart: BulletChart["default"],
  D3Dendrogram: Dendrogram["default"],
  D3DifferenceChart: DifferenceChart["default"],
  D3ForceGraph: ForceDirectedGraph["default"],
  D3GanttChart: GanttChart["default"],
  D3HeatMap: HeatMap["default"],
  D3Histogram: Histogram["default"],
  D3HorizonChart: HorizonChart["default"],
  D3AreaChart: LineChart["default"],
  D3ZoomableLineChart: LineChartZoomable["default"],
  D3LineChart: LinePlot["default"],
  D3PieChart: PieChart["default"],
  D3PunchCard: PunchCard["default"],
  D3ScatterPlot: Scatterplot["default"],
  D3StackedBarChart: StackedBarChart["default"],
  D3StreamGraph: StreamGraph["default"],
  D3Sunburst: Sunburst["default"],
  D3TwoLinePlot: TwoLinePlot["default"],
  D3USMap: USMap["default"],
  D3WorldMap: WorldMap["default"],
  ChartjsBarChart: ChartjsBarChartComp["default"],
  ChartjsBarLineChart: ChartjsBarLineComp["default"],
  ChartjsBubbleChart: ChartjsBubbleComp["default"],
  ChartjsLineChart: ChartjsLineChartComp["default"],
  ChartjsPieChart: ChartjsPieComp["default"],
  ChartjsPolarChart: ChartjsPolarComp["default"],
  ChartjsRadarChart: ChartjsRadarComp["default"],
  ChartjsScatterChart: ChartjsScatterComp["default"],
  ChartistBarChart: ChartistBarChart["default"],
  ChartistLineChart: ChartistLineChart["default"],
  ChartistPieChart: ChartistPieChart["default"]
};

/* harmony default export */ var src = __webpack_exports__["default"] = (src_charts);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
__webpack_require__(122);
module.exports = __webpack_require__(10).Array.from;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(107)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(108)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(54);
var defined = __webpack_require__(55);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(109);
var $export = __webpack_require__(17);
var redefine = __webpack_require__(113);
var hide = __webpack_require__(22);
var has = __webpack_require__(25);
var Iterators = __webpack_require__(58);
var $iterCreate = __webpack_require__(114);
var setToStringTag = __webpack_require__(100);
var getPrototypeOf = __webpack_require__(121);
var ITERATOR = __webpack_require__(15)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(20) && !__webpack_require__(24)(function () {
  return Object.defineProperty(__webpack_require__(92)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(56);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(115);
var descriptor = __webpack_require__(57);
var setToStringTag = __webpack_require__(100);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(22)(IteratorPrototype, __webpack_require__(15)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(23);
var dPs = __webpack_require__(116);
var enumBugKeys = __webpack_require__(99);
var IE_PROTO = __webpack_require__(60)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(92)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(120).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(19);
var anObject = __webpack_require__(23);
var getKeys = __webpack_require__(59);

module.exports = __webpack_require__(20) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(25);
var toIObject = __webpack_require__(93);
var arrayIndexOf = __webpack_require__(118)(false);
var IE_PROTO = __webpack_require__(60)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(93);
var toLength = __webpack_require__(96);
var toAbsoluteIndex = __webpack_require__(119);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(54);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(18).document;
module.exports = document && document.documentElement;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(25);
var toObject = __webpack_require__(26);
var IE_PROTO = __webpack_require__(60)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(91);
var $export = __webpack_require__(17);
var toObject = __webpack_require__(26);
var call = __webpack_require__(123);
var isArrayIter = __webpack_require__(124);
var toLength = __webpack_require__(96);
var createProperty = __webpack_require__(125);
var getIterFn = __webpack_require__(126);

$export($export.S + $export.F * !__webpack_require__(128)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(23);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(58);
var ITERATOR = __webpack_require__(15)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(19);
var createDesc = __webpack_require__(57);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(127);
var ITERATOR = __webpack_require__(15)('iterator');
var Iterators = __webpack_require__(58);
module.exports = __webpack_require__(10).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(95);
var TAG = __webpack_require__(15)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(15)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
module.exports = __webpack_require__(10).Object.keys;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(26);
var $keys = __webpack_require__(59);

__webpack_require__(131)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(17);
var core = __webpack_require__(10);
var fails = __webpack_require__(24);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(10);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./BarChart": [
		28
	],
	"./BarChart.vue": [
		28
	],
	"./BoxPlot": [
		29
	],
	"./BoxPlot.vue": [
		29
	],
	"./BubbleChart": [
		30
	],
	"./BubbleChart.vue": [
		30
	],
	"./BulletChart": [
		31
	],
	"./BulletChart.vue": [
		31
	],
	"./Dendrogram": [
		32
	],
	"./Dendrogram.vue": [
		32
	],
	"./DifferenceChart": [
		33
	],
	"./DifferenceChart.vue": [
		33
	],
	"./ForceDirectedGraph": [
		34
	],
	"./ForceDirectedGraph.vue": [
		34
	],
	"./GanttChart": [
		35
	],
	"./GanttChart.vue": [
		35
	],
	"./HeatMap": [
		36
	],
	"./HeatMap.vue": [
		36
	],
	"./Histogram": [
		37
	],
	"./Histogram.vue": [
		37
	],
	"./HorizonChart": [
		38
	],
	"./HorizonChart.vue": [
		38
	],
	"./LineChart": [
		39
	],
	"./LineChart.vue": [
		39
	],
	"./LineChartZoomable": [
		40
	],
	"./LineChartZoomable.vue": [
		40
	],
	"./LinePlot": [
		41
	],
	"./LinePlot.vue": [
		41
	],
	"./PieChart": [
		42
	],
	"./PieChart.vue": [
		42
	],
	"./PunchCard": [
		43
	],
	"./PunchCard.vue": [
		43
	],
	"./Scatterplot": [
		46
	],
	"./Scatterplot.vue": [
		46
	],
	"./StackedBarChart": [
		47
	],
	"./StackedBarChart.vue": [
		47
	],
	"./StreamGraph": [
		48
	],
	"./StreamGraph.vue": [
		48
	],
	"./Sunburst": [
		49
	],
	"./Sunburst.vue": [
		49
	],
	"./TwoLinePlot": [
		50
	],
	"./TwoLinePlot.vue": [
		50
	],
	"./USMap": [
		51
	],
	"./USMap.vue": [
		51
	],
	"./WorldMap": [
		52
	],
	"./WorldMap.vue": [
		52
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 135;
module.exports = webpackAsyncContext;

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(145);
module.exports = __webpack_require__(10).Object.assign;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(17);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(146) });


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(59);
var gOPS = __webpack_require__(147);
var pIE = __webpack_require__(148);
var toObject = __webpack_require__(26);
var IObject = __webpack_require__(94);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(24)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 148 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 150 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 151 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 152 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 153 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = d3-horizon-chart;

/***/ }),
/* 155 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 156 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 157 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 158 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 159 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
var $Object = __webpack_require__(10).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(17);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(20), 'Object', { defineProperty: __webpack_require__(19).f });


/***/ }),
/* 163 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 164 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 165 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 166 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 167 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 168 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 169 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ChartjsBarChartComp": [
		62
	],
	"./ChartjsBarChartComp.vue": [
		62
	],
	"./ChartjsBarLineComp": [
		64
	],
	"./ChartjsBarLineComp.vue": [
		64
	],
	"./ChartjsBubbleComp": [
		66
	],
	"./ChartjsBubbleComp.vue": [
		66
	],
	"./ChartjsLineChartComp": [
		68
	],
	"./ChartjsLineChartComp.vue": [
		68
	],
	"./ChartjsPieComp": [
		70
	],
	"./ChartjsPieComp.vue": [
		70
	],
	"./ChartjsPolarComp": [
		72
	],
	"./ChartjsPolarComp.vue": [
		72
	],
	"./ChartjsRadarComp": [
		74
	],
	"./ChartjsRadarComp.vue": [
		74
	],
	"./ChartjsScatterComp": [
		76
	],
	"./ChartjsScatterComp.vue": [
		76
	],
	"./base/ChartjsBarChart": [
		63
	],
	"./base/ChartjsBarChart.js": [
		63
	],
	"./base/ChartjsBarLineMixed": [
		65
	],
	"./base/ChartjsBarLineMixed.js": [
		65
	],
	"./base/ChartjsBubbleChart": [
		67
	],
	"./base/ChartjsBubbleChart.js": [
		67
	],
	"./base/ChartjsLineChart": [
		69
	],
	"./base/ChartjsLineChart.js": [
		69
	],
	"./base/ChartjsPieChart": [
		71
	],
	"./base/ChartjsPieChart.js": [
		71
	],
	"./base/ChartjsPolarArea": [
		73
	],
	"./base/ChartjsPolarArea.js": [
		73
	],
	"./base/ChartjsRadarChart": [
		75
	],
	"./base/ChartjsRadarChart.js": [
		75
	],
	"./base/ChartjsScatterChart": [
		77
	],
	"./base/ChartjsScatterChart.js": [
		77
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),
/* 171 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = chart.js;

/***/ }),
/* 173 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 174 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 175 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 177 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 178 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 179 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ChartistBarChart": [
		78
	],
	"./ChartistBarChart.vue": [
		78
	],
	"./ChartistLineChart": [
		81
	],
	"./ChartistLineChart.vue": [
		81
	],
	"./ChartistPieChart": [
		82
	],
	"./ChartistPieChart.vue": [
		82
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 180;
module.exports = webpackAsyncContext;

/***/ }),
/* 181 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 182 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 183 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./PlotlyAreaChart": [
		83
	],
	"./PlotlyAreaChart.vue": [
		83
	],
	"./PlotlyBarGraph": [
		84
	],
	"./PlotlyBarGraph.vue": [
		84
	],
	"./PlotlyBubbleChart": [
		85
	],
	"./PlotlyBubbleChart.vue": [
		85
	],
	"./PlotlyDonutChart": [
		86
	],
	"./PlotlyDonutChart.vue": [
		86
	],
	"./PlotlyHeatMap": [
		87
	],
	"./PlotlyHeatMap.vue": [
		87
	],
	"./PlotlyScatterplot": [
		88
	],
	"./PlotlyScatterplot.vue": [
		88
	],
	"./PlotlySurfacePlot": [
		89
	],
	"./PlotlySurfacePlot.vue": [
		89
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 184;
module.exports = webpackAsyncContext;

/***/ }),
/* 185 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 186 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 187 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 188 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 189 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 190 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 191 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 194 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=jscatalyst.js.map