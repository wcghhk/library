<template>
  <div class="year-progress">
    <progress :percent="percent" activeColor="#e54"></progress>
    <p class="year">{{year}}已经过去{{days}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    isLeap () {
      const year = 2100 || new Date().getFullYear()
      return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
    },
    getDayLeft () {
      return this.isLeap() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayLeft()).toFixed(1)
    }
  },
  mounted () {
    this.isLeap()
  }
}
</script>

<style lang="stylus">
.year-progress
  margin-bottom .3rem

</style>
