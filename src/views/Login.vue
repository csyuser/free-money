<template>
  <div class="sign-log">
    <div class="portrait">
      <van-image round width="10rem" height="10rem" :src="require('../assets/images/money.png')"/>
      <h3>free money</h3>
    </div>
    <van-form @submit="onSubmit">
      <van-field class="userInfo" v-model="userInfo.account" name="account" placeholder="用户名/邮箱"/>
      <van-field class="userInfo" v-model="userInfo.pwd" type="password" name="pwd" placeholder="密码"/>
      <div style="margin: 2rem;">
        <van-button class="submit" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <div class="end">
        <div class="logAndSign" @click="logAndSign">注册用户</div>
        <div class="logAndSign" @click="resetPwd">忘记密码</div>
      </div>
    </van-form>
  </div>
</template>

<script>


export default {
  name: 'Signup',
  data() {
    return {
      userInfo: {
        account: '',
        pwd: '',
      }

    }
  },
  methods: {
    onSubmit(values) {
      this.axios.post( '/user/login',
          {...values}
      ).then(res => {
        if (res.data['Code'] === 0) {
          this.$store.commit('saveToken',res.data['Res'].token)
          window.localStorage.setItem('token',res.data['Res'].token)
          this.$router.push('/diaryList')
        } else {this.$toast.fail(res.data['Msg'])}
      })
          .catch()
    },
    logAndSign() {
      this.$router.push('/')
    },
    resetPwd(){
      this.$router.push('/resetPwd')
    }
  },
}

</script>

<style scoped lang="scss">
.sign-log {
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
    > .userInfo {
      margin: 1.5rem 2rem 0 2rem;
      width: auto;
      border-radius: 8px;
      background: #FFF5EA;
      padding: 1rem 1.6rem;
    }

    > div {
      > .submit {
        border-radius: 8px;
        margin-top: 2.5rem;
      }
    }
    > .end{
      margin: 0 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>