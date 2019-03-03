<template>
  <div class="container">
    <div class="wrapper" v-if="logged">
      <div class="userinfo">
        <img class="avatar" :src="userinfo.avatarUrl" alt=""><br>
        <p class="username">{{userinfo.nickName}}</p>
      </div>
      <YearProgress></YearProgress>
      <button @click="scanBook" class="btn">添加图书</button>
    </div>
    <div class="login" v-else>
      <img src="/static/img/me.png" alt="">
      <button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">登录</button>
    </div>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { showSuccess, post, showModal } from '@/util'
import YearProgress from '@/components/yearProgress'
export default {
  components: { YearProgress },
  data () {
    return {
      logged: false,
      userinfo: {}
    }
  },
  methods: {
    doLogin: function (e) {
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            wx.setStorageSync('userinfo', res)
            this.userinfo = res
            this.logged = true
            showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            wx.setStorageSync('userinfo', res)
            this.userinfo = res
            this.logged = true
            showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    },
    scanBook () {
      wx.scanCode({
        onlyFromCamera: false,
        success: res => {
          res.result && this.addBook(res.result)
        }
      })
    },
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      if (res.code === -1) {
        showModal('添加失败', `${res.data.msg}`)
      } else if (res.data.title) {
        showModal('添加成功', `${res.data.title}添加成功`)
        // showSuccess(`${res.data.title}添加成功`)
      }
    }
  },
  mounted () {
    this.userinfo = wx.getStorageSync('userinfo')
    if (this.userinfo) {
      this.logged = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  justify-content center
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .wrapper
    padding .4rem
    padding-bottom 2rem
    .userinfo
      text-align center
      margin-bottom .4rem
      .avatar
        width 2rem
        height 2rem
        border-radius 50%
      .username
        text-align center
        font-size .4rem
        margin-top .2rem
  .login
    padding 0 .4rem
    text-align center
    >img
      width 2rem
      height 2rem
      margin-bottom .6rem
</style>
