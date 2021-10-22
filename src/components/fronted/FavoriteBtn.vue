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
  props: ["product", "is_follow"],
  methods: {
    addFavorite(product) {
      const vm = this;
      vm.$bus.$emit("productList:add", product);
      vm.$bus.$emit("productInfo:add", product);
      vm.$bus.$emit("favorite:add", product);
      vm.$bus.$emit("home:add", product);
      vm.$bus.$emit("Alert:success", `${product.title}已加入收藏`);
    },
    removeFavorite(product) {
      const vm = this;
      vm.$bus.$emit("productInfo:remove", product);
      vm.$bus.$emit("productList:remove", product);
      vm.$bus.$emit("favorite:remove", product);
      vm.$bus.$emit("home:remove", product);
      vm.$bus.$emit("Alert:error", `${product.title}已從收藏中移除`);
    },
  },
};
</script>
