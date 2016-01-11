/**
 * Created by mario (https://github.com/hyprstack) on 10/08/15.
 */

module.exports = function(grunt) {

    var jsFileName =  'build/js/' + Date.now() + '.min.js';
    var cssFileName = Date.now() + '.css';

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            build: {
                src: [ '**' ],
                dest: 'build',
                expand: true
            }
        },

        uglify: {
            options: {
                mangle: {},
                compress: {
                    sequences: false
                }
            },
            app_lib: {
                files: [{
                    expand: false,
                    src: 'build/js/website.js',
                    dest: jsFileName
                }]
            }
        },

        processhtml: {
            dist: {
                files: [
                    {
                        'build/index.html': ['build/index.html']
                    }
                ]

            }
        },

        wiredep: {
            task: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.html']
                    }
                ]
            }
        },

        injector: {
        options: {
            template: 'index.html',
                addRootSlash: true,
                ignorePath: 'build'
        },
        local_dependencies: {
            files: {
                'build/index.html': ['build/js/*.min.js', 'build/css/*.css']
            }
        }
    },

    rename: {
        main: {
            files: [
                {
                    src: ['build/css/style.css'],
                    dest: 'build/css/' + cssFileName}
            ]
        }
    },

        watch: {
            files: ['bower_components/*'],
            tasks: ['wiredep']
        },

        clean: {
            afterBuild: [
                './build/js/*.js',
                '!./build/js/*.min.js',
                './build/bower.json',
                './build/Gruntfile.js',
                './build/package.json',
                './build/less',
                './build/npm-debug.log',
                './build/README.md',
                './build/hhg-editor-notes.md',
                './build/node_modules',
                './build/landing'
            ],

            beforeBuild: [
                './build'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-rename');


    // Custom task to concat all js files into onw single js file prior to minification

    grunt.registerTask("concatJs", "Concatenates all Js files into one file prior to minification.", function() {

        var glob = require("glob");
        var _ = require('underscore');

        var mainHtmlFiles = glob.sync('*.html');

        var srcs = [];
        var tmpSrcs = [];

        mainHtmlFiles.forEach(function (element) {

            var htmlFile = grunt.file.read(element);
            var getScriptTagsRegex = /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/g;
            var scriptTagsArray = htmlFile.match(getScriptTagsRegex);

            if(!scriptTagsArray) {
                return;
            }

            scriptTagsArray = scriptTagsArray[0];
            var srcAttrRegex = scriptTagsArray.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );

            if(!srcAttrRegex) {
                return;
            }

            tmpSrcs.push(srcAttrRegex);

        });
        // flatten our array of arrys tmpSrcs
        var flattenedTmpSrcs = tmpSrcs.reduce(function(a, b) {
            return a.concat(b);
        });

        // remove duplicate values in our array
        var uniq = _.unique(flattenedTmpSrcs);

        // iterate through all src attributes matched above and push them to the unique array
        uniq.forEach(function (element) {

            var targetResource = element.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[2];
            if (targetResource != "js/config.js") {
                srcs.push('build/' + targetResource);
            }
        });

        // add the new config file to the beginning of the srcs array
        srcs.unshift('build/js/config.js');

        // set the config for concat
        var concat = {
            'build/js/website.js': srcs
        };

        // save the new concat configuration
        grunt.config.set('concat', concat);

        // when finished run the concatinations
        grunt.task.run('concat');
    });

    // Custom task to create per environment config file
    grunt.registerTask('createConfigFile', 'Create per environment config file.', function(config) {
        grunt.file.defaultEncoding = 'utf8';
        var env = grunt.option('env') || 'dev';
        var configFile = grunt.file.read('js/config.js');

        var profilePicBaseUrl = {
            'dev': 'http://hevnly.dev/uploads/image/',
            'nightly': 'http://nightly.hevnly.com/uploads/image/',
            'beta': 'https://d2cyscqzuoxlax.cloudfront.net/',
            'prod': 'https://d2flxtrxean4fd.cloudfront.net/'
        }

        var appUrl = {
            'dev': 'http://hevnly.dev',
            'nightly': 'http://nightly.hevnly.com',
            'beta': 'http://beta.hevnly.com',
            'prod': 'https://hevnly.com'
        }

        var newConfig = configFile.replace("PROFILE_PIC_BASE_URL", profilePicBaseUrl[env]);
        newConfig = newConfig.replace("APP_URL", appUrl[env]);

        grunt.file.write('build/js/config.js', newConfig); // TODO: change back to config.js.dist here and in index.html file and rename file to add dist extension
    });

    // Default task(s).
    grunt.task.registerTask('default', ['clean:beforeBuild', 'copy', 'createConfigFile', 'rename', 'concatJs', 'uglify', 'injector', 'processhtml', 'clean:afterBuild']);
    grunt.task.registerTask('changes', ['watch']);

};
