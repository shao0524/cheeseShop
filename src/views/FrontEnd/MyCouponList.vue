<template>
  <div>
    <div class="text-center">
      <h2 class="titleStyle mt-3 mb-5">我的優惠券</h2>
    </div>
    <div
      class="todoList mt-5 mb-5"
      :class="{
        'todoList-secondary': todoStatus == '全部',
        'todoList-success': todoStatus == '未過期',
        'todoList-danger': todoStatus == '已過期',
      }"
    >
      <!-- button -->
      <div class="todoBtn-group mt-2">
        <button
          class="todoBtn todoBtn-secondary"
          :class="{ active: todoStatus == '全部' }"
          @click="todoStatus = '全部'"
        >
          全部
        </button>
        <button
          class="todoBtn todoBtn-success"
          :class="{ active: todoStatus == '未過期' }"
          @click="todoStatus = '未過期'"
        >
          未過期
        </button>
        <button
          class="todoBtn todoBtn-danger"
          :class="{ active: todoStatus == '已過期' }"
          @click="todoStatus = '已過期'"
        >
          已過期
        </button>
      </div>
      <div class="todoList-body">
        <!-- coupon -->
        <div class="row">
          <div
            class="col-12 col-md-6 col-lg-6"
            v-for="(coupon, index) in filterCoupon"
            :key="index"
          >
            <div class="coupon">
              <div class="coupon-header">
                <h3 class="mt-3">{{ coupon.percent }} 折</h3>
                <button
                  class="btn btn-danger mb-3"
                  @click="copyCode(coupon.code)"
                  :disabled="coupon.is_use"
                >
                  點我使用
                </button>
              </div>
              <div class="coupon-body">
                <h5 class="mt-3">{{ coupon.title }}</h5>
                <h6>{{ coupon.content }}</h6>
                <h6>
                  使用期限至：<span class="text-danger">{{
                    coupon.expired
                  }}</span>
                </h6>
              </div>
            </div>
            <input
              type="text"
              class="text-center coupon-input"
              :id="coupon.code"
              :value="coupon.code"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoStatus: "全部",
      coupons: [],
    };
  },
  methods: {
    getCoupons() {
      const vm = this;
      vm.coupons = JSON.parse(localStorage.getItem("coupons"));
    },
    copyCode(code) {
      const vm = this;
      const ipt = document.getElementById(code);
      ipt.select();
      document.execCommand("copy");
      vm.$bus.$emit("Alert:success", "已將優惠券代碼複製");
    },
  },
  computed: {
    filterCoupon() {
      if (this.todoStatus !== "全部") {
        if (this.todoStatus === "未過期") {
          let timeStamp;
          let today = Math.floor(new Date() / 1000);
          return this.coupons.filter((item) => {
            timeStamp = Math.floor(new Date(item.expired) / 1000);
            if (timeStamp > today) {
              return item;
            }
          });
        } else {
          let timeStamp;
          let today = Math.floor(new Date() / 1000);
          return this.coupons.filter((item) => {
            timeStamp = Math.floor(new Date(item.expired) / 1000);
            if (timeStamp < today) {
              return item;
            }
          });
        }
      }
      return this.coupons;
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
