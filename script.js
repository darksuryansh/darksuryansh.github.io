/* PORTFOLIO INTERACTIVE FUNCTIONALITY*/

/* TYPING ANIMATION*/

const typingText = document.getElementById('typing-text');
const phrases = [
    'Intelligent AI Models.',
    'Dynamic Full-Stack Applications.',
    'Scalable Web Solutions.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

/**
 * Typewriter effect for hero section
 */
function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Delete characters
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    // Check if phrase is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        isEnd = true;
        // Wait before starting to delete
        setTimeout(() => {
            isDeleting = true;
        }, 1500);
    } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isEnd = false;
    }

    // Adjust typing speed
    const typingSpeed = isDeleting ? 50 : isEnd ? 1000 : 100;
    setTimeout(typeWriter, typingSpeed);
}


/* SMOOTH SCROLLING*/

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


/* MOBILE MENU
 */

/**
 * Create and setup mobile menu
 */
function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden fixed inset-0 bg-gray-900/95 z-50 flex flex-col items-center justify-center hidden';
    mobileMenu.innerHTML = `
        <button class="mobile-menu-close absolute top-6 right-6 p-2" aria-label="Close menu">
            <i data-feather="x" class="w-8 h-8"></i>
        </button>
        <div class="flex flex-col items-center space-y-8">
            <a href="#home" class="text-2xl hover:text-primary-500 transition-colors">Home</a>
            <a href="#about" class="text-2xl hover:text-primary-500 transition-colors">About</a>
            <a href="#projects" class="text-2xl hover:text-primary-500 transition-colors">Projects</a>
            <a href="#experience" class="text-2xl hover:text-primary-500 transition-colors">Experience</a>
            <a href="#contact" class="text-2xl hover:text-primary-500 transition-colors">Contact</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    // Open mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        feather.replace();
    });

    // Close mobile menu
    const closeButton = mobileMenu.querySelector('.mobile-menu-close');
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Close menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}


/* CONTACT FORM HANDLER */

/**
 * Handle contact form submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link with form data
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:suryanshbhardwaj04@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show feedback and reset form
            alert('Opening your email client... Please send the email to complete your message.');
            contactForm.reset();
        });
    }
}


/* INITIALIZATION */

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Start typing animation after short delay
    setTimeout(typeWriter, 1000);
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup contact form
    setupContactForm();
});
