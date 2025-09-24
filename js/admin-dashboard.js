// Admin Dashboard Main Controller
class AdminDashboard {
    constructor() {
        this.currentTab = 'dashboard';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentFilters = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCharts();
        this.loadDashboardData();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.classList.contains('logout')) return;
                
                const tab = e.target.dataset.tab;
                if (tab) this.switchTab(tab);
            });
        });

        // Dashboard date filter
        const dashboardDateFilter = document.getElementById('dashboardDateFilter');
        if (dashboardDateFilter) {
            dashboardDateFilter.addEventListener('change', (e) => {
                this.refreshDashboardStats(e.target.value);
            });
        }

        // Booking search and filters
        const bookingSearch = document.getElementById('bookingSearch');
        if (bookingSearch) {
            bookingSearch.addEventListener('input', this.debounce((e) => {
                this.currentFilters.search = e.target.value;
                this.refreshBookingsTable();
            }, 500));
        }

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilters.status = e.target.value;
                this.refreshBookingsTable();
            });
        }

        const monasteryFilter = document.getElementById('monasteryFilter');
        if (monasteryFilter) {
            monasteryFilter.addEventListener('change', (e) => {
                this.currentFilters.monastery = e.target.value;
                this.refreshBookingsTable();
            });
        }

        // Export bookings
        const exportBtn = document.getElementById('exportBookings');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                if (window.bookingManager) {
                    window.bookingManager.exportToCSV();
                    this.showNotification('Bookings exported successfully!', 'success');
                }
            });
        }
    }

    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Show/hide tabs
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        this.currentTab = tabName;

        // Load tab-specific data
        switch (tabName) {
            case 'dashboard':
                this.refreshDashboardStats();
                break;
            case 'bookings':
                this.refreshBookingsTable();
                this.loadMonasteryFilter();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
        }
    }

    refreshDashboardStats(dateFilter = 'month') {
        if (!window.bookingManager) return;

        const stats = window.bookingManager.getStatistics(dateFilter);
        
        // Update stat cards
        document.getElementById('totalBookings').textContent = stats.totalBookings;
        document.getElementById('totalGuests').textContent = stats.totalGuests;
        document.getElementById('totalRevenue').textContent = `₹${stats.totalRevenue.toLocaleString()}`;
        document.getElementById('avgRating').textContent = stats.avgRating.toFixed(1);

        // Load recent bookings
        this.loadRecentBookings(stats.recentBookings);
    }

    loadRecentBookings(bookings) {
        const container = document.getElementById('recentBookingsList');
        if (!container) return;

        if (bookings.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No recent bookings found.</p>';
            return;
        }

        container.innerHTML = bookings.map(booking => `
            <div class="booking-item" style="
                border: 1px solid #e0e0e0;
                border-radius: 10px;
                padding: 1rem;
                margin-bottom: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1rem;">
                        ${booking.guestName}
                    </h4>
                    <p style="margin: 0; color: #666; font-size: 0.85rem;">
                        <i class="fas fa-map-marker-alt"></i> ${booking.monastery}
                    </p>
                    <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.8rem;">
                        <i class="fas fa-calendar"></i> ${this.formatDate(booking.checkIn)} - ${this.formatDate(booking.checkOut)}
                    </p>
                </div>
                <div style="text-align: right;">
                    <div class="status-badge status-${booking.status}" style="margin-bottom: 0.5rem;">
                        ${booking.status}
                    </div>
                    <p style="margin: 0; font-weight: 600; color: #2c3e50;">
                        ₹${booking.amount.toLocaleString()}
                    </p>
                </div>
            </div>
        `).join('');
    }

    refreshBookingsTable() {
        if (!window.bookingManager) return;

        const result = window.bookingManager.getBookings(
            this.currentFilters, 
            this.currentPage, 
            this.itemsPerPage
        );
        
        this.renderBookingsTable(result.bookings);
        this.renderPagination(result.pagination);
    }

    renderBookingsTable(bookings) {
        const tbody = document.getElementById('bookingsTableBody');
        if (!tbody) return;

        if (bookings.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2rem; color: #666;">
                        No bookings found matching your criteria.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = bookings.map(booking => `
            <tr>
                <td style="font-weight: 600; color: #2c3e50;">${booking.id}</td>
                <td>
                    <div>
                        <div style="font-weight: 600;">${booking.guestName}</div>
                        <div style="font-size: 0.8rem; color: #666;">${booking.email}</div>
                        <div style="font-size: 0.8rem; color: #666;">${booking.phone}</div>
                    </div>
                </td>
                <td>
                    <div style="font-weight: 500;">${booking.monastery}</div>
                    <div style="font-size: 0.8rem; color: #666;">${booking.roomType || 'Standard'}</div>
                </td>
                <td>${this.formatDate(booking.checkIn)}</td>
                <td>${this.formatDate(booking.checkOut)}</td>
                <td style="text-align: center;">${booking.guests}</td>
                <td style="font-weight: 600;">₹${booking.amount.toLocaleString()}</td>
                <td>
                    <span class="status-badge status-${booking.status}">${booking.status}</span>
                </td>
                <td>
                    <button class="action-btn view" onclick="adminDashboard.viewBooking('${booking.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="adminDashboard.editBookingStatus('${booking.id}')" title="Edit Status">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteBooking('${booking.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderPagination(pagination) {
        const container = document.getElementById('bookingsPagination');
        if (!container) return;

        const { page, totalPages, hasPrev, hasNext } = pagination;

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <button ${!hasPrev ? 'disabled' : ''} onclick="adminDashboard.changePage(${page - 1})">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
        `;

        // Page numbers
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="${i === page ? 'active' : ''}" onclick="adminDashboard.changePage(${i})">
                    ${i}
                </button>
            `;
        }

        // Next button
        paginationHTML += `
            <button ${!hasNext ? 'disabled' : ''} onclick="adminDashboard.changePage(${page + 1})">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;

        container.innerHTML = paginationHTML;
    }

    changePage(page) {
        this.currentPage = page;
        this.refreshBookingsTable();
    }

    loadMonasteryFilter() {
        if (!window.bookingManager) return;

        const monasteries = [...new Set(window.bookingManager.bookings.map(b => b.monastery))];
        const select = document.getElementById('monasteryFilter');
        
        if (select) {
            select.innerHTML = '<option value="all">All Monasteries</option>' +
                monasteries.map(monastery => `<option value="${monastery}">${monastery}</option>`).join('');
        }
    }

    viewBooking(bookingId) {
        if (!window.bookingManager) return;

        const booking = window.bookingManager.getBookingById(bookingId);
        if (!booking) return;

        const modal = document.getElementById('bookingDetailsModal');
        const content = document.getElementById('bookingDetailsContent');
        
        if (modal && content) {
            content.innerHTML = `
                <h2 style="font-family: 'Playfair Display', serif; color: #2c3e50; margin-bottom: 1.5rem;">
                    Booking Details - ${booking.id}
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <div>
                        <h4>Guest Information</h4>
                        <p><strong>Name:</strong> ${booking.guestName}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>Nationality:</strong> ${booking.nationality || 'Not specified'}</p>
                    </div>
                    
                    <div>
                        <h4>Booking Information</h4>
                        <p><strong>Monastery:</strong> ${booking.monastery}</p>
                        <p><strong>Room Type:</strong> ${booking.roomType || 'Standard'}</p>
                        <p><strong>Guests:</strong> ${booking.guests}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${booking.status}">${booking.status}</span></p>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <div>
                        <h4>Stay Dates</h4>
                        <p><strong>Check-in:</strong> ${this.formatDate(booking.checkIn)}</p>
                        <p><strong>Check-out:</strong> ${this.formatDate(booking.checkOut)}</p>
                        <p><strong>Nights:</strong> ${this.calculateNights(booking.checkIn, booking.checkOut)}</p>
                    </div>
                    
                    <div>
                        <h4>Payment Information</h4>
                        <p><strong>Total Amount:</strong> ₹${booking.amount.toLocaleString()}</p>
                        <p><strong>Payment Method:</strong> ${booking.paymentMethod || 'Not specified'}</p>
                        <p><strong>Booking Date:</strong> ${this.formatDate(booking.bookingDate)}</p>
                    </div>
                </div>
                
                ${booking.specialRequests ? `
                    <div style="margin-bottom: 1.5rem;">
                        <h4>Special Requests</h4>
                        <p style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">${booking.specialRequests}</p>
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                    <button onclick="adminDashboard.editBookingStatus('${booking.id}')" style="
                        background: #f39c12;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                    ">
                        <i class="fas fa-edit"></i> Update Status
                    </button>
                    
                    <button onclick="adminDashboard.closeBookingModal()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                    ">
                        Close
                    </button>
                </div>
            `;
            
            modal.style.display = 'flex';
        }
    }

    editBookingStatus(bookingId) {
        const newStatus = prompt('Enter new status (confirmed, pending, cancelled, completed):');
        if (newStatus && ['confirmed', 'pending', 'cancelled', 'completed'].includes(newStatus.toLowerCase())) {
            if (window.bookingManager) {
                window.bookingManager.updateBookingStatus(bookingId, newStatus.toLowerCase());
                this.refreshBookingsTable();
                this.refreshDashboardStats();
                this.showNotification('Booking status updated successfully!', 'success');
                this.closeBookingModal();
            }
        } else if (newStatus !== null) {
            this.showNotification('Invalid status. Please use: confirmed, pending, cancelled, or completed', 'error');
        }
    }

    deleteBooking(bookingId) {
        if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
            if (window.bookingManager) {
                window.bookingManager.deleteBooking(bookingId);
                this.refreshBookingsTable();
                this.refreshDashboardStats();
                this.showNotification('Booking deleted successfully!', 'success');
            }
        }
    }

    closeBookingModal() {
        const modal = document.getElementById('bookingDetailsModal');
        if (modal) modal.style.display = 'none';
    }

    loadAnalytics() {
        if (!window.bookingManager) return;

        this.loadMonasteryStats();
        this.updateCharts();
    }

    loadMonasteryStats() {
        const stats = window.bookingManager.getMonasteryStats();
        const container = document.getElementById('monasteryStats');
        
        if (container) {
            container.innerHTML = stats.map((stat, index) => `
                <div class="monastery-stat-item">
                    <div>
                        <h4 style="margin: 0; font-size: 0.9rem;">${stat.name}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: #666;">${stat.bookings} bookings</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; font-weight: 600;">₹${stat.revenue.toLocaleString()}</p>
                        <p style="margin: 0; font-size: 0.8rem; color: #666;">${stat.guests} guests</p>
                    </div>
                </div>
            `).join('');
        }
    }

    setupCharts() {
        // This is a placeholder for chart setup
        // In a real implementation, you would use Chart.js or similar
        console.log('Charts initialized');
    }

    updateCharts() {
        // Placeholder for chart updates
        console.log('Charts updated');
    }

    showNotification(message, type = 'info') {
        if (window.adminAuth) {
            window.adminAuth.showNotification(message, type);
        }
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    calculateNights(checkIn, checkOut) {
        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    debounce(func, wait) {
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

    refresh() {
        if (this.currentTab === 'dashboard') {
            this.refreshDashboardStats();
        } else if (this.currentTab === 'bookings') {
            this.refreshBookingsTable();
        }
    }
}

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});

// Close modal when clicking outside or on close button
document.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingDetailsModal');
    if (e.target === modal || e.target.classList.contains('close')) {
        if (window.adminDashboard) {
            window.adminDashboard.closeBookingModal();
        }
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminDashboard;
}