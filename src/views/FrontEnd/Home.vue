<template>
  <div>
    <!-- banner -->
    <div
      class="banner mb-5 homeImage"
      :style="{
        backgroundImage: `url(${require('image/home/banner-1.jpg')})`,
      }"
    >
      <div class="banner-mask text-center">
        <span
          class="logoStyle mask-title"
          data-aos="fade-up"
          data-aos-duration="1500"
          >CheeseNy</span
        >
        <span
          class="mask-subTitle mb-3"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="500"
        >
          每日的能量來源
        </span>
        <router-link class="mask-btn" to="/products/productList"
          >立即補充</router-link
        >
      </div>
    </div>

    <!-- News -->
    <section class="mb-5">
      <div class="container">
        <h2 class="titleStyle">News</h2>
        <ul class="news-group">
          <li class="news-item">
            <h5 class="news-date d-inline-block">2021/9/3</h5>
            <a href="#" class="news-content">慶祝開幕，全館買2送1！！！</a>
          </li>
          <li class="news-item">
            <h5 class="news-date d-inline-block">2021/9/3</h5>
            <a href="#" class="news-content">消費滿1299，享有免運</a>
          </li>
          <li class="news-item">
            <h5 class="news-date d-inline-block">2021/9/3</h5>
            <a href="#" class="news-content">本月銷售冠軍：切達</a>
          </li>
        </ul>
      </div>
    </section>

    <section class="navbarBG">
      <div class="container-fluid text-center py-5">
        <h2 class="text-primary">還沒取得優惠券嗎？</h2>
        <div class="d-flex justify-content-center">
          <h2 class="text-primary mr-3">快來領取吧</h2>
          <router-link class="btn btn-success align-self-center" to="/event"
            >領取去！</router-link
          >
        </div>
      </div>
    </section>

    <!-- 類別 -->
    <section class="my-5 py-3">
      <div class="container">
        <h2 class="titleStyle mb-3">起司種類</h2>
        <div class="row">
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/軟質起司">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/softCheese.jpg"
                  alt="軟質起司"
                />
                <h5 class="mt-3 text-center">軟質起司</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/硬質起司">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/hardCheese.jpg"
                  alt="硬質起司"
                />
                <h5 class="mt-3 text-center">硬質起司</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/半硬質起司">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/halfhardCheese.jpg"
                  alt="半硬質起司"
                />
                <h5 class="mt-3 text-center">半硬質起司</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/藍紋起司">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/blueCheese.jpg"
                  alt="藍紋起司"
                />
                <h5 class="mt-3 text-center">藍紋起司</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/紡絲乳酪">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/pizzaCheese.jpg"
                  alt="紡絲乳酪"
                />
                <h5 class="mt-3 text-center">紡絲乳酪</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/起司絲">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/shreddedCheese.jpg"
                  alt="起司絲"
                />
                <h5 class="mt-3 text-center">起司絲</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/起司片">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/sliceCheese.jpg"
                  alt="起司片"
                />
                <h5 class="mt-3 text-center">起司片</h5>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-md-4 col-lg-3 mb-3">
            <router-link to="/products/productList/甜點常用起司">
              <div class="itemBox">
                <img
                  class="itemBox-Img"
                  src="~image/home/tiramisu.jpg"
                  alt="甜點常用起司"
                />

                <h5 class="mt-3 text-center">甜點常用起司</h5>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- New Product -->
    <section class="my-5 py-3">
      <div class="container">
        <h2 class="titleStyle mb-3">New products</h2>
        <div class="row mx-4">
          <div
            class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-5 mx-auto"
            v-for="item in newProducts"
            :key="item.id"
          >
            <ProductCard :item="item" :favorites="favorites" />
          </div>
        </div>
      </div>
    </section>
    <!-- Map -->
    <section class="my-5 py-3">
      <div class="container">
        <h2 class="titleStyle mb-3">店鋪位置</h2>
        <div class="text-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d588.4370098666424!2d120.34069668242358!3d22.624886377009503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1806afaba3cf9a70!2z6KGb5q2m54ef56uZ!5e0!3m2!1szh-TW!2stw!4v1630554278302!5m2!1szh-TW!2stw"
            id="map"
            style="border: 0; width: 100%"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- subscribe -->
    <section
      class="py-5 image"
      :style="{
        backgroundImage: `url(${require('@/assets/image/home/subscribe.jpg')})`,
      }"
    >
      <div class="container-fluid py-5 d-flex flex-column align-items-center">
        <h2 class="mb-3">訂閱我們</h2>
        <form @submit.prevent="">
          <div class="form-inline">
            <input
              type="email"
              name="email"
              id="email"
              class="form-control w-75"
              placeholder="請輸入電子信箱"
              v-model="email"
            />
            <button
              type="submit"
              class="btn bg-warning text-white"
              :disabled="!email"
            >
              送出
            </button>
          </div>
        </form>
      </div>
    </section>
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
      allProducts: [],
      email: "",
      favorites: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/products/all`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.allProducts = res.data.products.reverse();
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    getFavorites() {
      const vm = this;
      vm.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    },
  },
  computed: {
    newProducts() {
      let newArray = [];
      this.allProducts.forEach((item, index) => {
        if (index < 4) {
          newArray.push(item);
        }
      });
      return newArray;
    },
  },
  created() {
    this.getProducts();
    this.$bus.$on("home:add", (item) => {
      const itemIndex = this.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex === -1) {
        this.favorites.push(item);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        this.$bus.$emit("navbarFavorites:update");
      }
    });
    this.$bus.$on("home:remove", (item) => {
      const itemIndex = this.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        this.favorites.splice(itemIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
        this.$bus.$emit("navbarFavorites:update");
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("home:add");
    this.$bus.$off("home:remove");
  },
};
</script>
