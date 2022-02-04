<template>
  <div class="wrapper">
    <div class="container pt-5">
      <h2 class="titleStyle my-3">促銷活動</h2>
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-12 mb-5">
          <div class="text-dark text-center eventBg py-3">
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
                <input
                  type="text"
                  class="copy"
                  v-model="coupon.code"
                  id="couponCode"
                />
                <button class="btn btn-primary" @click="copyCouponCode">
                  複製代碼
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
  name: "Event",
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
    copyCouponCode() {
      const vm = this;
      const coupon = document.getElementById("couponCode");
      coupon.select();
      document.execCommand("Copy");
      vm.$bus.$emit("alert", "已將代碼複製到剪貼簿", true);
    },
  },
};
</script>
