
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const currentYearSpan = document.getElementById("year");

if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function() {
        mobileNav.classList.toggle("show");
        
        if (mobileNav.classList.contains("show")) {
            navToggle.textContent = "✕";
            navToggle.style.fontSize = "20px";
        } else {
            navToggle.textContent = "☰"; 
            navToggle.style.fontSize = "24px";
        }
        
        document.body.style.overflow = mobileNav.classList.contains("show") ? "hidden" : "";
    });
}

document.addEventListener("click", function(event) {
    if (mobileNav && mobileNav.classList.contains("show")) {
        // Check if click is outside mobile nav and not on toggle button
        if (!mobileNav.contains(event.target) && !navToggle.contains(event.target)) {
            closeMobileNav();
        }
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && mobileNav && mobileNav.classList.contains("show")) {
        closeMobileNav();
    }
});

function closeMobileNav() {
    if (mobileNav) {
        mobileNav.classList.remove("show");
    }
    if (navToggle) {
        navToggle.textContent = "☰";
        navToggle.style.fontSize = "24px";
    }
    document.body.style.overflow = "";
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        closeMobileNav();
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    } else {
        console.warn(`Element with id "${id}" not found`);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            scrollToSection(targetId);
        }
    });
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        input.style.borderColor = '';
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    });
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff3860';
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            input.style.borderColor = '#ff3860';
            showError(input, 'Please enter a valid email address');
        } else if (input.type === 'tel' && !isValidPhone(input.value)) {
            isValid = false;
            input.style.borderColor = '#ff3860';
            showError(input, 'Please enter a valid phone number');
        }
    });
    
    if (!isValid) {
        const firstError = form.querySelector('[style*="border-color: rgb(255, 56, 96)"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    const formData = {
        name: form.name.value.trim(),
        brand: form.brand.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim()
    };
    
    const whatsappText = encodeURIComponent(
        `📋 *YESX - Quotation Request*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `🏢 *Brand:* ${formData.brand}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Phone:* ${formData.phone}\n\n` +
        `📝 *Requirement:*\n${formData.message}\n\n` +
        `📍 *Submitted via Website Form*`
    );
    
    const whatsappUrl = `https://wa.me/918187085691?text=${whatsappText}`;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Opening WhatsApp...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            form.reset();
            
            showSuccessMessage(form);
        }, 1500);
    }, 500);
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff3860';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function showSuccessMessage(form) {
    const existingMsg = form.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.backgroundColor = '#d4edda';
    successDiv.style.color = '#155724';
    successDiv.style.padding = '12px';
    successDiv.style.borderRadius = '6px';
    successDiv.style.marginTop = '15px';
    successDiv.style.textAlign = 'center';
    successDiv.style.border = '1px solid #c3e6cb';
    successDiv.innerHTML = '✅ Form submitted successfully! Check WhatsApp for next steps.';
    
    form.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
}

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    .nav a.active,
    .mobile-nav a.active {
        color: #007bff !important;
        font-weight: 600 !important;
        position: relative;
    }
    
    .nav a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #007bff;
    }
    
    .mobile-nav a.active {
        background-color: #f0f7ff;
        border-left: 3px solid #007bff;
    }
    
    .success-message {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    console.log('YESX Ecommerce Reviews website loaded');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }
        });
    });
    
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                return;
            }
            if (e.key === 'Enter' && !e.shiftKey) {
                if (!this.closest('form').querySelector('button[type="submit"]').disabled) {
                    return;
                }
            }
        });
    });
    
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '+91 ' + value.substring(0, 10);
            }
            e.target.value = value;
        });
    }
});
