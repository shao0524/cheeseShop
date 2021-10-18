<template>
  <div>
    <Alert />
    <router-view />
  </div>
</template>

<script>
import Alert from "components/Alert.vue";
export default {
  components: {
    Alert,
  },
};
</script>
