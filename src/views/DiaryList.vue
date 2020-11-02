<template>
  <div class="diaryList">
    <Nav :navTitle="navTitle" icon-name="ellipsis">
      <div class="main">
        <van-search class="search" v-model="search" placeholder="请输入搜索关键词"/>
        <ul class="diaries" v-for="diary in diaries" :key="diary.id" @click="toDiary(diary.id)">
          <li class="title">{{ diary.title }}</li>
          <li class="content">{{ diary.content }}</li>
          <li class="time">{{ diary.time }}</li>
        </ul>
      </div>
    </Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'DialogList',
  components: {Nav},
  data() {
    return {
      search: '',
      navTitle:'日记',
      diaries: [
        {
          id: '1',
          title: '标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1',
          content: '你好好你好你好你好你好你好你好你你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
          time: '2020-10-26'
        },
        {
          id: '2',
          title: 'title2',
          content: 'content content content content content content content content content content11111 content content content content content content content ',
          time: '2020-10-26'
        },
        {
          id: '3',
          title: 'title3',
          content: 'content content1111 content content content content content content content content content content content content content content content ',
          time: '2020-10-26'
        },
        {
          id: '4',
          title: 'title4',
          content: 'content content content content content1111 content content content content content content content content content content content content ',
          time: '2020-10-26'
        },
        {
          id: '5',
          title: 'title5',
          content: 'Applications can access and display feature layers that are hosted onArcGIS OnlineorArcGIS Enterprise. A hosted feature layer contains features (records) with a geometry and a set of attributes. Each hosted feature layer has ',
          time: '2020-10-26'
        },
      ]
    }
  },
  methods:{
    toDiary(diaryId){
      this.$router.push({ name: 'DiaryContent', params: { diaryId }})
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