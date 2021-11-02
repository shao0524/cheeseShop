<template>
  <div class="container">
    <h2 class="text-center mb-5">填寫訂購人資訊</h2>
    <!-- customerData form -->
    <div class="row justify-content-center mb-5">
      <div class="col-10 col-md-10 col-lg-6">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submitData">
            <ValidationProvider
              class="form-group"
              v-slot="{ failed, errors }"
              rules="email||required"
            >
              <label for="email" class="h4 py-1"
                >Email<span class="text-danger">*</span></label
              >
              <input
                type="email"
                name="Email"
                id="email"
                class="form-control"
                v-model="user.email"
                :class="{ is_invalid: failed }"
              />
              <span v-if="failed" class="text-danger d-block my-1 h5">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form-group"
              v-slot="{ failed, errors }"
              rules="required"
            >
              <label for="name" class="h4 py-1"
                >姓名<span class="text-danger">*</span></label
              >
              <input
                type="name"
                name="姓名"
                id="name"
                class="form-control"
                :class="{ is_invalid: failed }"
                v-model="user.name"
              />
              <span v-if="failed" class="text-danger d-block my-1 h5">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form-group"
              v-slot="{ failed, errors }"
              rules="required"
            >
              <label for="tel" class="h4 py-1"
                >電話<span class="text-danger">*</span></label
              >
              <input
                type="tel"
                name="電話"
                id="tel"
                class="form-control"
                :class="{ is_invalid: failed }"
                v-model="user.tel"
              />
              <span class="text-danger d-block my-1 h5">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form-group"
              v-slot="{ failed, errors }"
              rules="required"
            >
              <label for="address" class="h4 py-1"
                >地址<span class="text-danger">*</span></label
              >
              <input
                type="text"
                name="地址"
                id="address"
                class="form-control"
                :class="{ is_invalid: failed }"
                v-model="user.address"
              />
              <span class="text-danger d-block my-1 h5">{{ errors[0] }}</span>
            </ValidationProvider>

            <div class="form-group mb-3">
              <label for="message" class="h4">備註</label>
              <textarea
                name="message"
                id="message"
                rows="3"
                class="form-control"
                v-model="message"
              ></textarea>
            </div>
            <!-- button -->
            <div class="form-inline justify-content-end mb-3">
              <router-link
                class="btn btn-outline-secondary mr-3"
                to="/order/cartlist"
                >返回上一頁</router-link
              >
              <button class="btn btn-primary" type="submit" :disabled="invalid">
                完成訂單
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      message: "",
    };
  },
  methods: {
    submitData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/order`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url, {
          data: {
            user: vm.user,
            message: vm.message,
          },
        })
        .then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("Alert:success", res.data.message);
            vm.$router.push(`/order/checkout/${res.data.orderId}`);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:danger", error);
        });
    },
  },
};
</script>
