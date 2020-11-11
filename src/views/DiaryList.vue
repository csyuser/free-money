<template>
  <div class="diaryList">
    <Nav :navTitle="navTitle" icon-name="ellipsis">
      <div class="main">
        <van-search class="search" v-model="search" placeholder="请输入搜索关键词"/>
        <ul class="diaries" v-for="diary in diaries" :key="diary.Id" @click="toDiary(diary.Id)">
          <li class="title">{{ diary.Title }}</li>
          <li class="content">{{ diary.Content }}</li>
          <li class="time">{{ formatTime(diary.CreateTime) }}</li>
        </ul>
      </div>
    </Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import dayjs from 'dayjs'

export default {
  name: 'DialogList',
  components: {Nav},
  data() {
    return {
      search: '',
      navTitle:'日记',
      diaries: []
    }
  },
  mounted() {
    console.log(dayjs())
    this.$store.commit('fetch')
    this.axios.get('/api/notebook/list',{
      params:{token:this.$store.state.token}
    }).then(res=>{
      console.log(res)
      if (res.data['Code']===0){
        this.diaries = res.data['Res']
        console.log(this.diaries)
      }else {this.$toast.fail(res.data['Msg'])}
    })
    .catch()
  },
  methods:{
    toDiary(diaryId){
      this.$router.push({ name: 'DiaryContent', params: { diaryId }})
    },
    formatTime(str){
      const now = dayjs()
      if (dayjs(str).isSame(now,'day')){
        return '今天'
      }else if (dayjs(str).isSame((now.subtract(2,'day')),'day')){
        return '昨天'
      }else {
        return dayjs(str).format('YYYY-M-D');
      }
    }
  }
}
</script>

<style scoped lang="scss">
$radius: 4px;
$mainPadding: 2rem;
.diaryList {
  height: 100%;
}
.main {
  > .search {
    padding: 1rem $mainPadding 0;

    > .van-search__content {
      border-radius: $radius;
    }
  }

  > .diaries {
    padding: 2rem 2rem 0;

    > .title {
      color: #333333;
      font-size: 1.4rem;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    > .content {
      line-height: 2rem;
      color: #929292;
      font-size: 1.2rem;
      padding: 1.2rem 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    > .time {
      color: #929292;
      font-size: 1.2rem;
      line-height: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e6e6e6;
    }
  }
}

</style>