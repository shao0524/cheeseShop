<template>
  <div class="mt-5">
    <table class="table table-hover table-overflow table-striped table-dark">
      <thead class="bg-primary">
        <tr class="text-center">
          <th width="250">訂單編號</th>
          <th>訂購人</th>
          <th width="120">建立日期</th>
          <th width="120">金額</th>
          <th width="120">付款日期</th>
          <th width="120">付款狀態</th>
          <th width="120">訂單資訊</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="order in orderList" :key="order.id">
          <td width="250">{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td width="120">
            {{ order.create_at | formatTime }}
          </td>
          <td width="120">{{ order.total | currency }}</td>
          <td width="120">
            {{ order.paid_date | formatTime }}
          </td>
          <td width="120">
            <span class="text-success d-block" v-if="order.is_paid"
              >已付款</span
            >
            <span class="text-danger d-block" v-else>尚未付款</span>
          </td>
          <td width="120">
            <a
              href="#"
              class="btn btn-secondary btn-sm"
              @click.prevent="openModal(order)"
              >查看訂單</a
            >
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination="pagination" @changePage="changePage" />

    <!-- Modal -->
    <div
      class="modal fade"
      id="checkModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
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
            <div class="row">
              <!-- customer info -->
              <div class="col-12 col-md-12 col-lg-6 mb-3 mb-lg-0">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">
                      <div class="text-center">訂購人資料</div>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table">
                      <tbody>
                        <tr>
                          <th
                            width="150"
                            class="text-center bg-primary text-white"
                          >
                            訂購人姓名
                          </th>
                          <td>
                            {{ tempOrder.user.name || [] }}
                          </td>
                        </tr>
                        <tr>
                          <th
                            width="150"
                            class="text-center bg-primary text-white"
                          >
                            Email
                          </th>
                          <td>
                            {{ tempOrder.user.email }}
                          </td>
                        </tr>
                        <tr>
                          <th
                            width="150"
                            class="text-center bg-primary text-white"
                          >
                            電話
                          </th>
                          <td>
                            {{ tempOrder.user.tel }}
                          </td>
                        </tr>
                        <tr>
                          <th
                            width="150"
                            class="text-center bg-primary text-white"
                          >
                            地址
                          </th>
                          <td>
                            {{ tempOrder.user.address }}
                          </td>
                        </tr>
                        <tr>
                          <th
                            width="150"
                            class="text-center bg-primary text-white"
                          >
                            備註
                          </th>
                          <td>
                            {{ tempOrder.message }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- order info -->
              <div class="col-12 col-md-12 col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">
                      <div class="text-center">訂購產品</div>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table" style="max-height: 300px">
                      <thead class="bg-primary text-white">
                        <tr class="text-center">
                          <th>產品名稱</th>
                          <th width="80">數量</th>
                          <th width="120">金額</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in tempOrder.products"
                          :key="item.id"
                          class="text-center"
                        >
                          <td>{{ item.product.title }}</td>
                          <td width="80">{{ item.qty }}</td>
                          <td width="120" class="text-right">
                            {{ item.total | currency }}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr class="text-right">
                          <td colspan="2">
                            <h5>總計：</h5>
                          </td>
                          <td>
                            <h5 class="text-danger">
                              {{ tempOrder.total | currency }}
                            </h5>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "components/common/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orderList: [],
      pagination: {},
      tempOrder: {
        user: {},
      },
      modalTitle: "",
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/orders?page=${page};`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.orderList = res.data.orders;
            vm.pagination = res.data.pagination;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    openModal(item) {
      const vm = this;
      vm.tempOrder = Object.assign({}, item);
      vm.modalTitle = `訂單：${item.id}`;
      $("#checkModal").modal("show");
    },
    changePage(page) {
      const vm = this;
      vm.getOrders(page);
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
