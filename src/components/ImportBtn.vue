<template>
  <div style="padding: 8px">
    <Space>
<!--      <Upload v-bind="wordUploadProps">-->
<!--        <Button>导入word(仅docx)</Button>-->
<!--      </Upload>-->
      <Upload v-bind="docxUploadProps">
        <Button>导入Word(仅docx)</Button>
      </Upload>
      <Upload v-bind="previewUploadProps">
        <Button>仅预览docx</Button>
      </Upload>
<!--      <Button @click="handleExportMD">导出markdown</Button>-->
      <Button @click="handleExportWord">导出word</Button>
    </Space>
    <div id="preview-container" style="margin-top: 20px;"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button, Space, Upload } from "ant-design-vue";
import { marked } from "marked";
import Mammoth from "mammoth/mammoth.browser.min.js";
import { saveAs } from "file-saver";
import { asBlob } from "html-docx-js-typescript";
import htmlToMd from "html-to-md";
import { renderAsync } from "docx-preview";

const props = defineProps({
  contentHtml: String,
  onContentChange: Function,
});

// const options = {
//   styleMap: [
//     "p[style-name='Centered'] => p:fresh => p { text-align: center }",
//     "p[style-name='Section Title'] => h1:fresh",
//     "p[style-name='Subsection Title'] => h2:fresh",
//     "r[style-name='Red Text'] => span.red-text:fresh",
//     "b => strong",
//     "i => em",
//     "u => span.underline",
//     "strike => del",
//     "highlight => mark"
//   ]
// };

// const wordUploadProps = {
//   name: 'file',
//   showUploadList: false,
//   maxCount: 1,
//   beforeUpload(file) {
//     const reader = new FileReader();
//     reader.onloadend = function () {
//       const arrayBuffer = reader.result;
//
//       Mammoth.convertToHtml({arrayBuffer: arrayBuffer}, options).then((resultObject) => {
//         console.log(resultObject.messages); // 输出转换过程中的消息，包括样式信息
//         setTimeout(() => {
//           const content = resultObject.value;
//           props.onContentChange(content);
//         }, 100);
//       });
//     };
//     reader.readAsArrayBuffer(file);
//     return false;
//   },
// };

const docxUploadProps = {
  name: 'file',
  showUploadList: false,
  maxCount: 1,
  beforeUpload(file) {
    const reader = new FileReader();
    reader.onloadend = async function () {
      const previewContainer = document.getElementById('preview-container');
      previewContainer.innerHTML = '';
      const arrayBuffer = reader.result;

      try {
        const container = document.createElement('div');
        container.innerHTML = '';
        const options = {
          renderComments: false,
          className: "docx",
          inWrapper: false,
          ignoreWidth: true,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: false,
          ignoreLastRenderedPageBreak: true,
          experimental: true,
          trimXmlDeclaration: true,
          useBase64URL: false,
          renderChanges: true,
          renderHeaders: true,
          renderFooters: false,
          renderFootnotes: false,
          renderEndnotes: true,
          debug: false
        };
        await renderAsync(arrayBuffer, container, null, options);
        const content = container.innerHTML;
        props.onContentChange(content);
      } catch (error) {
        console.error("Error rendering DOCX:", error);
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  },
};

const previewUploadProps = {
  name: 'file',
  showUploadList: false,
  maxCount: 1,
  beforeUpload(file) {
    const reader = new FileReader();
    reader.onloadend = async function () {
      const arrayBuffer = reader.result;

      try {
        const container = document.getElementById('preview-container');
        container.innerHTML = ''; // 清空之前的预览内容

        const options = {
          renderComments: true,
          className: "docx",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          experimental: true,
          trimXmlDeclaration: true,
          useBase64URL: false,
          renderChanges: false,
          renderHeaders: true,
          renderFooters: false,
          renderFootnotes: true,
          renderEndnotes: true,
          debug: false,
        };
        await renderAsync(arrayBuffer, container, null, options);
      } catch (error) {
        console.error("Error rendering DOCX:", error);
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  },
};

// function handleExportMD() {
//   const markdown = htmlToMd(props.contentHtml);
//   const blob = new Blob([markdown]);
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'markdown.md';
//   a.click();
// }

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

<!--<style>-->
<!--.red-text {-->
<!--  color: red;-->
<!--}-->

<!--.underline {-->
<!--  text-decoration: underline;-->
<!--}-->
<!--</style>-->
