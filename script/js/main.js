/* ===== MENU SHOW ===== */ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}
showMenu('nav-toggle', 'nav-menu');

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction() {
    /* Active link */
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');
  
    /* Remove menu mobile */
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/* SCROLL HOME */
sr.reveal('.home__title', {}); 
sr.reveal('.button', { delay: 200 }); 
sr.reveal('.home__img', { delay: 400 }); 
sr.reveal('.home__social-icon', { interval: 200 }); 

/* SCROLL ABOUT */
sr.reveal('.about__img', {}); 
sr.reveal('.about__subtitle', { delay: 400 }); 
sr.reveal('.about__text', { delay: 400 }); 

/* SCROLL SKILLS */
sr.reveal('.skills__subtitle', {}); 
sr.reveal('.skills__text', {}); 
sr.reveal('.skills__data', { interval: 200 }); 
sr.reveal('.skills__img', { delay: 600 });

/* SCROLL PROJECTS */
sr.reveal('.projects__data', { interval: 200 }); 

/* SCROLL EDUCATION */
sr.reveal('.education__data', { interval: 200 }); 

/* SCROLL EXPERIENCE */
sr.reveal('.experience__data', { interval: 200 }); /* Add animation for each experience data entry */

/* SCROLL CONTACT */
sr.reveal('.contact__input', { interval: 200 });

const titles = ["Software Engineer", "Web Developer", "Data Scientist", "UI/UX Designer", "Machine Learning Engineer"];
const jobTitleElement = document.getElementById("job-title");
let index = 0;

function changeTitle() {
    // Fade out the current title
    jobTitleElement.classList.remove("fade-in");
    
    setTimeout(() => {
        // Update the title
        jobTitleElement.textContent = titles[index];
        index = (index + 1) % titles.length; // Move to the next title, loop back to the first one if at the end
        
        // Fade in the new title
        jobTitleElement.classList.add("fade-in");
    }, 500); // Wait for the fade-out transition before changing the text
}

// Change title every 2 seconds
setInterval(changeTitle, 2000);

// Initial fade-in for the first title
changeTitle();
