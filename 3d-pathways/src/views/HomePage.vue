<template>
  <div>
    <card-component card-component :records="records"></card-component>
    <!-- <accordion-component accordion-component :records="records"></accordion-component> -->
  </div>
</template>

<script>
// import AccordionComponent from '@/components/AccordionComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import AirtableService from '@/services/AirtableService';

export default {
  components: {
    'card-component': CardComponent,
    // 'accordion-component': AccordionComponent
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
        name: 'Test Record Name',
        'learning objectives': 'Test learning objectives',
        exercises: 'Test exercises',
        roles: 'A roles, a second role',
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
  
