<template>
  <div class="list-container text-white">
    <h2 class="text-center text-xl">เลือกผู้ให้การรักษา</h2>
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
      Loading. . .
    </div>
    <ul class="flex gap-1.5 flex-wrap justify-center">
      <li
        v-for="person in providerData"
        class="mt-4 flex flex-col justify-center items-center border-2 px-2 rounded-md"
        :key="person.id"
        :class="{ selected: selectedPerson.current?.id === person.id }"
      >
        <!-- <img :src="person.image" class="mt-2 mx-2 rounded-md" /> -->
        <p class="mt-2">ชื่อ {{ person.name }}</p>
        <p>รายละเอียด {{ person.details }}</p>
        <button
          @click="selectPerson(person)"
          class="bg-blue-500 rounded-md active:scale-90 my-2 pb-0.5"
        >
          เลือก
        </button>
      </li>
    </ul>
    <div class="confirm-container w-full flex justify-center gap-2">
      <button
        @click="showPopup = true"
        class="bg-blue-500 active:scale-90 rounded-md mt-4 px-2 py-1"
      >
        ยืนยัน
      </button>
      <Popup :visible="showPopup" @update:visible="showPopup = $event">
        <Calendar
          @dateSelected="
            (date, time) => {
              selectedDateTime.date = date;
              selectedDateTime.time = time;
            }
          "
          @closePopup="(showPopup = false), handleBooking()"
        />
      </Popup>
      <button
        @click="logout"
        class="bg-red-500 active:scale-90 rounded-md mt-4 px-2 py-1"
      >
        ยกเลิก
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calendar from "./Calendar.vue";

interface PersonType {
  id: number;
  // image: string;
  name: string;
  details: string;
}
const userData = ref();
const props = defineProps({
  token: String,
});
const showPopup = ref(false);
const isLoading = ref(false);
let providerData = ref<PersonType[]>([]);
// const currentDate = ref(new Date());
const emit = defineEmits(["person-selected"]);

let selectedPerson = ref<{ current: PersonType | null }>({ current: null });
let selectedDateTime = ref({
  date: null,
  time: null,
});
const selectPerson = (person: PersonType) => {
  selectedPerson.value.current = person;
  emit("person-selected", person);
};

const logout = () => {
  localStorage.removeItem("token");
  useRouter().push("/login");
};

watch(selectedPerson, (newVal) => {
  if (newVal.current) {
    // console.log(`Selected person: ${newVal.current.name}`);
  }
});

const getProviderData = async () => {
  isLoading.value = true;
  try {
    const data = await fetch(
      "http://localhost:8080/api/v1/services/providers",
      {
        method: "GET",
      }
    );

    providerData.value = await data.json();
  } catch (error) {
    console.error("Error fetching provider data:", error);
  } finally {
    isLoading.value = false;
  }
};

const getUserData = async () => {
  if (!props.token) return;
  try {
    const data = await fetch(
      "http://localhost:8080/api/v1/users/get-user-data",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    userData.value = data;
  } catch (error) {}
};

const handleBooking = async () => {
  const formatDateSql = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const sqlFormattedDate = selectedDateTime.value.date
    ? formatDateSql(selectedDateTime.value.date)
    : null;
  const sqlFormattedTime = `${selectedDateTime.value.time}:00`;
  console.log(
    selectedPerson.value.current?.id,
    "Date format: ",
    sqlFormattedDate,
    "Time format: ",
    sqlFormattedTime
  );

  if (
    selectedPerson.value.current &&
    selectedDateTime.value.date &&
    selectedDateTime.value.time
  ) {
    try {
      let mockCustomerId = 1;
      let mockStatus = "1";
      const response = await fetch(
        "http://localhost:8080/api/v1/services/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: mockCustomerId,
            selectedPersonId: selectedPerson.value.current.id,
            date: sqlFormattedDate,
            time: selectedDateTime.value.time,
            statusService: mockStatus,
          }),
        }
      );

      if (response.ok) {
        alert("Booking successful");
      }
    } catch (error) {
      console.log("Error submitting booking: ", error);
    }
  } else {
    alert("Please select a person, date, and time.");
  }
};

onMounted(() => {
  getUserData();
  getProviderData();
});
</script>

<style scoped>
.list-container {
  place-self: center;
  width: fit-content;
}

li img:nth-child(n) {
  max-width: 150px;
  max-height: 150px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

ul li button {
  min-width: 80px;
  min-height: 23px;
  transition: all 0.2s;
}

.selected {
  border-color: rgb(252, 123, 145);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background-color: pink;
}

.confirm-container button:nth-child(n) {
  min-width: 60px;
}

.conf-btn {
  place-self: center;
}
</style>
