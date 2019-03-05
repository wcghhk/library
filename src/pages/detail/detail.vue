<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <div class="add-comment" v-if="showAdd">
      <textarea v-model="comment" placeholder="请输入短评" maxlength="100"
        name="" id="" cols="30" rows="10"></textarea>
      <div class="location">
        <span class="left">地理位置</span>
        <switch color="#e54" @change="getGeo" :checked="location"></switch>
        <span class="basic-color"> {{location}}</span>
      </div>
      <div class="phone">
        <span class="left">手机型号</span>
        <switch color="#e54" @change="getPhone" :checked="phone"></switch>
        <span class="basic-color"> {{phone}}</span>
      </div>
      <button class="btn" @click="addComment">添加评论</button>
    </div>
    <iframe src="https://www.baidu.com" frameborder="0"></iframe>
    <div class="share">
      <button class="btn" open-type="share">分享给好友</button>
    </div>
    <CommentList :comments="comments"></CommentList>
    <div class="commented" v-if="!showAdd">{{commented}}</div>
  </div>
</template>

<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/bookinfo'
import CommentList from '@/components/commentlist'
export default {
  components: { BookInfo, CommentList },
  data () {
    return {
      bookid: '',
      comments: [],
      userinfo: {},
      info: {},
      comment: '',
      location: '',
      phone: '',
      commented: '请先登录'
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      this.info = info.data
      wx.setNavigationBarTitle({
        title: this.info.title
      })
    },
    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getDetail()
        this.getComments()
      } catch (e) {
        showModal('评论失败', e.msg || '')
      }
    },
    async getComments () {
      const res = await get('/weapp/commentslist', {bookid: this.bookid})
      this.comments = res.data.list || []
    },
    getGeo (e) {
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            this.transport(geo)
          }
        })
      } else {
        this.location = ''
      }
    },
    transport (geo) {
      const ak = '8xIr9Lkj7o2BZW9rWxxtRP8VLPjG0w73'
      const url = 'http://api.map.baidu.com/geocoder/v2/?'
      wx.request({
        url,
        method: 'get',
        data: {
          ak,
          output: 'json',
          location: `${geo.latitude},${geo.longitude}`
        },
        success: res => {
          if (res.data.status === 0) {
            this.location = res.data.result.addressComponent.city
          } else {
            this.location = '未知的位置'
          }
        }
      })
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.brand + ' ' + phoneInfo.model
      } else {
        this.phone = ''
      }
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) {
        this.commented = '请先登录'
        return false
      }
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        this.commented = '你已经评论过了'
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-comment
  margin-top 10px
  padding 0 10px
  textarea
    width 100%
    box-sizing border-box
    height 250rpx
    background #eeeeee
    padding 10px
    font-size 14px
  .location, .phone
    margin-top 10px
    font-size 16px
    .left
      margin-right 5px
  .btn
    margin 10px 0
.commented
  text-align center
  font-size 14px
  line-height 2
  margin-bottom 10px
.share
  padding 5px 10px
</style>
