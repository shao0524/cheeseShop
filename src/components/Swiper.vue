<template>
  <div>
    <swiper class="swiper py-3 px-3" :options="swiperOption" ref="myswiper">
      <swiper-slide v-for="item in products" :key="item.id">
        <ProductCard :item="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import ProductCard from "components/ProductCard.vue";
import "swiper/css/swiper.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductCard,
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        speed: 500,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          960: {
            slidesPerView: 3,
          },
        },
      },
      products: [],
    };
  },
  methods: {
    getProductData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.products = res.data.products;
          }
        })
        .catch((error) => {
          vm.$bus.$emit("Alert:error", error);
        });
    },
  },
  created() {
    this.getProductData();
  },
};
</script>
