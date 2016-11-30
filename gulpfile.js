'use strict'

var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var del = require('del')

var path = {
    dist: './output/',
    src: './view/'
}

gulp.task('default', ['watch'])

gulp.task('pug', () => {
    console.log('--- pug ---')
    gulp.src(path['src'] + '*.pug')
        .pipe(plumber({
            'errorHandler': notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug({
            'pretty': true
        }))
        .pipe(gulp.dest(path['dist']))
})

gulp.task('stylus', () => {
    console.log('--- stylus ---')
    gulp.src(path['src'] + '*.styl')
        .pipe(plumber({
            'errorHandler': notify.onError("Error: <%= error.message %>")
        }))
        .pipe(stylus({
            'compress': true
        }))
        .pipe(gulp.dest(path['dist']))
})

gulp.task('uglify', () => {
    console.log('--- uglify ---')
    gulp.src(path['src'] + '*.js')
        .pipe(plumber({
            'errorHandler': notify.onError("Error: <%= error.message %>")
        }))
        .pipe(uglify({
            'preserveComments': 'some'
        }))
        .pipe(gulp.dest(path['dist']))
})

gulp.task('watch', () => {
    console.log('start watching.')

    var w_pug = gulp.watch(path['src'] + '.pug', ['pug'])
    var w_stylus = gulp.watch(path['src'] + '*.styl', ['stylus'])
    var w_uglify = gulp.watch(path['src'] + '*.js', ['uglify'])

    w_pug.on('change', (event) => {
        console.log('pug File ' + event.path + ' was ' + event.type + ', running task uglify...')
    })
    w_stylus.on('change', (event) => {
        console.log('stylus File ' + event.path + ' was ' + event.type + ', running task uglify...')
    })
    w_uglify.on('change', (event) => {
        console.log('javascript File ' + event.path + ' was ' + event.type + ', running task uglify...')
    })
})