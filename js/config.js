/* =====================================================================
   PORTFOLIO CONFIGURATION
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to make this portfolio yours.
   Replace every placeholder value below with your real information.
   Every link, the resume file, the profile picture and the skills /
   projects data all flow from this single object — nothing else in
   the HTML needs to change.
   ===================================================================== */

const CONFIG = {

  /* ---------------- Identity ---------------- */
  name: "Muhammad Abubakar",

  /* ---------------- Social & contact links ----------------
     Replace these with your real profile URLs.               */
  socials: {
    github: "https://github.com/Muhammad-Abubakar147",
    linkedin: "https://www.linkedin.com/in/muhammadabubakar147/",
    email: "mailto:brandmirza702@gmail.com",
    portfolio: "https://your-portfolio-url.com"
  },

  /* ---------------- Resume ----------------
     Drop your PDF at assets/resume/resume.pdf (keep this exact
     filename, or update the path below) and both the "View Resume"
     and "Download Resume" buttons will work automatically.        */
  resume: {
    path: "assets/resume/My_cv_Abubakar.pdf",
    downloadFilename: "Muhammad_Abubakar_Resume.pdf"
  },

  /* ---------------- Profile picture ----------------
     Replace assets/images/profile.svg with your own photo
     (e.g. profile.jpg) and update the path below.                */
  profileImage: "assets/images/Muhammad Abubakar.jpg",

  /* ---------------- Achievement / certificate links ---------------- */
  achievements: {
    cs50x: "https://www.linkedin.com/feed/update/urn:li:activity:7448675614955294720/",
    saylor: "https://www.linkedin.com/feed/update/urn:li:activity:7449519272856309760/",
    githubLeaderboard: "https://www.linkedin.com/feed/update/urn:li:activity:7476954991220584448/",
    githubContributions: "https://www.linkedin.com/feed/update/urn:li:activity:7481736545532694528/"
  },

  /* ---------------- Project links ---------------- */
  projects: {
    faceDetection: "https://github.com/Muhammad-Abubakar147/Mini-Project/blob/main/Eye%20Face%20Smile%20Detection/Eyes%20Smile%20Face%20detection.py",
    calculator: "https://github.com/Muhammad-Abubakar147/Mini-Project/blob/main/Python%20Calculator/Calculator.py",
    restaurantSystem: "https://github.com/Muhammad-Abubakar147/Mini-Project/blob/main/Restaurant%20Manager%20App/Restaurant-Manager-App.py",
    studentSystem: "https://github.com/Muhammad-Abubakar147/Mini-Project/blob/main/Student%20Manager%20app/Student-manager-app.py",
    portfolioGithub: "https://github.com/Muhammad-Abubakar147",
    portfolioLive: "https://your-portfolio-url.com"
  },

  /* ---------------- EmailJS (contact form) ----------------
     The contact form works out of the box with a "mailto:" fallback,
     so messages open in the visitor's own email client. To have
     messages land directly in your inbox instead, sign up free at
     https://www.emailjs.com, create a service + template, set
     enabled to true and fill in your three IDs below.              */
  emailjs: {
    enabled: true,
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID"
  },

  /* ---------------- Hero role words (typing animation) ---------------- */
  roles: [
    "Python Developer",
    "Data Science Enthusiast",
    "Machine Learning",
    "Artificial Intelligence",
    "Software Developer"
  ],

  /* ---------------- Skills data ----------------
     icon: an Iconify icon id (https://icon-sets.iconify.design)
     Add / remove / reorder freely — the UI renders this automatically. */
  skillCategories: [
    {
      title: "Programming Languages",
      icon: "fa-solid fa-code",
      skills: [
        { name: "Python", icon: "simple-icons:python" },
        { name: "HTML", icon: "simple-icons:html5" },
        { name: "CSS", icon: "simple-icons:css3" }
      ]
    },
    {
      title: "AI / Deep Learning",
      icon: "fa-solid fa-brain",
      skills: [
        { name: "TensorFlow", icon: "simple-icons:tensorflow" },
        { name: "PyTorch", icon: "simple-icons:pytorch" }
      ]
    },
    {
      title: "Data Science",
      icon: "fa-solid fa-chart-line",
      skills: [
        { name: "Pandas", icon: "simple-icons:pandas" },
        { name: "NumPy", icon: "simple-icons:numpy" },
        { name: "Scikit-Learn", icon: "simple-icons:scikitlearn" }
      ]
    },
    {
      title: "Data Visualization",
      icon: "fa-solid fa-chart-pie",
      skills: [
        { name: "Matplotlib", icon: "simple-icons:plotly", fallbackIcon: "fa-solid fa-chart-column" },
        { name: "Seaborn", icon: "fa-solid fa-chart-area", isFa: true },
        { name: "Plotly", icon: "simple-icons:plotly" }
      ]
    },
    {
      title: "Computer Vision",
      icon: "fa-solid fa-eye",
      skills: [
        { name: "OpenCV", icon: "simple-icons:opencv" }
      ]
    },
    {
      title: "Version Control",
      icon: "fa-solid fa-code-branch",
      skills: [
        { name: "Git", icon: "simple-icons:git" },
        { name: "GitHub", icon: "simple-icons:github" }
      ]
    },
    {
      title: "IDEs & Notebooks",
      icon: "fa-solid fa-laptop-code",
      skills: [
        { name: "VS Code", icon: "simple-icons:visualstudiocode" },
        { name: "Jupyter Notebook", icon: "simple-icons:jupyter" },
        { name: "Google Colab", icon: "simple-icons:googlecolab" },
        { name: "PyCharm", icon: "simple-icons:pycharm" },
        { name: "Antigravity", icon: "fa-solid fa-meteor", isFa: true }
      ]
    },
    {
      title: "Machine Learning",
      icon: "fa-solid fa-robot",
      skills: [
        { name: "Machine Learning", icon: "fa-solid fa-robot", isFa: true },
        { name: "Deep Learning", icon: "fa-solid fa-brain", isFa: true }
      ]
    },
    {
      title: "AI Tools",
      icon: "fa-solid fa-wand-magic-sparkles",
      skills: [
        { name: "ChatGPT", icon: "simple-icons:openai" },
        { name: "Claude", icon: "simple-icons:claude" },
        { name: "Gemini", icon: "simple-icons:googlegemini" },
        { name: "DeepSeek", icon: "simple-icons:deepseek" },
        { name: "Grok", icon: "fa-solid fa-satellite", isFa: true },
        { name: "Gamma", icon: "fa-solid fa-bolt", isFa: true },
        { name: "Manus", icon: "fa-solid fa-robot", isFa: true },
        { name: "Perplexity", icon: "simple-icons:perplexity" }
      ]
    },
    {
      title: "Design Tools",
      icon: "fa-solid fa-palette",
      skills: [
        { name: "Figma", icon: "simple-icons:figma" },
        { name: "Canva", icon: "simple-icons:canva" },
        { name: "Adobe XD", icon: "simple-icons:adobexd" },
        { name: "Adobe Photoshop", icon: "simple-icons:adobephotoshop" },
        { name: "Adobe Illustrator", icon: "simple-icons:adobeillustrator" }
      ]
    },
    {
      title: "Others",
      icon: "fa-solid fa-layer-group",
      skills: [
        { name: "Kaggle", icon: "simple-icons:kaggle" },
        { name: "LabLab.ai", icon: "fa-solid fa-flask", isFa: true },
        { name: "Discord", icon: "simple-icons:discord" }
      ]
    }
  ],

  /* ---------------- Projects data ---------------- */
  projectsList: [
    {
      title: "Face, Eye & Smile Detection using OpenCV",
      description: "Real-time computer vision application that detects faces, eyes, and smiles using OpenCV and a live webcam feed.",
      tech: ["Python", "OpenCV", "Computer Vision"],
      icon: "fa-solid fa-face-smile",
      githubKey: "faceDetection"
    },
    {
      title: "Python Calculator",
      description: "Command-line calculator built with Python supporting essential arithmetic operations.",
      tech: ["Python"],
      icon: "fa-solid fa-calculator",
      githubKey: "calculator"
    },
    {
      title: "Restaurant Management System",
      description: "Python application for managing menu handling, order processing, billing and customer management.",
      tech: ["Python"],
      icon: "fa-solid fa-utensils",
      githubKey: "restaurantSystem"
    },
    {
      title: "Student Management System",
      description: "Python application for adding, updating, searching and deleting student records.",
      tech: ["Python"],
      icon: "fa-solid fa-user-graduate",
      githubKey: "studentSystem"
    },
    {
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio website showcasing my skills, education, certifications and projects — the very site you're looking at.",
      tech: ["HTML", "CSS", "JavaScript"],
      icon: "fa-solid fa-diagram-project",
      githubKey: "portfolioGithub",
      liveKey: "portfolioLive"
    }
  ]

};

/* Expose globally for main.js */
window.CONFIG = CONFIG;
