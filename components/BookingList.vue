<template>
  <div class="list-container text-white">
    <h2 class="text-center">Select a Person for the Appointment</h2>
    <ul class="flex gap-1.5 flex-wrap justify-center">
      <li
        v-for="person in providerData"
        class="mt-4 flex flex-col justify-center items-center border-2 rounded-md"
        :key="person.id"
        :class="{ selected: selectedPerson.current?.id === person.id }"
      >
        <img :src="person.image" class="mt-2 mx-2 rounded-md" />
        <p class="mt-2">ชื่อ {{ person.name }}</p>
        <p>{{ person.details }}</p>
        <button
          @click="selectPerson(person)"
          class="bg-blue-500 rounded-md active:scale-90 my-2 pb-0.5"
        >
          Select
        </button>
      </li>
    </ul>
    <div class="conf-container w-full flex justify-center">
      <button class="border-2 border-color-white rounded-md mt-4 px-2 py-1">
        Confirm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PersonType {
  id: number;
  image: string;
  name: string;
  details: string;
}

interface ProviderResponse {
  providers: PersonType[];
}

const providerData = ref<PersonType[]>([]);
const currentDate = ref(new Date());
const emit = defineEmits(["person-selected"]);

const loading = ref(false);

let selectedPerson = ref<{ current: PersonType | null }>({ current: null });

const selectPerson = (person: PersonType) => {
  selectedPerson.value.current = person;
  emit("person-selected", person);
};

watch(selectedPerson, (newVal) => {
  if (newVal.current) {
    console.log(`Selected person: ${newVal.current.name}`);
  }
});

const getProviderData = async () => {
  loading.value = true;
  try {
    const response = await fetch("http://localhost:8080/api/v1/providers", {
      method: "GET",
    });

    if (response.ok) {
      const responseData: ProviderResponse = await response.json();
      providerData.value = responseData.providers;
    }
  } catch (error) {}
};

getProviderData();
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

.conf-btn {
  place-self: center;
}
</style>
