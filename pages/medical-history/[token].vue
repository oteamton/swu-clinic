<template>
  <title>ประวัติสุขภาพ - SWU CLINIC</title>
  <div class="p-reg flex flex-col justify-center items-center">
    <Banner />
    <MedicalForm />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const token = useRoute().params.token;
const userData = ref(null);
const message = ref('Click the button to fetch medical data.');

const getUserData = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/user-medical-record', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      userData.value = await response.json();
      message.value = 'Medical data fetched successfully.';
    } else {
      message.value = 'Failed to fetch medical data.';
    }
  } catch (error) {
    // console.error('Error fetching medical data:', error);
    message.value = 'An error occurred while fetching medical data.';
  }
}

onMounted(() => {
  // You can perform any initial setup or data fetching here if needed.
});
</script>

<style>
.p-reg {
  min-height: 100svh;
}
</style>
