// ========================
//       GALLERY
// ========================
const gallery = document.getElementById("gallery");
const userGallery = document.getElementById("userGallery");

function loadArt() {
    const arts = JSON.parse(localStorage.getItem("pixdib_arts") || "[]");

    if (gallery) {
        gallery.innerHTML = "";
        arts.forEach((a, i) => {
            gallery.innerHTML += `
                <div>
                    <img src="${a.img}">
                    <button onclick="like(${i})">⭐ ${a.likes}</button>
                </div>`;
        });
    }

    if (userGallery) {
        userGallery.innerHTML = "";
        arts.filter(a => a.user === "yo").forEach(a => {
            userGallery.innerHTML += `<img src="${a.img}">`;
        });
    }
}

loadArt();

// ========================
//       LIKES
// ========================
function like(i) {
    const arts = JSON.parse(localStorage.getItem("pixdib_arts"));
    arts[i].likes++;
    localStorage.setItem("pixdib_arts", JSON.stringify(arts));
    loadArt();
}

// ========================
//       EDITOR
// ========================
const canvas = document.getElementById("canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let color = "#000";
    let painting = false;
    let frames = [];
    let currentFrame = 0;

    document.getElementById("colorPicker").onchange = e => color = e.target.value;

    canvas.onmousedown = () => painting = true;
    canvas.onmouseup = () => painting = false;
    canvas.onmousemove = draw;

    function draw(e) {
        if (!painting) return;
        let rect = canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - rect.left) / 8) * 8;
        let y = Math.floor((e.clientY - rect.top) / 8) * 8;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 8, 8);
    }

    document.getElementById("clearBtn").onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    document.getElementById("saveBtn").onclick = () => {
        const arts = JSON.parse(localStorage.getItem("pixdib_arts") || "[]");
        arts.push({
            user: "yo",
            img: canvas.toDataURL(),
            likes: 0
        });
        localStorage.setItem("pixdib_arts", JSON.stringify(arts));
        alert("Dibujo publicado!");
    };
}
