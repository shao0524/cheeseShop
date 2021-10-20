<template>
  <div>
    <button
      type="button"
      class="btn text-secondary"
      :class="{ 'text-danger': is_follow }"
      @click="!is_follow ? addFavorite(product) : removeFavorite(product)"
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
      const index = vm.favorites.findIndex((item) => item.id === product.id);
      if (index === -1) {
        vm.favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(vm.favorites));
      }
      vm.$bus.$emit("Alert:success", `${product.title} 已加入收藏`);
      vm.$bus.$emit("updateFavorite");
      vm.$bus.$emit("updateFavoritePage");
    },
    removeFavorite(product) {
      const vm = this;
      vm.favorites.forEach((item, index) => {
        if (item.id === product.id) {
          vm.favorites.splice(index, 1);
        }
      });
      localStorage.setItem("favorites", JSON.stringify(vm.favorites));
      vm.$bus.$emit("Alert:error", `${product.title} 已取消收藏`);
      vm.$bus.$emit("updateFavorite");
      vm.$bus.$emit("updateFavoritePage");
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
  mounted() {
    this.getFavorites();
    this.$bus.$on("updateFavorite", () => {
      this.getFavorites();
    });
  },
  beforeDestroy() {
    this.$bus.$off("updateFavorite");
  },
};
</script>
