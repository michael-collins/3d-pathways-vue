import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
// Import Bootstrap and BootstrapVue CSS files
// import 'bootstrap/dist/css/bootstrap.css'
// import tailwind.css
import './index.css'

const app = createApp(App);

app.use(router); // Use the router

app.mount('#app');
