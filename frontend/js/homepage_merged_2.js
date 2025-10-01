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

// const skillCategories = {
//     'Programming': {
//         icon: 'fas fa-laptop-code',
//         skills: [
//             { name: 'Python Programming', users: ['Aman Kumar', 'John Smith', 'Alex Johnson'] },
//             { name: 'Web Development', users: ['Divya Sharma', 'Sara Wilson', 'Mike Brown'] },
//             { name: 'Data Science', users: ['Emily Davis', 'Robert Lee', 'Anna Taylor'] },
//             { name: 'Mobile App Development', users: ['David Clark', 'Lisa Anderson', 'Tom Wilson'] }
//         ]
//     },
//     'Design': {
//         icon: 'fas fa-palette',
//         skills: [
//             { name: 'Digital Illustration', users: ['Maya Patel', 'Chris Martinez', 'Sophie Chen'] },
//             { name: 'Photography', users: ['Divya Sharma', 'Mark Thompson', 'Nina Rodriguez'] },
//             { name: 'UI/UX Design', users: ['Alex Kim', 'Rachel Green', 'James White'] },
//             { name: 'Graphic Design', users: ['Sarah Johnson', 'Mike Davis', 'Emma Wilson'] }
//         ]
//     },
//     'Music & Arts': {
//         icon: 'fas fa-music',
//         skills: [
//             { name: 'Guitar Playing', users: ['Aman Kumar', 'Carlos Ruiz', 'Jenny Lee'] },
//             { name: 'Piano', users: ['Maria Santos', 'Paul Anderson', 'Grace Liu'] },
//             { name: 'Music Theory', users: ['Aman Kumar', 'Dr. Smith', 'Amanda Johnson'] },
//             { name: 'Singing', users: ['Sophia Brown', 'Michael Green', 'Olivia Davis'] }
//         ]
//     },
//     'Business': {
//         icon: 'fas fa-briefcase',
//         skills: [
//             { name: 'Digital Marketing', users: ['Ryan Williams', 'Jessica Kim', 'Mark Roberts'] },
//             { name: 'Public Speaking', users: ['Dr. Johnson', 'Sarah Chen', 'David Miller'] },
//             { name: 'Project Management', users: ['Lisa Thompson', 'John Wilson', 'Amy Taylor'] },
//             { name: 'Leadership', users: ['Manager Smith', 'CEO Brown', 'Director Lee'] }
//         ]
//     },
//     'Languages': {
//         icon: 'fas fa-globe',
//         skills: [
//             { name: 'French Language', users: ['Sara Johnson', 'Pierre Dubois', 'Marie Claire'] },
//             { name: 'Spanish', users: ['Carlos Rodriguez', 'Isabella Garcia', 'Diego Lopez'] },
//             { name: 'German', users: ['Klaus Mueller', 'Anna Schmidt', 'Hans Weber'] },
//             { name: 'Japanese', users: ['Yuki Tanaka', 'Hiroshi Sato', 'Akiko Yamamoto'] }
//         ]
//     },
//     'Culinary': {
//         icon: 'fas fa-dumbbell',
//         skills: [
//             { name: 'Yoga', users: ['Priya Sharma', 'Zen Master', 'Healthy Life Coach'] },
//             { name: 'Personal Training', users: ['Fit Trainer', 'Gym Expert', 'Health Guru'] },
//             { name: 'Meditation', users: ['Mindful Teacher', 'Peace Guide', 'Calm Instructor'] },
//             { name: 'Nutrition', users: ['Diet Expert', 'Health Coach', 'Nutrition Specialist'] }
//         ]
//     }
// };

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

// const chatData = {
//     'aman': {
//         name: 'Aman Kumar',
//         avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
//         status: 'Online',
//         messages: [
//             { type: 'received', content: 'Hi Divya! I saw your request to learn Python. I\'d be happy to help!', time: '2:30 PM' },
//             { type: 'sent', content: 'That\'s amazing! Thank you so much. When would be a good time for you?', time: '2:32 PM' },
//             { type: 'received', content: 'How about this Friday at 5 PM? We can start with the basics.', time: '2:35 PM' },
//             { type: 'sent', content: 'Perfect! Should we meet online or in person?', time: '2:36 PM' },
//             { type: 'received', content: 'Great! Let\'s schedule our Python session for Friday at 5 PM. I\'ll send you the meeting link.', time: '3:45 PM' }
//         ]
//     },
//     'sara': {
//         name: 'Sara Johnson',
//         avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1a7?w=50&h=50&fit=crop&crop=face',
//         status: 'Online',
//         messages: [
//             { type: 'received', content: 'Bonjour Divya! Ready for French lessons?', time: '1:00 PM' },
//             { type: 'sent', content: 'Bonjour Sara! Yes, I\'m excited to start learning French with you.', time: '1:15 PM' },
//             { type: 'received', content: 'Wonderful! We\'ll start with basic conversational French. Au revoir for now!', time: '1:20 PM' }
//         ]
//     },
//     'john': {
//         name: 'John Smith',
//         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
//         status: 'Last seen 2 hours ago',
//         messages: [
//             { type: 'received', content: 'Thanks for accepting my photography request!', time: '11:00 AM' },
//             { type: 'sent', content: 'You\'re welcome! I\'m excited to help you learn photography.', time: '11:30 AM' },
//             { type: 'received', content: 'When can we schedule our first session?', time: '12:00 PM' }
//         ]
//     }
// };
// Mobile dropdown functionality
function showCategoryDropdown(category) {
    if (window.innerWidth <= 768) return;
    const dropdown = document.getElementById(`${category}-dropdown`);
    if (dropdown) {
        dropdown.style.maxHeight = '300px';
    }
}

function hideCategoryDropdown(category) {
    if (window.innerWidth <= 768) return;
    const dropdown = document.getElementById(`${category}-dropdown`);
    if (dropdown) {
        dropdown.style.maxHeight = '0';
    }
}

// For mobile - toggle dropdown on click
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't toggle if clicking on a dropdown item
                if (e.target.classList.contains('dropdown-item')) {
                    return;
                }
                
                // Close all other dropdowns
                document.querySelectorAll('.category-card').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                        const otherDropdown = otherCard.querySelector('.category-dropdown');
                        if (otherDropdown) {
                            otherDropdown.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current dropdown
                card.classList.toggle('active');
                const dropdown = card.querySelector('.category-dropdown');
                if (dropdown) {
                    dropdown.style.display = card.classList.contains('active') ? 'block' : 'none';
                }
            });
        });
    }
});
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateTimeGreeting();
    initializeSearch();
    initializeMessages();
    populateSkillCategories();
});
if (typeof initializeSearch !== 'function') {
  function initializeSearch() { /* no-op; HTML handles search */ }
}

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
  const id = sectionName.endsWith('Section') ? sectionName : `${sectionName}Section`;

  // Hide all sections
  document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');

  // Show target section
  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.style.display = 'block';
  }

  // Push history state (optional)
  if (history.state?.section !== id) {
    history.pushState({ section: id }, '', '#' + id);
  }

  // Back button logic
  const backButtonContainer = document.getElementById('backButtonContainer');
  if (backButtonContainer) {
    backButtonContainer.style.display = (sectionName === 'home' || !history.state) ? 'none' : 'block';
  }

  // Section-specific loaders
//   if (sectionName === 'messages') {
//     selectChat('aman'); // Default chat
//   } else 
    
    if (sectionName === 'skillCategory') {
    populateSkillCategories();
  } else if (sectionName === 'connections') {
    loadConnections(); // ✅ auto load connections
  } else if (sectionName === 'requests') {
    loadRequests(); // ✅ auto load requests
  }
  else if (sectionName === "messages") {
    initMessages();
    }
   else if (sectionName === "messages") {
    loadChatSidebar(); // ✅ load sidebar whenever messages opened
  }


}


// function showSection(sectionName) {
//     // Hide all sections
//     const sections = document.querySelectorAll('.content-section');
//     sections.forEach(section => {
//         section.classList.remove('active');
//     });
    
//     // Show target section
//     const targetSection = document.getElementById(sectionName + 'Section');
//     if (targetSection) {
//         targetSection.classList.add('active');
//     }
    
//     // Update navigation history
//     if (currentSection !== sectionName) {
//         navigationHistory.push(currentSection);
//         if (navigationHistory.length > 10) {
//             navigationHistory.shift(); // Keep history manageable
//         }
//     }
    
//     currentSection = sectionName;
    
//     // Show/hide back button
//     const backButtonContainer = document.getElementById('backButtonContainer');
//     if (backButtonContainer) {
//         if (sectionName === 'home' || navigationHistory.length === 0) {
//             backButtonContainer.style.display = 'none';
//         } else {
//             backButtonContainer.style.display = 'block';
//         }
//     }
    
//     // Initialize section-specific functionality
//     if (sectionName === 'messages') {
//         selectChat('aman'); // Default to first chat
//     } else if (sectionName === 'skillCategory') {
//         populateSkillCategories();
//     }
// }

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
                "x-auth-token": token
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
                "x-auth-token": token,
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
// function initializeMessages() {
//     selectChat('aman'); // Default chat
// }

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

// function sendMessage() {
//     const messageInput = document.getElementById('messageInput');
//     const messageText = messageInput.value.trim();
    
//     if (messageText) {
//         // Add message to current chat
//         const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
//         const newMessage = {
//             type: 'sent',
//             content: messageText,
//             time: currentTime
//         };
        
//         // For demo, we'll add to Aman's chat
//         chatData.aman.messages.push(newMessage);
        
//         // Update display
//         displayMessages(chatData.aman.messages);
        
//         // Clear input
//         messageInput.value = '';
        
//         // Simulate response after 2 seconds
//         setTimeout(() => {
//             const responses = [
//                 "Thanks for your message!",
//                 "That sounds great!",
//                 "I'll get back to you soon.",
//                 "Let me think about that.",
//                 "Absolutely! Let's do it."
//             ];
//             const randomResponse = responses[Math.floor(Math.random() * responses.length)];
//             const responseMessage = {
//                 type: 'received',
//                 content: randomResponse,
//                 time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//             };
//             chatData.aman.messages.push(responseMessage);
//             displayMessages(chatData.aman.messages);
//         }, 2000);
//     }
// }

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

// function showSection(sectionId) {
//     document.querySelectorAll('.content-section').forEach(sec => {
//         sec.style.display = 'none';
//     });
//     document.getElementById(sectionId).style.display = 'block';
// }
//CATEGORY CLICK HANDLER
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', async () => {
    const category = card.getAttribute('data-category');
    console.log("📌 Category clicked:", category); // DEBUG

    try {
      const token = localStorage.getItem('token');
      console.log("📌 Sending request to:", `http://localhost:5000/api/profile/category/${encodeURIComponent(category)}`); // DEBUG

      const response = await fetch(`http://localhost:5000/api/profile/category/${encodeURIComponent(category)}`, {
        headers: {
            "x-auth-token": token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to fetch users for this category");

      const users = await response.json();
      console.log("📌 Users fetched:", users); // DEBUG

      const categoryResults = document.getElementById('categoryResults');
      categoryResults.innerHTML = `
        <h3 class="mb-3">${category} - Available Users</h3>
        <div id="userProfiles" class="row"></div>
      `;
      categoryResults.style.display = "block"; // ✅ Show results

      const userProfiles = document.getElementById('userProfiles');

      if (!users || users.length === 0) {
        userProfiles.innerHTML = `<p class="text-muted">No users found in this category.</p>`;
      } else {
        users.forEach(user => {
          console.log("📌 Rendering user:", user.profile?.username); // DEBUG
          userProfiles.innerHTML += `
            <div class="col-md-6">
              <div class="cards mb-3 shadow-sm">
                <div class="card-body">
                <div class="user-header">
                <img src="./images/user.png" alt="User avatar" class="rounded-circle" style="width:40px; height:40px;">
                  <h3 class="card-title">${user.profile?.fullName || "Unnamed User"}</h3>
                  </div>
                  <p class="card-text">
                    <strong>Username:</strong> ${user.profile?.username || "Unnamed"}<br>
                    <strong>Skills Offered:</strong> 
                    ${
                        user.profile?.skillsOffered?.length 
                        ? user.profile.skillsOffered.map(s => `${s.skillName} (${s.level || "Unknown"})`).join(", ")
                        : "None"
                    }<br>
                    
                    <strong>Skills To Learn:</strong> 
                    ${
                        user.profile?.skillsToLearn?.length 
                        ? user.profile.skillsToLearn.map(s => `${s.skillName} (${s.level || "Unknown"})`).join(", ")
                        : "None"
                    }<br>
                    <strong>Availability days:</strong> ${user.profile?.availability?.days || "Not specified"}<br>
                    <strong>Availability time:</strong> ${user.profile?.availability?.time || "Not specified"} (${user.profile?.availability?.timezone || "Not specified"})<br>
                    <strong>Bio:</strong> ${user.profile?.bio || "No bio available"}<br>
                     <div class="cards-buttons mt-2">
                        <button class="btn btn-primary view-profile-btn" data-context="category" data-userid="${user._id}">View Profile</button>
                        <button class="btn btn-success request-btn" data-userid="${user._id}">Request</button>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          `;
        });
      }
    } catch (err) {
      console.error("❌ Error loading category users:", err);
      alert("Failed to load users for this category. Please try again.");
    }
  });
});

// REQUEST FEATURE

// Send Request (button inside user card)
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("request-btn")) {
    const toUser = e.target.getAttribute("data-userid");
    const token = localStorage.getItem("token");

    if (!token) return alert("⚠️ Please log in first.");

    try {
      const res = await fetch("http://localhost:5000/api/requests/send", {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ toUser })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send request");

      // Update button state
      e.target.innerText = "Requested ✅";
      e.target.disabled = true;

      loadRequests(); // Refresh requests lists
    } catch (err) {
      alert("❌ Error sending request: " + err.message);
    }
  }
});

//LOAD REQUESTS
async function loadRequests() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    // Received Requests
    const resReceived = await fetch("http://localhost:5000/api/requests/received", {
      headers: { "x-auth-token": token }
    });
    const received = await resReceived.json();

    const receivedDiv = document.getElementById("receivedRequests");
    receivedDiv.innerHTML = "";

    if (received.length === 0) {
      receivedDiv.innerHTML = `<p class="text-muted">No requests received.</p>`;
    } else {
      received.forEach(req => {
        const profile = req.fromUser?.profile || {};

        receivedDiv.innerHTML += `
            <div class="request-item border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <img src="./images/user.png" alt="User" class="rounded-circle me-2" width="40" height="40">
                <div>
                <h5 class="mb-0">${profile.fullName || "Unnamed"}</h5>
                <h6 class="mb-0">${profile.username || "Unnamed"}</h6><br>
                <h9>
                    Offers: ${
                    profile.skillsOffered?.map(s => `${s.skillName} (${s.level})`).join(", ")
                    || "None"
                    }
                </h9><br>
                <h9>
                    To Learn: ${
                    profile.skillsToLearn?.map(s => `${s.skillName} (${s.level})`).join(", ")
                    || "None"
                    }
                </h9><br>
                <h9>Avalability Days:${profile.availability?.days || "Not Specified"}</h9><br>
                <h9>Availability Time:${profile.availability?.time || "Not Specified"} (${profile.availability?.timezone || "Not Specified"})</h9><br>
                <h9>Bio:${profile.bio || "Not provided"}</h9><br>
                <small>${new Date(req.createdAt).toLocaleString()}</small>
                </div>
            </div>
            <div>
                ${req.status === "pending" ? `
                <button class="btn btn-sm btn-success accept-btn" data-id="${req._id}">Accept</button>
                <button class="btn btn-sm btn-danger reject-btn" data-id="${req._id}">Reject</button>
                ` : `<span class="badge bg-${req.status === "accepted" ? "success" : "danger"}">${req.status}</span>`}
            </div>
            </div>
        `;
        });
    }

    //Sent Requests
    const resSent = await fetch("http://localhost:5000/api/requests/sent", {
      headers: { "x-auth-token": token }
    });
    const sent = await resSent.json();

    const sentDiv = document.getElementById("sentRequests");
    sentDiv.innerHTML = "";

    if (sent.length === 0) {
      sentDiv.innerHTML = `<p class="text-muted">No requests sent.</p>`;
    } else {
      sent.forEach(req => {
        sentDiv.innerHTML += `
          <div class="request-item border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img src="./images/user.png" alt="User" class="rounded-circle me-2" width="40" height="40">
              <div>
                <h6 class="mb-0">${req.toUser?.profile?.fullName || "Unnamed"}</h6>
                <small class="text-muted">To Learn: ${req.toUser?.profile?.skillsToLearn?.map(s => `${s.skillName} (${s.level})`).join(", ") || "None"}</small><br>
                <small><span class="badge bg-${req.status === "pending" ? "warning" : req.status === "accepted" ? "success" : "danger"}">${req.status}</span></small>
              </div>
            </div>
            <div>
              ${req.status === "pending"
                ? `<button class="btn btn-sm btn-outline-danger cancel-btn" data-id="${req._id}">Cancel</button>`
                : ""}
            </div>
          </div>
        `;
      });
    }
  } catch (err) {
    console.error("Error loading requests:", err);
  }
}

//HANDLE ACCEPT / REJECT / CANCEL
document.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please log in first.");

  if (e.target.classList.contains("accept-btn")) {
    const id = e.target.getAttribute("data-id");
    await fetch(`http://localhost:5000/api/requests/${id}/accept`, {
      method: "PATCH",
      headers: { "x-auth-token":token }
    });
    loadRequests();
  }

  if (e.target.classList.contains("reject-btn")) {
    console.log("Reject clicked");
    const id = e.target.getAttribute("data-id");
    await fetch(`http://localhost:5000/api/requests/${id}/reject`, {
      method: "PATCH",
      headers: { "x-auth-token":token }
    });
    loadRequests();
  }

  if (e.target.classList.contains("cancel-btn")) {
    const id = e.target.getAttribute("data-id");
    await fetch(`http://localhost:5000/api/requests/${id}/cancel`, {
      method: "PATCH",
      headers: { "x-auth-token":token }
    });
    loadRequests();
  }
});

//INITIAL LOAD
document.addEventListener("DOMContentLoaded", loadRequests);


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("message-btn")) {
    const userId = e.target.getAttribute("data-id");
    const profileName = e.target.closest(".card").querySelector("h5").innerText;

    showSection("messages");
    openChat(userId, { fullName: profileName, username: "unknown" }); // fallback if no username
  }
});



// ==================== CONNECTIONS FEATURE ====================
// ==================== CONNECTIONS FEATURE ====================
async function loadConnections() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("http://localhost:5000/api/connections", {
      headers: { "x-auth-token": token }
    });
    const data = await res.json();

    console.log("Connections API data:", data); // debug

    const container = document.getElementById("connectionsList");
    if (!container) {
      console.error("❌ #connectionsList not found in DOM");
      return;
    }

    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<p>No connections yet.</p>";
      return;
    }

    // ✅ Correctly extract user id from JWT payload
    const payload = parseJwt(token);
    const userId = payload.user?.id;

    data.forEach(conn => {
      const fromId = conn.fromUser?._id?.toString();
      const toId = conn.toUser?._id?.toString();

      let other = null;
      if (fromId === userId) {
        other = conn.toUser;
      } else if (toId === userId) {
        other = conn.fromUser;
      } else {
        console.warn("⚠️ Neither side matched logged-in user:", conn);
        return;
      }

      const profile = other.profile || {};

      container.innerHTML += `
        <div class="col-md-6">
          <div class="card shadow-sm p-3 mb-3">
            <div class="d-flex align-items-center">
              <img src="./images/user.png" class="rounded-circle me-2" width="40" height="40" />
              <div>
                <h5>${profile.fullName || "Unnamed User"}</h5>
                <small class="text-muted">@${profile.username || "unknown"}</small>
              </div>
            </div>
            <p class="mt-2"><strong>Skills Offered:</strong> ${
              profile.skillsOffered?.map(s => `${s.skillName} (${s.level})`).join(", ") || "None"
            }</p>
            <div class="connection-actions mt-2">
              <button class="btn btn-sm btn-primary view-profile-btn me-2" data-context="connections" data-userid="${other._id}">View Profile</button>
              <button class="btn btn-sm btn-success message-btn" data-id="${other._id}">Message</button>
              <button class="btn btn-sm btn-warning live-btn" data-id="${other._id}">Live Session</button>
            </div>
          </div>
        </div>
      `;
    });

    console.log("✅ Connections rendered:", data.length);
  } catch (err) {
    console.error("Error loading connections:", err);
  }
}


// Handle View Profile button click
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("view-profile-btn")) {
    const userId = e.target.dataset.userid;
    const context = e.target.dataset.context; // "connections" or "category"
    const token = localStorage.getItem("token");

    if (!userId) {
      console.error("❌ View Profile clicked but userId is missing");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: { "x-auth-token": token }
      });
      const user = await res.json();
      const profile = user.profile || {};

      let content = `
        <div class="d-flex align-items-center mb-3">
          <img src="./images/user.png" class="rounded-circle me-3" width="70" height="70"/>
          <div>
            <h4 class="mb-0">${profile.fullName || "Unnamed User"}</h4>
            <small class="text-muted">@${profile.username || "unknown"}</small>
          </div>
        </div>
      `;

      if (context === "connections") {
        // ✅ Full profile
        content += `
          <p><strong>Email:</strong> ${user.email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${profile.phoneNumber || "Not provided"}</p>
          <p><strong>Bio:</strong> ${profile.bio || "No bio"}</p>
          <p><strong>Location:</strong> ${profile.location || "Not specified"}</p>
          <p><strong>Skills Offered:</strong> ${
            profile.skillsOffered?.map(s => `${s.skillName} (${s.level})`).join(", ") || "None"
          }</p>
          <p><strong>Skills to Learn:</strong> ${
            profile.skillsToLearn?.map(s => `${s.skillName}`).join(", ") || "None"
          }</p>
          <p><strong>Availability days:</strong> ${user.profile?.availability?.days || "Not specified"}<br></p>
          <p><strong>Availability time:</strong> ${user.profile?.availability?.time || "Not specified"} (${user.profile?.availability?.timezone || "Not specified"})<br></p>
        `;
      } else if (context === "category") {
        // ✅ Limited profile
        content += `
          <p><strong>Bio:</strong> ${profile.bio || "No bio"}</p>
          <p><strong>Skills Offered:</strong> ${
            profile.skillsOffered?.map(s => `${s.skillName}`).join(", ") || "None"
          }</p>
          <p><strong>Skills to Learn:</strong> ${
            profile.skillsToLearn?.map(s => `${s.skillName}`).join(", ") || "None"
          }</p>
          <p><strong>Availability:</strong> ${profile.availability?.days || "Not specified"}, 
            ${profile.availability?.time || ""} (${profile.availability?.timezone || ""})</p>
        `;
      }

      document.getElementById("profileModalBody").innerHTML = content;
      const modal = new bootstrap.Modal(document.getElementById("profileModal"));
      modal.show();
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }
});







// Load conversations
async function loadConversations() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch("http://localhost:5000/api/messages", {
    headers: { "x-auth-token": token }
  });
  const conversations = await res.json();

  const sidebar = document.getElementById("chatList");
  sidebar.innerHTML = "";

  conversations.forEach(conv => {
    const user = conv.user.profile || {};
    const lastMsg = conv.lastMessage?.text || "No messages yet.";

    sidebar.innerHTML += `
      <div class="conversation-item p-2 border-bottom" data-id="${conv.user._id}">
        <strong>${user.fullName || "Unnamed"}</strong><br>
        <small class="text-muted">@${user.username || "unknown"} – ${lastMsg}</small>
      </div>
    `;
  });
}

// Open chat with a specific user
async function openChat(userId) {
  const token = localStorage.getItem("token");

  // Load user info
  const resUser = await fetch("http://localhost:5000/api/users/" + userId, {
    headers: { "x-auth-token": token }
  });
  const other = await resUser.json();
  const profile = other.profile || {};

  document.getElementById("chatHeader").innerHTML =
    `<h5>${profile.fullName || "User"}</h5>`;

  // Load messages
  const res = await fetch("http://localhost:5000/api/messages/" + userId, {
    headers: { "x-auth-token": token }
  });
  const messages = await res.json();

  const chatBox = document.getElementById("chatMessages");
  chatBox.innerHTML = "";
  const myId = parseJwt(token).id;

  messages.forEach(msg => {
    const isMe = msg.sender === myId;
    chatBox.innerHTML += `
      <div class="chat-bubble ${isMe ? 'me' : 'them'}">${msg.text}</div>
    `;
  });

  chatBox.scrollTop = chatBox.scrollHeight;

  // Send new message
  document.getElementById("sendMessageBtn").onclick = async () => {
    const text = document.getElementById("chatInput").value;
    if (!text) return;

    await fetch("http://localhost:5000/api/messages/" + userId, {
      method: "POST",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    document.getElementById("chatInput").value = "";
    openChat(userId);
  };
}

// Sidebar click
document.addEventListener("click", e => {
  if (e.target.closest(".conversation-item")) {
    const userId = e.target.closest(".conversation-item").dataset.id;
    openChat(userId);
  }
});

// Redirect from Connections → Messages
document.addEventListener("click", e => {
  if (e.target.classList.contains("message-btn")) {
    const userId = e.target.dataset.id;
    localStorage.setItem("openChatUserId", userId);
    showSection("messages");
    openChat(userId);
  }
});

// Auto load when messages section is opened
// Auto load when messages section is opened
function initMessages() {
  loadChatSidebar();   // ✅ use connections, not messages
  const pendingUser = localStorage.getItem("openChatUserId");
  if (pendingUser) {
    // Fetch profile info if needed
    openChat(pendingUser);
    localStorage.removeItem("openChatUserId");
  }
}


const socket = io("http://localhost:5000");

// ✅ Join with logged-in userId
const token = localStorage.getItem("token");
if (token) {
  const payload = parseJwt(token);
  const userId = payload.user?.id;
  if (userId) {
    socket.emit("join", userId);
  }
}



let activeChatUserId = null; // track which user we’re chatting with

// Load conversations into sidebar
async function loadChatSidebar() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("http://localhost:5000/api/messages", {
      headers: { "x-auth-token": token }
    });
    const conversations = await res.json();

    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";

    if (!conversations.length) {
      chatList.innerHTML = "<p class='text-muted p-2'>No conversations yet.</p>";
      return;
    }

    conversations.forEach(conv => {
      const other = conv.user;
      const profile = other?.profile || {};

      // ✅ preview text
      let preview = "";
      if (conv.lastMessage) {
        if (conv.lastMessage.text) preview = conv.lastMessage.text;
        else if (conv.lastMessage.fileType === "image") preview = "📷 Image";
        else if (conv.lastMessage.fileType === "video") preview = "🎥 Video";
        else if (conv.lastMessage.fileType === "document") preview = "📄 Document";
        else preview = "Attachment";
      }

      const unread = conv.unreadCount || 0;

      const chatItem = document.createElement("button");
      chatItem.className =
        "list-group-item list-group-item-action chat-item d-flex justify-content-between align-items-center";
      chatItem.id = `chat-${other._id}`;
      chatItem.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="./images/user.png" class="rounded-circle me-2" width="40" height="40" />
          <div>
            <strong>${profile.fullName || "Unnamed"}</strong><br>
            <small class="text-muted">${preview}</small>
          </div>
        </div>
        ${
          unread > 0
            ? `<span class="badge bg-success rounded-pill">${unread}</span>`
            : ""
        }
      `;

      chatItem.onclick = () => openChat(other._id, profile);
      chatList.appendChild(chatItem);
    });

    // Auto-open first chat if none active
    if (!activeChatUserId && conversations.length > 0) {
      const firstOther = conversations[0].user;
      openChat(firstOther._id, firstOther.profile);
    }

  } catch (err) {
    console.error("Error loading chat sidebar:", err);
  }
}



// Open a chat with selected user
// Open a chat with selected user
// async function openChat(userId, profile) {
//   activeChatUserId = userId;

//   // Highlight selected
//   document.querySelectorAll(".chat-item").forEach(el => el.classList.remove("active"));
//   const chatItem = document.getElementById(`chat-${userId}`);
//   if (chatItem) chatItem.classList.add("active");

//   // Update header
// document.getElementById("chatHeader").innerHTML = `
//   <div class="d-flex align-items-center justify-content-between w-100">
//     <div class="d-flex align-items-center">
//       <img src="./images/user.png" class="rounded-circle me-2" width="45" height="45" />
//       <div>
//         <h5 class="mb-0">${profile?.fullName || "Chat"}</h5>
//         <small class="text-muted">@${profile?.username || ""}</small>
//       </div>
//     </div>
//     <div>
//       <button class="btn btn-sm btn-outline-primary me-2" id="startVideoCallBtn">📹</button>
//       <button class="btn btn-sm btn-outline-success" id="startScreenShareBtn">🖥️</button>
//     </div>
//   </div>
// `;


//   // ✅ Mark messages as read
//   const token = localStorage.getItem("token");
//   await fetch(`http://localhost:5000/api/messages/${userId}/read`, {
//     method: "PUT",
//     headers: { "x-auth-token": token }
//   });

//   // Reload messages
//   await loadMessages(userId);

//   // ✅ Refresh sidebar so unread badge disappears
//   await loadChatSidebar();
// }

// 🔑 Globals
// 🔑 Globals
// const socket = io("http://localhost:5000"); // adjust if needed
// --- GLOBAL SETUP --- //
//const socket = io("http://localhost:5000"); // adjust if needed
let peerConnection;
let localStream;
let remoteStream;
let currentRoomId;
let screenSharing = false;
let savedCameraTrack;
//let activeChatUserId;



// ✅ Join personal room after login
const currentUserId = localStorage.getItem("userId");
if (currentUserId) {
  socket.emit("join", currentUserId);
}

// --- GLOBAL CALL EVENT LISTENERS --- //

// Incoming call notification
socket.on("incoming-call", async ({ from, roomId }) => {
  const accept = confirm(`📞 Incoming call from user ${from}. Accept?`);

  if (accept) {
    socket.emit("call-accepted", { from: currentUserId, to: from, roomId });
    // Open the chat with caller
    await openChat(from, {}); 
    // Start call as callee
    await startCall(false, roomId);
  } else {
    socket.emit("call-declined", { from: currentUserId, to: from });
  }
});

// Caller: other user accepted
socket.on("call-accepted", async ({ from, roomId }) => {
  currentRoomId = roomId;
  await startCall(true, roomId); // caller role
});

// Caller: other user declined
socket.on("call-declined", ({ from }) => {
  alert(`❌ Call declined by user ${from}`);
});

// --- CALL STARTER FUNCTION (used by both caller/callee) --- //
async function startCall(isCaller, roomId) {
  const callModal = document.getElementById("videoCallModal");
  callModal.style.display = "flex";

  try {
    // Get webcam + mic
    localStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

    // My preview = small video
    const smallVideo = document.getElementById("smallVideo");
    smallVideo.srcObject = localStream;
    smallVideo.muted = true;

    // Remote goes to big video
    remoteStream = new MediaStream();
    const mainVideo = document.getElementById("mainVideo");
    mainVideo.srcObject = remoteStream;

  } catch (err) {
    console.error("🚨 Camera error:", err);
    alert("Camera not accessible: " + err.message);
    return;
  }

  // Create RTCPeerConnection
  peerConnection = new RTCPeerConnection();

  // Add local tracks
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  // Remote tracks
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
  };

  // ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", { roomId, candidate: event.candidate });
    }
  };

  // Signaling
  if (isCaller) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { roomId, sdp: offer });
  }
}

// --- SIGNALING HANDLERS (shared by both sides) --- //
socket.on("offer", async ({ sdp }) => {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("answer", { roomId: currentRoomId, sdp: answer });
});

socket.on("answer", async ({ sdp }) => {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
});

socket.on("ice-candidate", async ({ candidate }) => {
  try {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (err) {
    console.error("Error adding ICE candidate:", err);
  }
});

// --- MAIN CHAT FUNCTION --- //
async function openChat(userId, profile) {
  activeChatUserId = userId;

  // Highlight selected
  document.querySelectorAll(".chat-item").forEach(el => el.classList.remove("active"));
  const chatItem = document.getElementById(`chat-${userId}`);
  if (chatItem) chatItem.classList.add("active");

  // Reset call modal
  const callModal = document.getElementById("videoCallModal");
  if (callModal) callModal.style.display = "none";

  // Clear old videos
  const mainVideo = document.getElementById("mainVideo");
  const smallVideo = document.getElementById("smallVideo");
  if (mainVideo?.srcObject) { mainVideo.srcObject.getTracks().forEach(t => t.stop()); mainVideo.srcObject = null; }
  if (smallVideo?.srcObject) { smallVideo.srcObject.getTracks().forEach(t => t.stop()); smallVideo.srcObject = null; }

  // Header UI
  document.getElementById("chatHeader").innerHTML = `
    <div class="d-flex align-items-center justify-content-between w-100">
      <div class="d-flex align-items-center">
        <img src="./images/user.png" class="rounded-circle me-2" width="45" height="45" />
        <div>
          <h5 class="mb-0">${profile?.fullName || "Chat"}</h5>
          <small class="text-muted">@${profile?.username || ""}</small>
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-primary" id="startVideoCallBtn">📹</button>
      </div>
    </div>
  `;

  // Start call button → send invite
  const videoCallBtn = document.getElementById("startVideoCallBtn");
  if (videoCallBtn) {
    videoCallBtn.onclick = () => {
      currentRoomId = [currentUserId, activeChatUserId].sort().join("-");
      socket.emit("call-user", { from: currentUserId, to: activeChatUserId, roomId: currentRoomId });
    };
  }

  // End call
  const endCallBtn = document.getElementById("endCallBtn");
  if (endCallBtn) {
    endCallBtn.onclick = () => {
      if (callModal) callModal.style.display = "none";
      if (localStream) localStream.getTracks().forEach(track => track.stop());
      if (remoteStream) remoteStream.getTracks().forEach(track => track.stop());
      if (peerConnection) peerConnection.close();
      document.getElementById("mainVideo").srcObject = null;
      document.getElementById("smallVideo").srcObject = null;
      screenSharing = false;
      savedCameraTrack = null;
    };
  }

  // Screen share
  const toggleScreenShareBtn = document.getElementById("toggleScreenShareBtn");
  if (toggleScreenShareBtn) {
    toggleScreenShareBtn.onclick = async () => {
      if (!peerConnection) return;
      const sender = peerConnection.getSenders().find(s => s.track.kind === "video");

      if (!screenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        savedCameraTrack = localStream.getVideoTracks()[0];
        sender.replaceTrack(screenTrack);
        document.getElementById("mainVideo").srcObject = screenStream;
        screenSharing = true;
        screenTrack.onended = () => {
          sender.replaceTrack(savedCameraTrack);
          document.getElementById("mainVideo").srcObject = remoteStream;
          screenSharing = false;
        };
      } else {
        sender.replaceTrack(savedCameraTrack);
        document.getElementById("mainVideo").srcObject = remoteStream;
        screenSharing = false;
      }
    };
  }

  // ✅ Mark messages as read
  const token = localStorage.getItem("token");
  await fetch(`http://localhost:5000/api/messages/${userId}/read`, {
    method: "PUT",
    headers: { "x-auth-token": token }
  });

  // Reload messages
  await loadMessages(userId);

  // Refresh sidebar
  await loadChatSidebar();
}















function getDateLabel(date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
  }
}




// Load messages with user
async function loadMessages(userId) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/messages/${userId}`, {
      headers: { "x-auth-token": token }
    });
    const messages = await res.json();

    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";

    if (!messages.length) {
      chatMessages.innerHTML = "<p class='text-muted'>No messages yet.</p>";
      return;
    }

    const payload = parseJwt(token);
    const currentUserId = payload.user?.id;

    let lastDate = null;

    messages.forEach(msg => {
      const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
      const isMine = senderId?.toString() === currentUserId?.toString();

      const msgDate = new Date(msg.createdAt);
      const msgDay = msgDate.toDateString();

      if (lastDate !== msgDay) {
        const dateLabel = getDateLabel(msgDate);
        const wrapper = document.createElement("div");
        wrapper.className = "date-divider-wrapper";

        const divider = document.createElement("div");
        divider.className = "date-divider";
        divider.innerText = dateLabel;

        wrapper.appendChild(divider);
        chatMessages.appendChild(wrapper);

        lastDate = msgDay;
      }

      const time = msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // ✅ Build message content
      // ✅ Build message content
      let content = "";

      // Show text if present
      if (msg.text) {
        content += `<div>${msg.text}</div>`;
      }

      // Handle file attachments
      if (msg.fileUrl) {
        const filePath = `http://localhost:5000${msg.fileUrl}`;
        const fileName = msg.fileName || "file";

        switch (msg.fileType) {
          case "image":
            content += `
              <img src="${filePath}" 
                  class="img-fluid rounded mt-2" 
                  style="max-width:200px; display:block; cursor:pointer;" 
                  onclick="window.open('${filePath}', '_blank')" />
            `;
            break;

          case "video":
            content += `
              <video controls class="mt-2 rounded" style="max-width:250px; display:block;">
                <source src="${filePath}" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            `;
            break;

          case "audio":
            content += `
              <audio controls class="mt-2">
                <source src="${filePath}" type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
            `;
            break;

          default: // documents and others
            content += `
              <a href="${filePath}" target="_blank" 
                class="btn btn-sm btn-outline-secondary mt-2">
                📄 ${fileName}
              </a>
            `;
            break;
        }
      }


      const msgDiv = document.createElement("div");
      msgDiv.className = `mb-2 d-flex ${isMine ? "justify-content-end" : "justify-content-start"}`;
      msgDiv.innerHTML = `
        <div class="chat-bubble ${isMine ? "me" : "them"}">
          ${content}
          <div class="chat-timestamp">${time}</div>
        </div>
      `;
      chatMessages.appendChild(msgDiv);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    console.error("Error loading messages:", err);
  }
}



// Send message
document.getElementById("sendMessageBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const fileInput = document.getElementById("fileInput");
  const text = input.value.trim();
  const file = fileInput.files[0];

  if (!text && !file) return;

  const token = localStorage.getItem("token");
  const formData = new FormData();
  if (text) formData.append("text", text);
  if (file) formData.append("file", file);

  // Save message via API
  const res = await fetch(`http://localhost:5000/api/messages/${activeChatUserId}`, {
    method: "POST",
    headers: { "x-auth-token": token },
    body: formData
  });
  const savedMessage = await res.json();

  // Emit real-time message
  socket.emit("sendMessage", savedMessage);

  input.value = "";
  fileInput.value = "";
  await loadMessages(activeChatUserId); // refresh sender view
});


socket.on("receiveMessage", (message) => {
  // Only append if it belongs to the active chat
  if (activeChatUserId === message.sender) {
    const chatMessages = document.getElementById("chatMessages");

    const time = new Date(message.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const msgDiv = document.createElement("div");
    msgDiv.className = `mb-2 d-flex justify-content-start`;
    msgDiv.innerHTML = `
      <div class="chat-bubble them">
        ${message.text || ""}
        <div class="chat-timestamp">${time}</div>
      </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ✅ Also refresh sidebar so last message + badge update
  loadChatSidebar();
});



// Open Video Call
//let localStream = null;
// let isScreenSharing = false;

// // Open Video Call
// document.addEventListener("click", async (e) => {
//   if (e.target.id === "startVideoCallBtn") {
//     document.getElementById("callTitle").innerText = "Video Call";
//     document.getElementById("videoCallModal").style.display = "flex";
    
//     // Get webcam stream
//     localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     document.getElementById("mainVideo").srcObject = localStream;

//     // TODO: send localStream via WebRTC/socket.io to other peer
//   }
// });

// // Toggle Screen Share
// document.getElementById("toggleScreenShareBtn").onclick = async () => {
//   if (!isScreenSharing) {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const screenTrack = screenStream.getVideoTracks()[0];

//       // Replace track in localStream
//       const sender = pc.getSenders().find(s => s.track.kind === "video");
//       sender.replaceTrack(screenTrack);

//       document.getElementById("mainVideo").srcObject = screenStream;

//       // When user stops sharing
//       screenTrack.onended = async () => {
//         const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         const camTrack = camStream.getVideoTracks()[0];
//         sender.replaceTrack(camTrack);
//         document.getElementById("mainVideo").srcObject = camStream;
//         isScreenSharing = false;
//       };

//       isScreenSharing = true;
//     } catch (err) {
//       console.error("❌ Screen share error:", err);
//     }
//   } else {
//     // Stop sharing → go back to webcam
//     const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     const camTrack = camStream.getVideoTracks()[0];
//     const sender = pc.getSenders().find(s => s.track.kind === "video");
//     sender.replaceTrack(camTrack);
//     document.getElementById("mainVideo").srcObject = camStream;
//     isScreenSharing = false;
//   }
// };

// // Minimize Call
// document.getElementById("minimizeCallBtn").onclick = () => {
//   const modal = document.getElementById("videoCallModal");
//   modal.classList.toggle("minimized");
// };

// // End Call
// document.getElementById("endCallBtn").onclick = () => {
//   document.getElementById("videoCallModal").style.display = "none";
//   document.getElementById("videoCallModal").classList.remove("minimized");

//   if (localStream) {
//     localStream.getTracks().forEach(track => track.stop());
//     localStream = null;
//   }

//   document.getElementById("mainVideo").srcObject = null;
//   document.getElementById("smallVideo").srcObject = null;

//   // TODO: also close peer connection + notify other user
// };









function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
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


async function saveProfile() {
    const updatedProfile = {
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('username') ? document.getElementById('username').value : undefined,
        phoneNumber: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        bio: document.getElementById('bio').value,
        // Add more fields if needed (LinkedIn, Portfolio, etc.)
        socialLinks: {
            linkedin: document.querySelector('input[name="linkedin"]').value,
            portfolio: document.querySelector('input[name="portfolio"]').value
        }
    };

    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                  "x-auth-token": token
            },
            body: JSON.stringify(updatedProfile)
        });

        if (!res.ok) throw new Error('Failed to update profile');

        const updatedUser = await res.json();

        // Update local userData
        userData = updatedUser.profile || userData;

        // Update display name
        document.getElementById('displayName').textContent = updatedProfile.fullName;
        document.getElementById('userName').textContent = updatedProfile.fullName;

        showNotification('Profile updated successfully!', 'success');
        toggleEditMode();

    } catch (err) {
        console.error(err);
        alert('Error updating profile. Please try again.');
    }
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



/*Profile fetcher (merged from profile-1.html)*/
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
      // Populate the form fields with user data
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

      // Update dashboard skill lists
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
