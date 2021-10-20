<template>
  <div>
    <AdminNavbar />
    <div class="container-fluid">
      <div class="row">
        <AdminSidebar />
        <div class="col-12 col-md-9 col-lg-10 ml-auto px-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "components/backed/AdminNavbar.vue";
import AdminSidebar from "components/backed/AdminSidebar.vue";
export default {
  components: {
    AdminNavbar,
    AdminSidebar,
  },
  created() {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)cheese4ny\s*=\s*([^;]*).*$)|^.*$/,
      `$1`
    );
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
