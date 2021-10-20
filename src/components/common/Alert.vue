<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible d-flex p-0"
      :class="'bg-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
      role="alert"
    >
      <div class="alert-icon">
        <i
          :class="{
            'far fa-check-circle': status,
            'fas fa-exclamation-triangle': !status,
          }"
        ></i>
      </div>
      <div class="d-flex align-items-center">
        <h5 class="align-self-center text-white pl-3 pr-5 mb-0">
          {{ item.message }}
        </h5>
        <button
          type="button"
          class="close text-white h-100"
          data-dismiss="alert"
          aria-label="Close"
          @click="removeMessage(i)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      status: false,
    };
  },
  methods: {
    updateMessage(message, status) {
      const vm = this;
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        timestamp,
        message,
        status,
      });
      vm.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    this.$bus.$on("Alert:success", (msg, status = "warning") => {
      this.updateMessage(msg, status);
      this.status = true;
    });
    this.$bus.$on("Alert:error", (msg, status = "danger") => {
      this.updateMessage(msg, status);
    });
  },
  beforeDestroy() {
    this.$bus.$off("Alert:success");
    this.$bus.$off("Alert:error");
  },
};
</script>
