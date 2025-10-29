// Assignment Creation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAssignmentPage();
});

function initializeAssignmentPage() {
    setupTabNavigation();
    setupFileUpload();
    setupQuestionManagement();
    setupFormValidation();
    setupEvaluateTab();
}

// Tab Navigation
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            document.getElementById(`${targetTab}-content`).classList.add('active');
        });
    });
}

// File Upload
function setupFileUpload() {
    const uploadBox = document.getElementById('uploadBox');
    const uploadBtn = uploadBox?.querySelector('.upload-btn');

    if (uploadBtn) {
        uploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openFileDialog();
        });
    }

    if (uploadBox) {
        uploadBox.addEventListener('click', function() {
            openFileDialog();
        });

        // Drag and drop
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.borderColor = '#2563EB';
            this.style.background = '#EEF2FF';
        });

        uploadBox.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.borderColor = '#CBD5E1';
            this.style.background = 'white';
        });

        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.borderColor = '#CBD5E1';
            this.style.background = 'white';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }
}

function openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.docx,.xlsx,.csv,.pdf';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };
    
    input.click();
}

function handleFileUpload(file) {
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv',
        'application/pdf'
    ];
    
    if (!validTypes.includes(file.type)) {
        showNotification('Định dạng file không hợp lệ. Vui lòng chọn file .docx, .xlsx, .csv hoặc .pdf', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showNotification('File quá lớn. Vui lòng chọn file dưới 10MB', 'error');
        return;
    }

    showNotification('Đang tải file lên...', 'info');
    
    // Simulate upload and processing
    setTimeout(() => {
        showNotification('Đã tải file thành công! Đang xử lý...', 'success');
        
        setTimeout(() => {
            // Switch to create tab and populate with data
            document.querySelector('[data-tab="create"]').click();
            populateQuestionsFromFile();
            showNotification('Đã xử lý file thành công!', 'success');
        }, 1500);
    }, 1500);
}

function populateQuestionsFromFile() {
    // This would parse the uploaded file and populate questions
    // For demo, we'll just show success message
    console.log('Questions populated from file');
}

// Question Management
function setupQuestionManagement() {
    const generateBtn = document.querySelector('.btn-generate');
    const addQuestionBtn = document.querySelector('.btn-add-question');

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateQuestionsWithAI();
        });
    }

    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', function() {
            addNewQuestion();
        });
    }

    // Setup existing question actions
    setupQuestionActions();
}

function generateQuestionsWithAI() {
    const form = document.querySelector('.form-card');
    const formData = new FormData(form.querySelector('form') || form);
    
    // Validate required fields
    const title = document.querySelector('.form-input').value;
    const numQuestions = document.querySelector('input[type="number"]').value;
    
    if (!title || !numQuestions) {
        showNotification('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }

    showNotification('Đang sinh câu hỏi với AI...', 'info');
    
    // Simulate AI generation
    setTimeout(() => {
        const questionList = document.getElementById('questionList');
        const existingQuestions = questionList.querySelectorAll('.question-item').length - 1; // Exclude add button
        
        for (let i = 1; i <= Math.min(3, numQuestions); i++) {
            const questionHtml = createQuestionHtml(existingQuestions + i);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = questionHtml;
            questionList.insertBefore(tempDiv.firstElementChild, document.querySelector('.btn-add-question'));
        }
        
        setupQuestionActions();
        showNotification('Đã sinh câu hỏi thành công!', 'success');
    }, 2000);
}

function createQuestionHtml(num) {
    return `
        <div class="question-item">
            <div class="question-header">
                <span class="question-number">Câu ${num}:</span>
                <span class="question-type-badge">Trắc nghiệm</span>
            </div>
            <div class="question-body">
                <div class="question-options">
                    <label class="option-label">
                        <input type="radio" name="q${num}" value="A" checked>
                        <span class="option-letter">A:</span>
                        <span>Đáp án A</span>
                    </label>
                    <label class="option-label">
                        <input type="radio" name="q${num}" value="B">
                        <span class="option-letter">B:</span>
                        <span>Đáp án B</span>
                    </label>
                    <label class="option-label">
                        <input type="radio" name="q${num}" value="C">
                        <span class="option-letter">C:</span>
                        <span>Đáp án C</span>
                    </label>
                    <label class="option-label">
                        <input type="radio" name="q${num}" value="D">
                        <span class="option-letter">D:</span>
                        <span>Đáp án D</span>
                    </label>
                </div>
                <div class="question-meta">
                    <span class="difficulty-tag">Mức độ</span>
                    <span class="meta-value">Trung bình</span>
                </div>
            </div>
            <div class="question-actions">
                <button class="btn-text edit-question">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                    Sửa
                </button>
                <button class="btn-text text-danger delete-question">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    Xóa
                </button>
            </div>
            <div class="expand-icon">▼</div>
        </div>
    `;
}

function addNewQuestion() {
    const questionList = document.getElementById('questionList');
    const numQuestions = questionList.querySelectorAll('.question-item').length;
    
    const questionHtml = createQuestionHtml(numQuestions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = questionHtml;
    questionList.insertBefore(tempDiv.firstElementChild, document.querySelector('.btn-add-question'));
    
    setupQuestionActions();
    showNotification('Đã thêm câu hỏi mới', 'success');
}

function setupQuestionActions() {
    // Edit buttons
    document.querySelectorAll('.edit-question').forEach(btn => {
        btn.onclick = function() {
            const questionItem = this.closest('.question-item');
            editQuestion(questionItem);
        };
    });

    // Delete buttons
    document.querySelectorAll('.delete-question').forEach(btn => {
        btn.onclick = function() {
            const questionItem = this.closest('.question-item');
            deleteQuestion(questionItem);
        };
    });

    // Expand/collapse
    document.querySelectorAll('.question-item').forEach(item => {
        const expandIcon = item.querySelector('.expand-icon');
        if (expandIcon) {
            expandIcon.onclick = function() {
                item.classList.toggle('expanded');
            };
        }
    });
}

function editQuestion(questionItem) {
    showNotification('Chức năng chỉnh sửa câu hỏi', 'info');
    // Open edit modal or make fields editable
}

function deleteQuestion(questionItem) {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
        questionItem.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            questionItem.remove();
            showNotification('Đã xóa câu hỏi', 'success');
        }, 300);
    }
}

// Form Validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('.form-input, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    if (field.hasAttribute('required') && !field.value) {
        field.style.borderColor = '#EF4444';
        return false;
    } else {
        field.style.borderColor = '#E2E8F0';
        return true;
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10000;
        min-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
    }

    .notification-success .notification-icon {
        background: #D1FAE5;
        color: #047857;
    }

    .notification-error .notification-icon {
        background: #FEE2E2;
        color: #B91C1C;
    }

    .notification-info .notification-icon {
        background: #DBEAFE;
        color: #1D4ED8;
    }

    .notification-warning .notification-icon {
        background: #FEF3C7;
        color: #B45309;
    }

    .notification-message {
        font-size: 14px;
        color: #0F172A;
        font-weight: 500;
    }

    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Auto-save functionality
let autoSaveTimer;
document.querySelectorAll('.form-input, .form-select').forEach(field => {
    field.addEventListener('input', function() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            saveFormData();
        }, 2000);
    });
});

function saveFormData() {
    const formData = {};
    document.querySelectorAll('.form-input, .form-select').forEach(field => {
        if (field.name || field.id) {
            formData[field.name || field.id] = field.value;
        }
    });
    localStorage.setItem('assignmentFormData', JSON.stringify(formData));
    console.log('Form data auto-saved');
}

// Load saved form data on page load
function loadFormData() {
    const savedData = localStorage.getItem('assignmentFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach(key => {
            const field = document.querySelector(`[name="${key}"], #${key}`);
            if (field) {
                field.value = formData[key];
            }
        });
    }
}

loadFormData();

// Evaluate Tab Setup and Animations
function setupEvaluateTab() {
    const evaluateTabBtn = document.querySelector('[data-tab="evaluate"]');
    if (evaluateTabBtn) {
        evaluateTabBtn.addEventListener('click', function() {
            setTimeout(() => {
                animateEvaluateCharts();
            }, 300);
        });
    }

    // Setup export buttons
    const exportBtn = document.querySelector('.evaluate-actions .btn-secondary');
    const confirmBtn = document.querySelector('.evaluate-actions .btn-primary');

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showNotification('Đang xuất báo cáo PDF...', 'info');
            setTimeout(() => {
                showNotification('Đã xuất báo cáo thành công!', 'success');
            }, 2000);
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            showNotification('Đang lưu bài kiểm tra...', 'info');
            setTimeout(() => {
                showNotification('Đã lưu bài kiểm tra thành công!', 'success');
                // Redirect or refresh
            }, 1500);
        });
    }
}

function animateEvaluateCharts() {
    // Animate overview cards first
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 80);
    });

    // Count up animation for card values
    setTimeout(() => {
        const cardValues = document.querySelectorAll('.card-value');
        cardValues.forEach((value, index) => {
            const text = value.textContent.trim();
            const hasSlash = text.includes('/');
            
            if (hasSlash) {
                const [num, denom] = text.split('/');
                animateCounter(value, 0, parseFloat(num), 1000, index * 100, `/${denom}`);
            } else {
                const targetNum = parseFloat(text);
                if (!isNaN(targetNum)) {
                    animateCounter(value, 0, targetNum, 1000, index * 100);
                }
            }
        });
    }, 300);

    // Animate progress bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-fill, .topic-fill, .score-fill');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width;
            }, index * 80);
        });
    }, 600);

    // Animate chart bars
    setTimeout(() => {
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            const barFill = bar.querySelector('.bar-fill');
            const height = bar.style.height;
            
            if (barFill) {
                bar.style.height = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.height = height;
                }, index * 100);
            }
        });
    }, 800);
}

function animateCounter(element, start, end, duration, delay, suffix = '') {
    setTimeout(() => {
        const startTime = performance.now();
        const isDecimal = end % 1 !== 0;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuad = progress * (2 - progress);
            const current = start + (end - start) * easeOutQuad;
            
            if (isDecimal) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = (isDecimal ? end.toFixed(1) : end) + suffix;
            }
        }
        
        requestAnimationFrame(update);
    }, delay);
}