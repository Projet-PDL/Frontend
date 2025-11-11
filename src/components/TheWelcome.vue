<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const email = ref('')
const currentTestimonial = ref(0)
let testimonialInterval: number | null = null

const testimonials = [
  {
    text: "LinkedIn2CV allowed me to create a professional CV in just a few minutes. I received 3 interview calls within a week!",
    author: "Elisabeth",
    role: "Marketing Manager"
  },
  {
    text: "As a student, I didn't have time to create a CV from scratch. LinkedIn2CV simplified my job search!",
    author: "Charlotte",
    role: "Student"
  },
  {
    text: "The templates are modern and professional. I appreciate the ability to customize every section easily.",
    author: "Sophie",
    role: "Designer"
  },
  {
    text: "I was able to land my dream job thanks to the professional CV I created with LinkedIn2CV. Highly recommended!",
    author: "Marc",
    role: "Software Engineer"
  },
  {
    text: "The AI-powered formatting saved me so much time. My CV looks amazing and I got multiple interview requests!",
    author: "Julie",
    role: "Product Manager"
  },
  {
    text: "Simple, fast, and effective. I created my CV in less than 5 minutes and it looks incredibly professional.",
    author: "Thomas",
    role: "Sales Director"
  }
]

const handleSubscribe = () => {
  if (email.value) {
    alert(`Merci de vous être abonné avec : ${email.value}`)
    email.value = ''
  }
}

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 3) % testimonials.length
}

const prevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 3 + testimonials.length) % testimonials.length
}

const goToTestimonial = (index: number) => {
  currentTestimonial.value = index
}

const getVisibleTestimonials = () => {
  const indices = []
  for (let i = 0; i < 3; i++) {
    indices.push((currentTestimonial.value + i) % testimonials.length)
  }
  return indices
}

onMounted(() => {
  testimonialInterval = window.setInterval(() => {
    nextTestimonial()
  }, 5000)
})

onUnmounted(() => {
  if (testimonialInterval) {
    clearInterval(testimonialInterval)
  }
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero py-5">
      <div class="container">
        <div class="row align-items-center min-vh-50">
          <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <h1 class="display-4 fw-bold mb-4 hero-title">
              Create a<br>
              <span class="text-primary">Professional CV</span><br>
              in Just a Few Clicks
            </h1>
            <p class="lead text-muted mb-4 pe-lg-5">
              Transform your LinkedIn profile into an elegant, personalized CV in just a few simple steps. Save time and maximize your chances of landing your dream job.
            </p>
            
            <div class="d-flex flex-wrap gap-4 mb-4">
              <div class="stat-item">
                <h4 class="fw-bold mb-0 text-primary">15,000+</h4>
                <p class="mb-0 text-muted small">CVs Created</p>
              </div>
              <div class="stat-item">
                <h4 class="fw-bold mb-0 text-primary">98%</h4>
                <p class="mb-0 text-muted small">Satisfied Clients</p>
              </div>
              <div class="stat-item">
                <h4 class="fw-bold mb-0 text-primary">5 min</h4>
                <p class="mb-0 text-muted small">Average Time</p>
              </div>
            </div>
            
            <a href="#" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
              Get Started Now
            </a>
          </div>

          <div class="col-lg-6 col-md-12">
            <div class="hero-image-container text-center">
              <img 
                src="@/assets/images/hero-cv.png" 
                alt="Professional CV Example" 
                class="img-fluid rounded-4 shadow-lg"
                style="max-width: 100%; height: auto;"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="why-choose py-5 position-relative about-section">
  
      <div class="container position-relative" style="z-index: 1;">
        <h2 class="text-center fw-bold mb-2">Why Choose LinkedIn2CV?</h2>
        <p class="text-center text-muted mb-5">The best solution for creating your professional CV</p>
        
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="feature-card bg-white rounded-4 p-4 h-100 shadow-sm border-0">
              <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                <i class="bi bi-shield-lock text-custom-blue fs-1"></i>
              </div>
              <h5 class="fw-bold text-center mb-3">Data Security</h5>
              <p class="text-muted text-center mb-0">
                Your data is protected, and we never share your information with third parties.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card bg-white rounded-4 p-4 h-100 shadow-sm border-0">
              <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                <i class="bi bi-clock text-custom-blue fs-1"></i>
              </div>
              <h5 class="fw-bold text-center mb-3">Time Saving</h5>
              <p class="text-muted text-center mb-0">
                Generate a CV in under 5 minutes instead of spending hours designing it manually.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card bg-white rounded-4 p-4 h-100 shadow-sm border-0">
              <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                <i class="bi bi-layout-text-window text-custom-blue fs-1"></i>
              </div>
              <h5 class="fw-bold text-center mb-3">Various Designs</h5>
              <p class="text-muted text-center mb-0">
                Choose from several professional templates tailored to your industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="how-it-works py-5 bg-white">
      <div class="container">
        <h2 class="text-center fw-bold mb-2">How it Works ?</h2>
        <p class="text-center text-muted mb-5">Create your professional CV in just 3 simple steps</p>

        <div class="row justify-content-center align-items-center position-relative">
          <div class="col-lg-3 col-md-4 mb-4 mb-lg-0 text-center">
            <div class="step-circle bg-custom-blue text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" style="width: 80px; height: 80px;">
              <i class="bi bi-link-45deg fs-1"></i>
            </div>
            <h2 class="text-custom-blue fw-bold mb-3">1</h2>
            <h5 class="fw-bold mb-3">Insert LinkedIn URL</h5>
            <p class="text-muted small px-3">
              Automatically import data, adjust layout, add your photo or skills.
            </p>
          </div>

          <div class="col-lg-1 d-none d-lg-flex align-items-center justify-content-center" style="margin-bottom: 150px;">
            <i class="bi bi-arrow-right text-custom-blue fs-2"></i>
          </div>

          <div class="col-lg-3 col-md-4 mb-4 mb-lg-0 text-center">
            <div class="step-circle bg-custom-blue text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" style="width: 80px; height: 80px;">
              <i class="bi bi-file-earmark-text fs-1"></i>
            </div>
            <h2 class="text-custom-blue fw-bold mb-3">2</h2>
            <h5 class="fw-bold mb-3">Generate & Customise</h5>
            <p class="text-muted small px-3">
              Get your CV in your preferred format.
            </p>
          </div>

          <div class="col-lg-1 d-none d-lg-flex align-items-center justify-content-center" style="margin-bottom: 150px;">
            <i class="bi bi-arrow-right text-custom-blue fs-2"></i>
          </div>

          <div class="col-lg-3 col-md-4 text-center">
            <div class="step-circle bg-custom-blue text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow" style="width: 80px; height: 80px;">
              <i class="bi bi-download fs-1"></i>
            </div>
            <h2 class="text-custom-blue fw-bold mb-3">3</h2>
            <h5 class="fw-bold mb-3">Download your CV</h5>
            <p class="text-muted small px-3">
              Copy and paste your LinkedIn profile URL.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Companies Section -->
    <section class="companies py-5 bg-light">
      <div class="container">
        <h4 class="text-center fw-bold mb-2">Our Clients Got Hired At</h4>
        <p class="text-center text-muted mb-5">Reputable companies that trust our CVs</p>
        
        <div class="row justify-content-center align-items-center g-4">
          <div class="col-6 col-md-2 text-center">
            <div class="company-logo bg-white rounded p-3 shadow-sm">
              <h5 class="mb-0 fw-bold">NETFLIX</h5>
            </div>
          </div>
          <div class="col-6 col-md-2 text-center">
            <div class="company-logo bg-white rounded p-3 shadow-sm">
              <h5 class="mb-0 fw-bold">amazon</h5>
            </div>
          </div>
          <div class="col-6 col-md-2 text-center">
            <div class="company-logo bg-white rounded p-3 shadow-sm">
              <h5 class="mb-0 fw-bold">Google</h5>
            </div>
          </div>
          <div class="col-6 col-md-2 text-center">
            <div class="company-logo bg-white rounded p-3 shadow-sm">
              <h5 class="mb-0 fw-bold">Microsoft</h5>
            </div>
          </div>
          <div class="col-6 col-md-2 text-center">
            <div class="company-logo bg-white rounded p-3 shadow-sm">
              <h5 class="mb-0 fw-bold">Lidl</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials py-5 bg-custom-blue text-white">
      <div class="container">
        <h2 class="text-center fw-bold mb-2">What Our Client Says</h2>
        <p class="text-center mb-4 opacity-75">Discover the experiences of our satisfied users</p>

        <div class="position-relative">
          <div class="testimonial-carousel">
            <transition name="fade" mode="out-in">
              <div :key="currentTestimonial" class="row g-4 justify-content-center">
                <div class="col-lg-4 col-md-6" v-for="index in getVisibleTestimonials()" :key="index">
                  <div class="testimonial-card bg-white text-dark rounded-4 p-4 shadow-lg h-100">
                    <div class="mb-3">
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                      <i class="bi bi-star-fill text-warning"></i>
                    </div>
                    <p class="mb-4" style="min-height: 100px;">
                      "{{ testimonials[index].text }}"
                    </p>
                    <div class="d-flex align-items-center">
                      <div class="avatar bg-custom-blue text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                        <i class="bi bi-person-fill fs-4"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-0">{{ testimonials[index].author }}</h6>
                        <small class="text-muted">{{ testimonials[index].role }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Navigation Arrows -->
          <button 
            @click="prevTestimonial" 
            class="carousel-nav carousel-nav-prev btn btn-light rounded-circle shadow position-absolute"
            style="left: -20px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; z-index: 10;"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button 
            @click="nextTestimonial" 
            class="carousel-nav carousel-nav-next btn btn-light rounded-circle shadow position-absolute"
            style="right: -20px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; z-index: 10;"
          >
            <i class="bi bi-chevron-right"></i>
          </button>

          <!-- Dots Indicator -->
          <div class="carousel-indicators d-flex justify-content-center gap-2 mt-4">
            <button 
              v-for="i in 2" 
              :key="i - 1"
              @click="goToTestimonial((i - 1) * 3)"
              class="indicator-dot rounded-circle border-0"
              :class="{ active: Math.floor(currentTestimonial / 3) === (i - 1) }"
              style="width: 12px; height: 12px;"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta py-5 bg-white">
      <div class="container-fluid px-lg-5">
        <div class="row align-items-center g-4">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img 
              src="@/assets/images/CV/CV_Login_FR.jpg" 
              alt="CV Example" 
              class="img-fluid rounded-4 shadow-lg w-100"
              style="max-height: 600px; object-fit: cover;"
            />
          </div>
          <div class="col-lg-6 ps-lg-5">
            <h2 class="display-5 fw-bold mb-4">
              Ready to Transform<br>
              Your LinkedIn Profile?
            </h2>
            <p class="lead text-muted mb-4">
              Join thousands of professionals who have landed their dream jobs with our professionally designed CVs.
            </p>
            <a href="#" class="btn btn-custom-blue btn-lg px-5 py-3 rounded-pill shadow-sm text-white">
              Generate Your CV Now
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Custom Blue Color */
.bg-custom-blue {
  background-color: #0F62A4 !important;
}

.text-custom-blue {
  color: #0F62A4 !important;
}

.btn-custom-blue {
  background-color: #0F62A4 !important;
  border-color: #0F62A4 !important;
}

.btn-custom-blue:hover {
  background-color: #0d5490 !important;
  border-color: #0d5490 !important;
}

.text-primary {
  color: #0F62A4 !important;
}

.btn-primary {
  background-color: #0F62A4 !important;
  border-color: #0F62A4 !important;
}

.btn-primary:hover {
  background-color: #0d5490 !important;
  border-color: #0d5490 !important;
}

.bg-primary {
  background-color: #0F62A4 !important;
}

.hero {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.hero-title {
  line-height: 1.2;
  font-size: 2.5rem;
}

@media (min-width: 992px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

.stat-item {
  min-width: 100px;
}

.profile-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.icon-circle {
  transition: transform 0.3s ease;
}

.feature-card:hover .icon-circle {
  transform: scale(1.1);
}

.step-circle {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 0.5rem 1.5rem rgba(15, 98, 164, 0.3) !important;
}

.step-number {
  font-size: 1.2rem;
}

.company-logo {
  transition: transform 0.3s ease;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo:hover {
  transform: scale(1.05);
}

/* Testimonial Carousel Styles */
.testimonial-carousel {
  position: relative;
  min-height: 320px;
}

.testimonial-card {
  transition: opacity 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.carousel-nav {
  transition: all 0.3s ease;
}

.carousel-nav:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}

.indicator-dot {
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

.indicator-dot.active {
  background-color: white;
  width: 30px !important;
  border-radius: 6px !important;
}

.indicator-dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(15, 98, 164, 0.3);
}

.input-group-lg .form-control {
  border-radius: 50px 0 0 50px !important;
}

.input-group-lg .btn {
  border-radius: 0 50px 50px 0 !important;
}

.min-vh-50 {
  min-height: 50vh;
}

.about-section {
  background-image: url('@/assets/images/about_background.png');
  background-size: cover;
  background-position: center;
}

@media (max-width: 768px) {
  .carousel-nav {
    width: 40px !important;
    height: 40px !important;
  }
  
  .carousel-nav-prev {
    left: 0 !important;
  }
  
  .carousel-nav-next {
    right: 0 !important;
  }
}
</style>