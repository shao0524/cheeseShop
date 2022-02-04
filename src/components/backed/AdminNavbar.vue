<template>
  <nav class="backendNavbar">
    <router-link class="backendNavbar-logo logoStyle" to="/"
      >Cheeseny</router-link
    >
    <button
      class="backendNavbar-toggle"
      :class="{ 'backendNavbar-toggle-active': isToggleClick }"
      type="button"
      @click="isToggleClick = !isToggleClick"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    <ul class="backendNavbar-nav">
      <li class="backendNavbar-nav-item">
        <router-link
          class="backendNavbar-nav-item-link"
          @click.native="signout"
          to="/"
          >登出</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isToggleClick: false,
    };
  },
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$bus.$emit("isLoading", true);
      vm.isLoading = true;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            //刪除cookie
            document.cookie = `cheese4ny=;expires=${new Date(0).toGMTString()}`;
            vm.$router.go(0);
          }
          vm.$bus.$emit("signIn", false);
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
  },
  watch: {
    isToggleClick(value) {
      const vm = this;
      if (value) {
        //開啟
        vm.$bus.$emit("openSidebar");
      } else {
        //關閉
        vm.$bus.$emit("hideSidebar");
      }
    },
  },
  created() {
    this.$bus.$on("signOut", (status) => {
      if (status) {
        this.signout();
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("signOut");
  },
};
</script>
