<template>
  <div class="rate">
    <div>☆☆☆☆☆</div>
    <div class="fill" :style="style">★★★★★</div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [Number, String], default: '0' }
  },
  computed: {
    style () {
      return `width:${this.value / 2}em`
    }
  }
}
</script>

<style lang="stylus" scoped>
.rate
	position relative
	overflow hidden
	font-size 16px
	float right
	margin-left .1rem
	.fill
		overflow hidden
		position absolute
		top 0
		left 0
		width 0
</style>
