// Booking Manager - Handles all booking data storage and management
class BookingManager {
    constructor() {
        this.storageKey = 'sikkimMonasteryBookings';
        this.bookings = [];
        this.monasteryPrices = {
            'Rumtek Monastery': { base: 2500, premium: 4000 },
            'Pemayangtse Monastery': { base: 2200, premium: 3500 },
            'Enchey Monastery': { base: 2000, premium: 3200 },
            'Tashiding Monastery': { base: 1800, premium: 2800 },
            'Ralang Monastery': { base: 2300, premium: 3800 },
            'Dubdi Monastery': { base: 1900, premium: 3000 },
            'Phensang Monastery': { base: 2100, premium: 3400 },
            'Ralong Monastery': { base: 2000, premium: 3200 }
        };
        
        this.init();
    }

    init() {
        this.loadBookings();
        this.generateSampleData(); // For demonstration
    }

    // Generate sample booking data for demonstration
    generateSampleData() {
        if (this.bookings.length === 0) {
            const sampleBookings = [
                {
                    id: 'BK001',
                    guestName: 'Rajesh Kumar',
                    email: 'rajesh@email.com',
                    phone: '+91 9876543210',
                    monastery: 'Rumtek Monastery',
                    checkIn: '2024-12-15',
                    checkOut: '2024-12-18',
                    guests: 2,
                    roomType: 'Premium',
                    amount: 12000,
                    status: 'confirmed',
                    bookingDate: '2024-12-01',
                    specialRequests: 'Vegetarian meals, early morning meditation session',
                    paymentMethod: 'Credit Card',
                    nationality: 'Indian'
                },
                {
                    id: 'BK002',
                    guestName: 'Sarah Johnson',
                    email: 'sarah@email.com',
                    phone: '+1 555-0123',
                    monastery: 'Pemayangtse Monastery',
                    checkIn: '2024-12-20',
                    checkOut: '2024-12-22',
                    guests: 1,
                    roomType: 'Base',
                    amount: 4400,
                    status: 'pending',
                    bookingDate: '2024-11-28',
                    specialRequests: 'Airport pickup required',
                    paymentMethod: 'PayPal',
                    nationality: 'American'
                },
                {
                    id: 'BK003',
                    guestName: 'Priya Sharma',
                    email: 'priya@email.com',
                    phone: '+91 8765432109',
                    monastery: 'Enchey Monastery',
                    checkIn: '2024-12-10',
                    checkOut: '2024-12-12',
                    guests: 3,
                    roomType: 'Premium',
                    amount: 9600,
                    status: 'completed',
                    bookingDate: '2024-11-25',
                    specialRequests: 'Family room, child-friendly meals',
                    paymentMethod: 'UPI',
                    nationality: 'Indian'
                }
            ];

            sampleBookings.forEach(booking => {
                this.bookings.push(booking);
            });
            
            this.saveBookings();
        }
    }

    // Save booking data to localStorage
    saveBookings() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.bookings));
            return true;
        } catch (error) {
            console.error('Error saving bookings:', error);
            return false;
        }
    }

    // Load booking data from localStorage
    loadBookings() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.bookings = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
            this.bookings = [];
        }
    }

    // Add new booking
    addBooking(bookingData) {
        const booking = {
            id: this.generateBookingId(),
            ...bookingData,
            bookingDate: new Date().toISOString().split('T')[0],
            status: 'pending'
        };

        // Calculate amount if not provided
        if (!booking.amount) {
            booking.amount = this.calculateAmount(booking);
        }

        this.bookings.unshift(booking); // Add to beginning
        this.saveBookings();
        
        return booking;
    }

    // Generate unique booking ID
    generateBookingId() {
        const prefix = 'BK';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${timestamp}${random}`;
    }

    // Calculate booking amount
    calculateAmount(booking) {
        const monastery = booking.monastery;
        const roomType = booking.roomType || 'base';
        const guests = booking.guests || 1;
        
        if (!this.monasteryPrices[monastery]) {
            return 2000 * guests; // Default price
        }

        const basePrice = this.monasteryPrices[monastery][roomType.toLowerCase()] || 2000;
        const nights = this.calculateNights(booking.checkIn, booking.checkOut);
        
        return basePrice * nights * Math.ceil(guests / 2); // Assuming 2 guests per room
    }

    // Calculate number of nights
    calculateNights(checkIn, checkOut) {
        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, diffDays);
    }

    // Get all bookings with filtering and pagination
    getBookings(filters = {}, page = 1, limit = 10) {
        let filteredBookings = [...this.bookings];

        // Apply filters
        if (filters.search) {
            const search = filters.search.toLowerCase();
            filteredBookings = filteredBookings.filter(booking => 
                booking.guestName.toLowerCase().includes(search) ||
                booking.email.toLowerCase().includes(search) ||
                booking.phone.includes(search) ||
                booking.id.toLowerCase().includes(search) ||
                booking.monastery.toLowerCase().includes(search)
            );
        }

        if (filters.status && filters.status !== 'all') {
            filteredBookings = filteredBookings.filter(booking => 
                booking.status === filters.status
            );
        }

        if (filters.monastery && filters.monastery !== 'all') {
            filteredBookings = filteredBookings.filter(booking => 
                booking.monastery === filters.monastery
            );
        }

        if (filters.dateFrom) {
            filteredBookings = filteredBookings.filter(booking => 
                booking.checkIn >= filters.dateFrom
            );
        }

        if (filters.dateTo) {
            filteredBookings = filteredBookings.filter(booking => 
                booking.checkOut <= filters.dateTo
            );
        }

        // Calculate pagination
        const total = filteredBookings.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        
        const paginatedBookings = filteredBookings.slice(start, end);

        return {
            bookings: paginatedBookings,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    // Get booking by ID
    getBookingById(id) {
        return this.bookings.find(booking => booking.id === id);
    }

    // Update booking
    updateBooking(id, updates) {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], ...updates };
            this.saveBookings();
            return this.bookings[index];
        }
        return null;
    }

    // Update booking status
    updateBookingStatus(id, status) {
        return this.updateBooking(id, { status });
    }

    // Delete booking
    deleteBooking(id) {
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index !== -1) {
            const deleted = this.bookings.splice(index, 1)[0];
            this.saveBookings();
            return deleted;
        }
        return null;
    }

    // Get booking statistics
    getStatistics(dateFilter = 'all') {
        const now = new Date();
        let filteredBookings = this.bookings;

        // Apply date filter
        switch (dateFilter) {
            case 'today':
                filteredBookings = this.bookings.filter(booking => {
                    const bookingDate = new Date(booking.bookingDate);
                    return bookingDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredBookings = this.bookings.filter(booking => {
                    const bookingDate = new Date(booking.bookingDate);
                    return bookingDate >= weekAgo;
                });
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filteredBookings = this.bookings.filter(booking => {
                    const bookingDate = new Date(booking.bookingDate);
                    return bookingDate >= monthAgo;
                });
                break;
        }

        const totalBookings = filteredBookings.length;
        const totalGuests = filteredBookings.reduce((sum, booking) => sum + booking.guests, 0);
        const totalRevenue = filteredBookings.reduce((sum, booking) => sum + booking.amount, 0);
        
        const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed');
        const pendingBookings = filteredBookings.filter(b => b.status === 'pending');
        const completedBookings = filteredBookings.filter(b => b.status === 'completed');
        const cancelledBookings = filteredBookings.filter(b => b.status === 'cancelled');

        // Calculate average rating (mock data for now)
        const avgRating = 4.2;

        return {
            totalBookings,
            totalGuests,
            totalRevenue,
            avgRating,
            statusBreakdown: {
                confirmed: confirmedBookings.length,
                pending: pendingBookings.length,
                completed: completedBookings.length,
                cancelled: cancelledBookings.length
            },
            recentBookings: this.bookings.slice(0, 5)
        };
    }

    // Get monastery popularity stats
    getMonasteryStats() {
        const monasteryStats = {};
        
        this.bookings.forEach(booking => {
            const monastery = booking.monastery;
            if (!monasteryStats[monastery]) {
                monasteryStats[monastery] = {
                    name: monastery,
                    bookings: 0,
                    revenue: 0,
                    guests: 0
                };
            }
            
            monasteryStats[monastery].bookings++;
            monasteryStats[monastery].revenue += booking.amount;
            monasteryStats[monastery].guests += booking.guests;
        });

        return Object.values(monasteryStats)
            .sort((a, b) => b.bookings - a.bookings);
    }

    // Export bookings to CSV
    exportToCSV() {
        const headers = [
            'Booking ID', 'Guest Name', 'Email', 'Phone', 'Monastery',
            'Check-in', 'Check-out', 'Guests', 'Room Type', 'Amount',
            'Status', 'Booking Date', 'Payment Method', 'Nationality'
        ];

        const csvContent = [
            headers.join(','),
            ...this.bookings.map(booking => [
                booking.id,
                booking.guestName,
                booking.email,
                booking.phone,
                booking.monastery,
                booking.checkIn,
                booking.checkOut,
                booking.guests,
                booking.roomType,
                booking.amount,
                booking.status,
                booking.bookingDate,
                booking.paymentMethod || '',
                booking.nationality || ''
            ].join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `sikkim_monastery_bookings_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Get booking trends data for charts
    getBookingTrends(period = 'month') {
        const trends = {};
        const now = new Date();
        
        this.bookings.forEach(booking => {
            const date = new Date(booking.bookingDate);
            let key;
            
            if (period === 'month') {
                key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            } else if (period === 'week') {
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay());
                key = weekStart.toISOString().split('T')[0];
            } else {
                key = date.toISOString().split('T')[0];
            }
            
            if (!trends[key]) {
                trends[key] = { bookings: 0, revenue: 0 };
            }
            
            trends[key].bookings++;
            trends[key].revenue += booking.amount;
        });

        return trends;
    }
}

// Initialize booking manager
document.addEventListener('DOMContentLoaded', () => {
    window.bookingManager = new BookingManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BookingManager;
}