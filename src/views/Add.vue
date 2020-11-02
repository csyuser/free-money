<template>
  <div class="add">
    <Nav navTitle="添加日记">
      <Editor :init="init"></Editor>
    </Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'Add',
  components: {Nav,Editor},
  data(){
    return{
      init: {
        branding: false,
        // minHeight: 300,
        selector: 'textarea',
        mobile: {
          menubar: true,
          theme: 'mobile',
          plugins: 'autosave lists autolink',
          toolbar: 'undo bold italic styleselect'
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
.add {
  height: 100%;
}
</style>