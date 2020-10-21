<template>
  <div class="sign-log">
    <div class="portrait">
      <van-image round width="10rem" height="10rem" :src="require('../assets/images/money.png')"/>
      <h3>free money</h3>
    </div>
    <van-form @submit="onSubmit">
      <van-field class="userInfo" v-model="username" name="用户名" placeholder="用户名/邮箱" :rules="rules.usernameRule"/>
      <van-field class="userInfo" v-model="password" type="password" name="密码" placeholder="密码"
                 :rules="rules.passwordRule"/>
      <div style="margin: 2rem;">
        <van-button class="submit" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <div class="logAndSign" @click="logAndSign">注册用户</div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password: '',
      mailbox: '',
      rePassword: '',
      rules: {
        mailboxRule: [{required: false, message: '请填写邮箱'}],
        usernameRule: [{required: false, message: '请填写用户名'}],
        passwordRule: [{required: false, message: '请填写密码'}],
        rePasswordRule: [{required: false, message: '请重复输入密码'}]
      },
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    logAndSign(){
      this.$router.push('/')
    },
  },
}

</script>

<style scoped lang="scss">
.sign-log {
  background: #F7DAD9;
  height: 100%;

  > .portrait {
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 1.5rem;

    > h3 {
      font-size: 3.6rem;
      color: #101010
    }
  }

  > form {
    > .userInfo{
      margin: 1.5rem 2rem 0 2rem;
      width: auto;
      border-radius: 0.8rem;
      background: #FFF5EA;
    }
    >div{
      > .submit{
        border-radius: 0.8rem;
        margin-top: 2.5rem;
      }
    }
    > .logAndSign{
      text-align: center;
    }
  }
}
</style>