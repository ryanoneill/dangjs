module.exports = function (grunt) {

	grunt.initConfig({
		pkg: "<json:package.json>",
		meta: {
			banner: '/* <%= pkg.title || pkg.name %> v<%= pkg.version %> - ' + 
			'<%= grunt.template.today("yyyy-mm-dd-hh-mm") %>\n' + 
			'<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n */'
		},
		concat: {
			dist: {
				src: ["<banner:meta.banner>",
				      "src/dangCircle.js",
				      "src/dangSvg.js",
				      "src/dangDirectives.js",
				      "src/dangApp.js"],
				dest: "bin/<%= pkg.name %>.js"
			}
		},
		min: {
			dist: {
				src: ["<config:concat.dist.dest>"],
				dest: "bin/<%= pkg.name %>.min.js"
			}
		}
	});

	grunt.registerTask("default", "concat min");
}