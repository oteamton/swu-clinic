<template>
  <title>ยินดีตอนรับ - SWU CLINIC</title>
  <div class="welcome flex flex-col justify-center items-center text-white">
    <h1><span class="text-red-500">SWU</span> <span class="text-gray-500">CLINIC</span> ยินดีต้อนรับ</h1>
    <p>กำลังนำไปสู้หน้าลงทะเบียน {{ countdown }} วินาที. . .</p>
    <NuxtLink to="/register">
      <button class="bg-red-700 p-2 rounded mt-2">ลงทะเบียน</button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const countdown = ref(5);

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--;

    if (countdown.value === 0) {
      clearInterval(interval);
      router.push("/register");
    }
  }, 1000);
});
</script>

<style>
.welcome {
  height: 100svh;
}
</style>
