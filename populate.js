var fs = require('fs')
var jsdom = require('node-jsdom');
var sass = require('node-sass');
var path = require('path');

var outDir = 'out';
var cssOutfile = 'styles.css';
var scssFile = 'styles.scss';
var htmlOutfile = 'resume.html';
var jquerySrc  = 'http://code.jquery.com/jquery-1.5.min.js';


function checkErr(err) {
    if (err) {
        throw(err);
    }
}


function buildHeader(headerContent) {
    var header = $('header');

    var name = $('<div>', {id: 'name'});
    name.append(headerContent.name.toUpperCase());

    var contact = $('<div>', {id: 'contact'});
    contact.append(headerContent.phone.toUpperCase());
    contact.append(' ● ');
    contact.append(headerContent.email.toUpperCase());
    contact.append(' ● ');
    contact.append(headerContent.location.toUpperCase());

    var websites = $('<div>', {id: 'websites'});
    var github = $('<a href>');
    github.append(headerContent.github.toUpperCase());
    var personal = $('<a href>');
    personal.append(headerContent.personal.toUpperCase());
    
    header.append(name);
    header.append(contact);
    header.append(websites);

    websites.append('GITHUB: ');
    websites.append(github);
    websites.append(' ● ');
    websites.append('PERSONAL: ');
    websites.append(personal);
}


function buildResume(content) {
    $('head').append(
        $('<link>', {'rel': 'stylesheet', 'href': cssOutfile})
    );
    $('body').append('<main></main>');
    $('main').append('<header></header>');

    buildHeader(content.header);
    $('main').append('<div class="infobox"></div>');

    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');

    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');

    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');

    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');
    $('main').append('<div class="infobox"></div>');

    return '<html>' + $('html').html() + '</html>';
}


function build() {
    jsdom.env('', [jquerySrc], function (err, window) {
        checkErr(err);

        global.$ = window.$;

        var css = sass.renderSync({
            file: scssFile,
        }).css.toString();
        fs.writeFileSync(path.join(outDir, cssOutfile), css);

        var content = require('./content.json');

        var html = buildResume(content);
        fs.writeFileSync(path.join(outDir, htmlOutfile), html);
        console.log('Build successful');
    });
}

build();
