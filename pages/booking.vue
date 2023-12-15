<template>
  <div class="booking-board text-white">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Bookings</h2>
        <div class="card-search">
          <input
            type="text"
            placeholder="Search"
            class="form-control"
            id="search-input"
          />
          <span class="fas fa-search form-control-feedback"></span>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <template v-for="booking in filteredBookings" :key="booking.id">
            <BookingCard :booking="booking" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BookingCard from "~/components/BookingCard.vue";
type Booking = {
  id: string;
  name: string;
  date: string;
};

// const bookings = ref<Booking[]>([]) as Ref<Booking[]>;
const bookings = ref<Booking[]>([
  // Sample data
  { id: "1", name: "John Doe", date: "2022-01-01" },
  { id: "2", name: "Jane Smith", date: "2022-01-02" },
]);

const searchQuery = ref<string>("");

const filteredBookings = computed(() => {
  if (!searchQuery.value) return bookings.value;

  return bookings.value.filter(
    (booking) =>
      booking.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      booking.date.includes(searchQuery.value)
  );
});
</script>

<style>
.booking-board {
  display: flex;
  flex-wrap: wrap;
}
</style>
