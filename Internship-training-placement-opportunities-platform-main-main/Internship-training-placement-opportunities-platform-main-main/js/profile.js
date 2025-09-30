// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Load profile data
    loadProfileData();
});

function loadProfileData() {
    // Get profile data from localStorage or use default data
    const profileData = JSON.parse(localStorage.getItem('studentProfile')) || getDefaultProfileData();
    
    // Populate profile page with data
    populateProfileData(profileData);
}

function getDefaultProfileData() {
    return {
        personalInfo: {
            fullName: "John Doe",
            email: "john.doe@xyz.edu",
            phone: "+1 (555) 123-4567",
            dob: "2000-01-15",
            location: "New York, NY",
            studentId: "S12345678"
        },
        education: {
            degree: "Bachelor of Technology in Computer Science",
            institution: "XYZ University",
            department: "Computer Science",
            cgpa: "3.8",
            graduationYear: "2024"
        },
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "HTML/CSS", "Git"],
        experience: {
            jobTitle: "Web Development Intern",
            company: "Tech Solutions Inc.",
            startDate: "2023-06",
            endDate: "2023-08",
            description: "Developed responsive web applications using React and Node.js. Collaborated with senior developers on client projects."
        },
        projects: [
            {
                title: "E-Commerce Website",
                description: "Built a full-stack e-commerce platform with React frontend and Node.js backend"
            },
            {
                title: "Task Management App",
                description: "Developed a collaborative task management application with real-time updates"
            }
        ],
        stats: {
            applied: 3,
            interviews: 1,
            offers: 0,
            completion: 80
        }
    };
}

function populateProfileData(data) {
    // Personal Information
    document.getElementById('profileName').textContent = data.personalInfo.fullName;
    document.getElementById('profileAvatar').textContent = data.personalInfo.fullName.charAt(0);
    document.getElementById('profileTitle').textContent = `${data.education.department} Student`;
    document.getElementById('profileCollege').textContent = data.education.institution;
    
    // Stats
    document.getElementById('appliedCount').textContent = data.stats.applied;
    document.getElementById('interviewCount').textContent = data.stats.interviews;
    document.getElementById('offerCount').textContent = data.stats.offers;
    document.getElementById('profileCompletion').textContent = data.stats.completion + '%';
    
    // Personal Info Details
    document.getElementById('infoFullName').textContent = data.personalInfo.fullName;
    document.getElementById('infoEmail').textContent = data.personalInfo.email;
    document.getElementById('infoPhone').textContent = data.personalInfo.phone;
    document.getElementById('infoDob').textContent = formatDate(data.personalInfo.dob);
    document.getElementById('infoLocation').textContent = data.personalInfo.location;
    document.getElementById('infoStudentId').textContent = data.personalInfo.studentId;
    
    // Education
    document.getElementById('eduDegree').textContent = data.education.degree;
    document.getElementById('eduInstitution').textContent = data.education.institution;
    document.getElementById('eduDuration').textContent = `2020 - ${data.education.graduationYear} | CGPA: ${data.education.cgpa}/4.0`;
    
    // Skills
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = data.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    // Experience
    document.getElementById('expTitle').textContent = data.experience.jobTitle;
    document.getElementById('expCompany').textContent = data.experience.company;
    document.getElementById('expDuration').textContent = `${formatMonthYear(data.experience.startDate)} - ${formatMonthYear(data.experience.endDate)}`;
    document.getElementById('expDescription').textContent = data.experience.description;
    
    // Projects
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = data.projects.map(project => `
        <div class="project-item">
            <h4>${project.title}</h4>
            <p class="project-description">${project.description}</p>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatMonthYear(dateString) {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString + '-01').toLocaleDateString('en-US', options);
}

function changeAvatar() {
    // Simple avatar change - in real app, this would upload an image
    const avatars = ['U', 'J', 'D', 'S', 'A'];
    const currentAvatar = document.getElementById('profileAvatar').textContent;
    const currentIndex = avatars.indexOf(currentAvatar);
    const nextIndex = (currentIndex + 1) % avatars.length;
    
    document.getElementById('profileAvatar').textContent = avatars[nextIndex];
    document.getElementById('userAvatar').textContent = avatars[nextIndex];
    
    // Update localStorage
    const profileData = JSON.parse(localStorage.getItem('studentProfile')) || getDefaultProfileData();
    profileData.avatar = avatars[nextIndex];
    localStorage.setItem('studentProfile', JSON.stringify(profileData));
}

function downloadResume() {
    alert('Resume download functionality would be implemented here!');
    // In a real application, this would generate and download a PDF resume
}