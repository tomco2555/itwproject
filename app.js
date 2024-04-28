// Changes color of navbar item depending on the location on the page
// For example: Education is on top of the page then Education item in navbar will be colored to blue

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menuitem");

    function changeNavBg() {
        const headerHeight = document.querySelector('header').offsetHeight;
        let scrollY = window.scrollY + headerHeight;

        sections.forEach((section, index) => {
            const top = section.offsetTop - headerHeight;
            const bottom = top + section.offsetHeight;

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });
                navLinks[index].classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", changeNavBg);

    changeNavBg();
});

// Shows different content and changes css properties of the buttons
// By default 1st year is shown and that button is changed
// if we click on other button then other content will be shown and other button will change, previous one will return to the original state
document.addEventListener("DOMContentLoaded", function() {
    const yearButtons = document.querySelectorAll(".year-button");

    yearButtons.forEach(function(button) {
        button.addEventListener("click", function() {

            yearButtons.forEach(function(btn) {
                btn.classList.remove("active_btn");
            });

            button.classList.add("active_btn");

            const year = button.dataset.year;
            const yearSubjects = document.querySelectorAll(".year_subjects");
            console.log(yearSubjects);

            yearSubjects.forEach(function(subject) {
                subject.style.display = "none";
            });

            const currentYearSubject = document.querySelector(`#_${year}year_subjects`);
            currentYearSubject.style.display = "block";
            currentYearSubject.classList.add("fly_in");
        });
    });
});

// Function for scrolling to projects specific on the item chosen from dropdown menu
// It changes the content and active button in similar fashion then previous function
document.addEventListener("DOMContentLoaded", function() {
    const dropdownMenuItems = document.querySelectorAll(".dropdown-menu a");
    const yearButtons = document.querySelectorAll(".year-button");
    const yearSubjects = document.querySelectorAll(".year_subjects");

    // Function to handle clicking on dropdown menu items
    dropdownMenuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            const targetId = item.getAttribute("href").substring(1); // Get target section id
            const targetSection = document.getElementById(targetId); // Get target section
            console.log(targetSection);

            // Show the corresponding year subjects section
            yearSubjects.forEach(function(subject) {
                subject.style.display = "none";
            });
            document.getElementById(targetId + "_subjects").style.display = "block";

            // Change the active button in the navbar
            yearButtons.forEach(function(button) {
                button.classList.remove("active_btn");
            });
            document.querySelector(`[data-year="${targetId.substring(1, 2)}"]`).classList.add("active_btn");

            let scrollDistance;
            if (window.innerWidth > 768) {
                scrollDistance = targetSection.offsetTop - 250;
            } else {
                scrollDistance = targetSection.offsetTop - 350;
            }
            window.scrollTo({ top: scrollDistance, behavior: 'smooth' });
        });
    });
});

// Whole blog section
// When Read more... is pressed then it will make description bold, show full text and change display style to block so posts are under each other
// When i already have opened post and want to open another one it will then move it to the top
// When i close the post it will show me original layout with original order
// It autoscrolls to the top of the post and if all posts are closed then to the top of the section
document.addEventListener("DOMContentLoaded", function() {
    const readMoreButtons = document.querySelectorAll(".read_more");
    const posts = document.querySelectorAll(".post");
    const listBlogs = document.getElementById("list_blogs");
    const blogHeading = document.querySelector("#blog h2");
    let currentIndex = -1;
    let initialOrder = Array.from(posts);

    readMoreButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            const fullText = posts[index].querySelector(".full_text");
            const buttonText = button.textContent.trim();
            const description = posts[index].querySelector(".description");
            const postHeading = posts[index].querySelector("h3");

            if (buttonText === "Read more...") {
                if (currentIndex !== -1) {
                    // Close the currently expanded post
                    posts[currentIndex].querySelector(".full_text").style.display = "none";
                    readMoreButtons[currentIndex].textContent = "Read more...";
                }
                fullText.style.display = "block";
                description.classList.add("bold_text");
                listBlogs.style.display = "block";
                button.textContent = "Close";
                currentIndex = index;

                const firstPost = listBlogs.firstChild;
                if (firstPost !== posts[index]) {
                    listBlogs.insertBefore(posts[index], firstPost);
                }

                let scrollDistance;
                if (window.innerWidth > 768) {
                    scrollDistance = postHeading.offsetTop - 100;
                } else {
                    scrollDistance = postHeading.offsetTop - 200;
                }
                window.scrollTo({ top: scrollDistance, behavior: 'smooth' });
            } 
            
            else {
                fullText.style.display = "none";
                button.textContent = "Read more...";
                description.classList.remove("bold_text");
                listBlogs.style.display = "flex";
                currentIndex = -1;

                initialOrder.forEach(function(post) {
                    listBlogs.appendChild(post);
                });

                let scrollDistance;
                if (window.innerWidth > 768) {
                    scrollDistance = blogHeading.offsetTop;
                } else {
                    scrollDistance = blogHeading.offsetTop - 200;
                }
                window.scrollTo({ top: scrollDistance, behavior: 'smooth' });
            }

            posts.forEach(function(post, i) {
                if (i !== index) {
                    post.style.display = "block";
                    post.style.clear = "both";
                }
            });
        });
    });
});