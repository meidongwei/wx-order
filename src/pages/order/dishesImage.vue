<template>
  <img :src="defaultSrc"/>
</template>

<script>
  import sellout from '../../assets/images/sellout.png'
  export default {
    props: {
      src: String
    },
    data() {
      return {
        defaultSrc: sellout
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
