<template>
  <div id="app">
    <VueLoading :active.sync="isLoading" />
    <Alert />
    <router-view />
  </div>
</template>

<script>
import Alert from "components/common/Alert.vue";
export default {
  name: "App",
  components: {
    Alert,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {},
  created() {
    this.$bus.$on("isLoading", (status) => {
      this.isLoading = status;
    });
  },
  beforeDestroy() {
    this.$bus.$off("isLoading");
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
