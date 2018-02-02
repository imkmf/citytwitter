/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ejs_1 = __webpack_require__(2);
var fs_1 = __webpack_require__(0);
var template_1 = __webpack_require__(6);
var compileHtml = function (city) { return ejs_1.render(template_1.default, city); };
var parseFile = function (filename, callback) {
    return new Promise(function (resolve, reject) {
        fs_1.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                var obj = JSON.parse(data);
                var validated = obj;
                resolve(callback(validated));
            }
        });
    });
};
parseFile('examples/losangeles-short.json', compileHtml)
    .then(function (html) { return console.log(html); })
    .catch(function (err) { throw err; });


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fs = __webpack_require__(0);
var path = __webpack_require__(3);
var utils = __webpack_require__(4);
var scopeOptionWarned = false;
var _VERSION_STRING = __webpack_require__(5).version;
var _DEFAULT_DELIMITER = '%';
var _DEFAULT_LOCALS_NAME = 'locals';
var _NAME = 'ejs';
var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
var _OPTS = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
    'client', '_with', 'rmWhitespace', 'strict', 'filename'];
var _OPTS_EXPRESS = _OPTS.concat('cache');
var _BOM = /^\uFEFF/;
exports.cache = utils.cache;
exports.fileLoader = fs.readFileSync;
exports.localsName = _DEFAULT_LOCALS_NAME;
exports.resolveInclude = function (name, filename, isDir) {
    var dirname = path.dirname;
    var extname = path.extname;
    var resolve = path.resolve;
    var includePath = resolve(isDir ? filename : dirname(filename), name);
    var ext = extname(name);
    if (!ext) {
        includePath += '.ejs';
    }
    return includePath;
};
function getIncludePath(path, options) {
    var includePath;
    var filePath;
    var views = options.views;
    if (path.charAt(0) == '/') {
        includePath = exports.resolveInclude(path.replace(/^\/*/, ''), options.root || '/', true);
    }
    else {
        if (options.filename) {
            filePath = exports.resolveInclude(path, options.filename);
            if (fs.existsSync(filePath)) {
                includePath = filePath;
            }
        }
        if (!includePath) {
            if (Array.isArray(views) && views.some(function (v) {
                filePath = exports.resolveInclude(path, v, true);
                return fs.existsSync(filePath);
            })) {
                includePath = filePath;
            }
        }
        if (!includePath) {
            throw new Error('Could not find include include file.');
        }
    }
    return includePath;
}
function handleCache(options, template) {
    var func;
    var filename = options.filename;
    var hasTemplate = arguments.length > 1;
    if (options.cache) {
        if (!filename) {
            throw new Error('cache option requires a filename');
        }
        func = exports.cache.get(filename);
        if (func) {
            return func;
        }
        if (!hasTemplate) {
            template = fileLoader(filename).toString().replace(_BOM, '');
        }
    }
    else if (!hasTemplate) {
        if (!filename) {
            throw new Error('Internal EJS error: no file name or template '
                + 'provided');
        }
        template = fileLoader(filename).toString().replace(_BOM, '');
    }
    func = exports.compile(template, options);
    if (options.cache) {
        exports.cache.set(filename, func);
    }
    return func;
}
function tryHandleCache(options, data, cb) {
    var result;
    try {
        result = handleCache(options)(data);
    }
    catch (err) {
        return cb(err);
    }
    return cb(null, result);
}
function fileLoader(filePath) {
    return exports.fileLoader(filePath);
}
function includeFile(path, options) {
    var opts = utils.shallowCopy({}, options);
    opts.filename = getIncludePath(path, opts);
    return handleCache(opts);
}
function includeSource(path, options) {
    var opts = utils.shallowCopy({}, options);
    var includePath;
    var template;
    includePath = getIncludePath(path, opts);
    template = fileLoader(includePath).toString().replace(_BOM, '');
    opts.filename = includePath;
    var templ = new Template(template, opts);
    templ.generateSource();
    return {
        source: templ.source,
        filename: includePath,
        template: template
    };
}
function rethrow(err, str, flnm, lineno, esc) {
    var lines = str.split('\n');
    var start = Math.max(lineno - 3, 0);
    var end = Math.min(lines.length, lineno + 3);
    var filename = esc(flnm);
    var context = lines.slice(start, end).map(function (line, i) {
        var curr = i + start + 1;
        return (curr == lineno ? ' >> ' : '    ')
            + curr
            + '| '
            + line;
    }).join('\n');
    err.path = filename;
    err.message = (filename || 'ejs') + ':'
        + lineno + '\n'
        + context + '\n\n'
        + err.message;
    throw err;
}
function stripSemi(str) {
    return str.replace(/;(\s*$)/, '$1');
}
exports.compile = function compile(template, opts) {
    var templ;
    if (opts && opts.scope) {
        if (!scopeOptionWarned) {
            console.warn('`scope` option is deprecated and will be removed in EJS 3');
            scopeOptionWarned = true;
        }
        if (!opts.context) {
            opts.context = opts.scope;
        }
        delete opts.scope;
    }
    templ = new Template(template, opts);
    return templ.compile();
};
exports.render = function (template, d, o) {
    var data = d || {};
    var opts = o || {};
    if (arguments.length == 2) {
        utils.shallowCopyFromList(opts, data, _OPTS);
    }
    return handleCache(opts, template)(data);
};
exports.renderFile = function () {
    var filename = arguments[0];
    var cb = arguments[arguments.length - 1];
    var opts = { filename: filename };
    var data;
    if (arguments.length > 2) {
        data = arguments[1];
        if (arguments.length === 3) {
            if (data.settings) {
                if (data.settings['view options']) {
                    utils.shallowCopyFromList(opts, data.settings['view options'], _OPTS_EXPRESS);
                }
                if (data.settings.views) {
                    opts.views = data.settings.views;
                }
            }
            else {
                utils.shallowCopyFromList(opts, data, _OPTS_EXPRESS);
            }
        }
        else {
            utils.shallowCopy(opts, arguments[2]);
        }
        opts.filename = filename;
    }
    else {
        data = {};
    }
    return tryHandleCache(opts, data, cb);
};
exports.clearCache = function () {
    exports.cache.reset();
};
function Template(text, opts) {
    opts = opts || {};
    var options = {};
    this.templateText = text;
    this.mode = null;
    this.truncate = false;
    this.currentLine = 1;
    this.source = '';
    this.dependencies = [];
    options.client = opts.client || false;
    options.escapeFunction = opts.escape || utils.escapeXML;
    options.compileDebug = opts.compileDebug !== false;
    options.debug = !!opts.debug;
    options.filename = opts.filename;
    options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
    options.strict = opts.strict || false;
    options.context = opts.context;
    options.cache = opts.cache || false;
    options.rmWhitespace = opts.rmWhitespace;
    options.root = opts.root;
    options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
    options.views = opts.views;
    if (options.strict) {
        options._with = false;
    }
    else {
        options._with = typeof opts._with != 'undefined' ? opts._with : true;
    }
    this.opts = options;
    this.regex = this.createRegex();
}
Template.modes = {
    EVAL: 'eval',
    ESCAPED: 'escaped',
    RAW: 'raw',
    COMMENT: 'comment',
    LITERAL: 'literal'
};
Template.prototype = {
    createRegex: function () {
        var str = _REGEX_STRING;
        var delim = utils.escapeRegExpChars(this.opts.delimiter);
        str = str.replace(/%/g, delim);
        return new RegExp(str);
    },
    compile: function () {
        var src;
        var fn;
        var opts = this.opts;
        var prepended = '';
        var appended = '';
        var escapeFn = opts.escapeFunction;
        if (!this.source) {
            this.generateSource();
            prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
            if (opts._with !== false) {
                prepended += '  with (' + opts.localsName + ' || {}) {' + '\n';
                appended += '  }' + '\n';
            }
            appended += '  return __output.join("");' + '\n';
            this.source = prepended + this.source + appended;
        }
        if (opts.compileDebug) {
            src = 'var __line = 1' + '\n'
                + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
                + '  , __filename = ' + (opts.filename ?
                JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
                + 'try {' + '\n'
                + this.source
                + '} catch (e) {' + '\n'
                + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
                + '}' + '\n';
        }
        else {
            src = this.source;
        }
        if (opts.client) {
            src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
            if (opts.compileDebug) {
                src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
            }
        }
        if (opts.strict) {
            src = '"use strict";\n' + src;
        }
        if (opts.debug) {
            console.log(src);
        }
        try {
            fn = new Function(opts.localsName + ', escapeFn, include, rethrow', src);
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                if (opts.filename) {
                    e.message += ' in ' + opts.filename;
                }
                e.message += ' while compiling ejs\n\n';
                e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
                e.message += 'https://github.com/RyanZim/EJS-Lint';
            }
            throw e;
        }
        if (opts.client) {
            fn.dependencies = this.dependencies;
            return fn;
        }
        var returnedFn = function (data) {
            var include = function (path, includeData) {
                var d = utils.shallowCopy({}, data);
                if (includeData) {
                    d = utils.shallowCopy(d, includeData);
                }
                return includeFile(path, opts)(d);
            };
            return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
        };
        returnedFn.dependencies = this.dependencies;
        return returnedFn;
    },
    generateSource: function () {
        var opts = this.opts;
        if (opts.rmWhitespace) {
            this.templateText =
                this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
        }
        this.templateText =
            this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');
        var self = this;
        var matches = this.parseTemplateText();
        var d = this.opts.delimiter;
        if (matches && matches.length) {
            matches.forEach(function (line, index) {
                var opening;
                var closing;
                var include;
                var includeOpts;
                var includeObj;
                var includeSrc;
                if (line.indexOf('<' + d) === 0
                    && line.indexOf('<' + d + d) !== 0) {
                    closing = matches[index + 2];
                    if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
                        throw new Error('Could not find matching close tag for "' + line + '".');
                    }
                }
                if ((include = line.match(/^\s*include\s+(\S+)/))) {
                    opening = matches[index - 1];
                    if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
                        includeOpts = utils.shallowCopy({}, self.opts);
                        includeObj = includeSource(include[1], includeOpts);
                        if (self.opts.compileDebug) {
                            includeSrc =
                                '    ; (function(){' + '\n'
                                    + '      var __line = 1' + '\n'
                                    + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n'
                                    + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n'
                                    + '      try {' + '\n'
                                    + includeObj.source
                                    + '      } catch (e) {' + '\n'
                                    + '        rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
                                    + '      }' + '\n'
                                    + '    ; }).call(this)' + '\n';
                        }
                        else {
                            includeSrc = '    ; (function(){' + '\n' + includeObj.source +
                                '    ; }).call(this)' + '\n';
                        }
                        self.source += includeSrc;
                        self.dependencies.push(exports.resolveInclude(include[1], includeOpts.filename));
                        return;
                    }
                }
                self.scanLine(line);
            });
        }
    },
    parseTemplateText: function () {
        var str = this.templateText;
        var pat = this.regex;
        var result = pat.exec(str);
        var arr = [];
        var firstPos;
        while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
                arr.push(str.substring(0, firstPos));
                str = str.slice(firstPos);
            }
            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
        }
        if (str) {
            arr.push(str);
        }
        return arr;
    },
    _addOutput: function (line) {
        if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, '');
            this.truncate = false;
        }
        else if (this.opts.rmWhitespace) {
            line = line.replace(/^\n/, '');
        }
        if (!line) {
            return line;
        }
        line = line.replace(/\\/g, '\\\\');
        line = line.replace(/\n/g, '\\n');
        line = line.replace(/\r/g, '\\r');
        line = line.replace(/"/g, '\\"');
        this.source += '    ; __append("' + line + '")' + '\n';
    },
    scanLine: function (line) {
        var self = this;
        var d = this.opts.delimiter;
        var newLineCount = 0;
        newLineCount = (line.split('\n').length - 1);
        switch (line) {
            case '<' + d:
            case '<' + d + '_':
                this.mode = Template.modes.EVAL;
                break;
            case '<' + d + '=':
                this.mode = Template.modes.ESCAPED;
                break;
            case '<' + d + '-':
                this.mode = Template.modes.RAW;
                break;
            case '<' + d + '#':
                this.mode = Template.modes.COMMENT;
                break;
            case '<' + d + d:
                this.mode = Template.modes.LITERAL;
                this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
                break;
            case d + d + '>':
                this.mode = Template.modes.LITERAL;
                this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
                break;
            case d + '>':
            case '-' + d + '>':
            case '_' + d + '>':
                if (this.mode == Template.modes.LITERAL) {
                    this._addOutput(line);
                }
                this.mode = null;
                this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
                break;
            default:
                if (this.mode) {
                    switch (this.mode) {
                        case Template.modes.EVAL:
                        case Template.modes.ESCAPED:
                        case Template.modes.RAW:
                            if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
                                line += '\n';
                            }
                    }
                    switch (this.mode) {
                        case Template.modes.EVAL:
                            this.source += '    ; ' + line + '\n';
                            break;
                        case Template.modes.ESCAPED:
                            this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
                            break;
                        case Template.modes.RAW:
                            this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
                            break;
                        case Template.modes.COMMENT:
                            break;
                        case Template.modes.LITERAL:
                            this._addOutput(line);
                            break;
                    }
                }
                else {
                    this._addOutput(line);
                }
        }
        if (self.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += '    ; __line = ' + this.currentLine + '\n';
        }
    }
};
exports.escapeXML = utils.escapeXML;
exports.__express = exports.renderFile;
if ((void 0)) {
    (void 0)['.ejs'] = function (module, flnm) {
        var filename = flnm || module.filename;
        var options = {
            filename: filename,
            client: true
        };
        var template = fileLoader(filename).toString();
        var fn = exports.compile(template, options);
        module._compile('module.exports = ' + fn.toString() + ';', filename);
    };
}
exports.VERSION = _VERSION_STRING;
exports.name = _NAME;
if (typeof window != 'undefined') {
    window.ejs = exports;
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regExpChars = /[|\\{}()[\]^$+*?.]/g;
exports.escapeRegExpChars = function (string) {
    if (!string) {
        return '';
    }
    return String(string).replace(regExpChars, '\\$&');
};
var _ENCODE_HTML_RULES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&#34;',
    "'": '&#39;'
};
var _MATCH_HTML = /[&<>\'"]/g;
function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
}
var escapeFuncStr = 'var _ENCODE_HTML_RULES = {\n'
    + '      "&": "&amp;"\n'
    + '    , "<": "&lt;"\n'
    + '    , ">": "&gt;"\n'
    + '    , \'"\': "&#34;"\n'
    + '    , "\'": "&#39;"\n'
    + '    }\n'
    + '  , _MATCH_HTML = /[&<>\'"]/g;\n'
    + 'function encode_char(c) {\n'
    + '  return _ENCODE_HTML_RULES[c] || c;\n'
    + '};\n';
exports.escapeXML = function (markup) {
    return markup == undefined
        ? ''
        : String(markup)
            .replace(_MATCH_HTML, encode_char);
};
exports.escapeXML.toString = function () {
    return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
};
exports.shallowCopy = function (to, from) {
    from = from || {};
    for (var p in from) {
        to[p] = from[p];
    }
    return to;
};
exports.shallowCopyFromList = function (to, from, list) {
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        if (typeof from[p] != 'undefined') {
            to[p] = from[p];
        }
    }
    return to;
};
exports.cache = {
    _data: {},
    set: function (key, val) {
        this._data[key] = val;
    },
    get: function (key) {
        return this._data[key];
    },
    reset: function () {
        this._data = {};
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"name":"ejs","description":"Embedded JavaScript templates","keywords":["template","engine","ejs"],"version":"2.5.7","author":"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)","contributors":["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],"license":"Apache-2.0","main":"./lib/ejs.js","repository":{"type":"git","url":"git://github.com/mde/ejs.git"},"bugs":"https://github.com/mde/ejs/issues","homepage":"https://github.com/mde/ejs","dependencies":{},"devDependencies":{"browserify":"^13.0.1","eslint":"^3.0.0","git-directory-deploy":"^1.5.1","istanbul":"~0.4.3","jake":"^8.0.0","jsdoc":"^3.4.0","lru-cache":"^4.0.1","mocha":"^3.0.2","uglify-js":"^2.6.2"},"engines":{"node":">=0.10.0"},"scripts":{"test":"jake test","lint":"eslint \"**/*.js\" Jakefile","coverage":"istanbul cover node_modules/mocha/bin/_mocha","doc":"jake doc","devdoc":"jake doc[dev]"}}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<h1><%= city %>, <%= state %></h1>\n\n<%_ sections.forEach(section => { _%>\n<h2><a href=\"#<%= section.permalink %>\"><%= section.name %></a></h2>\n  <%_ section.accounts.forEach(account => { _%>\n  <h3><a href=\"https://twitter.com/<%= account.handle %>\"><%= account.name || account.handle %></a></h3>\n  <%_ }) _%>\n  <%_ if (section.subsections) { _%>\n  <p>Subsections not implemented yet!</p>\n  <%_ } _%>\n<%_ }) _%>\n";
exports.default = template;


/***/ })
/******/ ]);
//# sourceMappingURL=citytwitter.js.map