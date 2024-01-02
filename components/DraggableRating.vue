<template>
  <div>
    <h2>Rate Your Pain</h2>
    <div
      class="rating-container"
      ref="ratingContainer"
      @mousedown="startDrag"
      @mousemove="dragging && updateRating"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <div
        class="slider"
        :style="{ left: `${rating * 10}%` }"
        @mousedown.prevent
      ></div>
    </div>
    <div>
      <input type="text" v-model="rating" @input="handleInputChange" />
    </div>
    <p>Your pain level: {{ rating }}/10</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const dragging = ref(false);
const ratingContainer = ref<HTMLElement | null>(null);
const rating = ref<number>(0);

onMounted(() => {
  console.log(ratingContainer.value);
});

const startDrag = () => {
  dragging.value = true;
};

const updateRating = (event: MouseEvent) => {
  if (dragging.value && ratingContainer?.value) {
    const container = ratingContainer.value.getBoundingClientRect();
    const offsetX = event.clientX - container.left;
    const percentage = (offsetX / container.width) * 100;
    rating.value = Math.min(Math.max(Math.round(percentage / 10), 0), 10);
  }
};

const stopDrag = () => {
  dragging.value = false;
};

const handleInputChange = () => {
  setSliderPosition();
  // Ensure the input value is within the valid range
  rating.value = Math.min(Math.max(rating.value, 0), 10);
};

function setSliderPosition(): void {
  if (!dragging.value || !ratingContainer.value) return;
  const containerWidth = ratingContainer.value.clientWidth;
  const sliderLeftOffset = (rating.value * containerWidth) / 10 + "px";
  (document.querySelector(".slider") as HTMLElement).style.left =
    sliderLeftOffset;
}
</script>

<style scoped>
.rating-container {
  position: relative;
  width: 200px;
  height: 20px;
  background-color: #eee;
  cursor: pointer;
  overflow: hidden;
}

.slider {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  transition: left 0.2s ease-out;
  cursor: grab;
}

p {
  margin-top: 10px;
}
</style>
