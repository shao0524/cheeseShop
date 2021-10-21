<template>
  <div>
    <!-- create button -->
    <div class="text-right my-3 mr-3">
      <button class="btb btn-primary px-3 py-1" @click="openModal(true)">
        建立新商品
      </button>
    </div>
    <!-- table -->
    <table class="table table-hover table-striped table-dark">
      <thead class="bg-warning">
        <tr class="text-center">
          <th width="250">產品編號</th>
          <th>產品名稱</th>
          <th>分類</th>
          <th width="80">庫存</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">特價</th>
          <th width="120">狀態</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="item in productList" :key="item.id">
          <td width="250">{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.category }}</td>
          <td width="80">{{ item.stock }}</td>
          <td width="120" class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td width="120" class="text-right">{{ item.price | currency }}</td>
          <td width="120">
            <span class="text-success" v-if="item.is_enabled">啟用中</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td width="200">
            <div class="btn-group">
              <button
                class="btn btn-outline-info btn-sm"
                @click="openModal(false, item, 'edit')"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openModal(false, item, 'remove')"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody></tbody>
    </table>
    <div class="my-3">
      <Pagination :pagination="pagination" @changePage="changePage" />
    </div>

    <!-- create & edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ modalTitle }}
            </h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ValidationObserver v-slot="{ invalid }">
              <form @submit.prevent="updateData">
                <div class="row">
                  <div class="col-6">
                    <div class="form-group my-1">
                      <label for="url" class="my-1">請輸入圖片網址</label>
                      <input
                        type="text"
                        name="url"
                        id="url"
                        class="form-control"
                        v-model="tempProduct.imageUrl"
                      />
                    </div>
                    <div class="form-group my-1">
                      <label for="exampleFormControlFile1" class="my-1"
                        >或上傳圖片</label
                      >
                      <input
                        type="file"
                        class="form-control-file w-75"
                        id="exampleFormControlFile1"
                        ref="files"
                        @change="uploadFile"
                      />
                    </div>
                    <div>
                      <img :src="tempProduct.imageUrl" class="w-100" />
                    </div>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      class="form-group my-1"
                      rules="required"
                    >
                      <label for="title" class="mb-1">商品名稱</label>
                      <input
                        type="text"
                        name="商品名稱"
                        id="title"
                        class="form-control"
                        :class="{ 'is-invalid': failed }"
                        v-model="tempProduct.title"
                      />
                      <span v-if="failed" class="text-danger d-block my-1">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      class="form-group my-1"
                      rules="required"
                    >
                      <label for="titleEng" class="my-1">商品名稱(英文)</label>
                      <input
                        type="text"
                        name="商品名稱"
                        id="titleEng"
                        class="form-control"
                        :class="{ 'is-invalid': failed }"
                        v-model="tempProduct.titleEng"
                      />
                      <span v-if="failed" class="text-danger d-block my-1">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ failed, errors }"
                      rules="required"
                      class="form-group my-1"
                    >
                      <label for="category" class="my-1">種類</label>
                      <select
                        name="種類"
                        id="category"
                        v-model="tempProduct.category"
                        :class="{ 'is-invalid': failed }"
                        class="form-control"
                      >
                        <option value="" selected disabled>請選擇種類</option>
                        <option value="軟質起司">軟質起司</option>
                        <option value="半硬質起司">半硬質起司</option>
                        <option value="硬質起司">硬質起司</option>
                        <option value="藍紋起司">藍紋起司</option>
                        <option value="紡絲起司">紡絲起司</option>
                        <option value="甜點常用起司">甜點常用起司</option>
                        <option value="起司絲">起司絲</option>
                        <option value="起司片">起司片</option>
                      </select>
                      <span v-if="failed" class="text-danger d-block my-1">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      class="form-group my-1"
                      v-slot="{ failed, errors }"
                      rules="required"
                    >
                      <label for="place" class="my-1">產地</label>
                      <select
                        name="產地"
                        id="place"
                        class="form-control"
                        :class="{ 'is-invalid': failed }"
                        v-model="tempProduct.place"
                      >
                        <option value="" disabled>請選擇產地</option>
                        <option value="美國">美洲</option>
                        <option value="歐洲">歐洲</option>
                        <option value="澳洲">澳洲</option>
                        <option value="日本">日本</option>
                      </select>
                      <span v-if="failed" class="text-danger d-block my-1">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      class="form-group my-1"
                      v-slot="{ failed, errors }"
                      rules="required"
                    >
                      <label for="material" class="my-1">成分</label>
                      <select
                        name="成分 "
                        id="material"
                        class="form-control"
                        :class="{ 'is-invalid': failed }"
                        v-model="tempProduct.material"
                      >
                        <option value="" disabled>請選擇主原料</option>
                        <option value="牛奶">牛奶</option>
                        <option value="羊奶">羊奶</option>
                      </select>
                      <span v-if="failed" class="text-danger d-block my-1">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                    <div class="form-row">
                      <ValidationProvider
                        class="col-12 col-md-12 col-lg-6 my-1"
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <label for="origin_price" class="my-1">原價</label>
                        <input
                          type="number"
                          name="原價"
                          id="origin_price"
                          class="form-control number"
                          :class="{ 'is-invalid': failed }"
                          v-model="tempProduct.origin_price"
                        />
                        <span v-if="failed" class="text-danger d-block my-1">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                      <div class="col-12 col-md-12 col-lg-6 my-1">
                        <label for="price" class="my-1"
                          >特價(沒有則不填寫)</label
                        >
                        <input
                          type="number"
                          name="特價"
                          id="price"
                          class="form-control number"
                          v-model="tempProduct.price"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <ValidationProvider
                        class="col-12 col-md-12 col-lg-6 my-1"
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <label for="stock" class="my-1">庫存</label>
                        <input
                          type="number"
                          name="庫存"
                          id="stock"
                          class="form-control"
                          :class="{ 'is-invalid': failed }"
                          v-model="tempProduct.stock"
                        />
                        <span v-if="failed" class="text-danger d-block my-1">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                      <ValidationProvider
                        class="col-12 col-md-12 col-lg-6 my-1"
                        v-slot="{ failed, errors }"
                        rules="required"
                      >
                        <label for="unit" class="my-1">單位</label>
                        <input
                          type="text"
                          name="單位"
                          id="unit"
                          class="form-control"
                          :class="{ 'is-invalid': failed }"
                          v-model="tempProduct.unit"
                          placeholder="如：件、包"
                        />
                        <span v-if="failed" class="text-danger d-block my-1">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-check my-1">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="is_enabled"
                        v-model="tempProduct.is_enabled"
                      />
                      <label class="form-check-label my-1" for="is_enabled"
                        >啟用</label
                      >
                    </div>
                  </div>
                </div>
                <div class="container-fluid mb-3">
                  <div class="from-group">
                    <label for="content" class="my-1">產品敘述</label>
                    <textarea
                      name="content"
                      id="content"
                      cols="30"
                      rows="5"
                      class="form-control"
                      v-model="tempProduct.content"
                    ></textarea>
                  </div>
                </div>
                <hr />
                <div class="form-row justify-content-end">
                  <div class="col-6 text-center">
                    <button
                      type="button"
                      class="btn btn-outline-secondary form-control w-50"
                      data-dismiss="modal"
                    >
                      關閉
                    </button>
                  </div>
                  <div class="col-6 text-center">
                    <button
                      type="submit"
                      class="btn btn-primary form-control w-50"
                      :disabled="invalid"
                    >
                      儲存
                    </button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <!-- remove Modal-->
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ modalTitle }}
            </h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6>
              商品編號： {{ tempProduct.id }}
              <br />
              商品名稱：{{ tempProduct.title }}
              <br />
              分類：{{ tempProduct.category }}
              <br />
              庫存：{{ tempProduct.stock }}
              <br />
              原價：{{ tempProduct.origin_price | currency }}
              <br />
              特價：{{ tempProduct.price | currency }}
            </h6>
            <hr />
            <div class="row">
              <div class="col-6 text-center">
                <button
                  type="button"
                  class="btn btn-outline-secondary w-50"
                  data-dismiss="modal"
                >
                  取消
                </button>
              </div>
              <div class="col-6 text-center">
                <button
                  type="button"
                  class="btn btn-danger w-50"
                  @click="removeItem(tempProduct)"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "components/common/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isNew: "",
      tempProduct: {},
      modalTitle: "",
      productList: [],
      pagination: {},
    };
  },
  methods: {
    openModal(isNew, item, control) {
      const vm = this;
      if (isNew) {
        //判斷是否是新建
        vm.isNew = isNew;
        vm.tempProduct = {};
        vm.modalTitle = "建立新商品";
        $("#editModal").modal("show");
      } else {
        if (control == "edit") {
          vm.isNew = isNew;
          vm.tempProduct = Object.assign({}, item);
          vm.modalTitle = `編輯： ${vm.tempProduct.title}`;
          $("#editModal").modal("show");
        } else {
          vm.isNew = isNew;
          vm.tempProduct = Object.assign({}, item);
          vm.modalTitle = `刪除：${vm.tempProduct.title}`;
          $("#removeModal").modal("show");
        }
      }
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/upload`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    updateData() {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/product`;
      let method = "post";
      if (!vm.isNew) {
        url = `${process.env.APIPATH}/api/${process.env.USER}/admin/product/${vm.tempProduct.id}`;
        method = "put";
      }
      if (!vm.tempProduct.price) {
        vm.tempProduct.price = vm.tempProduct.origin_price;
      }
      this.$http[method](url, {
        data: vm.tempProduct,
      })
        .then((res) => {
          if (res.data.success) {
            vm.getProductList();
            $("#editModal").modal("hide");
            vm.$bus.$emit("Alert:success", res.data.message);
          }
        })
        .catch((error) => {
          vm.$bus.$emit("Alert:error", error);
        });
    },
    getProductList(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/products?page=${page}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            vm.productList = res.data.products;
            vm.pagination = res.data.pagination;
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("isLoading", false);
          vm.$bus.$emit("Alert:error", error);
        });
    },
    removeItem(item) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USER}/admin/product/${item.id}`;
      vm.$bus.$emit("isLoading", true);
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            vm.getProductList();
            $("#removeModal").modal("hide");
            vm.$bus.$emit("Alert:success", res.data.message);
          }
          vm.$bus.$emit("isLoading", false);
        })
        .catch((error) => {
          vm.$bus.$emit("Alert:error", error);
        });
    },
    changePage(page) {
      const vm = this;
      vm.getProductList(page);
    },
  },
  created() {
    this.getProductList();
  },
};
</script>
