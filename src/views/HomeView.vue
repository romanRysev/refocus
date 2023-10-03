<template>
  <div class="home">
    <StatusPage msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StatusPage from "@/components/StatusPage.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    StatusPage,
  },
});
</script>
