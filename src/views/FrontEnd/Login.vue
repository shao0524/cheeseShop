<template>
  <div class="bgLogin">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center vh-100">
        <div class="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3">
          <div class="card bg-dark text-white py-5 shadow-3">
            <div class="card-header text-center">
              <h3 class="text-warning py-3">會員登入</h3>
              <div class="text-center">
                <img
                  src="~image/login/loginLogo.png"
                  width="50"
                  height="50"
                  alt="LOGO"
                />
              </div>
            </div>
            <div class="card-body">
              <form>
                <div class="form-froup mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    v-model="user.email"
                    placeholder="Email"
                  />
                </div>
                <div class="form-froup mb-3">
                  <label for="password">密碼</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    v-model="user.password"
                    placeholder="Password"
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="form-group">
                <input
                  type="button"
                  @click="login"
                  value="登入"
                  class="form-control btn btn-success rounded-oval"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url, {
          username: vm.user.email,
          password: vm.user.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            const token = res.data.token;
            const expired = res.data.expired;
            document.cookie = `cheese4ny=${token}; expires=${new Date(
              expired
            )}`;
            vm.$bus.$emit("alert", res.data.message, true);
            vm.$router.push("/");
          } else {
            vm.$bus.$emit("alert", "帳號或密碼有誤", false);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch(() => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("alert", "帳號和密碼為必填", false);
        });
    },
  },
};
</script>
