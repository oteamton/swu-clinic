<template>
  <h2 class="text-4xl text-center mb-4 text-white">ลงทะเบียน</h2>
  <div class="breadcrumb flex gap-1">
    <a
      href="#"
      class="p-4 text-white"
      @click="currStep = 1"
      :class="{
        'bg-gray-500': !firstPageValid,
        'bg-green-700': firstPageValid,
        'border-white border-2': currStep === 1,
      }"
      >ส่วนที่ 1</a
    >
    <a
      href="#"
      class="p-4 text-white"
      :class="{
        'disabled-link': !firstPageValid,
        'bg-gray-500': !secondPageValid,
        'bg-green-700': secondPageValid,
        'border-white border-2': currStep === 2,
      }"
      @click="firstPageValid ? (currStep = 2) : $event.preventDefault()"
      >ส่วนที่ 2</a
    >
  </div>

  <div class="relative flex justify-end w-80 mt-4">
    <button class="text-gray-300 p-0 active:scale-90" @click="goToLogin">
      ผู้รักษาเก่า ?
    </button>
  </div>

  <!-- main form -->
  <form
    @submit.prevent="submitRegistration"
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
      <label for="phone">เบอร์โทรศัพท์</label>
      <input v-model="formData.phone" type="text" id="phone" required />
      <span class="text-orange-300" v-if="!isPhoneValid"
        >Please enter valid phone</span
      >

      <button
        :disabled="!firstPageValid"
        :class="{
          'bg-gray-500': !firstPageValid,
          'bg-blue-500 hover:bg-blue-700 active:bg-blue-800': firstPageValid,
        }"
        type="button"
        @click="NextPage"
        class="text-white font-bold py-2 px-4 rounded mt-4 max-w-fit self-center"
      >
        หน้าถัดไป
      </button>
    </div>

    <!-- page 2 -->
    <div v-if="currStep === 2" class="flex flex-col gap-2 mb-4">
      <label for="email">อีเมล์</label>
      <input v-model="formData.email" type="email" id="email" required />
      <span class="text-orange-300" v-if="!isEmailValid"
        >Please enter valid email</span
      >

      <label for="address">ที่อยู่</label>
      <input v-model="formData.address" type="text" id="address" required />
      <span class="text-orange-300" v-if="!isEmailValid"
        >Please enter address</span
      >

      <label for="province">จังหวัด</label>
      <input v-model="formData.province" type="text" id="province" required />
      <span class="text-orange-300" v-if="!isEmailValid"
        >Please enter province</span
      >

      <label for="state">แขวง</label>
      <input v-model="formData.state" type="text" id="state" required />
      <span class="text-orange-300" v-if="!isEmailValid"
        >Please enter state</span
      >
    </div>

    <div v-if="currStep === 2" class="flex justify-center gap-2">
      <button
        type="button"
        :disabled="!secondPageValid"
        :class="{
          'bg-gray-500': !secondPageValid,
          'bg-blue-500 hover:bg-blue-700 active:bg-blue-800 active:scale-90':
            secondPageValid,
        }"
        class="text-white font-bold py-2 px-4 rounded mt-2"
        @click="showModal = true"
      >
        ยืนยัน
      </button>
      <button
        type="button"
        @click="currStep = 1"
        class="bg-gray-500 hover:bg-gray-700 active:bg-gray-800 active:scale-90 text-white font-bold py-2 px-4 rounded mt-2"
      >
        ย้อนกลับ
      </button>
    </div>

    <!-- modal pop up -->
    <div v-if="showModal" class="modal">
      <span v-if="loading" class="spinner self-center"></span>
      <div v-else class="modal-content">
        <p>ข้อมูลถูกต้อง?</p>
        <div class="flex gap-2">
          <button
            @click="submitRegistration"
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
      >
        {{ resultMsg }}
        <button @click="resultMsg = ''" class="close-btn p-2 bg-slate-300 active:scale-90">
          ✕
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const currStep = ref(1);
const loading = ref(false);
const showModal = ref(false);
const resultMsg = ref("");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const nameRegex = /^[A-Za-z\u0E00-\u0E7F]+$/;
const phoneRegex = /^[0-9]+$/;
const addressRegex = /^[A-Za-z\u0E00-\u0E7F0-9\s]+$/;
const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};
const NextPage = () => {
  if (firstPageValid.value) {
    currStep.value++;
  }
};

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

const isAddressValid = computed(() => {
  return addressRegex.test(formData.value.address);
});

const isStateValid = computed(() => {
  return addressRegex.test(formData.value.state);
});

const isProvinceValid = computed(() => {
  return addressRegex.test(formData.value.province);
});

const firstPageValid = computed(() => {
  if (
    isPhoneValid.value &&
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

const secondPageValid = computed(() => {
  if (
    isProvinceValid.value &&
    isStateValid.value &&
    isAddressValid.value &&
    isEmailValid.value == true
  ) {
    return true;
  } else {
    return false;
  }
});

// console.log(isGenderSelected.value, isDateofBirthSelected.value, isPhoneValid.value, isNameValid.value, isSurnameValid.value)
// console.log(firstPageValid.value)

const resultClass = computed (() => {
  return resultMsg.value.includes('successful') ? 'success': 'error';
})

const submitRegistration = async () => {
  loading.value = true;
  // resultMsg.value = "";
  try {
    // console.log("Sending date:", formData.value);
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    const responseDate = await response.json();

    if (response.ok) {
      resultMsg.value = "Registration successful";
      // console.log("Registration successful:", responseDate);
    } else {
      resultMsg.value = `Registration failed: ${
        responseDate.error || response.error
      }`;
      // console.error(
      //   "Registration failed:",
      //   responseData.error || response.statusText
      // );
    }
  } catch (error) {
    // Handle any other errors
    resultMsg.value = error.message;
    // console.error("Registration failed:", error.message);
  } finally {
    loading.value = false;
    showModal.value = false;
  }
};
</script>

<style>
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

.close-btn {
  min-width: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
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
