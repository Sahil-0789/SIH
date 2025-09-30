// Edit Profile Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Load existing profile data
    loadEditFormData();

    // Initialize skills functionality
    initializeSkills();

    // Initialize projects functionality
    initializeProjects();

    // Form submission
    document.getElementById('editProfileForm').addEventListener('submit', handleFormSubmit);
});

function loadEditFormData() {
    const profileData = JSON.parse(localStorage.getItem('studentProfile')) || getDefaultProfileData();
    
    // Personal Information
    document.getElementById('editFullName').value = profileData.personalInfo.fullName;
    document.getElementById('editEmail').value = profileData.personalInfo.email;
    document.getElementById('editPhone').value = profileData.personalInfo.phone;
    document.getElementById('editDob').value = profileData.personalInfo.dob;
    document.getElementById('editLocation').value = profileData.personalInfo.location;
    document.getElementById('editStudentId').value = profileData.personalInfo.studentId;
    
    // Education
    document.getElementById('editDegree').value = profileData.education.degree;
    document.getElementById('editInstitution').value = profileData.education.institution;
    document.getElementById('editDepartment').value = profileData.education.department;
    document.getElementById('editCgpa').value = profileData.education.cgpa;
    document.getElementById('editGraduationYear').value = profileData.education.graduationYear;
    
    // Skills
    profileData.skills.forEach(skill => {
        addSkillToForm(skill);
    });
    
    // Experience
    document.getElementById('editJobTitle').value = profileData.experience.jobTitle;
    document.getElementById('editCompany').value = profileData.experience.company;
    document.getElementById('editStartDate').value = profileData.experience.startDate;
    document.getElementById('editEndDate').value = profileData.experience.endDate;
    document.getElementById('editJobDescription').value = profileData.experience.description;
    
    // Projects
    profileData.projects.forEach((project, index) => {
        addProjectField(project.title, project.description);
    });
}

function initializeSkills() {
    const skillInput = document.getElementById('skillInput');
    
    skillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });
    
    skillInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            addSkill();
        }
    });
}

function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (skill) {
        addSkillToForm(skill);
        skillInput.value = '';
    }
}

function addSkillToForm(skill) {
    const skillsTags = document.getElementById('skillsTags');
    const skillId = 'skill-' + Date.now();
    
    const skillTag = document.createElement('div');
    skillTag.className = 'skill-tag-editable';
    skillTag.innerHTML = `
        ${skill}
        <button type="button" class="remove-skill" onclick="removeSkill('${skillId}')">
            <i data-lucide="x"></i>
        </button>
    `;
    skillTag.id = skillId;
    
    skillsTags.appendChild(skillTag);
    lucide.createIcons();
}

function removeSkill(skillId) {
    const skillElement = document.getElementById(skillId);
    if (skillElement) {
        skillElement.remove();
    }
}

function initializeProjects() {
    // Add initial project field if none exist
    if (document.querySelectorAll('.project-field').length === 0) {
        addProjectField();
    }
}

function addProjectField(title = '', description = '') {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectId = 'project-' + Date.now();
    
    const projectField = document.createElement('div');
    projectField.className = 'project-field';
    projectField.id = projectId;
    projectField.innerHTML = `
        <div class="project-field-header">
            <h3>Project</h3>
            <button type="button" class="remove-project" onclick="removeProject('${projectId}')">
                Remove
            </button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" class="form-input" value="${title}" placeholder="Project title">
            </div>
            <div class="form-group full-width">
                <label>Description</label>
                <textarea class="form-textarea" placeholder="Project description" rows="3">${description}</textarea>
            </div>
        </div>
    `;
    
    projectsContainer.appendChild(projectField);
}

function removeProject(projectId) {
    const projectElement = document.getElementById(projectId);
    if (projectElement) {
        projectElement.remove();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        saveProfileData();
        alert('Profile updated successfully!');
        window.location.href = 'student-profile.html';
    }
}

function validateForm() {
    // Basic validation
    const requiredFields = document.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            alert(`Please fill in the ${field.labels[0].textContent} field`);
            field.focus();
            return false;
        }
    }
    
    // Email validation
    const email = document.getElementById('editEmail').value;
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveProfileData() {
    const profileData = {
        personalInfo: {
            fullName: document.getElementById('editFullName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            dob: document.getElementById('editDob').value,
            location: document.getElementById('editLocation').value,
            studentId: document.getElementById('editStudentId').value
        },
        education: {
            degree: document.getElementById('editDegree').value,
            institution: document.getElementById('editInstitution').value,
            department: document.getElementById('editDepartment').value,
            cgpa: document.getElementById('editCgpa').value,
            graduationYear: document.getElementById('editGraduationYear').value
        },
        skills: Array.from(document.querySelectorAll('.skill-tag-editable')).map(tag => 
            tag.textContent.replace('×', '').trim()
        ),
        experience: {
            jobTitle: document.getElementById('editJobTitle').value,
            company: document.getElementById('editCompany').value,
            startDate: document.getElementById('editStartDate').value,
            endDate: document.getElementById('editEndDate').value,
            description: document.getElementById('editJobDescription').value
        },
        projects: Array.from(document.querySelectorAll('.project-field')).map(field => ({
            title: field.querySelector('input[type="text"]').value,
            description: field.querySelector('textarea').value
        })).filter(project => project.title || project.description)
    };
    
    localStorage.setItem('studentProfile', JSON.stringify(profileData));
}