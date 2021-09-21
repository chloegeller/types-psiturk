function generate_empty_grid(n, m) {
    var arr = Array(n).fill().map(() => Array(m).fill(0));
    return arr;
}

function fill_grid(scene, image, x, y) {
    var n = scene.length;
    var m = scene[0].length;

    for (i = 0; i < n; i++) {
        if (i == x) {
            for (j = 0; j < m; j++) {
                if (j == y) {
                        scene[i].fill(image, j, j + 1);
                }
            }
        }
    }

    return scene;
}

// image paths for diff. types
var img_path = "../../static/images/"
var img_atoms = img_path + "atoms/"
var img_colors = img_path + "colors/"
var img_shapes = img_path + "shapes/"
var img_shapes_belt = img_path + "shapes/belt/"
var img_nums = img_path + "nums/"
var img_nums_belt = img_path + "nums/belt/"

// assigning all images to objects
var belt = {
    empty: img_path + "belt.png",
    guess: img_path + "guess-belt.png"
};
var atoms = {
    add1: img_atoms + "add1.png", 
    add2: img_atoms + "add2.png",
    copy: img_atoms + "copy.png", 
    circlefy: img_atoms + "circle-fy.png", 
    squarefy: img_atoms + "square-fy.png", 
    trianglefy: img_atoms + "triangle-fy.png", 
    paint: img_atoms + "paint.png"
};
var colors = {
    red: img_colors + "red.png", 
    blue: img_colors + "blue.png",
    yellow: img_colors + "yellow.png"
};
var shapes = {
    circle: img_shapes + "circle/circle.png", 
    triangle: img_shapes + "triangle/triangle.png", 
    square: img_shapes + "square/square.png"
};
var shapes_blue = {
    circle: img_shapes + "circle/circle-b.png", 
    triangle: img_shapes + "triangle/triangle-b.png", 
    square: img_shapes + "square/square-b.png"
};
var shapes_yellow = {
    circle: img_shapes + "circle/circle-y.png", 
    triangle: img_shapes + "triangle/triangle-y.png",
    square: img_shapes + "square/square-y.png"
};
var shapes_red = {
    circle: img_shapes + "circle/circle-r.png", 
    triangle: img_shapes + "triangle/triangle-r.png", 
    square: img_shapes + "square/square-r.png"
};
var nums = {
    zero: img_nums + "0.png",
    one: img_nums + "1.png", 
    two: img_nums + "2.png",
    three: img_nums + "3.png",
    four: img_nums + "4.png", 
    five: img_nums + "5.png",
    six: img_nums + "6.png", 
    seven: img_nums + "7.png", 
    eight: img_nums + "8.png", 
    nine: img_nums + "9.png"
};

var shapes_belt = {
    circle: img_shapes_belt + "circle/circle.png", 
    triangle: img_shapes_belt + "triangle/triangle.png", 
    square: img_shapes_belt + "square/square.png"
};
var shapes_blue_belt = {
    circle: img_shapes_belt + "circle/circle-b.png", 
    triangle: img_shapes_belt + "triangle/triangle-b.png", 
    square: img_shapes_belt + "square/square-b.png"
};
var shapes_yellow_belt = {
    circle: img_shapes_belt + "circle/circle-y.png", 
    triangle: img_shapes_belt + "triangle/triangle-y.png",
    square: img_shapes_belt + "square/square-y.png"
};
var shapes_red_belt = {
    circle: img_shapes_belt + "circle/circle-r.png", 
    triangle: img_shapes_belt + "triangle/triangle-r.png", 
    square: img_shapes_belt + "square/square-r.png"
};
var nums_belt = {
    zero: img_nums_belt + "0.png",
    one: img_nums_belt + "1.png", 
    two: img_nums_belt + "2.png",
    three: img_nums_belt + "3.png",
    four: img_nums_belt + "4.png", 
    five: img_nums_belt + "5.png",
    six: img_nums_belt + "6.png", 
    seven: img_nums_belt + "7.png", 
    eight: img_nums_belt + "8.png", 
    nine: img_nums_belt + "9.png"
};

// idk how to get this to work tbh
// function get_images(img_ls, w, h) {

//     // var imgs = document.images;

//     for(var i = 0; i <= img_ls.length; i++) {
//         var imgs = new Image(w, h);

//         imgs.src = img_ls[i];

//         document.body.appendChild(imgs);
//     }

//     return imgs;
// }
