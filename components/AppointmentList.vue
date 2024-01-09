<template>
  <h1 class="text-white text-center">วันที่ {{ formattedCurrDate }}</h1>
  <h1 class="text-white text-center">เวลา {{ formattedCurrTime }}</h1>

  <div class="tale-container flex justify-center">
    <table class="border-white border-2 place-content-center">
      <tr v-for="person in persons" :key="person.id" class="text-white">
        <td><img :src="person.image" /></td>
        <td>{{ person.name }}</td>
        <td>{{ person.details }}</td>
        <td><button @click="selectPerson">จอง</button></td>
      </tr>
    </table>
    <Popup :visible="isPopupVisible" @update:visible="isPopupVisible = $event">
      <BookingForm
        v-if="selectedPerson"
        :person="selectedPerson"
        @close="closeBookingForm"
        @submit="handleBookingSubmit"
      />
    </Popup>
  </div>
</template>

<script setup lang="ts">
const currentDate = ref(new Date());
const selectedPerson = ref({} as any);
const formattedCurrDate = computed(() =>
  currentDate.value.toLocaleDateString()
);
const formattedCurrTime = computed(() =>
  currentDate.value.toLocaleTimeString()
);
const isPopupVisible = ref(false);

const closeBookingForm = () => {
  isPopupVisible.value = false;
  selectedPerson.value = null;
};

const selectPerson = (person: any) => {
  selectedPerson.value = person;
  isPopupVisible.value = true;
};

const persons = ref([
  // Sample data
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    name: "Ton",
    details: "Expert in prompt",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    name: "Kitch",
    details: "Expert in prompt",
  },
]);

const handleBookingSubmit = (bookingDetails: any) => {
  console.log(bookingDetails);
  closeBookingForm();
};

setInterval(() => {
  currentDate.value = new Date();
}, 1000);
</script>
