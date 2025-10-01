// full merged homepage_merged.js
// Contains: original UI functions, search, categories, messages,
// profile fetch/populate, Tagify skill editing, saveProfile (PUT).

/* ------------------ Globals ------------------ */
let currentSection = 'home';
let editMode = false;
let navigationHistory = [];
let currentUser = null; // stores full user object from backend
let tagifyOffered = null;
let tagifyWanted = null;

/* ---------- Initial sample variables (kept for compatibility) ---------- */
const skillCategories = {
    'Tech': { icon: 'fas fa-laptop-code', skills: [ { name: 'Python Programming', users:['Aman'] } ] },
    'Art & Design': { icon: 'fas fa-palette', skills: [] },
    'Music': { icon: 'fas fa-music', skills: [] },
    'Business': { icon: 'fas fa-briefcase', skills: [] },
    'Languages': { icon: 'fas fa-globe', skills: [] },
    'Fitness': { icon: 'fas fa-dumbbell', skills: [] }
};

const chatData = {
  'aman': { name:'Aman Kumar', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50', status:'Online', messages:[] },
  'sara': { name:'Sara Johnson', avatar:'https://images.unsplash.com/photo-1494790108755-2616b332c1a7?w=50&h=50', status:'Online', messages:[] }
};

/* ---------- Utilities ---------- */
function showNotification(message, type='info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    const notice = document.createElement('div');
    notice.className = `notification alert alert-${type==='success'?'success':type==='error'?'danger':'info'}`;
    notice.style = 'position:fixed; top:90px; right:20px; z-index:2000; min-width:260px;';
    notice.innerHTML = `${message} <button class="btn-close" onclick="this.parentNode.remove()"></button>`;
    document.body.appendChild(notice);
    setTimeout(()=> notice.remove(), 5000);
}

/* ---------- Basic NAV / UI ---------- */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initTagifyInputs();
    fetchAndPopulateProfile();
    populateSkillCategories();
    initializeSearchBindings();
    initializeMessages();
});

function initializeApp() {
    // set userName fallback
    const userNameEl = document.getElementById('userName');
    if (userNameEl) userNameEl.textContent = '';
    showSection('home');
    const messageInput = document.getElementById('messageInput');
    if (messageInput) messageInput.addEventListener('keypress', (e) => { if (e.key==='Enter') sendMessage(); });
}

/* ---------- Search (kept simple) ---------- */
function initializeSearchBindings() {
  // Basic search dropdown behavior already in HTML inline earlier — leave minimal
  const input = document.getElementById('searchInput');
  if (!input) return;
  const dropdown = document.getElementById('searchDropdown');
  const staticSuggestions = ["Python","Drawing","UI/UX","React","Public Speaking","Music","Art"];
  let history = JSON.parse(localStorage.getItem('searchHistory')||'[]');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    const list = q ? staticSuggestions.filter(s => s.toLowerCase().includes(q)) : history;
    if (!list.length) { dropdown.innerHTML = '<div class="suggestion-item p-2">No results</div>'; dropdown.style.display='block'; return; }
    list.forEach(item => {
      const div = document.createElement('div'); div.className='suggestion-item p-2'; div.textContent = item;
      div.onclick = () => { input.value = item; dropdown.innerHTML=''; alert('You searched: '+item); };
      dropdown.appendChild(div);
    });
    dropdown.style.display='block';
  });
  document.addEventListener('click', (e)=>{ if(!e.target.closest('.search-wrapper')) dropdown.innerHTML=''; });
}

/* ---------- Categories ---------- */
function populateSkillCategories(){
  const grid = document.getElementById('categoryGrid');
  if(!grid) return;
  grid.innerHTML = '';
  Object.keys(skillCategories).forEach(cat => {
    const card = document.createElement('div');
    card.className = 'col-lg-2 col-md-3 col-6 mb-3';
    card.innerHTML = `
      <div class="category-detail-card p-3" onclick="showCategorySkills('${cat}')">
        <div class="category-icon"><i class="${skillCategories[cat].icon}"></i></div>
        <h6>${cat}</h6>
        <p class="text-muted">${skillCategories[cat].skills.length} skills</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function showCategorySkills(categoryName){
  const c = skillCategories[categoryName];
  if(!c) return;
  const section = document.getElementById('categoryUsersSection');
  const title = document.getElementById('categoryUsersTitle');
  const list = document.getElementById('categoryUsersList');
  if(section) section.style.display='block';
  if(title) title.textContent = `${categoryName} Skills & Teachers`;
  if(list){
    list.innerHTML = '';
    c.skills.forEach(skill => {
      const col = document.createElement('div'); col.className='col-md-6 col-lg-4 mb-3';
      col.innerHTML = `<div class="user-teaching-card p-3"><h6 class="text-primary">${skill.name}</h6>
        <div class="teachers-list">${skill.users.map(u=>`<div class="d-flex align-items-center mb-2"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd72?w=40&h=40&fit=crop&crop=face" style="width:40px;height:40px;border-radius:50%;" /> <div class="ms-2">${u}</div><div class="ms-auto"><button class="btn btn-sm btn-outline-primary" onclick="sendSkillRequest('${u}','${skill.name}')">Request</button></div></div>`).join('')}</div></div>`;
      list.appendChild(col);
    });
  }
}

function sendSkillRequest(teacherName, skillName){
  showNotification(`Request sent to ${teacherName} for ${skillName}`, 'success');
}

/* ---------- Messages (kept minimal) ---------- */
function initializeMessages(){ if(document.getElementById('chatMessages')) selectChat('aman'); }
function selectChat(userId){
  const u = chatData[userId]; if(!u) return;
  document.getElementById('currentChatAvatar').src = u.avatar;
  document.getElementById('currentChatName').textContent = u.name;
  document.getElementById('currentChatStatus').textContent = u.status;
  displayMessages(u.messages);
}
function displayMessages(messages){
  const container = document.getElementById('chatMessages'); if(!container) return;
  container.innerHTML = '';
  messages.forEach(m => {
    const div = document.createElement('div');
    div.className = 'message '+(m.type||'');
    div.innerHTML = `<div class="message-content">${m.content}<div class="message-time">${m.time||''}</div></div>`;
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
}
function sendMessage(){
  const input = document.getElementById('messageInput'); if(!input) return;
  const text = input.value.trim(); if(!text) return;
  const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  chatData.aman.messages.push({ type:'sent', content:text, time:now });
  displayMessages(chatData.aman.messages);
  input.value='';
  setTimeout(()=>{ chatData.aman.messages.push({type:'received', content:'Thanks! Will reply soon.', time:new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}); displayMessages(chatData.aman.messages); }, 1200);
}

/* ---------- Skills display helpers ---------- */
function createSkillListItem({skillName, level, categories}) {
  const li = document.createElement('div');
  li.className = 'skill-tag p-2';
  li.setAttribute('data-skill', skillName);
  li.setAttribute('data-level', level || '');
  li.setAttribute('data-categories', JSON.stringify(categories || []));
  li.innerHTML = `<strong>${skillName}</strong> <small class="text-muted">(${level||'—'})</small>
    <div class="d-inline ms-2 text-muted small">${(categories || []).join(', ')}</div>
    <button class="remove-skill btn btn-sm btn-link text-danger" style="display:${editMode?'inline-block':'none'}" onclick="removeSkillFromList(this)">×</button>`;
  return li;
}

function removeSkillFromList(btn) {
  const node = btn.closest('.skill-tag');
  if (!node) return;
  const listId = node.closest('.skills-list').id;
  node.remove();
  // also remove from currentUser.profile arrays if present
  if (currentUser && currentUser.profile) {
    const skillName = node.getAttribute('data-skill');
    if (listId === 'skillsOfferedList') {
      currentUser.profile.skillsOffered = (currentUser.profile.skillsOffered||[]).filter(s => s.skillName !== skillName && s.skillName !== skillName);
    } else {
      currentUser.profile.skillsToLearn = (currentUser.profile.skillsToLearn||[]).filter(s => s.skillName !== skillName && s.skillName !== skillName);
    }
  }
}

/* ---------- Tagify init + Add skill logic for edit mode ---------- */
function initTagifyInputs() {
  const inputOffered = document.getElementById('skillsOfferedInput');
  const inputWanted = document.getElementById('skillsWantedInput');

  if (inputOffered) {
    tagifyOffered = new Tagify(inputOffered, { whitelist: [], dropdown: { enabled: 0 } });
  }
  if (inputWanted) {
    tagifyWanted = new Tagify(inputWanted, { whitelist: [], dropdown: { enabled: 0 } });
  }

  // Add buttons
  const addOfferedBtn = document.getElementById('addOfferedBtn');
  if (addOfferedBtn) addOfferedBtn.addEventListener('click', () => addSkillFromEdit('Offered'));
  const addWantedBtn = document.getElementById('addWantedBtn');
  if (addWantedBtn) addWantedBtn.addEventListener('click', () => addSkillFromEdit('Wanted'));
}

function addSkillFromEdit(kind) {
  // kind: 'Offered' or 'Wanted'
  const lower = kind.toLowerCase();
  const inputEl = (kind === 'Offered') ? document.getElementById('skillsOfferedInput') : document.getElementById('skillsWantedInput');
  const levelEl = (kind === 'Offered') ? document.getElementById('skillLevelOffered') : document.getElementById('skillLevelWanted');
  const listEl = (kind === 'Offered') ? document.getElementById('skillsOfferedList') : document.getElementById('skillsWantedList');

  const tagifyInst = (kind === 'Offered') ? tagifyOffered : tagifyWanted;
  const tags = (tagifyInst && Array.isArray(tagifyInst.value)) ? tagifyInst.value : [];
  let skillName = tags.length ? tags[0].value.trim() : (inputEl ? inputEl.value.trim() : '');
  const skillLevel = levelEl ? levelEl.value.trim() : '';

  // categories depending on kind
  const catName = (kind === 'Offered') ? 'offered_category' : 'wanted_category';
  const categories = Array.from(document.querySelectorAll(`input[name="${catName}"]:checked`)).map(cb => cb.value);

  if (!skillName) { alert('Please enter or select a skill name.'); return; }
  if (!skillLevel) { alert('Please select a skill level.'); return; }

  // create item and append
  const li = createSkillListItem({ skillName, level: skillLevel, categories });
  listEl.appendChild(li);

  // store into currentUser.profile structure so saveProfile will pick it up
  if (!currentUser) currentUser = { profile: {} };
  if (!currentUser.profile.skillsOffered) currentUser.profile.skillsOffered = [];
  if (!currentUser.profile.skillsToLearn) currentUser.profile.skillsToLearn = [];

  const skillObj = { skillName, level: skillLevel, category: categories };
  if (kind === 'Offered') {
    currentUser.profile.skillsOffered.push(skillObj);
  } else {
    currentUser.profile.skillsToLearn.push(skillObj);
  }

  // reset inputs
  if (tagifyInst && tagifyInst.removeAllTags) tagifyInst.removeAllTags();
  if (inputEl) inputEl.value = '';
  if (levelEl) levelEl.value = '';
  document.querySelectorAll(`input[name="${catName}"]:checked`).forEach(cb => cb.checked = false);
}

/* ---------- Render skills from user (used by fetch populate) ---------- */
function populateSkillsList(listId, skillsArray) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;
  listEl.innerHTML = '';
  (skillsArray || []).forEach(s => {
    // incoming skill shape may be {skillName, level, category: [..]} or older shape
    const skillName = s.skillName || s.name || s;
    const level = s.level || '';
    const categories = Array.isArray(s.category) ? s.category : (s.categories || []);
    const li = createSkillListItem({ skillName, level, categories });
    listEl.appendChild(li);
  });
}

/* ---------- Remove skill (for dashboard helpers) ---------- */
function removeSkill(type, skillName) {
  if (!confirm(`Remove ${skillName}?`)) return;
  if (type === 'teach') {
    if (currentUser && currentUser.profile && Array.isArray(currentUser.profile.skillsOffered)) {
      currentUser.profile.skillsOffered = currentUser.profile.skillsOffered.filter(s => s.skillName !== skillName);
      populateSkillsList('skillsOfferedList', currentUser.profile.skillsOffered);
    }
  } else {
    if (currentUser && currentUser.profile && Array.isArray(currentUser.profile.skillsToLearn)) {
      currentUser.profile.skillsToLearn = currentUser.profile.skillsToLearn.filter(s => s.skillName !== skillName);
      populateSkillsList('skillsWantedList', currentUser.profile.skillsToLearn);
    }
  }
  showNotification(`${skillName} removed`, 'info');
}

/* ---------- Edit / Save Profile UI ---------- */
function toggleEditMode() {
  editMode = !editMode;
  const editBtn = document.getElementById('editProfileBtn');
  const editButtons = document.getElementById('editButtons');
  const profileInputs = document.querySelectorAll('#profileSection input, #profileSection textarea, #profileSection select');
  const skillButtons = document.querySelectorAll('.remove-skill, .add-skill-btn');

  if (editMode) {
    editBtn.innerHTML = '<i class="fas fa-times me-2"></i>Cancel Edit';
    editBtn.className = 'btn btn-secondary';
    if (editButtons) editButtons.style.display = 'block';

    profileInputs.forEach(input => {
      input.removeAttribute('readonly');
      input.removeAttribute('disabled');
    });

    // show skill remove buttons
    document.querySelectorAll('.skills-list .remove-skill').forEach(btn => btn.style.display = 'inline-block');
    document.querySelectorAll('.add-skill-btn').forEach(b => b.style.display = 'inline-block');

  } else {
    editBtn.innerHTML = '<i class="fas fa-edit me-2"></i>Edit Profile';
    editBtn.className = 'btn btn-primary';
    if (editButtons) editButtons.style.display = 'none';

    profileInputs.forEach(input => {
      if (input.tagName.toLowerCase() === 'textarea') input.setAttribute('readonly', 'readonly');
      else if (input.type === 'checkbox' || input.type === 'radio' || input.tagName.toLowerCase() === 'select') input.setAttribute('disabled', 'disabled');
      else input.setAttribute('readonly', 'readonly');
    });

    document.querySelectorAll('.skills-list .remove-skill').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.add-skill-btn').forEach(b => b.style.display = 'none');
  }
}

async function saveProfile() {
  // gather fields
  const token = localStorage.getItem('token');
  const fullName = document.getElementById('fullName')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const location = document.getElementById('location')?.value || '';
  const bio = document.getElementById('bio')?.value || '';
  const linkedin = document.querySelector('input[name="linkedin"]')?.value || '';
  const portfolio = document.querySelector('input[name="portfolio"]')?.value || '';

  // availability
  const days = Array.from(document.querySelectorAll('input[name="availabilityDays"]'))
              .filter(cb => cb.checked)
              .map(cb => cb.value);
  const start = document.getElementById('availabilityStart')?.value || '';
  const end = document.getElementById('availabilityEnd')?.value || '';
  const timezone = document.getElementById('availabilityTimezone')?.value || '';

  // skills: use currentUser.profile arrays (best source), if not present collect from DOM
  let skillsOffered = [];
  let skillsToLearn = [];
  if (currentUser && currentUser.profile) {
    skillsOffered = (currentUser.profile.skillsOffered || []).map(s => ({
      skillName: s.skillName || s.name || s,
      level: s.level || '',
      category: s.category || s.categories || []
    }));
    skillsToLearn = (currentUser.profile.skillsToLearn || []).map(s => ({
      skillName: s.skillName || s.name || s,
      level: s.level || '',
      category: s.category || s.categories || []
    }));
  } else {
    // fallback: read DOM items
    skillsOffered = Array.from(document.querySelectorAll('#skillsOfferedList .skill-tag')).map(el => ({
      skillName: el.getAttribute('data-skill'),
      level: el.getAttribute('data-level'),
      category: JSON.parse(el.getAttribute('data-categories') || '[]')
    }));
    skillsToLearn = Array.from(document.querySelectorAll('#skillsWantedList .skill-tag')).map(el => ({
      skillName: el.getAttribute('data-skill'),
      level: el.getAttribute('data-level'),
      category: JSON.parse(el.getAttribute('data-categories') || '[]')
    }));
  }

  const payload = {
    profile: {
      fullName,
      location,
      bio,
      skillsOffered,
      skillsToLearn,
      availability: {
        days,
        time: (start && end) ? `${start} - ${end}` : '',
        timezone
      },
      socialLinks: {
        linkedin,
        github: portfolio
      }
    },
    // top-level contact fields
    email,
    phoneNumber: phone
  };

  try {
    const headers = { 'Content-Type':'application/json' };
    if (token) headers['x-auth-token'] = token;
    const res = await fetch('http://localhost:5000/api/profile', {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (res.ok) {
      showNotification('Profile saved successfully!', 'success');
      // refresh currentUser from server to ensure normalized format
      await fetchAndPopulateProfile();
      toggleEditMode();
    } else {
      console.error('saveProfile error', result);
      showNotification('Failed to save profile. See console.', 'error');
    }
  } catch (err) {
    console.error('saveProfile exception', err);
    showNotification('Network error while saving profile', 'error');
  }
}

function cancelEdit() {
  // revert form to currentUser values
  if (currentUser) {
    applyUserToForm(currentUser);
  }
  toggleEditMode();
}

/* ---------- Fetch & Populate Profile (from profile-1.html merged) ---------- */
function getToken() { return localStorage.getItem('token'); }

async function fetchAndPopulateProfile(){
  const token = getToken();
  if (!token) {
    console.warn('No token found; skipping profile fetch.');
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/profile', {
      method: 'GET',
      headers: { 'Content-Type':'application/json', 'x-auth-token': token }
    });
    const user = await res.json();
    if (!res.ok) {
      console.error('Failed to fetch profile:', user);
      return;
    }
    currentUser = user;
    applyUserToForm(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
  }
}

function applyUserToForm(user) {
  // user may include: email, phoneNumber, profile: { fullName, username, location, bio, skillsOffered, skillsToLearn, availability, socialLinks }
  const profile = user.profile || {};

  document.getElementById('displayName') && (document.getElementById('displayName').textContent = profile.fullName || user.email || 'User');
  document.getElementById('displayUsername') && (document.getElementById('displayUsername').textContent = profile.username ? '@'+profile.username : (profile.username || ''));
  document.getElementById('userName') && (document.getElementById('userName').textContent = profile.fullName ? `Hello, ${profile.fullName}` : (user.email || ''));

  // basic fields
  const nameInput = document.getElementById('fullName'); if (nameInput) nameInput.value = profile.fullName || '';
  const emailInput = document.getElementById('email'); if (emailInput) emailInput.value = user.email || '';
  const phoneInput = document.getElementById('phone'); if (phoneInput) phoneInput.value = user.phoneNumber || '';
  const locationInput = document.getElementById('location'); if (locationInput) locationInput.value = profile.location || '';
  const bioInput = document.getElementById('bio'); if (bioInput) bioInput.value = profile.bio || '';

  // social
  const linkedInInput = document.querySelector('input[name="linkedin"]'); if (linkedInInput) linkedInInput.value = (profile.socialLinks && profile.socialLinks.linkedin) || '';
  const portfolioInput = document.querySelector('input[name="portfolio"]'); if (portfolioInput) portfolioInput.value = (profile.socialLinks && profile.socialLinks.github) || '';

  // skills
  const offered = profile.skillsOffered || [];
  const wanted = profile.skillsToLearn || profile.skillsWanted || profile.skillsToLearn || [];
  populateSkillsList('skillsOfferedList', offered);
  populateSkillsList('skillsWantedList', wanted);

  // set currentUser profile arrays for editing
  if (!currentUser.profile) currentUser.profile = {};
  currentUser.profile.skillsOffered = offered.slice();
  currentUser.profile.skillsToLearn = wanted.slice();

  // availability
  if (profile.availability) {
    const days = profile.availability.days || [];
    document.querySelectorAll('input[name="availabilityDays"]').forEach(cb => {
      cb.checked = days.includes(cb.value);
    });
    // time string could be "HH:MM - HH:MM" or similar; if server stores as such parse it
    const timeStr = profile.availability.time || '';
    let start='', end='';
    if (timeStr && timeStr.includes('-')) {
      const parts = timeStr.split('-').map(p=>p.trim());
      start = parts[0]||'';
      end = parts[1]||'';
    }
    const startEl = document.getElementById('availabilityStart'); if (startEl) startEl.value = start;
    const endEl = document.getElementById('availabilityEnd'); if (endEl) endEl.value = end;
    const tzEl = document.getElementById('availabilityTimezone'); if (tzEl) tzEl.value = profile.availability.timezone || '';
  } else {
    document.querySelectorAll('input[name="availabilityDays"]').forEach(cb => cb.checked = false);
    if (document.getElementById('availabilityStart')) document.getElementById('availabilityStart').value = '';
    if (document.getElementById('availabilityEnd')) document.getElementById('availabilityEnd').value = '';
    if (document.getElementById('availabilityTimezone')) document.getElementById('availabilityTimezone').value = '';
  }

  // show/hide edit related UI according to current editMode
  toggleEditModeIfNeeded();
}

function toggleEditModeIfNeeded(){
  // Ensure the input readonly/disabled states reflect editMode after population
  const profileInputs = document.querySelectorAll('#profileSection input, #profileSection textarea, #profileSection select');
  if (editMode) {
    profileInputs.forEach(i => { i.removeAttribute('readonly'); i.removeAttribute('disabled'); });
  } else {
    profileInputs.forEach(i => {
      if (i.tagName.toLowerCase() === 'textarea') i.setAttribute('readonly','readonly');
      else if (i.type === 'checkbox' || i.type === 'radio' || i.tagName.toLowerCase() === 'select') i.setAttribute('disabled','disabled');
      else i.setAttribute('readonly','readonly');
    });
  }
}

/* ---------- Helpers for page navigation ---------- */
function showSection(sectionName) {
  document.querySelectorAll('.content-section').forEach(s => s.style.display='none');
  const el = document.getElementById(sectionName + 'Section') || document.getElementById(sectionName);
  if (el) el.style.display='block';
  // update history logic
  if (currentSection !== sectionName) {
    navigationHistory.push(currentSection);
    if (navigationHistory.length>10) navigationHistory.shift();
  }
  currentSection = sectionName;
  document.getElementById('backButtonContainer').style.display = (navigationHistory.length>0 && sectionName!=='home') ? 'block' : 'none';
}
function goBack(){ if(navigationHistory.length) showSection(navigationHistory.pop()); else showSection('home'); }
function logout(){ if(confirm('Logout?')) { localStorage.removeItem('token'); window.location.href='landing.html'; } }

/* ---------- Small init: update skills display placeholders ---------- */
function updateSkillsDisplay() {
  // Called to update any dashboard skill lists you may have — here mostly a placeholder
  // If you have teachingSkills container update it from currentUser.profile.skillsOffered
  const teachingSkillsContainer = document.getElementById('teachingSkills');
  if (teachingSkillsContainer && currentUser && currentUser.profile) {
    teachingSkillsContainer.innerHTML = (currentUser.profile.skillsOffered||[]).map(s => `
      <div class="skill-item"><div class="skill-info"><h6>${s.skillName}</h6><span class="skill-level">${s.level||''}</span></div>
      <div class="skill-actions"><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-edit"></i></button>
      <button class="btn btn-sm btn-outline-danger" onclick="removeSkill('teach','${s.skillName}')"><i class="fas fa-trash"></i></button></div></div>
    `).join('');
  }
}

/* ---------- End of file ---------- */
