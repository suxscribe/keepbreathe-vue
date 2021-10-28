<template lang="pug">
  .header
    .header__left
    .header__right
      router-link(:to={path: "/"}, class='header__goback') {{ 'FinishText' | localize }}
</template>

<script>
// console.log(BreathContainer)

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
