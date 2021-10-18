<template>
  <div>
    <div class="container mb-5 text-center">
      <div class="mt-5 mx-auto">
        <ul class="progressBar">
          <li
            class="progressBar-item h5"
            :class="{ active: $route.name == 'CartList' }"
          >
            確認購物車
          </li>
          <li
            class="progressBar-item h5"
            :class="{ active: $route.name == 'CustomerInfo' }"
          >
            填寫資料
          </li>
          <li
            class="progressBar-item h5"
            :class="{ active: $route.name == 'OrderCheck' }"
          >
            確認付款
          </li>
          <li
            class="progressBar-item h5"
            :class="{ active: $route.name == 'OrderCompleted' }"
          >
            完成訂單
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>
