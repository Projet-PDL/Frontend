<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from "vue"

const email = ref("") 
const showSuccess = ref(false)

const handleSubscribe = () => {
  if (!email.value) return
  showSuccess.value = true
  email.value = ""

  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>

<template>
  <div class="footer">
    <h2>Get access to exclusive updates</h2>

    <div class="newsletter-section">
        <input v-model="email" type="email" class="form-control input-url" placeholder="your@email.com"/>
        <button type="button" class="btn-principale" @click="handleSubscribe">subscribe to the newsletter</button>
    </div>

    <div class="information-section">
        <h1>LinkedIn2CV</h1>
        <p class="information-text">Transform your LinkedIn profile into a professional CV in minutes. Join 15,000+ professionals who trust us with their career success.</p>
        <ul class="footer-links">
            <li>
                <RouterLink to="/" class="link">Home</RouterLink>
            </li>

            <li>
                <RouterLink to="/about" class="link">About</RouterLink>
            </li>

            <li>
                <RouterLink to="/" class="link">How it works</RouterLink>
            </li>

            <li>
                <RouterLink to="/contact" class="link">Contact</RouterLink>
            </li>
        </ul>
        <div class="social">
          <i class="bi bi-facebook"></i>
          <i class="bi bi-twitter"></i>
          <i class="bi bi-instagram"></i>
          <i class="bi bi-linkedin"></i>
        </div>
        <div class="footer-line"></div>
        <div class="footer-bottom">
          <p>© 2023 LinkedIn2CV. All rights reserved.</p>
          <div class="left-part">
            <p>Terms and conditions</p>
            <p>Privacy policy</p>
          </div>
        </div>
    </div>
    <div v-if="showSuccess" class="success-toast">You have subscribed to the newsletter!</div>
  </div>
</template>

<style scoped>
.footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  overflow-x: hidden;
}

h2 {
  color: #0F62A4;
  font-size: 30px;
  font-weight: 600;
  margin: 70px 0 30px;
  padding: 0 16px;
}

/* =========================
   NEWSLETTER (Desktop base)
========================= */
.newsletter-section {
  position: relative;
  width: 900px;
  max-width: calc(100% - 32px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 95px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.39);
  background: white;
  margin: 0 auto;
}

.input-url {
  width: 100%;
  height: 100%;
  padding: 0 25px;
  border: none;
  border-radius: 8px;
}

.input-url::placeholder {
  color: #99a0a6ff;
  opacity: 1;
}

.input-url:focus {
  box-shadow: none;
}

.btn-principale {
  border-radius: 8px;
  padding: 15px 40px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}

/* =========================
   INFO SECTION
========================= */
.information-section {
  margin-top: -42px;
  background-color: #0F62A4;
  width: 100%;
  padding: 0 16px;
}

.information-section h1 {
  color: white;
  font-size: 35px;
  font-weight: 600;
  margin: 100px 0 0;
}

.information-text{
  color: white;
  width: 45%;
  margin: 30px auto;
  font-size: 18px;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 30px auto;
  padding: 0;
  flex-wrap: wrap;
}

.link {
  text-decoration: none;
  color: white;
  font-size: 18px;
  transition: color 0.3s ease;
  font-weight: 600;
}

.link:hover {
  transform: scale(1.05);
  text-shadow: 0 1px 5px rgba(124, 174, 223, 0.35);
}

.social {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px auto;
  color: white;
  font-size: 20px;
  flex-wrap: wrap;
}

.social i {
  cursor: pointer;
}

.social i:hover {
  transform: scale(1.05);
}

.footer-line {
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 25px 0;
}

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  font-size: 14px;
  color: white;
  margin-bottom: 25px;
  gap: 12px;
}

.footer-bottom p {
  margin: 0;
}

.left-part {
  display: flex;
  gap: 60px;
  color: white;
  flex-wrap: wrap;
  justify-content: center;
}

/* =========================
   SUCCESS TOAST
========================= */
.success-toast{
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #198754;
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  z-index: 9999;
  max-width: calc(100% - 40px);
}

/* =========================
   RESPONSIVE (Tablet + Mobile)
   -> tout en colonne pour la newsletter
========================= */
@media (max-width: 1024px) {
  h2{
    font-size: 24px;
    margin: 55px 0 24px;
  }

  .newsletter-section{
    height: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .input-url{
    height: 54px;
    padding: 0 14px;
  }

  .btn-principale{
    position: static;
    transform: none;
    width: 100%;
    padding: 14px 18px;
  }

  .information-section{
    margin-top: 24px;
    padding-bottom: 20px;
  }

  .information-section h1{
    margin-top: 40px;
    font-size: 28px;
  }

  .information-text{
    width: 100%;
    max-width: 720px;
    font-size: 16px;
  }

  .footer-bottom{
    padding: 0 16px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .footer-links{
    gap: 14px;
    margin: 22px auto;
  }

  .link{
    font-size: 16px;
  }

  .footer-bottom{
    flex-direction: column;
    text-align: center;
    margin-bottom: 18px;
  }

  .left-part{
    gap: 14px;
  }
}

</style>