<template>
  <div>
    <div class="listGroup">
      <div class="listGroup-header">
        <h4 class="listGroup-header-title">起司分類</h4>
      </div>
      <ul class="listGroup-body">
        <li
          class="listGroup-item"
          :class="{
            'listGroup-item-active': clickedCategory == '全部商品',
          }"
        >
          <a
            href="#Card"
            class="listGroup-item-link"
            @click.prevent="changeCategory('全部商品'), scoller()"
            >全部商品</a
          >
        </li>
        <li
          class="listGroup-item"
          v-for="(category, index) in categories"
          :key="index"
          :class="{
            'listGroup-item-active': clickedCategory == category,
          }"
        >
          <a
            href="#Card"
            class="listGroup-item-link"
            @click.prevent="changeCategory(category), scoller()"
            >{{ category }}</a
          >
        </li>
      </ul>
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
      vm.clickedCategory = category;
      vm.$emit("changeCategory", category);
    },
    scoller() {
      $("html,body").animate({ scrollTop: $("#Card").offset().top }, 500);
    },
  },
  created() {
    const category = this.$route.params.category;
    if (category) {
      this.changeCategory(category);
    }
  },
};
</script>
