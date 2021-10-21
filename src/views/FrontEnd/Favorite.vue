<template>
  <div>
    <!-- banner -->
    <div class="container mt-3">
      <div class="position-relative">
        <img
          src="~image/favorite/favoriteBanner.jpg"
          alt="banner"
          class="image favoriteBanner"
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
            <ProductCard :item="item" />
          </div>
        </div>

        <h2 class="text-center" v-else>還沒有收藏的商品喔，快去找吧</h2>
        <div class="text-center mt-5">
          <router-link
            to="/products/productList/全部商品"
            class="btn btn-primary b"
            >立刻行動</router-link
          >
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
  },
  beforeDestroy() {
    this.$bus.$off("favoritePage:update");
  },
};
</script>
