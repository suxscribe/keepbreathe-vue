<template lang="pug">
.page
  HeaderBreath
  router-view
</template>

<script>
import HeaderBreath from './parts/HeaderBreath.vue';

export default {
  name: 'breath-layout',
  data: () => {
    return {};
  },
  async mounted() {},
  computed: {},
  watch: {},
  components: {
    HeaderBreath,
  },
};
</script>

<style></style>
