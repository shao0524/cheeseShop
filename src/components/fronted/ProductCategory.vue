<template>
  <div>
    <div class="listGroup mt-5 font-weight-bolder">
      <a
        href="#Card"
        class="listGroup-item titleStyle"
        @click="
          (clickedCategory = '全部商品'), changeCategory('全部商品'), scoller()
        "
        :class="{ active: clickedCategory == '全部商品' }"
        >全部商品</a
      >
      <a
        href="#Card"
        class="listGroup-item titleStyle"
        @click="
          (clickedCategory = `${category}`),
            changeCategory(`${category}`),
            scoller()
        "
        :class="{ active: clickedCategory == `${category}` }"
        v-for="(category, index) in categories"
        :key="index"
        >{{ category }}</a
      >
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: ["categories"],
  data() {
    return {
      clickedCategory: "全部商品",
    };
  },
  methods: {
    changeCategory(category) {
      const vm = this;
      vm.$emit("changeCategory", category);
    },
    scoller() {
      $("html,body").animate({ scrollTop: $("#Card").offset().top }, 500);
    },
  },
  created() {
    const category = this.$route.params.category;
    if (category) {
      this.clickedCategory = category;
      this.changeCategory(category);
    }
  },
};
</script>
