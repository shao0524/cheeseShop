<template>
  <div class="bgLogin">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center vh-100">
        <div class="col-12 col-md-6 col-lg-3">
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
              <form @submit.prevent="login">
                <div class="form-froup mb-3">
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
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    v-model="user.password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="keepSign"
                    v-model="is_keepSign"
                    @change="setSignStatus"
                  />
                  <label class="form-check-label" for="keepSign">記住我</label>
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="登入"
                    class="form-control btn btn-success rounded-oval"
                  />
                </div>
              </form>
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
      is_keepSign: false,
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
          if (res.data.success) {
            const token = res.data.token;
            const expired = res.data.expired;
            document.cookie = `cheese4ny=${token}; expires=${new Date(
              expired
            )}`;
            //紀錄帳號密碼
            if (vm.is_keepSign) {
              vm.setUserData("userName", vm.user.email);
              vm.setUserData("password", vm.user.password);
            } else {
              vm.removeUserData("userName");
              vm.removeUserData("password");
            }
            vm.$bus.$emit("Alert:success", res.data.message);
            vm.$router.push("/");
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    setUserData(name, value) {
      const days = 30;
      let exp = new Date();
      exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${exp.toGMTString()}; path="/login"`;
    },
    getUserData() {
      const user = {};
      user.email = document.cookie.replace(
        /(?:(?:^|.*;\s*)userName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      user.password = document.cookie.replace(
        /(?:(?:^|.*;\s*)password\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      return user;
    },
    removeUserData(name) {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1); //已經過期
      document.cookie = `${name}=null; expires=${exp.toGMTString()}; path="/login"`;
    },
    setSignStatus() {
      const vm = this;
      localStorage.setItem("isKeepSign", vm.is_keepSign);
    },
  },
  created() {
    this.is_keepSign = JSON.parse(localStorage.getItem("isKeepSign"));
    if (this.is_keepSign) {
      this.user = this.getUserData();
    }
  },
};
</script>
