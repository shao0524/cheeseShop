<template>
  <div>
    <button
      type="button"
      class="btn text-secondary"
      v-if="!is_follow"
      @click="addFavorite(product)"
    >
      <i class="fab fa-gratipay fa-2x"></i>
    </button>
    <button
      type="button"
      class="btn text-danger"
      v-else
      @click="removeFavorite(product)"
    >
      <i class="fab fa-gratipay fa-2x"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    getFavorites() {
      const vm = this;
      vm.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    },
    addFavorite(product) {
      const vm = this;
      const itemIndex = vm.favorites.findIndex(
        (item) => item.id === product.id
      );
      if (itemIndex === -1) {
        vm.favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(vm.favorites));
      }
      vm.$bus.$emit("favoriteBtn:update");
      // vm.$bus.$emit("navbarFavorites:update");
      // vm.$bus.$emit("favoritePage:update");
      // vm.$bus.$emit("Alert:success", `${product.title} 已加入收藏`);
    },
    removeFavorite(product) {
      const vm = this;
      vm.favorites.forEach((item, index) => {
        if (item.id === product.id) {
          vm.favorites.splice(index, 1);
        }
      });
      localStorage.setItem("favorites", JSON.stringify(vm.favorites));
      vm.$bus.$emit("favoriteBtn:update");
      // vm.$bus.$emit("navbarFavorites:update");
      // vm.$bus.$emit("favoritePage:update");
      // vm.$bus.$emit("Alert:error", `${product.title} 已取消收藏`);
    },
  },
  computed: {
    is_follow() {
      const vm = this;
      if (vm.favorites.findIndex((item) => item.id === vm.product.id) !== -1) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.getFavorites();
    this.$bus.$on("favoriteBtn:update", () => {
      console.log("update");
      this.getFavorites();
    });
  },
  beforeDestroy() {
    this.$bus.$off("favoriteBtn:update");
  },
};
</script>
