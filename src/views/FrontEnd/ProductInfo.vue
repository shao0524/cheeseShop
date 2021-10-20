<template>
  <div>
    <!-- main -->
    <div class="container">
      <div class="text-left mt-3">
        <router-link class="btn btn-link" @click.native="$router.go(-1)" to
          ><i class="fas fa-arrow-left fa-2x"></i
        ></router-link>
      </div>
      <div class="row mt-3 mx-1 mx-md-0 mx-lg-0">
        <div class="col-12 col-md-6 col-lg-6 text-center px-0">
          <img :src="product.imageUrl" class="shadow-3 image" />
        </div>
        <div class="col-12 col-md-6 col-lg-6 text-center mt-3 mt-md-0">
          <div class="mb-1">
            <h3>{{ product.title }}</h3>
            <h3>{{ product.titleEng }}</h3>
          </div>
          <div class="row justify-content-between mx-1">
            <ul class="text-left">
              <li>產地：{{ product.place }}</li>
              <li>原料：{{ product.material }}</li>
              <li>單位：1 {{ product.unit }}</li>
            </ul>
            <FavoriteBtn :product="product" />
          </div>

          <div class="mb-1 d-flex justify-content-between">
            <div>
              <del
                class="mr-3 h5"
                v-if="!(product.origin_price == product.price)"
                >NT{{ product.origin_price }}</del
              >
              <span
                class="h3 mr-auto"
                :class="{
                  'text-danger': !(product.origin_price == product.price),
                }"
                >NT{{ product.price }}</span
              >
            </div>
            <div class="d-flex mr-3">
              <h5 class="mr-2">庫存</h5>
              <h5 class="text-danger">{{ product.stock }}</h5>
            </div>
          </div>
          <div class="row justify-content-center">
            <!-- input -->
            <div class="col-12 col-md-12 col-lg-12 mb-3 mb-md-3">
              <div class="form-inline justify-content-center">
                <button
                  class="btn btn-outline-secondary rounded-circle"
                  @click="itemQty--"
                  :disabled="itemQty < 2"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  id="number"
                  class="border-0 text-center form-control bg-transparent"
                  v-model="itemQty"
                />
                <button
                  class="btn btn-outline-secondary rounded-circle"
                  @click="itemQty++"
                  :disabled="itemQty >= product.stock"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-6 mb-3 mb-md-3">
              <!-- addCart -->
              <div class="text-center">
                <button
                  class="btn btn-warning"
                  :disabled="itemQty > product.stock || itemQty <= 0"
                  @click="addCart(product, itemQty)"
                >
                  <i class="fas fa-cart-plus mr-1"></i>加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            <h5 class="pl-3 py-2 bg-secondary text-white text-left">
              產品介紹
            </h5>
            <p class="text-justify lineHeight-2">{{ product.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- notice -->
    <section style="backgroundcolor: #17a2b84d">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-8 col-lg-8">
            <div class="py-3 mt-3">
              <h3>注意事項：</h3>
              <ul class="font-weight-bolder">
                <li class="lineHeight-2">
                  <span class="cheeseIcon mr-1"></span
                  >本產品含有牛奶製品可能導致過敏症狀
                </li>
                <li class="lineHeight-2">
                  <span class="cheeseIcon mr-1"></span
                  >未開封請於7度C以下冷藏保存，開封後請分切冷凍保存
                </li>
                <li class="lineHeight-2">
                  <span class="cheeseIcon mr-1"></span
                  >已開封但冷藏保存的起司，請在一週內食用完畢。
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6 col-md-4 d-none d-md-block">
            <img
              src="~image/products/bg-1.jpg"
              alt="notice"
              class="image h-100 w-100"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- swiper -->
    <section>
      <div class="container">
        <div class="text-center mt-3">
          <h3 class="h3 py-3">您可能感興趣的</h3>
        </div>
        <div class="mb-5">
          <Swiper />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swiper from "components/fronted/Swiper.vue";
import FavoriteBtn from "components/fronted/FavoriteBtn.vue";
import $ from "jquery";
export default {
  components: {
    Swiper,
    FavoriteBtn,
  },
  data() {
    return {
      itemQty: "1",
      product: {},
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/product/${id}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.product = res.data.product;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    addCart(item, qty) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      vm.$bus.$emit("isLoading", true);
      const cart = {
        product_id: item.id,
        qty: qty,
      };
      this.$http
        .post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("addItem:success");
            vm.$bus.$emit("Alert:success", `${item.title} 已成功加入購物車`);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
  },
  watch: {
    $route: {
      handler() {
        this.getProduct(this.$route.params.productId);
        $("html,body").animate({ scrollTop: "0px" }, 1000);
      },
    },
  },
  created() {
    this.getProduct(this.$route.params.productId);
  },
};
</script>
