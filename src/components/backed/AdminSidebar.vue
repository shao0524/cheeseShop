<template>
  <nav class="backEndSidebar" :class="{ 'backEndSidebar-active': isActive }">
    <ul class="backEndSidebar-nav">
      <li class="backEndSidebar-nav-item">
        <router-link
          class="backEndSidebar-nav-item-link"
          to="/admin/catalogue"
          :class="{
            'backEndSidebar-nav-item-link-active':
              this.$route.name === 'Catalogue',
          }"
          @click.native="isActive = false"
          ><i class="fas fa-cheese"></i>產品目錄</router-link
        >
      </li>
      <li class="backEndSidebar-nav-item">
        <router-link
          class="backEndSidebar-nav-item-link"
          to="/admin/orderlist"
          @click.native="isActive = false"
          :class="{
            'backEndSidebar-nav-item-link-active':
              this.$route.name === 'OrderList',
          }"
        >
          <i class="fas fa-list"></i>訂單查詢</router-link
        >
      </li>
      <li class="backEndSidebar-nav-item">
        <router-link
          class="backEndSidebar-nav-item-link"
          to="/admin/couponlist"
          @click.native="isActive = false"
          :class="{
            'backEndSidebar-nav-item-link-active':
              this.$route.name === 'CouponList',
          }"
          ><i class="fas fa-ticket"></i>優惠券查詢</router-link
        >
      </li>
    </ul>
    <h5 class="backEndSidebar-tag">操作</h5>
    <ul class="backEndSidebar-nav">
      <li class="backEndSidebar-nav-item">
        <router-link class="backEndSidebar-nav-item-link" to="/"
          ><i class="fas fa-home"></i>回首頁</router-link
        >
      </li>
      <li class="backEndSidebar-nav-item d-lg-none">
        <router-link
          class="backEndSidebar-nav-item-link text-danger"
          to="/"
          @click.native="signout"
          ><i class="fas fa-sign-out-alt"></i>登出</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    signout() {
      const vm = this;
      vm.$bus.$emit("signOut", true);
    },
    closeNavbar() {
      if ($(window).width() <= 768) {
        $(".navbar-toggler").click();
      }
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on("openSidebar", () => {
      vm.isActive = true;
    });
    vm.$bus.$on("hideSidebar", () => {
      vm.isActive = false;
    });
  },
  beforeDestroy() {
    const vm = this;
    vm.$bus.$off("openSidebar");
    vm.$bus.$off("hideSidebar");
  },
};
</script>
