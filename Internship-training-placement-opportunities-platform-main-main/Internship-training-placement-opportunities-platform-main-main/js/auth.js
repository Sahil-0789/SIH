// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Update username label based on role selection
    const roleSelect = document.getElementById('role');
    const usernameLabel = document.getElementById('usernameLabel');
    const usernameInput = document.getElementById('username');

    if (roleSelect && usernameLabel) {
        roleSelect.addEventListener('change', function() {
            const role = this.value;
            let labelText = '';
            let placeholderText = '';

            switch(role) {
                case 'student':
                    labelText = 'Student ID';
                    placeholderText = 'Enter your Student ID';
                    break;
                case 'placement':
                    labelText = 'Placement Officer ID';
                    placeholderText = 'Enter your Placement Officer ID';
                    break;
                case 'recruiter':
                    labelText = 'Recruiter ID';
                    placeholderText = 'Enter your Recruiter ID';
                    break;
            }

            usernameLabel.textContent = labelText;
            usernameInput.placeholder = placeholderText;
        });
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const role = formData.get('role');
            const username = formData.get('username');
            const password = formData.get('password');

            // Simple validation
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            await window.withButtonLoading(btn, async () => {
                await new Promise(r => setTimeout(r, 1000));
                window.showToast('success', 'Signed in successfully');
                simulateLogin(role, username, password);
            });
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            // Password confirmation check
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            await window.withButtonLoading(btn, async () => {
                await new Promise(r => setTimeout(r, 1200));
                window.showToast('success', 'Account created');
                simulateSignup();
            });
        });
    }
});

function simulateLogin(role, username, password) {
    // Show loading state
    const submitButton = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing in...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            role: role,
            username: username,
            isLoggedIn: true
        }));

        // Redirect to appropriate dashboard
        switch(role) {
            case 'student':
                window.location.href = 'student-dashboard.html';
                break;
            case 'placement':
                window.location.href = 'placement-dashboard.html';
                break;
            case 'recruiter':
                window.location.href = 'recruiter-dashboard.html';
                break;
        }
    }, 1000);
}

function simulateSignup() {
    // Show loading state
    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating account...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            role: 'student',
            isLoggedIn: true
        }));

        // Redirect to student dashboard
        window.location.href = 'student-dashboard.html';
    }, 1000);
}

// Check if user is logged in (for dashboard pages)
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

// Role selection functionality
function toggleRoleFields() {
    const role = document.getElementById('role').value;
    
    // Hide all role-specific fields
    document.querySelectorAll('.role-fields').forEach(field => {
        field.style.display = 'none';
        field.classList.remove('show');
    });
    
    // Clear all role-specific fields when role changes
    clearRoleFields();
    
    // Show fields for selected role
    if (role === 'student') {
        document.getElementById('studentFields').style.display = 'block';
        document.getElementById('studentFields').classList.add('show');
        // Make student fields required
        setFieldsRequired('studentFields', true);
    } 
    else if (role === 'recruiter') {
        document.getElementById('recruiterFields').style.display = 'block';
        document.getElementById('recruiterFields').classList.add('show');
        setFieldsRequired('recruiterFields', true);
    } 
    else if (role === 'placement') {
        document.getElementById('placementFields').style.display = 'block';
        document.getElementById('placementFields').classList.add('show');
        setFieldsRequired('placementFields', true);
    }
}

function clearRoleFields() {
    // Clear all role-specific input fields
    document.querySelectorAll('.role-fields input, .role-fields select').forEach(field => {
        field.value = '';
        field.required = false;
    });
}

function setFieldsRequired(containerId, required) {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelectorAll('input, select').forEach(field => {
            field.required = required;
        });
    }
}

// Enhanced form validation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Role selection change handler
    const roleSelect = document.getElementById('role');
    if (roleSelect) {
        roleSelect.addEventListener('change', toggleRoleFields);
    }

    // Password strength validation
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateSignupForm()) {
                return;
            }

            simulateSignup();
        });
    }
});

function validatePasswordStrength(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
    };

    // You can add visual feedback for password strength here
    return Object.values(requirements).every(Boolean);
}

function validateSignupForm() {
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Basic validation
    if (!role) {
        alert('Please select your role');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    if (!validatePasswordStrength(password)) {
        alert('Password must be at least 8 characters with uppercase, lowercase, and numbers');
        return false;
    }

    if (!terms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return false;
    }

    // Role-specific validation
    if (role === 'student') {
        const studentId = document.getElementById('studentId').value;
        const department = document.getElementById('department').value;
        if (!studentId || !department) {
            alert('Please fill in all student information');
            return false;
        }
    }
    else if (role === 'recruiter') {
        const company = document.getElementById('company').value;
        if (!company) {
            alert('Please provide company information');
            return false;
        }
    }
    else if (role === 'placement') {
        const institution = document.getElementById('institution').value;
        if (!institution) {
            alert('Please provide institution information');
            return false;
        }
    }

    return true;
}

function simulateSignup() {
    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating account...';
    submitButton.disabled = true;

    const role = document.getElementById('role').value;

    setTimeout(() => {
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            role: role,
            isLoggedIn: true,
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value
        }));

        // Redirect to appropriate dashboard
        switch(role) {
            case 'student':
                window.location.href = 'student-dashboard.html';
                break;
            case 'placement':
                window.location.href = 'placement-dashboard.html';
                break;
            case 'recruiter':
                window.location.href = 'recruiter-dashboard.html';
                break;
            default:
                window.location.href = 'student-dashboard.html';
        }
    }, 1500);
}