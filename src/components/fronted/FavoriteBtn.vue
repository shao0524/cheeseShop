<template>
  <div>
    <button
      type="button"
      class="btn text-secondary"
      :class="{ 'text-danger': is_follow }"
      @click="!is_follow ? addFavorite() : removeFavorite()"
    >
      <i class="fab fa-gratipay fa-2x"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["item", "is_follow"],
  methods: {
    addFavorite() {
      const vm = this;
      console.log("f");
      vm.$bus.$emit("productList:add", vm.item);
      vm.$bus.$emit("productInfo:add", vm.item);
      vm.$bus.$emit("favorite:add", vm.item);
      vm.$bus.$emit("home:add", vm.item);
      vm.$bus.$emit("swiper:update");
      vm.$bus.$emit("Alert:success", `${vm.item.title}已加入收藏`);
    },
    removeFavorite() {
      const vm = this;
      vm.$bus.$emit("productInfo:remove", vm.item);
      vm.$bus.$emit("productList:remove", vm.item);
      vm.$bus.$emit("favorite:remove", vm.item);
      vm.$bus.$emit("home:remove", vm.item);
      vm.$bus.$emit("swiper:update");
      vm.$bus.$emit("Alert:error", `${vm.item.title}已從收藏中移除`);
    },
  },
};
</script>
