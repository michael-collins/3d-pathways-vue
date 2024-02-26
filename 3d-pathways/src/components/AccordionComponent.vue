<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
    <AccordionItem v-for="record in records" :key="record.id" :initiallyOpen="true">
      <template v-slot:header>
        <div class="navbar">
          <h2 class=" flex-1">{{ record.fields.Name }}
          
        </h2>
        <button class="btn flex-none" @click="navigateToRecordDetail(record.id)">
          View
            <svg class="h-5 w-5 text-slate-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />  <line x1="10" y1="14" x2="20" y2="4" />  <polyline points="15 4 20 4 20 9" /></svg>
        </button>
      </div>
      </template>
      <template v-slot:body>
        <div class="collapse collapse-arrow border border-base-300 my-2" v-for="detail in recordDetails" :key="detail.key">
          <input type="checkbox" :id="'accordion-' + detail.key + '-' + record.id" class="peer" />
          <label :for="'accordion-' + detail.key + '-' + record.id" class="collapse-title text-md font-medium">
            {{ detail.title }}
          </label>
          <div class="collapse-content">
            <p>{{ record.fields[detail.key] }}</p>
          </div>
        </div>
      </template>
    </AccordionItem>
  </div>
</template>

<script>
import AccordionItem from './AccordionItem.vue';

export default {
  components: {
    AccordionItem,
  },
  props: ['records'],
  computed: {
    recordDetails() {
      return [
        { key: 'learning objectives', title: 'Learning Objectives' },
        { key: 'exercises', title: 'Exercises' },
        { key: 'fields of practice', title: 'Fields of Practice' },
        { key: 'examples', title: 'Examples' },
        { key: 'competencies', title: 'Competencies' },
      ];
    },
  },
  methods: {
    shouldItemBeOpen(record) {
    // Your logic here, for example:
    return record.isOpenByDefault;
  },
    navigateToRecordDetail(recordId) {
      this.$router.push({
        name: 'RecordDetail',
        params: { id: recordId },
      });
    },
  },
};
</script>
