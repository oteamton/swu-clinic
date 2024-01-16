<template>
  <div
    class="user-panel"
    :class="{ collapsed: isCollapsed }"
    @click="toggleCollapse"
    @mousedown="onMouseDown"
    ref="panel"
  >
    <div v-if="isLoading" class="loading-spinner">Loading. . .</div>
    <div v-show="!isCollapsed" class="user-content">
      <div class="user-info flex flex-col gap-0.5 bg-pink-500 rounded-md">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          class="avatar"
        />
        <h2>{{ userData?.name }} {{ userData?.surname }}</h2>
        <!-- <p>{{ userData?.email }}</p> -->
        <p><span>Born on </span>{{ formattedDate }}</p>
        <p><span>Phone: </span>{{ userData?.phone }}</p>
      </div>
      <div class="user-actions">
        <button @click.stop="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const userData = ref();
const message = ref("");
const isCollapsed = ref(false);
const panel = ref<HTMLElement | null>(null);
const panelPosition = ref({ x: 0, y: 0 });
let clickStartTime = 0;
const checkThreshold = 200;

// Draggable functionality
let startX = 0,
  startY = 0,
  deltaX = 0,
  deltaY = 0;
let isDragging = false;

const props = defineProps({
  token: String,
});
const formattedDate = computed(() => {
  return userData.value?.date_of_birth
    ? new Date(userData.value.date_of_birth).toLocaleDateString()
    : "";
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const logout = (event: Event) => {
  event.stopPropagation();
  alert("Logged out");
};



const onMouseDown = (event: MouseEvent) => {
  isDragging = true;
  clickStartTime = event.timeStamp;
  startX = event.clientX;
  startY = event.clientY;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging) return;

  deltaX = event.clientX - startX;
  deltaY = event.clientY - startY;

  panelPosition.value.x += deltaX;
  panelPosition.value.y += deltaY;

  if (panel.value) {
    panel.value.style.transform = `translate(${panelPosition.value.x}px, ${panelPosition.value.y}px)`;
  }

  startX = event.clientX;
  startY = event.clientY;
};

const onMouseUp = (event: MouseEvent) => {
  isDragging = false;
  const clickDuration = event.timeStamp - clickStartTime;

  // Trigger collapse only if it's a click
  if (clickDuration < checkThreshold) {
    toggleCollapse();
  }
};

onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
});

// Get user data
const getUserData = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/users/get-user-data",
      {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${props.token}`,
        // },
      }
    );

    if (response.ok) {
      userData.value = await response.json();
      message.value = "User date fetched successfully.";
    } else {
      message.value = "Failed to fetch User date.";
    }
  } catch (error) {
    // console.error('Error fetching medical data:', error);
    message.value = "An error occurred while fetching medical data.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getUserData();
});
</script>

<style scoped>
.user-panel {
  width: 160px;
  height: 250px;
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 10px;
  transition: all 0.3s ease;
  will-change: transform;
}

.user-panel.collapsed {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: pink;
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
  text-align: start;
  transition: opacity 0.3s ease;
}

.user-info {
  padding: 10px;
  line-height: 1.2rem;
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
