<template>
  <nav
    class="
      navbar navbar-dark
      sticky-top
      bg-dark
      flex-md-nowrap
      p-0
      shadow
      bgDark
    "
  >
    <a
      class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 text-center logoStyle"
      href="#"
      >Cheeseny</a
    >
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap d-none d-lg-block">
        <router-link
          class="nav-link px-3 text-white"
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
    return {};
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
  created() {
    this.$bus.$on("signOut", (status) => {
      if (status) {
        this.signout();
      }
    });
  },
};
</script>
