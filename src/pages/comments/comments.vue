<template>
  <div class="container">
    <CommentList v-if="userinfo.openId"
      :type="'self'" :comments="comments"></CommentList>
    <div class="book-list" v-if="userinfo.openId">
      <div class="title basic-color">我的图书</div>
      <card v-for="item of books" :key="item.id" :book="item"></card>
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import CommentList from '@/components/commentlist'
import card from '@/components/card'
export default {
  components: {CommentList, card},
  data () {
    return {
      userinfo: {},
      comments: [],
      books: []
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const res = await get('/weapp/commentslist', {openid: this.userinfo.openId})
      this.comments = res.data.list
    },
    async getBooks () {
      const res = await get('/weapp/booklist', {
        openid: this.userinfo.openId
      })
      this.books = res.data.bookList
      console.log(this.books)
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
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

<style lang="stylus" scoped>
.book-list
  padding 0 10px
  .title
    font-size 14px
    line-height 2
    background #eeeeee
    padding 0 10px
</style>
