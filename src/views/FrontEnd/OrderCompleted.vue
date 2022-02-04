<template>
  <div>
    <div
      class="myJumbotron"
      :style="{
        backgroundImage: `url(${require('@/assets/image/order/thank.jpg')})`,
      }"
    >
      <div class="myJumbotron-mask">
        <h2 class="myJumbotron-mask-title">感謝您的購買!</h2>
        <p class="myJumbotron-mask-text">
          將會盡快為您出貨，期待您再次光臨本店。
        </p>
        <router-link class="btn btn-primary mb-3" to="/"
          >繼續選購去</router-link
        >
      </div>
    </div>
  </div>
</template>
