<template>
  <div>
    <AdminNavbar />
    <section class="d-flex">
      <AdminSidebar />
      <main class="adminMainBlock">
        <router-view></router-view>
      </main>
    </section>
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
