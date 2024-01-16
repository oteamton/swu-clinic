<template>
  <h2 class="text-4xl text-center mb-4 text-white">ลงทะเบียน</h2>
  <div class="breadcrumb flex gap-1">
    <a
      href="#"
      class="p-4 text-white"
      @click="currStep = 1"
      :class="{
        'bg-gray-500': !firstStepValid,
        'bg-green-700': firstStepValid,
        'border-white border-2': currStep === 1,
      }"
      >ส่วนที่ 1</a
    >
    <a
      href="#"
      class="p-4 text-white"
      :class="{
        'disabled-link': !firstStepValid,
        'bg-gray-500': !secondStepValid,
        'bg-green-700': secondStepValid,
        'border-white border-2': currStep === 2,
      }"
      @click="firstStepValid ? (currStep = 2) : $event.preventDefault()"
      >ส่วนที่ 2</a
    >
  </div>

  <!-- Policy and login -->
  <div class="pol-log-container relative w-80 mt-4">
    <button class="text-gray-300 p-0 active:scale-90" @click="navigateToLogin">
      ผู้รักษาเก่า ?
    </button>
  </div>

  <!-- main form -->
  <form
    @submit.prevent="handleRegistration"
    class="flex flex-col justify-center w-96 gap-1 p-4 input"
  >
    <!-- page 1 -->
    <div v-if="currStep === 1" class="flex flex-col gap-2">
      <label for="gender">เพศ</label>
      <div
        id="gender"
        class="flex gap-2 border-orange-300 border-2 p-2 rounded"
        :class="{ 'border-none': isGenderSelected }"
      >
        <label>
          <input type="radio" v-model="formData.gender" value="ชาย" />
          ชาย
        </label>
        <label>
          <input type="radio" v-model="formData.gender" value="หญิง" />
          หญิง
        </label>
        <label>
          <input type="radio" v-model="formData.gender" value="อื่นๆ" />
          อื่นๆ
        </label>
      </div>

      <label for="name">ชื่อจริง</label>
      <input v-model="formData.name" type="text" id="name" required />
      <span class="text-orange-300" v-if="!isNameValid"
        >Please enter at least 4 characters</span
      >

      <label for="surname">นามสกุล</label>
      <input v-model="formData.surname" type="text" id="surname" required />
      <span class="text-orange-300" v-if="!isSurnameValid"
        >Please enter at least 4 characters</span
      >

      <label for="date_of_birth">วัน เดือน ปีเกิด</label>
      <!-- Use a date picker for date_of_birth -->
      <input
        v-model="formData.date_of_birth"
        type="date"
        id="date_of_birth"
        required
      />
      <span class="text-orange-300" v-if="!isDateofBirthSelected"
        >Please select a date</span
      >

      <button
        :disabled="!firstStepValid"
        :class="{
          'bg-gray-500': !firstStepValid,
          'bg-blue-500 hover:bg-blue-700 active:bg-blue-800': firstStepValid,
        }"
        type="button"
        @click="nextStep"
        class="text-white font-bold py-2 px-4 rounded mt-4 max-w-fit self-center"
      >
        หน้าถัดไป
      </button>
    </div>

    <!-- page 2 -->
    <div v-if="currStep === 2" class="flex flex-col gap-2">
      <label for="line">Line ID</label>
      <input v-model="formData.lineId" type="text" id="lineId" required />

      <label for="email">อีเมล์</label>
      <input v-model="formData.email" type="email" id="email" required />
      <span class="text-orange-300" v-if="!isEmailValid"
        >Please enter valid email</span
      >
      <label for="phone">เบอร์โทรศัพท์</label>
      <input v-model="formData.phone" type="text" id="phone" required />
      <span class="text-orange-300" v-if="!isPhoneValid"
        >Please enter valid phone</span
      >

      <label>เบอร์โทรศัพท์บุคคลใกล้ตัว</label>
      <input v-model="formData.phoneOptional" type="text" id="phone" />
      <!-- <span class="text-orange-300" v-if="!isPhoneValid"
        >Please enter valid phone</span
      > -->
    </div>
    <div
      v-if="currStep === 2"
      class="policy-wrapper flex justify-center px-2 m-2 w-auto"
    >
      <input
        type="checkbox"
        :checked="isSelected"
        @click="policyAccept"
        class="m-2 ml-0"
      />
      <button
        @click="showPopup = true"
        class="text-slate-300 underline- active:scale-90"
        :class="{ 'text-green-500 no-underline': isSelected }"
      >
        ชี้แจงรายละเอียดการประมวลผลข้อมูลส่วนบุคคล (Privacy Policy)
      </button>
      <Popup :visible="showPopup" @update:visible="showPopup = $event">
        <PrivacyPolicy />
      </Popup>
    </div>

    <div v-if="currStep === 2" class="flex justify-center gap-2">
      <button
        type="button"
        :disabled="!secondStepValid"
        :class="{
          'bg-gray-500': !secondStepValid,
          'bg-blue-500 hover:bg-blue-700 active:bg-blue-800 active:scale-90':
            secondStepValid,
        }"
        class="text-white font-bold py-2 px-4 rounded mt-2"
        @click="confirmPolicy"
      >
        ยืนยัน
      </button>
      <Popup
        :visible="showPopupAlert"
        @update:visible="showPopupAlert = $event"
      >
        <div :class="{'text-green-500': isSelected}" >
          <h1>
            กรุณาอ่านตรวจสอบและยอมรับข้อกำหนดในการใช้งาน <br />(Please read,
            review and accept the terms of use.)
          </h1>
        </div>
      </Popup>
      <button
        type="button"
        @click="currStep = 1"
        class="bg-gray-500 hover:bg-gray-700 active:bg-gray-800 active:scale-90 text-white font-bold py-2 px-4 rounded mt-2"
      >
        ย้อนกลับ
      </button>
    </div>

    <!-- modal pop up before submitting -->
    <div v-if="showModal" class="modal">
      <span v-if="loading" class="spinner self-center"></span>
      <div v-else class="modal-content">
        <p>ข้อมูลถูกต้อง?</p>
        <div class="flex gap-2">
          <button
            @click="handleRegistration"
            class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 active:scale-90 text-white font-bold py-2 px-4 rounded mt-2"
          >
            {{ loading ? "กำลังดำเนินการ..." : "ยืนยัน" }}
          </button>
          <button
            type="button"
            @click="showModal = false"
            class="bg-red-500 hover:bg-red-700 active:bg-red-800 active:scale-90 text-white font-bold py-2 px-4 rounded mt-2"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>

    <div v-if="resultMsg" class="overlay">
      <div
        v-if="resultMsg"
        :class="['result-box', resultClass]"
        class="flex items-center gap-2"
      >
        {{ resultMsg }}
        <button
          @click="resultMsg = ''"
          class="close-btn-parent bg-slate-300 active:scale-90"
        >
          ✕
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Popup from "./Popup.vue";
import PrivacyPolicy from "./PrivacyPolicy.vue";

const currStep = ref(1);
const loading = ref(false);
const showModal = ref(false); // for ensure subbmitting
const showPopup = ref(false); // for display privacy policy
const showPopupAlert = ref(false); // Alert for checking pp box
const confPolicy = ref(false); // checkbox in privacy policy
const resultMsg = ref("");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const nameRegex = /^[A-Za-z\u0E00-\u0E7F]+$/;
const phoneRegex = /^[0-9]+$/;
// const addressRegex = /^[A-Za-z\u0E00-\u0E7F0-9\s]+$/;
const router = useRouter();

interface ResponseData {
  error?: string;
  token?: string;
  otp: string;
}

const formData = ref({
  accept: "ไม่ยอมรับ",
  name: "",
  surname: "",
  date_of_birth: "",
  phone: "",
  phoneOptional: "",
  lineId: "",
  email: "",
  gender: "",
});

const policyAccept = () => {
  confPolicy.value = !confPolicy.value;

  formData.value.accept = confPolicy.value ? "ยอมรับ" : "ไม่ยอมรับ";
};

const navigateToLogin = () => {
  router.push("/login");
};

const nextStep = () => {
  if (firstStepValid.value) {
    currStep.value++;
  }
};

// Valid function
const isNameValid = computed(() => {
  return nameRegex.test(formData.value.name) && formData.value.name.length >= 4;
});

const isSurnameValid = computed(() => {
  return (
    nameRegex.test(formData.value.surname) && formData.value.surname.length >= 4
  );
});

const isEmailValid = computed(() => {
  return emailRegex.test(formData.value.email);
});

const isGenderSelected = computed(() => {
  return formData.value.gender !== "";
});

const isDateofBirthSelected = computed(() => {
  return formData.value.date_of_birth !== "";
});

const isPhoneValid = computed(() => {
  return (
    phoneRegex.test(formData.value.phone) && formData.value.phone.length == 10
  );
});

const firstStepValid = computed(() => {
  if (
    isNameValid.value &&
    isSurnameValid.value &&
    isDateofBirthSelected.value &&
    isGenderSelected.value == true
  ) {
    return true;
  } else {
    return false;
  }
});

const secondStepValid = computed(() => {
  if (isPhoneValid.value && isEmailValid.value == true) {
    return true;
  } else {
    return false;
  }
});

const isSelected = computed(() => confPolicy.value);
// console.log(isGenderSelected.value, isDateofBirthSelected.value, isPhoneValid.value, isNameValid.value, isSurnameValid.value)
// console.log(firstStepValid.value)

const resultClass = computed(() => {
  return resultMsg.value.includes("successful") ? "success" : "error";
});

const confirmPolicy = () => {
  if (isSelected.value === true) {
    showModal.value = true;
  } else {
    showPopupAlert.value = true;
  }
};

const handleRegistration = async () => {
  loading.value = true;
  resultMsg.value = ""; // Clearing any previous messages
  try {
    // console.log("Data:", formData.value);
    const response = await fetch("http://localhost:8080/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    const responseData: ResponseData = await response.json();
    if (response.ok) {
      if (responseData.token) {
        resultMsg.value = "Registration successful";
        // navigateTo(`/medical-history/${responseData.token}`);
        navigateTo(`/booking/${responseData.token}`);
      } else {
        resultMsg.value = "Registration failed no otp found";
      }

      // console.log("Registration successful:", responseData);
    } else {
      resultMsg.value = responseData.error || response.statusText;
      // console.error(
      //   "Registration failed:",
      //   responseData.error || response.statusText
      // );
    }
  } catch (error: any) {
    // Handle any other errors
    resultMsg.value = error.message;
    // console.error("Registration failed:", error.message);
  } finally {
    loading.value = false;
    showModal.value = false;
  }
};
</script>

<style scoped>
template {
  font-family: "Kanit", sans-serif;
}

.breadcrumb a:hover {
  cursor: pointer;
  background-color: lightgreen;
}

.breadcrumb a:active {
  scale: 0.9;
}

.breadcrumb a:nth-child(1) {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.breadcrumb a:nth-child(2) {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* breadcrumb disabled link */
.disabled-link {
  pointer-events: none;
  cursor: default;
}

.pol-log-container {
  display: grid;
  grid-template-columns: [l-e] 0.6fr [l-s] 1.2fr [r-s] 0.6fr [r-e];
}

.pol-log-container button:nth-child(1) {
  grid-column: r-s/r-e;
}

/* modal pop-up */
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

/* Style for result pop up */
.result-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
  font-size: 1rem;
  background-color: #f8f8f8;
  z-index: 1000;
}

/* Success and Error Styling */
.result-box.success {
  border: 5px solid #4caf50;
  /* Green for success */
}

.result-box.error {
  border: 5px solid #f44336;
}

.close-btn-parent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1.2;
  transition: transform 0.2 ease-in-out;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Spinner Styles */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  /* Blue color to match theme */
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
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

label {
  color: #fff;
}

input,
select {
  text-indent: 5px;
  border-radius: 6px;
  border: 1px solid #fff;
  color: #fff;
  background-color: #333;
}
</style>
