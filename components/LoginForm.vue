<template>
  <h2 class="text-4xl text-center mb-4 text-white">เข้าสู่การจอง</h2>
  <form @submit.prevent="submitLogin">
    <div class="flex flex-col justify-center w-96 gap-2 p-4 text-white">
      <label for="phone">หมายเลขโทรศัพท์ (Phone number)</label>
      <input type="text" id="phone" v-model.trim="login.phone" />

      <label for="cardId">รหัสบัตรประชาชน (Card ID)</label>
      <input type="text" id="cardId" v-model.trim="login.cardId" />
    </div>

    <div class="text-white login-btn-container">
      <button
        @click="submitLogin"
        class="py-2 px-4 rounded bg-blue-500 active:bg-blue-800 active:scale-90"
      >
        เข้าสู่ระบบ
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { fetchApi } from "~/utils/apiUtils";
const loading = ref(false);
const resultMessage = ref("");

interface ResponseData {
  error?: string;
  token?: string;
}

const login = ref({
  phone: "",
  cardId: "",
});

const submitLogin = async () => {
  loading.value = true;
  resultMessage.value = "";
  try {
    const response = await fetch("http://localhost:8080/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login.value),
    });

    const responseData: ResponseData = await response.json();

    if (response.ok) {
      if (responseData.token) {
        navigateTo(`/booking/${responseData.token}`);
      } else {
        resultMessage.value = "Registration failed no otp found";
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input {
  text-indent: 5px;
  border-radius: 6px;
  border: 1px solid #fff;
  color: #fff;
  background-color: #333;
}

.login-btn-container {
  display: grid;
  grid-template-columns: [left-s] 1fr [left-e] 1fr [right-s] 1fr [right-e];
  width: 100%;
}

.login-btn-container button:nth-child(1) {
  grid-column: left-e / right-s;
  width: fit-content;
  place-self: center;
}

.login-btn-container button:nth-child(2) {
  grid-column: right-s / right-e;
  justify-self: end;
}
</style>
