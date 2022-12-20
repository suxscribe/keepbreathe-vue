<template lang="pug">
.header
  .header__left
  .header__right
    router-link(to="/", class='header__goback') {{ 'FinishText' | localize }}
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
