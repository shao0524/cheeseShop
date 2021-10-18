<template>
  <div class="min-vh-100 bg">
    <div class="container-fluid mt-5 mb-3">
      <div class="row">
        <div class="col-12 col-lg-2">
          <div class="listGroup">
            <router-link
              class="listGroup-item"
              :class="{ active: $route.name == 'MyOrderList' }"
              to="/customer/myorderlist"
              >我的訂單</router-link
            >
            <router-link
              class="listGroup-item"
              :class="{ active: $route.name == 'MyCouponList' }"
              to="/customer/mycouponlist"
              >我的優惠券</router-link
            >
          </div>
        </div>
        <div class="col-12 col-lg-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
