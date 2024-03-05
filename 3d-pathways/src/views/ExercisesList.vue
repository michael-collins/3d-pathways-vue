<template>
  <div class="bg-base-200">
    <div class="p-3">
      <NavBar />
    </div>
    <LinkedCardComponent :records="records" destination="ExerciseDetail" />
    <div v-if="!records.length" class="text-center text-lg mt-6">Loading...</div>
  </div>
</template>

<script>
import LinkedCardComponent from '@/components/LinkedCardComponent.vue';
import AirtableService from '@/services/AirtableService';
import NavBar from '@/components/NavBar';

export default {
  components: {
    'LinkedCardComponent': LinkedCardComponent,
    'NavBar': NavBar
  },
  data() {
    return {
      records: [],
    };
  },
  mounted() {
  // Fetch exercise records
  AirtableService.getExerciseRecords()
    .then(data => {
      console.log('Fetched exercise records:', data);
      // Map the fetched records to the format expected by LinkedCardComponent
      this.records = data.records.map(record => ({
        id: record.id,
        name: record.fields.name,
        description: record.fields.description,
      }));
      console.log('Mapped records:', this.records);
    })
    .catch(error => {
      console.error('Error fetching exercise records:', error);
    });
},
  methods: {
    navigateToExerciseDetail(exerciseId, exerciseName) {
      // Pass the exercise ID and name as query parameters when navigating
      this.$router.push({
        name: 'ExerciseDetail',
        query: {
          id: exerciseId,
          name: exerciseName,
        },
      });
    },
  },
};
</script>
