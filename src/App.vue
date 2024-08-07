<template>
  <div id="app" class="editor-container">
    <div class="toolbar">
      <ImportBtn @content-change="setContent" :content-html="content" />
    </div>
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

<style>
.editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.toolbar {
  margin-bottom: 10px;
}
</style>
