<template>
  <div>
    <div class="text-right my-3 mr-3">
      <button class="btb btn-primary px-3 py-1" @click="openModal(true)">
        建立優惠券
      </button>
    </div>

    <!-- table -->
    <table class="table table-hover table-striped table-dark">
      <thead class="bg-warning">
        <tr class="text-center">
          <th width="200">優惠券代碼</th>
          <th>優惠券名稱</th>
          <th width="120">折扣</th>
          <th width="120">建立日期</th>
          <th width="120">到期日</th>
          <th width="120">狀態</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="item in couponList" :key="item.id">
          <td width="200" class="align-middle">{{ item.code }}</td>
          <td class="align-middle">{{ item.title }}</td>
          <td width="120" class="text-right align-middle">
            {{ item.percent }}%
          </td>
          <th width="120" class="align-middle">
            {{ item.created_date | formatTime }}
          </th>
          <th width="120" class="align-middle">
            {{ item.due_date | formatTime }}
          </th>
          <td width="120" class="align-middle">
            <span class="text-success" v-if="item.is_enabled">啟用中</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td width="200">
            <div class="btn-group">
              <button
                class="btn btn-outline-info btn-sm"
                @click="openModal(false, item, 'edit')"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openModal(false, item, 'remove')"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody></tbody>
    </table>
    <Pagination :pagination="pagination" @changePage="changePage" />

    <!-- create & edit Modal-->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
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
            <ValidationObserver v-slot="{ invalid }">
              <form @submit.prevent="updateData">
                <ValidationProvider
                  class="form-group"
                  v-slot="{ failed, errors }"
                  rules="required"
                >
                  <label for="title" class="ml-1 mb-1 my-1">優惠券名稱</label>
                  <input
                    type="text"
                    name="優惠券名稱"
                    id="title"
                    placeholder="請輸入名稱"
                    class="form-control"
                    :class="{ 'is-invalid': failed }"
                    v-model="tempCoupon.title"
                  />
                  <span v-if="failed" class="text-danger d-block my-1">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>

                <ValidationProvider
                  class="form-group"
                  v-slot="{ failed, errors }"
                  rules="required"
                >
                  <label for="percent" class="ml-1 mb-1 my-1"
                    >優惠券折扣%</label
                  >
                  <input
                    type="number"
                    name="優惠折扣"
                    id="percent"
                    placeholder="請輸入折扣"
                    class="form-control number"
                    :class="{ 'is-invalid': failed }"
                    v-model="tempCoupon.percent"
                  />
                  <span v-if="failed" class="text-danger d-block my-1">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>

                <ValidationProvider
                  class="form-group"
                  v-slot="{ failed, errors }"
                  rules="required"
                >
                  <label for="date" class="ml-1 mb-1 my-1">到期日</label>
                  <input
                    type="date"
                    name="日期"
                    id="date"
                    placeholder="請輸入名稱"
                    class="form-control"
                    :class="{ 'is-invalid': failed }"
                    v-model="tempCoupon.due_date"
                  />
                  <span v-if="failed" class="text-danger d-block my-1">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
                <div class="form-group">
                  <label for="percent" class="ml-1 mb-1 my-1"
                    >優惠券代碼(沒有則自動產生)</label
                  >
                  <input
                    type="text"
                    name="code"
                    id="code"
                    placeholder="請輸入代碼"
                    class="form-control"
                    v-model="tempCoupon.code"
                  />
                </div>
                <div class="custom-control custom-switch mt-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="is_enabled"
                    v-model="tempCoupon.is_enabled"
                  />
                  <label class="custom-control-label" for="is_enabled"
                    >啟用</label
                  >
                </div>
                <hr />
                <div class="form-inline justify-content-end">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-dismiss="modal"
                  >
                    關閉
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary ml-3"
                    :disabled="invalid"
                  >
                    儲存
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <!-- remove Modal-->
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="removeItem(tempCoupon)"
            >
              儲存
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
      isNew: "",
      tempCoupon: {},
      modalTitle: "",
      couponList: [],
      pagination: {},
    };
  },
  methods: {
    openModal(isNew, item, control) {
      const vm = this;
      if (isNew) {
        //判斷是否是新建
        vm.isNew = isNew;
        vm.tempCoupon = {};
        vm.modalTitle = "建立優惠券";
        $("#editModal").modal("show");
      } else {
        if (control == "edit") {
          vm.isNew = isNew;
          vm.tempCoupon = Object.assign({}, item);
          vm.tempCoupon.due_date = vm.formatTime(vm.tempCoupon.due_date);
          vm.modalTitle = `編輯： ${vm.tempCoupon.title}`;
          $("#editModal").modal("show");
        } else {
          vm.isNew = isNew;
          vm.tempCoupon = Object.assign({}, item);
          vm.modalTitle = `刪除：${vm.tempCoupon.title}`;
          $("#removeModal").modal("show");
        }
      }
    },
    updateData() {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/coupon`;
      let method = "post";
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/coupon/${vm.tempCoupon.id}`;
        method = "put";
      }
      const due_date = new Date(vm.tempCoupon.due_date);
      vm.tempCoupon.due_date = Math.floor(new Date(due_date) / 1000);
      vm.tempCoupon.created_date = Math.floor(new Date() / 1000);
      vm.tempCoupon.code = vm.tempCoupon.code
        ? vm.tempCoupon.code
        : vm.createdCode();
      this.$http[method](url, { data: vm.tempCoupon })
        .then((res) => {
          if (res.data.success) {
            vm.getCouponList();
            $("#editModal").modal("hide");
            vm.$bus.$emit("Alert:success", res.data.message);
          }
        })
        .catch((error) => {
          vm.$bus.$emit("Alert:error", error);
        });
    },
    getCouponList(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/coupons?page=${page}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.couponList = res.data.coupons;
            vm.pagination = res.data.pagination;
          }
          vm.couponList.map((item) => {
            const now = new Date();
            const timeStamp = Math.floor(now / 1000);
            item.is_enabled = true;
            if (item.due_date < timeStamp) {
              item.is_enabled = false;
            }
          });
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    removeItem(item) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/coupon/${item.id}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            vm.getCouponList();
            $("#removeModal").modal("hide");
            vm.$bus.$emit("Alert:success", res.data.message);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    createdCode() {
      //創建亂數
      const crypto = require("crypto");
      const code = crypto.randomBytes(8).toString("hex").toUpperCase();
      return code;
    },
    changePage(page) {
      const vm = this;
      vm.getCouponList(page);
    },
    formatTime(timeStamp) {
      const time = new Date(timeStamp * 1000);
      const year = time.getFullYear();
      const month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      const date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
      return `${year}-${month}-${date}`;
    },
  },
  created() {
    this.getCouponList();
  },
};
</script>
