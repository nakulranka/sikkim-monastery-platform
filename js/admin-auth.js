// Admin Authentication System
class AdminAuth {
    constructor() {
        this.isAuthenticated = false;
        this.adminCredentials = {
            username: 'admin',
            password: 'sikkim123'
        };
        this.sessionKey = 'sikkimAdminSession';
        
        this.init();
    }

    init() {
        this.checkExistingSession();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form submission
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('adminLogout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Close modal on outside click
        const loginModal = document.getElementById('adminLoginModal');
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    this.closeLoginModal();
                }
            });
        }
    }

    checkExistingSession() {
        const session = localStorage.getItem(this.sessionKey);
        if (session) {
            try {
                const sessionData = JSON.parse(session);
                const now = new Date().getTime();
                
                // Session valid for 24 hours
                if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
                    this.isAuthenticated = true;
                    this.showDashboard();
                } else {
                    this.clearSession();
                }
            } catch (error) {
                this.clearSession();
            }
        } else {
            this.showLoginModal();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value.trim();
        
        if (this.validateCredentials(username, password)) {
            this.authenticateUser();
        } else {
            this.showError('Invalid username or password. Please try again.');
            this.shakeLoginForm();
        }
    }

    validateCredentials(username, password) {
        return username === this.adminCredentials.username && 
               password === this.adminCredentials.password;
    }

    authenticateUser() {
        this.isAuthenticated = true;
        
        // Store session
        const sessionData = {
            authenticated: true,
            timestamp: new Date().getTime(),
            username: this.adminCredentials.username
        };
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        
        // Show success and transition to dashboard
        this.showSuccess('Login successful! Welcome to admin dashboard.');
        
        setTimeout(() => {
            this.closeLoginModal();
            this.showDashboard();
        }, 1000);
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            this.isAuthenticated = false;
            this.clearSession();
            this.showLoginModal();
            this.showSuccess('Successfully logged out.');
        }
    }

    clearSession() {
        localStorage.removeItem(this.sessionKey);
        this.isAuthenticated = false;
    }

    showLoginModal() {
        const modal = document.getElementById('adminLoginModal');
        const dashboard = document.getElementById('adminDashboard');
        
        if (modal) {
            modal.style.display = 'flex';
            // Focus on username field
            setTimeout(() => {
                const usernameField = document.getElementById('adminUsername');
                if (usernameField) usernameField.focus();
            }, 100);
        }
        
        if (dashboard) {
            dashboard.style.display = 'none';
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('adminLoginModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Clear form
        const form = document.getElementById('adminLoginForm');
        if (form) {
            form.reset();
        }
    }

    showDashboard() {
        const modal = document.getElementById('adminLoginModal');
        const dashboard = document.getElementById('adminDashboard');
        
        if (modal) {
            modal.style.display = 'none';
        }
        
        if (dashboard) {
            dashboard.style.display = 'block';
            
            // Initialize dashboard if not already done
            if (window.adminDashboard) {
                window.adminDashboard.refresh();
            }
        }
    }

    shakeLoginForm() {
        const form = document.getElementById('adminLoginForm');
        if (form) {
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('adminNotification');
        if (!notification) return;

        const icon = notification.querySelector('.notification-icon');
        const messageEl = notification.querySelector('.notification-message');
        
        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle'
        };
        
        if (icon) {
            icon.className = `notification-icon ${icons[type] || icons.info}`;
        }
        
        if (messageEl) {
            messageEl.textContent = message;
        }
        
        // Set notification class
        notification.className = `admin-notification ${type} show`;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                notification.classList.remove('show');
            };
        }
    }

    // Utility method to check if user is authenticated
    requireAuth(callback) {
        if (this.isAuthenticated) {
            callback();
        } else {
            this.showError('Authentication required. Please login first.');
            this.showLoginModal();
        }
    }

    // Get current session info
    getSessionInfo() {
        if (this.isAuthenticated) {
            const session = localStorage.getItem(this.sessionKey);
            if (session) {
                try {
                    return JSON.parse(session);
                } catch (error) {
                    return null;
                }
            }
        }
        return null;
    }
}

// Initialize admin authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminAuth = new AdminAuth();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminAuth;
}