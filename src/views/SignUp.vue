<template>
  <div class="sign-log">
    <div class="portrait">
      <van-image round width="10rem" height="10rem" :src="require('../assets/images/money.png')"/>
      <h3>free money</h3>
    </div>
    <van-form>
      <van-field class="userInfo" v-model="userInfo.mailbox" name="mailbox" placeholder="邮箱"/>
      <van-field class="userInfo" v-model="userInfo.verify" name="verify" center clearable placeholder="请输入邮箱验证码">
        <template #button>
          <van-button class="verifyBtn" @click="getVerify" :disabled="!clickable" size="small" type="primary">
            <span v-if="clickable">{{ btnName }}</span>
            <span v-else>
              <van-count-down format="ss s" :time="time" @finish="finish"/>
            </span>
          </van-button>
        </template>
      </van-field>
      <van-field class="userInfo" v-model="userInfo.username" name="username" placeholder="用户名"/>
      <van-field class="userInfo" v-model="userInfo.password" type="password" name="password" placeholder="密码"/>
      <van-field class="userInfo" v-model="userInfo.rePassword" type="password" name="rePassword" placeholder="重复输入密码"/>
      <div style="margin: 2rem;">
        <van-button @click="onSubmit" class="submit" block type="info" native-type="submit">
          注册
        </van-button>
      </div>
      <div class="logAndSign" @click="logAndSign">已有帐号登录</div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      userInfo: {
        mailbox: '',
        verify: '',
        username: '',
        password: '',
        rePassword: '',
      },
      time: 6 * 1000,
      clickable:true,
      btnName:'发送验证码'
      // rules: {
      //   mailboxRule: [{required: false, message: '请填写邮箱'}],
      //   usernameRule: [{required: false, message: '请填写用户名'}],
      //   passwordRule: [{required: false, message: '请填写密码'}],
      //   rePasswordRule: [{required: false, message: '请重复输入密码'}]
      // },
    }
  },
  methods: {
    onSubmit() {
      const userInfoValues = Object.values(this.userInfo)
      const userInfoKeys = ['邮箱', '邮箱验证码', '用户名', '密码', '重复密码']
      let isNull = false
      userInfoValues.forEach((value, index) => {
        if (value === '' || !value) {
          this.$toast.fail(`${userInfoKeys[index]} 不能为空`)
          isNull = true
        }
      })
      if (!isNull) {console.log('调用接口，邮箱验证')}
    },
    logAndSign() {
      this.$router.push('/login')
    },
    getVerify(){
      this.clickable = false
    },
    finish() {
      this.clickable = true
      this.btnName = '重新发送验证码'
    },
  },
}

</script>

<style scoped lang="scss">
.sign-log {
  height: 100%;
  $mainBg: #ffc7c7;

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
      border-radius: 0.8rem;
      background: #FFF5EA;

      .verifyBtn {
        margin: -0.5rem;
        background: #FFF5EA;
        color: $mainBg;
        border: 1px solid $mainBg;
        border-radius: 0.8rem;
        min-width: 6rem;
      }
    }

    > div {
      > .submit {
        border-radius: 0.8rem;
        margin-top: 2.5rem;
      }
    }

    > .logAndSign {
      text-align: center;
    }
  }
}
</style>