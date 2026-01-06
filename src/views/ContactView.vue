<script setup lang="ts">
import NavbarHome from '@/components/NavbarHome.vue'
import Footer from '@/components/Footer.vue'
import { ref } from "vue"

const first_name = ref("")
const last_name = ref("")
const email = ref("")
const phone = ref("")
const message = ref("")
const errorMessage = ref("")
const mailtoLink = ref("#")

const sendMail = () => {
  errorMessage.value = ""

  if (!first_name.value || !last_name.value || !email.value || !message.value) {
    errorMessage.value = "Please fill in all required fields (*)."
    mailtoLink.value = "#"
    return
  }

  const subject = encodeURIComponent(`Message from ${first_name.value} ${last_name.value}`)
  const body = encodeURIComponent(
    `Name: ${first_name.value} ${last_name.value}\nEmail: ${email.value}\nPhone: ${phone.value}\n\nMessage:\n${message.value}`
  )

  mailtoLink.value = `mailto:contact@linkedin2cv.com?subject=${subject}&body=${body}`

  window.location.href = mailtoLink.value
}
</script>

<template>
<!--  <NavbarHome />-->
  <div class="contact-page">
<!--    <a href="/" class="back-link">← Homepage</a>-->

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
            <label>First name*</label>
            <input v-model="first_name" class="input-field" type="text" placeholder="e.g. Noélis" />
          </div>
          <div class="field">
            <label>Last name*</label>
            <input v-model="last_name" class="input-field" type="text" placeholder="e.g. Mané" />
          </div>
          <div class="field">
            <label>Email*</label>
            <input v-model="email" class="input-field" type="email" placeholder="e.g. noelis.mane@linkedin2cv.com" />
          </div>
          <div class="field">
            <label>Phone</label>
            <input v-model="phone" class="input-field" type="text" placeholder="e.g. +33 6 02 19 02 49" />
          </div>
        </div>

        <div class="field message">
          <label>Message*</label>
          <textarea v-model="message" class="input-field" rows="4" placeholder="Write your message here"></textarea>
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <div class="actions">
          <a :href="mailtoLink" class="btn-principale" @click="sendMail">Send message</a>
        </div>

      </form>
    </section>
<!--    <Footer />-->
  </div>
</template>

<style scoped>

.contact-page {
  min-height: 100vh;
  background : #F9F9F9;
  overflow: hidden;
  padding-top: 5rem;
  padding-bottom: 5rem;
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

.actions { 
    display: flex; 
    justify-content: flex-end; 
    margin-top: 28px; 
}

.error {
  color: red;
  font-size: 14px;
  margin: 20px 0 -10px;
  text-align: right;
}

/*  base : éviter les débordements sur petits écrans */
.contact-page {
  padding-left: 16px;
  padding-right: 16px;
}

/* Desktop -> tu gardes ton 70%, mais on sécurise avec un max-width */
.contact-card {
  max-width: 1100px;
}

/* =========================
   TABLETTE (<= 992px)
========================= */
@media (max-width: 992px) {
  .contact-page {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .contact-card {
    width: 100%;
    grid-template-columns: 280px 1fr; /* un peu plus compact */
    gap: 24px;
    padding: 10px;
  }

  .form-panel {
    margin: 16px 16px 16px 0;
  }

  .intro h1 {
    font-size: 26px;
  }
}

/* =========================
   MOBILE (<= 768px)
========================= */
@media (max-width: 768px) {
  .intro {
    margin: 10px 0 24px;
  }

  .intro h1 {
    font-size: 24px;
  }

  .contact-card {
    width: 100%;
    grid-template-columns: 1fr; /*  une seule colonne */
    gap: 16px;
    padding: 10px;
    border-radius: 16px;
  }

  .info-panel {
    border-radius: 14px;
    padding: 18px;
    min-height: 220px;
  }

  .info-panel .subtitle {
    margin: 0 0 18px;
  }

  .social {
    margin-top: 18px;
    justify-content: center;
  }

  .form-panel {
    margin: 0;
    padding: 6px 6px 14px;
  }

  .form-grid.two-cols {
    grid-template-columns: 1fr; /*  champs en colonne */
    gap: 14px;
  }

  .actions {
    justify-content: stretch;
  }

  .actions .btn-principale {
    width: 100%;
    text-align: center;
    padding: 14px 16px;
  }

  .error {
    text-align: left;
    margin: 14px 0 0;
  }
}

/* =========================
   PETITS MOBILES (<= 420px)
========================= */
@media (max-width: 420px) {
  .info-row {
    font-size: 13px;
    gap: 8px;
  }

  .social {
    gap: 14px;
    font-size: 18px;
  }

  .info-panel h3 {
    font-size: 18px;
  }
}

</style>