<template>
  <div>
    <nav class="nb">
      <router-link to="/"
        ><h1 class="nb-logo nb-logo logoStyle">Cheeseny</h1></router-link
      >
      <button
        class="nb-toggleBtn"
        type="button"
        :class="{ 'nb-toggleBtn-active': isToggleClick }"
        @click="isToggleClick = !isToggleClick"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="nb-collapse" :class="{ 'nb-collapse-active': isToggleClick }">
        <!-- 頁面列表 -->
        <ul class="nb-nav">
          <li class="nb-nav-item">
            <router-link
              class="nb-nav-item-link"
              :class="{
                'nb-nav-item-link-active': this.$route.name === 'Home',
              }"
              @click.native="isToggleClick = false"
              to="/"
              >首頁</router-link
            >
          </li>
          <li class="nb-nav-item">
            <router-link
              class="nb-nav-item-link"
              :class="{
                'nb-nav-item-link-active': this.$route.name == 'About',
              }"
              to="/about"
              @click.native="isToggleClick = false"
              >關於起司</router-link
            >
          </li>
          <li class="nb-nav-item">
            <router-link
              class="nb-nav-item-link"
              :class="{
                'nb-nav-item-link-active': this.$route.name === 'ProductList',
              }"
              to="/products/productList/全部商品"
              @click.native="isToggleClick = false"
              >產品介紹</router-link
            >
          </li>
          <li class="nb-nav-item">
            <router-link
              class="nb-nav-item-link"
              :class="{
                'nb-nav-item-link-active': this.$route.name === 'Event',
              }"
              to="/event"
              @click.native="isToggleClick = false"
              >優惠活動</router-link
            >
          </li>
        </ul>

        <div class="nb-btnGroup">
          <!-- favorite -->
          <div class="nb-btnGroup-item">
            <button
              type="button"
              class="nb-btn"
              @click="toFavorite()"
              :class="{
                'nb-btn-active': isLogin,
              }"
            >
              <i class="fas fa-heart fa-2x"></i>
              <span
                class="nb-badge nb-badge-color-danger"
                v-if="favoritesLen > 0"
                >{{ favoritesLen }}</span
              >
            </button>
          </div>
          <!-- cartList -->
          <div class="nb-btnGroup-item">
            <button
              type="button"
              class="nb-btn"
              @click="openCartList"
              :class="{
                'nb-btn-active': isLogin,
              }"
            >
              <i class="fas fa-shopping-cart fa-2x"></i>
              <span class="nb-badge nb-badge-color-danger" v-if="cartLen > 0">{{
                cartLen
              }}</span>
            </button>
          </div>
          <!-- user -->
          <div class="nb-btnGroup-item">
            <div class="nb-dropDown">
              <button
                type="button"
                class="nb-dropDown-toggle"
                :class="{
                  'nb-dropDown-toggle-active': isLogin,
                }"
                @click="isUserBtnClick = !isUserBtnClick"
              >
                <i class="fas fa-user-circle fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
        <ul
          class="nb-dropDown-list"
          :class="{ 'nb-dropDown-list-active': isUserBtnClick }"
        >
          <li class="nb-dropDown-list-item" v-if="!isLogin">
            <router-link
              class="
                nb-dropDown-list-item-link nb-dropDown-list-item-link-danger
              "
              to="/login"
              v-if="!isLogin"
              >管理者登入</router-link
            >
          </li>
          <li class="nb-dropDown-list-item" v-if="isLogin">
            <router-link
              class="
                nb-dropDown-list-item-link nb-dropDown-list-item-link-danger
              "
              to="/admin"
            >
              後台</router-link
            >
          </li>
          <li class="nb-dropDown-list-item" v-if="isLogin">
            <button
              class="
                nb-dropDown-list-item-link nb-dropDown-list-item-link-danger
              "
              type="button"
              @click="signout"
            >
              會員登出
            </button>
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
      favorites: [],
      cartList: [],
      isToggleClick: false,
      isUserBtnClick: false,
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
    getCartList() {
      const vm = this;
      vm.cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    },
    getFavorites() {
      const vm = this;
      vm.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    },
    toFavorite() {
      const vm = this;
      vm.isToggleClick = false;
      vm.$router.push("/favorite");
    },
  },
  computed: {
    isLogin() {
      const vm = this;
      if (this.$http.defaults.headers.common.Authorization) {
        vm.$bus.$emit("signIn", true);
        return true;
      } else {
        vm.$bus.$emit("signIn", false);
        return false;
      }
    },
    cartLen() {
      const vm = this;
      return vm.cartList.length;
    },
    favoritesLen() {
      const vm = this;
      return vm.favorites.length;
    },
  },
  created() {
    const vm = this;
    //取得購物車數量
    vm.getCartList();
    //取得我的最愛數量
    vm.getFavorites();
    //檢查登入狀態
    vm.checkLoginStatus();
    //購物車物件數量
    vm.$bus.$on("navbarCartList:update", () => {
      vm.getCartList();
    });
    vm.$bus.$on("navbarFavorites:update", () => {
      vm.getFavorites();
    });
    vm.$bus.$on("slideUpNavbar", () => {
      vm.isToggleClick = false;
    });
  },
  mounted() {
    $(".nb-dropDown-toggle").click(() => {
      $(".nb-dropDown-list").slideToggle();
    });
  },
  beforeDestroy() {
    const vm = this;
    vm.$bus.$off("navbarCartList:update");
    vm.$bus.$off("navbarFavorites:update");
  },
};
</script>
