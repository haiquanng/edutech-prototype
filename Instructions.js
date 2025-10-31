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