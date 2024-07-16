<template>
  <div id="app">
    <ImportBtn @content-change="setContent" :content-html="content" />
    <Editor v-model="content" />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import ImportBtn from './components/ImportBtn.vue';
import Editor from './components/Editor.vue';

const content = ref('');

function setContent(html) {
  content.value = html;
}
</script>
