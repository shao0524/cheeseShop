<template>
  <div>
    <div
      class="myAlert"
      :class="{
        'myAlert-success': item.isSuccess,
        'myAlert-danger': !item.isSuccess,
      }"
      v-for="(item, index) in messages"
      :key="item.timeStamp"
      :style="{ top: `${index * 10 + 20}%` }"
    >
      <div class="myAlert-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3 class="myAlert-message">{{ item.message }}</h3>
      <button
        type="button"
        class="myAlert-close"
        data-dismiss="alert"
        aria-label="Close"
        @click="removeMessage(item.timeStamp)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, isSuccess) {
      const vm = this;
      const timeStamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        timeStamp,
        message,
        isSuccess,
      });
      vm.removeMessageWithTiming(timeStamp);
    },
    removeMessage(timeStamp) {
      const vm = this;
      const index = vm.messages.findIndex(
        (item) => item.timeStamp === timeStamp
      );
      vm.messages.splice(index, 1);
    },
    removeMessageWithTiming(timeStamp) {
      const vm = this;
      setTimeout(() => {
        vm.removeMessage(timeStamp);
      }, 5000);
    },
  },
  computed: {
    messageLen() {
      const vm = this;
      return vm.messages.length;
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on("alert", (message, isSuccess) => {
      vm.updateMessage(message, isSuccess);
    });
  },
  beforeDestroy() {
    const vm = this;
    vm.$bus.$off("alert");
  },
};
</script>
