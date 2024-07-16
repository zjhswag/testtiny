<template>
  <editor v-model="content" :init="init" />
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue';
import {ref, watch} from 'vue';

import 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';

import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';


const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const content = ref(props.modelValue);

watch(props, (newVal) => {
  content.value = newVal.modelValue;
});
watch(content, (newVal) => {
  emit('update:modelValue', newVal);
});

const init = {
  language_url: '/tinymce/langs/zh_CN.js',
  language: 'zh_CN',
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.min.css',
  // menubar: false,
  // menu: {
  //   file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
  //   edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
  //   view: { title: 'View', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
  //   insert: { title: 'Insert', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
  //   format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
  //   tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
  //   table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' }
  // },
  removed_menuitems: 'code revisionhistory codeformat image link media addcomment pageembed codesample',
  autoresize_bottom_margin: 50,
  max_height: 2500,
  min_height: 2000,
  // height: 3000,
  toolbar_mode: 'none',
  //   upgrade
  promotion: false,
  plugins:
      'wordcount visualchars visualblocks searchreplace save quickbars preview pagebreak nonbreaking media insertdatetime importcss image  fullscreen directionality codesample code charmap link code table lists advlist anchor autolink autoresize autosave',
  toolbar:
      'undo redo fontfamily fontsize ltr rtl ' +
      'searchreplace media | outdent indent aligncenter alignleft ' +
      'alignright alignjustify lineheight underline quicklink h2 h3 blockquote numlist ' +
      'bullist table removeformat forecolor backcolor bold italic strikethrough hr link preview fullscreen',
  // content_style: 'p {margin: 5px 0; font-size: 14px}',
  font_size_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt',
  font_family_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;宋体=宋体;黑体=黑体;仿宋=仿宋;微软雅黑=微软雅黑;楷体-GB2312=楷体-GB2312',
  branding: false,
  elementpath: false,
  // skeletonScreen: true,
  resize: true,
  statusbar: true,
  license_key: 'gpl',
};
</script>
