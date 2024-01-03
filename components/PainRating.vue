<template>
  <div>
    <h2>
      ระดับคะแนนความรู้สึกเจ็บปวด เมื่อ 0 คือไม่มีอาการปวดเลย และ 10
      มีอาการปวดมากที่สุด (Pain Score)
    </h2>
    <label
      >Pain Score : when level 0 was no pain and level 10 very Painful</label
    >
    <div>
      <input type="range" id="rating" v-model="rating" min="0" max="10" />
    </div>
    <p>
      คะแนนความรู้สึกเจ็บปวด(Pain Score): {{ rating }}/10
      <span>{{ getFeelingsText }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const rating = ref(0);
const getFeelingsText = computed(() => {
  if (rating.value === 0) {
    return "ไม่อาการปวด(No pain)";
  } else if (rating.value > 0 && rating.value <= 3) {
    return "มีอาการปวดเล็กน้อย(Slightly pain)";
  } else if (rating.value > 3 && rating.value <= 5) {
    return "มีอาการปวดปานกลาง(Moderately pain)";
  } else if (rating.value > 5 && rating.value <= 7) {
    return "มีอาการปวดมาก(Severe pain)";
  } else if (rating.value > 7 && rating.value <= 10) {
    return "มีอาการปวดมากที่สุด(Very severe pain)";
  }
});
</script>

<style scoped></style>
