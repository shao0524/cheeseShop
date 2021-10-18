<template>
  <div class="container">
    <h2 class="text-center mb-5">訂單資訊</h2>
    <!-- table -->
    <table class="table table-hover table-borderless mb-3">
      <thead class="bg-dark text-white">
        <tr class="text-center">
          <th width="150">#</th>
          <th>品項</th>
          <th width="80">數量</th>
          <th width="200">售價</th>
          <th width="200">折扣價</th>
          <th width="120">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartList" :key="item.id" class="text-center">
          <td width="150">
            <img :src="item.product.imageUrl" class="table-imgSize" />
          </td>
          <td class="align-middle">
            {{ item.product.title }}
          </td>
          <td width="80" class="align-middle">
            {{ item.qty }}
          </td>
          <td width="200" class="text-right align-middle">
            {{ item.product.price | currency }}
          </td>
          <td width="200" class="text-right align-middle">
            {{
              item.final_total != item.product.price
                ? item.final_total
                : item.final_total | currency
            }}
          </td>
          <td width="120" class="align-middle">
            <a href="#" @click="removeItem(item)" class="text-danger"
              ><i class="fa fa-trash"></i
            ></a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-right">
          <td colspan="5">
            <h5>總計：</h5>
          </td>
          <td>
            <h5 class="text-danger">{{ finalTotal | currency }}</h5>
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- coupon input -->
    <div class="form-inline justify-content-end mb-5">
      <input
        type="text"
        name="coupon"
        id="coupon"
        class="form-control mb-3 mb-md-0 mb-lg-0"
        placeholder="請輸入優惠券代碼"
        v-model="couponCode"
      />
      <button class="form-control btn btn-outline-danger" @click="useCoupon">
        使用優惠券
      </button>
    </div>
    <!-- button -->
    <div class="d-flex justify-content-center mb-5">
      <router-link
        class="btn btn-outline-secondary mx-3 mx-md-5 mx-lg-5"
        to="$router.go(-1)"
        >返回上一頁</router-link
      >
      <router-link
        class="btn btn-primary mx-md-5 mx-3 mx-lg-5"
        to="/order/customerinfo"
        >去填寫資料</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: "",
      cartList: [],
      finalTotal: "",
    };
  },
  methods: {
    getCartList() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.cartList = res.data.data.carts;
            vm.finalTotal = res.data.data.final_total;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    removeItem(item) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart/${item.id}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            vm.getCartList();
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    useCoupon() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/coupon`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url, { data: { code: vm.couponCode } })
        .then((res) => {
          if (res.data.success) {
            vm.getCartList();
            vm.$bus.$emit("Alert:success", res.data.message);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
  },
  created() {
    this.getCartList();
  },
};
</script>
