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
          <th width="200">小計</th>
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
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-outline-secondary rounded-circle"
                @click="itemQtyMinus(item)"
                :disabled="item.qty < 2"
              >
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="number"
                id="number"
                class="border-0 text-center form-control bg-transparent"
                v-model="item.qty"
              />
              <button
                class="btn btn-outline-secondary rounded-circle"
                @click="itemQtyPlus(item)"
                :disabled="item.qty >= item.stock"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </td>
          <td width="200" class="text-right align-middle">
            {{ item.final_total | currency }}
          </td>
          <td width="200" class="text-right align-middle">
            {{ (item.qty * item.final_total) | currency }}
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
            <h5 class="text-danger">{{ totalPrice | currency }}</h5>
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
        >再去選購</router-link
      >
      <button
        type="button"
        class="btn btn-primary mx-md-5 mx-3 mx-lg-5"
        to="/order/customerinfo"
        @click="openModal"
      >
        去填寫資料
      </button>
    </div>

    <!-- modal -->
    <div
      class="modal fade"
      id="postCartList"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">決定要購買了嗎？</h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>一旦按下結帳，購物車內容不得更改</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              再等等
            </button>
            <button type="button" class="btn btn-danger" @click="postCartList">
              結帳
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
      cartList: [],
      couponCode: "",
      couponUsed: false,
    };
  },
  methods: {
    getCartList() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      this.$bus.$emit("isLoading", true);
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          vm.cartList = res.data.data.carts;
          vm.finalTotal = res.data.data.final_total;
          this.$bus.$emit("navbarCartList:update", vm.cartList.length);
          this.$bus.$emit("isLoading", false);
        }
      });
    },
    removeItem(item) {
      const vm = this;
      this.$bus.$emit("isLoading", true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart/${item.id}`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          vm.getCartList();
        }
      });
      this.$bus.$emit("navbarCartList:update");
      this.$bus.$emit("Alert:success", `${item.product.title}從購物車移除`);
      this.$bus.$emit("isLoading", false);
    },
    itemQtyPlus(item) {
      const vm = this;
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.cartList[itemIndex].qty += 1;
      }
    },
    itemQtyMinus(item) {
      const vm = this;
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.cartList[itemIndex].qty -= 1;
      }
    },
    useCoupon() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/coupon`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url, { data: { code: vm.couponCode } })
        .then((res) => {
          if (res.data.success) {
            vm.couponUsed = res.data.success;
            vm.getCartList();
          }
          vm.$bus.$emit("Alert:success", "已套用優惠券");
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    openModal() {
      $("#postCartList").modal("show");
    },
    closeModal() {
      $("#postCartList").modal("hide");
    },
    postCartList() {
      const vm = this;
      // 刪除原先購物車內容
      vm.cartList.forEach((item) => {
        let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart/${item.id}`;
        this.$http
          .delete(url)
          .then(() => {})
          .catch((error) => {
            vm.$bus.$emit("Alert:error", error);
          });
      });
      //送出新的cartList
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      vm.cartList.forEach((item) => {
        this.$http
          .post(url, {
            data: {
              product_id: item.product.id,
              qty: item.qty,
            },
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      });
      if (vm.couponUsed) {
        vm.useCoupon();
      }
      vm.closeModal();
      vm.$router.push("/order/customerinfo");
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.cartList.forEach((item) => {
        total += item.qty * item.final_total;
      });
      return total;
    },
  },
  created() {
    this.getCartList();
  },
};
</script>
