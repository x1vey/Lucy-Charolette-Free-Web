// Smooth scrolling for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) {
                other.classList.remove('open');
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                other.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Toggle this one
        if (isOpen) {
            item.classList.remove('open');
            question.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = null;
        } else {
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Scroll reveal animation
const revealTargets = document.querySelectorAll(
    '.vsl-frame, .reality-content, .product-image, .product-details, .blueprint-card, .foryou-col, .testimonial-card, .faq-item, .waitlist-card'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// Waitlist form handling (front-end placeholder — wire up to your provider later)
const form = document.getElementById('waitlistForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const success = document.getElementById('waitlistSuccess');
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.value.trim() || !emailRe.test(email.value.trim())) {
            [name, email].forEach(field => {
                const valid = field.name === 'email'
                    ? emailRe.test(field.value.trim())
                    : field.value.trim().length > 0;
                field.style.borderColor = valid ? '' : 'var(--coral)';
            });
            return;
        }

        // TODO: replace with real submission (Mailchimp / ConvertKit / Stan, etc.)
        form.querySelector('.waitlist-fields').style.display = 'none';
        form.querySelector('.waitlist-note').style.display = 'none';
        success.hidden = false;
    });
}
