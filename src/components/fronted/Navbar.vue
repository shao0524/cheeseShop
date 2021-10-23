<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light text-dark navbarBG shadow-3"
    >
      <router-link class="navbar-brand ml-3 logoStyle text-primary" to="/"
        ><h1 class="text-primary">Cheeseny</h1></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- 頁面列表 -->
        <ul
          class="
            navbar-nav
            mr-auto
            ml-3
            align-items-start align-items-md-left align-items-lg-center
          "
        >
          <li class="nav-item">
            <router-link
              class="nav-link font-weight-bolder h4 mb-0"
              :class="{ 'text-primary': this.$route.name === 'Home' }"
              @click.native="closeNavbar"
              to="/"
              >首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link font-weight-bolder h4 mb-0"
              :class="{ 'text-primary': this.$route.name == 'About' }"
              @click.native="closeNavbar"
              to="/about"
              >關於起司</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link font-weight-bolder h4 mb-0"
              :class="{ 'text-primary': this.$route.name === 'ProductList' }"
              @click.native="closeNavbar"
              to="/products/productList/全部商品"
              >產品介紹</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link font-weight-bolder h4 mb-0"
              :class="{ 'text-primary': this.$route.name === 'Event' }"
              @click.native="closeNavbar"
              to="/event"
              >優惠活動</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav ml-3">
          <!-- 我的最愛 -->
          <li class="nav-item mr-3 py-2 position-relative">
            <router-link
              class="btn text-secondary"
              to="/favorite"
              @click.native="closeNavbar"
              :class="{ 'text-success': is_signin }"
              ><i class="fas fa-heart fa-2x"></i
            ></router-link>
            <span
              class="badge badge-danger rounded-circle"
              v-if="favoritesLen > 0"
              >{{ favoritesLen }}</span
            >
          </li>
          <!-- 會員 -->
          <li class="nav-item mr-3 py-2">
            <!-- 會員未登入 -->
            <div class="dropdown">
              <router-link
                class="btn text-secondary"
                to="/login"
                v-if="!is_signin"
                ><i class="fas fa-user-circle fa-2x"></i
              ></router-link>
              <!-- 會員已登入 -->
              <button
                type="button"
                class="btn text-success bg-transparent border-0"
                id="member"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-else
              >
                <i class="fas fa-user-circle fa-2x"></i>
              </button>

              <div
                class="dropdown-menu dropdown-menu-right w-25"
                aria-labelledby="member"
              >
                <router-link
                  class="dropdown-item py-1 py-lg-1"
                  to="/customer/myorderlist"
                  @click.native="
                    currentPage = 'myorderlist';
                    closeNavbar();
                  "
                  >我的訂單</router-link
                >
                <router-link
                  class="dropdown-item py-1 py-lg-1"
                  to="/customer/mycouponlist"
                  @click.native="
                    currentPage = 'myordercoupon';
                    closeNavbar();
                  "
                  >我的優惠券</router-link
                >
                <router-link
                  class="dropdown-item text-danger py-1 py-lg-1"
                  to="/admin/"
                  >後台</router-link
                >
                <button
                  type="button"
                  class="dropdown-item py-1 text-danger"
                  href="#"
                  @click="signout"
                >
                  會員登出
                </button>
              </div>
            </div>
          </li>

          <!-- 購物車 -->
          <li class="nav-item mr-3 py-2 position-relative">
            <div class="dropdown">
              <button
                type="button"
                class="btn text-secondary border-0 bg-transparent"
                id="cart"
                :class="{
                  'text-success': is_signin,
                }"
                @click.prevent="
                  openCartList();
                  closeNavbar();
                "
              >
                <i class="fas fa-shopping-cart fa-2x"></i>
              </button>
            </div>
            <span
              class="badge badge-danger rounded-circle"
              v-if="cartItemLen > 0"
              >{{ cartItemLen }}</span
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      cartItemLen: 0,
      favoritesLen: 0,
      favorites: [],
      has_favorite: false,
    };
  },
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            document.cookie = `cheese4ny=;expires=${new Date(0).toGMTString()}`;
            this.$http.defaults.headers.common.Authorization = "";
            vm.$bus.$emit("isLoading", false);
          }
          vm.$router.go(0);
          vm.$bus.$emit("Alert:success", "已登出");
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    checkLoginStatus() {
      const myCookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)cheese4ny\s*=\s*([^;]*).*$)|^.*$/,
        `$1`
      );
      this.$http.defaults.headers.common.Authorization = myCookie;
    },
    openCartList() {
      const vm = this;
      vm.$bus.$emit("openSiderbar", true);
    },
    closeNavbar() {
      if ($(window).width() < 768) {
        $(".navbar-toggler").click();
      }
    },
    getCartListLen(len) {
      const vm = this;
      vm.cartItemLen = len;
    },
    getFavoriteLen() {
      const vm = this;
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      vm.favoritesLen = favorites.length;
    },
  },
  computed: {
    is_signin() {
      if (this.$http.defaults.headers.common.Authorization) {
        this.$bus.$emit("signIn", true);
        return true;
      } else {
        this.$bus.$emit("signIn", false);
        return false;
      }
    },
  },
  created() {
    //取得購物車數量
    //取得我的最愛數量
    this.getFavoriteLen();
    //檢查登入狀態
    this.checkLoginStatus();
    //購物車物件數量
    this.$bus.$on("navbarCartList:update", (len) => {
      this.getCartListLen(len);
    });
    this.$bus.$on("navbarFavorites:update", () => {
      this.getFavoriteLen();
    });
  },
  beforeDestroy() {
    this.$bus.$off("navbarCartList:update");
    this.$bus.$off("navbarFavorites:update");
  },
};
</script>
