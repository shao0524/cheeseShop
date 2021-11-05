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
      <div class="offConvas-body" v-if="cartList.length > 0">
        <div class="mb-3 offConvas-table">
          <table class="table text-white w-75 mx-auto">
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
                    :src="item.imageUrl"
                    :alt="item.title"
                    width="50"
                    height="50"
                  />
                </td>
                <td class="text-center align-middle">
                  {{ item.title }}
                </td>
                <td class="text-center align-middle" width="80">
                  {{ item.qty }}
                </td>
                <td class="text-right align-middle" width="120">
                  {{ (item.price * item.qty) | currency }}
                </td>
                <td class="text-center align-middle" width="80">
                  <button class="btn text-white" @click="removeItem(item)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">
                  <h3 class="h3 font-weight-bolder text-white">總計</h3>
                </td>
                <td colspan="2" class="text-right" style="color: #ff5f6f">
                  <h3 class="h3 font-weight-bolder text-danger">
                    {{ finalTotal | currency }}
                  </h3>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <!-- cartList not null -->
      <div class="text-center" v-if="cartList.length > 0">
        <router-link
          class="btn btn-primary w-50 mt-5"
          @click.native="closeSiderbar"
          to="/order"
        >
          去結帳
        </router-link>
      </div>
      <!-- cartList is null -->
      <div v-else>
        <h2 class="h2 text-white text-center">目前購物車沒有商品</h2>
        <div class="text-center mt-5">
          <router-link
            to="/products/productList/全部商品"
            class="btn btn-primary"
            @click.native="closeSiderbar"
            ><i class="fas fa-cart-plus mr-1"></i>去逛逛吧
          </router-link>
        </div>
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
      isSignIn: false,
    };
  },
  methods: {
    getCartList() {
      const vm = this;
      vm.cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    },
    removeItem(item) {
      const vm = this;
      this.$bus.$emit("isLoading", true);
      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex !== -1) {
        vm.cartList.splice(itemIndex, 1);
        localStorage.setItem("cartList", JSON.stringify(this.cartList));
        this.getCartList();
        vm.$bus.$emit("navbarCartList:update");
        setTimeout(() => {
          this.$bus.$emit("isLoading", false);
        }, 1000);
      }
    },
    closeSiderbar() {
      const vm = this;
      vm.isclick = false;
    },
  },
  created() {
    this.getCartList();
    this.closeSiderbar();
    //開啟左側購物車列表
    this.$bus.$on("openSiderbar", (status) => {
      this.isclick = status;
    });
    //登入狀態
    this.$bus.$on("signIn", (status) => {
      this.isSignIn = status;
    });
    //加入購物車
    this.$bus.$on("sidebar:addtoCart", (item, qty) => {
      this.$bus.$emit("isLoading", true);
      const itemIndex = this.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex === -1) {
        //不存在
        item.qty = qty;
        this.cartList.push(item);
        localStorage.setItem("cartList", JSON.stringify(this.cartList));
      } else {
        // 存在
        this.cartList[itemIndex].qty += qty;
        localStorage.setItem("cartList", JSON.stringify(this.cartList));
      }
      this.getCartList();
      this.$bus.$emit("navbarCartList:update");
      setTimeout(() => {
        this.$bus.$emit("isLoading", false);
      }, 1000);
    });

    this.$bus.$on("sidebar:cleanCart", () => {
      localStorage.setItem("cartList", JSON.stringify([]));
      this.getCartList();
      this.$bus.$emit("navbarCartList:update");
    });

    this.$bus.$on("sidebar:update", () => {
      this.getCartList();
    });
  },
  computed: {
    finalTotal() {
      let total = 0;
      this.cartList.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
    },
  },
  beforeDestroy() {
    this.$bus.$off("openSiderbar");
    this.$bus.$off("signIn");
    this.$bus.$off("sidebar:cleanCart");
    this.$bus.$off("sidebar:addtoCart");
    this.$bus.$off("sidebar:update");
  },
};
</script>
