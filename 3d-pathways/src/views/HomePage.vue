<template>
  <div>
    <accordion-component :record="record" v-for="record in records" :key="record.id"></accordion-component>
  </div>
</template>

<script>
import AccordionComponent from '@/components/AccordionComponent.vue'; // Adjust the path as necessary
  import AirtableService from '@/services/AirtableService';
  
  export default {
    props: ['recordDetails'],
    components: {
    'accordion-component': AccordionComponent // This registers AccordionComponent for use in the template
  },
    data() {
      return {
        records: [],
        activeId: null,
      };
    },
    mounted() {
      // Temporary test record
  const testRecord = {
    id: 'testRecord',
    fields: {
      Name: 'Test Record Name',
      'learning objectives': 'Test learning objectives',
      exercises: 'Test exercises',
      'fields of practice': 'Test fields of practice',
      examples: 'Test examples',
      competencies: 'Test competencies',
    },
  };

  // Prepend the test record to the records array
  this.records.push(testRecord);
      AirtableService.getRecords().then(data => {
        this.records = data.records;
      }).catch(error => console.error(error));
    },
    methods: {
      navigateToRecordDetail(recordId) {
      this.$router.push({ name: 'RecordDetail', params: { id: recordId } });
      },
      toggle(id) {
        this.activeId = this.activeId === id ? null : id;
      }
    }
  };
  </script>
  
