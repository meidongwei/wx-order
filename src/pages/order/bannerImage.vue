<template>
  <img :src="defaultSrc"/>
</template>

<script>
  import banner from '../../assets/images/banner.png'
  export default {
    props: {
      src: String
    },
    data() {
      return {
        defaultSrc: banner
      }
    },
    created() {
      let image = new Image();
      image.src = this.src;
      image.onload = () => {
        this.defaultSrc = this.src;
      }
    }
  }
</script>
