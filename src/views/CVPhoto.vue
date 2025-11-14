<template>
  <div class="cv-container">

    <!-- HEADER -->
    <header class="cv-header">
      
        <aside class="cv-sidebar1"/>
         
      <div>
        <h4>{{ cvData.name }}</h4>
        <h6>{{ cvData.title }}</h6>
      </div>
      

      <div>
        <p>📍 {{ cvData.location }}</p>
        <p>📞 {{ cvData.phone }}</p>
        <p>✉️ {{ cvData.email }}</p>
      </div>
      
        <!-- LOGO 2CV -->
        <div class="cv-logo">
          <img src="@/assets/images/logo.png" alt="LinkedIn2CV logo" class="navbar-logo"/>
        </div>
    </header>

    <!-- BODY -->
    <div class="cv-body">

      <!-- LEFT MAIN CONTENT -->
      <div class="cv-main">
        
        <!-- PROFILE -->
        <section class="cv-section">
          <h3>Profile</h3>
          <p>{{ cvData.profile }}</p>
        </section>

        <!-- EDUCATION -->
        <section class="cv-section">
          <h3>Education</h3>

          <div v-for="(edu, i) in cvData.education" :key="i" class="edu-item">
            <div class="edu-year">{{ edu.startDate }} – {{ edu.endDate }}</div>
            <div class="edu-degree">{{ edu.degree }}</div>
            <div class="edu-school">{{ edu.school }} — {{ edu.location }}</div>
          </div>
        </section>

        <!-- EXPERIENCE -->
        <section class="cv-section">
          <h3>Work Experience</h3>

          <div v-for="(exp, i) in cvData.experience" :key="i" class="exp-item">
            <div class="exp-year">{{ exp.startDate }} – {{ exp.endDate }}</div>
            <div class="exp-title">{{ exp.title }}</div>
            <div class="exp-company">{{ exp.company }} — {{ exp.location }}</div>

            <ul>
              <li v-for="(task, t) in exp.tasks" :key="t">{{ task }}</li>
            </ul>
          </div>
        </section>

      </div>

      <!-- RIGHT SIDEBAR -->
      <aside class="cv-sidebar">


        <!-- LANGUAGES -->
        <div>
          <h4>Languages</h4>
          <ul>
            <li v-for="(lang, i) in cvData.languages" :key="i">
              {{ lang.name }} — {{ lang.level }}
            </li>
          </ul>
        </div>

        <!-- SKILLS -->
        <div>
          <h4>Skills</h4>
          <ul>
            <li>{{ cvData.skills.frontend }}</li>
            <li>{{ cvData.skills.backend }}</li>
            <li>{{ cvData.skills.databases }}</li>
            <li>{{ cvData.skills.tools }}</li>
            <li>{{ cvData.skills.other }}</li>
          </ul>
        </div>

        <!-- INTERESTS -->
        <div>
          <h4>Interests</h4>
          <ul>
            <li v-for="(int, i) in cvData.interests" :key="i">{{ int }}</li>
          </ul>
        </div>

        <!-- SOCIAL -->
        <div class="social">
          <div class="linkedin-icon">in</div>
          <span>{{ cvData.linkedin }}</span>
        </div>

      </aside>

    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  GraduationCap, 
  Briefcase, 
  Languages, 
  Code, 
  Globe, 
  Heart, 
  Edit2, 
  Download, 
  Menu 
} from 'lucide-vue-next';

const selectedTemplate = ref(0);

const expandedSections = ref({
  profile: true,
  education: false,
  experience: false,
  languages: false,
  skills: false,
  contact: false,
  interests: false
});

const cvData = ref({
  name: 'Noelis MANÉ',
  title: 'Full Stack Web Developer',
  email: 'noelis.mané@linkedin2cv.fr',
  phone: '06 02 19 02 49',
  location: '35000, Rennes',
  age: '21 years old',
  remote: true,
  website: 'Linkedin2CV.fr',
  
  profile: 'Passionate about web technologies and automation, I develop solutions that transform data into interactive and user-friendly experiences. Co-creator of LinkedIn2CV, a tool that automatically generates professional resumes from LinkedIn profiles.',
  
  education: [
    {
      degree: "Master's Degree in MIAGE",
      school: 'University of Rennes',
      location: 'Rennes',
      startDate: 'Sept. 2025',
      endDate: 'Present',
      current: true
    },
    {
      degree: "Bachelor's Degree in MIAGE",
      school: 'University of Rennes',
      location: 'Rennes',
      startDate: 'Sept. 2024',
      endDate: 'July 2025',
      current: false
    }
  ],
  
  experience: [
    {
      title: 'Web Developer',
      company: 'LinkedIn2CV',
      location: 'Rennes',
      startDate: 'Sept. 2025',
      endDate: 'Present',
      current: true,
      tasks: [
        'Designed and integrated the login page using React and TailwindCSS.',
        'Connected to the LinkedIn API to extract and format user profile data.',
        'Collaborated with a team of 6 developers using GitHub.',
        'Built a responsive and exportable CV template (PDF generation).'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'TechForge',
      location: 'Rennes',
      startDate: 'Apr. 2025',
      endDate: 'July 2025',
      current: false,
      tasks: [
        'Developed analytical dashboards using React and Node.js.',
        'Optimized page loading time by 40%.',
        'Contributed to the redesign of the company\'s design system.'
      ]
    }
  ],
  
  languages: [
    { name: 'English', level: 'Native language' },
    { name: 'French', level: 'Intermediate (B2)' }
  ],
  
  skills: {
    frontend: 'React.js, HTML5, CSS3, JavaScript (ES6), TailwindCSS, Figma',
    backend: 'Node.js, Express.js, Java (Spring Boot), Python (FastAPI)',
    databases: 'MongoDB, MySQL, PostgreSQL',
    tools: 'Git/GitHub, Docker, Postman, VS Code',
    other: 'API REST, Authentication OAuth (LinkedIn API), UML modeling, Agile methodologies'
  },
  
  interests: ['Design UI/UX', 'Generative AI'],
  linkedin: '@Linkedin2CV'
});

const templates = ref([
  { name: 'Template 1', color: 'indigo' },
  { name: 'Template 2', color: 'blue' },
  { name: 'Template 3', color: 'purple' }
]);

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section];
};
</script>



<style scoped>
.cv-container {
  width: 900px;
  margin: 0 auto;
  background: ;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  font-family: "Poppins", sans-serif;
  color: #333;
}

.cv-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #e5e7eb;
  padding: 2rem;
}

.cv-header h1 {
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 0.4rem;
}

.cv-header h2 {
  color: #555;
  font-weight: 500;
}

.cv-header p {
  margin: 2px 0;
  font-size: 0.9rem;
}

.cv-body {
  display: flex;
}

/* Partie principale (gauche) */
.cv-main {
  flex: 2.5;
  padding: 2rem;
}

.cv-section {
  margin-bottom: 2rem;
}

.cv-section h3 {
  color: #1e3a8a;
  font-size: 1.2rem;
  border-bottom: 2px solid #93c5fd;
  display: inline-block;
  margin-bottom: 0.8rem;
}

.edu-item,
.exp-item {
  margin-bottom: 1rem;
}

.edu-year,
.exp-year {
  font-weight: bold;
  color: #2563eb;
  font-size: 0.9rem;
}

.edu-degree,
.exp-title {
  font-weight: 600;
  color: #111;
}

ul {
  padding-left: 1.2rem;
  list-style: disc;
  margin: 0.4rem 0;
}

li {
  font-size: 0.9rem;
  color: #444;
}

/* Sidebar droite */
.cv-sidebar {
  flex: 1;
  background: #e0e7ff;
  padding: 1.1rem 1rem;
}

.cv-sidebar1 {
  background: #e0e7ff;
  padding: 1.2rem 1.5rem ;
}
.cv-sidebar h4 {
  color: #1e3a8a;
  font-weight: 700;
  margin-bottom: 0.4rem;
  border-bottom: 2px solid #bfdbfe;
  display: inline-block;
}

.cv-sidebar ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.cv-sidebar li {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.cv-logo {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-bottom: 1.5rem;
}

.logo-box {
  background: #1d4ed8;
  color: white;
  padding: 2px 6px;
  font-weight: bold;
  transform: skewX(-10deg);
  border-radius: 3px;
}

.logo-text {
  font-size: 1.5rem;
  color: #1e3a8a;
  font-weight: bold;
}

.social {
  display: flex;
  align-items: center;
  gap: 6px;
}

.linkedin-icon {
  background: #1d4ed8;
  color: white;
  font-weight: bold;
  padding: 4px 7px;
  border-radius: 4px;
}
</style>
