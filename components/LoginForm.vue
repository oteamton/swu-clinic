<template>
  <h2 class="text-4xl text-center mb-4 text-white">เข้าสู่การจอง</h2>
  <form @submit.prevent="submitLogin" class="">
    <div class="flex flex-col justify-center w-96 gap-2 p-4 text-white">
      <label for="phone">Phone numbers</label>
      <input type="text" id="phone" v-model="login.phone" />

      <label for="otp">OTP</label>
      <input type="password" id="otp" v-model="login.otp" />
    </div>

    <div class="text-white login-btn-container">
      <button
        type="submit"
        class="py-2 px-4 rounded bg-blue-500 active:bg-blue-800 active:scale-90"
      >
        Login
      </button>
      <button
        type="button"
        @click="resendOTP"
        class="text-gray-300 p-0 active:scale-90"
      >
        Resend OTP
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const login = ref({
  phone: "",
  otp: "",
});

const resendOTP = () => {
  console.log("resend otp");
};

const submitLogin = () => {
  console.log("submit login");
};
</script>

<style>
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
 