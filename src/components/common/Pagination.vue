<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(parseInt(pagination.current_page) - 1)"
          >
            <i class="fas fa-arrow-alt-circle-left"></i>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: page == pagination.current_page }"
          v-for="(page, index) in pagination.total_pages"
          :key="index"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(parseInt(pagination.current_page) + 1)"
          >
            <i class="fas fa-arrow-alt-circle-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["pagination"],
  methods: {
    changePage(page) {
      const vm = this;
      console.log(page);
      vm.$emit("changePage", page);
    },
  },
};
</script>
