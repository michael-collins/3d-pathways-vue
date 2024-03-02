<template>
     <!-- special style child selectors from tailwind.config.js -->
    <div class="markdown 
    child-list-ol:list-decimal 
    child-list-ol-li-ul:list-disc 
    child-list-ol-li-ul:list-inside 
    child-list-ol-li-ul:my-2 
    child-list-ol-li:my-1
   " v-html="markdown.render(source)" />

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
  