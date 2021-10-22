<template>
  <nav
    id="sidebarMenu"
    class="col-12 col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column mt-3">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/admin/catalogue"
            :class="{ active: this.$route.name === 'Catalogue' }"
            @click.native="closeNavbar"
            ><i class="fas fa-cheese mr-3 ml-3"></i>產品目錄</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/admin/orderlist"
            @click.native="closeNavbar"
            :class="{ active: this.$route.name === 'OrderList' }"
          >
            <i class="fas fa-list mr-3 ml-3"></i>訂單查詢</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/admin/couponlist"
            @click.native="closeNavbar"
            :class="{ active: this.$route.name === 'CouponList' }"
            ><i class="fas fa-ticket mr-3 ml-3"></i>優惠券查詢</router-link
          >
        </li>
      </ul>
      <h5
        class="
          sidebar-heading
          d-flex
          justify-content-between
          align-items-center
          px-3
          my-3
          mx-3
        "
      >
        操作
      </h5>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/"
            ><i class="fas fa-home mx-3"></i>回首頁</router-link
          >
        </li>
        <li class="nav-item d-lg-none">
          <router-link class="nav-link" to="/" @click.native="signout"
            ><i class="fas fa-sign-out-alt mx-3"></i>登出</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import $ from "jquery";
export default {
  methods: {
    signout() {
      const vm = this;
      vm.$bus.$emit("signOut", true);
    },
    closeNavbar() {
      if ($(window).width() < 768) {
        $(".navbar-toggler").click();
      }
    },
  },
};
</script>
