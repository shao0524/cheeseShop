<template>
  <div>
    <Alert />
    <router-view />
  </div>
</template>

<script>
import Alert from "components/common/Alert.vue";
export default {
  components: {
    Alert,
  },
};
</script>
