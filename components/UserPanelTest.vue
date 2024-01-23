<template>
  <div
    ref="panel"
    class="chat-head"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @dblclick="expand"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >
    <div class="user-content">
      <!-- Your chat head content here -->
      <img src="https://via.placeholder.com/50" alt="Chat Head" />
    </div>
  </div>
  <div v-show="isExpanded" class="expanded-content">
    <div class="user-info flex flex-col gap-0.5 bg-pink-500 rounded-md">
      <img
        src="https://via.placeholder.com/150"
        alt="User Avatar"
        class="avatar"
      />
      <h2>{{ userData?.name }} {{ userData?.surname }}</h2>
      <p><span>Born on </span>{{ formattedDate }}</p>
      <p><span>Phone: </span>{{ userData?.phone }}</p>
    </div>
    <div class="user-actions">
      <!-- <button @click.stop="logout">Logout</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const userData = ref();
const panel = ref<HTMLElement | null>(null);
const position = reactive({ x: 100, y: 100 });
const isExpanded = ref(false);
let isDragging = false;
let startX = 0,
  startY = 0,
  initialX = 0,
  initialY = 0;

const formattedDate = computed(() => {
  return userData.value?.date_of_birth
    ? new Date(userData.value.date_of_birth).toLocaleDateString()
    : "";
});

function expand() {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) {
    position.x = (window.innerWidth - (window.innerWidth & 0.8)) / 2;
    position.y = (window.innerHeight - (window.innerHeight & 0.8)) / 2;
  } else {
  }
}

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
  window.addEventListener("click", onClickOutside as EventListener);
  updatePosition(position.x, position.y);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize as EventListener);
  window.removeEventListener("click", onClickOutside);
});

function onClickOutside(event: MouseEvent | TouchEvent) {
  nextTick(() => {
    if (!panel.value || !isExpanded.value) return;
    const { target } = event;
    if (!panel.value.contains(target as Node)) {
      isExpanded.value = false;
    }
  });
};

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

.expanded-content {
  position: fixed;
  width: 80vw;
  height: 80vh;
  left: 10vw;
  top: 10vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
</style>
