<template>
  <div class="info">
    <div class="thumb">
      <img class="bg" :src="info.image" alt="" mode="aspectFill">
      <img class="preview" :src="info.image" alt="" mode="aspectFit">
      <div class="bookinfo">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="owner">
      <div class="adder left">
        <img :src="userinfo.avatarUrl" alt=""
          mode="aspectFit" class="avatar">
        {{userinfo.nickName}}
      </div>
      <div class="rate right basic-color">
        {{info.rate}}分
        <rate :value="info.rate"></rate>
      </div>
    </div>
    <div class="detail">
      <div class="publisher left">{{info.publisher}}</div>
      <div class="price right">{{info.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" v-for="tag of info.tags" :key="tag">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(sum, index) of info.summary" :key="index">{{sum}}</p>
    </div>
  </div>
</template>

<script>
import rate from './rate'

export default {
  props: ['info'],
  components: { rate },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }
}
</script>

<style lang='stylus'>
.info
  .thumb
    width 750rpx
    height 480rpx
    overflow hidden
    position relative
    .bg
      width 100%
      height 100%
      filter blur(15px)
    .preview
      position absolute
      left 0
      top 30rpx
      height 300rpx
      width 100%
    .bookinfo
      position absolute
      left 0
      top 330rpx
      color #ffffff
      width 100%
      text-align center
      .title
        font-size .36rem
      .author
        font-size .28rem
  .owner, .detail
    padding 5px 10px
    font-size .28rem
    display flex
    justify-content space-between
  .owner
    .avatar
      width 40rpx
      height 40rpx
      vertical-align middle
      margin-right 5px
  .tags
    padding 0 10px
    .badge
      display inline-block
      margin 0 5px 5px 0
      border-radius 3px
      border 1px solid #e54 
      color #e54
      font-size .28rem
      padding 0 5px
  .summary
    padding 0 10px
    margin-top 10px
    font-size 14px
    line-height 1.5
    p
      text-indent 2em
  </style>
