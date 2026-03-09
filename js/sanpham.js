document.addEventListener('DOMContentLoaded', () => {
    // 1. Chuyển Tab sản phẩm
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 2. Chạm Accordion 8/3
    const accItems = document.querySelectorAll('.acc-item');
    accItems.forEach(item => {
        item.addEventListener('click', () => {
            accItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 3. Hiệu ứng Reveal khi cuộn
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});