<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
    <AccordionItem v-for="record in records" :key="record.id" :initiallyOpen="false">
      <template v-slot:header>
        <div class="navbar">
          <h2 class="font-bold flex-1 ">{{ record.fields.Name }}
          
        </h2>
        <button class="btn btn-outline flex-none uppercase text-xs" @click="navigateToRecordDetail(record.id)">
          View
          <svg class="h-5 w-5 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>        </button>
      </div>
      </template>
      <template v-slot:body>
        <div class="collapse collapse-arrow border border-base-300 my-2 font-thin text-base-content" v-for="detail in recordDetails" :key="detail.key">
          <input type="checkbox" :id="'accordion-' + detail.key + '-' + record.id" class="peer" />
          <label :for="'accordion-' + detail.key + '-' + record.id" class="collapse-title text-md font-medium">
            {{ detail.title }}
          </label>
          <div class="collapse-content text-base-content">
            <p class="text-sm font-medium pl-3 ">{{ record.fields[detail.key] }}</p>
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
