<template>
  <div class="dairy">
    <header>
      <svg class="icon" @click="$router.back()">
        <use xlink:href="#icon-left"/>
      </svg>
      <svg class="icon" @click="handle">
        <use xlink:href="#icon-ellipsis"/>
      </svg>
    </header>
    <main>
      <div class="title">{{diaryContent['Title']}}</div>
      <div class="content">{{diaryContent['Content']}}</div>
    </main>
    <van-popup v-model="show" position="bottom"  class="handlePopup">
      <div class="title">
        <span>{{diaryContent['Title']}}</span>
        <svg class="icon" @click="handle">
          <use xlink:href="#icon-edit"/>
        </svg>
      </div>
      <ul class="iconList">
        <li v-for="item in iconList" :key="item.value">
          <svg class="icon" @click="handle">
            <use :xlink:href="`#icon-${item.value}`"/>
          </svg>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <ul class="handleList">
        <li>
          <svg class="icon" @click="handle"><use xlink:href="#icon-move"/></svg>
          <span>移动</span>
        </li>
        <li>
          <svg class="icon" @click="handle"><use xlink:href="#icon-delete"/></svg>
          <span>删除</span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>

export default {
  name: 'DiaryContent',
  data(){
    return{
      diaryContent:{},
      show:false,
      iconList:[{name:'加密',value:'encrypt'},
        {name:'收藏',value:'star'},
        {name:'置顶',value:'top'},
        {name:'标签',value:'label2'},
        {name:'刷新',value:'refresh'},]
    }
  },
  mounted() {
    this.$store.commit('fetch')
    this.axios.get(this.prefixAddr + 'notebook/detail',{
      params:{
        id:this.$route.params.diaryId,
        token:this.$store.state.token}
    }).then(res=>{
      if (res.data['Code'] === 0){
        console.log(res.data['Res'])
        this.diaryContent = res.data['Res']
      }else {
        this.$toast.fail(res.data['Msg'])
      }
    })
    .catch()
  },
  methods:{
    handle(){
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">
$mainBg:#ffc7c7;
$popupPadding:1rem;
.dairy {
  background: #FFFFFF;
  height: 100%;
  display: flex;
  flex-direction: column;
  >header{
    background: $mainBg;
    padding: 0 2rem;
    height: 4.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  >main{
    padding: 1rem 2rem 0;
    overflow: auto;
    .title{
      font-size: 16px;
    }
    .content{
      margin-top: 2rem;
      overflow: auto;
    }
  }
  > .handlePopup{
    .icon{font-size: 1.4em}
    padding: 0 $popupPadding $popupPadding;
    color: #333333;
    .title{
      display: flex;
      justify-content: space-between;
      padding: $popupPadding;
      margin-right: -$popupPadding;
      margin-left: -$popupPadding;
      border-bottom: 1px solid #e6e6e6;
      font-weight: bold;

    }
    > .iconList{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $popupPadding;
      border-bottom: 1px solid #e6e6e6;
      margin-right: -$popupPadding;
      > li{
        display: flex;flex-direction: column;
        align-items: center;
        > .icon{margin-bottom: 0.3em}
      }
    }
    > .handleList{
      > li{
        padding:$popupPadding 0;
        border-bottom: 1px solid #e6e6e6;
        margin-right: -$popupPadding;
        &:last-child{border: none}
        > .icon{
          font-size: 1.2em;
          margin-right: 0.5em;
        }
      }
    }
  }
}
</style>