// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .step, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when page loads
window.addEventListener('load', animateOnScroll);

// Toast utility
window.showToast = function(type, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<span>${message}</span><button class="toast-close" aria-label="Close">✕</button>`;
    container.appendChild(toast);
    const remove = () => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    };
    toast.querySelector('.toast-close').addEventListener('click', remove);
    setTimeout(remove, 4000);
}

// Button loading helper
window.withButtonLoading = async function(button, asyncFn) {
    if (!button) return asyncFn();
    const previousAria = button.getAttribute('aria-busy');
    button.setAttribute('aria-busy', 'true');
    try {
        return await asyncFn();
    } catch (err) {
        throw err;
    } finally {
        if (previousAria === null) button.removeAttribute('aria-busy'); else button.setAttribute('aria-busy', previousAria);
    }
}

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-nav-toggle]')?.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetSelector = toggle.getAttribute('data-nav-toggle');
            const target = document.querySelector(targetSelector);
            if (target) target.classList.toggle('show');
        });
    });
});