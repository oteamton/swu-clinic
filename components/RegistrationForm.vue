<template>
  <h2 class="text-4xl text-center mb-4">ลงทะเบียน</h2>
  <form
    @submit.prevent="submitRegistration"
    class="flex flex-col justify-center w-96 gap-1 p-6 input"
  >
    <label for="name">ชื่อจริง</label>
    <input v-model="formData.name" type="text" id="name" required />

    <label for="surname">นามสกุล</label>
    <input v-model="formData.surname" type="text" id="surname" required />

    <label for="date_of_birth">วัน เดือน ปีเกิด</label>
    <!-- Use a date picker for date_of_birth -->
    <input v-model="formData.date_of_birth" type="date" id="date_of_birth" required />

    <label for="email">อีเมล์</label>
    <input v-model="formData.email" type="email" id="email" required />

    <label for="phone">เบอร์โทรศัพท์</label>
    <input v-model.number="formData.phone" type="number" id="phone" required />

    <label for="address">ที่อยู่</label>
    <input v-model="formData.address" type="text" id="address" required />

    <label for="province">จังหวัด</label>
    <input v-model="formData.province" type="text" id="province" required />

    <label for="state">แขวง</label>
    <input v-model="formData.state" type="text" id="state" required />

    <label for="gender">เพศ</label>
    <!-- Use a dropdown for gender with fixed options -->
    <select v-model="formData.gender" id="gender" required>
      <option value="male">ชาย</option>
      <option value="female">หญิง</option>
      <option value="other">อื่น ๆ</option>
    </select>

    <button
    :disabled="loading"
      class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2"
      type="submit"
    >
      {{  loading? 'Loading...' : 'ยืนยัน' }}
    </button>

    <span v-if="loading" class="spinner"></span>
    <span v-else></span>

    <div v-if="resultMsg" class="result-box">
      {{ resultMsg }}
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
// import { useHttp } from '@nuxt/http';

const formData = ref({
  name: "",
  surname: "",
  date_of_birth: "",
  phone: "",
  email: "",
  address: "",
  province: "",
  state: "",
  gender: "",
});

const loading = ref(false);
const resultMsg = ref("");

const submitRegistration = async () => {
  loading.value = true;
  resultMsg.value = "";
  try {
    console.log("Sending date:", formData.value);
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      const data = await response.json();
      resultMsg.value = "Registration successful";
      console.log("Registration successful:", data);
    } else {
      resultMsg.value = `Registration failed: ${response.statusText}`;
      console.error("Registration failed:", response.statusText);
    }
  } catch (error) {
    // Handle any errors
    console.error("Registration failed:", error.statusText);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.result-box {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
  font-size: 1rem;
  background-color: #f8f8f8;
}

/* Success and Error Styling */
.result-box.success {
  border-left: 5px solid #4caf50; /* Green for success */
}

.result-box.error {
  border-left: 5px solid #f44336; /* Red for error */
}

/* Spinner Styles */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #3498db; /* Blue color to match theme */
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Spinner Animation */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

label{
  color: white;
}

input,
select {
  color: slateblue;
}
</style>
