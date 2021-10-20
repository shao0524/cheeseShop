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
};
</script>

<style lang="scss">
@import "./assets/css/all";
</style>
