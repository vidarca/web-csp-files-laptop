<template>
  <div class="comites">
    <h6>Página no encontrada</h6>
  </div>
</template>

<script>
export default {
    mounted(){
      let header = document.getElementById('header')
      let footer = document.getElementById('footer')
      
      header.style.display = "none"
      footer.style.display = "none"
  },
}
</script>