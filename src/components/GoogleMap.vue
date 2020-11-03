<template>
    <gmap-map
        :center="center"
        :zoom="16"
        style="width: 100%, height: 500px !important"
    >
        <gmap-marker
            :position="markers.position"
            :title="markers.title"
            :clickeable="true"
            @click="center=markers.position"
        >

        </gmap-marker>
    </gmap-map>
</template>

<script>

    export default {
        name: 'GoogleMap',

        data(){
            return {
                center:{lat:10.46618, lng:-66.835962,},
                markers:{
                    position:{lat:10.46618, lng:-66.835962,},
                    title: 'Club Social Santa Paula',
                },
            }
        },

        
    }
</script>

<style scoped>
.vue-map-container{
    height: 500px;
}
</style>