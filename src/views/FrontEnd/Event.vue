<template>
  <div class="container pt-5">
    <div class="Wrapper">
      <h2 class="titleStyle my-3">促銷活動</h2>
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-12 mb-5">
          <div
            class="text-white text-center image py-3"
            :style="{
              backgroundImage: `url(${require('@/assets/image/event/eventBG.jpg')})`,
            }"
          >
            <div class="row">
              <div
                class="
                  col-md-6 col-lg-5
                  text-center
                  d-none d-md-block d-lg-block
                  align-self-center
                "
              >
                <h3 class="display-1 pb-3 d-block">
                  {{ coupon.percent }}%<sub class="display-4 text-danger"
                    >off</sub
                  >
                </h3>
              </div>
              <div class="col-12 col-md-6 col-lg-7 text-center text-md-left">
                <h2 class="mt-3">{{ coupon.title }}</h2>
                <h5 class="py-1">{{ coupon.content }}</h5>
                <h5 class="d-md-none d-lg-none">
                  {{ coupon.percent }}%<sub class="h5 text-danger">off</sub>
                </h5>
                <h5 class="py-1">使用期限至：{{ coupon.expired }}</h5>
                <button class="btn btn-primary" @click="setCoupon(coupon)">
                  取得優惠券
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon: {
        title: "慶祝開幕",
        code: "cheeseny80off",
        content: "全館皆可使用",
        percent: "80",
        expired: "2021/12/31",
        is_used: false,
      },
    };
  },
  methods: {
    setCoupon(coupon) {
      const vm = this;
      let coupons = JSON.parse(localStorage.getItem("coupons")) || [];
      const index = coupons.findIndex((item) => item.code === coupon.code);
      if (index === -1) {
        coupons.push(coupon);
        localStorage.setItem("coupons", JSON.stringify(coupons));
        vm.$bus.$emit("Alert:success", "新增優惠券");
      } else {
        vm.$bus.$emit("Alert:error", "已存在相同優惠券");
      }
    },
  },
};
</script>
