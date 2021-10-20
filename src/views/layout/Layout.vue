<template>
  <div>
    <div class="container-fluid px-0 position-relative">
      <div class="d-flex">
        <Sidebar />
        <div class="container-fluid px-0">
          <Navbar class="sticky-top" />
          <router-view></router-view>
          <footer class="footBg text-secondary">
            <div class="container">
              <div class="row py-3">
                <div class="col-5 col-md-8 col-lg-9">
                  <div class="mt-3">
                    <div class="mb-3">
                      <h2 class="logoStyle text-primary">Cheeseny</h2>
                    </div>
                    <div class="d-flex">
                      <a class="btn-link" href="#"
                        ><i class="fab fa-facebook-square fa-2x"></i
                      ></a>
                      <a class="btn-link" href="#"
                        ><i class="fab fa-line fa-2x"></i
                      ></a>
                      <a
                        class="btn-link"
                        href="https://github.com/shao0524/cheeseShop"
                        ><i class="fab fa-github fa-2x"></i
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="col-7 col-md-4 col-lg-3">
                  <h3 class="text-primary">聯絡方式</h3>
                  <div>
                    <a href="#" class="btn-link d-block text-left"
                      ><i class="fas fa-envelope-open"> example@gmail.com</i></a
                    >
                    <a href="#" class="btn-link d-block text-left"
                      ><i class="fas fa-phone-square"> 0900-000-000</i></a
                    >
                    <a href="#" class="btn-link d-block text-left"
                      ><i class="fas fa-map-marker-alt"> 高雄的某一個角落</i></a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="container-fluid">
              <div class="row bg-dark">
                <div class="col">
                  <div class="text-center py-1">
                    <h6 class="text-white">
                      © Cheeseny 2021 All Rights Reserved.
                    </h6>
                    <h6 class="text-white">僅個人作品練習，無商業用途</h6>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <a href="/home" class="fixedBtn text-orange" @click.prevent="scrollTop"
      ><i class="fas fa-arrow-up fa-2x"></i
    ></a>
  </div>
</template>

<script>
import $ from "jquery";
import Navbar from "components/fronted/Navbar.vue";
import Sidebar from "components/fronted/Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar,
  },
  methods: {
    scrollTop() {
      $("html,body").animate({ scrollTop: "0px" }, 1000);
    },
  },
};
</script>
