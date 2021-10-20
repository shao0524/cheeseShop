<template>
  <div
    class="card shadow-3 border-0 h-100"
    data-aos="fade-zoom-in"
    data-aos-once="true"
  >
    <div class="card-head position-relative">
      <img
        :src="item.imageUrl"
        class="image"
        style="height: 200px; width: 100%"
        :alt="item.title"
      />
      <router-link
        :to="`/products/item/${item.id}`"
        @click.native="$bus.$emit('updateInfo')"
        class="mask"
      ></router-link>
    </div>
    <div class="card-body">
      <h5 class="card-title text-center my-1 my-lg-2 text-primary">
        {{ item.title }}
      </h5>
      <h5 class="card-title text-center my-1 my-lg-2 text-primary">
        {{ item.titleEng }}
      </h5>
      <div class="mb-3 d-flex card-text justify-content-around">
        <del class="mr-3 h5 mb-0" v-if="item.price != item.origin_price">{{
          item.origin_price | currency
        }}</del>
        <span
          class="card-text h5"
          :class="{
            'text-danger': item.price !== item.origin_price,
            'text-dark': item.price === item.origin_price,
          }"
        >
          {{ item.price | currency }}
        </span>
      </div>
      <div class="text-center">
        <div class="d-flex justify-content-around">
          <FavoriteBtn :product="item" />
          <button class="btn btn-outline-info h6" @click="addCart(item)">
            <i class="fas fa-cart-plus"></i> 加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteBtn from "components/fronted/FavoriteBtn.vue";
export default {
  props: ["item"],
  components: {
    FavoriteBtn,
  },
  methods: {
    addCart(item, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      const cart = {
        product_id: item.id,
        qty: qty,
      };
      this.$http
        .post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            //更新sidebar
            vm.$bus.$emit("addItem:success");
            vm.$bus.$emit("Alert:success", `${item.title} 已成功加入購物車`);
          }
        })
        .catch((error) => {
          vm.$bus.$emit("Alert:error", error);
        });
    },
  },
};
</script>
