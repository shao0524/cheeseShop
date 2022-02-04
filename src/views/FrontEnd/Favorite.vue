<template>
  <div class="wrapper">
    <!-- banner -->
    <div class="container">
      <div
        class="banner banner-sm"
        style="
          background-image: url('https://images.unsplash.com/photo-1625084561188-0cb22b1d487d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
        "
      >
        <div class="banner-mask">
          <h2 class="banner-mask-description">我的收藏</h2>
        </div>
      </div>
      <router-link class="btn my-3" @click.native="$router.go(-1)" to
        ><i class="fas fa-arrow-left fa-2x"></i>
      </router-link>
      <section class="mt-3 favoriteWrapper mx-3 mx-md-0">
        <div class="row" v-if="len">
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-5"
            v-for="item in favorites"
            :key="item.id"
          >
            <ProductCard :item="item" :favorites="favorites" />
          </div>
        </div>

        <div class="text-center mb-5" v-else>
          <h2 class="text-center">目前沒有收藏的商品</h2>
          <router-link
            class="btn btn-primary mt-3"
            @click.native="slideUpNavbar"
            to="/products/productList/全部商品"
            ><i class="fas fa-shopping-cart mr-1"></i>去逛逛吧
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProductCard from "components/fronted/ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    getFavorite() {
      const vm = this;
      vm.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    },
    slideUpNavbar() {
      const vm = this;
      vm.$bus.$emit("slideUpNavbar");
    },
  },
  computed: {
    len() {
      if (this.favorites.length > 0) {
        return true;
      }
      return false;
    },
  },
  created() {
    const vm = this;
    vm.getFavorite();
    vm.$bus.$on("favoritePage:update", () => {
      vm.getFavorite();
    });
    vm.$bus.$on("favorite:add", (item) => {
      const itemIndex = vm.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex === -1) {
        vm.favorites.push(item);
        localStorage.setItem("favorites", JSON.stringify(vm.favorites));
        vm.$bus.$emit("navbarFavorites:update");
      }
    });
    vm.$bus.$on("favorite:remove", (item) => {
      const itemIndex = vm.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.favorites.splice(itemIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(vm.favorites));
        vm.$bus.$emit("navbarFavorites:update");
      }
    });
  },
  beforeDestroy() {
    const vm = this;
    vm.$bus.$off("favoritePage:update");
    vm.$bus.$off("favorite:add");
    vm.$bus.$off("favorite:remove");
  },
};
</script>
