// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const preloader = document.querySelector('.preloader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-item');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const forms = document.querySelectorAll('form');
    
    let currentSlide = 0;
    const slideWidth = 100; // percentage
    
    // Remove preloader after content loads
    window.addEventListener('load', function() {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Reveal elements on scroll
      revealOnScroll();
      
      // Highlight active nav item based on scroll position
      highlightNavOnScroll();
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile nav when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Tabs functionality
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Testimonial slider functionality
    function updateSlider() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }
    
    // Testimonial slider functionality
    let testimonialTimer; // Variable to hold the timer

    function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Reset the auto-advance timer
    clearInterval(testimonialTimer);
    startAutoAdvance();
    }

    // Function to start auto-advance
    function startAutoAdvance() {
    testimonialTimer = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
        });
    }, 10000); // Change slide every 10 seconds
    }

    // Next slide button
    nextBtn.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateSlider();
    });

    // Previous slide button
    prevBtn.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateSlider();
    });

    // Indicator buttons
    indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
        currentSlide = index;
        updateSlider();
    });
    });

    // Start the auto-advance when the page loads
    startAutoAdvance();
    
    // Reveal animations on scroll
    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('revealed');
        }
      });
    }
    
    // Call once on page load to reveal elements above the fold
    setTimeout(revealOnScroll, 500);
    
    // Highlight active nav item based on scroll position
    function highlightNavOnScroll() {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
          item.classList.add('active');
        }
      });
    }
    
    // Form submission (prevent default and show alert for demo)
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formType = form.closest('section').id;
        let message = '';
        
        if (formType === 'register') {
          message = 'Registration submitted successfully! We\'ll contact you shortly.';
        } else if (formType === 'contact') {
          message = 'Message sent successfully! We\'ll respond as soon as possible.';
        }
        
        alert(message);
        form.reset();
      });
    });
    
    // Initialize the basketball lines animation
    const basketball = document.querySelector('.basketball');
    if (basketball) {
      // Random rotation for the basketball lines
      setInterval(() => {
        const randomRotation = Math.floor(Math.random() * 360);
        basketball.querySelector('.lines').style.transform = `rotate(${randomRotation}deg)`;
      }, 2000);
    }
  });

// Basketball animation - add this at the END of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      // Find the basketball emoji
      const basketballEmoji = document.querySelector('.basketball-emoji');
      if (basketballEmoji) {
        // Remove the inline style that's preventing animation
        basketballEmoji.removeAttribute('style');
        // Add the animation class
        basketballEmoji.classList.add('animate');
        console.log('Basketball animation triggered'); // Debug message
      }
    }, 2000); // Wait 2 seconds after page load
  });

// EmailJS Integration - Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("QjRc5AMeMvazQQTQ1");
    
    // Get the contact form element
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show sending state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.classList.remove('success', 'error');
        
        // Send the email using EmailJS
        emailjs.sendForm('service_mqr9b6a', 'template_zzt591o', this)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            formStatus.textContent = 'Message sent successfully!';
            formStatus.classList.add('success');
            contactForm.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Send Message';
            }, 2000);
          }, function(error) {
            console.log('FAILED...', error);
            formStatus.textContent = 'Failed to send message. Please try again.';
            formStatus.classList.add('error');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          });
      });
    }
  });