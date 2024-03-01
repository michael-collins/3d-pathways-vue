<template>
  <div>
    <div v-for="detail in details" :key="detail.id">
      <!-- Display details here -->
      {{ detail.fields.name }}
    </div>
  </div>
</template>

<script>
import AirtableService from '../services/AirtableService.js';

export default {
  name: 'NestedAccordionComponent',
  props: ['recordId'],
  data() {
    return {
      details: [],
    };
  },
  mounted() {
    AirtableService.getLinkedRecords(this.recordId)
      .then(response => {
        this.details = response.records;
      });
  }
}
</script>
