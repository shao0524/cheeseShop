<template>
  <div>
    <div
      class="
        row
        flex-column-reverse
        flex-sm-column-reverse
        flex-md-column-reverse
        flex-lg-row
      "
    >
      <div class="col-md-12 col-lg-8 pb-5">
        <h2 class="text-center mb-3">訂購人資訊</h2>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submitData" class="card">
            <div class="card-body">
              <div class="container">
                <ValidationProvider
                  class="form-group"
                  v-slot="{ failed, errors }"
                  rules="email||required"
                >
                  <label for="email" class="h4 py-1"
                    >Email<span class="text-danger">*</span></label
                  >
                  <input
                    type="email"
                    name="Email"
                    id="email"
                    class="form-control"
                    v-model="user.email"
                    :class="{ is_invalid: failed }"
                  />
                  <span v-if="failed" class="text-danger d-block my-1 h5">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  class="form-group"
                  v-slot="{ failed, errors }"
                  rules="required|name"
                >
                  <label for="name" class="h4 py-1"
                    >姓名<span class="text-danger">*</span></label
                  >
                  <input
                    type="name"
                    name="姓名"
                    id="name"
                    class="form-control"
                    :class="{ is_invalid: failed }"
                    v-model="user.name"
                  />
                  <span v-if="failed" class="text-danger d-block my-1 h5">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
                <ValidationProvider
                  rules="phone|required"
                  class="form-group"
                  v-slot="{ failed, errors }"
                >
                  <label for="tel" class="h4 py-1"
                    >電話或手機<span class="text-danger">*</span></label
                  >
                  <input
                    type="tel"
                    name="電話"
                    id="tel"
                    class="form-control"
                    :class="{ is_invalid: failed }"
                    v-model="user.tel"
                  />
                  <div class="d-flex">
                    <span v-if="failed" class="text-danger d-block my-1 h5">{{
                      errors[0]
                    }}</span>
                    <span class="text-right ml-auto"
                      >(電話號碼須包含區域碼)</span
                    >
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  class="form-group"
                  v-slot="{ failed, errors }"
                  rules="required"
                >
                  <label for="address" class="h4 py-1"
                    >地址<span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="地址"
                    id="address"
                    class="form-control"
                    :class="{ is_invalid: failed }"
                    v-model="user.address"
                  />
                  <span class="text-danger d-block my-1 h5">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>

                <div class="form-group mb-3">
                  <label for="message" class="h4">備註</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="3"
                    class="form-control"
                    v-model="message"
                  ></textarea>
                </div>
                <!-- button -->
                <div class="form-inline justify-content-end">
                  <router-link
                    class="btn btn-outline-secondary mr-3"
                    to="/order/cartlist"
                    >返回上一頁</router-link
                  >
                  <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="invalid"
                  >
                    完成訂單
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div class="col-md-12 col-lg-4">
        <h2 class="text-center mb-3">訂單列表</h2>
        <!-- total -->
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h5>總金額</h5>
            <h5>{{ finalTotal | currency }}</h5>
          </div>
        </div>
        <div class="overflow-auto my-3" style="height: 250px">
          <!-- item -->
          <div class="card my-3" v-for="item in cartList" :key="item.id">
            <div class="card-body d-flex justify-content-between">
              <div>
                <h5>{{ item.product.title }}</h5>
                <span>數量：{{ item.qty }}</span>
              </div>

              <h6 class="align-self-center text-danger">
                金額：{{ item.final_total | currency }}
              </h6>
            </div>
          </div>
        </div>

        <!-- coupon -->
        <div class="card mb-4">
          <div class="card-footer">
            <h5>優惠券</h5>
            <div class="form-group">
              <input
                type="text"
                name="coupon"
                id="coupon"
                class="form-control"
                placeholder="請輸入優惠券代碼"
                v-model="couponCode"
              />

              <label class="text-danger mt-1" v-if="errorMessage">{{
                errorMessage
              }}</label>
            </div>
            <button
              type="button"
              class="btn btn-outline-danger btn-block"
              @click="useCoupon"
              :disabled="!couponCode"
            >
              使用優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      user: {},
      message: "",
      cartList: [],
      couponCode: "",
      errorMessage: "",
      couponUsed: false,
    };
  },
  methods: {
    async getCartList() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          vm.cartList = res.data.data.carts;
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("alert", error, false);
          vm.$bus.$emit("isLoading", false);
        });
    },
    submitData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/order`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url, {
          data: {
            user: vm.user,
            message: vm.message,
          },
        })
        .then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("Alert:success", res.data.message);
            vm.$router.push(`/order/checkout/${res.data.orderId}`);
            //清除購物車
            vm.$bus.$emit("sidebar:cleanCart");
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:danger", error);
        });
    },
    useCoupon() {
      const vm = this;
      if (vm.codeValidate(vm.couponCode)) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/coupon`;
        vm.$bus.$emit("isLoading", true);
        this.$http
          .post(url, { data: { code: vm.couponCode } })
          .then((res) => {
            if (res.data.success) {
              vm.couponUsed = res.data.success;
              vm.getCartList();
              vm.$bus.$emit("Alert:success", "已套用優惠券");
              vm.errorMessage = "已套用優惠券！";
            } else {
              vm.errorMessage = res.data.message;
              vm.couponCode = "";
            }
            vm.$bus.$emit("isLoading", false);
          })
          .catch((error) => {
            vm.$bus.$emit("isLoading", false);
            vm.$bus.$emit("Alert:error", error);
          });
      } else {
        vm.errorMessage = "輸入格式錯誤，至少8位英文或數字";
        vm.couponCode = "";
      }
    },
    codeValidate(code) {
      const rule = /^[a-zA-Z0-9]{8,16}$/;
      return rule.test(code);
    },
    openModal() {
      $("#postCartList").modal("show");
    },
    closeModal() {
      $("#postCartList").modal("hide");
    },
  },
  computed: {
    finalTotal() {
      let total = 0;
      this.cartList.forEach((item) => {
        total += item.final_total;
      });
      return total;
    },
  },
  created() {
    const vm = this;
    vm.getCartList();
  },
};
</script>
