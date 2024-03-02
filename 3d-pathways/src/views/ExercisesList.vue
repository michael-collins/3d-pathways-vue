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
            <span class="no-underline">Exercises</span>
          </li>
        </ul>
      </div>
    </div>
    <h1>Exercises List</h1>
    <!-- <card-component card-component :records="records"></card-component> -->
    <!-- <accordion-component accordion-component :records="records"></accordion-component> -->
  </div>
</template>

<script>
// import AccordionComponent from '@/components/AccordionComponent.vue';
// import CardComponent from '@/components/CardComponent.vue';
import AirtableService from '@/services/AirtableService';

export default {
  components: {
    // 'card-component': CardComponent,
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
  
