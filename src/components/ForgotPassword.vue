<script setup lang="ts">
import { ref } from "vue";

const email = ref("");

const emit = defineEmits(["close", "submit"]);

const handleSubmit = () => {
  if (!email.value) return;
  emit("submit", email.value);
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <div class= "box">
        <h2 class="title">Forgot password?</h2>
        <p class="subtitle">
          Please enter the email address you used when signing up
        </p>

        <label>Enter your email address</label>
        <input v-model="email" type="email" class="form-control" placeholder="myaddress@email.com" />

        <button class="btn-principale" @click="handleSubmit">
          Get a new password
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background: white;
  width: 580px;
  padding: 45px 50px;
  border-radius: 18px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.54);
  text-align: left;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 18px;
  left: 18px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.box{
  margin: 0 50px;
}

.title {
  text-align: center;
  font-size: 34px;
  font-weight: 700;
  color: #0F62A4;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #707070;
  margin-bottom: 35px;
  font-size: 14px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #464646ff;
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #9b9b9bff;
  margin-bottom: 28px;
  font-size: 15px;
  align-items: center;
}

.input::placeholder {
  color: #8E8E8E;
}

.btn-principale{
  width: 100%;
}

</style>
