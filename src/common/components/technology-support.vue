<template>
	<div class="technology-support-container">
		<div>技术支持：山东易行旅行社有限公司</div>
		<div style="margin-top: .1rem">
			----联系电话：<a :href="'tel:' + phone" class="phone">{{phone}}</a>----
		</div>
	</div>
</template>

<script>
export default {
	name: 'technologySupport',
	data () {
		return {
			phone: '13589095321'
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
.technology-support-container
	font-size rem(.2)
	text-align center
	color #888
	padding rem(.2)
	.phone
		text-decoration underline
		color $primary
		font-size rem(.2)
</style>
