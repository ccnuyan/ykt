var _ = require('lodash');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var mongoose = require('mongoose');
var runSequence = require('run-sequence');

var conf = require('./api/config');

// Nodemon task
gulp.task('nodemon-api', function() {
  return nodemon({
    script: './api/server.js',
    args: ['--dev'],
    ext: 'js',
    watch: _.union('./api')
  }).on('restart', ['eslint']);
});

gulp.task('nodemon-network', function() {
  return nodemon({
    script: './network/server.js',
    args: ['--dev'],
    ext: 'js',
    watch: _.union('./network')
  }).on('restart', ['eslint']);
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('debug-api', function(done) {
  runSequence('eslint', 'nodemon-api', done);
});

gulp.task('debug-network', function(done) {
  runSequence('eslint', 'nodemon-network', done);
});
