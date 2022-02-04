<template>
  <div>
    <!-- banner -->
    <div
      class="banner"
      style="
        background-image: url('https://images.unsplash.com/photo-1625084561251-b3cceb9fcec6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <div class="banner-mask">
        <h1
          class="banner-mask-title logoStyle"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          CheeseNy
        </h1>
        <h2
          class="banner-mask-description"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="500"
        >
          每日的能量來源
        </h2>
        <router-link class="banner-mask-btn" to="/products/productList"
          >立即補充</router-link
        >
      </div>
    </div>

    <!-- News -->
    <section>
      <div class="container">
        <div class="news">
          <h2 class="titleStyle">News</h2>
          <ul class="news-list">
            <li class="news-list-item">
              <h5 class="news-list-item-date">2021/9/3</h5>
              <a href="#" class="news-list-item-link"
                >慶祝開幕，全館買2送1！！！</a
              >
            </li>
            <li class="news-list-item">
              <h5 class="news-list-item-date">2021/9/3</h5>
              <a href="#" class="news-list-item-link">消費滿1299，享有免運</a>
            </li>
            <li class="news-list-item">
              <h5 class="news-list-item-date">2021/9/3</h5>
              <a href="#" class="news-list-item-link">本月銷售冠軍：切達</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="bg-warning">
      <div class="container-fluid text-center py-5">
        <h2 class="text-primary">還沒取得優惠券嗎？</h2>
        <div class="d-flex justify-content-center">
          <h2 class="text-primary mr-3">快來領取吧</h2>
          <router-link class="btn btn-primary align-self-center" to="/event"
            >領取去！</router-link
          >
        </div>
      </div>
    </section>

    <!-- 類別 -->
    <section class="mt-5">
      <div class="container">
        <h2 class="titleStyle">起司種類</h2>
        <div class="itemGroup">
          <div class="itemGroup-item">
            <router-link to="/products/productList/全部商品">
              <img
                src="~image/home/softCheese.jpg"
                class="itemGroup-item-img"
              />
              <h5 class="itemGroup-item-title">軟質起司</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/硬質起司">
              <img
                class="itemGroup-item-img"
                src="~image/home/hardCheese.jpg"
                alt="硬質起司"
              />
              <h5 class="itemGroup-item-title">硬質起司</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/半硬質起司">
              <img
                class="itemGroup-item-img"
                src="~image/home/halfhardCheese.jpg"
                alt="半硬質起司"
              />
              <h5 class="itemGroup-item-title">半硬質起司</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/藍紋起司">
              <img
                class="itemGroup-item-img"
                src="~image/home/blueCheese.jpg"
                alt="藍紋起司"
              />
              <h5 class="itemGroup-item-title">藍紋起司</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/紡絲乳酪">
              <img
                class="itemGroup-item-img"
                src="~image/home/pizzaCheese.jpg"
                alt="紡絲乳酪"
              />
              <h5 class="itemGroup-item-title">紡絲乳酪</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/起司絲">
              <img
                class="itemGroup-item-img"
                src="~image/home/shreddedCheese.jpg"
                alt="起司絲"
              />
              <h5 class="itemGroup-item-title">起司絲</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/起司片">
              <img
                class="itemGroup-item-img"
                src="~image/home/sliceCheese.jpg"
                alt="起司片"
              />
              <h5 class="itemGroup-item-title">起司片</h5>
            </router-link>
          </div>
          <div class="itemGroup-item">
            <router-link to="/products/productList/甜點常用起司">
              <img
                class="itemGroup-item-img"
                src="~image/home/tiramisu.jpg"
                alt="甜點常用起司"
              />
              <h5 class="itemGroup-item-title">甜點常用起司</h5>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- New Product -->
    <section class="my-5 py-3">
      <div class="container">
        <h2 class="titleStyle mb-3">新品上市</h2>
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
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- subscribe -->
    <section class="py-5 subscribe">
      <div class="container-fluid py-5 d-flex flex-column align-items-center">
        <h2 class="mb-3 text-white">訂閱我們</h2>
        <form>
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
              class="btn bg-primary text-white"
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
    const vm = this;
    vm.getProducts();
    vm.$bus.$on("home:add", (item) => {
      const itemIndex = vm.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex === -1) {
        vm.favorites.push(item);
        localStorage.setItem("favorites", JSON.stringify(vm.favorites));
        vm.$bus.$emit("navbarFavorites:update");
      }
    });
    vm.$bus.$on("home:remove", (item) => {
      const itemIndex = vm.favorites.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.favorites.splice(itemIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(vm.favorites));
        vm.$bus.$emit("navbarFavorites:update");
      }
    });
  },
  beforeDestroy() {
    const vm = this;
    vm.$bus.$off("home:add");
    vm.$bus.$off("home:remove");
  },
};
</script>
