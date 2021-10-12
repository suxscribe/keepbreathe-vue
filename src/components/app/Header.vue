<template lang="pug">
  .header
    .header__right
    .header__left
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
