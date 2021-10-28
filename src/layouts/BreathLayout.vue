<template lang="pug">
  .page
    HeaderBreath
    router-view
</template>

<script>
import HeaderBreath from '../components/app/HeaderBreath.vue';

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
