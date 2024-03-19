<template>
    <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption" @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
</template>
​
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
            content: '<h2>I am Example</h2>',
            editorOption: [
                ['bold', 'italic', 'underline', 'strike'], // 字体
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }], // 样式标题
                // eslint-disable-next-line standard/object-curly-even-spacing
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                // eslint-disable-next-line standard/object-curly-even-spacing
                [{ 'script': 'sub' }, { 'script': 'super' }], // 下标、上标
                // eslint-disable-next-line standard/object-curly-even-spacing
                [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
                [{ 'direction': 'rtl' }],

                [{ 'size': ['small', false, 'large', 'huge'] }], // 字体
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'] // 格式清除
            ]
        }
    },
    methods: {
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    mounted() {
        console.log('this is current quill instance object', this.editor)
    }
}
</script>