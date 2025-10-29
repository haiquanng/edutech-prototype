// Auto Grading Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGradingPage();
});

function initializeGradingPage() {
    setupFileUpload();
    setupTableFilters();
    setupCheckboxes();
    setupExportButtons();
    animateCharts();
}

// File Upload Handler
function setupFileUpload() {
    const importBox = document.querySelector('.import-box');
    
    if (importBox) {
        importBox.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.xlsx,.csv,.xls';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    handleFileUpload(file);
                }
            };
            
            input.click();
        });

        // Drag and drop
        importBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            importBox.style.borderColor = '#2563EB';
            importBox.style.background = '#EEF2FF';
        });

        importBox.addEventListener('dragleave', function(e) {
            e.preventDefault();
            importBox.style.borderColor = '#CBD5E1';
            importBox.style.background = '#F8FAFC';
        });

        importBox.addEventListener('drop', function(e) {
            e.preventDefault();
            importBox.style.borderColor = '#CBD5E1';
            importBox.style.background = '#F8FAFC';
            
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }
}

function handleFileUpload(file) {
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    
    if (!validTypes.includes(file.type)) {
        showNotification('Vui lòng chọn file Excel hoặc CSV', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showNotification('File quá lớn. Vui lòng chọn file dưới 10MB', 'error');
        return;
    }

    showNotification('Đang tải file lên...', 'info');
    
    // Simulate file upload
    setTimeout(() => {
        showNotification('Đã tải file thành công!', 'success');
        // In production, this would parse and display the data
        updateTableWithData();
    }, 1500);
}

// Table Filters
function setupTableFilters() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterTable(searchTerm, filterSelect?.value);
        });
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', function(e) {
            const filterValue = e.target.value;
            const searchTerm = searchInput?.value.toLowerCase() || '';
            filterTable(searchTerm, filterValue);
        });
    }
}

function filterTable(searchTerm, filterValue) {
    const rows = document.querySelectorAll('.results-table tbody tr');
    
    rows.forEach(row => {
        const studentName = row.querySelector('.student-name')?.textContent.toLowerCase() || '';
        const status = row.querySelector('.badge')?.textContent || '';
        
        const matchesSearch = studentName.includes(searchTerm);
        const matchesFilter = filterValue === 'Tất cả' || status.includes(filterValue);
        
        row.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });

    updateTableFooter();
}

// Checkboxes
function setupCheckboxes() {
    const masterCheckbox = document.querySelector('.results-table thead .checkbox');
    const rowCheckboxes = document.querySelectorAll('.results-table tbody .checkbox');

    if (masterCheckbox) {
        masterCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = masterCheckbox.checked;
            });
            updateSelectedCount();
        });
    }

    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateMasterCheckbox();
            updateSelectedCount();
        });
    });
}

function updateMasterCheckbox() {
    const masterCheckbox = document.querySelector('.results-table thead .checkbox');
    const rowCheckboxes = document.querySelectorAll('.results-table tbody .checkbox');
    const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
    
    if (masterCheckbox) {
        masterCheckbox.checked = checkedCount === rowCheckboxes.length;
        masterCheckbox.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
    }
}

function updateSelectedCount() {
    const checkedCount = document.querySelectorAll('.results-table tbody .checkbox:checked').length;
    if (checkedCount > 0) {
        showNotification(`Đã chọn ${checkedCount} học sinh`, 'info');
    }
}

// Export Buttons
function setupExportButtons() {
    const exportBtn = document.querySelector('.btn-primary');
    const saveBtn = document.querySelector('.btn-icon');

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showExportModal();
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveGradingSession();
        });
    }
}

function showExportModal() {
    const modal = document.createElement('div');
    modal.className = 'export-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Xuất báo cáo</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="export-options">
                        <label class="export-option">
                            <input type="radio" name="exportType" value="excel" checked>
                            <span>📊 Xuất Excel</span>
                        </label>
                        <label class="export-option">
                            <input type="radio" name="exportType" value="pdf">
                            <span>📄 Xuất PDF</span>
                        </label>
                    </div>
                    <div class="export-settings">
                        <label>
                            <input type="checkbox" checked> Bao gồm điểm chi tiết
                        </label>
                        <label>
                            <input type="checkbox" checked> Bao gồm thống kê
                        </label>
                        <label>
                            <input type="checkbox"> Chỉ học sinh đã nộp
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary close-btn">Hủy</button>
                    <button class="btn-primary export-confirm">Xuất báo cáo</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    modal.querySelector('.export-confirm').addEventListener('click', function() {
        const exportType = modal.querySelector('input[name="exportType"]:checked').value;
        exportData(exportType);
        modal.remove();
    });
}

function exportData(type) {
    showNotification(`Đang xuất file ${type.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Đã xuất file ${type.toUpperCase()} thành công!`, 'success');
    }, 2000);
}

function saveGradingSession() {
    showNotification('Đang lưu bài chấm...', 'info');
    
    setTimeout(() => {
        showNotification('Đã lưu bài chấm thành công!', 'success');
    }, 1000);
}

// Chart Animations
function animateCharts() {
    const bars = document.querySelectorAll('.bar');
    const progressBars = document.querySelectorAll('.stat-progress');
    
    setTimeout(() => {
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '0';
                bar.style.transform = 'scaleY(0)';
                
                setTimeout(() => {
                    bar.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.opacity = '1';
                    bar.style.transform = 'scaleY(1)';
                }, 50);
            }, index * 100);
        });
    }, 500);

    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width;
            }, 50);
        }, index * 150);
    });
}

// Update Table
function updateTableWithData() {
    // This would populate the table with actual data from the uploaded file
    // For now, just refresh the display
    updateTableFooter();
}

function updateTableFooter() {
    const visibleRows = document.querySelectorAll('.results-table tbody tr:not([style*="display: none"])');
    const totalRows = document.querySelectorAll('.results-table tbody tr');
    const footerText = document.querySelector('.footer-text');
    
    if (footerText) {
        footerText.textContent = `Hiện thị: ${visibleRows.length} / ${totalRows.length} học sinh`;
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

// Add notification styles dynamically
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

    .export-modal .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.2s;
    }

    .export-modal .modal-content {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s;
    }

    .export-modal .modal-header {
        padding: 24px;
        border-bottom: 1px solid #E2E8F0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .export-modal .modal-header h3 {
        font-size: 18px;
        font-weight: 600;
    }

    .export-modal .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        color: #64748B;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
    }

    .export-modal .close-btn:hover {
        background: #F1F5F9;
    }

    .export-modal .modal-body {
        padding: 24px;
    }

    .export-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 24px;
    }

    .export-option {
        padding: 20px;
        border: 2px solid #E2E8F0;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s;
    }

    .export-option:hover {
        border-color: #2563EB;
        background: #EEF2FF;
    }

    .export-option input[type="radio"] {
        display: none;
    }

    .export-option input[type="radio"]:checked + span {
        color: #2563EB;
        font-weight: 600;
    }

    .export-option:has(input:checked) {
        border-color: #2563EB;
        background: #EEF2FF;
    }

    .export-settings {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .export-settings label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        cursor: pointer;
    }

    .export-modal .modal-footer {
        padding: 24px;
        border-top: 1px solid #E2E8F0;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    }

    .btn-secondary {
        padding: 10px 20px;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        background: white;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-secondary:hover {
        background: #F8FAFC;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Select handlers
document.querySelectorAll('.form-select').forEach(select => {
    select.addEventListener('change', function() {
        if (this.value) {
            this.style.color = '#0F172A';
        }
    });
});

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
        document.querySelectorAll('.tooltip').forEach(t => t.remove());
    });
});