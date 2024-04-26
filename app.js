document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menuitem");

    function changeNavBg() {
        const headerHeight = document.querySelector('header').offsetHeight;
        console.log(headerHeight)
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