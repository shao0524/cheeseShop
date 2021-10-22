<template>
  <div class="container">
    <div
      class="jumbotron image d-flex justify-content-center"
      :style="{
        backgroundImage: `url(${require('@/assets/image/order/thank.jpg')})`,
      }"
    >
      <div class="offset d-inline-block">
        <h2>感謝您的購買!</h2>
        <p class="lead font-weight-bolder">
          將會盡快為您出貨，期待您再次光臨本店。
        </p>
        <hr class="my-1 my-md-4 my-lg-4" />
        <div class="text-center">
          <router-link class="btn btn-primary" to="/">繼續選購去</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$bus.$emit("reloadCartItem");
  },
};
</script>
