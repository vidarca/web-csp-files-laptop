<template>
  <div id="services">
	<Header></Header>

    <AutogestionSpan></AutogestionSpan>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AutogestionSpan from '@/components/AutogestionSpan.vue'

export default {
    name: 'Services',
    components: {
        Header,
        AutogestionSpan,
	},
}
</script>

<style>
.secP .v-social-header{
    display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 5vw;
	position: relative;
	z-index: 2;
	background-color: rgba(255, 255, 255);
	width: 100%;
	height: 30px;
    overflow: hidden;
}


.secP .v-navbar{
    position: relative;
	height:100px;
	width:100%;
	background-color: rgba(255,255,255);
	transition: opacity 0.2s;
	list-style: none;
	padding: auto;
	top: 0;
	z-index: 2;
	display: flex;
	align-items: center;
    justify-content: space-between;
}

.secP .v-dropdown-menu{
    height: 0;
	color: #000000;
	width: auto;
	position: absolute;
	background-color: #ffffff;
	z-index: 2;
	bottom: -1;
	transform: translateX(-100%);
	transition: transform 0.4s ease-out, opacity 0.4s ease-in;
	border-radius: 10px;
    overflow: hidden;
}

</style>