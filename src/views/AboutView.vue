<script setup lang="ts">
import NavbarHome from '@/components/NavbarHome.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
<!--  <NavbarHome />-->
  <div class="about-page">
<!--    <a href="/" class="back-link">← Homepage</a>-->

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
<!--    <Footer />-->
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
  padding-top: 5rem;
  padding-bottom: 5rem;
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

/*  Sécurité overflow sur petits écrans */
.about-page {
  overflow-x: hidden;
  padding: 0 16px;
}

.illustration {
  max-width: 100%;
  height: auto;
}

/* =========================
   TABLETTE (<= 992px)
========================= */
@media (max-width: 992px) {
  section {
    width: 100%;
    gap: 28px;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  h1 {
    font-size: 34px;
  }

  .text p, .join p {
    font-size: 20px;
  }

  .intro .illustration {
    max-width: 520px;
  }

  .values-grid {
    width: 100%;
    gap: 30px;
  }

  /* les cartes prennent plus de place, mais restent centrées */
  .values-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    padding: 0 8px;
  }
}

/* =========================
   MOBILE (<= 768px)
========================= */
@media (max-width: 768px) {
  section {
    width: 100%;
    margin: 24px auto;
    grid-template-columns: 1fr; /*  une seule colonne */
    gap: 18px;
    padding-top: 2rem;
    padding-bottom: 2rem;
    text-align: center;
  }

  /*  Sur mobile on met l’image en premier pour intro & mission (plus joli)
     (mission a déjà l’image à gauche, intro a l’image à droite) */
  .intro .illustration {
    order: -1;
    max-width: 420px;
  }

  .mission .illustration {
    order: -1;
    max-width: 420px;
  }

  .intro {
    margin-top: 0;
  }

  .mission {
    margin-top: 0;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .text p, .join p {
    font-size: 16px;
    margin-bottom: 14px;
  }

  .values {
    padding: 28px 0;
  }

  .values-grid {
    width: 100%;
    grid-template-columns: 1fr; /*  cartes en colonne */
    gap: 18px;
    margin: 20px auto;
    padding: 0 10px;
  }

  .value {
    padding: 22px 14px;
  }

  .join {
    margin: 24px 0;
    padding: 0 8px;
  }

  .join p {
    max-width: 100%;
  }

  /*  bouton full width sur mobile (si btn-principale n'est pas déjà responsive) */
  .btn-principale {
    display: inline-block;
    width: 100%;
    max-width: 360px;
    text-align: center;
  }
}

/* =========================
   PETITS MOBILES (<= 420px)
========================= */
@media (max-width: 420px) {
  h1 {
    font-size: 24px;
  }

  .text p, .join p {
    font-size: 15px;
  }

  .value h3 {
    margin-bottom: 12px;
  }

  .value p {
    font-size: 15px;
  }
}

</style>