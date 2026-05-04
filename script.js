const icons = document.querySelectorAll(".logo");
const container = document.querySelector(".windows");
const desktopIcon = document.querySelectorAll(".desk_icon");
const clockElement = document.querySelector(".time");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;


desktopIcon.forEach(icon => {
    icon.addEventListener("dblclick", openWindow);
    // icon.style.top = (20 + index * 100) + "px";
    // icon.style.left = "20px";
    dragIcon(icon);

});

desktopIcon.forEach((icon, index) => {
    const startX = 20;
    const startY = 20;

    const gapY = 100;

    icon.style.left = startX + "px";
    icon.style.top = (startY + index * gapY) + "px";
});


function dragIcon(icon){
    let isDragging = false;
    let shiftX = 0;
    let shiftY = 0;

    icon.addEventListener("mousedown", (e) => {
        isDragging = true;

        const rect = icon.getBoundingClientRect();
        shiftX = e.clientX - rect.left;
        shiftY = e.clientY - rect.top;

        icon.style.position = "absolute";  // 🔥 important
        icon.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", (e) => {
        if(!isDragging) return;

        icon.style.left = (e.clientX - shiftX) + "px";
        icon.style.top = (e.clientY - shiftY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}


function openWindow(e) {
    const icon = e.currentTarget;
    if (!icon) return;
    
    console.log("Icon double-clicked:", icon.getAttribute("data-app"));
    const appName = icon.getAttribute("data-app");

    const windowDiv = document.createElement("div");
    windowDiv.classList.add("windows-container");

    windowDiv.innerHTML = `
        <div class="header">
                <div class="fileName">
                    <p>${appName}</p>
                </div>
            <div class="btns">
                <div class="red"></div>
                <div class="yellow"></div>
                <div class="green"></div>
            </div>
        </div>
        <div class="content">
            ${getAppContent(appName)}
        </div>
    `
    const openWindows = container.querySelectorAll(".windows-container");
    const offset = openWindows.length * 60;
    console.log("Number of open windows:", openWindows.length);

    windowDiv.style.left = (window.innerWidth / 2 - 200) + "px";
    windowDiv.style.top = (window.innerHeight / 2 - 150 + offset) + "px";
    windowDiv.style.zIndex = 100000; // 🔥 important

    container.appendChild(windowDiv);

    windowDiv.querySelector(".red").addEventListener("click", () => {
        windowDiv.remove();
    });


    
}

const dateElement = document.querySelector(".date");

function clock(){
    const now = new Date();
    let hrs = now.getHours();
    let mins = now.getMinutes();
    let secs = now.getSeconds();

    const amPm = hrs >= 12 ? "PM" : "AM"
    // console.log(hrs%12, mins, secs, amPm);
    hrs = hrs % 12 || 12; // Convert to 12-hour format and handle midnight
    mins = mins < 10 ? "0" + mins : mins; // Add leading zero
    secs = secs < 10 ? "0" + secs : secs; // Add leading zero

    const timeString = `${hrs}:${mins}:${secs} ${amPm}`;
    clockElement.textContent = timeString;
    if(dateElement) {
        const dateString = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        dateElement.textContent = dateString;
    }
    

}
setInterval(clock, 1000);



icons.forEach(icon => {
    icon.addEventListener("click", () => {
        console.log("Icon clicked:", icon.getAttribute("data-app"));
        const appName = icon.getAttribute("data-app");

        const windowDiv = document.createElement("div");
        windowDiv.classList.add("windows-container");

        windowDiv.innerHTML = `
            <div class="header">
                    <div class="fileName">
                        <p>${appName}</p>
                    </div>
                <div class="btns">
                    <div class="red"></div>
                    <div class="yellow"></div>
                    <div class="green"></div>
                </div>
            </div>
            <div class="content">
                ${getAppContent(appName)}
            </div>
        `
        const openWindows = container.querySelectorAll(".windows-container");
        const offset = openWindows.length * 60;
        console.log("Number of open windows:", openWindows.length);

        windowDiv.style.left = (window.innerWidth / 2 - 200) + "px";
        windowDiv.style.top = (window.innerHeight / 2 - 150 + offset) + "px";

        container.appendChild(windowDiv);

        windowDiv.querySelector(".red").addEventListener("click", () => {
            windowDiv.remove();
        });


    })
})


function getAppContent(appName) {
    switch(appName) {
        case "chrome":
            return `
                <iframe src="https://www.google.com" 
                        style="width:100%; height:100%; border:none;">
                </iframe>
            `;

        case "folder":
            return `
                <div style="padding:20px;">
                    <h3>My Files</h3>
                    <ul>
                        <li>Resume.pdf</li>
                        <li>Project.zip</li>
                        <li>Notes.txt</li>
                    </ul>
                </div>
            `;

        case "settings":
            return `
                <div class="settings-container">
                    
                    <!-- Sidebar -->
                    <div class="settings-sidebar">
                        <div class="profile">
                            <img src="https://i.avatar.cc/100" alt="user">
                            <h4>John Doe</h4>
                            <p>kasim@email.com</p>
                        </div>

                        <div class="menu">
                            <div class="menu-item active">Appearance</div>
                            <div class="menu-item">System</div>
                            <div class="menu-item">About</div>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="settings-content">
                        <h2>Appearance</h2>

                        <div class="setting-box">
                            <label>Theme</label>
                            <button class="theme-btn">Toggle Dark/Light</button>
                        </div>

                        <div class="setting-box">
                            <label>Brightness</label>
                            <input type="range" min="0" max="100" value="80">
                        </div>

                        <div class="setting-box">
                            <label>Background</label>
                            <button class="bg-btn">Change Wallpaper</button>
                        </div>

                    </div>

                </div>
            `;
        case "edge":
            return `<h2 style="padding:20px;">Edge Browser</h2>`;

        case "safari":
            return `<h2 style="padding:20px;">Safari Browser</h2>`;

        default:
            return `<p>App not found</p>`;
    }
}

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("theme-btn")){
        document.body.classList.toggle("dark-theme");
        console.log("Theme toggled");
    }
})

document.addEventListener("input",(e)=>{
    if(e.target.type === "range"){
        const brightnessValue = e.target.value;
        document.body.style.filter = `brightness(${brightnessValue}%)`;
    }
})

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("bg-btn")){
        document.body.style.backgroundImage = "url('https://picsum.photos/1920/1080')";
    }
});


const options = document.querySelector(".options");

// 👉 RIGHT CLICK (context menu)
document.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // default menu band

    options.style.display = "block";

    // 👉 position where mouse clicked
    options.style.left = e.clientX + "px";
    options.style.top = e.clientY + "px";
});

// 👉 LEFT CLICK anywhere → hide menu
document.addEventListener("click", () => {
    options.style.display = "none";
});

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("create")){
        const newFile = document.createElement("div");
        newFile.classList.add("desk_icon");
        newFile.setAttribute("data-app", "folder");
        newFile.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/715/715676.png" alt="folder">
            <p>New Folder</p>
        `;
        container.appendChild(newFile);
        dragIcon(newFile);
    }
})