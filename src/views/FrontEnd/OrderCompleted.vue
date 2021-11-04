<template>
  <div class="container">
    <div
      class="jumbotron image d-flex justify-content-center"
      :style="{
        backgroundImage: `url(${require('@/assets/image/order/thank.jpg')})`,
      }"
    >
      <div class="banner-mask d-inline-block pl-3">
        <h2 class="pt-3">感謝您的購買!</h2>
        <p class="lead font-weight-bolder">
          將會盡快為您出貨，期待您再次光臨本店。
        </p>
        <hr class="my-1 my-md-4 my-lg-4" />
        <div class="text-center">
          <router-link class="btn btn-primary mb-3" to="/"
            >繼續選購去</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
