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
      <div class="logAndSign" @click="logAndSign">注册用户</div>
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
      console.log(values)
      // this.axios.post('/api/user/login', {
      //   account:values.account,
      //   pwd:values.pwd
      // }).then(res => {
      //   if (res.data.code === 0) {
      //     console.log(res.data)
      //   } else {
      //     this.$toast.fail(res.data.Msg)
      //   }
      // })
      //     .catch()
      this.$router.push('/diaryList')
    },
    logAndSign() {
      this.$router.push('/')
    },
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

    > .logAndSign {
      text-align: center;
    }
  }
}
</style>