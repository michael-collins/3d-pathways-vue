<template>
  <div class="container p-3">


      <div class="navbar bg-base-100">
        <div class=" text-sm breadcrumbs">
          <ul class="p-2 bg-base-100 rounded-t-none">
            <li class="btn" @click="navigateToHomePage">
              <svg class="h-5 w-5 text-primary"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg>
            Back
            </li>
            <li v-if="record">
              {{ record.fields.Name }}
            </li>
            <li v-else>
              ...
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <hr>
    <div class="container p-3">
    <div v-if="record && record.fields" :key="record.id">
      {{ console.log('Rendering record fields', record.fields) }}
      <!-- Displaying the Name -->
      <h1 v-if="record.fields.Name">{{ record.fields.Name }}</h1>

      <!-- Displaying the Description -->
      <p v-if="record.fields.description">{{ record.fields.description }}</p>

      <!-- Displaying Learning Objectives -->
      <!-- Check if 'learning objectives' exists before displaying -->
      <p v-if="record.fields['learning objectives']">{{ record.fields['learning objectives'] }}</p>

      <!-- Displaying Examples -->
      <!-- Check if 'examples' exists before displaying -->
      <p v-if="record.fields.examples">{{ record.fields.examples }}</p>

      <!-- Displaying Competencies -->
      <!-- Assuming competencies are an array. Check if it exists and is non-empty before iterating -->
      <div v-if="record.fields.competencies && record.fields.competencies.length">
        <div v-for="(competency, index) in record.fields.competencies" :key="'competency-' + index">
          <p>{{ competency }}</p>
        </div>
      </div>

      <!-- Displaying Exercises -->
      <!-- Assuming exercises are an array. Check if it exists and is non-empty before iterating -->
      <div v-if="record.fields.exercises && record.fields.exercises.length">
        <div v-for="(exercise, index) in record.fields.exercises" :key="'exercise-' + index">
          <p>{{ exercise }}</p>
    </div>
  </div>
</div>
<div v-else>
  <!-- Fallback content or loading message -->
  <p>Record loading or not available...</p>
</div>
</div>

</template>

<script>
import AirtableService from '@/services/AirtableService';

export default {
  // props: ['record'], // Define the prop to accept the record data passed from HomePage.vue
  // mounted() {
  // },
  methods: {
    navigateToHomePage() {
      // Navigate back to the homepage view
      this.$router.push({ name: 'HomePage' });
    }
  },
  
  // data() {
  //   return {
  //     record: null,
  //   };
  // },
  data() {
  return {
    record: null, // Initialize record to null
  };
},
  async created() {
  const recordId = this.$route.params.id;
  console.log('Fetching record with ID:', recordId);
  try {
    const response = await AirtableService.getRecordById(recordId);
    console.log('Response from getRecordById:', response);
    // Directly assign the fetched response to this.record
    this.record = response; // Corrected assignment
    console.log('Fetched record:', this.record);
  } catch (error) {
    console.error('Error fetching record:', error);
  }
},
};
</script>
