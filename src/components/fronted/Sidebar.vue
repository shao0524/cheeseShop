<template>
  <div class="offConvas" :class="{ active: isclick }">
    <div class="container">
      <!-- close -->
      <div class="offConvas-close mb-3">
        <a class="btn text-white mt-3" @click.prevent="closeSiderbar"
          ><i class="far fa-times-circle fa-2x"></i
        ></a>
      </div>
      <!-- main -->
      <div class="mb-3 offConvas-table">
        <table
          class="table text-white w-75 mx-auto"
          v-if="cartList.length != 0"
        >
          <thead>
            <tr>
              <th class="text-center" width="80">#</th>
              <th class="text-center">品名</th>
              <th class="text-center" width="80">數量</th>
              <th class="text-center" width="120">金額</th>
              <th class="text-center" width="80">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartList" :key="item.id">
              <td width="80">
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.title"
                  width="50"
                  height="50"
                />
              </td>
              <td class="text-center align-middle">{{ item.product.title }}</td>
              <td class="text-center align-middle" width="80">
                {{ item.qty }}
              </td>
              <td class="text-right align-middle" width="120">
                {{ item.total | currency }}
              </td>
              <td class="text-center align-middle" width="80">
                <button class="btn text-white" @click="removeItem(item.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right">
                <h3 class="h3 font-weight-bolder text-white">總計</h3>
              </td>
              <td class="text-right" style="color: #ff5f6f">
                <h3 class="h3 font-weight-bolder text-danger">
                  {{ finalTotal | currency }}
                </h3>
              </td>
            </tr>
          </tfoot>
        </table>
        <h2 class="h2 text-white text-center" v-else>目前購物車沒有商品</h2>
      </div>
      <!-- button -->
      <div class="text-center mb-3" v-if="cartList.length != 0">
        <router-link
          class="btn btn-primary w-50"
          @click.native="closeSiderbar"
          to="/order"
          >去結帳</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclick: false,
      cartList: [],
      finalTotal: "",
      isSignIn: false,
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
            vm.$bus.$emit("cartItemLen", res.data.data.carts.length);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    removeItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/cart/${id}`;
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
    closeSiderbar() {
      const vm = this;
      vm.isclick = false;
    },
  },
  created() {
    this.getCartList();
    this.closeSiderbar();
    //加入購物車
    this.$bus.$on("addItem:success", () => {
      this.getCartList();
    });
    //開啟左側購物車列表
    this.$bus.$on("openSiderbar", (status) => {
      this.isclick = status;
    });
    //登入狀態
    this.$bus.$on("signIn", (status) => {
      this.isSignIn = status;
    });
    this.$bus.$on("reloadCartItem", () => {
      this.getCartList();
    });
  },
  beforeDestroy() {
    this.$bus.$off("addItem:success");
    this.$bus.$off("openSiderbar");
    this.$bus.$off("signIn");
    this.$bus.$off("reloadCartItem");
  },
};
</script>
