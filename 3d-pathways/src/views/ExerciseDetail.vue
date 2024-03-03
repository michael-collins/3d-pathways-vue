<template>
  <div class="p-3">
    <!-- Breadcrumbs -->
    <div class="navbar bg-base-100 border-b-2 border-base-300">
      <div class="text-sm breadcrumbs">
        <ul class="p-2 bg-base-100 rounded-t-none">
          <li>
            <router-link to="/" class="ml-3 hover:underline">Pathways</router-link>
          </li>
          <li>
            <router-link to="/exercises" class="hover:underline">Exercises</router-link>
          </li>
          <li v-if="record">
            <span class="font-semibold">{{ record.fields.name }}</span>
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
        <img v-if="record.fields.image" :src="imageUrl" class="w-full h-auto" />
        <h1 v-if="record.fields.name" class="text-5xl font-bold">{{ record.fields.name }}</h1>

        <!-- Displaying the Description -->
        <p v-if="record.fields.description" class="text-md p-3">{{ record.fields.description }}</p>

        <!-- Displaying the Learning Objectives -->
        <p v-if="record.fields.learningObjectives" class="text-md p-3">{{ record.fields.learningObjectives }}</p>

        <!-- Displaying the Instructions -->
        <h2  v-if="record.fields.instructions" class="text-2xl font-semibold mb-2 text-left uppercase ">Instructions:</h2>
        <p v-if="record.fields.instructions" class="text-md p-3">
          <MarkdownRenderer :source="record.fields.instructions" />
        </p>


        <!-- Displaying the YouTube Playlist -->
        <h2  v-if="record.fields.youtubePlaylist" class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
        <p v-if="record.fields.youtubePlaylist" class="text-md p-3">
          <a :href="record.fields.youtubePlaylist" target="_blank">{{ record.fields.youtubePlaylist }}</a>
        </p>

        <!-- Displaying the Downloads -->
        <p v-if="record.fields.downloads" class="text-md p-3">
          <ul>
            <li v-for="download in record.fields.downloads" :key="download.id">
              <a :href="download.url">{{ download.name }}</a>
            </li>
          </ul>
        </p>
      </div>

      <div v-else class="text-center">
        <p class="text-lg">Record loading or not available...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AirtableService from '@/services/AirtableService';
import MarkdownRenderer from '@/components/MarkdownRenderer';


export default {
  components: {
    MarkdownRenderer,
  },
  data() {
    return {
      record: null,
    };
  },
  async created() {
    const exerciseId = this.$route.params.id;
    try {
      const exerciseResponse = await AirtableService.getExerciseById(exerciseId);
      this.record = exerciseResponse;

      // Assuming record.fields.image holds the image object array
      if (this.record.fields.image && this.record.fields.image.length > 0) {
        // Access the URL of the first image object in the array
        this.imageUrl = this.record.fields.image[0].url;
        console.log("Image URL:", this.imageUrl);
      }
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
