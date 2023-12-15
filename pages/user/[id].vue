<template>
  <div>
    <h1>{{ name }} Profile</h1>
    <nuxt-link :to="`/user/${id}/edit`">Edit</nuxt-link>
    <nuxt-link :to="`/user/${id}/posts`">Posts</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const { name, id } = route.params;
</script>
