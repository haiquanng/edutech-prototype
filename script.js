// Guide Modal System
const guides = {
    'auto-grading': [
        {
            title: 'Chấm điểm tự động',
            steps: [
                {
                    number: 1,
                    title: 'Chọn bài kiểm tra',
                    description: 'Chọn bài kiểm tra cần chấm từ danh sách'
                },
                {
                    number: 2,
                    title: 'Chọn lớp',
                    description: 'Chọn lớp học đã làm bài kiểm tra này'
                },
                {
                    number: 3,
                    title: 'Bấm "Chấm"',
                    description: 'Hệ thống sẽ tự động chấm và tạo báo cáo'
                }
            ],
            note: 'Gợi ý: Tự luận- tải luận- mẫu hoặc đánh giá y AI.'
        }
    ],
    'class-management': [
        {
            title: 'Quản lý lớp học',
            steps: [
                {
                    number: 1,
                    title: 'Tạo lớp',
                    description: 'Nhập tên lớp, môn học và thông tin cơ bản'
                },
                {
                    number: 2,
                    title: 'Thêm học sinh',
                    description: 'Nhập danh sách học sinh hoặc import từ file Excel'
                },
                {
                    number: 3,
                    title: 'Giao bài/điểm danh giờ tay',
                    description: 'Giao bài tập và theo dõi sự tham gia của học sinh'
                }
            ],
            note: 'Gợi ý: Có một +1 gỉo tay theo chi-trực (lớp offline).'
        }
    ],
    'create-quiz': [
        {
            title: 'Tạo & Đánh giá Quiz',
            steps: [
                {
                    number: 1,
                    title: 'Chọn hoặc tải bài quiz',
                    description: 'Chọn tạo mới (với câu hỏi từ AI & có cấu hỏi) hoặc tải lên file Word/PDF có sẵn. Hệ thống sẽ đọc đoạn và chuẩn hóa câu hỏi.'
                },
                {
                    number: 2,
                    title: 'Xem & chỉnh sửa nội dung',
                    description: 'Nhập chủ đề bài học và số lượng câu hỏi bạn muốn tạo. Dễ AI cũng thể sinh ra câu hỏi thay bạn trong vài giây.'
                },
                {
                    number: 3,
                    title: 'Đánh giá chất lượng quiz',
                    description: 'Biến "Phân tích" để xem độ khó, độ phủ các câu hỏi và các gợi ý cải thiện của hệ thống.'
                }
            ],
            note: 'Gợi ý: File có nội giúp AI học tốt hơn, có thể chỉnh sửa sau khi phát lộc.'
        }
    ],
    'analytics': [
        {
            title: 'Thống kê & Báo cáo',
            steps: [
                {
                    number: 1,
                    title: 'Chọn lớp/khoảng thời gian',
                    description: 'Chọn lớp và khoảng thời gian bạn muốn xem báo cáo'
                },
                {
                    number: 2,
                    title: 'Xem biểu đồ',
                    description: 'Xem các biểu đồ và thống kê chi tiết'
                },
                {
                    number: 3,
                    title: 'Xuất Excel/PDF',
                    description: 'Tải báo cáo dưới dạng Excel hoặc PDF'
                }
            ],
            note: 'Gợi ý: Freemium- báo cáo tổng quan; Standard+- chi tiết theo học chi.'
        }
    ]
};

// Open guide modal
function openGuideModal(guideType = 'create-quiz') {
    const modal = document.getElementById('guideModal');
    const content = document.getElementById('guideContent');
    
    if (!modal || !content) return;
    
    const guide = guides[guideType][0];
    
    let stepsHTML = '';
    guide.steps.forEach(step => {
        stepsHTML += `
            <div style="display: flex; gap: 16px; margin-bottom: 24px; padding: 20px; background: var(--background-alt); border-radius: 12px;">
                <div style="flex-shrink: 0; width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px;">
                    ${step.number}
                </div>
                <div>
                    <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${step.title}</h3>
                    <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">${step.description}</p>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 32px;">
            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">${guide.title}</h2>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--text-secondary);">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span>Video 1 phút</span>
            </div>
        </div>
        
        <div style="background: #EEF2FF; padding: 20px; border-radius: 12px; margin-bottom: 32px; display: flex; align-items: center; gap: 16px;">
            <div style="flex: 1;">
                <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">Bước 1-2-3</h3>
                <p style="color: var(--text-secondary); font-size: 14px;">Video hướng dẫn chi tiết cách sử dụng tính năng (mẫu)...</p>
            </div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=100&fit=crop" alt="Video thumbnail" style="width: 150px; height: 100px; border-radius: 8px; object-fit: cover;">
        </div>
        
        ${stepsHTML}
        
        ${guide.note ? `
            <div style="background: #FEF3C7; padding: 16px; border-radius: 8px; border-left: 4px solid #F59E0B; margin-top: 24px;">
                <p style="font-size: 14px; color: var(--text-primary);"><strong>Gợi ý:</strong> ${guide.note}</p>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
}

// Close guide modal
function closeGuideModal() {
    const modal = document.getElementById('guideModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Next step function
function nextStep() {
    closeGuideModal();
    // Navigate to create quiz page or start tutorial
    // window.location.href = 'create-quiz.html';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('guideModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGuideModal();
            }
        });
    }
});

// Smooth scroll for anchor links
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

// FAQ accordion functionality
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        const answer = this.querySelector('p');
        const isOpen = answer.style.display === 'block';
        
        // Close all other items
        document.querySelectorAll('.faq-item p').forEach(p => {
            p.style.display = 'none';
        });
        
        // Toggle current item
        answer.style.display = isOpen ? 'none' : 'block';
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border)';
        }
    });
    
    return isValid;
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Auto-save functionality for forms
let autoSaveTimer;
function setupAutoSave(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('input', function() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            // Save form data to localStorage
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            localStorage.setItem(formId, JSON.stringify(data));
            showToast('Đã tự động lưu', 'success');
        }, 2000);
    });
}

// Load saved form data
function loadFormData(formId) {
    const savedData = localStorage.getItem(formId);
    if (!savedData) return;
    
    const data = JSON.parse(savedData);
    const form = document.getElementById(formId);
    if (!form) return;
    
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = data[key];
        }
    });
}

// Export to Excel functionality (placeholder)
function exportToExcel(data, filename) {
    console.log('Exporting to Excel:', filename);
    showToast('Đang xuất file Excel...', 'success');
    // In a real implementation, you would use a library like SheetJS
}

// Export to PDF functionality (placeholder)
function exportToPDF(elementId, filename) {
    console.log('Exporting to PDF:', filename);
    showToast('Đang xuất file PDF...', 'success');
    // In a real implementation, you would use a library like jsPDF
}

// Chart initialization (placeholder for analytics page)
function initializeCharts() {
    // This would use a charting library like Chart.js or D3.js
    console.log('Initializing charts...');
}

// Search functionality
function setupSearch(inputId, targetClass) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll(`.${targetClass}`);
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Filter functionality
function setupFilters(filterId, targetClass) {
    const filterSelect = document.getElementById(filterId);
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function(e) {
        const filterValue = e.target.value;
        const items = document.querySelectorAll(`.${targetClass}`);
        
        items.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = '';
            } else {
                const itemValue = item.dataset.filter;
                item.style.display = itemValue === filterValue ? '' : 'none';
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Setup any auto-save forms
    const forms = document.querySelectorAll('form[data-autosave]');
    forms.forEach(form => {
        setupAutoSave(form.id);
        loadFormData(form.id);
    });
    
    // Initialize charts if on analytics page
    if (document.getElementById('analytics-container')) {
        initializeCharts();
    }
});

// Utility functions
const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('vi-VN');
    },
    
    formatNumber: (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    },
    
    calculatePercentage: (value, total) => {
        return ((value / total) * 100).toFixed(1);
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export functions for use in other files
window.EduTechAI = {
    openGuideModal,
    closeGuideModal,
    nextStep,
    showToast,
    exportToExcel,
    exportToPDF,
    validateForm,
    utils
};

// instruction js
// Instructions Panel System
class InstructionsPanel {
    constructor() {
        this.currentPanel = null;
        this.overlay = null;
        this.init();
    }

    init() {
        // Create overlay
        this.createOverlay();
        
        // Add event listeners
        this.attachEventListeners();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'instructions-overlay';
        this.overlay.addEventListener('click', () => this.closePanel());
        document.body.appendChild(this.overlay);
    }

    attachEventListeners() {
        // Listen for help button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.help-button')) {
                const button = e.target.closest('.help-button');
                const type = button.dataset.instructionType;
                this.openPanel(type);
            }
        });
    }

    openPanel(type) {
        // Remove any existing panel
        this.closePanel();

        // Create new panel
        const panel = this.createPanel(type);
        document.body.appendChild(panel);
        
        // Trigger animation
        requestAnimationFrame(() => {
            panel.classList.add('active');
            this.overlay.classList.add('active');
        });

        this.currentPanel = panel;
    }

    closePanel() {
        if (this.currentPanel) {
            this.currentPanel.classList.remove('active');
            this.overlay.classList.remove('active');
            
            setTimeout(() => {
                if (this.currentPanel && this.currentPanel.parentNode) {
                    this.currentPanel.remove();
                }
                this.currentPanel = null;
            }, 400);
        }
    }

    createPanel(type) {
        const panel = document.createElement('div');
        panel.className = 'instructions-panel';
        
        const content = this.getInstructionContent(type);
        panel.innerHTML = content;

        // Add close button event
        const closeBtn = panel.querySelector('.instructions-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePanel());
        }

        // Add CTA button event
        const ctaBtn = panel.querySelector('.instructions-cta');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                this.handleCTA(type);
            });
        }

        return panel;
    }

    getInstructionContent(type) {
        const instructions = {
            'statistics': {
                title: 'Thống kê & Báo cáo',
                videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
                steps: [
                    {
                        number: 1,
                        title: 'Chọn lớp/khoảng thời gian',
                        description: 'Xem các biểu đồ và thống kê chi tiết'
                    },
                    {
                        number: 2,
                        title: 'Xem biểu đồ',
                        description: 'Xem các biểu đồ và thống kê chi tiết'
                    },
                    {
                        number: 3,
                        title: 'Xuất Excel/PDF',
                        description: 'Tải báo cáo dưới dạng Excel hoặc PDF'
                    }
                ],
                suggestion: 'Freemium- báo cáo tổng quan; Standard+- chi tiết theo học sinh.'
            },
            'class-management': {
                title: 'Quản lý lớp học',
                videoThumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
                steps: [
                    {
                        number: 1,
                        title: 'Tạo lớp',
                        description: 'Nhập tên lớp, môn học và thông tin cơ bản'
                    },
                    {
                        number: 2,
                        title: 'Thêm học sinh',
                        description: 'Nhập danh sách học sinh hoặc import từ file Excel'
                    },
                    {
                        number: 3,
                        title: 'Giao bài/điểm danh giờ tay',
                        description: 'Giao bài kiểm tra và theo dõi sự tham gia của học sinh'
                    }
                ],
                suggestion: 'Có nút +1 giờ tay theo chữ-trực (lớp offline).'
            },
            'auto-grading': {
                title: 'Chấm điểm tự động',
                videoThumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
                steps: [
                    {
                        number: 1,
                        title: 'Chọn bài kiểm tra',
                        description: 'Chọn bài kiểm tra cần chấm từ danh sách'
                    },
                    {
                        number: 2,
                        title: 'Chọn lớp',
                        description: 'Chọn lớp học đã làm bài kiểm tra này'
                    },
                    {
                        number: 3,
                        title: 'Bấm "Chấm"',
                        description: 'Hệ thống sẽ tự động chấm và tạo báo cáo'
                    }
                ],
                suggestion: 'Tự luận- tải luận- mẫu hoặc đánh giá bằng AI.'
            },
            'create-quiz': {
                title: 'Tạo & Đánh giá Quiz',
                videoThumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
                steps: [
                    {
                        number: 1,
                        title: 'Chọn hoặc tải bài quiz',
                        description: 'Chọn tạo mới (với câu hỏi từ AI & có cấu hỏi) hoặc tải lên file Word/PDF có sẵn. Hệ thống sẽ đọc và chuẩn hóa câu hỏi.'
                    },
                    {
                        number: 2,
                        title: 'Xem & chỉnh sửa nội dung',
                        description: 'Nhập chủ đề bài học và số lượng câu hỏi bạn muốn tạo. AI có thể sinh ra câu hỏi thay bạn trong vài giây.'
                    },
                    {
                        number: 3,
                        title: 'Đánh giá chất lượng quiz',
                        description: 'Bấm "Phân tích" để xem độ khó, độ phủ các câu hỏi và các gợi ý cải thiện của hệ thống.'
                    }
                ],
                suggestion: 'File có nội dung giúp AI học tốt hơn, có thể chỉnh sửa sau khi phát sinh.'
            },
            'home': {
                title: 'Hướng dẫn nhanh',
                videoThumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
                steps: [
                    {
                        number: 1,
                        title: 'Chọn lớp/khoảng thời gian',
                        description: 'Xem biểu đồ và thống kê khoảng thời gian bạn muốn xem báo cáo'
                    },
                    {
                        number: 2,
                        title: 'Xem biểu đồ',
                        description: 'Xem các biểu đồ và thống kê chi tiết'
                    },
                    {
                        number: 3,
                        title: 'Xuất Excel/PDF',
                        description: 'Tải báo cáo dưới dạng Excel hoặc PDF'
                    }
                ],
                suggestion: 'Không cần thẻ tín dụng • Hủy bất cứ lúc nào'
            }
        };

        const data = instructions[type] || instructions['home'];
        
        return `
            <div class="instructions-header">
                <h2 class="instructions-title">${data.title}</h2>
                <button class="instructions-close">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>

            <div class="instructions-body">
                <div class="instructions-meta">
                    <div class="instructions-steps">Bước 1-2-3</div>
                    <div class="instructions-video">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                        </svg>
                        Video 1 phút
                    </div>
                </div>

                <div class="video-thumbnail">
                    <img src="${data.videoThumbnail}" alt="Video hướng dẫn">
                    <div class="video-play-button">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                    </div>
                </div>

                ${data.steps.map(step => `
                    <div class="instruction-step">
                        <div class="step-number">${step.number}</div>
                        <div class="step-content">
                            <div class="step-title">${step.title}</div>
                            <div class="step-description">${step.description}</div>
                        </div>
                    </div>
                `).join('')}

                ${data.suggestion ? `
                    <div class="suggestion-box">
                        <p><strong>Gợi ý:</strong> ${data.suggestion}</p>
                    </div>
                ` : ''}
            </div>

            <div class="instructions-footer">
                <button class="instructions-cta">
                    Dùng thử ngay
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
                <div class="instructions-secondary">
                    <a href="#">Nhấn để hỏi trợ • 1900-xxxx</a>
                </div>
            </div>
        `;
    }

    handleCTA(type) {
        // Handle different CTA actions based on type
        const routes = {
            'statistics': 'analytics.html',
            'class-management': 'class/tabs/random.html',
            'auto-grading': 'quiz/grading/grading.html',
            'create-quiz': 'quiz/create/create_quiz.html',
            'home': 'dashboard.html'
        };

        const route = routes[type];
        if (route) {
            // Close panel and navigate
            this.closePanel();
            setTimeout(() => {
                // window.location.href = route;
                console.log('Navigate to:', route);
                showToast('Đang chuyển hướng...', 'success');
            }, 300);
        }
    }
}

// Initialize instructions panel system
let instructionsPanel;

document.addEventListener('DOMContentLoaded', function() {
    instructionsPanel = new InstructionsPanel();
});

// Global function to open instructions
function openInstructions(type) {
    if (instructionsPanel) {
        instructionsPanel.openPanel(type);
    }
}

// Export for use in other files
window.InstructionsPanel = InstructionsPanel;
window.openInstructions = openInstructions;
