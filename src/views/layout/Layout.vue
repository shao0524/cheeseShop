<template>
  <div>
    <div class="container-fluid px-0 position-relative">
      <div class="d-flex">
        <CartList />
        <div class="container-fluid px-0">
          <Navbar class="sticky-top" />
          <router-view></router-view>
          <Footer />
        </div>
      </div>
    </div>
    <!-- scrollTop -->
    <button type="button" class="scollTopBtn" @click.prevent="scrollTop">
      <i class="fas fa-arrow-up fa-2x"></i>
    </button>
  </div>
</template>

<script>
import $ from "jquery";
import Navbar from "components/fronted/Navbar.vue";
import CartList from "components/fronted/CartList.vue";
import Footer from "components/fronted/Footer.vue";
export default {
  components: {
    Navbar,
    CartList,
    Footer,
  },
  methods: {
    scrollTop() {
      $("html,body").animate({ scrollTop: "0px" }, 1000);
    },
  },
};
</script>
