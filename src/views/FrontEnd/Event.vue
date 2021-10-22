<template>
  <div class="container pt-5">
    <div class="Wrapper">
      <h2 class="titleStyle my-3">促銷活動</h2>
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-12 mb-5">
          <div
            class="text-white text-center image py-3"
            :style="{
              backgroundImage: `url(${require('@/assets/image/event/eventBG.jpg')})`,
            }"
          >
            <h3 class="py-3">慶祝開幕</h3>
            <span class="display-1 pb-3 d-block"
              >80%<sub class="display-4 text-danger">off</sub></span
            >
            <h3 class="pb-5">
              優惠代碼<br />
              cheeseny80off
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
