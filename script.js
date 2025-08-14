// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Fill hidden page URL
const formEl = document.getElementById('contact-form');
if (formEl) {
  const urlField = formEl.querySelector('input[name="page_url"]');
  if (urlField) urlField.value = window.location.href;

  const statusEl = document.getElementById('form-status');

  // AJAX submit (keeps user on page)
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusEl) statusEl.textContent = 'Sending…';

    try {
      const data = new FormData(formEl);
      const res = await fetch(formEl.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        formEl.reset();
        if (statusEl) statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        const err = await res.json().catch(() => ({}));
        const msg = err?.errors?.[0]?.message || 'Sorry, there was a problem sending your message.';
        if (statusEl) statusEl.textContent = msg;
      }
    } catch {
      if (statusEl) statusEl.textContent = 'Network error. Please try again.';
    }
  });
}
