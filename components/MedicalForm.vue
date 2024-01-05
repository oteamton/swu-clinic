<!-- //_[token].vue -->
<template>
  <h2>Medical History</h2>
  <div class="breadcrumb flex gap-1">
    <a
      href="#"
      class="p-4 text-white text-center"
      @click="currStep = 1"
      :class="{
        'bg-gray-500': !firstStepValid,
        'bg-green-700': firstStepValid,
        'border-white border-2': currStep === 1,
      }"
      >ส่วนที่ 1
      <p :class="{ hidden: !(currStep === 1) }">
        ประวัติสุขภาพ (Medical History)
      </p>
    </a>
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
        'bg-gray-500': !thirdStepValid,
        'bg-green-700': thirdStepValid,
        'border-white border-2': currStep === 3,
      }"
      @click="firstStepValid ? (currStep = 3) : $event.preventDefault()"
      >ส่วนที่ 3</a
    >
  </div>

  <div v-if="currStep === 1" class="first-container mb-4">
    <hr class="custom-hr mt-6" />
    <h2 class="text-xl text-white mt-4 mb-2 text-center">
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
        class="placeholder-adj"
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

    <div class="text-center">
      <button
        :disabled="!firstStepValid"
        :class="{
          'bg-gray-500': !firstStepValid,
          'bg-blue-500 hover:bg-blue-700 active:bg-blue-800': firstStepValid,
        }"
        type="button"
        @click="nextStep"
        class="text-white font-bold py-2 px-4 rounded mt-4 max-w-fit"
      >
        หน้าถัดไป
      </button>
    </div>
  </div>
  <!-- Second step  -->
  <div v-if="currStep === 2" class="second-container">
    <hr class="custom-hr mt-6" />
    <h2 class="text-xl mb-1 mt-4 text-white text-center">
      สิทธิการรักษา (Medical Rights)
    </h2>
    <div
      id="medicalRights"
      class="rightsBox flex flex-col gap-2 border-2 p-2 rounded m-auto text-white"
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

    <div>
      <label class="text-white flex gap-4 mt-4 justify-center"
        ><input
          type="checkbox"
          class="h-6 w-6 self-center"
        />ท่านต้องการใบรับรองทางกายภาพบำบัด หรือไม่
        <br />
        Do you need Physical Therapy Certificate?
      </label>
    </div>
    <div class="text-center">
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
  </div>

  <!-- Third step  -->
  <div v-if="currStep === 3" class="third-container">
    <hr class="custom-hr mt-6" />
    <h2 class="text-xl mb-1 mt-4 text-white text-center">
      อาการสำคัญ อาการเจ็บป่วย (Chief Complaint)
    </h2>
    <div class="flex flex-col justify-center text-white">
      <label class="text-white mb-2">
        อธิบายอาการที่มีความสำคัญมากที่สุด (Main Symptom)</label
      >
      <textarea class="text-black rounded"></textarea>
      <div class="flex flex-col justify-center gap-1 text-white my-4">
        <label>
          มีอาการดังกล่าวมาแล้วนานเท่าใด (How long does the symptoms occur?)
        </label>
        <label>
          <input type="radio" v-model="formData.symptomsOccur" value="1-3" />
          ประมาณ 1-3 วัน (1-3 day)
        </label>
        <label>
          <input type="radio" v-model="formData.symptomsOccur" value=">7" />
          มากกว่า 1 สัปดาห์ (>1 week)
        </label>
        <label>
          <input type="radio" v-model="formData.symptomsOccur" value=">30" />
          มากกว่า 1 เดือน(>1 month)
        </label>
        <label>
          <input type="radio" v-model="formData.symptomsOccur" value=">90" />
          มากกว่า 3 เดือน (> 3 months)
        </label>
        <label>
          <input type="radio" v-model="formData.medicalRights" value=">180" />
          มากกว่า 6 เดือน (> 6 months)
        </label>
        <label>
          <input type="radio" v-model="formData.medicalRights" value=">365" />
          มากกว่า 1 ปี (>1 year)
        </label>
      </div>
      <PainRating/>
    </div>
    <div class="text-center">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PainRating from "./PainRating.vue";

const currStep = ref(1);
const collapsed = ref(true);

const formData = ref({
  medicalHistory: "",
  medicalRights: "",
  symptomsOccur: "",
});

const firstStepValid = computed(() => {
  // Missing valid logic
  return true;
});

const secondStepValid = computed(() => {
  // Missing valid logic
  return true;
});

const thirdStepValid = computed(() => {
  // Implement lodic
  return true;
});

const nextStep = () => {
  if (firstStepValid.value) {
    currStep.value++;
  }
};

function toggleCollapsed() {
  collapsed.value = !collapsed.value;
}

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
.breadcrumb a:nth-child(1) {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.breadcrumb a:nth-child(3) {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.medicalBox {
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

.custom-hr {
  height: 2px;
  background-color: hsla(0 0% 95% 0.8);
  filter: drop-shadow(0 0 2px white);
  /* background-image: linear-gradient(to right, rgba(21 128 61 0), rgba( 0 0 0.2), rgba(0 0 0 0));
  background-position: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 1px; */
  /* margin: 2rem 0; Center horizoltally */
}

.rightsBox {
  flex-wrap: wrap;
  height: auto;
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

/* Mobile styles */
@media screen and (max-width: 768px) {
  .custom-hr {
    margin: 1rem 0;
  }
}
</style>
