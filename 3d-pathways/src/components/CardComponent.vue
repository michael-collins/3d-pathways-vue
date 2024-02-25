<template>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">{{ record.fields.Name }}</h5>
            <p class="card-text">{{ record.fields.Description }}</p>
          </div>
          <div class="col-md-6">
            <AccordionComponent :recordDetails="record"></AccordionComponent>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
   import AccordionComponent from '@/components/AccordionComponent';
  export default {
    props: ['record'],
    components: {
     AccordionComponent
  }
  };
  </script>
  