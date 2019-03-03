<template>
  <div class="book-list">
    <swiper :hots="hots"></swiper>
    <card v-for="item of bookList" :key="item.id" :book="item"></card>
    <p class="more" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
import { get } from '@/util'
import card from '@/components/card'
import swiper from '@/components/swiper'
export default {
  components: { card, swiper },
  data () {
    return {
      bookList: [],
      page: 0,
      more: true,
      hots: []
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page})
      if (init) {
        this.bookList = books.data.bookList
        wx.stopPullDownRefresh()
      } else {
        this.bookList = this.bookList.concat(books.data.bookList)
      }
      this.more = !(books.data.bookList.length < 10)
      wx.hideNavigationBarLoading()
    },
    async getHot () {
      const hots = await get('/weapp/hot')
      this.hots = hots.data.hot
      console.log(this.hots)
    }
  },
  mounted () {
    this.getList(true)
    this.getHot()
  },
  onPullDownRefresh () {
    this.getList(true)
  },
  onReachBottom () {
    if (this.more) {
      this.page += 1
      this.getList()
    }
  }
}
</script>

<style lang="stylus">
.more
  text-align center
  line-height 2
  font-size .32rem
</style>
