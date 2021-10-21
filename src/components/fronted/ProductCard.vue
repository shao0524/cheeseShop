<template>
  <div
    class="card shadow-1 border-0 h-100"
    data-aos="fade-zoom-in"
    data-aos-once="true"
  >
    <div class="card-head position-relative">
      <img
        :src="item.imageUrl"
        class="image"
        style="width: 100%"
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
          <button class="btn btn-outline-success h6" @click="addCart(item)">
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
  data() {
    return {
      cart: {
        products: [],
      },
    };
  },
  methods: {
    getCartList() {
      const vm = this;
      vm.cart.products = JSON.parse(localStorage.getItem("products"));
    },
    addCart(item, qty = 1) {
      const vm = this;
      vm.$bus.$emit("addtoCart", item, qty);
    },
  },
  created() {
    this.getCartList();
  },
};
</script>
