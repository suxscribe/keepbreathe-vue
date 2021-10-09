<template lang='pug'>
  component(:is='layout')
</template>

<script>
  import MainLayout from '../layouts/MainLayout.vue';
  import HeaderLayout from '../layouts/HeaderLayout.vue'


export default {
  computed: {
    layout() {
      // console.log(this.$route.meta);
      // console.log(this.$route);
      // console.log(this.$route.meta.layout);
      
      return this.$route.meta.layout + '-layout';
    }
  },
  components: {
    MainLayout,
    HeaderLayout,
  }
}
</script>

<style>
</style>