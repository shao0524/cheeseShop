<template>
  <div id="MyOrderList">
    <div class="text-center">
      <h2 class="titleStyle mt-3 mb-5">我的訂單</h2>
    </div>
    <div
      class="todoList my-5 mx-2 mx-md-2 mx-lg-0"
      :class="{
        'todoList-secondary': todoStatus == '全部',
        'todoList-warning': todoStatus == '未結帳',
        'todoList-success': todoStatus == '已結帳',
      }"
    >
      <div class="todoBtn-group mt-2">
        <button
          class="todoBtn todoBtn-secondary"
          :class="{ active: todoStatus == '全部' }"
          @click="todoStatus = '全部'"
        >
          全部
        </button>
        <button
          class="todoBtn todoBtn-warning"
          :class="{ active: todoStatus == '未結帳' }"
          @click="todoStatus = '未結帳'"
        >
          未結帳
        </button>
        <button
          class="todoBtn todoBtn-success"
          :class="{ active: todoStatus == '已結帳' }"
          @click="todoStatus = '已結帳'"
        >
          已結帳
        </button>
      </div>

      <div class="todoList-body">
        <div
          class="accordion mb-3"
          :id="'accordion' + index"
          v-for="(order, index) in filterOrder"
          :key="order.id"
        >
          <div class="card">
            <div class="card-header py-1">
              <button
                class="btn text-left"
                type="button"
                data-toggle="collapse"
                :data-target="'#collapse' + index"
                aria-expanded="true"
                :aria-controls="`collapse` + index"
              >
                訂單編號：{{ order.id }}
              </button>
            </div>

            <div
              :id="'collapse' + index"
              class="collapse"
              :aria-labelledby="'heading' + index"
              :data-parent="'#accordion' + index"
            >
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-12 col-md-6 col-lg-6">
                    <h5>建立日期：{{ order.create_at | formatTime }}</h5>
                    <h5>
                      付款狀態：
                      <span class="text-success" v-if="order.is_paid"
                        >已結帳</span
                      >
                      <span class="text-danger" v-else>尚未付款</span>
                    </h5>
                  </div>
                  <div class="col-12 col-md-6 col-lg-6">
                    <div
                      class="text-md-right text-lg-right"
                      v-if="!order.is_paid"
                    >
                      <router-link
                        class="btn btn-primary"
                        :to="`/order/checkout/${order.id}`"
                        >點我去結帳</router-link
                      >
                    </div>
                  </div>
                </div>

                <h3 class="text-center mb-3">訂單內容</h3>
                <div>
                  <table class="table">
                    <thead>
                      <tr class="text-center">
                        <th width="200"></th>
                        <th>名稱</th>
                        <th width="80">數量</th>
                        <th width="120">金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in order.products"
                        :key="item.id"
                        class="text-center"
                      >
                        <td width="200">
                          <img
                            :src="item.product.imageUrl"
                            class="table-imgSize"
                          />
                        </td>
                        <td class="align-middle">
                          <span>{{ item.product.title }}</span>
                        </td>
                        <td width="80" class="align-middle">
                          {{ item.qty }}
                        </td>
                        <td width="120" class="text-right align-middle">
                          {{ item.total | currency }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="text-right">
                        <td colspan="3">
                          <h5>總金額：</h5>
                        </td>
                        <td>
                          <h5 class="text-danger">
                            {{ order.total | currency }}
                          </h5>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div class="card-footer">
                <span>備註：{{ order.message }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- pagination -->
        <div v-if="filterOrder.length > 0">
          <Pagination :pagination="pagination" @changePage="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "components/Pagination.vue";
export default {
  name: "MyOrderList",
  components: {
    Pagination,
  },
  data() {
    return {
      orderId: "",
      orders: [],
      pagination: {},
      todoStatus: "全部",
    };
  },
  methods: {
    getOrderList(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/orders?page=${page}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.orders = res.data.orders;
            vm.pagination = res.data.pagination;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$on("Alert:success", error);
        });
    },
    changePage(page) {
      const vm = this;
      vm.getOrderList(page);
    },
  },
  computed: {
    filterOrder() {
      const vm = this;
      if (vm.todoStatus == "全部") {
        return vm.orders;
      } else if (vm.todoStatus == "未結帳") {
        let newOrder = [];
        vm.orders.forEach((item) => {
          if (!item.is_paid) {
            newOrder.push(item);
          }
        });
        return newOrder;
      } else {
        let newOrder = [];
        vm.orders.forEach((item) => {
          if (item.is_paid) {
            newOrder.push(item);
          }
        });
        return newOrder;
      }
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>
