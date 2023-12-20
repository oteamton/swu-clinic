<!-- //_[token].vue -->
<template>
  <h2>Medical History</h2>
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
      >ส่วนที่ 3</a
    >
  </div>
  <div class="first-container">
    <h2 class="text-xl text-white mt-4 text-center">
      ประวัติสุขภาพ (Medical History)
    </h2>
    <div
      id="medicalHistory"
      class="medicalBox flex justify-stretch gap-4 border-2 p-2 rounded text-white"
    >
      <label>
        <input type="checkbox" value="ความดันโลหิตสูง" />
        ความดันโลหิตสูง (Hypertension)
      </label>
      <label>
        <input type="checkbox" value="เบาหวาน" />
        เบาหวาน (Diabetes)
      </label>
      <label>
        <input type="checkbox" value="ไขมันในเลือดสูง" />
        ไขมันในเลือดสูง (Dyslipidemia)
      </label>
      <label>
        <input type="checkbox" value="กระดูกพรุน" />
        กระดูกพรุน (Osteoporosis)
      </label>
      <label>
        <input type="checkbox" value="เนื้องอก" />
        เนื้องอก (Tumor)
      </label>
      <label>
        <input type="checkbox" value="มะเร็ง" />
        มะเร็ง (Cancer)
      </label>
      <label>
        <input type="checkbox" value="โรคไต" />
        โรคไต (Kidney disease)
      </label>
      <label>
        <input type="checkbox" value="หอบหืด ภูมิแพ้" />
        หอบหืด ภูมิแพ้ (Allergies or Asthmatic)
      </label>
      <label>
        <input type="checkbox" value="โรคหัวใจ" />
        โรคหัวใจ (Heart disease)
      </label>
      <label>
        <input type="checkbox" value="กระดูกหัก" />
        กระดูกหัก (Fracture)
      </label>
      <label>
        <input type="checkbox" value="เส้นเลือดสมองตีบ/แตก" />
        เส้นเลือดสมองตีบ/แตก (Stroke)
      </label>
      <label>
        <input type="checkbox" value="ตั้งครรภ์" />
        ตั้งครรภ์ (Pragnanct)
      </label>
      <label>
        <input
          type="checkbox"
          value="โลหะ, อุปกรณ์ช่วยฟัง, เครื่องกระตุ้นหัวใจในร่างกาย"
        />
        โลหะ, อุปกรณ์ช่วยฟัง, เครื่องกระตุ้นหัวใจในร่างกาย<br />
        (Prothesis implant, Hearing aids, Pacemaker)
      </label>
      <label>
        <input type="checkbox" value="อื่นๆ" />
        อื่นๆ (Others)
      </label>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <label for="name" class="text-white"
        >ข้อมูลสุขภาพอื่นๆ โปรดระบุ (Others please specify)</label
      >
      <input
        type="text"
        id="medicalSpecific"
        placeholder="ประวัติการได้รับการรักษาทางการแพทย์ เช่นการผ่าตัด หรือได้รับการรักษาโรคร้ายแรงอื่นๆ (Surgical procedure, Drug Allergy, Currently used medicine, etc.)"
      />
      <label for="name" class="text-white"
        >ข้อมูลสุขภาพอื่นๆ โปรดระบุ (Others please specify)</label
      >
      <input
        type="text"
        id="medicalSpecific"
        placeholder="ประวัติแพ้ยา ยาที่ใช้ในปัจจุบัน ฯลฯ (Surgical procedure, Drug Allergy, Currently used medicine, etc.)"
        class="placeholder-adj"
      />
    </div>

    <div
      id="medicalRights"
      class="flex flex-col gap-2 border-2 p-2 rounded text-white"
    >
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="ข้าราชการ มศว"
        />
        ข้าราชการ มศว (Government SWU)
      </label>
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="พนักงาน/บุคลากร มศว"
        />
        พนักงาน/บุคลากร มศว (Personnel SWU)
      </label>
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="นักกีฬา มศว"
        />
        นักกีฬา มศว (Athlete SWU)
      </label>
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="นิสิต มศว"
        />
        นิสิต มศว (University student SWU)
      </label>
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="นักเรียนสาธิต มศว"
        />
        นักเรียนสาธิต มศว (Student SWU Prasarnmit Demonstration School)
      </label>
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="ข้าราชการหน่วยงานอื่นๆ"
        />
        ข้าราชการหน่วยงานอื่นๆ (Government Or State Enterprise Officer)
      </label>
      <label>
        <input
          type="radio"
          v-model="formData.medicalRights"
          value="บุคคลทั่วไป"
        />
        บุคคลทั่วไป (General public)
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const currStep = ref(1);
// const urlParams = new URLSearchParams(window.location.search);
// const token = urlParams.get("token");

const formData = ref({
  medicalHistory: "",
  medicalRights: "",
});

const firstStepValid = computed(() => {
  // Missing valid logic
  return true;
});

const secondStepValid = computed(() => {
  // Missing valid logic
  return true;
});

// if (!token) {
//   // Handle missing token
//   console.log("Missing token");
// }

const validateToken = async () => {
  // try {
  //   const response = await fetch(
  //     `https://localhost:8000/api/validateToken?token=${token}`
  //   );
  //   if (!response.ok) {
  //   } else {
  //   }
  // } catch (error) {}
};
</script>

<style>
.first-container {
  display: grid;
  grid-template-columns: [l-e] auto [l-s] 1fr [r-s] auto [r-e];
  gap: 10px;
}

.first-container label {
  grid-column: l-e / l-s;
}

.medicalBox {
  grid-column: l-e / l-s;
  flex-wrap: wrap;
  max-width: 500px;
  height: auto;
}

.medicalBox label:nth-child(n) {
  padding: 2px;
  padding-inline: 4px;
  border: 2px solid rgb(107 114 128);
  border-radius: 0.25rem;
}

input,
select {
  text-indent: 5px;
  border-radius: 6px;
  border: 1px solid #fff;
  color: #fff;
  background-color: #333;
}

input.placeholder-adj::placeholder {
  font-size: smaller;
  font-weight: normal;
  letter-spacing: 0.05em;
}
</style>
