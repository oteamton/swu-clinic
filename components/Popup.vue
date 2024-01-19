<template>
  <div class="popup" v-if="visible" @click.self="closePopup">
    <div class="popup-content">
      <div class="closeModal-btn-container">
        <button class="close-btn active:scale-90" @click="closePopup">X</button>
      </div>

      <slot></slot
      ><!-- insert content inside ths -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(["update:visible"]);

const closePopup = () => {
  emit("update:visible", false);
};
</script>

<style>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 0.25);
  border-radius: 10px;
  max-height: 80svh;
  overflow-y: auto;
  widows: 90%;
  max-width: 500px;

}

.closeModal-btn-container {
  direction: rtl !important;
}

.close-btn {
  position: absolute;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: rgb(107 114 128);
  cursor: pointer;
  font-size: 1rem;
  color: white;
}
</style>
