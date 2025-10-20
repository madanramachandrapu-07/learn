function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if admin is logged in
  checkAdminLogin();
  
  // Load initial section
  showSection('dashboard');
  
  // --- ADD THIS EVENT LISTENER ---
  const feedbackEmailForm = document.getElementById('feedbackEmailForm');
  if (feedbackEmailForm) {
    feedbackEmailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const feedbackId = document.getElementById('feedbackEmailFeedbackId').value;
      const subject = document.getElementById('feedbackEmailSubject').value;
      const message = document.getElementById('feedbackEmailMessage').value;

      try {
        const res = await fetch(`api/admin/feedback/${feedbackId}/notify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          },
          body: JSON.stringify({ subject, message })
        });
        
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Failed to send notification.');
        }

        // Success!
        alert('User notified and feedback resolved!');
        
        // Hide the modal
        const emailModal = bootstrap.Modal.getInstance(document.getElementById('feedbackEmailModal'));
        emailModal.hide();
        
        // Reload the feedback table
        loadFeedback();
        loadDashboardStats(); // Also reload stats (newFeedback count will change)

      } catch (err) {
        console.error('Error notifying user:', err);
        alert(`Error: ${err.message}`);
      }
    });
  }
});

const token = localStorage.getItem('token');

async function checkAdminLogin() {
  if (!token) {
    window.location.href = 'landing.html'; // Redirect if no token
    return;
  }
  
  try {
    // We can't see the role from the token alone.
    // Let's try to fetch admin-only data. If it fails, we're not an admin.
    const res = await fetch('api/admin/stats', {
      headers: { 'x-auth-token': token }
    });

    if (res.status === 403) { // 403 Forbidden
      alert('You are not authorized to view this page.');
      window.location.href = 'homepage.html'; // Redirect non-admins
    } else if (!res.ok) {
      throw new Error('Authentication failed');
    }

  } catch (err) {
    console.error(err);
    localStorage.removeItem('token');
    window.location.href = 'newindex.html';
  }
}

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
  
  // Show target section
  const targetSection = document.getElementById(sectionName + 'Section');
  if (targetSection) {
    targetSection.style.display = 'block';
  }

  // Update active link in sidebar
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick') === `showSection('${sectionName}')`) {
      link.classList.add('active');
    }
  });
  
  // Load data for the section
  if (sectionName === 'dashboard') {
    loadDashboardStats();
  } else if (sectionName === 'users') {
    loadUsers();
  } else if (sectionName === 'feedback') {
    loadFeedback();
  }
}

async function loadDashboardStats() {
  try {
    const res = await fetch('api/admin/stats', {
      headers: { 'x-auth-token': token }
    });
    const stats = await res.json();
    
    document.getElementById('totalUsers').textContent = stats.users;
    document.getElementById('totalFeedback').textContent = stats.feedback;
    document.getElementById('newFeedback').textContent = stats.newFeedback;

  } catch (err) {
    console.error('Error loading stats:', err);
  }
}

async function loadUsers() {
  try {
    const res = await fetch('api/admin/users', {
      headers: { 'x-auth-token': token }
    });
    const users = await res.json();
    
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = ''; // Clear old data

    users.forEach(user => {
      const row = tableBody.insertRow();
      
      // Check if the user is the one currently logged in
      const payload = parseJwt(token);
      const isCurrentUser = (payload.user.id === user._id);
      
      row.innerHTML = `
        <td>${user.profile?.fullName || 'N/A'}</td>
        <td>${user.email}</td>
        <td><span class="badge bg-${user.role === 'admin' ? 'success' : 'secondary'}">${user.role}</span></td>
        <td>${user.phoneNumber || 'N/A'}</td>
        
        <td>
          <select class="form-select form-select-sm" id="role-select-${user._id}" ${isCurrentUser ? 'disabled' : ''}>
            <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
        </td>
        
        <td>
          <button class="btn btn-sm btn-primary" onclick="updateUserRole('${user._id}')" ${isCurrentUser ? 'disabled' : ''}>
            Save
          </button>
        </td>
      `;
    });

  } catch (err) {
    console.error('Error loading users:', err);
  }
}

async function loadFeedback() {
  try {
    const res = await fetch('api/admin/feedback', {
      headers: { 'x-auth-token': token }
    });
    const feedbackList = await res.json();
    
    const tableBody = document.getElementById('feedbackTableBody');
    tableBody.innerHTML = ''; // Clear old data

    feedbackList.forEach(fb => {
      const row = tableBody.insertRow();
      
      // Get user email, default to 'N/A' if user was deleted
      const userEmail = fb.user ? fb.user.email : null;
      
      row.innerHTML = `
        <td>${fb.user?.profile?.fullName || fb.user?.email || 'Unknown'}</td>
        <td>${fb.subject}</td>
        <td>${fb.message}</td>
        <td><span class="badge bg-${fb.status === 'resolved' ? 'success' : (fb.status === 'in-progress' ? 'warning' : 'primary')}">${fb.status}</span></td>
        <td>${new Date(fb.createdAt).toLocaleString()}</td>
        
        <td>
          <select class="form-select form-select-sm" id="status-select-${fb._id}">
            <option value="new" ${fb.status === 'new' ? 'selected' : ''}>New</option>
            <option value="in-progress" ${fb.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
            <option value="resolved" ${fb.status === 'resolved' ? 'selected' : ''}>Resolved</option>
          </select>
        </td>
        
        <td>
          <button class="btn btn-sm btn-primary" onclick="updateFeedbackStatus('${fb._id}', '${userEmail}')">
            Save
          </button>
        </td>
      `;
    });

  } catch (err) {
    console.error('Error loading feedback:', err);
  }
}

/**
 * Updates a user's role via API call.
 * This is called by the 'Save' button in the users table.
 */
async function updateUserRole(userId) {
  const selectEl = document.getElementById(`role-select-${userId}`);
  const newRole = selectEl.value;
  
  try {
    const res = await fetch(`api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({ role: newRole })
    });

    if (!res.ok) throw new Error('Failed to update role');

    // Success! Reload the users table to show the change.
    alert('User role updated!');
    loadUsers();

  } catch (err) {
    console.error('Error updating user role:', err);
    alert('Error: Could not update user role.');
  }
}

/**
 * Updates a feedback item's status via API call.
 * This is called by the 'Save' button in the feedback table.
 */
async function saveFeedbackStatus(feedbackId) {
  const selectEl = document.getElementById(`status-select-${feedbackId}`);
  const newStatus = selectEl.value;

  try {
    const res = await fetch(`api/admin/feedback/${feedbackId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) throw new Error('Failed to update status');

    // Success! Reload the feedback table.
    alert('Feedback status updated!');
    loadFeedback();

  } catch (err) {
    console.error('Error updating feedback status:', err);
    alert('Error: Could not update feedback status.');
  }
}


// This is our NEW click handler
function updateFeedbackStatus(feedbackId, userEmail) {
  const selectEl = document.getElementById(`status-select-${feedbackId}`);
  const newStatus = selectEl.value;

  if (newStatus === 'resolved') {
    // --- User wants to RESOLVE ---
    if (!userEmail) {
      alert('Error: Cannot notify user. Email address is missing.');
      return;
    }
    
    // 1. Populate the modal
    document.getElementById('feedbackEmailFeedbackId').value = feedbackId;
    document.getElementById('feedbackEmailTo').value = userEmail;
    document.getElementById('feedbackEmailSubject').value = `Regarding your feedback`;
    document.getElementById('feedbackEmailMessage').value = `Hi,\n\nWe've reviewed your feedback and this issue is now resolved.\n\nThank you!\n- The SkillSwap Team`;

    // 2. Show the modal
    const emailModal = new bootstrap.Modal(document.getElementById('feedbackEmailModal'));
    emailModal.show();

  } else {
    // --- User just wants to save as 'new' or 'in-progress' ---
    saveFeedbackStatus(feedbackId); // Call the old function
  }
}



function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  window.location.href = 'newindex.html';
}