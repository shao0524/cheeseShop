<template>
  <div>
    <!-- Carousel -->
    <Carousel />
    <div class="mt-3 mt-lg-3">
      <div class="row mx-1">
        <!-- productCategory -->
        <div class="col-12 col-md-10 col-xl-3 mx-auto">
          <ProductCategory
            :categories="categories"
            @changeCategory="changeCategory"
          />
        </div>
        <!-- productCard -->
        <div class="col-12 col-md-10 col-xl-9 mx-auto" id="Card">
          <!-- search -->
          <div class="mb-3 mt-3">
            <div class="form-row justify-content-center">
              <div class="col-12 col-md-6 col-lg-6">
                <input
                  type="text"
                  id="search"
                  class="form-control w-100 mx-auto"
                  placeholder="請輸入商品名稱"
                  v-model="searchText"
                />
              </div>
            </div>
          </div>
          <!-- card -->
          <div class="row mx-1 mx-lg-5">
            <div
              class="col-12 col-md-6 col-xl-4 mb-5"
              v-for="item in filter(currentPage)"
              :key="item.id"
            >
              <ProductCard :item="item" />
            </div>
          </div>

          <!-- pagination -->
          <Pagination
            class="mb-3"
            :pagination="pagination"
            @changePage="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "components/fronted/Carousel.vue";
import ProductCategory from "components/fronted/ProductCategory.vue";
import ProductCard from "components/fronted/ProductCard.vue";
import Pagination from "components/common/Pagination.vue";
export default {
  components: {
    Carousel,
    ProductCategory,
    ProductCard,
    Pagination,
  },
  data() {
    return {
      allProducts: [],
      searchText: "",
      pagination: {},
      currentPage: "1",
      clickedCategory: "全部商品",
    };
  },
  methods: {
    getAllProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/products/all`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.allProducts = res.data.products;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    filter(page) {
      const vm = this;
      let filteredData = [];
      if (vm.clickedCategory === "全部商品") {
        //無分類
        filteredData = vm.allProducts;
        if (vm.searchText) {
          //有搜尋
          let data = [];
          data = filteredData.filter((item) => {
            return item.title.match(vm.searchText);
          });
          filteredData = data;
        }
      } else {
        //有分類
        filteredData = vm.allProducts.filter((item) => {
          return item.category.match(vm.clickedCategory);
        });
        if (vm.searchText) {
          //有搜尋
          let data = [];
          data = filteredData.filter((item) => {
            return item.title.match(vm.searchText);
          });
          filteredData = data;
        }
      }
      let newArray = [];
      filteredData.forEach((item, index) => {
        if (parseInt(index / 6) + 1 == page) {
          newArray.push(item);
        }
      });
      //pagination
      vm.setPagination(filteredData, page);
      return newArray;
    },
    setPagination(data, currentPage) {
      const vm = this;
      let totalPages = parseInt(data.length / 6) + 1;
      let hasPre = false;
      let hasNext = false;
      if (totalPages != 1) {
        if (currentPage == 1) {
          hasNext = true;
        } else if (currentPage == totalPages) {
          hasPre = true;
        } else {
          hasPre = true;
          hasNext = true;
        }
      }
      vm.$set(vm.pagination, "total_pages", totalPages);
      vm.$set(vm.pagination, "current_page", currentPage);
      vm.$set(vm.pagination, "has_pre", hasPre);
      vm.$set(vm.pagination, "has_next", hasNext);
    },
    changePage(page) {
      const vm = this;
      vm.currentPage = page;
    },
    changeCategory(category) {
      const vm = this;
      vm.clickedCategory = category;
      vm.currentPage = 1;
    },
  },
  computed: {
    categories() {
      const vm = this;
      let categories = new Set();
      vm.allProducts.forEach((item) => {
        categories.add(item.category);
      });
      return Array.from(categories);
    },
  },
  created() {
    this.getAllProduct();
  },
};
</script>
