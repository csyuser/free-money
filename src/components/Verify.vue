<template>
  <div class="Verify">
    <header>
      <svg class="icon" @click="$router.push('/')">
        <use xlink:href="#icon-back"/>
      </svg>
      <span>邮箱验证</span>
    </header>
    <main>
      <van-field class="verifyValue" v-model="value" label="验证码" placeholder="请输入验证码"/>
      <div style="margin: 6rem 2rem;">
      <van-button class="verifyBtn" block @click="verify">验证</van-button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'mailVerify',
  data() {
    return {
      value: ''
    }
  },
  methods:{
    verify(){
      console.log(this.value)
    }
  }
}
</script>

<style scoped lang="scss">
$mainBg:#ffc7c7;
.Verify {
  background: white;
  height: 100%;
  > header {
    padding: 2rem 0;
    background: $mainBg;
    text-align: center;
    position: relative;

    > .icon {
      position: absolute;
      left: 1.7rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  > main {
    > .verifyValue {
      margin: 6rem 2rem 0;
      border-top: none;
      border-bottom: 1px solid #cfcfcf;
      width: auto;
      &::after{
      border: none;
    }
    }
    >div{

      >.verifyBtn{
        background: $mainBg;
        border-radius: 0.6rem;
      }
    }
  }


}
</style>