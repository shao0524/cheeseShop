<template>
  <footer class="footer">
    <div class="footer-body">
      <div class="container d-flex justify-content-between">
        <div class="footer-iconBlock">
          <h3 class="footer-title">Cheeseny</h3>
          <div class="footer-iconBlock-iconGroup">
            <a
              href="#"
              class="footer-iconBlock-iconGroup-icon"
              @click.prevent="tagClick"
              ><i class="fab fa-facebook-square fa-2x"></i
            ></a>
            <a
              href="#"
              class="footer-iconBlock-iconGroup-icon"
              @click.prevent="tagClick"
            >
              <i class="fab fa-line fa-2x"></i>
            </a>
            <a
              href="https://github.com/shao0524/cheeseShop"
              class="footer-iconBlock-iconGroup-icon"
              ><i class="fab fa-github fa-2x"></i
            ></a>
          </div>
        </div>
        <div class="footer-contact">
          <h3 class="footer-title">聯絡我們</h3>
          <ul class="footer-contact-list">
            <li class="footer-contact-list-item">
              <a
                href="#"
                class="footer-contact-list-item-link"
                @click.prevent="tagClick"
                ><i class="bi bi-envelope-open-fill"></i>example@com</a
              >
            </li>
            <li class="footer-contact-list-item-link">
              <a
                href="#"
                class="footer-contact-list-item"
                @click.prevent="tagClick"
                ><i class="bi bi-telephone-fill"></i>0900-000-000
              </a>
            </li>
            <li class="footer-contact-list-item">
              <a
                href="#"
                class="footer-contact-list-item-link"
                @click.prevent="tagClick"
                ><i class="bi bi-pin-map-fill"></i>高雄的某一個角落
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-footer">
      <h6 class="text-white">© Cheeseny 2021 All Rights Reserved.</h6>
      <h6 class="text-white">僅個人作品練習，無商業用途</h6>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    tagClick() {
      alert("網頁為作品使用，無提供此功能");
    },
  },
};
</script>
