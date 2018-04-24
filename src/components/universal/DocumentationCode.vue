<template>
    <div class='docs'>
      <div class="code">
        <template v-for='(char, index) in digestedCode'>
          <template v-if="charCheck(char, index, digestedCode)">
            <br />
          </template>
          <template v-else>
            <span :class='findClass(char, index, digestedCode)'>{{char || ' '}}</span>
          </template>
        </template>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      code: {
        type: String
      }
    },
    computed: {
      digestedCode: function() {
        return this.code.match(/(\w+'\w+)|\w+|:|\!|<|>|'|=|-|\/|/g)
      }
    },
    methods: {
      findClass: function(char, index, allCode) {
        if (!char) {
          return
        }
        // if the word is a data property on the vue componenet
        if (char[0].match(/[a-z]/) && allCode[index-4] && allCode[index-4] === ':') {
          return 'punct'
        // if the word is the name of the component or is a dash in the name of a component
        } else if ((char[0].match(/[a-z]/) && allCode[index-1].match(/[<\/-]/)) || (char[0].match(/[-]/) && allCode.slice(index-4, index).join('').includes('<')) || (char[0].match(/[-]/) && allCode.slice(index-2, index).join('').includes('<')) || (char[0].match(/[-]/) && allCode.slice(index, index+3).join('').includes('>')) ) {
          if (allCode[index+1] === "'" || (allCode[index+1] === "" && allCode[index+2] !== ":") || allCode[index+3] === "'") return 'str';
          return 'component'
        }
        // if the char is punctuation
        if (char[0].match(/[=<>\/]/)) {
          if (char[0] === '/' && allCode[index-1].match(/[a-zA-Z]/)) return 'str';
          return 'punct'
        // special case for : so that there is padding for indentation
        } else if (char[0] === ':') {
          return 'punct colon'
        } else if (char[0].match(/[a-z]/) && allCode[index+1] === '=') {
          // if the word is a prop key and it has data binding
          if (allCode[index-1] === ':') {
            return 'props no-pad'
          }
          // else if it is just a regular prop
          return 'props'
        // if its none of the above it is a string
        } else {
          return 'str'
        }
      },
      charCheck: function(char, index, digestedCode) {
        if (!char && digestedCode[index-2] === "'") {
          return false
        } else if (!char && digestedCode[index-2] === '') {
          return false
        } else if (!char) {
          return true
        }
      }
    },
    mounted() {

    }
  }
</script>

<style lang="css" scoped>
  .docs {
    width: 90%;
    margin: auto;
    background-color: rgb(35,39,46);
  }
  .punct {
    color: lightgrey;
    font-family: 'Ubuntu Mono', monospace;
  }
  .colon {
    padding-left: 20px;
  }
  .props.no-pad {
    padding-left: 0;
  }
  .props {
    color: rgb(225,135,58);
    font-family: 'Ubuntu Mono', monospace;
    padding-left: 20px;
  }
  .str {
    color: rgb(237,197,105);
    font-family: 'Ubuntu Mono', monospace;
  }
  .component {
    color: rgb(204, 79, 80);
    font-family: 'Ubuntu Mono', monospace;
  }
  .code {
    margin: 20px auto;
    width: 300px;

  }


</style>
