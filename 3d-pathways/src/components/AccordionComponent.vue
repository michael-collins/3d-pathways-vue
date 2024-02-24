<template>
    <div>
      <div v-for="record in records" :key="record.id" class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" @click="toggle(record.id)">
            {{ record.fields.Name }}
          </button>
        </h2>
        <div v-if="activeId === record.id" class="accordion-collapse">
          <div class="accordion-body">
            <p>Learning Objectives: {{ record.fields['learning objectives'] }}</p>
            <p>Exercises: {{ record.fields.exercises }}</p>
            <p>Fields of Practice: {{ record.fields['fields of practice'] }}</p>
            <p>Examples: {{ record.fields.examples }}</p>
            <p>Competencies: {{ record.fields.competencies }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AirtableService from '@/services/AirtableService';
  
  export default {
    data() {
      return {
        records: [],
        activeId: null,
      };
    },
    mounted() {
      AirtableService.getRecords().then(data => {
        this.records = data.records;
      }).catch(error => console.error(error));
    },
    methods: {
      toggle(id) {
        this.activeId = this.activeId === id ? null : id;
      }
    }
  };
  </script>
  