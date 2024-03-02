<template>
    <div v-html="markdown.render(source)" />

    <style scoped>
        /* Override Tailwind CSS styles for lists */
        ol {
            list-style: decimal;
            margin: 0;
            padding: 0;
        }
        li {
            list-style: disc;
            margin: 0;
            padding: 0;
        }
    </style>
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
  