<template>
  <div class="container">
    <h2 class="text-center">填寫訂單資訊</h2>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="submitData">
        <div class="row justify-content-center mb-5">
          <div class="col-12 col-md-12 col-lg-7">
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
              rules="required"
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
              class="form-group"
              v-slot="{ failed, errors }"
              rules="required"
            >
              <label for="tel" class="h4 py-1"
                >電話<span class="text-danger">*</span></label
              >
              <input
                type="tel"
                name="電話"
                id="tel"
                class="form-control"
                :class="{ is_invalid: failed }"
                v-model="user.tel"
              />
              <span class="text-danger d-block my-1 h5">{{ errors[0] }}</span>
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
              <span class="text-danger d-block my-1 h5">{{ errors[0] }}</span>
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
          </div>
          <div class="col-12 col-md-12 col-lg-5 mt-5">
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div class="d-flex justify-content-between">
                        <h6>商品小計({{ cartList.length }}品項)</h6>
                        <h6>
                          <span class="text-danger">{{ finalTotal }}</span
                          >元
                        </h6>
                      </div>
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <table class="table">
                      <thead>
                        <tr class="text-center">
                          <th>名稱</th>
                          <th width="80">數量</th>
                          <th width="120">小計</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in cartList" :key="item.id">
                          <td class="text-center">{{ item.product.title }}</td>
                          <td width="80" class="text-right">{{ item.qty }}</td>
                          <td width="120" class="text-right">
                            {{ item.final_total }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-body">
                <h5>優惠券</h5>
                <div class="form-group">
                  <div class="form-inline">
                    <input
                      type="text"
                      name="coupon"
                      id="coupon"
                      class="form-control mb-3 mb-md-0 mb-lg-0"
                      placeholder="請輸入優惠券代碼"
                      v-model="couponCode"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="useCoupon"
                      :disabled="!couponCode"
                    >
                      使用優惠券
                    </button>
                  </div>
                  <label class="text-danger mt-1" v-if="errorMessage">{{
                    errorMessage
                  }}</label>
                </div>
              </div>
            </div>
            <!-- button -->
            <div class="form-inline justify-content-end">
              <router-link
                class="btn btn-outline-secondary mr-3"
                to="/order/cartlist"
                >返回上一頁</router-link
              >
              <button class="btn btn-primary" type="submit" :disabled="invalid">
                完成訂單
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "CustomerInfo",
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
    getCartList() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      vm.$bus.$emit("isLoading", true);
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          vm.cartList = res.data.data.carts;
        }
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
    this.getCartList();
  },
};
</script>
