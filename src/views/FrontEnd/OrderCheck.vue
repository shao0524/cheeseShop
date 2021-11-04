<template>
  <div class="container">
    <!-- card -->
    <div class="card shadow-3">
      <div class="card-head">
        <div class="text-center mt-5">
          <h4 class="card-title">訂單編號：{{ order.id }}</h4>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-12">
            <!-- orderTable -->
            <table class="table table-overflow">
              <thead class="table-dark">
                <tr class="text-center">
                  <th>品項</th>
                  <th width="120">數量</th>
                  <th width="200">原價</th>
                  <th width="200">特價</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in order.products"
                  :key="item.id"
                  class="text-center"
                >
                  <td>{{ item.product.title }}</td>
                  <td width="120">{{ item.qty }}</td>
                  <td width="120" class="text-right">
                    {{ item.total | currency }}
                  </td>
                  <td
                    width="120"
                    class="text-right"
                    :class="{ 'text-danger': item.final_total != item.total }"
                  >
                    {{
                      item.final_total != item.total
                        ? item.final_total
                        : item.total | currency
                    }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-right">
                  <td colspan="3">
                    <h5>總計</h5>
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
          <!-- customerTable -->
          <div class="col-12">
            <table class="table table-overflow">
              <thead class="table-dark">
                <tr>
                  <th colspan="2" class="text-center">收件人資訊</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th width="120" class="text-center">姓名：</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th width="120" class="text-center">email：</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th width="120" class="text-center">電話：</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th width="120" class="text-center">地址：</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th width="120" class="text-center font-weight-bolder">
                    備註：
                  </th>
                  <td>{{ order.message }}</td>
                </tr>
                <tr>
                  <th class="font-weight-bolder">付款狀況：</th>
                  <td>
                    <span class="text-danger" v-if="!order.is_paid"
                      >尚未付款</span
                    >
                    <span class="text-success" v-else>已付款</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- button -->
    <div class="my-5 d-flex justify-content-end">
      <router-link class="btn btn-outline-secondary mr-3" to="/"
        >返回首頁</router-link
      >
      <router-link
        class="btn btn-primary"
        @click.native="payment"
        to="/order/ordercompleted"
        >付款去</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
        orderId: "",
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const orderId = vm.$route.params.orderId;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/order/${orderId}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.order = res.data.order;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:danger", error);
        });
    },
    payment() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/pay/${vm.orderId}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("Alert:success", res.data.message);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:success", error);
        });
    },
  },
  created() {
    this.getOrder();
    this.orderId = this.$route.params.orderId;
  },
};
</script>
