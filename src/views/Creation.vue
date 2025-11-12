<script setup>
    import Navbar from '@/components/NavbarApp.vue'
    import Footer from '@/components/Footer.vue'
    import LeftPanel from '@/components/CreationLeftPanel.vue'
    import Rightpanel from '@/components/CreationRightPanel.vue'
    
</script>

<template>
  <div class="app-container">
    <Navbar />

    <div class="content">
      <LeftPanel class="left-panel" />
      
      <!-- Rightpanel vient ici -->
      <Rightpanel class ="right-panel"></Rightpanel>
    </div>

    <Footer class="footer" />
  </div>
</template>


<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F7F6F6;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 90%;
  margin-top: 40px;
  gap: 40px;
}

.left-panel {
  width: 55%;
}

.right-panel {
  width: 45%;
  min-height: 819px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  width: 100%;
}
</style>