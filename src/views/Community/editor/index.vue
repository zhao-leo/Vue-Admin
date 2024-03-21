<template>
  <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)" @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: `<p>这是 vue-quill-editor 的内容！</p>`,
      editorOption: {}
    }
  },
  methods: {
    onEditorBlur() { }, // 失去焦点触发事件
    onEditorFocus() { }, // 获得焦点触发事件
    onEditorChange() { } // 内容改变触发事件
  }
}
</script>
