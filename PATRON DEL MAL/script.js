// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form Validation and WhatsApp Redirection
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('whatsappForm');

    // === Pricing Map (COP) ===
    const prices = {
        '1000': { detal: 12000, cantidad: 8500, mayor: 8000 },
        '500':  { detal: 7500,  cantidad: 7000, mayor: 6500 }
    };

    // Format number as COP currency
    function formatCOP(num) {
        return '$' + num.toLocaleString('es-CO');
    }

    // Update price display when size or quantity changes
    function updatePrice() {
        const sizeVal = document.getElementById('size').value;
        const qtyVal = document.getElementById('quantity').value;
        const priceEl = document.getElementById('unitPrice');

        if (sizeVal && qtyVal && prices[sizeVal] && prices[sizeVal][qtyVal]) {
            const price = prices[sizeVal][qtyVal];
            priceEl.textContent = formatCOP(price) + ' COP';
            priceEl.style.transform = 'scale(1.1)';
            setTimeout(() => { priceEl.style.transform = 'scale(1)'; }, 200);
        } else {
            priceEl.textContent = '—';
        }
    }

    const sizeSelect = document.getElementById('size');
    const quantitySelect = document.getElementById('quantity');

    if (sizeSelect) sizeSelect.addEventListener('change', updatePrice);
    if (quantitySelect) quantitySelect.addEventListener('change', updatePrice);

    // === Form Submit ===
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form Fields
        const nameInput = document.getElementById('name');
        const cityInput = document.getElementById('city');
        const sizeInput = document.getElementById('size');
        const quantityInput = document.getElementById('quantity');
        const messageInput = document.getElementById('message');

        // Validation
        let isValid = true;

        // Reset Error States
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate City
        if (cityInput.value.trim() === '') {
            cityInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate Size
        if (sizeInput.value === '') {
            sizeInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate Quantity
        if (quantityInput.value === '') {
            quantityInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // If form is valid, redirect to WhatsApp
        if (isValid) {
            const name = nameInput.value.trim();
            const city = cityInput.value.trim();
            const size = sizeInput.options[sizeInput.selectedIndex].text;
            const quantity = quantityInput.options[quantityInput.selectedIndex].text;
            const message = messageInput.value.trim();

            // Get price
            const sizeVal = sizeInput.value;
            const qtyVal = quantityInput.value;
            const priceUnit = (prices[sizeVal] && prices[sizeVal][qtyVal]) ? formatCOP(prices[sizeVal][qtyVal]) : 'Consultar';

            // Build WhatsApp Message
            let whatsappText = `¡Hola Patrón del Mal! 🪳💥\nQuiero realizar un pedido de su increíble insecticida.\n\n`;
            whatsappText += `*Mis datos:*\n`;
            whatsappText += `👤 Nombre: ${name}\n`;
            whatsappText += `📍 Ciudad: ${city}\n`;
            whatsappText += `🧴 Presentación: ${size}\n`;
            whatsappText += `📦 Tipo de compra: ${quantity}\n`;
            whatsappText += `💰 Precio unitario: ${priceUnit} COP\n`;

            if (message !== '') {
                whatsappText += `💬 Mensaje adicional: ${message}\n`;
            }

            whatsappText += `\n¡Quedo atento(a) para seguir con el proceso de compra!`;

            // Encode text for URL
            const encodedText = encodeURIComponent(whatsappText);

            // WhatsApp Number
            const phoneNumber = "573113179094";

            // Construct WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            // Add slight animation to button before redirect
            const btn = document.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Redirigiendo...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';

            // Redirect after a short delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                form.reset();
                document.getElementById('unitPrice').textContent = '—';
            }, 800);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Only scroll if it's a valid ID
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Adjust for fixed navbar
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});
