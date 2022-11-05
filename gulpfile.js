const gulp = require("gulp");
const fileinclude = require("gulp-file-include"); // модульный html
// const stylus = require('gulp-stylus'); // преобразует из .styl в .css
const sass = require("gulp-sass")(require("sass")); // преобразует из .sass и .scss в .css
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer"); // добавляет автопрефиксы, настройки указаны в browserslist в package.json
const pcmq = require("postcss-combine-media-query"); // сливает одинаковые медиазапросы в один
const psmq = require("postcss-sort-media-queries"); // сортирует медиазапросы
const csso = require("postcss-csso"); // сжатие css файлов
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const spritesmith = require("gulp.spritesmith"); // спрайты для картинок
// const svgSprite = require("gulp-svg-sprite"); // спрайты для svg

const htmlmin = require("gulp-htmlmin"); // сжатие html файлов
// const strip = require('gulp-strip-comments'); // удаляет комментарии
const csscomb = require("gulp-csscomb"); // расставляет свойства по порядку

const imagemin = require("gulp-imagemin");

let workDir = "./";
let preprocessorCss = "scss";

const path = {
	app: {
		js: workDir + "app/js/*.js",
		blocksJs: workDir + "app/blocks/**/*.js",
		style: workDir + "app/styles/*." + preprocessorCss,
		img: workDir + "app/img/**/*.*",
		html: workDir + "app/html/*.html",
	},
	dist: {
		js: workDir + "dist/js/",
		css: workDir + "dist/css/",
		img: workDir + "dist/img/",
		html: workDir + "dist/",
	},
	watch: {
		js: workDir + "app/js/*.js",
		style: workDir + "app/styles/**/*." + preprocessorCss,
		img: workDir + "app/img/**/*.*",
		html: workDir + "app/html/**/*.html",
		blocksHtml: workDir + "app/blocks/**/*.html",
		blocksStyle: workDir + "app/blocks/**/*." + preprocessorCss,
		blocksJs: workDir + "app/blocks/**/*.js",
	},
};

function sprite() {
	return gulp
		.src("app/sprite/img/*.png")
		.pipe(
			spritesmith({
				imgName: "sprite.png",
				cssName: "sprite.css",
				padding: 10,
			})
		)
		.pipe(gulp.dest("app/sprite/output/"));
}
gulp.task(sprite);

// function svgsprite() {
// 	let config = {
// 		shape: {
// 			dimension: {
// 				maxWidth: 500,
// 				maxHeight: 500,
// 			},
// 			spacing: {
// 				padding: 0,
// 			},
// 			transform: [
// 				{
// 					svgo: {
// 						plugins: [{ removeViewBox: false }, { removeUnusedNS: false }, { removeUselessStrokeAndFill: true }, { cleanupIDs: false }, { removeComments: true }, { removeEmptyAttrs: true }, { removeEmptyText: true }, { collapseGroups: true }, { removeAttrs: { attrs: "(fill|stroke|style)" } }],
// 					},
// 				},
// 			],
// 		},
// 		mode: {
// 			symbol: {
// 				dest: ".",
// 				sprite: "sprite.svg",
// 			},
// 		},
// 	};

// 	return gulp
// 		.src("app/sprite/svg/*.svg")
// 		.pipe(svgSprite(config))
// 		.on("error", function (error) {
// 			console.log(error);
// 		})
// 		.pipe(gulp.dest("app/sprite/svgOutput/"));
// }
// gulp.task(svgsprite);

function html() {
	return gulp
		.src(path.app.html)
		.pipe(
			fileinclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(gulp.dest(path.dist.html))
		.pipe(browserSync.stream());
}
gulp.task(html);

function htmlProd() {
	return gulp
		.src("dist/*.html")
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(gulp.dest(path.dist.html));
}
gulp.task(htmlProd);

function css() {
	const plugins = [
		autoprefixer({
			cascade: false,
		}),
		pcmq(),
		psmq({
			sort: "desktop-first",
		}),
	];

	return gulp.src(["node_modules/normalize.css/normalize.css", path.app.style]).pipe(sourcemaps.init()).pipe(sass()).pipe(postcss(plugins)).pipe(concat("style.css")).pipe(sourcemaps.write()).pipe(gulp.dest(path.dist.css)).pipe(browserSync.stream());
}
gulp.task(css);

function cssProd() {
	const plugins = [csso()];

	return gulp.src(["dist/css/style.css"]).pipe(csscomb()).pipe(postcss(plugins)).pipe(concat("style.css")).pipe(gulp.dest(path.dist.css));
}
gulp.task(cssProd);

function js() {
	return gulp.src([path.app.js, path.app.blocksJs]).pipe(sourcemaps.init()).pipe(concat("script.js")).pipe(sourcemaps.write()).pipe(gulp.dest(path.dist.js)).pipe(browserSync.stream());
}
gulp.task(js);

function jsProd() {
	return gulp
		.src("dist/js/*.js")
		.pipe(uglify({ mangle: { toplevel: true } }))
		.pipe(gulp.dest(path.dist.js));
}
gulp.task(jsProd);

function img() {
	return gulp.src(path.app.img).pipe(imagemin()).pipe(gulp.dest(path.dist.img));
}
gulp.task(img);

function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.style, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, img);
	gulp.watch(path.watch.blocksHtml, html);
	gulp.watch(path.watch.blocksStyle, css);
	gulp.watch(path.watch.blocksJs, js);
}

function sync() {
	browserSync.init({
		server: {
			baseDir: path.dist.html,
		},
		port: 8080,
	});
}

const dev = gulp.series(html, css, img, js, gulp.parallel(watcher, sync));
const prod = gulp.series(htmlProd, cssProd, img, jsProd);

gulp.task("default", dev);
gulp.task("prod", prod);
