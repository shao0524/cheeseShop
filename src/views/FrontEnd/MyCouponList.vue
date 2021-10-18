<template>
  <div>
    <div class="text-center">
      <h2 class="titleStyle mt-3 mb-5">我的優惠券</h2>
    </div>
    <div
      class="todoList mt-5 mb-5"
      :class="{
        'todoList-secondary': todoStatus == '全部',
        'todoList-warning': todoStatus == '未過期',
        'todoList-danger': todoStatus == '已過期',
      }"
    >
      <!-- button -->
      <div class="todoBtn-group mt-2">
        <button
          class="todoBtn todoBtn-secondary"
          :class="{ active: todoStatus == '全部' }"
          @click="todoStatus = '全部'"
        >
          全部
        </button>
        <button
          class="todoBtn todoBtn-warning"
          :class="{ active: todoStatus == '未過期' }"
          @click="todoStatus = '未過期'"
        >
          未過期
        </button>
        <button
          class="todoBtn todoBtn-danger"
          :class="{ active: todoStatus == '已過期' }"
          @click="todoStatus = '已過期'"
        >
          已過期
        </button>
      </div>
      <div class="todoList-body"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoStatus: "全部",
    };
  },
};
</script>
