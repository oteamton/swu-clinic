<template>
  <div class="booking-page flex flex-col justify-center">
    <title>เลือกผู้ให้การรักษา - SWU CLINIC</title>
    <Banner />
    <h2 class="text-white text-center">วันที่ {{ date }} เวลา {{ time }}</h2>
    <BookingList />
    <UserPanel :token = "token" />
  </div>
</template>

<script setup lang="ts">
const currentDate = ref(new Date());
const routeParams = useRoute().params;
const token = typeof routeParams.token === 'string' ? routeParams.token: '';

const date = computed(() => {
  currentDate.value.toLocaleDateString();
  const yy = currentDate.value.getFullYear().toString().padStart(4,'0');
  const mm = (currentDate.value.getMonth() + 1).toString().padStart(2,'0');
  const dd = currentDate.value.getDate().toString().padStart(2,'0');
  return `${yy}-${mm}-${dd}`;
});

const time = computed(() => {
  const hours = currentDate.value.getHours().toString().padStart(2,'0');
  const minutes = currentDate.value.getMinutes().toString().padStart(2,'0');
  const seconds = currentDate.value.getSeconds().toString().padStart(2,'0');
  return `${hours}:${minutes}:${seconds}`;
});

setInterval(() => {
  currentDate.value = new Date();
}, 1000);
</script>

<style>
.booking-page {
  min-height: 100svh;
}
</style>
