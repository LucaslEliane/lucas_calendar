首先建立两个文件夹:
dist:为生产环境，用来正式发布
src :为开发环境，在开发环境中写代码

复制三个文件到环境根目录：
.jshintrc		: jshint插件的配置文件
gulpfile.js		: gulp的配置文件
package.json		: gulp的支持插件内容

WIN+R运行windows控制台，切换到当前的环境根目录，
局部安装Gulpjs：
npm install gulp --save-dev

安装bootstrap和angularjs的前端依赖
bower install angularjs bootstrap --save

安装gulp插件：
npm install --save-dev autoprefixer browser-sync core-util-is 
del gulp gulp-bower gulp-cache gulp-csso gulp-filter gulp-flatten 
gulp-if gulp-imagemin gulp-jshint gulp-less gulp-load-plugins gulp-minify-css 
gulp-minify-html gulp-postcss gulp-size gulp-uglify gulp-usemin 
gulp-usemin2 gulp-useref inherits isarray jshint main-bower-files 
postcss wrapper jshint-stylish


cmd切换到项目根目录，运行gulp serve命令，浏览器刷新可以使网页刷新，默认端口9000