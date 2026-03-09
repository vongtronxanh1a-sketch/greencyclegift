// 1. Hàm tải các thành phần HTML (Header, Footer) vào một vị trí cụ thể trên trang
async function loadComponent(elementId, componentPath) {
    try {
        const element = document.getElementById(elementId);
        if (!element) return; 

        const response = await fetch(componentPath);
        if (!response.ok) throw new Error('Không thể tải ' + componentPath);
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.error("Lỗi tải component:", error);
    }
}

// 2. Hàm tạo và chèn Float Buttons (Zalo, Messenger + Back to Top)
function addFloatButtons() {
    // Tránh việc tạo trùng lặp
    if (document.querySelector('.float-contact')) return;

    const floatContainer = document.createElement('div');
    floatContainer.className = 'float-contact';

    // Nội dung HTML bao gồm: Nút Lên Đầu Trang, Messenger và Zalo
    floatContainer.innerHTML = `
        <a href="javascript:void(0)" id="backToTop" class="float-icon back-to-top-premium" title="Lên đầu trang">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <div class="scroll-progress"></div>
        </a>
        
        <a href="https://m.me/vongtronxanh" target="_blank" class="float-icon" title="Chat Messenger">
            <img src="../../../Global/images/logo-fb.webp" alt="Facebook Messenger">
        </a>
        
        <a href="https://zalo.me/0976152886" target="_blank" class="float-icon" title="Chat Zalo">
            <img src="../../../Global/images/logo-zalo.png" alt="Zalo">
        </a>
    `;

    document.body.appendChild(floatContainer);

    // Xử lý sự kiện cuộn chuột để ẩn/hiện nút Back to Top
    const backToTopBtn = document.getElementById("backToTop");
    window.addEventListener('scroll', () => {
        const backToTopBtn = document.getElementById("backToTop");
        if (window.pageYOffset > 400) {
            backToTopBtn.style.display = "flex";
            backToTopBtn.style.opacity = "1";
        } else {
            backToTopBtn.style.opacity = "0";
            // Đợi hiệu ứng ẩn xong mới set display: none
            setTimeout(() => { 
                if(window.pageYOffset <= 400) backToTopBtn.style.display = "none"; 
            }, 300);
        }
    });

    // Xử lý sự kiện click để cuộn lên đầu trang mượt mà
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 3. Khi trang web tải xong, tự động chạy các hàm
document.addEventListener('DOMContentLoaded', () => {
    // Tải Header/Footer
    loadComponent('header-container', '../../../Global/header.html');
    loadComponent('footer-container', '../../../Global/footer.html');

    // Chèn cụm nút nổi (Zalo, Messenger, Back to Top)
    addFloatButtons();
});