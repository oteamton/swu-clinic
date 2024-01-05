<template>
  <div
    class="user-panel"
    :class="{ collapsed: isCollapsed }"
    @click="toggleCollapse"
    @mousedown="onMouseDown"
    ref="panel"
  >
    <div v-show="!isCollapsed" class="user-content">
      <div class="user-info bg-pink-500">
        <!-- <img src="https://via.placeholder.com/150" alt="User Avatar" class="avatar" /> -->
        <h2>{{ user.name }} {{ user.surname }}</h2>
        <p>{{ user.email }}</p>
        <p>Born on {{ formattedDate }}</p>
        <p>Phone: {{ user.phone }}</p>
      </div>

      <div class="user-actions">
        <button @click.stop="logout">Logout</button>
        <!-- Further user actions or features can be added here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = ref({
  name: "John",
  surname: "Doe",
  email: "john@example.com",
  date_of_birth: "1990-01-01",
  phone: "123-456-7890",
});
const isCollapsed = ref(false);
const panel = ref<HTMLElement | null>(null);

const formattedDate = computed(() => {
  return new Date(user.value.date_of_birth).toLocaleDateString();
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const logout = (event: Event) => {
  event.stopPropagation();
  alert("Logged out");
};

// Draggable functionality
let startX = 0,
  startY = 0;
let isDragging = false;

const onMouseDown = (event: MouseEvent) => {
  isDragging = true;
  startX = event.clientX - (panel.value?.offsetLeft || 0);
  startY = event.clientY - (panel.value?.offsetTop || 0);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging || !panel.value) return;

  let newX = event.clientX - startX;
  let newY = event.clientY - startY;

  // Check for the edges of the screen
  newX = Math.min(
    window.innerWidth - panel.value.offsetWidth,
    Math.max(0, newX)
  );
  newY = Math.min(
    window.innerHeight - panel.value.offsetHeight,
    Math.max(0, newY)
  );

  panel.value.style.left = `${newX}px`;
  panel.value.style.top = `${newY}px`;
};

const onMouseUp = () => {
  isDragging = false;
};

onMounted(() => {
  if (panel.value) {
    panel.value.addEventListener("mousedown", onMouseDown);
  }
});

onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
});
</script>

<style scoped>
.user-panel {
  width: 150px;
  height: 250px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.user-panel.collapsed {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  padding: 0;
}

.drag-handle {
  width: 100%;
  height: 20px;
  background-color: #ccc;
  cursor: move;
}

.user-info,
.user-actions {
  text-align: center;
  transition: opacity 0.3s ease;
}

.collapse .user-info,
.collapse .user-actions {
  opacity: 0;
  visibility: hidden;
}

.user-actions {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
