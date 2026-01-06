<script setup lang="ts">
import NavbarApp from '@/components/NavbarApp.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <main>
    <NavbarApp />

    <div>
      <RouterView/>
    </div>

    <Footer />
  </main>
</template>
