// the name of your new mixin
var yourMixinName;

//export the mixin
export default yourMixinName = {
  // define whatever Vue instance properties you'd like to add functionality to
  // ex. data, methods, computed, watch
  methods: {
    // define an add by two method that will be automatically added to the methods
    // of whatever Vue component you import this mixin into
    addBy2: function(num) {
      return num + 2;
    }
  }
}

// import your mixin
import yourMixinName from '@/mixins/exampleMixin.js'

export default {
  // register this mixin on your Vue component under the mixins property
  mixins: [yourMixinName],
  // this Vue component takes a number prop called myNumber
  props: ['myNumber'],
  computed: {
    // this computed property will return myNumber + 2
    myNumberPlus2: function() {
      // because we declared our addBy2 function on the methods property of
      // our mixin, we can access it as if it was declared as a method on this
      // Vue component (this.addBy2())
      return this.addBy2(this.myNumber)
    }
  }
}
