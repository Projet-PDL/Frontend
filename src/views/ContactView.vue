<script setup lang="ts">
import NavbarHome from '@/components/NavbarHome.vue'
</script>

<template>
  <NavbarHome />
  <div class="contact-page">

    <a href="/" class="back-link">← Homepage</a>

    <section class="intro">
      <h1>Contact us</h1>
      <p class="subtitle">Any question or remarks? Just write us a message!</p>
    </section>

    <section class="contact-card">
      <aside class="info-panel">
        <h3>Contact information</h3>
        <p class="subtitle">Fill up the form and our team will get back to you within 24 hours</p>

        <div class="info-row">
          <i class="bi bi-telephone"></i>
          <span>+33 7 56 89 24 31</span>
        </div>
        <div class="info-row">
          <i class="bi bi-envelope"></i>
          <span>contact@linkedin2cv.com</span>
        </div>

        <div class="social">
          <i class="bi bi-facebook"></i>
          <i class="bi bi-twitter"></i>
          <i class="bi bi-instagram"></i>
          <i class="bi bi-linkedin"></i>
        </div>
      </aside>

      <form class="form-panel">
        <div class="form-grid two-cols">
          <div class="field">
            <label for="first-name">First name*</label>
            <input id="first-name" type="text" placeholder="Your first name" />
          </div>
          <div class="field">
            <label for="last-name">Last name*</label>
            <input id="last-name" type="text" placeholder="Your last name" />
          </div>
          <div class="field">
            <label for="email">Email*</label>
            <input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div class="field">
            <label for="phone">Phone</label>
            <input id="phone" type="text" placeholder="+33 ..." />
          </div>
        </div>

        <div class="field message">
          <label for="message">Message*</label>
          <textarea id="message" rows="4" placeholder="Write your message here"></textarea>
        </div>

        <div class="actions">
          <button type="submit" class="btn-principale">Send message</button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>

.contact-page {
  min-height: 100vh;
  background : #F9F9F9;
  overflow: hidden;
}

.intro {
  text-align: center; 
  margin: 20px 0 40px; 
}

.intro h1 { 
  margin: 0 0 6px; 
  font-size: 28px; 
  font-weight: 700;   
}

.subtitle { 
    color:#707070;
}

.contact-card {
  width: 70%;
  margin: 30px auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.23);
  display: grid;
  grid-template-columns: 330px 1fr;
  gap: 40px;
  padding: 8px;
}

.info-panel {
  color: white;
  border-radius: 15px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-image: url('@/assets/images/contact_background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.info-panel h3 { 
  font-size: 20px; 
}

.info-panel .subtitle { 
  font-size: 14px;
  margin: 0 0 30px;
  color: white; 
}

.info-row { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  font-size: 14px; 
}

.social { 
  margin-top: auto;
  display: flex; 
  gap: 20px; 
  font-size: 20px; 
}

.social i { 
  cursor: pointer; 
}
.social i:hover {
  transform: scale(1.05);
}

.form-panel { 
    margin: 20px 20px 20px 0px; 
}

.form-grid.two-cols {
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px;
}

.field { 
  display: flex; 
  flex-direction: column; 
  gap: 6px; 
}

.field.message {
  margin-top: 20px;
}

label { 
    font-weight: 500; 
}

input, textarea {
  border: 2px solid #80808093; 
  border-radius: 10px;
  padding: 8px 10px;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #8E8E8E;
}

input:focus, textarea:focus {
  outline: none; 
  border-color: #0a66c2; 
  box-shadow: 0 0 0 2px rgba(10,102,194,.12);
  
}

.actions { 
    display: flex; 
    justify-content: flex-end; 
    margin-top: 28px; 
}

</style>