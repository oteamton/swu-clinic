<template>
  <div class="border-2 border-yellow-500 rounded-lg">
    <h2>Bookings</h2>
    <ul>
      <template v-for="booking in bookings" :key="booking.id">
        <li class="mt-3">
          {{ booking.title }}
          <br>
          {{ booking.category }}
          <br>
          <span class="date">{{ booking.date }}</span>
          <br>
          <span class="status">
            This is icon<span class="m-2 underline">{{ booking.statusIcon }}</span>Status <span class="underline">{{ booking.statusText }}</span>
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useBookings } from "~/composables/useBookings";

const { bookings } = useBookings();
</script>

<style></style>
