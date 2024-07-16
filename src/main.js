import { createApp } from 'vue';
import App from './App.vue';
import Editor from '@tinymce/tinymce-vue';

const app = createApp(App);

app.component('Editor', Editor);

app.mount('#app');
