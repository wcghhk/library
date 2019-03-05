<template>
  <div class="list">
    <div class="page-title basic-color">
      热门评论
    </div>
    <div class="comment" v-for="item of comments" :key="item.id"
      @click="bookinfo(item.bookid)">
      <div class="user">
        <div class="avatar">
          <img :src="item.avatarUrl" alt="" mode="aspectFit">
          <span>{{item.nickName}}</span>
        </div>
        <div class="detail">
          <span>{{item.location || '未知位置'}}</span>
          <span class="basic-color">--</span>
          <span>{{item.phone || '未知型号'}}</span>
        </div>
      </div>
      <div class="content">
        {{item.comment}}
      </div>
    </div>
    <div class="none" v-if="showNone">暂无评论</div>
  </div>
</template>

<script>
export default {
  props: ['comments', 'type'],
  methods: {
    bookinfo (id) {
      if (this.type === 'self') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + id
        })
      }
    }
  },
  computed: {
    showNone () {
      return this.comments.length === 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  padding 0 10px
  margin 10px 0
  .page-title
    background #eeeeee
    font-size 14px
    padding 0 10px
    line-height 2
  .comment
    padding 10px
    border-bottom 1px solid #eee
    &:last-child
      border none
    .user
      display flex
      justify-content space-between
      line-height 2
      font-size 12px
      .avatar
        img
          border-radius 50%
          width 20px
          height 20px
          vertical-align middle
          margin-right 5px
      .detail
        color #999
    .content
      padding-left 20px
      font-size 14px
      line-height 1.5
  .none
    font-size 14px
    padding-left 10px
    line-height 2
    text-align center
</style>
