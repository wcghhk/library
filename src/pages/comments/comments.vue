<template>
  <div class="container">
    <CommentList :type="'self'" :comments="comments"></CommentList>
  </div>
</template>

<script>
import {get} from '@/util'
import CommentList from '@/components/commentlist'
export default {
  components: {CommentList},
  data () {
    return {
      userinfo: {},
      comments: []
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
    },
    async getComments () {
      const res = await get('/weapp/commentslist', {openid: this.userinfo.openId})
      this.comments = res.data.list
      console.log(res)
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    }
    this.init()
  }
}
</script>

<style>

</style>
