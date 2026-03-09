document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HIỆU ỨNG SCROLL REVEAL (XUẤT HIỆN KHI CUỘN) ---
    // Chọn tất cả các phần tử có class 'reveal'
    const reveals = document.querySelectorAll('.reveal');

    // Thiết lập IntersectionObserver để theo dõi khi phần tử lọt vào màn hình
    const revealOptions = {
        threshold: 0.15, // Kích hoạt khi 15% phần tử xuất hiện trên màn hình
        rootMargin: "0px 0px -50px 0px" // Kích hoạt sớm một chút trước khi cuộn tới hẳn
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Thêm class 'active' để chạy animation CSS
                entry.target.classList.add('active');
                // Ngừng theo dõi sau khi đã hiện ra để tối ưu hiệu suất
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Bắt đầu quan sát từng phần tử
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 2. XỬ LÝ TABS (SẢN PHẨM MỚI / BÁN CHẠY) ---
    const tabs = document.querySelectorAll('.tabs-header h2');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Xóa class active ở tất cả các tab
            tabs.forEach(t => t.classList.remove('active'));
            // Thêm class active vào tab vừa click
            tab.classList.add('active');
            
            // Tương lai: Gọi hàm load dữ liệu tương ứng từ data.js vào đây
            console.log("Đã chuyển sang tab: " + tab.innerText);
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Các code cũ của Scroll Reveal và Tabs vẫn giữ nguyên ở đây) ...

    // --- 3. XỬ LÝ AUTO SLIDER CHO HERO BANNER ---
    let slideIndex = 0;
    let slideInterval;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Hàm hiển thị một slide cụ thể
    function showSlides(index) {
        if (slides.length === 0) return;

        // Vòng lặp index: nếu đi quá ảnh cuối thì quay lại ảnh đầu
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;

        // Tắt class 'active' ở tất cả các ảnh và chấm tròn
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Bật class 'active' cho ảnh và chấm tròn hiện tại
        slides[slideIndex].classList.add('active');
        if (dots.length > 0) dots[slideIndex].classList.add('active');
    }

    // Hàm chuyển sang ảnh tiếp theo
    function nextSlide() {
        slideIndex++;
        showSlides(slideIndex);
    }

    // Khởi tạo bộ đếm thời gian: tự động chuyển ảnh sau 4 giây (4000ms)
    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Hàm khi người dùng tự click vào chấm tròn
    window.currentSlide = function(index) {
        slideIndex = index;
        showSlides(slideIndex);
        // Khi người dùng click, reset lại bộ đếm để tránh bị chuyển ảnh quá nhanh
        clearInterval(slideInterval);
        startSlider();
    };

    // Bắt đầu chạy slider ngay khi trang vừa tải xong
    showSlides(slideIndex);
    startSlider();
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Tìm tất cả các tiêu đề Tab và nội dung Tab
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            // Lấy data-target để biết cần bật Tab nào (VD: 'tab-best')
            const targetId = tab.getAttribute('data-target');
            
            // Xóa trạng thái 'active' của tất cả các tiêu đề
            tabLinks.forEach(t => t.classList.remove('active'));
            // Ẩn tất cả các nội dung sản phẩm
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Bật trạng thái 'active' cho tiêu đề vừa bấm
            tab.classList.add('active');
            // Hiển thị 3 sản phẩm của Tab tương ứng
            document.getElementById(targetId).classList.add('active');
        });
    });

});

