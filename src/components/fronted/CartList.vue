<template>
  <div class="cartList" :class="{ active: isActive }">
    <!-- close -->
    <div class="cartList-header">
      <button
        type="button"
        class="cartList-header-closeBtn"
        @click="closeSiderbar"
      >
        <i class="far fa-times-circle fa-2x"></i>
      </button>
    </div>

    <!-- main -->
    <div class="cartList-body">
      <h2 class="cartList-body-title" v-if="itemLen <= 0">目前購物車是空的</h2>
      <table class="cartList-table" v-else>
        <thead class="cartList-table-header">
          <tr>
            <th class="text-center" width="80">#</th>
            <th class="text-center">品名</th>
            <th class="text-center" width="80">數量</th>
            <th class="text-center" width="120">金額</th>
            <th class="text-center" width="80">刪除</th>
          </tr>
        </thead>
        <tbody class="cartList-table-body">
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
              <button
                class="cartList-table-body-itemRemoveBtn"
                @click="removeItem(item)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">
              <h4 class="h4 font-weight-bolder text-white">總計</h4>
            </td>
            <td colspan="2" class="text-right" style="color: #ff5f6f">
              <h4 class="h4 font-weight-bolder text-danger">
                {{ finalTotal | currency }}
              </h4>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="cartList-footer">
      <router-link
        to="/order"
        class="cartList-footer-btn"
        @click.native="closeSiderbar"
        v-if="itemLen > 0"
      >
        去結帳
      </router-link>
      <router-link
        class="cartList-footer-btn"
        to="/products/productList/全部商品"
        @click.native="closeSiderbar"
        v-else
        >去逛逛吧</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      cartList: [],
    };
  },
  methods: {
    getCartList() {
      const vm = this;
      vm.cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    },
    findIndex(arr, id) {
      return arr.findIndex((item) => item.id === id);
    },
    removeItem(item) {
      const vm = this;
      const { title } = item;
      vm.$bus.$emit("isLoading", true);
      const itemIndex = vm.findIndex(vm.cartList, item.id);
      if (itemIndex !== -1) {
        vm.cartList.splice(itemIndex, 1);
        localStorage.setItem("cartList", JSON.stringify(vm.cartList));
        //更新購物車
        vm.getCartList();
        //更新navbar
        vm.$bus.$emit("navbarCartList:update");
        //alert
        vm.$bus.$emit("alert", `${title} 從購物車移除`, false);
        setTimeout(() => {
          vm.$bus.$emit("isLoading", false);
        }, 1000);
      }
    },
    closeSiderbar() {
      const vm = this;
      vm.isActive = false;
      vm.$bus.$emit("slideUpNavbar");
    },
  },
  created() {
    const vm = this;
    vm.getCartList();
    vm.closeSiderbar();
    //開啟左側購物車列表
    vm.$bus.$on("openSiderbar", (status) => {
      vm.isActive = status;
    });
    //加入購物車
    vm.$bus.$on("sidebar:addtoCart", (item, qty) => {
      vm.$bus.$emit("isLoading", true);

      const itemIndex = vm.cartList.findIndex(
        (product) => product.id === item.id
      );
      if (itemIndex === -1) {
        //不存在
        item.qty = qty;
        vm.cartList.push(item);
        localStorage.setItem("cartList", JSON.stringify(vm.cartList));
      } else {
        // 存在
        vm.cartList[itemIndex].qty += qty;
        localStorage.setItem("cartList", JSON.stringify(vm.cartList));
      }
      vm.getCartList();
      setTimeout(() => {
        vm.$bus.$emit("isLoading", false);
      }, 1000);
    });

    //清除購物車
    vm.$bus.$on("sidebar:cleanCart", () => {
      localStorage.setItem("cartList", JSON.stringify([]));
      vm.getCartList();
      vm.$bus.$emit("navbarCartList:update");
    });
    //更新購物車
    vm.$bus.$on("sidebar:update", () => {
      vm.getCartList();
    });
  },
  computed: {
    finalTotal() {
      const vm = this;
      let total = 0;
      vm.cartList.forEach((item) => {
        total += item.price * item.qty;
      });
      return total;
    },
    itemLen() {
      const vm = this;
      return vm.cartList.length;
    },
  },
  beforeDestroy() {
    const vm = this;
    vm.$bus.$off("openSiderbar");
    vm.$bus.$off("sidebar:cleanCart");
    vm.$bus.$off("sidebar:addtoCart");
    vm.$bus.$off("sidebar:update");
  },
};
</script>
