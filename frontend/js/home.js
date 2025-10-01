// SkillSwap JavaScript functionality
let currentSection = 'home';
let editMode = false;
let navigationHistory = [];

//Sample data
const userData = {
    name: 'Divya Sharma',
    username: '@divya_sharma',
    email: 'divya.sharma@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    bio: 'Passionate web developer and photographer. Love sharing knowledge and learning new skills. Always excited to connect with fellow learners and teachers!',
    teachingSkills: ['HTML/CSS', 'Photography', 'UI/UX Design'],
    learningSkills: ['Python', 'Public Speaking'],
    availability: {
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeSlots: ['morning', 'evening'],
        mode: 'online'
    }
};

const skillCategories = {
    'Tech': {
        icon: 'fas fa-laptop-code',
        skills: [
            { name: 'Python Programming', users: ['Aman Kumar', 'John Smith', 'Alex Johnson'] },
            { name: 'Web Development', users: ['Divya Sharma', 'Sara Wilson', 'Mike Brown'] },
            { name: 'Data Science', users: ['Emily Davis', 'Robert Lee', 'Anna Taylor'] },
            { name: 'Mobile App Development', users: ['David Clark', 'Lisa Anderson', 'Tom Wilson'] }
        ]
    },
    'Art & Design': {
        icon: 'fas fa-palette',
        skills: [
            { name: 'Digital Illustration', users: ['Maya Patel', 'Chris Martinez', 'Sophie Chen'] },
            { name: 'Photography', users: ['Divya Sharma', 'Mark Thompson', 'Nina Rodriguez'] },
            { name: 'UI/UX Design', users: ['Alex Kim', 'Rachel Green', 'James White'] },
            { name: 'Graphic Design', users: ['Sarah Johnson', 'Mike Davis', 'Emma Wilson'] }
        ]
    },
    'Music': {
        icon: 'fas fa-music',
        skills: [
            { name: 'Guitar Playing', users: ['Aman Kumar', 'Carlos Ruiz', 'Jenny Lee'] },
            { name: 'Piano', users: ['Maria Santos', 'Paul Anderson', 'Grace Liu'] },
            { name: 'Music Theory', users: ['Aman Kumar', 'Dr. Smith', 'Amanda Johnson'] },
            { name: 'Singing', users: ['Sophia Brown', 'Michael Green', 'Olivia Davis'] }
        ]
    },
    'Business': {
        icon: 'fas fa-briefcase',
        skills: [
            { name: 'Digital Marketing', users: ['Ryan Williams', 'Jessica Kim', 'Mark Roberts'] },
            { name: 'Public Speaking', users: ['Dr. Johnson', 'Sarah Chen', 'David Miller'] },
            { name: 'Project Management', users: ['Lisa Thompson', 'John Wilson', 'Amy Taylor'] },
            { name: 'Leadership', users: ['Manager Smith', 'CEO Brown', 'Director Lee'] }
        ]
    },
    'Languages': {
        icon: 'fas fa-globe',
        skills: [
            { name: 'French Language', users: ['Sara Johnson', 'Pierre Dubois', 'Marie Claire'] },
            { name: 'Spanish', users: ['Carlos Rodriguez', 'Isabella Garcia', 'Diego Lopez'] },
            { name: 'German', users: ['Klaus Mueller', 'Anna Schmidt', 'Hans Weber'] },
            { name: 'Japanese', users: ['Yuki Tanaka', 'Hiroshi Sato', 'Akiko Yamamoto'] }
        ]
    },
    'Fitness': {
        icon: 'fas fa-dumbbell',
        skills: [
            { name: 'Yoga', users: ['Priya Sharma', 'Zen Master', 'Healthy Life Coach'] },
            { name: 'Personal Training', users: ['Fit Trainer', 'Gym Expert', 'Health Guru'] },
            { name: 'Meditation', users: ['Mindful Teacher', 'Peace Guide', 'Calm Instructor'] },
            { name: 'Nutrition', users: ['Diet Expert', 'Health Coach', 'Nutrition Specialist'] }
        ]
    }
};

const searchSuggestions = [
    { type: 'skill', name: 'Python Programming', icon: 'fab fa-python' },
    { type: 'skill', name: 'Guitar Playing', icon: 'fas fa-guitar' },
    { type: 'skill', name: 'Photography', icon: 'fas fa-camera' },
    { type: 'skill', name: 'Public Speaking', icon: 'fas fa-microphone' },
    { type: 'skill', name: 'Web Development', icon: 'fas fa-code' },
    { type: 'category', name: 'Tech', icon: 'fas fa-laptop-code' },
    { type: 'category', name: 'Music', icon: 'fas fa-music' },
    { type: 'category', name: 'Art & Design', icon: 'fas fa-palette' },
    { type: 'user', name: 'Aman Kumar', icon: 'fas fa-user' },
    { type: 'user', name: 'Sara Johnson', icon: 'fas fa-user' },
    { type: 'user', name: 'John Smith', icon: 'fas fa-user' }
];

const chatData = {
    'aman': {
        name: 'Aman Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'Online',
        messages: [
            { type: 'received', content: 'Hi Divya! I saw your request to learn Python. I\'d be happy to help!', time: '2:30 PM' },
            { type: 'sent', content: 'That\'s amazing! Thank you so much. When would be a good time for you?', time: '2:32 PM' },
            { type: 'received', content: 'How about this Friday at 5 PM? We can start with the basics.', time: '2:35 PM' },
            { type: 'sent', content: 'Perfect! Should we meet online or in person?', time: '2:36 PM' },
            { type: 'received', content: 'Great! Let\'s schedule our Python session for Friday at 5 PM. I\'ll send you the meeting link.', time: '3:45 PM' }
        ]
    },
    'sara': {
        name: 'Sara Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1a7?w=50&h=50&fit=crop&crop=face',
        status: 'Online',
        messages: [
            { type: 'received', content: 'Bonjour Divya! Ready for French lessons?', time: '1:00 PM' },
            { type: 'sent', content: 'Bonjour Sara! Yes, I\'m excited to start learning French with you.', time: '1:15 PM' },
            { type: 'received', content: 'Wonderful! We\'ll start with basic conversational French. Au revoir for now!', time: '1:20 PM' }
        ]
    },
    'john': {
        name: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        status: 'Last seen 2 hours ago',
        messages: [
            { type: 'received', content: 'Thanks for accepting my photography request!', time: '11:00 AM' },
            { type: 'sent', content: 'You\'re welcome! I\'m excited to help you learn photography.', time: '11:30 AM' },
            { type: 'received', content: 'When can we schedule our first session?', time: '12:00 PM' }
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateTimeGreeting();
    initializeSearch();
    initializeMessages();
    populateSkillCategories();
});

function initializeApp() {
    // Set user name in welcome header
    document.getElementById('userName').textContent = userData.name;
    
    // Show home section by default
    showSection('home');
    
    // Initialize message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function updateTimeGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = 'Good Morning';
    
    if (hours >= 12 && hours < 17) {
        greeting = 'Good Afternoon';
    } else if (hours >= 17) {
        greeting = 'Good Evening';
    }
    
    const greetingElement = document.getElementById('timeGreeting');
    if (greetingElement) {
        greetingElement.textContent = `${greeting}, ${userData.name}!`;
    }
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation history
    if (currentSection !== sectionName) {
        navigationHistory.push(currentSection);
        if (navigationHistory.length > 10) {
            navigationHistory.shift(); // Keep history manageable
        }
    }
    
    currentSection = sectionName;
    
    // Show/hide back button
    const backButtonContainer = document.getElementById('backButtonContainer');
    if (backButtonContainer) {
        if (sectionName === 'home' || navigationHistory.length === 0) {
            backButtonContainer.style.display = 'none';
        } else {
            backButtonContainer.style.display = 'block';
        }
    }
    
    // Initialize section-specific functionality
    if (sectionName === 'messages') {
        selectChat('aman'); // Default to first chat
    } else if (sectionName === 'skillCategory') {
        populateSkillCategories();
    }
}

function goBack() {
    if (navigationHistory.length > 0) {
        const previousSection = navigationHistory.pop();
        showSection(previousSection);
    } else {
        showSection('home');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out... Redirecting to landing page.');
        // In a real app, this would redirect to the login page
        window.location.href = 'landing.html'; // You'd need to create this
    }
}

// Search functionality
function initializeSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchExpandable = document.getElementById('searchExpandable');
    const searchBack = document.getElementById('searchBack');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestionsContainer = document.getElementById('searchSuggestions');
    
    searchToggle.addEventListener('click', function() {
        searchExpandable.classList.add('active');
        searchInput.focus();
    });
    
    searchBack.addEventListener('click', function() {
        searchExpandable.classList.remove('active');
        searchInput.value = '';
        searchSuggestionsContainer.innerHTML = '';
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchExpandable.contains(e.target) && !searchToggle.contains(e.target)) {
            searchExpandable.classList.remove('active');
            searchInput.value = '';
            searchSuggestionsContainer.innerHTML = '';
        }
    });
    
    // Search input functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 0) {
            const filteredSuggestions = searchSuggestions.filter(item => 
                item.name.toLowerCase().includes(query)
            );
            displaySearchSuggestions(filteredSuggestions);
        } else {
            searchSuggestionsContainer.innerHTML = '';
        }
    });
    
    // Close search with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchExpandable.classList.contains('active')) {
            searchExpandable.classList.remove('active');
            searchInput.value = '';
            searchSuggestionsContainer.innerHTML = '';
        }
    });
}

function displaySearchSuggestions(suggestions) {
    const container = document.getElementById('searchSuggestions');
    container.innerHTML = '';
    
    suggestions.forEach(item => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'search-suggestion-item';
        suggestionElement.innerHTML = `
            <i class="${item.icon}"></i>
            <span>${item.name}</span>
        `;
        
        suggestionElement.addEventListener('click', function() {
            handleSearchSelection(item);
        });
        
        container.appendChild(suggestionElement);
    });
}

function handleSearchSelection(item) {
    const searchExpandable = document.getElementById('searchExpandable');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Close search
    searchExpandable.classList.remove('active');
    searchInput.value = '';
    searchSuggestions.innerHTML = '';
    
    // Navigate based on selection type
    if (item.type === 'skill') {
        showSection('skillCategory');
        // In a real app, you'd filter by the specific skill
        showNotification(`Showing results for: ${item.name}`, 'info');
    } else if (item.type === 'category') {
        showSection('skillCategory');
        showCategorySkills(item.name);
    } else if (item.type === 'user') {
        showSection('profile');
        // In a real app, you'd show the user's profile
        showNotification(`Viewing profile: ${item.name}`, 'info');
    }
}

// Skill Categories functionality
function populateSkillCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;
    
    categoryGrid.innerHTML = '';
    
    Object.keys(skillCategories).forEach(categoryName => {
        const category = skillCategories[categoryName];
        const categoryCard = document.createElement('div');
        categoryCard.className = 'col-lg-2 col-md-3 col-6 mb-3';
        categoryCard.innerHTML = `
            <div class="category-detail-card" onclick="showCategorySkills('${categoryName}')">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h6>${categoryName}</h6>
                <p class="text-muted">${category.skills.length} skills</p>
            </div>
        `;
        categoryGrid.appendChild(categoryCard);
    });
}

function showCategorySkills(categoryName) {
    const category = skillCategories[categoryName];
    if (!category) return;
    
    // Highlight selected category
    const categoryCards = document.querySelectorAll('.category-detail-card');
    categoryCards.forEach(card => {
        card.classList.remove('highlighted');
    });
    
    event.target.closest('.category-detail-card').classList.add('highlighted');
    
    // Show category users section
    const categoryUsersSection = document.getElementById('categoryUsersSection');
    const categoryUsersTitle = document.getElementById('categoryUsersTitle');
    const categoryUsersList = document.getElementById('categoryUsersList');
    
    categoryUsersTitle.textContent = `${categoryName} Skills & Teachers`;
    categoryUsersSection.style.display = 'block';
    
    // Populate users list
    categoryUsersList.innerHTML = '';
    
    category.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'col-md-6 col-lg-4 mb-3';
        skillCard.innerHTML = `
            <div class="user-teaching-card">
                <h6 class="text-primary">${skill.name}</h6>
                <div class="teachers-list">
                    ${skill.users.map(user => `
                        <div class="teacher-item d-flex align-items-center mb-2">
                            <div class="user-avatar me-2">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="${user}">
                            </div>
                            <div class="teacher-info flex-grow-1">
                                <p class="mb-0 fw-semibold">${user}</p>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <span>4.8</span>
                                </div>
                            </div>
                            <div class="teacher-actions">
                                <button class="btn btn-sm btn-outline-primary" onclick="sendSkillRequest('${user}', '${skill.name}')">
                                    Request
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        categoryUsersList.appendChild(skillCard);
    });
}

function sendSkillRequest(teacherName, skillName) {
    showNotification(`Request sent to ${teacherName} for ${skillName}!`, 'success');
}

// Dashboard functionality
function addSkill(type) {
    const skillName = prompt(`Enter a skill you want to ${type === 'teach' ? 'teach' : 'learn'}:`);
    if (skillName && skillName.trim()) {
        if (type === 'teach') {
            userData.teachingSkills.push(skillName.trim());
        } else {
            userData.learningSkills.push(skillName.trim());
        }
        showNotification(`${skillName} added to your skills!`, 'success');
        updateSkillsDisplay();
    }
}

function updateSkillsDisplay() {
    // Update dashboard skills
    const teachingSkillsContainer = document.getElementById('teachingSkills');
    const learningSkillsContainer = document.getElementById('learningSkills');
    
    if (teachingSkillsContainer) {
        teachingSkillsContainer.innerHTML = userData.teachingSkills.map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <h6>${skill}</h6>
                    <span class="skill-level">Intermediate</span>
                </div>
                <div class="skill-actions">
                    <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeSkill('teach', '${skill}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }
    
    if (learningSkillsContainer) {
        learningSkillsContainer.innerHTML = userData.learningSkills.map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <h6>${skill}</h6>
                    <span class="skill-status">Seeking Mentor</span>
                </div>
                <div class="skill-actions">
                    <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeSkill('learn', '${skill}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }
    
    // Update profile skills tags
    updateProfileSkillsTags();
}

function removeSkill(type, skillName) {
    if (confirm(`Remove ${skillName} from your skills?`)) {
        if (type === 'teach') {
            userData.teachingSkills = userData.teachingSkills.filter(skill => skill !== skillName);
        } else {
            userData.learningSkills = userData.learningSkills.filter(skill => skill !== skillName);
        }
        showNotification(`${skillName} removed from your skills.`, 'info');
        updateSkillsDisplay();
    }
}

// Messages functionality
function initializeMessages() {
    selectChat('aman'); // Default chat
}

function selectChat(userId) {
    const chatData_user = chatData[userId];
    if (!chatData_user) return;
    
    // Update active chat in sidebar
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[onclick="selectChat('${userId}')"]`).classList.add('active');
    
    // Update chat header
    document.getElementById('currentChatAvatar').src = chatData_user.avatar;
    document.getElementById('currentChatName').textContent = chatData_user.name;
    document.getElementById('currentChatStatus').textContent = chatData_user.status;
    
    // Update messages
    displayMessages(chatData_user.messages);
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                ${message.content}
                <div class="message-time">${message.time}</div>
            </div>
        `;
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        // Add message to current chat
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const newMessage = {
            type: 'sent',
            content: messageText,
            time: currentTime
        };
        
        // For demo, we'll add to Aman's chat
        chatData.aman.messages.push(newMessage);
        
        // Update display
        displayMessages(chatData.aman.messages);
        
        // Clear input
        messageInput.value = '';
        
        // Simulate response after 2 seconds
        setTimeout(() => {
            const responses = [
                "Thanks for your message!",
                "That sounds great!",
                "I'll get back to you soon.",
                "Let me think about that.",
                "Absolutely! Let's do it."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseMessage = {
                type: 'received',
                content: randomResponse,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
            chatData.aman.messages.push(responseMessage);
            displayMessages(chatData.aman.messages);
        }, 2000);
    }
}

// Profile functionality
function toggleEditMode() {
    editMode = !editMode;
    const editBtn = document.getElementById('editProfileBtn');
    const editButtons = document.getElementById('editButtons');
    const profileInputs = document.querySelectorAll('.profile-input');
    const availabilityInputs = document.querySelectorAll('.availability-input');
    const editPictureOverlay = document.getElementById('editPictureOverlay');
    const skillButtons = document.querySelectorAll('.remove-skill, .add-skill-btn');
    
    if (editMode) {
        editBtn.innerHTML = '<i class="fas fa-times me-2"></i>Cancel Edit';
        editBtn.className = 'btn btn-secondary';
        editButtons.style.display = 'block';
        editPictureOverlay.style.display = 'flex';
        
        // Enable inputs
        profileInputs.forEach(input => {
            if (input.id !== 'username') { // Username should remain readonly
                input.removeAttribute('readonly');
            }
        });
        
        availabilityInputs.forEach(input => {
            input.removeAttribute('disabled');
        });
        
        // Show skill edit buttons
        skillButtons.forEach(btn => {
            btn.style.display = 'inline-block';
        });
        
    } else {
        editBtn.innerHTML = '<i class="fas fa-edit me-2"></i>Edit Profile';
        editBtn.className = 'btn btn-primary';
        editButtons.style.display = 'none';
        editPictureOverlay.style.display = 'none';
        
        // Disable inputs
        profileInputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
        });
        
        availabilityInputs.forEach(input => {
            input.setAttribute('disabled', 'disabled');
        });
        
        // Hide skill edit buttons
        skillButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }
}

function saveProfile() {
    // Collect form data
    userData.name = document.getElementById('fullName').value;
    userData.email = document.getElementById('email').value;
    userData.phone = document.getElementById('phone').value;
    userData.location = document.getElementById('location').value;
    userData.bio = document.getElementById('bio').value;
    
    // Update display name
    document.getElementById('displayName').textContent = userData.name;
    document.getElementById('userName').textContent = userData.name;
    
    showNotification('Profile updated successfully!', 'success');
    toggleEditMode();
}

function cancelEdit() {
    // Reset form to original values
    document.getElementById('fullName').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('location').value = userData.location;
    document.getElementById('bio').value = userData.bio;
    
    toggleEditMode();
}

function updateProfileSkillsTags() {
    const teachingSkillsTags = document.getElementById('teachingSkillsTags');
    const learningSkillsTags = document.getElementById('learningSkillsTags');
    
    if (teachingSkillsTags) {
        teachingSkillsTags.innerHTML = userData.teachingSkills.map(skill => `
            <span class="skill-tag">
                ${skill} 
                <button class="remove-skill" onclick="removeSkill('teach', '${skill}')" style="display: ${editMode ? 'inline-block' : 'none'};">×</button>
            </span>
        `).join('') + `<button class="add-skill-btn" onclick="addProfileSkill('teach')" style="display: ${editMode ? 'inline-block' : 'none'};">+ Add Skill</button>`;
    }
    
    if (learningSkillsTags) {
        learningSkillsTags.innerHTML = userData.learningSkills.map(skill => `
            <span class="skill-tag">
                ${skill} 
                <button class="remove-skill" onclick="removeSkill('learn', '${skill}')" style="display: ${editMode ? 'inline-block' : 'none'};">×</button>
            </span>
        `).join('') + `<button class="add-skill-btn" onclick="addProfileSkill('learn')" style="display: ${editMode ? 'inline-block' : 'none'};">+ Add Skill</button>`;
    }
}

function addProfileSkill(type) {
    addSkill(type);
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
            alert('Account deletion initiated. You will be redirected to the home page.');
            // In a real app, this would make an API call to delete the account
        }
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// // ================= Existing Code (Unchanged) =================
// // Keep all your existing homepage.js functions here...
// // =============================================================


// // ================= New Code to Auto-Fill Profile Section =================
// window.addEventListener("DOMContentLoaded", () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         console.error("No token found. User might not be logged in.");
//         return;
//     }

//     fetch("/api/users/me", {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//         }
//     })
//     .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//     })
//     .then(userData => {
//         if (!userData || !userData.profile) {
//             console.warn("User data is missing profile field.");
//             return;
//         }

//         // ====== Fill Basic Info ======
//         document.getElementById("profileFullName").value = userData.profile.fullName || "";
//         document.getElementById("profileUsername").value = userData.profile.username || "";
//         document.getElementById("profileEmail").value = userData.email || "";
//         document.getElementById("profilePhone").value = userData.phoneNumber || "";
//         document.getElementById("profileLocation").value = userData.profile.location || "";
//         document.getElementById("profileBio").value = userData.profile.bio || "";

//         // ====== Fill Social Links ======
//         if (userData.socialLinks) {
//             document.getElementById("profileLinkedin").value = userData.socialLinks.linkedin || "";
//             document.getElementById("profileGithub").value = userData.socialLinks.github || "";
//         }

//         // ====== Fill Skills Offered ======
//         if (Array.isArray(userData.skillsOffered)) {
//             const offeredList = document.getElementById("skillsOfferedList");
//             offeredList.innerHTML = "";
//             userData.skillsOffered.forEach(skill => {
//                 const li = document.createElement("li");
//                 li.textContent = `${skill.skillName} (${skill.level}) - ${(skill.category || []).join(", ")}`;
//                 offeredList.appendChild(li);
//             });
//         }

//         // ====== Fill Skills Wanted ======
//         if (Array.isArray(userData.skillsToLearn)) {
//             const wantedList = document.getElementById("skillsWantedList");
//             wantedList.innerHTML = "";
//             userData.skillsToLearn.forEach(skill => {
//                 const li = document.createElement("li");
//                 li.textContent = `${skill.skillName} (${skill.level}) - ${(skill.category || []).join(", ")}`;
//                 wantedList.appendChild(li);
//             });
//         }

//         // ====== Fill Availability ======
//         if (userData.availability) {
//             const days = userData.availability.days || [];
//             document.querySelectorAll("input[name='availabilityDays']").forEach(cb => {
//                 cb.checked = days.includes(cb.value);
//             });
//             document.getElementById("availabilityTime").value = userData.availability.time || "";
//             document.getElementById("availabilityTimezone").value = userData.availability.timezone || "";
//         }
//     })
//     .catch(err => {
//         console.error("Error fetching user profile:", err);
//     });
// });



// // Initialize skills display on page load
// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(() => {
//         updateSkillsDisplay();
//     }, 500);
// });

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const User = require('../models/User');

// // @route   POST /api/profile
// // @access  Private (requires a JWT)
// router.post('/', auth, async (req, res) => {
//     try {
//         let incomingData = {};

//         // 1️⃣ If request has `profile` object → skills update or setup
//         if (req.body.profile && typeof req.body.profile === 'object') {
//             incomingData = { ...req.body.profile };

//         // 2️⃣ Else → treat incoming body as flat fields
//         } else {
//             const {
//                 fullName,
//                 username,
//                 phoneNumber,
//                 location,
//                 bio,
//                 skillsOffered,
//                 skillsToLearn,
//                 availability,
//                 socialLinks
//             } = req.body;

//             if (fullName) incomingData.fullName = fullName;
//             if (username) incomingData.username = username;
//             if (phoneNumber) incomingData.phoneNumber = phoneNumber;
//             if (location) incomingData.location = location;
//             if (bio) incomingData.bio = bio;
//             if (skillsOffered) incomingData.skillsOffered = skillsOffered;
//             if (skillsToLearn) incomingData.skillsToLearn = skillsToLearn;
//             if (availability) incomingData.availability = availability;
//             if (socialLinks) incomingData.socialLinks = socialLinks;
//         }

//         // 3️⃣ Update profile
//         let user = await User.findOneAndUpdate(
//             { _id: req.user.id },
//             { $set: { profile: incomingData } },
//             { new: true, upsert: true, setDefaultsOnInsert: true }
//         );

//         res.json(user);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route   GET /api/profile
// router.get('/', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;


// router.post('/', auth, async (req, res) => {
//     console.log("📥 Incoming profile update:", req.body); // DEBUG

//     const {
//         fullName,
//         username,
//         phoneNumber,
//         location,
//         bio,
//         skillsOffered,
//         skillsToLearn,
//         availability,
//         socialLinks,
//         profile // <--- from skills editor
//     } = req.body;

//     // Hybrid mode: if profile object exists, merge it
//     let profileFields = {};
//     if (profile && typeof profile === 'object') {
//         profileFields = { ...profileFields, ...profile };
//     }

//     if (fullName) profileFields.fullName = fullName;
//     if (username) profileFields.username = username;
//     if (phoneNumber) profileFields.phoneNumber = phoneNumber;
//     if (location) profileFields.location = location;
//     if (bio) profileFields.bio = bio;
//     if (skillsOffered) profileFields.skillsOffered = skillsOffered;
//     if (skillsToLearn) profileFields.skillsToLearn = skillsToLearn;
//     if (availability) profileFields.availability = availability;
//     if (socialLinks) profileFields.socialLinks = socialLinks;

//     try {
//         let user = await User.findOneAndUpdate(
//             { _id: req.user.id },
//             { $set: { profile: profileFields } },
//             { new: true, upsert: true, setDefaultsOnInsert: true }
//         );
//         console.log("✅ Profile updated:", user);
//         res.json(user);
//     } catch (err) {
//         console.error("❌ Error updating profile:", err.message);
//         res.status(500).send('Server Error');
//     }
// });

// router.get('/', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;

