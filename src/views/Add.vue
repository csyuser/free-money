<template>
  <div class="add">
    <Nav navTitle="添加日记" iconName="save" @navIconClicked="save">
      <van-form>
        <van-field
            v-model="diaryInfo.title"
            name="标题"
            placeholder="标题"
            :rules="[{ required: true, message: '请填写标题' }]"
        />
        <van-field readonly clickable name="picker" :value="diaryInfo.tagTitle" placeholder="点击选择标签"
            @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="selectTag" @cancel="showPicker = false"/>
        </van-popup>
        <van-field type="textarea" v-model="diaryInfo.content" name="内容" placeholder="内容"
        />
      </van-form>
    </Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav'


export default {
  name: 'Add',
  components: {Nav},
  data(){
    return{
      diaryInfo:{
        title:'',
        content:'',
        tagTitle:'',
        tagIds:'',
        id:''
      },
      columns:[],
      showPicker: false,
    }
  },
  mounted() {
    this.axios.get('/tag/list').then(res => {
      if (res.data['Code'] === 0) {
        res.data['Res'].sort((a, b) => a.Type - b.Type)
        const result = []
        res.data['Res'].forEach(item=>{
          result.push({text:item['Title'],id:item['Id']})
        })
        this.columns = result
      } else {this.$toast.fail(res.data['Msg'])}
    })
        .catch()
    if (this.$route.params.diaryId !== '0'){
      this.axios.get( 'notebook/detail', {
        params: {
          id: this.$route.params.diaryId,
        }
      }).then(res => {
        if (res.data['Code'] === 0) {
          this.diaryInfo.title = res.data['Res'].Title
          this.diaryInfo.content = res.data['Res'].Content
          this.diaryInfo.id = res.data['Res'].Id
        } else {
          this.$toast.fail(res.data['Msg'])
        }
      })
          .catch()
    }
  },
  methods:{
    save() {
      if (this.diaryInfo.id !== ''){
        this.axios.post('notebook/update',{...this.diaryInfo})
            .then(res=>{
              if (res.data['Code'] === 0){this.$toast.success('保存成功')}
              else{this.$toast.fail(res.data['Msg'])}
            })
            .catch()
      }else {
        this.axios.post('notebook/create',{...this.diaryInfo})
            .then(res=>{
              if (res.data['Code'] === 0){this.$toast.success('创建成功')}
              else{this.$toast.fail(res.data['Msg'])}
            })
            .catch()
      }
    },
    selectTag(value) {
      this.diaryInfo.tagTitle = value.text;
      this.diaryInfo.tagIds = value.id;
      this.showPicker = false;
    },
  }
}
</script>

<style scoped lang="scss">
.add {
  height: 100%;
}
</style>