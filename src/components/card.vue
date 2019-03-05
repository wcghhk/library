<template>
  <a :href="detailUrl">
    <div class="card">
      <div class="thumb" @click.stop="preview">
        <img :src="book.image" alt="" class="image" mode="aspectFit">
      </div>
      <div class="detail">
        <div class="row basic-color title">
          <div class="left">{{book.title}}</div>
          <div class="right">
            {{book.rate}}
            <rate :value="book.rate"></rate>
          </div>
        </div>
        <div class="row author">
          <div class="left">{{book.author}}</div>
          <div class="right basic-color">访问量: {{book.count}}</div>
        </div>
        <div class="row publisher">
          <div class="left">{{book.publisher}}</div>
          <div class="right">{{book.user_info.nickName}}</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import rate from './rate'
export default {
  components: { rate },
  props: {
    book: Object
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  padding .2rem
  overflow hidden
  font-size 14px
  .thumb
    width 1.8rem
    height 1.8rem
    float left
    overflow hidden
    .image
      max-width 100%
      max-height 100%
  .detail
    margin-left 2rem
    .row
      margin-right 3px
      line-height .4rem
      overflow hidden
      display flex
      justify-content space-between
    .title
      .left
        flex 1
        overflow hidden
        white-space wrap
    .author
      .left
        flex 1
        overflow hidden
        maring-right 10px
</style>
