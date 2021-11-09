<template>
  <div class="container">
    <h2 class="text-center mb-5">訂單資訊</h2>
    <!-- table -->
    <table class="table table-hover table-overflow table-borderless mb-3">
      <thead class="bg-dark text-white">
        <tr class="text-center">
          <th width="150">#</th>
          <th>商品名稱</th>
          <th width="200">數量</th>
          <th width="120">售價</th>
          <th width="120">小計</th>
          <th width="80">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartList" :key="item.id" class="text-center">
          <td width="150">
            <img :src="item.imageUrl" class="table-imgSize" />
          </td>
          <td class="align-middle">
            {{ item.title }}
          </td>
          <td width="200" class="align-middle">
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
                @input="changeQty(item, item.qty)"
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
          <td width="120" class="text-right align-middle">
            {{ item.price | currency }}
          </td>
          <td width="120" class="text-right align-middle">
            {{ (item.price * item.qty) | currency }}
          </td>
          <td width="80" class="align-middle">
            <a href="#" @click.prevent="removeItem(item)" class="text-danger"
              ><i class="fa fa-trash"></i
            ></a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-right">
          <td colspan="4">
            <h5>總計：</h5>
          </td>
          <td colspan="2" class="text-right">
            <h5 class="text-danger">{{ totalPrice | currency }}</h5>
          </td>
        </tr>
      </tfoot>
    </table>

    <!-- button -->
    <div class="d-flex justify-content-end mb-5">
      <router-link class="btn btn-outline-secondary mr-3" to="$router.go(-1)"
        >再去選購</router-link
      >
      <button
        type="button"
        class="btn btn-primary"
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
    };
  },
  methods: {
    getCartList() {
      const vm = this;
      this.$bus.$emit("isLoading", true);
      vm.cartList = JSON.parse(localStorage.getItem("cartList"));
      setTimeout(() => {
        this.$bus.$emit("isLoading", false);
      }, 1000);
    },
    removeItem(item) {
      const vm = this;
      this.$bus.$emit("isLoading", true);
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.cartList.splice(itemIndex, 1);
        localStorage.setItem("cartList", JSON.stringify(vm.cartList));
        vm.getCartList();
        //同步購物車數據
        vm.$bus.$emit("sidebar:update");
        vm.$bus.$emit("navbarCartList:update");
      }
      setTimeout(() => {
        this.$bus.$emit("isLoading", false);
      }, 1000);
    },
    changeQty(item, qty) {
      const vm = this;
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        if (qty > 0 && qty <= item.stock) {
          vm.cartList[itemIndex].qty = qty;
        } else {
          vm.cartList[itemIndex].qty = 1;
        }
      }
      localStorage.setItem("cartList", JSON.stringify(vm.cartList));
      //同步購物車數據
      vm.$bus.$emit("sidebar:update");
    },
    itemQtyPlus(item) {
      const vm = this;
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.cartList[itemIndex].qty = parseInt(vm.cartList[itemIndex].qty) + 1;
        localStorage.setItem("cartList", JSON.stringify(vm.cartList));
        //同步購物車數據
        vm.$bus.$emit("sidebar:update");
      }
    },
    itemQtyMinus(item) {
      const vm = this;
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.cartList[itemIndex].qty = parseInt(vm.cartList[itemIndex].qty) - 1;
        localStorage.setItem("cartList", JSON.stringify(vm.cartList));
        //同步購物車數據
        vm.$bus.$emit("sidebar:update");
      }
    },
    openModal() {
      $("#postCartList").modal("show");
    },
    closeModal() {
      $("#postCartList").modal("hide");
    },
    postCartList() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart`;
      vm.cartList.forEach((item) => {
        this.$http
          .post(url, {
            data: {
              product_id: item.id,
              qty: item.qty,
            },
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      });
      vm.closeModal();
      setTimeout(() => {
        vm.$router.push("/order/customerinfo");
      }, 500);
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.cartList.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
    },
  },
  created() {
    this.getCartList();
  },
};
</script>
