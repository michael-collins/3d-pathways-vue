<template>
  <div class="p-3">
    <NavBar />
    <!-- Breadcrumbs -->
    <div class="navbar bg-base-100 border-b-2 border-base-300">
      <div class="text-sm breadcrumbs flex-1">
        <ul class="p-2 bg-base-100 rounded-t-none">
          <li v-if="previousPageName && previousPageUrl">
            <router-link :to="previousPageUrl" class="hover:underline">
              <svg class="h-6 w-6 text-base-content"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="5" y1="12" x2="9" y2="16" />  <line x1="5" y1="12" x2="9" y2="8" /></svg>
              {{ previousPageName }}
            </router-link>
          </li>
          <li v-if="record">
            <span class="font-semibold ml-2">{{ record.fields.name }}</span>
          </li>
          <!-- <li v-else>
            ...
          </li> -->
        </ul>
      </div>
      <div class="flex-none">
      <ToggleDarkButton />
    </div>
    </div>

    <div class="container max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
      <!-- Displaying the Name -->
      <div>
          <img v-if="record.fields.image" :src="imageUrl" class="w-full h-auto" />
          <h1 v-if="record.fields.name" class="text-5xl font-bold mt-8 mb-4">{{ record.fields.name }}</h1>
        </div>

      <div v-if="record && record.fields" :key="record.id" class="space-y-10 divide-y-4 divide-neutral">

          <!-- Displaying the Difficulty -->
        <div v-if="record.fields.difficulty" class="pb-8">
          <!-- Displaying the difficulty levels -->
          <ul class="space-x-2">
            <li v-for="level in record.fields.difficulty" :key="level" class="badge badge-outline text-xs uppercase">
              {{ level }}
            </li>
          </ul>
        </div>

      <!-- Displaying the Description -->
      <div v-if="record.fields.description">
        <h2   class="text-2xl font-semibold mb-2 text-left uppercase ">Description:</h2>
        <!-- <p v-if="record.fields.description" class="text-md p-3">{{ record.fields.description }}</p> -->
        <MarkdownRenderer :source="record.fields.description" />
      </div>
      
      <!-- Displaying the Learning Objectives -->
      <div v-if="record.fields.learningObjectives">
        <h2   class="text-2xl font-semibold mb-2 text-left uppercase mb-4">Learning Objectives:</h2>
          <MarkdownRenderer :source="record.fields.learningObjectives" />
        
      </div>

      <!-- Displaying the Instructions -->
      <div v-if="record.fields.instructions">
        <h2   class="text-2xl font-semibold mb-2 text-left uppercase mb-4">Instructions:</h2>
        <MarkdownRenderer :source="record.fields.instructions" />
    </div>

    <!-- Displaying the YouTube Playlist -->
    <div v-if="record.fields.youtubePlaylist">
        <h2   class="text-2xl font-semibold mb-2 text-left uppercase ">Tutorials:</h2>
        <p v-if="record.fields.youtubePlaylist" class="text-md p-3">
          <a :href="record.fields.youtubePlaylist" target="_blank">{{ record.fields.youtubePlaylist }}</a>
        </p>
      </div>
      <!-- Displaying the Downloads -->
      <div v-if="record.fields.downloads">
        <p  class="text-md p-3">
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
  </div>
</template>

<script>
import AirtableService from '@/services/AirtableService';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import NavBar from '@/components/NavBar';

export default {
  components: {
    'NavBar': NavBar,
    MarkdownRenderer,
  },
  data() {
    return {
      record: null,
      previousPageName: null, // Initialize previousPageName to null
      previousPageUrl: null, // Initialize previousPageUrl to null
    };
  },
  async created() {
  const exerciseId = this.$route.query.id;
  const pathwayName = this.$route.query.pathwayName;
  const pathwayPageUrl = this.$route.query.pathwayPageUrl;

  try {
    const exerciseResponse = await AirtableService.getExerciseById(exerciseId);
    this.record = exerciseResponse;

    // Assuming record.fields.image holds the image object array
    if (this.record.fields.image && this.record.fields.image.length > 0) {
      // Access the URL of the first image object in the array
      this.imageUrl = this.record.fields.image[0].url;
    }

    // Use the pathway's name for the breadcrumb
    this.previousPageName = pathwayName; // Default to 'Pathways' if pathway name is not available

    // Use the pathway page's URL for the breadcrumb if available
    this.previousPageUrl = pathwayPageUrl; // Default to '/pathways' if pathway URL is not available
  } catch (error) {
    console.error('Error fetching exercise:', error);
  }
}
};
</script>
