<template>
  <div class=" p-3">
    <!-- Breadcrumbs -->
    <div class="navbar bg-base-100 border-b-2 border-base-300">
      <div class=" text-sm breadcrumbs">
        <ul class="p-2 bg-base-100 rounded-t-none">
          <li >
            <svg class="h-5 w-5 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="4" />  <line x1="1.05" y1="12" x2="7" y2="12" />  <line x1="17.01" y1="12" x2="22.96" y2="12" /></svg>
          <span @click="navigateToHomePage" class="ml-3 hover:underline no-underline cursor-pointer">Pathways</span>
          </li>
          <li v-if="record">
            {{ record.fields.name }}
          </li>
          <li v-else>
            ...
          </li>
        </ul>
      </div>
    </div>
  </div>
    
  <div class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
    <div v-if="record && record.fields" :key="record.id" class="space-y-6">
      <!-- Displaying the Name -->
      <h1 v-if="record.fields.name" class="text-5xl font-bold">
        {{ record.fields.name }}
      </h1>

      <!-- Displaying the Description -->
      <p v-if="record.fields.description" class="text-md p-3">
        {{ record.fields.description }}
      </p>

      <!-- Displaying Learning Objectives -->
      <!-- <div v-if="record.fields['learning objectives']" class="">
        <h2 class="text-2xl font-semibold uppercase">Learning Objectives:</h2>
        <p>{{ record.fields['learning objectives'] }}</p>
      </div> -->
      
      <!-- Displaying (roles) Fields of Practice -->
      <div v-if="record.fields.roles && record.fields.roles.length" class="py-8">
        <h2 class="text-2xl font-semibold mb-2 text-center uppercase ">Fields of practice:</h2>
        <ul class="text-center">
          <li v-for="(role, index) in record.fields.roles" :key="index" class="badge badge-primary p-3 m-1">
            {{ role }}
          </li>
        </ul>
      </div>

      
      <!-- Displaying Exercises -->
      <div v-if="record.fields.exerciseDetails && record.fields.exerciseDetails.length" class="py-8">
          <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Exercises:</h2>
          
          <div class="space-y-3">
            <div v-for="(exerciseDetail, index) in record.fields.exerciseDetails" :key="'exerciseDetail-' + index" class="p-4 bg-base-200 rounded-box">
              <h3 class="text-lg font-semibold normal-case">{{ exerciseDetail.name }}</h3>
              <p class="text-sm p-3">{{ exerciseDetail.description }}</p>
              <a class="btn" @click="navigateToExerciseDetail(exerciseDetail.id)">View</a>
              <div v-if="exerciseDetail.difficulty && exerciseDetail.difficulty.length" class="pt-8">
                <ul class="">
                  <li v-for="(difficulty, index) in exerciseDetail.difficulty" :key="index" class="badge badge-outline text-xs m-1 uppercase">
                    {{ difficulty }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      <!-- Displaying Competencies -->
      <div v-if="record.fields.competencyDetails && record.fields.competencyDetails.length" class="py-8">
        <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Competencies:</h2>
        <div class="space-y-4">
          <div v-for="(competencyDetail, index) in record.fields.competencyDetails" :key="'competencyDetail-' + index" class="bg-base-200 p-4 rounded-lg">
            <h3 class="text-lg font-medium normal-case">{{ competencyDetail.name }}</h3>
            <p class="p-3">{{ competencyDetail.description }}</p>
            <div class="p-3" v-html="competencyDetail.references"></div>
          </div>
        </div>
      </div>

      <!-- Displaying Examples -->
      <div v-if="record.fields.examples" class="">
        <h2 class="text-2xl font-semibold uppercase text-center">Examples:</h2>
        <div class="p-3" v-html="record.fields.examples"></div>
      </div>

    </div>
    <div v-else class="text-center">
      <p class="text-lg ">Record loading or not available...</p>
    </div>

  </div>
</template>

<script>
import AirtableService from '@/services/AirtableService';

export default {
  data() {
    return {
      record: null, // Initialize record to null
    };
  },
  async created() {
    const recordId = this.$route.params.id;
    console.log("Exercise ID from route:", this.$route.params.id);
    try {
      // Fetch the main record
      const recordResponse = await AirtableService.getRecordById(recordId);
      this.record = recordResponse;

      // Check if there are exercises to fetch details for
      if (this.record.fields.exercises && this.record.fields.exercises.length > 0) {
        // Fetch details for each exercise
        const exercisePromises = this.record.fields.exercises.map(exerciseId =>
          AirtableService.getExerciseById(exerciseId)
        );
        const exerciseDetails = await Promise.all(exercisePromises);

        // Store fetched exercise details in a new property
        // Note: Adjust access based on the actual structure of your response
        this.record.fields.exerciseDetails = exerciseDetails.map(ex => ({
          id: ex.id, // Keep the ID
          ...ex.fields // Spread the fields
        }));
      }
      
    // Fetch details for each competency
    if (this.record.fields.competencies && this.record.fields.competencies.length > 0) {
      const competencyDetailsPromises = this.record.fields.competencies.map(competencyId =>
        AirtableService.getCompetencyById(competencyId)
      );
      const competencies = await Promise.all(competencyDetailsPromises);

      // Store fetched competency details with pathway info
      this.record.fields.competencyDetails = competencies.map(c => c.fields);
    }
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  },
  methods: {
    navigateToHomePage() {
      this.$router.push({ name: 'HomePage' });
    },
    navigateToPathwayDetail(recordId) {
    this.$router.push({ name: 'PathwayDetail', params: { id: recordId } });
    },
    navigateToExerciseDetail(exerciseId) {
      console.log("Navigating to Exercise Detail with ID:", exerciseId);
      this.$router.push({ name: 'ExerciseDetail', params: { id: exerciseId } });
    }
  },
};
</script>
