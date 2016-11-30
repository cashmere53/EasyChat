'use strict'

var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var uglify = require('gulp-uglify')
var del = require('del')

var path = {
    dist: './output/',
    src: './view/'
}

gulp.task('default', () => {

})

gulp.task('uglify', () => {
    console.log('--- uglify ---')
    gulp.src(path['src'] + '*.js')
        .pipe(uglify({
            'preserveComments': 'some'
        }))
        .pipe(gulp.dest(path['dist']))
})

gulp.task('watch', () => {
    var w_uglify = gulp.watch(path['src'] + '*.js', ['uglify'])

    w_uglify.on('change', (event) => {
        console.log('javascript File ' + event.path + ' was ' + event.type + ', running task uglify...')
    })
})