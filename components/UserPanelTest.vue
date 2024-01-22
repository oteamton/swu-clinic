<template>
  <div
    ref="panel"
    class="chat-head"
    @mousedown="startDrag"
    @touchstart="startDrag"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >

  <div v-show="!isCollapsed" class="user-content">
    <!-- Your chat head content here -->
    <!-- <img src="https://via.placeholder.com/50" alt="Chat Head" /> -->
</div>
  </div>
</template>

<script setup lang="ts">
const panel = ref<HTMLElement | null>(null);
const position = reactive({ x: 100, y: 100 });
const isCollapsed = ref(false);
let isDragging = false;
let startX = 0,
  startY = 0,
  initialX = 0,
  initialY = 0;

function updatePosition(newX: number, newY: number) {
  if (!panel.value) return;
  const panelReact = panel.value.getBoundingClientRect();
  const maxX = window.innerWidth - panelReact.width;
  const maxY = window.innerHeight - panelReact.height;
  position.x = Math.min(Math.max(newX, 0), maxX);
  position.y = Math.min(Math.max(newY, 0), maxY);
}

onMounted(() => {
  document.addEventListener("mousemove", handleDrag as EventListener);
  document.addEventListener("mouseup", endDrag as EventListener);
  document.addEventListener("touchmove", handleDrag as EventListener, {
    passive: false,
  });
  document.addEventListener("touchend", endDrag as EventListener);
  window.addEventListener("resize", handleResize as EventListener);
  updatePosition(position.x, position.y);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize as EventListener);
});

function startDrag(event: MouseEvent | TouchEvent) {
  isDragging = true;
  startX = "clientX" in event ? event.clientX : event.touches[0].clientX;
  startY = "clientY" in event ? event.clientY : event.touches[0].clientY;
  initialX = panel.value ? panel.value.offsetLeft : 0;
  initialY = panel.value ? panel.value.offsetTop : 0;
}

function handleDrag(event: MouseEvent | TouchEvent) {
  if (!isDragging) return;
  event.preventDefault();
  const currentX =
    "clientX" in event ? event.clientX : event.touches[0].clientX;
  const currentY =
    "clientY" in event ? event.clientY : event.touches[0].clientY;
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;
  updatePosition(initialX + deltaX, initialY + deltaY);
}

function endDrag() {
  isDragging = false;
}

function handleResize() {
  updatePosition(position.x, position.y);
}
</script>

<style>
.chat-head {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  user-select: none;
}
</style>
