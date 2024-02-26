<template>
  <div>
    <accordion-component accordion-component :records="records"></accordion-component>
  </div>
</template>

<script>
import AccordionComponent from '@/components/AccordionComponent.vue';
import AirtableService from '@/services/AirtableService';

export default {
  components: {
    'accordion-component': AccordionComponent
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

    AirtableService.getRecords().then(data => {
      this.records = data.records;
    }).catch(error => console.error(error));
    // Prepend the test record to the records array
    this.records.push(testRecord);
  },
  
  // methods: {
  //   navigateToRecordDetail(recordId) {
      // this.$router.push({ name: 'RecordDetail', params: { id: recordId }, props: { records: this.records } });    },
  //   toggle(id) {
  //     this.activeId = this.activeId === id ? null : id;
  //   }
  // }
};
</script>
  
