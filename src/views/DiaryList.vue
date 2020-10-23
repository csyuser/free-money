<template>
<div class="diaryList">
  <header>
    <span></span>
    <div class="title">日记</div>
    <svg class="icon">
      <use xlink:href="#icon-ellipsis"/>
    </svg>
  </header>
  <main>
    <van-search class="search" v-model="search" placeholder="请输入搜索关键词" />
    <div class="diaries">
      <div class="title"></div>
      <div class="content"></div>
      <div class="time"></div>
    </div>
  </main>
  <footer>
    <svg class="icon"><use xlink:href="#icon-diary"/></svg>
    <svg class="icon"><use xlink:href="#icon-label"/></svg>
    <svg class="icon add smallIcon"><use xlink:href="#icon-add"/></svg>
    <svg class="icon smallIcon"><use xlink:href="#icon-statistics"/></svg>
    <svg class="icon smallIcon"><use xlink:href="#icon-user"/></svg>
  </footer>
</div>
</template>

<script>
export default {
name: "DialogList",
  data(){
  return{
    search:'',
    diaries:{
      title:'title',
      content:'content',
      time:'time'
    }
  }
  }
}
</script>

<style scoped lang="scss">
$mainColor:#ffc7c7;
$radius:0.4rem;
$mainPadding:2rem;
.diaryList{
  background: #FFF;
  height: 100%;
  display: flex;
  flex-direction: column;
  >header{
    padding: 0 $mainPadding;
    background: $mainColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 4.4rem;
    > .icon{font-size:1.6rem}
  }
  >main{
    flex-grow: 1;
    > .search > .van-search__content{
      border-radius: $radius;
    }
  }
  >footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.4rem;
    padding: 0 $mainPadding;
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
    > .icon{
      font-size: 2rem;
      color: #707070;
      &.add{
        color: #ffc7c7;
      }
      &.smallIcon{
        font-size: 2.4rem;
      }
    }
  }
}
</style>