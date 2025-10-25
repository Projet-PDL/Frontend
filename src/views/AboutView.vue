<script setup lang="ts">
import NavbarHome from '@/components/NavbarHome.vue'
</script>

<template>
  <NavbarHome />
  <div class="about-page">
    <a href="/" class="back-link">← Homepage</a>

    <section class="intro">
      <div class="text">
        <h1>About LinkedIn2CV</h1>
        <p>
          LinkedIn2CV was born from a simple idea: transforming your LinkedIn profile into a professional and elegant CV - instantly.
        </p>
        <p>
          Our goal is to help students, professionals, and job seekers present their experience with clarity, style, and impact.
        </p>
      </div>
      <img src="@/assets/images/about_picture2.png" alt="Team collaborating" class="illustration" />
    </section>

    <section class="mission">
      <img src="@/assets/images/about_picture.png" alt="Team working" class="illustration" />
      <div class="text">
        <h1>Our mission</h1>
        <p>
          At LinkedIn2CV, we believe that your career story deserves to be seen - beautifully.
        </p>
        <p>
          We make the process of creating a CV effortless, fast, and tailored to your LinkedIn data.
        </p>
        <p>
          No more endless formatting or design headaches - just one click and your CV is ready to share with the world.
        </p>
      </div>
    </section>

    <section class="story-contact">
      <div class="text">
        <h1>Our story</h1>
        <p>
          LinkedIn2CV was created by six passionate developers united by a single goal: to make modern, professional resumes accessible to everyone.
        </p>
        <p>
          Combining design, technology, and practicality, we built a tool that lets users showcase their career story clearly and confidently, in just a few clicks.
        </p>
      </div>
      <div class="text">
        <h1>Got any questions?</h1>
        <p>
          Whether you have feedback, partnership ideas, or need help with your CV. Our team is here to help!
        </p>
        <RouterLink to="/contact" class="btn-principale">Contact us</RouterLink>
      </div>
    </section>

    <div class="values">
      <h1>What we stand for</h1>
      <div class="values-grid">
        <div class="value">
          <img src="@/assets/images/about_simplicity.png" alt="simplicity" class="value-image" />
          <h3>Simplicity</h3>
          <p>Creating your CV should be as easy as clicking a button.</p>
        </div>
        <div class="value">
          <img src="@/assets/images/about_design_excellence.png" alt="design excellence" class="value-image" />
          <h3>Design excellence</h3>
          <p>Every CV is crafted to impress recruiters at first glance.</p>
        </div>
        <div class="value">
          <img src="@/assets/images/about_innovation.png" alt="innovation" class="value-image" />
          <h3>Innovation</h3>
          <p>We merge data, design, and automation for smarter tools.</p>
        </div>
        <div class="value">
          <img src="@/assets/images/about_collaboration.png" alt="collaboration" class="value-image" />
          <h3>Collaboration</h3>
          <p>Built with teamwork, for people who work better together.</p>
        </div>
      </div>
    </div>

    <div class="join">
      <h1>Join the LinkedIn2CV Journey</h1>
      <p>
        We’re continuously improving LinkedIn2CV to help you stand out in your career.
      </p>
      <p>
        Try it today, share your feedback, and help us shape the future of digital CV creation.
      </p>
      <RouterLink to="/login" class="btn-principale">Generate your CV now</RouterLink>
    </div>
  </div>
</template>

<style scoped>

section {
  width: 92%;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
}

h1 {
  color: #0F62A4;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 15px;
}

.text p, .join p{
  color: #707070;
  font-size: 24px;
  margin-bottom: 20px;
}

.story-contact, .mission{
  align-items: center;
  justify-content: center;
  text-align: center;
}

.illustration {
  justify-self: center;
}

.intro .illustration {
  max-width: 700px;
}

.intro {
  margin-top: -30px;
}
.mission {
  margin-top: -80px;
}

.values {
  text-align: center;
  background-image: url('@/assets/images/about_background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 40px 0 40px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 220px));
  justify-content: center; 
  gap: 60px;
  width: 80%;
  margin: 40px auto;
}

.value {
  background: white;
  border: 2px solid #0F62A4;
  border-radius: 20px;
  padding: 30px 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.value:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.value-image {
  width: 50px;
  margin-bottom: 15px;
}

.value h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.value p {
  font-size: 18px;
}

.join{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 40px 0 40px;
}

.join p {
  max-width: 600px;
}
</style>