/**
 * TaskFlow SaaS Landing Page JavaScript
 * Includes: Theme Toggle, Mobile Navigation Menu, Form Validation, and Blog API Fetch.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Module Components
  initThemeToggle();
  initMobileMenu();
  initFormValidation();
  initBlogFetch();
  initStickyHeader();
});

/**
 * ==========================================================================
 * Sticky Header Transition
 * ==========================================================================
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }, { passive: true });
}

/**
 * ==========================================================================
 * Theme Management Module (Light / Dark Mode)
 * ==========================================================================
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (!themeToggleBtn) return;

  // Retrieve theme preference or fall back to system preferences
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  // Set event listener for theme toggle click
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update Accessibility state
    themeToggleBtn.setAttribute('aria-pressed', theme === 'dark');
    themeToggleBtn.setAttribute(
      'aria-label', 
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

/**
 * ==========================================================================
 * Mobile Menu Module
 * ==========================================================================
 */
function initMobileMenu() {
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerToggle || !navMenu) return;

  hamburgerToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburgerToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
      
      // Update active state visual indicators
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  function toggleMenu() {
    const isOpen = hamburgerToggle.getAttribute('aria-expanded') === 'true';
    hamburgerToggle.setAttribute('aria-expanded', !isOpen);
    navMenu.classList.toggle('open');
    
    // Prevent scrolling behind mobile menu drawer
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  }

  // Keyboard accessibility: Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu();
      hamburgerToggle.focus();
    }
  });
}

/**
 * ==========================================================================
 * Contact Form Client-Side Validation Module
 * ==========================================================================
 */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const charCounter = document.getElementById('char-counter');
  
  const formSuccess = document.getElementById('form-success');
  const successCloseBtn = document.getElementById('success-close-btn');

  if (!form) return;

  // Real-time character counter for textarea message field
  messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charCounter.textContent = `${length} / 10 chars min`;
    
    if (length >= 10) {
      charCounter.classList.add('valid');
    } else {
      charCounter.classList.remove('valid');
    }
    
    // Clear validation error dynamically once condition is met
    if (length >= 10 && messageInput.classList.contains('invalid')) {
      clearError(messageInput, 'message-error');
    }
  });

  // Real-time input clearing validation styles
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() !== '' && nameInput.classList.contains('invalid')) {
      clearError(nameInput, 'name-error');
    }
  });

  emailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value.trim()) && emailInput.classList.contains('invalid')) {
      clearError(emailInput, 'email-error');
    }
  });

  // Form Submission Interception
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      // Simulation of submission success
      showSuccessScreen();
    } else {
      // Focus on first invalid input element
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  // Reset form success screen trigger
  successCloseBtn.addEventListener('click', () => {
    formSuccess.classList.add('hide');
    form.classList.remove('hide');
    form.reset();
    charCounter.textContent = '0 / 10 chars min';
    charCounter.classList.remove('valid');
    nameInput.focus();
  });

  // Helper validation functions
  function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
      showError(nameInput, 'name-error', 'Full Name is required.');
      return false;
    }
    clearError(nameInput, 'name-error');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
      showError(emailInput, 'email-error', 'Email Address is required.');
      return false;
    } else if (!emailRegex.test(value)) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      return false;
    }
    clearError(emailInput, 'email-error');
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
      showError(messageInput, 'message-error', 'Message is required.');
      return false;
    } else if (value.length < 10) {
      showError(messageInput, 'message-error', 'Message must be at least 10 characters.');
      return false;
    }
    clearError(messageInput, 'message-error');
    return true;
  }

  function showError(input, errorId, message) {
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorId);
    
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  function clearError(input, errorId) {
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  }

  function showSuccessScreen() {
    form.classList.add('hide');
    formSuccess.classList.remove('hide');
    formSuccess.focus();
  }
}

/**
 * ==========================================================================
 * Blog Section API Integration Module (Fetch JSONPlaceholder API)
 * ==========================================================================
 */
function initBlogFetch() {
  const loader = document.getElementById('blog-loader');
  const grid = document.getElementById('blog-grid');
  const errorPanel = document.getElementById('blog-error');
  const emptyPanel = document.getElementById('blog-empty');
  const retryBtn = document.getElementById('blog-retry-btn');

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';
  
  // Blog Topics categories helper
  const BLOG_TAGS = ['Productivity', 'Engineering', 'Agile Sprints', 'Collaboration', 'Product Tech', 'Operations'];

  // High-quality English equivalents of the first 6 mock posts
  const ENGLISH_POSTS = [
    {
      title: "How to run highly effective daily standups",
      body: "Daily standups can make or break a sprint cycle. Learn how we structure our 15-minute syncs to align engineering resources, clear workflow blockers, and maintain project momentum."
    },
    {
      title: "Optimizing your CI/CD pipelines for delivery speed",
      body: "Build times directly affect developer happiness and shipping speed. Explore key strategies like caching dependencies and parallelizing testing suites to achieve sub-minute build pipelines."
    },
    {
      title: "Mastering story points estimation in agile teams",
      body: "Story points are about complexity, not hours. Discover the Fibonacci estimating method and learn how to run collaborative planning sessions that reduce sprint carryover."
    },
    {
      title: "Designing cross-functional feedback channels",
      body: "Friction between product, design, and engineering slows down feature releases. Discover how unified feedback channels and design system tokens keep your teams fully aligned."
    },
    {
      title: "Selecting the right monitoring stack for SaaS platforms",
      body: "Real-time error logging and database query telemetry are crucial. We break down the trade-offs between Datadog, Prometheus, and OpenTelemetry for modern microservices."
    },
    {
      title: "Scaling database reads with redis caching strategies",
      body: "As your user base grows, direct database queries become a performance bottleneck. Learn how we implement cache-aside and write-through caching to lower database latency."
    }
  ];

  // Trigger initial fetch
  fetchBlogPosts();

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      fetchBlogPosts();
    });
  }

  async function fetchBlogPosts() {
    showState(loader);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const posts = await response.json();
      
      if (!posts || posts.length === 0) {
        showState(emptyPanel);
      } else {
        renderBlogGrid(posts.slice(0, 6));
        showState(grid);
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      showState(errorPanel);
    }
  }

  function showState(visibleElement) {
    // Hide all states
    loader.classList.add('hide');
    grid.classList.add('hide');
    errorPanel.classList.add('hide');
    emptyPanel.classList.add('hide');
    
    // Show target state element
    visibleElement.classList.remove('hide');
  }

  function renderBlogGrid(posts) {
    grid.innerHTML = ''; // Clear previous items if any
    
    posts.forEach((post, index) => {
      const tag = BLOG_TAGS[index % BLOG_TAGS.length];
      const readTime = `${4 + (index % 3)} min read`;
      
      // Use premium English mapped values if available for first 6 posts, otherwise fallback
      const displayTitle = ENGLISH_POSTS[index] ? ENGLISH_POSTS[index].title : post.title;
      const displayBody = ENGLISH_POSTS[index] ? ENGLISH_POSTS[index].body : post.body.replace(/\n/g, ' ');
      
      const blogCard = document.createElement('article');
      blogCard.className = 'blog-card';
      blogCard.innerHTML = `
        <div class="blog-card-meta">
          <span class="blog-card-tag">${tag}</span>
          <span class="blog-card-read">${readTime}</span>
        </div>
        <div class="blog-card-body">
          <h3 class="blog-card-title">${displayTitle}</h3>
          <p class="blog-card-desc">${displayBody}</p>
        </div>
      `;
      grid.appendChild(blogCard);
    });
  }
}
