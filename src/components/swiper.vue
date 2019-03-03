<template>
  <div>
    <swiper class="container"
      :indicator-dots="true"
      indicator-color="#e54"
      :autoplay="true"
      :interval="6000"
      :duration="1000"
      :circular="true"
    >
      <div v-for="(item, index) in imgUrl" :key="index">
        <swiper-item >
          <a :href="'/pages/detail/main?id=' + book.id" v-for="(book, i) of item" :key="i" class="slider">
            <img :src="book.image" mode="aspectFit" class="slide-image" />
          </a>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    hots: Array
  },
  methods: {
  },
  mounted () {
  },
  computed: {
    imgUrl () {
      let res = this.hots
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  margin-top 5px
.slider
  width 33.333%
  height 2.5rem
  float left
  .slide-image
    max-width 100%
    max-height 100%
</style>
