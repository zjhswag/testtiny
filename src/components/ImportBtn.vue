<template>
  <div style="padding: 8px">
    <Space>
<!--      <Upload v-bind="uploadProps">-->
<!--        <Button>导入markdown</Button>-->
<!--      </Upload>-->
      <Upload v-bind="wordUploadProps">
        <Button>导入word(仅docx)</Button>
      </Upload>
      <Button @click="handleExportMD">导出markdown</Button>
      <Button @click="handleExportWord">导出word</Button>
    </Space>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button, Space, Upload } from "ant-design-vue";
import { marked } from "marked";
import Mammoth from "mammoth";
import { saveAs } from "file-saver";
import { asBlob } from "html-docx-js-typescript";
import htmlToMd from "html-to-md";

const props = defineProps({
  contentHtml: String,
  onContentChange: Function,
});

const uploadProps = {
  name: 'file',
  showUploadList: false,
  maxCount: 1,
  beforeUpload(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (result) => {
      const targetNum = result.target.result;
      const html = marked(targetNum, { highlight: (code) => require('/public/js/highlight.min.js').highlightAuto(code).value });
      props.onContentChange(html);
    };
    return false;
  },
};

const options = {
  styleMap: [
    "p[style-name='Section Title'] => h1:fresh",
    "p[style-name='Subsection Title'] => h2:fresh",
    "r[style-name='Red Text'] => span.red-text:fresh",
    "b => strong",
    "i => em",
    "u => span.underline",
    "strike => del",
    "highlight => mark",
  ]
};

const wordUploadProps = {
  name: 'file',
  showUploadList: false,
  maxCount: 1,
  beforeUpload(file) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const arrayBuffer = reader.result;
      Mammoth.convertToHtml({ arrayBuffer: arrayBuffer },options).then((resultObject) => {
        setTimeout(() => {
          const content = resultObject.value;
          // const styledContent = content.replace(/<span class="red-text">/g, '<span style="color:red;">');
          props.onContentChange(content);
        }, 100);
      });
    };
    reader.readAsArrayBuffer(file);
    return false;
  },
};

function handleExportMD() {
  const markdown = htmlToMd(props.contentHtml);
  const blob = new Blob([markdown]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'markdown.md';
  a.click();
}


function handleExportWord() {
  asBlob(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
    ${props.contentHtml}
    </body>
    </html>`).then((data) => {
    saveAs(data, '导出的文档.docx');
  });
}
</script>
<style>
.red-text {
  color: red;
}
.underline {
  text-decoration: underline;
}
</style>