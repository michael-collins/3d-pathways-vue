<template>
     <!-- special style child selectors from tailwind.config.js -->
    <div class="markdown 
    child-list-ol:list-decimal 
    child-list-ol-li-ul:list-disc 
    child-list-ol-li-ul:list-inside 
    child-list-ol-li-ul:px-4 
    child-list-ol-li-ul:py-1 
    child-list-ol-li:p-1 " v-html="markdown.render(source)" />

</template>


  <script>
  import MarkdownIt from "markdown-it";
  
  export default {
    props: {
      source: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        markdown: new MarkdownIt()
      };
    }
  };
  </script>
  