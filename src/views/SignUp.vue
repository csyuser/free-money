<template>
  <div class="sign-log">
    <div class="portrait">
      <van-image round width="10rem" height="10rem" :src="require('../assets/images/money.png')"/>
      <h3>free money</h3>
    </div>
    <van-form>
      <van-field class="userInfo" v-model="userInfo.email" name="email" placeholder="邮箱"/>
      <van-field class="userInfo" v-model="userInfo.code" name="code" center clearable placeholder="请输入邮箱验证码">
        <template #button>
          <van-button class="verifyBtn" @click="getVerify" :disabled="!clickable" size="small" type="primary">
            <span v-if="clickable">{{ btnName }}</span>
            <span v-else>
              <van-count-down format="ss s" :time="time" @finish="finish"/>
            </span>
          </van-button>
        </template>
      </van-field>
      <van-field class="userInfo" v-model="userInfo.nickname" name="nickname" placeholder="用户名"/>
      <van-field class="userInfo" v-model="userInfo.pwd" type="password" name="pwd" placeholder="密码"/>
      <van-field class="userInfo" v-model="userInfo.rePwd" type="password" name="rePwd" placeholder="重复输入密码"/>
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
        email: '',
        code: '',
        nickname: '',
        pwd: '',
        rePwd: '',
      },
      time: 6 * 1000,
      clickable: true,
      btnName: '发送验证码'
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
      if (!isNull) {
        this.axios.post('/user/reg',
            {
              ...this.userInfo
        }).then(res=>{
          if (res.data.Code===0){
            this.$dialog.alert({
              message: '注册成功',
            }).then(() => {
              console.log(res.data.Res.id)
              this.$router.push({name:'Login'})
            });
          }else{
            this.$toast.fail(res.data.Msg)
          }
        })
      .catch()
      }
    },
    logAndSign() {
      this.$router.push('/login')
    },
    getVerify() {
      const reg = /^[a-z0-9A-Z_]+@+[a-z0-9A-Z_]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.userInfo.email)){
        this.$toast.fail('邮箱格式不正确')
      }else{
        this.clickable = false
        this.axios.post('/identify/send',
           {email: this.userInfo.email},
        ).then((res) => {
          if (res.data.Code===200){
            this.$toast.success('发送成功')
          }else{
            this.$toast.fail(res.data.Msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
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
  overflow: auto;
  font-size: 1.4rem;

  > .portrait {
    text-align: center;
    padding-top: 5rem;
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

      .verifyBtn {
        margin: -0.5rem;
        background: #FFF5EA;
        color: $mainBg;
        border: 1px solid $mainBg;
        border-radius: 8px;
        min-width: 6rem;
      }
    }

    > div {
      > .submit {
        border-radius: 8px;
        margin-top: 2.5rem;
      }
    }

    > .logAndSign {
      text-align: center;
      margin-bottom: 1rem;
      //font-size: 1.4rem
    }
  }
}
</style>