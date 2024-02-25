<template>
      <!-- <div class="collapse collapse-arrow text-secondary-content bg-secondary">
        <input type="checkbox" id="accordion-" class="peer" />
        <div class="collapse-title text-xl font-medium peer-checked:bg-secondary peer-checked:text-secondary-content">
          Name of field
        </div>
        <div class="collapse-content peer-checked:bg-secondary peer-checked:text-primary-content"> 
          <p>Learning Objectives: stuff</p>
          <p>Exercises: stuff</p>
          <p>Fields of Practice: </p>
          <p>Examples: </p>
          <p>Competencies: </p>
        </div>
      </div> -->

  <!-- grid container for cards -->
  <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
    <div class="flex flex-col p-3 border rounded-lg border-base-300 bg-base-200">


        
        <div v-for="record in records" :key="record.id" class="flex flex-col p-3 border rounded-lg border-base-300 bg-base-200">
          <div class="text-base-content text-xl p-2">
            <div @click="navigateToRecordDetail(record.id)" class="cursor-pointer">
            {{ record.fields.Name }}
            </div>
          </div>
          <div class="join join-vertical w-full">
          <div class="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" :id="'accordion-learning-objectives' + record.id" class="peer" />
            <div class="collapse-title text-md font-medium ">
              Learning Objectives
            </div>
            <div class="collapse-content"> 
              <p>{{ record.fields['learning objectives'] }}</p>
              
            </div>
          </div>
          <div class="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" :id="'accordion-exercises' + record.id" class="peer" />
            <div class="collapse-title text-md font-medium ">
              Exercises
            </div>
            <div class="collapse-content"> 
              <p>{{ record.fields.exercises }}</p>
              
            </div>
          </div>
          <div class="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" :id="'accordion-learning-fields-of-practice' + record.id" class="peer" />
            <div class="collapse-title text-md font-medium ">
              Fields of Practice
            </div>
            <div class="collapse-content"> 
              <p>{{ record.fields['fields of practice'] }}</p>
              
            </div>
          </div>
          <div class="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" :id="'accordion-learning-examples' + record.id" class="peer" />
            <div class="collapse-title text-md font-medium ">
              Examples
            </div>
            <div class="collapse-content"> 
              <p>{{ record.fields.examples }}</p>
              
            </div>
          </div>
          <div class="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" :id="'accordion-learning-competencies' + record.id" class="peer" />
            <div class="collapse-title text-md font-medium ">
              Competencies
            </div>
            <div class="collapse-content"> 
              <p>{{ record.fields.competencies }}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
          
          
          

  </template>
  
  <script>
  import AirtableService from '@/services/AirtableService';
  
  export default {
    props: ['recordDetails'],
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
      Name: 'Test Record Name',
      'learning objectives': 'Test learning objectives',
      exercises: 'Test exercises',
      'fields of practice': 'Test fields of practice',
      examples: 'Test examples',
      competencies: 'Test competencies',
    },
  };

  // Prepend the test record to the records array
  this.records.push(testRecord);
      AirtableService.getRecords().then(data => {
        this.records = data.records;
      }).catch(error => console.error(error));
    },
    methods: {
      navigateToRecordDetail(recordId) {
      this.$router.push({ name: 'RecordDetail', params: { id: recordId } });
      },
      toggle(id) {
        this.activeId = this.activeId === id ? null : id;
      }
    }
  };
  </script>
  