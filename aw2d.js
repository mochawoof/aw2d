document.body.style.overflow = "hidden";
document.body.style.margin = "0";

const canvas = document.querySelector("#canvas");

canvas.style.imageRendering = "pixelated";

const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 600;

let aspect;

let origin_x;
let origin_y;

let real_width;
let real_height;

function resize_canvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function width(fake_width) {
    return Math.round(fake_width * (real_width / WIDTH));
}

function height(fake_height) {
    return Math.round(fake_height * (real_height / HEIGHT));
}

function x(fake_x) {
    return origin_x + fake_x;
}

function y(fake_y) {
    return origin_y + fake_y;
}

let on_draw;

function draw() {
    resize_canvas();

    aspect = WIDTH / HEIGHT;

    origin_x = 0;
    origin_y = 0;

    real_width = canvas.width;
    real_height = canvas.height;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Handle aspect ratio

    if (canvas.width > canvas.height && canvas.width > (real_height * aspect)) {
        // Shrink width
        real_width = Math.round(real_height * aspect);
        origin_x = Math.round((canvas.width / 2) - (real_width / 2));
    } else {
        // Shrink height
        real_height = Math.round(real_width / aspect);
        origin_y = Math.round((canvas.height / 2) - (real_height / 2));
    }

    // CALLBACK
    on_draw();

    requestAnimationFrame(draw);
}

// Initialize with on_draw callback
function init(cb) {
    on_draw = cb;
    draw();
}