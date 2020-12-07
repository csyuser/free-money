<template>
  <div class="diaryList">
    <Nav :navTitle="navTitle" icon-name="ellipsis">
      <div class="main">
        <van-search class="search" v-model="search" placeholder="请输入搜索关键词"/>
        <ul class="diaries" :ref="`touchedDiary${diary['Id']}`" v-for="diary in diaries" :key="diary['Id']"
            v-long-press="() => longTouch(diary['Id'])"
            @click="toDiary(diary['Id'])"
            @touchstart="start(diary['Id'])"
            @touchend="end(diary['Id'])"
        >
          <li class="title">{{ diary['Title'] }}</li>
          <li class="content">{{ diary['Content'] }}</li>
          <li class="time">{{ formatTime(diary['CreateTime']) }}</li>
        </ul>
      </div>
    </Nav>
    <van-popup v-model="show" class="diaryPopup">
      <p>
        <svg class="icon"><use xlink:href="#icon-move"/></svg>
        移动
      </p>
      <p @click="deleteDiary">
        <svg class="icon"><use xlink:href="#icon-delete"/></svg>
        删除
      </p>
    </van-popup>
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
      navTitle: '日记',
      diaries: [],
      show: false,
      diaryId: '',
    }
  },
  mounted() {
    this.$store.commit('fetch')
    this.axios.get('/notebook/list').then(res => {
      if (res.data['Code'] === 0) {
        this.diaries = res.data['Res']
      } else {this.$toast.fail(res.data['Msg'])}
    })
        .catch()
  },
  methods: {
    toDiary(id) {
      this.$router.push({name: 'DiaryContent', params: {diaryId:id}})
    },
//按下的瞬间改变背景色
    start(id){
      this.$refs['touchedDiary'+id][0].classList.add('touchedDiary')
    },
    end(id){
      this.$refs['touchedDiary'+id][0].classList.remove('touchedDiary')
    },
    formatTime(str) {
      const now = dayjs()
      if (dayjs(str).isSame(now, 'day')) {
        return '今天'
      } else if (dayjs(str).isSame((now.subtract(2, 'day')), 'day')) {
        return '昨天'
      } else {
        return dayjs(str).format('YYYY-M-D')
      }
    },
    longTouch(id) {
      this.show = true
      this.diaryId = id
    },
    deleteDiary(){
      this.axios.post( '/api/notebook/delete',{
        id:this.diaryId,
      }).then(res=>{
        if (res.data['Code'] === 0){
          this.$toast.success('删除成功')
        }else {
          this.$toast.fail(res.data['Msg'])
        }
        this.show = false
      })
      .catch()
    }
  }
}
</script>

<style scoped lang="scss">
$radius: 4px;
$mainPadding: 2rem;
.diaryList {
  height: 100%;

  > .diaryPopup {
    width: 80%;
    border-radius: 4px;

    > p {
      padding: 20px;
      display: flex;
      align-items: center;
      &:first-child {
        padding-bottom: 10px;
      }

      &:last-child {
        padding-top: 10px;
      }
      > .icon{
        font-size: 1.4em;
        margin-right: 1em;
      }
    }
  }
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
    &.touchedDiary{
      background: #e6e6e6;
    }

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