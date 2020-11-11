<template>
  <div class="sign-log">
    <header>
      <svg class="icon" @click="$router.back()">
        <use xlink:href="#icon-back"/>
      </svg>
      <span>忘记密码</span>
    </header>
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
      <van-field class="userInfo" v-model="userInfo.pwd" type="password" name="pwd" placeholder="密码"/>
      <van-field class="userInfo" v-model="userInfo.rePwd" type="password" name="rePwd" placeholder="重复输入密码"/>
      <div style="margin: 2rem;">
        <van-button @click="onSubmit" class="submit" block type="info" native-type="submit">
          更新密码
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'Signup',
  data() {
    return {
      userInfo: {
        email: '',
        code: '',
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
      this.axios.post('/api/user/resetPwd',
          Qs.stringify({
            ...this.userInfo
          })).then(res => {
        if (res.data.Code === 0) {
          this.$dialog.alert({
            message: '更新成功',
          }).then(() => {
            this.$router.push({name: 'Login'})
          })
        } else {
          this.$toast.fail(res.data.Msg)
        }
      })
          .catch()
    },
    logAndSign() {
      this.$router.push('/login')
    },
    getVerify() {
      const reg = /^[a-z0-9A-Z_]+@+[a-z0-9A-Z_]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.userInfo.email)) {
        this.$toast.fail('邮箱格式不正确')
      } else {
        this.clickable = false
        this.axios.post('/api/identify/send',
            Qs.stringify({email: this.userInfo.email}),
        ).then((res) => {
          if (res.data.Code === 200) {
            console.log(res.data.Res.code)
          } else {
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
  background: white;
  height: 100%;
  $mainBg: #ffc7c7;
  overflow: auto;
  font-size: 1.4rem;

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

  > form {
    margin-top: 10rem;

    > .userInfo {
      margin: 1.5rem 2rem 0 2rem;
      width: auto;
      border-radius: 8px;
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
        background: #ffc7c7;
        border: 1px solid #ffc7c7;
        color: #333;
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