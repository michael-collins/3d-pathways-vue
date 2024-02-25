<template>
    <div>
      <h1>{{ record.fields.Name }}</h1>
    <p>{{ record.fields.Description }}</p>
    </div>
  </template>
  
  <script>
  import AirtableService from '@/services/AirtableService';
  
  export default {
    data() {
      return {
        record: {},
      };
    },
    async mounted() {
      const recordId = this.$route.params.id;
      const data = await AirtableService.getRecordById(recordId);
      this.record = data;
    },
  };
  </script>