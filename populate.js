///////////////////////////////////////////
// populate.json
//
// Main resume generation entry point. Does
// some cool stuff and junk :)
///////////////////////////////////////////
"use strict";


const fs = require('fs');
const path = require('path');

const { JSDOM } = require('jsdom');
const sass = require('node-sass');

const CONSTANTS = require('./config/constants.json');
const resume = require('./config/content.json');


class Resume {

    _compileSCSS() {
        // Compiles CSS from SCSS
        fs.writeFileSync(
            path.join(CONSTANTS.outDir, CONSTANTS.cssOutfile),
            sass.renderSync({
                file: CONSTANTS.scssInFile,
            }).css.toString()
        );
    }

    _buildHead() {
        $('head').append(
            $('<link>', {'rel': 'stylesheet', 'href': CONSTANTS.cssOutfile})
        );
    }

    _buildResumeHeader() {
        let header = $('header');
        let info = resume.header

        let name = $('<div>', {id: 'name'});
        name.append(info.name.toUpperCase());
                                                               
        let contact = $('<div>', {id: 'contact'});
        contact.append(info.phone.toUpperCase());
        contact.append(' ● ');
        contact.append(info.email.toUpperCase());
        contact.append(' ● ');
        contact.append(info.location.toUpperCase());
                                                               
        var github = $('<a href>');
        github.append(resume.header.github.toUpperCase());
        var personal = $('<a href>');
        personal.append(resume.header.personal.toUpperCase());

        var websites = $('<div>', {id: 'websites'});
        websites.append('GITHUB: ');
        websites.append(github);
        websites.append(' ● ');
        websites.append('PERSONAL: ');
        websites.append(personal);
        
        header.append(name);
        header.append(contact);
        header.append(websites);
    }

    _buildBody() {
        $('body').append($('<main>'))
        $('main').append($('<header>'))

        this._buildResumeHeader()
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
    }

    _writeHTMLOut() {
        // Write generated HTML to disk
        fs.writeFileSync(
            path.join(CONSTANTS.outDir, CONSTANTS.htmlOutfile),
            $('html').html(),
        );
    }

    build() {
        console.log('Building resume...');
        this._compileSCSS()
        this._buildHead()
        this._buildBody()
        this._writeHTMLOut()
        console.log('Build successful!');
    }

}


function build() {

    JSDOM.fromFile(CONSTANTS.htmlInFile, {}).then(dom => {
        global.$ = require('jquery')(dom.window);

        var resume = new Resume();
        resume.build()
    });

}

build();
