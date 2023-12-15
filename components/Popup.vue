<template>
  <div class="popup" v-if="visible">
    <div class="popup-content">
      <slot></slot
      ><!-- insert content inside ths -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: Boolean,
});
</script>

<style>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  place-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 0.25);
  border-radius: 10px;
  max-height: 80%;
  overflow-y: auto;
  widows: 90%;
  max-width: 500px;
}
</style>
