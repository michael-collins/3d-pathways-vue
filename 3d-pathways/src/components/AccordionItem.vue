<template>
    <div :class="['flex flex-col p-3 border rounded-lg border-base-300 bg-base-200', { 'collapse-open': isOpen }]">
      <div @click="toggle" class="cursor-pointer collapse-plus text-base-content text-xl p-2">
        <slot name="header"></slot>
      </div>
      <div v-show="isOpen" class="join join-vertical w-full m-2">
        <slot name="body"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      // Prop to control the initial or direct state of the accordion item
      initiallyOpen: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // Use the prop to set the initial state
        isOpen: this.initiallyOpen,
      };
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  