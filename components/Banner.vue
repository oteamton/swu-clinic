<template>
    <div class="banner flex flex-col justify-center items-center mb-2">
        <img :src="logoUrl"  class="logo w-80 mb-4"  alt="">
        <h1 class="text-3xl text-gray-500 text-center p-2 border-pink-700 border-2 w-80">SWU CLINIC</h1>
    </div>
</template>

<script setup>
import logoUrl from '~/assets/logo.svg'
</script>

<style>
.banner{
    letter-spacing: 0.5cap;
}
</style>