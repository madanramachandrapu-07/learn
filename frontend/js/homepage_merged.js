// SkillSwap JavaScript functionality
let currentSection = 'home';
let editMode = false;
let navigationHistory = [];

// Sample data
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

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function createSkillListItem({ skillName, skillLevel, categoriesText }) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span style="font-weight:500;">${escapeHtml(skillName)}</span>
        <span style="font-size:0.85em; color:#6c757d;"> (${escapeHtml(skillLevel)})</span>
        ${categoriesText ? `<small style="font-size:0.8em; color:#495057;"> • ${escapeHtml(categoriesText)}</small>` : ''}
        <button type="button" class="remove" title="Remove"><i class="fas fa-times-circle"></i></button>
    `;
    li.querySelector('button.remove').addEventListener('click', () => li.remove());
    return li;
}


// Dashboard functionality
async function addSkill(kind) {
    const lower = kind.toLowerCase();
    const inputEl = document.getElementById(lower === 'offered' ? 'skillsOfferedInput' : 'skillsWantedInput');
    const levelEl = document.getElementById(lower === 'offered' ? 'skillLevelOffered' : 'skillLevelWanted');
    const tagifyInst = inputEl?.tagify || null;
    const tags = (tagifyInst && Array.isArray(tagifyInst.value)) ? tagifyInst.value : [];
    let skillName = tags.length ? tags[0].value.trim() : (inputEl?.value.trim() || '');
    const skillLevel = levelEl?.value.trim() || '';
    const categoryName = lower === 'offered' ? 'offered_category' : 'wanted_category';
    const categories = Array.from(document.querySelectorAll(`input[name="${categoryName}"]:checked`)).map(cb => cb.value);

    if (!skillName) { alert('Please enter or select a skill name.'); return; }
    if (!skillLevel) { alert('Please select a skill level.'); return; }
    if (categories.length === 0) { alert('Please select at least one category.'); return; }

    const newSkill = { skillName, level: skillLevel, category: categories };

    if (lower === 'offered') {
        userData.profile.skillsOffered.push(newSkill);
    } else {
        userData.profile.skillsToLearn.push(newSkill);
    }

    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData.profile) // ✅ Send correct shape
        });

        if (!res.ok) throw new Error('Failed to save skill');
        const updatedUser = await res.json();
        userData.profile = updatedUser.profile;

        updateSkillsDisplay();

        if (tagifyInst?.removeAllTags) tagifyInst.removeAllTags();
        else if (inputEl) inputEl.value = '';
        if (levelEl) levelEl.value = '';
        document.querySelectorAll(`input[name="${categoryName}"]:checked`).forEach(cb => cb.checked = false);

        showNotification(`${skillName} added successfully!`, 'success');
    } catch (err) {
        console.error(err);
        alert('Error adding skill. Please try again.');
    }
}







// Fetch and display skills from backend
async function updateSkillsDisplay() {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            console.error('Failed to fetch skills from backend');
            return;
        }

        const data = await res.json();

        // ✅ Use the real profile fields from backend
        userData.profile.skillsOffered = data.profile?.skillsOffered || [];
        userData.profile.skillsToLearn = data.profile?.skillsToLearn || [];

        const teachingSkillsContainer = document.getElementById('skillsOfferedList');
        const learningSkillsContainer = document.getElementById('skillsWantedList');

        teachingSkillsContainer.innerHTML = '';
        userData.profile.skillsOffered.forEach(skillObj => {
            const li = createSkillListItem({
                skillName: skillObj.skillName,
                skillLevel: skillObj.level,
                categoriesText: (skillObj.category || []).join(', ')
            });
            teachingSkillsContainer.appendChild(li);
        });

        learningSkillsContainer.innerHTML = '';
        userData.profile.skillsToLearn.forEach(skillObj => {
            const li = createSkillListItem({
                skillName: skillObj.skillName,
                skillLevel: skillObj.level,
                categoriesText: (skillObj.category || []).join(', ')
            });
            learningSkillsContainer.appendChild(li);
        });

    } catch (error) {
        console.error('Error updating skills display:', error);
    }
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

function initTagify() {
    if (typeof Tagify === 'undefined') { console.warn('Tagify not found — skipping tag inputs'); return; }
    const skillsInputs = document.querySelectorAll('#skillsOfferedInput, #skillsWantedInput');
    skillsInputs.forEach(input => {
        if (input.tagify) input.tagify.destroy();
        new Tagify(input, {
            whitelist: [
                "JavaScript", "Python", "Graphic Design", "UI/UX", "React", "Node.js",
                "Photoshop", "Writing", "Marketing", "HTML/CSS", "Java", "C++", "DSA",
                "SQL", "Machine Learning", "Data Science", "3D Modelling", "Motion Graphics",
                "Game Design", "Interior Design", "Guitar", "Piano", "Singing & Vocal",
                "Oil Painting", "Sketching & Drawing", "Sculpture Making", "English",
                "Spanish", "French", "Telugu", "Hindi", "Baking", "Food Presentation",
                "Italian Cuisine", "Pastry Making", "Grilling & Barbecue"
            ],
            dropdown: { maxItems: 10, enabled: 1, closeOnSelect: false },
            originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
        });
    });
}


// Profile functionality
// function toggleEditMode() {
//     editMode = !editMode;
//     const editBtn = document.getElementById('editProfileBtn');
//     const editButtons = document.getElementById('editButtons');
//     const profileInputs = document.querySelectorAll('.profile-input');
//     const availabilityInputs = document.querySelectorAll('.availability-input');
//     const editPictureOverlay = document.getElementById('editPictureOverlay');
//     const skillButtons = document.querySelectorAll('.remove-skill, .add-skill-btn');
    
//     if (editMode) {
//         editBtn.innerHTML = '<i class="fas fa-times me-2"></i>Cancel Edit';
//         editBtn.className = 'btn btn-secondary';
//         editButtons.style.display = 'block';
//         editPictureOverlay.style.display = 'flex';
        
//         // Enable inputs
//         profileInputs.forEach(input => {
//             if (input.id !== 'username') { // Username should remain readonly
//                 input.removeAttribute('readonly');
//             }
//         });
        
//         availabilityInputs.forEach(input => {
//             input.removeAttribute('disabled');
//         });
        
//         // Show skill edit buttons
//         skillButtons.forEach(btn => {
//             btn.style.display = 'inline-block';
//         });
        
//     } else {
//         editBtn.innerHTML = '<i class="fas fa-edit me-2"></i>Edit Profile';
//         editBtn.className = 'btn btn-primary';
//         editButtons.style.display = 'none';
//         editPictureOverlay.style.display = 'none';
        
//         // Disable inputs
//         profileInputs.forEach(input => {
//             input.setAttribute('readonly', 'readonly');
//         });
        
//         availabilityInputs.forEach(input => {
//             input.setAttribute('disabled', 'disabled');
//         });
        
//         // Hide skill edit buttons
//         skillButtons.forEach(btn => {
//             btn.style.display = 'none';
//         });
//     }
// }
function toggleEditMode() {
    editMode = !editMode;
    const editBtn = document.getElementById('editProfileBtn');
    const editButtons = document.getElementById('editButtons');
    const profileInputs = document.querySelectorAll('#profileSection input, #profileSection textarea, #profileSection select');

    if (editMode) {
        editBtn.innerHTML = '<i class="fas fa-times me-2"></i>Cancel Edit';
        editBtn.className = 'btn btn-secondary';
        editButtons.style.display = 'block';

        profileInputs.forEach(input => {
            if (input.id !== 'username') {
                input.removeAttribute('readonly');
                input.removeAttribute('disabled');
            }
        });

        // Show skill edit fields
        document.querySelectorAll('.skill-edit-fields').forEach(el => el.style.display = 'block');

        // Init Tagify for skill inputs
        initTagify();

        // Attach add skill events
        document.getElementById('addOfferedBtn').onclick = () => addSkill('Offered');
        document.getElementById('addWantedBtn').onclick = () => addSkill('Wanted');

    } else {
        editBtn.innerHTML = '<i class="fas fa-edit me-2"></i>Edit Profile';
        editBtn.className = 'btn btn-primary';
        editButtons.style.display = 'none';

        profileInputs.forEach(input => {
            if (input.tagName.toLowerCase() === 'textarea') {
                input.setAttribute('readonly', 'readonly');
            } else if (['checkbox', 'radio'].includes(input.type) || input.tagName.toLowerCase() === 'select') {
                input.setAttribute('disabled', 'disabled');
            } else {
                input.setAttribute('readonly', 'readonly');
            }
        });

        // Hide skill edit fields
        document.querySelectorAll('.skill-edit-fields').forEach(el => el.style.display = 'none');
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

// Initialize skills display on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateSkillsDisplay();
    }, 500);
});



/* ---------- Profile fetcher (merged from profile-1.html) ---------- */
function getToken() {
  return localStorage.getItem('token');
}

async function fetchAndPopulateProfile() {
  const token = getToken();
  if (!token) {
    // not logged in — do nothing
    console.warn('fetchAndPopulateProfile: no token found in localStorage.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });

    const user = await response.json();

    if (response.ok) {
      // Populate the form fields with user data (use name attributes where possible)
      const nameInput = document.querySelector('input[name="name"]');
      if (nameInput) nameInput.value = user.profile?.fullName || '';

      const usernameInput = document.querySelector('input[name="username"]');
      if (usernameInput) usernameInput.value = user.profile?.username || '';

      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) emailInput.value = user.email || '';

      const phoneInput = document.querySelector('input[name="phone"]');
      if (phoneInput) phoneInput.value = user.phoneNumber || '';

      const locationInput = document.querySelector('input[name="location"]');
      if (locationInput) locationInput.value = user.profile?.location || '';

      const bioTextarea = document.querySelector('textarea[name="bio"]');
      if (bioTextarea) bioTextarea.value = user.profile?.bio || '';

      // Social links
      const linkedinInput = document.querySelector('input[name="linkedin"]');
      if (linkedinInput) linkedinInput.value = (user.profile?.socialLinks?.linkedin || user.profile?.linkedin || user.socialLinks?.linkedin || '');

      const portfolioInput = document.querySelector('input[name="portfolio"]');
      if (portfolioInput) portfolioInput.value = (user.profile?.socialLinks?.github || user.profile?.github || user.socialLinks?.github || user.profile?.portfolio || '');

      // Skills Offered
      const skillsOffered = Array.isArray(user.profile?.skillsOffered) && user.profile.skillsOffered.length ? user.profile.skillsOffered : (Array.isArray(user.skillsOffered) ? user.skillsOffered : []);
      const skillsWanted = Array.isArray(user.profile?.skillsToLearn) && user.profile.skillsToLearn.length ? user.profile.skillsToLearn : (Array.isArray(user.skillsToLearn) ? user.skillsToLearn : []);

      populateSkillsList('skillsOfferedList', skillsOffered);
      populateSkillsList('skillsWantedList', skillsWanted);

      // Availability
      if (user.profile?.availability) {
        const days = user.profile?.availability.days || [];
        document.querySelectorAll('input[name="availabilityDays"]').forEach(cb => {
            cb.checked = days.includes(cb.value);
        });

        if (user.profile?.availability.time) {
            const [start, end] = user.profile?.availability.time.split(' - ').map(t => t.trim());
            const startEl = document.getElementById('availabilityStart');
            const endEl = document.getElementById('availabilityEnd');
            if (startEl) startEl.value = start || '';
            if (endEl) endEl.value = end || '';
        }

        const tzEl = document.getElementById('availabilityTimezone');
        if (tzEl) tzEl.value = user.profile?.availability.timezone || '';
        }

      // Update visible name display if exists
      const displayNameEl = document.getElementById('displayName') || document.querySelector('.profile-card h3');
      if (displayNameEl) displayNameEl.textContent = user.profile?.fullName || user.profile?.fullname || user.email || displayNameEl.textContent;

      const usernameLabel = document.querySelector('.username') || document.getElementById('userName');
      if (usernameLabel) usernameLabel.textContent = user.profile?.username ? `@${user.profile.username}` : (user.username || usernameLabel.textContent);

      // Update dashboard skill lists (if your JS uses userData arrays)
      // If updateSkillsDisplay exists, call it after populating skills
      if (typeof updateSkillsDisplay === 'function') {
        try { updateSkillsDisplay(); } catch (e) { /* ignore */ }
      }
    } else {
      console.error('fetchAndPopulateProfile: response not ok', user);
    }
  } catch (err) {
    console.error('fetchAndPopulateProfile error', err);
  }
}

function populateSkillsList(listId, skillsArray) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;

  // if list is a div container, clear it
  listEl.innerHTML = '';

  if (!Array.isArray(skillsArray)) return;

  skillsArray.forEach(skill => {
    // normalize skill object
    let skillName = '';
    let level = '';
    let categoryArr = [];

    if (typeof skill === 'string') {
      skillName = skill;
    } else if (skill && typeof skill === 'object') {
      skillName = skill.skillName || skill.name || skill.skill || '';
      level = skill.level || skill.skillLevel || '';
      if (Array.isArray(skill.category)) categoryArr = skill.category;
      else if (skill.category) categoryArr = [skill.category];
    }

    // create element (li or div)
    const item = document.createElement('div');
    item.className = 'skill-item-small';
    const catsText = categoryArr.length ? ` — ${categoryArr.join(', ')}` : '';
    const levelText = level ? ` (${level})` : '';
    item.textContent = `${skillName}${levelText}${catsText}`;
    listEl.appendChild(item);
  });
}

/* ensure fetch runs on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function() {
  // delay slightly so other initialization runs first
  setTimeout(() => {
    fetchAndPopulateProfile();
  }, 200);
});
