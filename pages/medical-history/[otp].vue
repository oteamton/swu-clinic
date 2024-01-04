<template>
  <title>ประวัติสุขภาพ {{ otp }} - SWU CLINIC</title>
  <div class="p-reg flex flex-col justify-center items-center">
    <Banner />
    <MedicalForm />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const otp = route.params.otp;

</script>

<style>
.p-reg {
  min-height: 100svh;
}
</style>
