<template>
  <div>
    <div class="container">
      <ul class="progressBar">
        <li class="progressBar-item">
          <div
            class="progressBar-item-circle"
            :class="{
              'progressBar-item-circle-active': $route.name == 'OrderInfo',
            }"
          >
            1
          </div>
          <h5 class="progressBar-item-title">確認購物車</h5>
        </li>
        <li class="progressBar-item">
          <div
            class="progressBar-item-circle"
            :class="{
              'progressBar-item-circle-active': $route.name == 'CustomerInfo',
            }"
          >
            2
          </div>
          <h5 class="progressBar-item-title">填寫資料</h5>
        </li>
        <li class="progressBar-item">
          <div
            class="progressBar-item-circle"
            :class="{
              'progressBar-item-circle-active': $route.name == 'OrderCheck',
            }"
          >
            3
          </div>
          <h5 class="progressBar-item-title">確認付款</h5>
        </li>
        <li class="progressBar-item">
          <div
            class="progressBar-item-circle"
            :class="{
              'progressBar-item-circle-active': $route.name == 'OrderCompleted',
            }"
          >
            4
          </div>
          <h5 class="progressBar-item-title">完成訂單</h5>
        </li>
      </ul>
      <router-view class="mt-5" />
    </div>
  </div>
</template>
