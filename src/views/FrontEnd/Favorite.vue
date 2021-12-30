<template>
  <div class="wrapper">
    <!-- banner -->
    <div class="container">
      <div class="position-relative">
        <img
          src="https://images.unsplash.com/photo-1625084561188-0cb22b1d487d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80"
          alt="banner"
          class="favoriteBanner"
        />
        <div class="text-center favoriteOffset">
          <h2>我的收藏</h2>
        </div>
      </div>
      <router-link class="btn my-3" @click.native="$router.go(-1)" to
        ><i class="fas fa-arrow-left fa-2x"></i>
      </router-link>
      <section class="mt-3 favoriteWrapper mx-3 mx-md-0">
        <div class="row" v-if="len">
          <div
            class="col-12 col-md-6 col-xl-4 mb-5"
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
  name: "Favorite",
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
    this.getFavorite();
    this.$bus.$on("favoritePage:update", () => {
      this.getFavorite();
    });
    this.$bus.$on("favorite:add", (item) => {
      const itemIndex = this.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex === -1) {
        this.favorites.push(item);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        this.$bus.$emit("navbarFavorites:update");
      }
    });
    this.$bus.$on("favorite:remove", (item) => {
      const itemIndex = this.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        this.favorites.splice(itemIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        this.$bus.$emit("navbarFavorites:update");
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("favoritePage:update");
    this.$bus.$off("favorite:add");
    this.$bus.$off("favorite:remove");
  },
};
</script>
