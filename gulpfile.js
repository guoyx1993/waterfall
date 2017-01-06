var gulp = require('gulp');
var browserSync = require('browser-sync');

//建立browsersync任务。告知跟目录在哪里.
gulp.task('browserSync',function(){
    browserSync({
    	server:{
    		baseDir: 'demo'
    	}
    })
});
gulp.task('watch',['browserSync'],function(){
    gulp.watch('demo/*.html',browserSync.reload);
    gulp.watch('demo/js/**/*.js',browserSync.reload);
});