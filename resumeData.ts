export type Project = {
  slug: string; title: string; period: string; tagline: string; overview: string;
  features: string[]; stack: string[]; github?: string; linkedin?: string; demo?: string;
  videos?: string[]; images?: string[]; featured?: boolean; category?: string;
};

export const profile = {
  name: "Nasrin A", role: "Python Developer & Software Engineer",
  email: "nasrin512003@gmail.com", linkedin: "https://www.linkedin.com/in/nasrin512003/",
  github: "https://github.com/Nasrin-Code", leetcode: "https://leetcode.com/u/nasrin512003/",
  resumeFile: "/Nasrin_A_Resume.pdf",
  summary: "Entry-level Python Developer and Software Engineer with hands-on experience in backend development, REST APIs, ETL pipelines and data engineering. Proficient in Python, Flask, SQLAlchemy, PostgreSQL, SQLite, Pandas, Pydantic and Git/GitHub, with project experience spanning backend systems, data pipelines, AI/ML, computer vision and IoT.",
};

export const skillGroups = [
  {label:"Programming", items:["Python","SQL","HTML","CSS"]},
  {label:"Backend & APIs", items:["Flask","REST APIs","CRUD","Authentication","Password Hashing","SQLAlchemy","JSON","HTTP","API Integration"]},
  {label:"Data Engineering", items:["ETL","Data Pipelines","Data Warehousing","Data Integration","Pandas","NumPy","Pydantic","Pydantic Settings","Apache Airflow","DAGs","PostgreSQL"]},
  {label:"Cloud, Testing & DevOps", items:["AWS S3","Boto3","Pytest","Tenacity","Git","GitHub","Branching","Pull Requests","CI/CD"]},
  {label:"AI / ML / IoT", items:["AI/ML","NLP","Computer Vision","OpenCV","Data Analysis","IoT","ESP32","Embedded Systems"]},
  {label:"Tools & Practices", items:["Postman","Render","Streamlit","VS Code","Power BI","Excel","OOP","DSA","SDLC","Agile","Scrum","Debugging"]},
];

const oasis = {
  voice:"https://github.com/Nasrin-Code/Oasis_Infobyte_Internship_Projects/tree/main/Python-Task1-VoiceAssistant",
  bmi:"https://github.com/Nasrin-Code/Oasis_Infobyte_Internship_Projects/tree/main/Python-Task2-BMICalculator",
  password:"https://github.com/Nasrin-Code/Oasis_Infobyte_Internship_Projects/tree/main/Python-Task3-RandomPasswordGenerator",
  weather:"https://github.com/Nasrin-Code/Oasis_Infobyte_Internship_Projects/tree/main/Python-Task4-WeatherApp",
  chat:"https://github.com/Nasrin-Code/Oasis_Infobyte_Internship_Projects/tree/main/Python-Task5-ChatApplication",
};
const oasisLI = {
  voice:"https://www.linkedin.com/posts/nasrin512003_oasisinfobyte-pythonprogramming-internship-activity-7489631431896248320-cu_v",
  bmi:"https://www.linkedin.com/posts/nasrin512003_oasisinfobyte-pythonprogramming-internship-activity-7489290460725727232-EuKF",
  password:"https://www.linkedin.com/posts/nasrin512003_oasisinfobyte-pythonprogramming-internship-activity-7489298576028672000-Myt-",
  weather:"https://www.linkedin.com/posts/nasrin512003_oasisinfobyte-pythonprogramming-internship-activity-7489305888130813954-O7xp",
  chat:"https://www.linkedin.com/posts/nasrin512003_oasisinfobyte-pythonprogramming-internship-activity-7489351787666141185-PbXK",
};

export const projects: Project[] = [
 {slug:"enterprise-etl",title:"Enterprise ETL Pipeline & Data Warehouse Synchronizer",period:"2026",tagline:"Production-style API-to-warehouse pipeline orchestrated with Airflow.",overview:"Built an ETL pipeline that extracts data from Stripe and Salesforce APIs, handles pagination, rate limits and transient failures, validates and transforms records, stores raw JSON in S3 and loads structured data into PostgreSQL.",features:["Stripe and Salesforce API extraction","API pagination, rate-limit handling and Tenacity retries","Pydantic/Pydantic Settings validation","Airflow DAG orchestration with extract/transform/load tasks","Raw JSON storage in AWS S3 via Boto3","PostgreSQL loading through SQLAlchemy","Pytest validation and GitHub branch/PR workflow"],stack:["Python","Apache Airflow","Pandas","Pydantic","Pydantic Settings","Tenacity","Boto3","AWS S3","PostgreSQL","SQLAlchemy","Pytest","Stripe API","Salesforce API","Git/GitHub"],github:"https://github.com/Nasrin-Code/Enterprise_ETL_Pipeline_and_Data_Warehouse_Synchronizer",linkedin:"https://www.linkedin.com/posts/nasrin512003_as-part-of-my-python-development-internship-activity-7505264837980004352-nBZs",featured:true,category:"Data Engineering"},
 {slug:"smart-job-tracker",title:"Smart Job Tracker",period:"Apr 2026 – May 2026",tagline:"Streamlit dashboard for tracking applications, status and job-search analytics.",overview:"Interactive job-tracking dashboard with CRUD workflows, filtering, CSV export and analytics for managing applications end to end.",features:["Job search CRUD workflows","Filtering and status tracking","CSV export","Analytics dashboard","Deployed application"],stack:["Python","Streamlit","SQLite","Pandas"],github:"https://github.com/Nasrin-Code/Smart_Job_Tracker",linkedin:"https://www.linkedin.com/posts/nasrin512003_project-showcase-1-smart-job-tracker-built-activity-7467580391739256832-IiSc",demo:"https://smart-job-tracker-nasrin512003.streamlit.app/",featured:true,category:"Backend / Data"},
 {slug:"medicine-reminder",title:"Medicine Reminder App",period:"May 2026 – Jun 2026",tagline:"Full-stack medicine tracker with scheduling and RESTful CRUD.",overview:"Flask application for medicine records, recurring schedules and CRUD operations, deployed as a live web application.",features:["Recurring medication scheduling","RESTful CRUD APIs","SQLAlchemy ORM","Postman endpoint validation","Render deployment"],stack:["Python","Flask","SQLAlchemy","SQLite","REST API","HTML","CSS"],github:"https://github.com/Nasrin-Code/Medicine_Reminder_App",linkedin:"https://www.linkedin.com/posts/nasrin512003_project-showcase-2-medicine-reminder-app-activity-7472312518523113472-JIYN",demo:"https://medicine-reminder-app-j278.onrender.com/",featured:true,category:"Backend"},
 {slug:"iot-safety-band",title:"IoT-Based Wearable Safety Band for Women and Elderly Patients",period:"Feb 2026 – May 2026",tagline:"Wearable IoT system for health monitoring, fall detection and SOS alerts.",overview:"IoT wearable safety project combining embedded sensing, health monitoring, fall detection and emergency alerts, with a mobile-app interface and conference presentation.",features:["Real-time health monitoring","Fall detection using motion sensing","SOS/emergency alerts","Wearable device prototype","Mobile application integration","Conference presentation"],stack:["ESP32","MAX30100","MPU6050","OLED","IoT","Embedded Systems","Python","Mobile App"],images:["/assets/images/1000257190.jpg","/assets/images/1000257188.jpg","/assets/images/1000257186.jpg","/assets/images/1000257192.jpg"],featured:true,category:"IoT / Embedded"},
 {slug:"hand-gesture",title:"Hand Gesture Recognition",period:"Syntecxhub",tagline:"Computer-vision project for recognizing hand gestures.",overview:"AI/computer-vision internship project focused on hand gesture recognition.",features:["Hand gesture recognition","Computer vision workflow"],stack:["Python","OpenCV","Computer Vision"],github:"https://github.com/Nasrin-Code/Syntecxhub_Hand_Gesture_Recognition",category:"AI / ML"},
 {slug:"sentiment-analysis",title:"Sentiment Analysis",period:"Syntecxhub",tagline:"NLP project for classifying text sentiment.",overview:"Natural-language processing project for sentiment analysis during the AI internship.",features:["Text preprocessing","Sentiment classification"],stack:["Python","NLP","Machine Learning"],github:"https://github.com/Nasrin-Code/Syntecxhub_Sentiment_Analysis",category:"AI / ML"},
 {slug:"maze-solver",title:"Maze Solver — A* Algorithm",period:"Syntecxhub",tagline:"Pathfinding visualizer using the A* search algorithm.",overview:"Algorithmic project that solves maze paths using A* search.",features:["A* pathfinding","Grid/maze solving","Algorithmic problem solving"],stack:["Python","A* Algorithm","DSA"],github:"https://github.com/Nasrin-Code/Syntecxhub_Maze_Solver_A_Star",category:"Algorithms"},
 {slug:"object-detection",title:"Object Detection",period:"2026",tagline:"Computer-vision object detection project using OpenCV.",overview:"Object detection implementation using Python and OpenCV.",features:["Image/video processing","Object detection workflow"],stack:["Python","OpenCV","Computer Vision"],github:"https://github.com/Nasrin-Code/Object_Detection_Open-CV",category:"AI / ML"},
 {slug:"voice-assistant",title:"Voice Assistant",period:"OIBSIP",tagline:"Voice-driven desktop assistant with speech recognition and text-to-speech.",overview:"Python voice assistant combining speech recognition, text-to-speech, web search, app launching, weather and reminders.",features:["Voice commands","Text-to-speech","Google search and app launching","OpenWeatherMap integration","Voice-set reminders"],stack:["Python","SpeechRecognition","pyttsx3","Requests","OpenWeatherMap API"],github:oasis.voice,linkedin:oasisLI.voice,category:"Oasis Infobyte"},
 {slug:"chat-application",title:"Multi-user Chat Application",period:"OIBSIP",tagline:"Real-time multi-user chat over sockets and threads.",overview:"Client-server chat application using Python sockets and threading.",features:["Real-time messaging","Multi-user support","Socket programming","Threading"],stack:["Python","Tkinter","Socket Programming","Threading"],github:oasis.chat,linkedin:oasisLI.chat,category:"Oasis Infobyte"},
 {slug:"weather-application",title:"Weather Application",period:"OIBSIP",tagline:"Tkinter GUI for live weather lookups.",overview:"Desktop weather application using OpenWeatherMap API.",features:["Live weather data","Temperature, humidity and wind","Tkinter GUI","REST API integration"],stack:["Python","Tkinter","OpenWeatherMap API"],github:oasis.weather,linkedin:oasisLI.weather,category:"Oasis Infobyte"},
 {slug:"bmi-calculator",title:"BMI Calculator",period:"OIBSIP",tagline:"GUI BMI calculator with SQLite history tracking.",overview:"Tkinter BMI calculator with persistent history storage.",features:["BMI classification","SQLite history","OOP-driven Python"],stack:["Python","Tkinter","SQLite"],github:oasis.bmi,linkedin:oasisLI.bmi,category:"Oasis Infobyte"},
 {slug:"password-generator",title:"Random Password Generator",period:"OIBSIP",tagline:"Configurable password generator with a Tkinter GUI.",overview:"Desktop utility for generating randomized passwords.",features:["Configurable password generation","Tkinter GUI"],stack:["Python","Tkinter"],github:oasis.password,linkedin:oasisLI.password,category:"Oasis Infobyte"},
];

export const internships = [
 {company:"Zaalima Development Pvt. Ltd.",role:"Python Development Intern",period:"25 Jul 2026 – Present",current:true,bullets:["Current internship; working on Python development and the Enterprise ETL Pipeline & Data Warehouse Synchronizer.","Working with Python, ETL/data engineering, APIs, validation, testing, Git/GitHub and Airflow-based orchestration."]},
 {company:"Syntecxhub",role:"AI Intern",period:"18 Aug 2026 – Present",current:true,bullets:["AI internship covering computer vision, NLP and algorithmic projects including Hand Gesture Recognition, Sentiment Analysis, Maze Solver and Object Detection."]},
 {company:"Oasis Infobyte (OIBSIP)",role:"Python Programming Intern",period:"Jul 2026 – Aug 2026",current:false,bullets:["Completed Advanced-tier Python projects including Voice Assistant, Weather Application, BMI Calculator, Random Password Generator and Multi-user Chat Application.","Applied OOP, Git/GitHub, SDLC and structured problem solving under fixed task deadlines."]},
 {company:"Synent Technologies",role:"Python Development Intern",period:"Jul 2026 – Aug 2026",current:false,bullets:["Completed a Python Development internship with practical project work, deadlines, problem solving and collaborative web-project experience."]},
 {company:"Emertxe Information Technologies",role:"IoT Intern",period:"Mar 2026 – Apr 2026",current:false,bullets:["Worked on IoT and embedded development, including the wearable safety-band project for women and elderly patients."]},
 {company:"Power Integrated Solutions",role:"Embedded Systems Intern",period:"Jul 2025 – Aug 2025",current:false,bullets:["Completed an embedded-systems internship with hands-on exposure to embedded development and electronics-focused problem solving."]},
];

export const certifications = [
 ["Saviynt Identity Security for AI Age","Saviynt","Dec 2025"],
 ["30 Days MasterClass in Data Analytics","NoviTech R&D Pvt. Ltd.","Feb – Mar 2025"],
 ["30 Days MasterClass in Artificial Intelligence","NoviTech R&D Pvt. Ltd.","May – Jun 2025"],
 ["30 Days MasterClass in Internet of Things","NoviTech R&D Pvt. Ltd.","Mar – Apr 2025"],
 ["Building Smarter Pipelines: A Deep Dive into CI/CD","NoviTech R&D Pvt. Ltd.","Apr 2025"],
 ["Cybersecurity Analyst Job Simulation","Tata, via Forage","Jan 2026"],
 ["Python Programming Workshop","NIT Trichy Pragyan","Feb 2025"],
 ["Excel Essential Training (Microsoft 365)","LinkedIn Learning","Nov 2025"],
 ["Generative AI","LinkedIn Learning","Oct 2025"],
 ["C Programming for Embedded Applications","LinkedIn Learning","Nov 2025"],
 ["Python Programming, OOP, DBMS, SQL, NoSQL","Infosys Springboard","Mar – May 2026"],
 ["Software Engineering & Agile Development, Agile Scrum in Practice","Infosys Springboard","May 2026"],
 ["Ignite Bootcamp – Venture Idea Development","Wadhwani Foundation","Mar 2026"],
 ["Road Safety Pledge","Government of Tamil Nadu","Jan 2026"],
 ["Generative AI Exam Certificate — Score 56","IUQKTEST","2026"],
];

export const certificateImages = [
 "/assets/images/1000257180.jpg","/assets/images/1000089693.jpg","/assets/images/1000101745.jpg","/assets/images/1000089694.jpg","/assets/images/1000089690.jpg","/assets/images/1000257176.jpg","/assets/images/1000257174.jpg","/assets/images/1000257178.jpg","/assets/images/1000257172.jpg","/assets/images/1000257182.jpg","/assets/images/1000214058.png","/assets/images/1000214054.png","/assets/images/1000089692.jpg","/assets/images/1000089691.jpg","/assets/images/1000257192.jpg"
];

export const education = [
 ["B.E. Electronics and Communication Engineering","M.I.E.T. Engineering College, Tiruchirappalli, Tamil Nadu","CGPA: 8.58/10","Sep 2022 – May 2026"],
 ["Higher Secondary Certificate","Swami Vivekananda Matriculation Higher Secondary School","92%",""] ,
 ["Secondary School Leaving Certificate","Swami Vivekananda Matriculation Higher Secondary School","95%",""]
];
