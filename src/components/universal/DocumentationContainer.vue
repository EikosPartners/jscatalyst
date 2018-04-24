<template>
  <div class='docs' style='background-color: grey; height:100%;'>
    <div class='section' v-for='doc in docs'>
      <doc-text
        :title='doc.title'
        :text='doc.text'
      ></doc-text>
      <doc-code
        :code='doc.code'
      ></doc-code>
    </div>
  </div>
</template>

<script>
  import DocumentationText from './DocumentationText.vue'
  import DocumentationCode from './DocumentationCode.vue'

  export default {
    components: {
      'doc-text': DocumentationText,
      'doc-code': DocumentationCode
    },
    props: {
      docs: {
        type: Array
      }
    }

  }
</script>

<style lang="css">
  @media (min-width: 800px) {
    .section {
      height: 400px;
    }
  }

  @media (min-width: 1500px) {
    .section {
      height: 500px;
    }

  }
  .docs {
    display: grid;
    grid-row-gap: 100px;
  }
  .section {

  }
</style>
