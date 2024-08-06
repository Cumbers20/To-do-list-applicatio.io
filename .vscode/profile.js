document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const createProfileBtn = document.getElementById('create-profile-btn');
    const loginBtn = document.getElementById('login-btn');
    const googleSignInStatus = document.getElementById('google-signin-status');

    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = 'index.html'; // Redirect to the main page if logged in
    }

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const firstName = document.getElementById('first-name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (email && firstName && phone) {
            const user = {
                email,
                firstName,
                phone
            };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Profile created successfully!');
            window.location.href = 'index.html'; // Redirect to the main page after creating profile
        } else {
            alert('Please fill in all fields.');
        }
    });

    loginBtn.addEventListener('click', function() {
        const email = document.getElementById('email').value.trim();
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.email === email) {
            window.location.href = 'index.html'; // Redirect to the main page if email matches
        } else {
            alert('Invalid email or no profile found. Please create a profile.');
        }
    });

    window.onSignIn = function(googleUser) {
        const profile = googleUser.getBasicProfile();
        const user = {
            email: profile.getEmail(),
            firstName: profile.getGivenName(),
            phone: '' // Phone number is not available from Google Sign-In
        };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'index.html'; // Redirect to the main page after successful Google Sign-In
    };

    window.onSignOut = function() {
        gapi.auth2.getAuthInstance().signOut();
        localStorage.removeItem('user');
        window.location.href = 'profile.html'; // Redirect to profile page on sign-out
    };
});
