        const { useState, useEffect, useRef } = React;

        // Theme Context
        const ThemeContext = React.createContext();

        const ThemeProvider = ({ children }) => {
            const [isDark, setIsDark] = useState(() => {
                const saved = localStorage.getItem('theme');
                return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
            });

            useEffect(() => {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                if (isDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }, [isDark]);

            return (
                <ThemeContext.Provider value={{ isDark, setIsDark }}>
                    {children}
                </ThemeContext.Provider>
            );
        };

        // Navigation Component
        const Navigation = () => {
            const { isDark, setIsDark } = React.useContext(ThemeContext);
            const [isMenuOpen, setIsMenuOpen] = useState(false);
            const [activeSection, setActiveSection] = useState('hero');

            useEffect(() => {
                const handleScroll = () => {
                    const sections = ['hero', 'about', 'blog', 'skills', 'projects', 'experience', 'education', 'contact'];
                    const current = sections.find(section => {
                        const element = document.getElementById(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            return rect.top <= 100 && rect.bottom >= 100;
                        }
                        return false;
                    });
                    if (current) setActiveSection(current);
                };

                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);

            const navItems = [
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'blog', label: 'Blog' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'contact', label: 'Contact' }
            ];

            const scrollToSection = (sectionId) => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
            };

            return (
                <nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                                Maryam Mahmoudi
                            </div>
                            
                            {/* Desktop Navigation */}
                            <div className="hidden md:flex space-x-8">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            activeSection === item.id
                                                ? 'text-primary-light dark:text-primary-dark bg-blue-50 dark:bg-blue-900/20'
                                                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Theme Toggle */}
                                <button
                                    onClick={() => setIsDark(!isDark)}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {isDark ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                                </button>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                                >
                                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {isMenuOpen && (
                            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="block w-full text-left px-3 py-2 text-base font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            );
        };

        // Hero Section
        const Hero = () => {
            const [displayText, setDisplayText] = useState('');
            const [currentIndex, setCurrentIndex] = useState(0);
            const titles = ['AI-Powered Backend Developer', 'Data Scientist', 'Machine Learning Engineer', 'Python Developer'];
            const [titleIndex, setTitleIndex] = useState(0);

            useEffect(() => {
                const currentTitle = titles[titleIndex];
                if (currentIndex < currentTitle.length) {
                    const timeout = setTimeout(() => {
                        setDisplayText(currentTitle.slice(0, currentIndex + 1));
                        setCurrentIndex(currentIndex + 1);
                    }, 100);
                    return () => clearTimeout(timeout);
                } else {
                    const timeout = setTimeout(() => {
                        setCurrentIndex(0);
                        setDisplayText('');
                        setTitleIndex((titleIndex + 1) % titles.length);
                    }, 2000);
                    return () => clearTimeout(timeout);
                }
            }, [currentIndex, titleIndex]);

            return (
                <section id="hero" className="min-h-screen flex items-center justify-center gradient-bg pt-20 md:pt-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="fade-in">
                            <div className="mb-8">
                                <img 
                                    src="me.png"
                                    alt="Maryam Mahmoudi"
                                    className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-2xl object-cover"
                                />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                Maryam Mahmoudi
                            </h1>
                            <div className="text-2xl md:text-3xl text-blue-100 mb-4 h-12">
                                <span className="typing-animation">{displayText}</span>
                            </div>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Transforming data into intelligent solutions with cutting-edge AI and robust backend systems
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white text-primary-light font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    <i className="fas fa-code mr-2"></i>View Projects
                                </button>
                                <button 
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = '#';
                                        link.download = 'Maryam_Mahmoudi_Resume.pdf';
                                        link.click();
                                    }}
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-light transition-colors"
                                >
                                    <i className="fas fa-download mr-2"></i>Download Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // About Section
        const About = () => {
            return (
                <section id="about" className="py-20 bg-light-bg dark:bg-dark-bg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                About Me
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto"></div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
                                    Passionate About AI & Backend Excellence
                                </h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 leading-relaxed">
                                    I'm a dedicated Data Scientist and Backend Developer with extensive expertise in AI and Machine Learning. 
                                    My passion lies in creating intelligent systems that solve real-world problems through innovative technology.
                                </p>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 leading-relaxed">
                                    With a strong foundation in Python, Django, and cutting-edge ML frameworks, I specialize in building 
                                    scalable backend solutions and implementing AI-driven features that enhance user experiences and business outcomes.
                                </p>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 leading-relaxed">
                                    I thrive in international and remote team environments, bringing cross-cultural collaboration skills 
                                    and a global perspective to every project I undertake.
                                </p>
                                <button 
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = '#';
                                        link.download = 'Maryam_Mahmoudi_CV.pdf';
                                        link.click();
                                    }}
                                    className="px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
                                >
                                    <i className="fas fa-file-pdf mr-2"></i>Download Full CV
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // Blog Section
        const Blog = () => {
            const blogPosts = [
                {
                    title: "How I Used LLMs and LangChain to Understand Customer Emotions and Behaviors in Real-Time",
                    description: "A comprehensive guide on implementing real-time customer sentiment analysis using Large Language Models and LangChain framework.",
                    url: "https://medium.com/@mahmoodi.maryam1993/how-i-used-llms-and-langchain-to-understand-customer-emotions-and-behaviors-in-real-time-89c64bedd3d4",
                    date: "2025",
                    readTime: "5 min read",
                    tags: ["LLM", "LangChain", "Sentiment Analysis", "Customer Analytics"],
                    image: "LLMs and LangChain to Understand Customer Emotions and Behaviors in Real-Time.png"
                }
            ];

            return (
                <section id="blog" className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                Latest Blog Posts
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto"></div>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mt-6">
                                Sharing insights and experiences from my journey in AI and data science
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <article key={index} className="bg-light-bg dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="aspect-video overflow-hidden">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                                {post.date}
                                            </span>
                                            <span className="text-sm text-accent-light dark:text-accent-dark font-medium">
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-3 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
                                            {post.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.map((tag, tagIndex) => (
                                                <span 
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-primary-light/10 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark rounded text-xs font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <a 
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-accent-light dark:text-accent-dark hover:text-accent-dark dark:hover:text-accent-light font-medium transition-colors"
                                        >
                                            Read on Medium
                                            <i className="fas fa-external-link-alt ml-2"></i>
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                        
                        <div className="text-center mt-12">
                            <a 
                                href="https://medium.com/@mahmoodi.maryam1993"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
                            >
                                <i className="fab fa-medium mr-2"></i>
                                View All Posts
                            </a>
                        </div>
                    </div>
                </section>
            );
        };

        // Skills Section
        const Skills = () => {
            const skillCategories = [
                {
                    title: 'Languages',
                    icon: 'fas fa-code',
                    skills: ['Python', 'PHP', 'SQL', 'HTML/CSS']
                },
                {
                    title: 'Frameworks',
                    icon: 'fas fa-layer-group',
                    skills: ['Django', 'Flask', 'FastAPI', 'Selenium', 'Jinja2']
                },
                {
                    title: 'AI/ML Libraries',
                    icon: 'fas fa-brain',
                    skills: ['TensorFlow', 'PyTorch', 'HuggingFace', 'Transformers', 'LangChain', 'OpenAI API']
                },
                {
                    title: 'DevOps & Tools',
                    icon: 'fas fa-tools',
                    skills: ['Docker', 'Git', 'Redis', 'Linux', 'Agile', 'Testing']
                },
                {
                    title: 'Databases',
                    icon: 'fas fa-database',
                    skills: ['PostgreSQL', 'MySQL', 'SQLAlchemy', 'Redis']
                },
                {
                    title: 'APIs & Integration',
                    icon: 'fas fa-plug',
                    skills: ['RESTful API', 'FastAPI', 'OpenAI API', 'Third-party Integrations']
                }
            ];

            return (
                <section id="skills" className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                Technical Skills
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto"></div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skillCategories.map((category, index) => (
                                <div key={index} className="skill-card bg-light-bg dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <i className={`${category.icon} text-2xl text-primary-light dark:text-primary-dark mr-3`}></i>
                                        <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex}
                                                className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );
        };

        // Projects Section
        const Projects = () => {
            const projects = [
                {
                    title: 'AI-Powered Customer Chat Analyzer',
                    description: 'A modular and production-ready AI system for analyzing, summarizing, and classifying customer conversations using LangChain, HuggingFace Transformers, and Redis. It enables session-based summarization, sentiment analysis, and topic categorization with a simple web UI.',
                    tech: ['Python', 'LangChain', 'OpenAI GPT', 'HuggingFace Transformers', 'FastAPI', 'Redis', 'HTML/CSS', 'Jinja2'],
                    features: [
                        "Summarizes customer chats using LangChain and OpenAI models",
                        "Stores and manages chat sessions in Redis",
                        "Performs sentiment analysis using fine-tuned HuggingFace models (positive, negative, neutral)",
                        "Implements automatic topic classification (e.g., complaint, inquiry, purchase intent)",
                        "RESTful API developed with FastAPI for integration and automation",
                        "Minimal web UI with HTML/CSS and Jinja2 templates",
                        "Modular architecture for easy maintenance and production deployment"
                      ],
                    github: 'https://github.com/maryammahmoudi1993/ChatSummerizer',
                    demo: '#',
                    tags: ["AI", "LangChain", "NLP", "FastAPI", "Chat Analysis", "Redis", "Transformers", "Summarization"]
                },
                {
                    title: 'Neural Machine Translation (English ↔ Spanish)',
                    "description": "A sequence-to-sequence (Seq2Seq) machine translation system built with an encoder-decoder architecture for English to Spanish and vice versa translation.",
                    tech: ["Python", "TensorFlow", "Seq2Seq", "LSTM", "Attention"],
                    "features": [
                        "Bi-directional translation (English ↔ Spanish)",
                        "Encoder-Decoder architecture with attention mechanism",
                        "Tokenization and preprocessing pipeline",
                        "BLEU score evaluation for model performance",
                        "Custom vocabulary and padding strategy"
                    ],
                    "github": "https://github.com/maryammahmoudi1993/Translation-spanish-english",
                    "demo": "",
                    "tags": ["NLP", "Seq2Seq", "Machine Translation", "Deep Learning", "TensorFlow"]
                },
                {
                    "title": "Object Detection Using Vision Transformers (ViT)",
                    "description": "Developed an object detection model using Vision Transformer (ViT) architecture for accurate recognition and localization in images.",
                    "tech": ["Python", "TensorFlow", "Vision Transformer (ViT)", "OpenCV"],
                    "features": [
                      "Image classification and object detection using ViT",
                      "Pretrained model fine-tuning with custom datasets",
                      "Visualization of bounding boxes and detection confidence",
                      "TensorFlow-based training and evaluation pipeline"
                    ],
                    "github": "",
                    "demo": "",
                    "tags": ["Computer Vision", "ViT", "Object Detection", "Transformers", "TensorFlow"]
                  },
                // {
                //     title: 'Intelligent Document Processing',
                //     description: 'Developed an AI-powered system for extracting and processing information from various document formats using OCR and NLP.',
                //     tech: ['Python', 'OpenAI API', 'LangChain', 'Django', 'Celery'],
                //     features: ['Multi-format support', 'Automated extraction', 'High accuracy'],
                //     github: '#',
                //     demo: '#',
                //     tags: ['NLP', 'OCR', 'Automation']
                // }
            ];

            return (
                <section id="projects" className="py-20 bg-light-bg dark:bg-dark-bg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                Featured Projects
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto"></div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <div key={index} className="project-card bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                                                {project.title}
                                            </h3>
                                            <div className="flex space-x-2">
                                                <a 
                                                    href={project.github}
                                                    className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                                                >
                                                    <i className="fab fa-github text-xl"></i>
                                                </a>
                                                <a 
                                                    href={project.demo}
                                                    className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                                                >
                                                    <i className="fas fa-external-link-alt text-xl"></i>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                                            {project.description}
                                        </p>
                                        
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Key Features:</h4>
                                            <ul className="list-disc list-inside text-text-secondary-light dark:text-text-secondary-dark">
                                                {project.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, techIndex) => (
                                                    <span 
                                                        key={techIndex}
                                                        className="px-2 py-1 bg-accent-light/10 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark rounded text-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span 
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark rounded-full text-sm font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );
        };

        // Experience Section
        const Experience = () => {
            const experiences = [
                {
                    company: 'Inboxino',
                    role: 'Python Developer',
                    location: 'Mashhad, Iran',
                    period: 'August 2024 - July 2025',
                    achievements: [
                        'Developed automation tools and custom bots using Python',
                        'Built and maintained backend services in PHP for scalable systems',
                        'Contributed to business intelligence dashboards and reporting pipelines',
                        'Collaborated across data and backend teams for system integration'
                    ]
                },
                {
                    company: 'Hamta Rayaneh Research and Information Company',
                    role: 'Data Scientist & BI Developer',
                    location: 'Mashhad, Iran',
                    period: 'September 2021 - August 2024',
                    achievements: [
                        'Implemented deep learning models with TensorFlow to handle large datasets (50K+ records)',
                        'Reduced data processing time significantly through optimized pipelines',
                        'Improved prediction model accuracy by 18% in internal forecasting projects',
                        'Successfully deployed ML models in 3 commercial company projects'
                    ]
                },
                {
                    company: 'Toos-Tech GmbH',
                    role: 'AI Engineer (Computer Vision)',
                    location: 'Cologne, Germany (Remote)',
                    period: 'March 2020 - February 2022',
                    achievements: [
                        'Developed object detection models achieving 90% accuracy on a 1,000-image test set',
                        'Used Transformer-based models (ViT) for enhanced real-time performance',
                        'Reduced image processing runtime by 30% for real-time object recognition',
                        'Contributed to building scalable pipelines for image analysis and deployment'
                    ]
                }
            ];
            

            return (
                <section id="experience" className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                Professional Experience
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto"></div>
                        </div>
                        
                        <div className="space-y-8">
                            {experiences.map((exp, index) => (
                                <div key={index} className="bg-light-bg dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                                                {exp.role}
                                            </h3>
                                            <h4 className="text-lg text-primary-light dark:text-primary-dark font-medium">
                                                {exp.company}
                                            </h4>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                                <i className="fas fa-map-marker-alt mr-2"></i>{exp.location}
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span className="px-3 py-1 bg-accent-light/10 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark rounded-full text-sm font-medium">
                                                {exp.period}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.achievements.map((achievement, achIndex) => (
                                            <li key={achIndex} className="flex items-start text-text-secondary-light dark:text-text-secondary-dark">
                                                <i className="fas fa-check-circle text-accent-light dark:text-accent-dark mr-3 mt-1 flex-shrink-0"></i>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );
        };

        // Education Section
        const Education = () => {
            const education = [
                {
                    degree: 'Master of Science in Electrical Engineering – Telecommunications',
                    university: 'Ferdowsi University of Mashhad',
                    period: 'September 2016 – September 2021',
                    thesis: 'Osteoporosis Assessment Using Ultrasound Waves with Deep Learning',
                    gpa: '17.17 / 20'
                },
                {
                    degree: 'Bachelor of Science in Biomedical Engineering – Bioelectric',
                    university: 'Sajad University of Technology',
                    period: 'September 2011 – September 2015',
                    thesis: 'Epileptic Seizure Prediction with Neural Networks',
                    gpa: '16 / 20'
                }
            ];;

            const certificates = [
                'Scientific Poster Presentation Certificate – University of Isfahan & Iranian ICT Association (May 2025)',
                'Appreciation for Reviewing – 14th ICCKE Conference, Ferdowsi University of Mashhad (March 2025)',
                'Deep Learning with TensorFlow 2 – 365 Data Science (2022)',
                'Time Series Analysis with Python – 365 Data Science (2022)'
            ];
            
            

            const publications = [
                {
                    title: 'Energy-aware Workflow Scheduling in Cloud Computing: DVFS-enabled under Deadline Constraint',
                    conference: '29th International Conference on Power Distribution Networks (EPDC), IEEE',
                    year: '2025',
                    doi: '#'
                },
                {
                    title: 'A Demand Response Schema in Industry: Smart Scheduling Approach for Industrial Processes',
                    conference: '15th International Conference on Information and Knowledge Technology (IKT), IEEE',
                    year: '2024',
                    doi: 'https://ieeexplore.ieee.org/abstract/document/10892614'
                },
                {
                    title: 'Controlling Energy Consumption and Intelligent Manufacturing through an Energy-Aware Scheduling Algorithm in Industrial Sector',
                    conference: '32nd International Conference on Electrical Engineering (ICEE)',
                    year: '2024',
                    doi: 'https://iceeconf.ir/home/Article/d35375f3-00ba-4b58-8fe3-77d0c01c59f2'
                },
                {
                    title: 'Understanding Charging and Power Dynamics in Electric Bus Fleets: A six-Month Case Study of Utah Transit Authority',
                    conference: '27th IEEE International Conference on Intelligent Transportation Systems (ITSC), Submitted',
                    year: '2024',
                    doi: '#'
                }
            ];
            

            return (
                <section id="education" className="py-20 bg-light-bg dark:bg-dark-bg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                Education & Achievements
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto"></div>
                        </div>
                        
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Education */}
                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
                                    Academic Background
                                </h3>
                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                                            <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-primary-light dark:text-primary-dark font-medium mb-2">
                                                {edu.university}
                                            </p>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-2">
                                                {edu.period} | GPA: {edu.gpa}
                                            </p>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                                <strong>Thesis:</strong> {edu.thesis}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Publications */}
                                <h3 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-6 mt-12">
                                    Publications
                                </h3>
                                <div className="space-y-4">
                                    {publications.map((pub, index) => (
                                        <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                                            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                                                {pub.title}
                                            </h4>
                                            <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                                {pub.conference} ({pub.year})
                                                <a href={pub.doi} className="text-primary-light dark:text-primary-dark ml-2 hover:underline">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Certificates */}
                            <div>
                                <h3 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
                                    Certificates & Awards
                                </h3>
                                <div className="space-y-4">
                                    {certificates.map((cert, index) => (
                                        <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                                            <div className="flex items-center">
                                                <i className="fas fa-certificate text-accent-light dark:text-accent-dark mr-3"></i>
                                                <span className="text-text-primary-light dark:text-text-primary-dark">
                                                    {cert}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                                    <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                                        Conference Activities
                                    </h4>
                                    <ul className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
                                        <li><i className="fas fa-user-check text-accent-light dark:text-accent-dark mr-2"></i>Peer Reviewer - IEEE Conferences</li>
                                        <li><i className="fas fa-presentation text-accent-light dark:text-accent-dark mr-2"></i>Poster Presenter - ICEE 2020</li>
                                        <li><i className="fas fa-gavel text-accent-light dark:text-accent-dark mr-2"></i>Technical Committee Member</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // Contact Section
        const Contact = () => {
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                message: ''
            });

            const handleSubmit = (e) => {
                e.preventDefault();
                // Demo functionality - in real implementation, this would send the email
                alert('Thank you for your message! This is a demo form. In a real implementation, your message would be sent.');
                setFormData({ name: '', email: '', message: '' });
            };

            const handleChange = (e) => {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                });
            };

            return (
                <section id="contact" className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                                Get In Touch
                            </h2>
                            <div className="w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto mb-6"></div>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
                                I'm always interested in new opportunities and collaborations. 
                                Let's discuss how we can work together to create something amazing!
                            </p>
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-text-primary-light dark:text-text-primary-dark font-medium mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-slate-800 text-text-primary-light dark:text-text-primary-dark"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-text-primary-light dark:text-text-primary-dark font-medium mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-slate-800 text-text-primary-light dark:text-text-primary-dark"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-text-primary-light dark:text-text-primary-dark font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent bg-white dark:bg-slate-800 text-text-primary-light dark:text-text-primary-dark"
                                            placeholder="Tell me about your project or opportunity..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-primary-light dark:bg-primary-dark text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
                                    >
                                        <i className="fas fa-paper-plane mr-2"></i>Send Message
                                    </button>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark text-center">
                                        <i className="fas fa-info-circle mr-1"></i>
                                        This is a demo form. In production, messages would be sent via email.
                                    </p>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <div className="bg-light-bg dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                                    <h3 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
                                        Let's Connect
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center">
                                            <i className="fas fa-envelope text-2xl text-primary-light dark:text-primary-dark mr-4"></i>
                                            <div>
                                                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Email</p>
                                                <a href="mailto:mahmoodi.maryam1993@gmail.com" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark">
                                                mahmoodi.maryam1993@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <i className="fab fa-linkedin text-2xl text-primary-light dark:text-primary-dark mr-4"></i>
                                            <div>
                                                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">LinkedIn</p>
                                                <a href="#" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark">
                                                https://www.linkedin.com/in/maryam-mahmoudi-8882857b/
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <i className="fab fa-github text-2xl text-primary-light dark:text-primary-dark mr-4"></i>
                                            <div>
                                                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">GitHub</p>
                                                <a href="#" className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark">
                                                https://github.com/maryammahmoudi1993
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <i className="fas fa-map-marker-alt text-2xl text-primary-light dark:text-primary-dark mr-4"></i>
                                            <div>
                                                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Location</p>
                                                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                                    Available for Remote Work Worldwide
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                                            Follow me on social media for updates on my latest projects and insights:
                                        </p>
                                        <div className="flex space-x-4">
                                            <a href="#" className="text-2xl text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="#" className="text-2xl text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                                                <i className="fab fa-medium"></i>
                                            </a>
                                            <a href="#" className="text-2xl text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                                                <i className="fab fa-dev"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        };

        // Footer Component
        const Footer = () => {
            const scrollToTop = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            return (
                <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Maryam Mahmoudi</h3>
                                <p className="text-gray-300 mb-4">
                                    AI-Powered Backend Developer & Data Scientist passionate about creating 
                                    intelligent solutions that make a difference.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <i className="fab fa-linkedin text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <i className="fab fa-github text-xl"></i>
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <i className="fab fa-twitter text-xl"></i>
                                    </a>
                                    <a href="mailto:maryam.mahmoudi@example.com" className="text-gray-300 hover:text-white transition-colors">
                                        <i className="fas fa-envelope text-xl"></i>
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">About</button></li>
                                    <li><button onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">Skills</button></li>
                                    <li><button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">Projects</button></li>
                                    <li><button onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">Experience</button></li>
                                    <li><button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">Contact</button></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Specializations</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Machine Learning & AI</li>
                                    <li>• Backend Development</li>
                                    <li>• Data Science & Analytics</li>
                                    <li>• Natural Language Processing</li>
                                    <li>• API Development</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-300 text-sm">
                                © 2024 Maryam Mahmoudi. All rights reserved.
                            </p>
                            <button 
                                onClick={scrollToTop}
                                className="mt-4 md:mt-0 px-4 py-2 bg-primary-light hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                <i className="fas fa-arrow-up mr-2"></i>Back to Top
                            </button>
                        </div>
                    </div>
                </footer>
            );
        };

        // Main App Component
        const App = () => {
            return (
                <ThemeProvider>
                    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
                        <Navigation />
                        <Hero />
                        <About />
                        <Blog />
                        <Skills />
                        <Projects />
                        <Experience />
                        <Education />
                        <Contact />
                        <Footer />
                    </div>
                </ThemeProvider>
            );
        };

        // Render the app
        ReactDOM.render(<App />, document.getElementById('root')); 