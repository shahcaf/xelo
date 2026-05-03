document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('script-order-form');
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // CONFIG: Discord Webhook URLs
            const WEBHOOKS = {
                script: 'https://discordapp.com/api/webhooks/1500485317646483616/7pyc17WYqFSoT5O1QpcTdnc3XA7eEJmL2zewN5EIuQ7ksEvaSH2eUsapRTPCMSEGLGag',
                game: 'https://discordapp.com/api/webhooks/1500486117911171246/fGvC_HKKOTZhra6rpLbkm-a3nryNjsvYFJ1sOMMgymIy5SRJvasgh9X-EIA7PDEFtZ7i'
            };
            
            // Get form values
            const type = document.getElementById('commission-type').value;
            const discord = document.getElementById('discord-username').value;
            const request = document.getElementById('request-details').value;
            
            const selectedWebhook = WEBHOOKS[type];
            
            // Visual feedback
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Order...';

            // Prepare Discord Embed
            const typeName = type === 'script' ? "XELO STEALER SCRIPT" : "Full Game";
            const price = type === 'script' ? "$20" : "$10";
            const themeColor = type === 'script' ? 11032055 : 3092790; // Premium Purple vs Sleek Slate

            const payload = {
                username: "Xelo Scripts | Order System",
                content: `<@1065698430871154698>`, // Clean ping
                allowed_mentions: { users: ["1065698430871154698"] },
                embeds: [{
                    title: "💎 New Commission Received",
                    description: `A new order has been placed and is waiting for your review.`,
                    color: themeColor,
                    fields: [
                        { name: "👤 Customer", value: `**${discord}**`, inline: true },
                        { name: "📦 Product", value: `**${typeName}**`, inline: true },
                        { name: "💰 Price", value: `**${price}**`, inline: true },
                        { name: "📝 Order Details", value: `\`\`\`${request}\`\`\``, inline: false }
                    ],
                    footer: { 
                        text: "Xelo Scripts • Professional Roblox Services",
                        icon_url: "https://i.imgur.com/8N9RA7K.png" // Placeholder for a small icon if needed
                    },
                    timestamp: new Date()
                }]
            };

            // LOGGING FOR VERIFICATION
            console.log('Sending Payload:', payload);

            // Send to Webhook
            if (selectedWebhook) {
                fetch(selectedWebhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).then(() => handleSuccess(submitBtn, originalText, discord))
                  .catch(err => {
                      console.error('Error sending to webhook:', err);
                      handleSuccess(submitBtn, originalText, discord); 
                  });
            } else {
                console.log('Webhook payload:', payload);
                setTimeout(() => handleSuccess(submitBtn, originalText, discord), 1500);
            }
        });
    }

    // Function to set commission type from pricing buttons
    window.setCommissionType = (type) => {
        const selector = document.getElementById('commission-type');
        if (selector) {
            selector.value = type;
            // Add a small glow effect to the selector to show it changed
            selector.style.borderColor = 'var(--primary)';
            setTimeout(() => selector.style.borderColor = '', 1000);
        }
    };

    function handleSuccess(submitBtn, originalText, discord) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        alert(`Thank you, ${discord}! Your request has been logged.\n\nIMPORTANT: Now join the Discord and open a ticket to complete your order.`);
        
        setTimeout(() => {
            const form = document.getElementById('script-order-form');
            if (form) form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }

    // Scroll reveal logic (simple version)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Track scroll to change nav background
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 0';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '1.5rem 0';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
});
