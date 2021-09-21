
function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
	return 'AssertException: ' + this.message;
};

function assert(exp, message) {
	if (!exp) {
		throw new AssertException(message);
	}
}

// Mean of booleans (true==1; false==0)
function boolpercent(arr) {
	var count = 0;
	for (var i=0; i<arr.length; i++) {
		if (arr[i]) { count++; } 
	}
	return 100* count / arr.length;
}

function generate_empty_grid(n, m) {
    var arr = Array(n).fill().map(() => Array(m).fill(0));
    return arr;
}

function fill_grid(scene, image, x, y) {
    var n = scene.length;
    var m = scene[0].length;

    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            if (i == x && j == y) {
                    scene[i].fill(image, j, j + 1);
            }
        }
    }

    return scene;
}

function factory_panel(grid, x, y) {
    var i = 0;

    for (const [key, value] of Object.entries(panel)) {
        grid = fill_grid(grid, value, x + Math.floor(i / 2), y + 1 - (i % 2 == 0));
        i++;
    }

	return grid;
}

// image paths for diff. types
var img_path = "../../static/images/"
var img_atoms = img_path + "atoms/"
var img_colors = img_path + "colors/"
var img_shapes = img_path + "shapes/"
var img_shapes_belt = img_path + "shapes/belt/"
var img_nums = img_path + "nums/"
var img_nums_belt = img_path + "nums/belt/"
var img_panel = img_path + "factory-panel/"

// assigning all images to objects
var belt = {
    empty: img_path + "belt.svg",
    guess: img_path + "guess-belt.svg"
};
var atoms = {
    add1: img_atoms + "add1.svg", 
    add2: img_atoms + "add2.svg",
    copy: img_atoms + "copy.svg", 
    circlefy: img_atoms + "circle-fy.svg", 
    squarefy: img_atoms + "square-fy.svg", 
    trianglefy: img_atoms + "triangle-fy.svg", 
    paint: img_atoms + "paint.svg"
};
var colors = {
    red: img_colors + "red.svg", 
    blue: img_colors + "blue.svg",
    yellow: img_colors + "yellow.svg"
};
var shapes = {
    circle: img_shapes + "circle/circle.svg", 
    triangle: img_shapes + "triangle/triangle.svg", 
    square: img_shapes + "square/square.svg"
};
var shapes_blue = {
    circle: img_shapes + "circle/circle-b.svg", 
    triangle: img_shapes + "triangle/triangle-b.svg", 
    square: img_shapes + "square/square-b.svg"
};
var shapes_yellow = {
    circle: img_shapes + "circle/circle-y.svg", 
    triangle: img_shapes + "triangle/triangle-y.svg",
    square: img_shapes + "square/square-y.svg"
};
var shapes_red = {
    circle: img_shapes + "circle/circle-r.svg", 
    triangle: img_shapes + "triangle/triangle-r.svg", 
    square: img_shapes + "square/square-r.svg"
};
var nums = {
    zero: img_nums + "0.svg",
    one: img_nums + "1.svg", 
    two: img_nums + "2.svg",
    three: img_nums + "3.svg",
    four: img_nums + "4.svg", 
    five: img_nums + "5.svg",
    six: img_nums + "6.svg", 
    seven: img_nums + "7.svg", 
    eight: img_nums + "8.svg", 
    nine: img_nums + "9.svg"
};

var shapes_belt = {
    circle: img_shapes_belt + "circle/circle.svg", 
    triangle: img_shapes_belt + "triangle/triangle.svg", 
    square: img_shapes_belt + "square/square.svg"
};
var shapes_blue_belt = {
    circle: img_shapes_belt + "circle/circle-b.svg", 
    triangle: img_shapes_belt + "triangle/triangle-b.svg", 
    square: img_shapes_belt + "square/square-b.svg"
};
var shapes_yellow_belt = {
    circle: img_shapes_belt + "circle/circle-y.svg", 
    triangle: img_shapes_belt + "triangle/triangle-y.svg",
    square: img_shapes_belt + "square/square-y.svg"
};
var shapes_red_belt = {
    circle: img_shapes_belt + "circle/circle-r.svg", 
    triangle: img_shapes_belt + "triangle/triangle-r.svg", 
    square: img_shapes_belt + "square/square-r.svg"
};
var nums_belt = {
    zero: img_nums_belt + "0.svg",
    one: img_nums_belt + "1.svg", 
    two: img_nums_belt + "2.svg",
    three: img_nums_belt + "3.svg",
    four: img_nums_belt + "4.svg", 
    five: img_nums_belt + "5.svg",
    six: img_nums_belt + "6.svg", 
    seven: img_nums_belt + "7.svg", 
    eight: img_nums_belt + "8.svg", 
    nine: img_nums_belt + "9.svg"
};

var panel = {
	title1: img_panel + "title1.png",
	title2: img_panel + "title2.png",
	add1: img_panel + "add1.png",
	add2: img_panel + "add2.png",
	copy1: img_panel + "copy1.png",
	copy2: img_panel + "copy2.png",
	paint1: img_panel + "paint1.png",
	paint2: img_panel + "paint2.png",
	circle1: img_panel + "circle1.png",
	circle2: img_panel + "circle2.png",
	triangle1: img_panel + "triangle1.png",
	triangle2: img_panel + "triangle2.png",
	square1: img_panel + "square1.png",
	square2: img_panel + "square2.png",
	end1: img_panel + "end1.png",
	end2: img_panel + "end2.png"
}