<template>
  <div class="p-3">
    <!-- Breadcrumbs -->
    <div class="navbar bg-base-100 border-b-2 border-base-300">
      <div class="text-sm breadcrumbs">
        <ul class="p-2 bg-base-100 rounded-t-none">
          <li >
            <svg class="h-5 w-5 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="4" />  <line x1="1.05" y1="12" x2="7" y2="12" />  <line x1="17.01" y1="12" x2="22.96" y2="12" /></svg>
          <span @click="navigateToHomePage" class="ml-3 hover:underline no-underline cursor-pointer">Pathways</span>
          </li>
          <li>
            <span @click="navigateToExercisesList" class="hover:underline no-underline cursor-pointer">Exercises</span>
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

        <!-- Displaying Roles (Fields of Practice) -->
        <div v-if="record.fields.roles && record.fields.roles.length" class="py-8">
          <h2 class="text-2xl font-semibold mb-2 text-center uppercase">Fields of practice:</h2>
          <ul class="text-center">
            <li v-for="(role, index) in record.fields.roles" :key="index" class="badge badge-primary p-3 m-1">
              {{ role }}
            </li>
          </ul>
        </div>

        <!-- Displaying Examples -->
        <div v-if="record.fields.examples" class="">
          <h2 class="text-2xl font-semibold uppercase text-center">Examples:</h2>
          <div class="p-3" v-html="record.fields.examples"></div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg">Record loading or not available...</p>
      </div>
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
  const exerciseId = this.$route.params.id;
  try {
    const exerciseResponse = await AirtableService.getExerciseById(exerciseId);
    // Assuming exerciseResponse correctly unpacks to the expected format
    this.record = exerciseResponse; // Adjust based on your data structure
    console.log("Processed Record:", this.record); // Log the processed record
  } catch (error) {
    console.error('Error fetching exercise:', error);
  }
},
  methods: {
    navigateToHomePage() {
      this.$router.push({ name: 'HomePage' });
    },
    navigateToExercisesList() {
      this.$router.push({ name: 'ExercisesList' });
    },
  },
};
</script>
