<template>
  <div class="calendar">
    <div class="month-control text-slate-900">
      <button @click="prevMonth">Prev</button>
      <span>{{ currMonthName }} {{ currYear }}</span>
      <button @click="nextMonth">Next</button>
    </div>

    <div class="calendar-grid">
      <div
        class="calendar-day-header text-slate-600"
        v-for="day in weekDays"
        :key="day"
      >
        {{ day }}
      </div>
      <div
        class="calendar-day text-slate-900"
        v-for="day in daysInMonth"
        :key="day.date"
        :class="{ today: isToday(day), selected: isSelected(day) }"
        @click="selectDate(day)"
        @keyup.enter="selectDate(day)"
        tabindex="0"
        :aria-label="'Select ' + day.date"
      >
        {{ day.date }}
      </div>
    </div>

    <div class="time-selection text-center mt-2.5 text-slate-900">
      <label for="time">Select Time: </label>
      <select
        class="indent-1 border-2 border-green-400 rounded-md"
        v-model="selectedTime"
      >
        <option v-for="time in timeOptions" :key="time" :value="time">
          {{ time }}
        </option>
      </select>
    </div>

    <button
      class="w-full bg-blue-500 mt-2.5 text-slate-900 text-xl rounded-md active:scale-95 active:text-white transition-transform"
      @click="submitDate"
    >
      Choose
    </button>
  </div>
</template>

<script setup lang="ts">
const today = new Date();
const selectedDate = ref(today);
const selectedTime = ref();
const currMonth = ref(today.getMonth());
const currYear = ref(today.getFullYear());
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const emit = defineEmits(["dateSelected", "closePopup"]);

const daysInMonth = computed(() => {
  const days = [];
  const firstDayOfMonth = new Date(currYear.value, currMonth.value, 1).getDay();
  const daysCount = new Date(currYear.value, currMonth.value + 1, 0).getDate();

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ date: "", isPadding: true });
  }

  for (let i = 1; i <= daysCount; i++) {
    days.push({
      date: i,
      fullDate: new Date(currYear.value, currMonth.value, i),
    });
  }

  return days;
});

const currMonthName = computed(() => {
  const date = new Date(currYear.value, currMonth.value);
  return date.toLocaleDateString("default", { month: "long" });
});

const prevMonth = () => {
  if (currMonth.value === 0) {
    currMonth.value = 11;
    currYear.value--;
  } else {
    currMonth.value--;
  }
};

const nextMonth = () => {
  if (currMonth.value === 11) {
    currMonth.value = 0;
    currYear.value++;
  } else {
    currMonth.value++;
  }
};

const isToday = (day: any) => {
  return day.fullDate?.toDateString() === today.toDateString();
};

const isSelected = (day: any) => {
  return day.fullDate?.toDateString() === selectedDate.value?.toDateString();
};

const selectDate = (day: any) => {
  if (day.isPadding) return;
  selectedDate.value = day.fullDate;
};

const genTimeOptions = () => {
  let times = [];
  for (let h = 8; h < 20; h++) {
    let hString = h.toString().padStart(2, "0");

    times.push(`${hString}:00`);
    times.push(`${hString}:30`);
  }
  return times;
};

const timeOptions = computed(genTimeOptions);

const submitDate = () => {
  if (selectedDate.value && selectedTime.value) {
    emit("dateSelected", selectedDate.value, selectedTime.value);
    emit("closePopup");
    // console.log(
    //   "Selected date:",
    //   selectedDate.value,
    //   "Selected time:",
    //   selectedTime.value
    // );
  } else {
    alert("Please select a date and time");
  }
};
</script>

<style scoped>
.calendar {
  padding: 10px;
}

.month-control {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.month-control button:nth-child(n) {
  border: none;
  background-color: tan;
  padding: 0 5px;
  position: relative;
}

.month-control button:nth-child(1)::before {
  content: "";
  position: absolute;
  left: -19px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 20px solid tan;
}

.month-control button:nth-child(3)::after {
  content: "";
  position: absolute;
  right: -19px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 20px solid tan;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day,
.calendar-day-header {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.calendar-day.today {
  background-color: #a5a5a5;
}

.calendar-day.selected {
  background-color: lightgreen;
}

.calendar-day:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}

@media screen and (max-width: 768px) {
  .calendar-grid {
    gap: 2px;
  }
}
</style>
