<template>
  <div class="wrapper">
    <div class="container text-center">
      <div class="py-5 mx-auto">
        <ul class="progressBar">
          <li
            class="progressBar-item"
            data-text="確認購物車"
            :class="{ active: $route.name == 'CartList' }"
          ></li>
          <li
            class="progressBar-item"
            data-text="填寫資料"
            :class="{ active: $route.name == 'CustomerInfo' }"
          ></li>
          <li
            class="progressBar-item"
            data-text="確認付款"
            :class="{ active: $route.name == 'OrderCheck' }"
          ></li>
          <li
            class="progressBar-item"
            data-text="完成訂單"
            :class="{ active: $route.name == 'OrderCompleted' }"
          ></li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>
