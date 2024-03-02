<template>
    <!-- Card Section -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <!-- Grid -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        <!-- Card -->
        <a @click="navigateToRecordDetail(record.id)" v-for="record in records" :key="record.id" class="group flex flex-col bg-base-100 border shadow-sm rounded-xl hover:shadow-md transition min-h-32" href="#">
          <div class="p-4 md:p-5">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="group-hover:text-primary font-semibold">
                  {{ record.fields.name }}
                </h3>
                <p class="group-hover:text-primary text-sm">
                  {{ record.fields.description }}
                </p>
              </div>
              <!-- <button class="btn btn-ghost hover:btn-outline flex-none uppercase text-xs" >
                View
                <svg class="h-5 w-5 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
              </button> -->
            </div>
          </div>
        </a>
        <!-- End Card -->
  </div>
  <!-- End Grid -->
</div>
<!-- End Card Section -->

  </template>
  
  <script>
  
  export default {
    components: {
    },
    props: ['records'],
    // computed: {
    //   recordDetails() {
    //     return [
    //       { key: 'learning objectives', title: 'Learning Objectives' },
    //       { key: 'exercises', title: 'Exercises' },
    //       { key: 'roles', title: 'Fields of Practice' },
    //       { key: 'examples', title: 'Examples' },
    //       { key: 'competencies', title: 'Competencies' },
    //     ];
    //   },
    // },
    methods: {
      
      navigateToRecordDetail(recordId) {
        this.$router.push({
          name: 'PathwayDetail',
          params: { id: recordId },
        });
      },
    },
  };
  </script>
  
  
  