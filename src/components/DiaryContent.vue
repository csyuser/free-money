<template>
  <div class="dairy">
    <header>
      <svg class="icon">
        <use xlink:href="#icon-left"/>
      </svg>
      <svg class="icon">
        <use xlink:href="#icon-ellipsis"/>
      </svg>
    </header>
    <main>
      <div class="title">标题</div>
      <div class="content">内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容</div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'DiaryContent',
  mounted() {
    console.log(this.$route.params.diaryId)
  }
}
</script>

<style scoped lang="scss">
.dairy {
  background: #FFFFFF;
  height: 100%;
  padding: 1rem 2rem 0;
  >header{
    height: 4.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  >main{
    margin-top:1rem;
    .title{
      font-size: 16px;
    }
    .content{
      margin-top: 1rem;
      overflow: auto;
    }
  }
}
</style>