// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Check authentication
    checkAuth();

    // Load user data
    loadUserData();

    // Initialize dashboard components
    initializeDashboard();
});

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(currentUser);
    if (!user.isLoggedIn) {
        window.location.href = 'login.html';
    }
}

function loadUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        
        // Update user avatar with first letter of role
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.textContent = user.role.charAt(0).toUpperCase();
        }
        
        // Update role badge
        const userRole = document.querySelector('.user-role');
        if (userRole) {
            let roleText = '';
            switch(user.role) {
                case 'student':
                    roleText = 'Student';
                    break;
                case 'placement':
                    roleText = 'Placement Cell';
                    break;
                case 'recruiter':
                    roleText = 'Industry Recruiter';
                    break;
            }
            userRole.textContent = roleText;
        }
    }
}

function initializeDashboard() {
    // Add event listeners to buttons
    const approveButtons = document.querySelectorAll('.btn-success');
    const declineButtons = document.querySelectorAll('.btn-danger');
    const actionButtons = document.querySelectorAll('.btn-outline');

    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            handleApplicationAction(row, 'approved');
        });
    });

    declineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            handleApplicationAction(row, 'declined');
        });
    });

    actionButtons.forEach(button => {
        if (!button.classList.contains('btn-danger')) {
            button.addEventListener('click', function() {
                // Handle view/edit actions
                const row = this.closest('tr');
                const action = this.textContent.toLowerCase();
                handleRowAction(row, action);
            });
        }
    });

    // Initialize application counts
    updateApplicationCounts();
}

function handleApplicationAction(row, action) {
    row.style.opacity = '0.5';
    row.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        row.remove();
        updateApplicationCounts();
        
        // Show notification
        showNotification(`Application ${action} successfully`, 'success');
    }, 300);
}

function handleRowAction(row, action) {
    // Simulate action based on button text
    switch(action) {
        case 'view':
            showNotification('Opening details...', 'info');
            break;
        case 'edit':
            showNotification('Opening editor...', 'info');
            break;
        case 'withdraw':
            if (confirm('Are you sure you want to withdraw this application?')) {
                handleApplicationAction(row, 'withdrawn');
            }
            break;
    }
}

function updateApplicationCounts() {
    // Update counts based on remaining applications
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const rowCount = table.querySelectorAll('tbody tr').length;
        // You could update specific counters here based on table ID or class
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Profile dropdown functionality
function initializeProfileDropdown() {
    const userAvatar = document.querySelector('.user-avatar');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (userAvatar && dropdownMenu) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.style.display = 'none';
        });
        
        // Load user avatar from profile data
        const profileData = JSON.parse(localStorage.getItem('studentProfile'));
        if (profileData && profileData.avatar) {
            userAvatar.textContent = profileData.avatar;
        } else if (profileData && profileData.personalInfo) {
            userAvatar.textContent = profileData.personalInfo.fullName.charAt(0);
        }
    }
}

// Call this function in your existing initializeDashboard function
function initializeDashboard() {
    // ... existing code ...
    
    // Initialize profile dropdown
    initializeProfileDropdown();
    
    // ... existing code ...
}

// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Check authentication
    checkAuth();

    // Load user data
    loadUserData();

    // Initialize dashboard components
    initializeDashboard();

    // Initialize profile dropdown
    initializeProfileDropdown();
});

function initializeProfileDropdown() {
    const userAvatar = document.querySelector('.user-avatar');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (userAvatar && dropdownMenu) {
        // Toggle dropdown on avatar click
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking on dropdown items
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
        
        // Close dropdown on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show');
            }
        });
    }
}

function loadUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        
        // Update user avatar with first letter of username or role
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            if (user.name) {
                userAvatar.textContent = user.name.charAt(0).toUpperCase();
            } else if (user.username) {
                userAvatar.textContent = user.username.charAt(0).toUpperCase();
            } else {
                userAvatar.textContent = user.role.charAt(0).toUpperCase();
            }
        }
        
        // Update role badge
        const userRole = document.querySelector('.user-role');
        if (userRole) {
            let roleText = '';
            switch(user.role) {
                case 'student':
                    roleText = 'Student';
                    break;
                case 'placement':
                    roleText = 'Placement Cell';
                    break;
                case 'recruiter':
                    roleText = 'Industry Recruiter';
                    break;
            }
            userRole.textContent = roleText;
        }
        
        // Update active menu item based on current page
        updateActiveMenuItem();
    }
}

function updateActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Also update dropdown active state
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(currentUser);
    if (!user.isLoggedIn) {
        window.location.href = 'login.html';
    }
}

function initializeDashboard() {
    // Add event listeners to buttons
    const approveButtons = document.querySelectorAll('.btn-success');
    const declineButtons = document.querySelectorAll('.btn-danger');
    const actionButtons = document.querySelectorAll('.btn-outline');

    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            handleApplicationAction(row, 'approved');
        });
    });

    declineButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            handleApplicationAction(row, 'declined');
        });
    });

    actionButtons.forEach(button => {
        if (!button.classList.contains('btn-danger')) {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const action = this.textContent.toLowerCase();
                handleRowAction(row, action);
            });
        }
    });

    // Initialize application counts
    updateApplicationCounts();
}


function handleApplicationAction(row, action) {
    row.style.opacity = '0.5';
    row.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        row.remove();
        updateApplicationCounts();
        showNotification(`Application ${action} successfully`, 'success');
    }, 300);
}

function handleRowAction(row, action) {
    switch(action) {
        case 'view':
            showNotification('Opening details...', 'info');
            break;
        case 'edit':
            showNotification('Opening editor...', 'info');
            break;
        case 'withdraw':
            if (confirm('Are you sure you want to withdraw this application?')) {
                handleApplicationAction(row, 'withdrawn');
            }
            break;
    }
}

function updateApplicationCounts() {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        const rowCount = table.querySelectorAll('tbody tr').length;
        // Update specific counters here if needed
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('studentProfile');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(notificationStyles);

