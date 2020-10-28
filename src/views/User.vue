<template>
  <div class="user">
    <Nav class="nav" navTitle="个人中心">
      <div class="main">
        <div class="userInfo">
          <van-image class="portrait" round width="6rem" height="6rem" :src="require('../assets/images/money.png')"/>
          <div class="info">
            <span>用户名称</span>
            <span>已使用2G/100G</span>
          </div>
        </div>
          <ul class="total">
            <li class="dayCount">
              <div><span class="number">222</span><span class="unit">天</span></div>
              <div class="remark">使用few笔记</div>
            </li>
            <li class="dairyCount">
              <div><span class="number">222</span><span class="unit">篇</span></div>
              <div class="remark">日记篇数</div>
            </li>
            <li class="loveCount">
              <div><span class="number">222</span><span class="unit">篇</span></div>
              <div class="remark">收藏日记</div>
            </li>
          </ul>
        <ul class="action">
          <li>
            <svg class="icon"><use xlink:href="#icon-diary"/></svg>
            <span>分组</span>
          </li>
          <li>
            <svg class="icon"><use xlink:href="#icon-diary"/></svg>
            <span>收藏</span>
          </li>
          <li>
            <svg class="icon"><use xlink:href="#icon-diary"/></svg>
            <span>设置</span>
          </li>
        </ul>
        <div style="margin: 3rem 0;">
          <van-button class="submit" block type="info" native-type="submit">
            退出登录
          </van-button>
        </div>
      </div>
    </Nav>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'User',
  components: {Nav},
}
</script>

<style scoped lang="scss">
.user {
  height: 100%;

  .main {
    padding: 3rem 2rem 0;

    > .userInfo {
      display: flex;
      align-items: center;

      > .info {
        padding-left: 1.2rem;
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        color: #929292;

        > span {
          line-height: 2rem;
        }
      }
    }

    > .total {
      display: flex;
      padding-top: 2.5rem;
      > li {
        width: 33.3333333333%;
        text-align: center;
        padding: 0.5rem 0;
        &:not(:last-child){
          border-right: 1px solid #e6e6e6;
        }
        > div {
          > .number{
            font-weight: bold;
            font-size: 1.6rem;
            color: #333333;
          }
          > .unit{
            color: #666666;
            font-size: 1.2rem;
            padding-left: 0.5rem;
          }
        }
        > .remark{
          color: #666;
          padding-top: 0.5rem;
        }
      }
    }
    > .action{
      padding-top: 1.5rem;
      > li{
        padding: 10px 0;
        border-bottom: 1px solid #e6e6e6;
        > .icon{
          font-size: 1em;
          color: #ffc7c7;
        }
        > span{
          padding-left: 1em;
        }
      }
    }
    > div> .submit{
      background: #ffc7c7;
      border: none;
      border-radius: 6px;
      color: #333;
    }
  }

}
</style>