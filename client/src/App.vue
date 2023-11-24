<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterView from './views/FooterView.vue';
</script>

<template>
  <NavBar/>
  <RouterView />
  <FooterView />
</template>
