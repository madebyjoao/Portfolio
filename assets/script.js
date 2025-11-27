const projects = [
    {
        title: "Coming Soon",
        desc: "Exciting projects are currently in development. Check back soon to see what I've been working on!",
        tags: ["In Progress", "Stay Tuned"],
        imgs: [
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
        ],
        live: "",
        github: "#"
    },
    {
        title: "Coming Soon 2",
        desc: "Exciting projects are currently in development. Check back soon to see what I've been working on!",
        tags: ["In Progress", "Stay Tuned"],
        imgs: [
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
        ],
        live: "",
        github: "#"
    },
    {
        title: "Coming Soon 3",
        desc: "Exciting projects are currently in development. Check back soon to see what I've been working on!",
        tags: ["In Progress", "Stay Tuned"],
        imgs: [
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
            "assets/images/placeholder.png",
        ],
        live: "",
        github: "#"
    }
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

function showProject(i) {
    currentProjectIndex = i;
    currentImageIndex = 0;

    const p = projects[currentProjectIndex];

    const titleEl = document.getElementById("projectTitle");
    const descEl = document.getElementById("projectDesc");
    const tagsEl = document.getElementById("projectTags");
    const liveEl = document.getElementById("liveLink");
    const gitEl = document.getElementById("gitLink");

    titleEl.textContent = p.title;
    descEl.textContent = p.desc;

    tagsEl.innerHTML = p.tags.map(t => `<span>${t}</span>`).join("");

    if (p.live) {
        liveEl.style.display = "inline-block";
        liveEl.href = p.live;
    } else {
        liveEl.style.display = "none";
        liveEl.removeAttribute("href");
    }

    gitEl.href = p.github;

    showImage();
}

function showImage() {
    const p = projects[currentProjectIndex];
    const total = p.imgs.length;

    const imgEl = document.getElementById("projectImage");
    const counterEl = document.getElementById("imgCounter");
    const prevImgBtn = document.getElementById("prevImg");
    const nextImgBtn = document.getElementById("nextImg");

    imgEl.src = p.imgs[currentImageIndex];
    imgEl.alt = `${p.title} screenshot ${currentImageIndex + 1}`;

    counterEl.textContent = `${currentImageIndex + 1} / ${total}`;


    if (total <= 1) {
        prevImgBtn.style.display = "none";
        nextImgBtn.style.display = "none";
    } else {
        prevImgBtn.style.display = "block";
        nextImgBtn.style.display = "block";
    }
}

function openProjectModal() {
    if (document.getElementById("projectModal")) return;

    const modalHTML = `
        <div id="projectModal" class="project-modal active">
            <div class="modal-content">
                <span id="closeModalBtn" class="close-btn">&times;</span>

                <div class="modal-image-wrap">
                    <button id="prevImg" class="img-nav">←</button>
                    <img id="projectImage" src="" alt="">
                    <button id="nextImg" class="img-nav">→</button>
                </div>

                <p id="imgCounter" class="img-counter"></p>

                <h2 id="projectTitle"></h2>
                <p id="projectDesc"></p>

                <div class="tags" id="projectTags"></div>

                <div class="modal-links">
                    <a id="liveLink" href="#" target="_blank">Live Demo</a>
                    <a id="gitLink" href="#" target="_blank">GitHub</a>
                </div>

                <div class="modal-nav">
                    <button id="prevProject">← Prev</button>
                    <button id="nextProject">Next →</button>
                    <button id="closeModal">Exit</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);


    document.getElementById("closeModalBtn").addEventListener("click", closeModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);


    document.getElementById("nextProject").addEventListener("click", () => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        showProject(currentProjectIndex);
    });

    document.getElementById("prevProject").addEventListener("click", () => {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        showProject(currentProjectIndex);
    });

    
    document.getElementById("nextImg").addEventListener("click", () => {
        const total = projects[currentProjectIndex].imgs.length;
        currentImageIndex = (currentImageIndex + 1) % total;
        showImage();
    });

    document.getElementById("prevImg").addEventListener("click", () => {
        const total = projects[currentProjectIndex].imgs.length;
        currentImageIndex = (currentImageIndex - 1 + total) % total;
        showImage();
    });

    
    showProject(currentProjectIndex);
}

function closeModal() {
    const modal = document.getElementById("projectModal");
    if (modal) modal.remove();
}
