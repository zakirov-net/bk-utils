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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(0)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(21)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Получение двухбайтного слова (LE)
 */
function getWord(data, index) {
    return data[index] + (data[index + 1] << 8);
}
exports.getWord = getWord;
/**
 * Запись двухбайтного слова (LE)
 */
function setWord(data, index, word) {
    data[index] = word & 0xff;
    data[index + 1] = (word >> 8) & 0xff;
}
exports.setWord = setWord;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binary_1 = __importDefault(__webpack_require__(13));
var word_1 = __webpack_require__(5);
/**
 * Класс БКшных бинарников
 */
var BKBinary = /** @class */ (function (_super) {
    __extends(BKBinary, _super);
    function BKBinary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BKBinary.prototype.pushWord = function (word) {
        return this.pushArray([word & 0xff, (word >> 8) & 0xff]);
    };
    BKBinary.prototype.insertWord = function (index, word) {
        this.insertArray(index, [0, 0]);
        return this.setWord(index, word);
    };
    BKBinary.prototype.getWord = function (index) {
        return word_1.getWord(this._data, index);
    };
    BKBinary.prototype.setWord = function (index, word) {
        word_1.setWord(this._data, index, word);
        return this;
    };
    BKBinary.prototype.getCheckSum = function (offset) {
        if (offset === void 0) { offset = 0; }
        var checkSum = 0;
        var data = this._data;
        var length = this._length;
        for (var i = offset; i < length; i++) {
            checkSum += data[i];
            if (checkSum > 65535) { // переполнение
                checkSum -= 65536;
                checkSum++;
            }
        }
        return checkSum;
    };
    BKBinary.prototype.setBit = function (index, bitPosition, bitValue) {
        if (bitValue === void 0) { bitValue = 1; }
        return this._setBits(index, bitValue, bitPosition, 1);
    };
    BKBinary.prototype.setBitsPair = function (index, bitsPosition, bitsValue) {
        if (bitsValue === void 0) { bitsValue = 3; }
        return this._setBits(index, bitsValue, bitsPosition * 2, 3);
    };
    BKBinary.prototype._setBits = function (index, bitsValue, bitsPosition, clearMask) {
        var useWord = bitsPosition > 7;
        var value = useWord ? this.getWord(index) : this.getByte(index);
        value &= ~(clearMask << bitsPosition);
        value |= (bitsValue << bitsPosition);
        if (useWord) {
            this.setWord(index, value);
        }
        else {
            this.setByte(index, value);
        }
        return this;
    };
    return BKBinary;
}(Binary_1.default));
exports.default = BKBinary;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(1)
var rp = __webpack_require__(8)
var minimatch = __webpack_require__(2)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(24)
var EE = __webpack_require__(26).EventEmitter
var path = __webpack_require__(0)
var assert = __webpack_require__(9)
var isAbsolute = __webpack_require__(4)
var globSync = __webpack_require__(27)
var common = __webpack_require__(10)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(28)
var util = __webpack_require__(3)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(12)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(1)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(20)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(0)
var minimatch = __webpack_require__(2)
var isAbsolute = __webpack_require__(4)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(11)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Полифилл для ИЕ
if (!Uint8Array.prototype.slice) {
    Object.defineProperty(Uint8Array.prototype, 'slice', {
        value: function (begin, end) {
            return new Uint8Array(Array.prototype.slice.call(this, begin, end));
        }
    });
}
/**
 * Класс бинарных данных
 */
var Binary = /** @class */ (function () {
    function Binary(input, _a) {
        var _b = (_a === void 0 ? {} : _a).expandBytes, expandBytes = _b === void 0 ? 256 : _b;
        this._data = new Uint8Array(input);
        this._length = this._data.length;
        this._expandBytes = expandBytes;
    }
    Object.defineProperty(Binary.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Binary.prototype.getByte = function (index) {
        return this._data[index];
    };
    Binary.prototype.setByte = function (index, byte) {
        this._data[index] = byte;
        return this;
    };
    Binary.prototype.push = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        return this.pushArray(bytes, false);
    };
    Binary.prototype.pushOnce = function () {
        var bytes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bytes[_i] = arguments[_i];
        }
        return this.pushArray(bytes, true);
    };
    Binary.prototype.pushArray = function (bytes, once) {
        var array = new Uint8Array(bytes);
        var data = this._data;
        if (this._length + array.length > data.length) {
            var delta = (once || array.length > this._expandBytes) ? array.length : this._expandBytes;
            data = new Uint8Array(this._length + delta);
            data.set(this._data);
            this._data = data;
        }
        data.set(array, this._length);
        this._length += array.length;
        return this;
    };
    Binary.prototype.insert = function (index) {
        var bytes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bytes[_i - 1] = arguments[_i];
        }
        return this.insertArray(index, bytes);
    };
    Binary.prototype.insertArray = function (index, array) {
        var data = new Uint8Array(this._data.length + array.length);
        data.set(this._data.subarray(0, index));
        data.set(new Uint8Array(array), index);
        data.set(this._data.subarray(index), index + array.length);
        this._data = data;
        this._length += array.length;
        return this;
    };
    Binary.prototype.insertByte = function (index, byte) {
        return this.insertArray(index, [byte]);
    };
    Binary.prototype.setArray = function (index, array) {
        this._data.set(array, index);
        return this;
    };
    Binary.prototype.getUint8Array = function () {
        return this.sliceUint8Array(0, this._length);
    };
    Binary.prototype.sliceUint8Array = function (begin, end) {
        if (typeof end === 'undefined' || end > this._length) {
            end = this._length;
        }
        return this._data.slice(begin, end);
    };
    return Binary;
}());
exports.default = Binary;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Читаем выбранный файл в виде DataURL
 */
function readFileAsDataURL(file) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
}
exports.readFileAsDataURL = readFileAsDataURL;
/**
 * Читаем выбранный файл в виде DataURL
 */
function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.readAsArrayBuffer(file);
    });
}
exports.readFileAsArrayBuffer = readFileAsArrayBuffer;
/**
 * Побеждаем глюк файловой системы macos с буквами Й и Ё
 */
function correctFileName(fileName) {
    return fileName
        .replace(/И\u0306/g, 'Й')
        .replace(/и\u0306/g, 'й')
        .replace(/Е\u0308/g, 'Ё')
        .replace(/е\u0308/g, 'ё');
}
exports.correctFileName = correctFileName;
function saveToFile(name, dataArray) {
    var blob = new Blob([dataArray], { type: 'application/octet-stream' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
        window.navigator.msSaveOrOpenBlob(blob, name);
    }
    else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}
exports.saveToFile = saveToFile;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CHARS_LIST = 'юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ';
function getKOI8Bytes(text) {
    var bytes = [];
    for (var i = 0; i < text.length; i++) {
        var code = text.charCodeAt(i);
        if (code < 32) {
            code = 32;
        }
        else if (code > 127) {
            var char = text[i];
            var index = CHARS_LIST.indexOf(char);
            if (index > -1) {
                code = 192 + index;
            }
            else if (char === 'Ё') {
                code = 229; // Е
            }
            else if (char === 'ё') {
                code = 197; // е
            }
            else {
                code = 32;
            }
        }
        bytes.push(code);
    }
    return bytes;
}
exports.getKOI8Bytes = getKOI8Bytes;
function getStringFromKOI8Bytes(bytes) {
    var text = '';
    for (var i = 0; i < bytes.length; i++) {
        var char = ' ';
        var code = bytes[i];
        if (code > 32 && code < 128) {
            char = String.fromCharCode(code);
        }
        else if (code >= 192 && code <= 255) {
            char = CHARS_LIST[code - 192];
        }
        text += char;
    }
    return text;
}
exports.getStringFromKOI8Bytes = getStringFromKOI8Bytes;
function getLatUpperCaseString(bytes) {
    var text = '';
    for (var i = 0; i < bytes.length; i++) {
        var char = ' ';
        var code = bytes[i];
        if (code >= 96) { // Начиная с маленьких латинских букв
            code &= ~160; // BIC #240,code
        }
        if (code > 32 && code < 96) {
            char = String.fromCharCode(code);
        }
        text += char;
    }
    return text;
}
exports.getLatUpperCaseString = getLatUpperCaseString;


/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

/**
 * Object.entries() polyfill
 */
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
if (!Object.entries) {
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
}
/**
 * String.prototype.padEnd() polyfill
 * https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
 */
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0, targetLength);
        }
    };
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (args, opts) {
    if (!opts) opts = {};
    
    var flags = { bools : {}, strings : {}, unknownFn: null };

    if (typeof opts['unknown'] === 'function') {
        flags.unknownFn = opts['unknown'];
    }

    if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
      flags.allBools = true;
    } else {
      [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
          flags.bools[key] = true;
      });
    }
    
    var aliases = {};
    Object.keys(opts.alias || {}).forEach(function (key) {
        aliases[key] = [].concat(opts.alias[key]);
        aliases[key].forEach(function (x) {
            aliases[x] = [key].concat(aliases[key].filter(function (y) {
                return x !== y;
            }));
        });
    });

    [].concat(opts.string).filter(Boolean).forEach(function (key) {
        flags.strings[key] = true;
        if (aliases[key]) {
            flags.strings[aliases[key]] = true;
        }
     });

    var defaults = opts['default'] || {};
    
    var argv = { _ : [] };
    Object.keys(flags.bools).forEach(function (key) {
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
    });
    
    var notFlags = [];

    if (args.indexOf('--') !== -1) {
        notFlags = args.slice(args.indexOf('--')+1);
        args = args.slice(0, args.indexOf('--'));
    }

    function argDefined(key, arg) {
        return (flags.allBools && /^--[^=]+$/.test(arg)) ||
            flags.strings[key] || flags.bools[key] || aliases[key];
    }

    function setArg (key, val, arg) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg) === false) return;
        }

        var value = !flags.strings[key] && isNumber(val)
            ? Number(val) : val
        ;
        setKey(argv, key.split('.'), value);
        
        (aliases[key] || []).forEach(function (x) {
            setKey(argv, x.split('.'), value);
        });
    }

    function setKey (obj, keys, value) {
        var o = obj;
        for (var i = 0; i < keys.length-1; i++) {
            var key = keys[i];
            if (key === '__proto__') return;
            if (o[key] === undefined) o[key] = {};
            if (o[key] === Object.prototype || o[key] === Number.prototype
                || o[key] === String.prototype) o[key] = {};
            if (o[key] === Array.prototype) o[key] = [];
            o = o[key];
        }

        var key = keys[keys.length - 1];
        if (key === '__proto__') return;
        if (o === Object.prototype || o === Number.prototype
            || o === String.prototype) o = {};
        if (o === Array.prototype) o = [];
        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
            o[key] = value;
        }
        else if (Array.isArray(o[key])) {
            o[key].push(value);
        }
        else {
            o[key] = [ o[key], value ];
        }
    }
    
    function aliasIsBoolean(key) {
      return aliases[key].some(function (x) {
          return flags.bools[x];
      });
    }

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        
        if (/^--.+=/.test(arg)) {
            // Using [\s\S] instead of . because js doesn't support the
            // 'dotall' regex modifier. See:
            // http://stackoverflow.com/a/1068308/13216
            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
            var key = m[1];
            var value = m[2];
            if (flags.bools[key]) {
                value = value !== 'false';
            }
            setArg(key, value, arg);
        }
        else if (/^--no-.+/.test(arg)) {
            var key = arg.match(/^--no-(.+)/)[1];
            setArg(key, false, arg);
        }
        else if (/^--.+/.test(arg)) {
            var key = arg.match(/^--(.+)/)[1];
            var next = args[i + 1];
            if (next !== undefined && !/^-/.test(next)
            && !flags.bools[key]
            && !flags.allBools
            && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                setArg(key, next, arg);
                i++;
            }
            else if (/^(true|false)$/.test(next)) {
                setArg(key, next === 'true', arg);
                i++;
            }
            else {
                setArg(key, flags.strings[key] ? '' : true, arg);
            }
        }
        else if (/^-[^-]+/.test(arg)) {
            var letters = arg.slice(1,-1).split('');
            
            var broken = false;
            for (var j = 0; j < letters.length; j++) {
                var next = arg.slice(j+2);
                
                if (next === '-') {
                    setArg(letters[j], next, arg)
                    continue;
                }
                
                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                    setArg(letters[j], next.split('=')[1], arg);
                    broken = true;
                    break;
                }
                
                if (/[A-Za-z]/.test(letters[j])
                && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j], next, arg);
                    broken = true;
                    break;
                }
                
                if (letters[j+1] && letters[j+1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j+2), arg);
                    broken = true;
                    break;
                }
                else {
                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
                }
            }
            
            var key = arg.slice(-1)[0];
            if (!broken && key !== '-') {
                if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])
                && !flags.bools[key]
                && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                    setArg(key, args[i+1], arg);
                    i++;
                }
                else if (args[i+1] && /^(true|false)$/.test(args[i+1])) {
                    setArg(key, args[i+1] === 'true', arg);
                    i++;
                }
                else {
                    setArg(key, flags.strings[key] ? '' : true, arg);
                }
            }
        }
        else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(
                    flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
                );
            }
            if (opts.stopEarly) {
                argv._.push.apply(argv._, args.slice(i + 1));
                break;
            }
        }
    }
    
    Object.keys(defaults).forEach(function (key) {
        if (!hasKey(argv, key.split('.'))) {
            setKey(argv, key.split('.'), defaults[key]);
            
            (aliases[key] || []).forEach(function (x) {
                setKey(argv, x.split('.'), defaults[key]);
            });
        }
    });
    
    if (opts['--']) {
        argv['--'] = new Array();
        notFlags.forEach(function(key) {
            argv['--'].push(key);
        });
    }
    else {
        notFlags.forEach(function(key) {
            argv._.push(key);
        });
    }

    return argv;
};

function hasKey (obj, keys) {
    var o = obj;
    keys.slice(0,-1).forEach(function (key) {
        o = (o[key] || {});
    });

    var key = keys[keys.length - 1];
    return key in o;
}

function isNumber (x) {
    if (typeof x === 'number') return true;
    if (/^0x[0-9a-f]+$/i.test(x)) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}



/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = __webpack_require__(7);
var fs_1 = __importDefault(__webpack_require__(1));
var path_1 = __importDefault(__webpack_require__(0));
var fileLib_1 = __webpack_require__(14);
function getAllFiles(inputList) {
    var files = inputList.reduce(function (acc, pattern) {
        return acc.concat(glob_1.sync(pattern, { nodir: true, nocase: true }));
    }, []);
    return __spread(new Set(files)); // Уникальные файлы, на всякий случай.
}
exports.getAllFiles = getAllFiles;
function readFiles(fileNames) {
    var files = fileNames.reduce(function (acc, fileName) {
        try {
            var data = fs_1.default.readFileSync(fileName);
            var name_1 = fileLib_1.correctFileName(path_1.default.basename(fileName)).replace(/\.bin$/i, '');
            acc.push({ name: name_1, data: data });
        }
        catch (e) {
            console.error('Не удалось считать файл: ' + fileName);
        }
        return acc;
    }, []);
    return files;
}
exports.readFiles = readFiles;
function writeFile(fileName, data) {
    var buffer;
    try {
        buffer = Buffer.from(data);
    }
    catch (e) {
        buffer = new Buffer(data); // Для старых Node.js
    }
    fs_1.default.writeFileSync(fileName, buffer);
}
exports.writeFile = writeFile;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(0);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(1);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(22);
var balanced = __webpack_require__(23);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(3);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(25);
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(1)
var rp = __webpack_require__(8)
var minimatch = __webpack_require__(2)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(7).Glob
var util = __webpack_require__(3)
var path = __webpack_require__(0)
var assert = __webpack_require__(9)
var isAbsolute = __webpack_require__(4)
var common = __webpack_require__(10)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(11)
var reqs = Object.create(null)
var once = __webpack_require__(12)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BKBinary_1 = __importDefault(__webpack_require__(6));
function filedataToBinary(data) {
    var binary = new BKBinary_1.default(data);
    var error;
    var address;
    if (binary.length < 6) {
        error = 'Слишком короткий bin-файл';
    }
    else {
        address = binary.getWord(0);
        var size = binary.getWord(2);
        if (size !== binary.length - 4) {
            error = 'Файл не соответствует формату БК';
        }
    }
    return { binary: binary, error: error, address: address };
}
exports.default = filedataToBinary;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FileSystem_1 = __importStar(__webpack_require__(31));
var Disk_1 = __webpack_require__(32);
var types_1 = __webpack_require__(36);
var word_1 = __webpack_require__(5);
var KOI8_1 = __webpack_require__(15);
var MKDOSFile_1 = __importDefault(__webpack_require__(37));
exports.BLOCKS_COUNT = 1600;
exports.CATALOG_BLOCKS_COUNT = 20;
exports.CATALOG_BEGIN_OFFSET = 320;
exports.TOTAL_FILES_OFFSET = 24;
exports.TOTAL_BLOCKS_OFFSET = 26;
exports.LABEL_MICRODOS_OFFSET = 256;
exports.LABEL_MICRODOS_VALUE = 42798;
exports.LABEL_MKDOS_OFFSET = 258;
exports.LABEL_MKDOS_VALUE = 21260;
exports.BLOCKS_COUNT_OFFSET = 310;
exports.FIRST_FILE_BLOCK_OFFSET = 312;
exports.FILE_RECORD_LENGTH = 24;
exports.FILE_STATUS_BYTE = 0;
exports.FILE_DIR_ID_BYTE = 0;
exports.FILE_PARENT_ID_BYTE = 1;
exports.FILE_NAME_BEGIN = 2;
exports.FILE_NAME_LENGTH = 14;
exports.FILE_IS_DIR_MARKER = 127;
exports.FILE_BLOCK_BEGIN_WORD = 16;
exports.FILE_BLOCKS_COUNT_WORD = 18;
exports.FILE_ADDRESS_WORD = 20;
exports.FILE_LINK_DRIVE_BYTE = exports.FILE_ADDRESS_WORD;
exports.FILE_SIZE_WORD = 22;
exports.FILE_STATUS_NORMAL = 0;
exports.FILE_STATUS_PROTECTED = 1;
exports.FILE_STATUS_LOGIC_DISK = 2;
exports.FILE_STATUS_BAD = 128;
exports.FILE_STATUS_DELETED = 255;
var FILE_TYPES_IGNORE_FOR_COUNT = [exports.FILE_STATUS_BAD, exports.FILE_STATUS_DELETED];
var MKDOS = /** @class */ (function (_super) {
    __extends(MKDOS, _super);
    function MKDOS(disk) {
        var _this = _super.call(this, disk) || this;
        _this.fsType = types_1.FS_TYPES.MicroDOS;
        _this.osType = types_1.OS_TYPES.MKDOS;
        _this._filesList = [];
        _this._filesByNameLatUC = {};
        _this._dirs = {};
        _this._dirFiles = {};
        _this._blocks = new Array(exports.BLOCKS_COUNT).fill(undefined);
        _this._initFilesList();
        return _this;
    }
    MKDOS.prototype.fileExists = function (name, isDir) {
        if (isDir === void 0) { isDir = false; }
        var nameLatUC = this._fileNameToLatUC(name, isDir);
        return nameLatUC in this._filesByNameLatUC;
    };
    MKDOS.prototype.getFileByName = function (name, isDir) {
        if (isDir === void 0) { isDir = false; }
        var nameLatUC = this._fileNameToLatUC(name, isDir);
        return this._filesByNameLatUC[nameLatUC];
    };
    MKDOS.prototype.getFilesByDir = function (dir) {
        var dirId = dir ? dir.dirId : 0;
        return __spread(this._dirFiles[dirId]);
    };
    MKDOS.prototype.getFileContent = function (file) {
        switch (file.type) {
            case FileSystem_1.FILE_TYPES.FILE:
                var blocksContent = this._disk.read(file.blockBegin, file.blocksCount);
                return blocksContent.subarray(0, file.size);
            case FileSystem_1.FILE_TYPES.DIR:
                return this.getFilesByDir(file);
        }
    };
    MKDOS.prototype.getFilesList = function () {
        return __spread(this._filesList);
    };
    MKDOS.prototype.saveFile = function (file) {
        if (!file.name) {
            throw new Error('Пустое имя файла');
        }
        file.name = file.name.substr(0, exports.FILE_NAME_LENGTH).trim();
        if (this.fileExists(file.name)) {
            throw new Error('Файл с таким именем уже существует');
        }
        var fileSize = file.content.length;
        var blocksCount = Math.ceil(fileSize / Disk_1.BLOCK_SIZE);
        var blockBegin = this._findRoomForFile(blocksCount);
        if (!blockBegin) {
            throw new Error('Недостаточно места на диске');
        }
        var filesCount = this._filesList.length;
        var offset = filesCount ? this._filesList[filesCount - 1].fsOffset + exports.FILE_RECORD_LENGTH : exports.CATALOG_BEGIN_OFFSET;
        // TODO Добавить проверку, есть ли место в каталоге
        var fileData = new Uint8Array(exports.FILE_RECORD_LENGTH);
        fileData[exports.FILE_STATUS_BYTE] = file.isProtected ? exports.FILE_STATUS_PROTECTED : exports.FILE_STATUS_NORMAL;
        fileData[exports.FILE_PARENT_ID_BYTE] = file.parent ? file.parent.dirId : 0;
        var fileNameBytes = KOI8_1.getKOI8Bytes(file.name.padEnd(exports.FILE_NAME_LENGTH));
        fileData.set(fileNameBytes, exports.FILE_NAME_BEGIN);
        word_1.setWord(fileData, exports.FILE_BLOCK_BEGIN_WORD, blockBegin);
        word_1.setWord(fileData, exports.FILE_BLOCKS_COUNT_WORD, blocksCount);
        word_1.setWord(fileData, exports.FILE_ADDRESS_WORD, file.address);
        word_1.setWord(fileData, exports.FILE_SIZE_WORD, fileSize);
        var track0 = this._track0;
        track0.set(fileData, offset);
        var totalFiles = word_1.getWord(track0, exports.TOTAL_FILES_OFFSET) + 1;
        var totalBlocks = word_1.getWord(track0, exports.TOTAL_BLOCKS_OFFSET) + blocksCount;
        word_1.setWord(track0, exports.TOTAL_FILES_OFFSET, totalFiles);
        word_1.setWord(track0, exports.TOTAL_BLOCKS_OFFSET, totalBlocks);
        this._disk
            .write(0, track0)
            .write(blockBegin, file.content);
        return this._addFile({ offset: offset, fileData: fileData });
    };
    MKDOS.prototype.mkDir = function (dir) {
        if (!dir.name) {
            throw new Error('Пустое имя директории');
        }
        dir.name = dir.name.substr(0, exports.FILE_NAME_LENGTH - 1).trim();
        if (this.fileExists(dir.name, true)) {
            throw new Error('Директория с таким именем уже существует');
        }
        var filesCount = this._filesList.length;
        var offset;
        var blockBegin;
        if (filesCount) {
            var lastFile = this._filesList[filesCount - 1];
            offset = lastFile.fsOffset + exports.FILE_RECORD_LENGTH;
            blockBegin = lastFile.blockBegin + lastFile.blocksCount;
        }
        else {
            offset = exports.CATALOG_BEGIN_OFFSET;
            blockBegin = exports.CATALOG_BLOCKS_COUNT;
        }
        var dirIds = Object.keys(this._dirs);
        var dirId = dirIds.length ? Math.max.apply(null, dirIds) + 1 : 1;
        if (dirId > 255) {
            throw new Error('Слишком много директорий');
        }
        // TODO Добавить проверку, есть ли место в каталоге
        var fileData = new Uint8Array(exports.FILE_RECORD_LENGTH);
        fileData[exports.FILE_DIR_ID_BYTE] = dirId;
        fileData[exports.FILE_PARENT_ID_BYTE] = dir.parent ? dir.parent.dirId : 0;
        var fileNameBytes = KOI8_1.getKOI8Bytes(dir.name.padEnd(exports.FILE_NAME_LENGTH - 1));
        fileData[exports.FILE_NAME_BEGIN] = exports.FILE_IS_DIR_MARKER;
        fileData.set(fileNameBytes, exports.FILE_NAME_BEGIN + 1);
        word_1.setWord(fileData, exports.FILE_BLOCK_BEGIN_WORD, blockBegin);
        var track0 = this._track0;
        track0.set(fileData, offset);
        var totalFiles = word_1.getWord(track0, exports.TOTAL_FILES_OFFSET) + 1;
        word_1.setWord(track0, exports.TOTAL_FILES_OFFSET, totalFiles);
        this._disk
            .write(0, track0);
        return this._addFile({ offset: offset, fileData: fileData });
    };
    MKDOS.prototype._findRoomForFile = function (needBlocksCount) {
        for (var i = exports.CATALOG_BLOCKS_COUNT; i < exports.BLOCKS_COUNT; i++) {
            if (this._blocks[i]) {
                continue;
            }
            if (exports.BLOCKS_COUNT - i < needBlocksCount) {
                // Уже точно нет места
                return;
            }
            var blockBegin = i;
            var blockEnd = blockBegin + needBlocksCount;
            for (; i < blockEnd; i++) {
                // Проверяем, есть ли непрерывное пространство
                if (this._blocks[i]) {
                    break;
                }
            }
            if (i === blockEnd) {
                // Нашли достаточно места
                return blockBegin;
            }
        }
    };
    MKDOS.prototype._fileNameToLatUC = function (name, isDir) {
        if (isDir === void 0) { isDir = false; }
        return (isDir ? '_' : '') + KOI8_1.getLatUpperCaseString(KOI8_1.getKOI8Bytes(name));
    };
    MKDOS.prototype._initFilesList = function () {
        this._track0 = this._disk.read(0, exports.CATALOG_BLOCKS_COUNT);
        Array.from(this._generateFilesData(this._track0)).forEach(this._addFile.bind(this));
    };
    MKDOS.prototype._addFile = function (raw) {
        var file = new MKDOSFile_1.default(this);
        file.setFromRawData(raw);
        this._filesList.push(file);
        this._processFile(file);
        return file;
    };
    MKDOS.prototype._processFile = function (file) {
        if (file.type === FileSystem_1.FILE_TYPES.DIR) {
            this._dirs[file.dirId] = file;
        }
        if (!this._dirFiles[file.parentId]) {
            this._dirFiles[file.parentId] = [];
        }
        this._dirFiles[file.parentId].push(file);
        if (file.nameLatUC) {
            this._filesByNameLatUC[file.nameLatUC] = file;
        }
        if (file.blocksCount > 0) {
            this._blocks.fill(file, file.blockBegin, file.blockBegin + file.blocksCount);
        }
    };
    MKDOS.prototype._generateFilesData = function (track0) {
        var filesCount, offset, fileData, fileType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filesCount = word_1.getWord(track0, exports.TOTAL_FILES_OFFSET);
                    offset = exports.CATALOG_BEGIN_OFFSET;
                    _a.label = 1;
                case 1:
                    if (!filesCount) return [3 /*break*/, 3];
                    fileData = track0.subarray(offset, offset + exports.FILE_RECORD_LENGTH);
                    fileType = fileData[0];
                    if (FILE_TYPES_IGNORE_FOR_COUNT.indexOf(fileType) === -1) {
                        filesCount--;
                    }
                    return [4 /*yield*/, { offset: offset, fileData: fileData }];
                case 2:
                    _a.sent();
                    offset += exports.FILE_RECORD_LENGTH;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    return MKDOS;
}(FileSystem_1.default));
exports.default = MKDOS;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FILE_TYPES;
(function (FILE_TYPES) {
    FILE_TYPES["FILE"] = "FILE";
    FILE_TYPES["DIR"] = "DIR";
    FILE_TYPES["LINK"] = "LINK";
    FILE_TYPES["LOGIC"] = "LOGIC";
    FILE_TYPES["BAD"] = "BAD";
    FILE_TYPES["DELETED"] = "DELETED";
})(FILE_TYPES = exports.FILE_TYPES || (exports.FILE_TYPES = {}));
var FileSystem = /** @class */ (function () {
    function FileSystem(_disk) {
        this._disk = _disk;
    }
    FileSystem.prototype.test = function () {
        return this.osType;
    };
    FileSystem.prototype.getData = function () {
        return this._disk.getData();
    };
    return FileSystem;
}());
exports.default = FileSystem;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Binary_1 = __importDefault(__webpack_require__(13));
exports.BLOCK_SIZE = 512;
var Disk = /** @class */ (function () {
    function Disk(input) {
        this._binary = new Binary_1.default(typeof input === 'number' ? input * exports.BLOCK_SIZE : input);
    }
    Disk.prototype.read = function (blockIndex, blocksCount) {
        if (blocksCount === void 0) { blocksCount = 1; }
        return this._binary.sliceUint8Array(blockIndex * exports.BLOCK_SIZE, (blockIndex + blocksCount) * exports.BLOCK_SIZE);
    };
    Disk.prototype.write = function (blockIndex, data) {
        var binary = this._binary;
        var length = data.length;
        var blocksCount = Math.ceil(length / exports.BLOCK_SIZE);
        var needLength = (blockIndex + blocksCount) * exports.BLOCK_SIZE;
        // Если бинарные данные меньше нужного
        if (binary.length < needLength) {
            // TODO Сделать в Binary метод увеличения размера
            binary.pushArray(new Uint8Array(needLength - binary.length));
        }
        binary.setArray(blockIndex * exports.BLOCK_SIZE, data);
        // Добиваем последний блок нулями, если нужно
        var lengthMod = length % exports.BLOCK_SIZE;
        if (lengthMod) {
            var zeroPadSize = exports.BLOCK_SIZE - lengthMod;
            binary.setArray(blockIndex * exports.BLOCK_SIZE + length, new Uint8Array(zeroPadSize));
        }
        return this;
    };
    Disk.prototype.getData = function () {
        return this._binary.getUint8Array();
    };
    return Disk;
}());
exports.default = Disk;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(17);
var minimist_1 = __importDefault(__webpack_require__(18));
var ioLib_1 = __webpack_require__(19);
var filesToDisk_1 = __importDefault(__webpack_require__(34));
var IMAGE_BASES;
(function (IMAGE_BASES) {
    IMAGE_BASES["empty"] = "empty";
    IMAGE_BASES["bootable"] = "bootable";
})(IMAGE_BASES || (IMAGE_BASES = {}));
var args = minimist_1.default(process.argv.slice(2), {
    alias: { disk: 'd', out: 'o' },
    default: { disk: IMAGE_BASES.bootable }
});
var inputFiles = args._;
if (!inputFiles.length || !(args.disk in IMAGE_BASES)) {
    exitWithError('Использование:\nbk-utils-bkd [--disk empty|bootable] [--out diskName.bkd] file1.bin [file2.bin ...]');
}
var fileNames = ioLib_1.getAllFiles(inputFiles);
if (!fileNames.length) {
    exitWithError('Не заданы подходящие для упаковки файлы');
}
var files = ioLib_1.readFiles(fileNames);
if (!files.length) {
    exitWithError('Нет файлов для упаковки в образ диска');
}
var withBootLoader = args.disk === IMAGE_BASES.bootable;
var result = filesToDisk_1.default(files, withBootLoader);
result.files.forEach(function (file) {
    console.log(file.name + ' - ' + (file.error ? file.error : 'OK'));
});
if (!result.disk) {
    exitWithError('Не удалось создать образ диска');
}
var outName = args.out || result.files.filter(function (file) { return !file.error; })[0].name + '.bkd';
try {
    ioLib_1.writeFile(outName, result.disk);
    console.log('Образ диска записан в файл ' + outName);
}
catch (e) {
    exitWithError('Не удалось записать образ диска в файл ' + outName);
}
function exitWithError(error) {
    console.error(error);
    process.exit(1);
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createDisk_1 = __importDefault(__webpack_require__(35));
var filedataToBinary_1 = __importDefault(__webpack_require__(29));
function filesToDisk(files, withBootLoader) {
    var e_1, _a;
    if (withBootLoader === void 0) { withBootLoader = true; }
    var fileSystem = createDisk_1.default(withBootLoader);
    var resultFiles = [];
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var file = files_1_1.value;
            var _b = filedataToBinary_1.default(file.data), fileBinary = _b.binary, error = _b.error;
            var resultFile = { name: file.name };
            if (error) {
                resultFile.error = error;
            }
            else {
                var address = fileBinary.getWord(0);
                try {
                    fileSystem.saveFile({
                        name: file.name,
                        address: address,
                        content: fileBinary.sliceUint8Array(4)
                    });
                }
                catch (e) {
                    resultFile.error = e.message;
                }
            }
            resultFiles.push(resultFile);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var disk = resultFiles.some(function (file) { return !file.error; }) ? fileSystem.getData() : null;
    return {
        disk: disk,
        files: resultFiles
    };
}
exports.default = filesToDisk;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MKDOS_1 = __importStar(__webpack_require__(30));
var Disk_1 = __importStar(__webpack_require__(32));
var base64_arraybuffer_1 = __webpack_require__(38);
var word_1 = __webpack_require__(5);
var diskDump_1 = __webpack_require__(39);
function createDisk(withBootLoader) {
    if (withBootLoader === void 0) { withBootLoader = true; }
    var fileSystem = initMKDOSDisk(withBootLoader);
    if (withBootLoader) {
        saveFilesDump(fileSystem, diskDump_1.diskDump);
    }
    return fileSystem;
}
exports.default = createDisk;
function initMKDOSDisk(withBootLoader) {
    if (withBootLoader === void 0) { withBootLoader = false; }
    var block0 = new Uint8Array(Disk_1.BLOCK_SIZE);
    if (withBootLoader) {
        var bootLoader = new Uint8Array(base64_arraybuffer_1.decode(diskDump_1.BOOT_LOADER_BASE64));
        block0.set(bootLoader);
    }
    word_1.setWord(block0, MKDOS_1.TOTAL_BLOCKS_OFFSET, MKDOS_1.CATALOG_BLOCKS_COUNT);
    word_1.setWord(block0, MKDOS_1.LABEL_MICRODOS_OFFSET, MKDOS_1.LABEL_MICRODOS_VALUE);
    word_1.setWord(block0, MKDOS_1.LABEL_MKDOS_OFFSET, MKDOS_1.LABEL_MKDOS_VALUE);
    word_1.setWord(block0, MKDOS_1.BLOCKS_COUNT_OFFSET, MKDOS_1.BLOCKS_COUNT);
    word_1.setWord(block0, MKDOS_1.FIRST_FILE_BLOCK_OFFSET, MKDOS_1.CATALOG_BLOCKS_COUNT);
    var disk = new Disk_1.default(MKDOS_1.CATALOG_BLOCKS_COUNT);
    disk.write(0, block0);
    return new MKDOS_1.default(disk);
}
exports.initMKDOSDisk = initMKDOSDisk;
function saveFilesDump(fileSystem, files, parentDir) {
    var e_1, _a;
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var file = files_1_1.value;
            if ('files' in file) {
                var dir = fileSystem.mkDir({
                    name: file.name,
                    parent: parentDir
                });
                saveFilesDump(fileSystem, file.files, dir);
            }
            else {
                fileSystem.saveFile({
                    name: file.name,
                    address: file.address,
                    isProtected: !!file.isProtected,
                    content: new Uint8Array(base64_arraybuffer_1.decode(file.content)),
                    parent: parentDir
                });
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return fileSystem;
}
exports.saveFilesDump = saveFilesDump;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OS_TYPES;
(function (OS_TYPES) {
    OS_TYPES["MKDOS"] = "MKDOS";
})(OS_TYPES = exports.OS_TYPES || (exports.OS_TYPES = {}));
var FS_TYPES;
(function (FS_TYPES) {
    FS_TYPES["MicroDOS"] = "MicroDOS";
})(FS_TYPES = exports.FS_TYPES || (exports.FS_TYPES = {}));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var FileSystem_1 = __webpack_require__(31);
var word_1 = __webpack_require__(5);
var KOI8_1 = __webpack_require__(15);
var MKDOS_1 = __webpack_require__(30);
var STATUS_TO_TYPE = (_a = {},
    _a[MKDOS_1.FILE_STATUS_LOGIC_DISK] = FileSystem_1.FILE_TYPES.LOGIC,
    _a[MKDOS_1.FILE_STATUS_BAD] = FileSystem_1.FILE_TYPES.BAD,
    _a);
var MKDOSFile = /** @class */ (function () {
    function MKDOSFile(_filesystem) {
        this._filesystem = _filesystem;
        this._isDir = false;
    }
    Object.defineProperty(MKDOSFile.prototype, "name", {
        get: function () {
            return this._fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "nameLatUC", {
        get: function () {
            return this._fileNameLatUC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "address", {
        get: function () {
            return word_1.getWord(this._fileData, MKDOS_1.FILE_ADDRESS_WORD);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "blockBegin", {
        get: function () {
            return word_1.getWord(this._fileData, MKDOS_1.FILE_BLOCK_BEGIN_WORD);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "blocksCount", {
        get: function () {
            return word_1.getWord(this._fileData, MKDOS_1.FILE_BLOCKS_COUNT_WORD);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "size", {
        get: function () {
            return word_1.getWord(this._fileData, MKDOS_1.FILE_SIZE_WORD);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "parentId", {
        get: function () {
            return this._fileData[MKDOS_1.FILE_PARENT_ID_BYTE];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "dirId", {
        get: function () {
            return this._isDir ? this._fileData[MKDOS_1.FILE_DIR_ID_BYTE] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "isProtected", {
        get: function () {
            return this._isProtected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "fsOffset", {
        get: function () {
            return this._fsOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDOSFile.prototype, "content", {
        get: function () {
            return this._filesystem.getFileContent(this);
        },
        enumerable: true,
        configurable: true
    });
    MKDOSFile.prototype.setFromRawData = function (_a) {
        var offset = _a.offset, fileData = _a.fileData;
        this._fsOffset = offset;
        this._fileData = fileData;
        var fileNameBytes = fileData.subarray(MKDOS_1.FILE_NAME_BEGIN, MKDOS_1.FILE_NAME_BEGIN + MKDOS_1.FILE_NAME_LENGTH);
        var isDir = fileNameBytes[0] === MKDOS_1.FILE_IS_DIR_MARKER;
        if (isDir) {
            fileNameBytes = fileNameBytes.subarray(1);
        }
        this._fileName = KOI8_1.getStringFromKOI8Bytes(fileNameBytes).trim();
        var fileStatus = fileData[MKDOS_1.FILE_STATUS_BYTE];
        if (fileStatus === MKDOS_1.FILE_STATUS_DELETED) {
            this._type = FileSystem_1.FILE_TYPES.DELETED;
        }
        else {
            this._fileNameLatUC = (isDir ? '_' : '') + KOI8_1.getLatUpperCaseString(fileNameBytes).trim();
            this._isDir = isDir;
            this._setType(fileStatus);
        }
        return this;
    };
    MKDOSFile.prototype._setType = function (fileStatus) {
        var fileData = this._fileData;
        if (this._isDir) {
            this._type = fileData[MKDOS_1.FILE_LINK_DRIVE_BYTE] ? FileSystem_1.FILE_TYPES.LINK : FileSystem_1.FILE_TYPES.DIR;
            return;
        }
        if (STATUS_TO_TYPE[fileStatus]) {
            this._type = STATUS_TO_TYPE[fileStatus];
            return;
        }
        if (fileStatus === MKDOS_1.FILE_STATUS_PROTECTED) {
            this._isProtected = true;
        }
        this._type = FileSystem_1.FILE_TYPES.FILE;
    };
    return MKDOSFile;
}());
exports.default = MKDOSFile;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOT_LOADER_BASE64 = 'oAAiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3wta/sYVAALAFSQAwRUADcIVAKDEEcRlIAAfEQQA3xUAQLL/3xUAHM7/wBUUAMEVAB3CFQCA3wkE4A2G16cqAAQA3gLXrBwAAQDagsAVAQEzeBIA1QHAnBwAH5BZoB+QWKAfkAqg8xc4oAoAwRcGoMIVGwDRFIJ+XwAAgA==';
exports.diskDump = [{
        'name': 'DOS', 'files': [{
                'name': 'MONITOR',
                'address': 65535,
                'content': 'dwCsAOKBCILUgwSEYICchCiORo66jkKPio/+j8iQAqAynzyfdp/En9KfAOAE4AjgDOAQ4BTgGOAc4CDgJOAo4CzgMOA04DjgPOBmEYUdAgBFGcVFAP9FHQCAzQmFFQIAAQrCFRAA0RUAgIN+3xUigQQA3xVKgBgA3xWAABoAwhVQABEKgn4EiLcK5n+3it1/dwr4f3cK+H/3CTwJAAogiB8KzP/fFZAAzv8XjQAAhwDGFQAC9wmo/98JAKD3CaD/wxXQgfcJaAAGiA6IBBD3CWgAxEWgABchTQADAvcJfgDvARchTAAZhwMC9wnAAOgBFyFTAAYCxQsCAsUdtn/NCd8BFyFUAAMC3wlA4NkBFyFQANYC3wkAwNMBFyFAAMiGzwHGFQAC3xWQAM7/BIjIAcKUwJQOiIN+hwAFCgaIDogXoAoACwMXoDcA94LA5TAA9IHFDMUMxQwFYPABhwDBFdAA0RUDAFEREQrDFdSB9wm+/8IVEAoIiMEK0ZUgAMIK/IDBFdAAHohAnAEADwPACgkCwWUaAMIVEAAQiMAVCgAOiO8BwxXagfcJhP+HACSIIojBFbQAwhUEACiIxQsCA3cR8H7BHex+wh3qfiiIhwADCj8gBent8T8gBwrv++ni6+HfFV6CMADAFYAAHxAyAN8V8oK8AB8QvgA3CrJ+Nwqwfh8KsP+HABeNAADAF7L/94s+fgcDwJ86frcKNn73ijB+HAH3iyF+BQPAFSAA94oXfhQB94sQfgkDwB0IfgF+3zVAAM7/BQM3ivx994v1fd8DAArA3ex9N4rpfYcANwl+DmYR9wmyARegEAArggEQweUKAB+BwQxHYAYBKAEnARYBCAELARIB3wuyACADwBUNAB0B95WAAIl9AgE3ioN9AAo3Cux99wnQDhMBAwr3CSgADwHACwsC34uw//2A9wlYAQcBF6A/AAKDwN1VffcJggGFFTcJGg4CAPcJkgHDCwMDMVBKAAIBMUBKAPcJaA+HADcJ6g1mEfcJHgHA1YAAF6C/AAWDwMVAAMDVIABBARegrwATgxeguQAQgveLMn06AsBF8P/ADDccVgAmfTMD958gfRx9twoafS0BF6CfAA+DwMUgAMDVEAAXoJoAIYcXoJwAHgMXoJ8AGwMOiBsBF6CJAASHEAL3CTIAFAEXoIQAB4IXoIEA8YIDAreKyHwKAcBVEAAFARegiwACAsAVmQD3Cb4AhRU3CVYNAgD3Cc4A95UBAKF8wAwHhzEwSgAQAreKk3zADPmGQAvBZQIAVyAEAPOH94tWfAMCVyAIAO0ChwAmEIUQxQDCRQD/phAGiBegGAAGAo4g+gPBCsJlAgABARGQDogFoAEDj36AFYAVhwDACwgHFyAKAAWCAQIACsAMcBBWAIcA9wt2fAID9wk6DfcV//9ofMIVKADDFUAA3xXQAM7/wBABft8VkADO/8AQAX7DCox+wBfO/8CXsv+HAMUXsAADAveL53sHAjeQ4Hs3kN17xQsBA80JhwDBHfp7wUXA//eLpHsBA4EMQhDCRfD/ggoACrEAQAyCfsFFz/+BDIEMgQyHADcJRgy3Cu5794uAewMD9wkKByEBwEUA/xegfwAIghegHwALg8DlEAD3CTAAFAEXoJ8AD4PA5TAA9wEXoBEAA4P3CegBCAEXoAgA+gP3CWwDAgH3Cd4DNwn8C4cA9wnqAPdtcntse/cJBgD3CYgBhwD3i1p7BAL3NT8AVnsqAgMKxR1OewWAgwrFZUAA/YEIAXchRHsHh8XlQAB3ITp7+4b3CTYAdxEqe0QRxEXA/8VFPwDFDERhxQzFDERhxG0oe8RFAMDEbR57NxEIezeK/noDAfdtAHv8eocA94uoeicCxBUKAMMLAQMEix9htP/BHfZ6whUQAMMLDwPB5QAEwUUAwMFt4Hr3CagN9+WAAth690UAwNJ6GAHBbcp69wnSDfdlgALCevdFAMC8eg0BwhUeAMMLBQPBFYB79wm0DQQBwRWAdvcJag2HAMAMARDADMAMAWDBZR6Uwx14esIVCQD3iyB6GgIACveLHXoBA0AK9wt6egEDQApLlMALAQNLivcJ/AyHfkuUwAsBA0uK94v2eTADy51Yei0BJgpFlMVFAP/EFRAAAAr3i915AQNFisWLCgOFDAOGBQMAXQSUxOUCAPgCAF0ElMUdInoFQMQdHnpACgRARFELEfcJogyifs4LBwKOCoIK94ucedcDyx3+eYAVhwD3i5h5FwLDHdR5whUKAPeLfHkHAsUV/wCDDAGGxQDDDAUBxR3UecQdznkFeUt59wlYDIR+hwD3i1t5AwP3CdIBRwHBHZZ5wh2WecMVQAAXoAgAAgKB4DgBwOUSAMAMB2ANAQ4BEAESARUBFwEZARsBHAEdAR4BIAEiASQBAQokAfcJ2gAlAfcJ9AAiAcFgwUU/ABoB9wlWABsB9wmQABgB9wkuABUBgWAPAcHgDQHBYAsBweCB4AgBweCBYAUBwWCBYAIBwWCB4HcQEHn3CYgLhwD3CSr/9+0GeQB5t4r4ePcJlv33CYIL9wkU/4cAwx3seMQQxFU+AMRd5HjCFQoAwRBFEMVt2HjFNT8AAgNRlfsB9wl0C4x+5h3CeDcRvnj3CUYLtxW2ePcJ1P6HAPcJzv7DHah4whUKAMUQxVU/AIUKQRHB7Zh4ZZhDIf0C9wk4C41+9wkSC/cJpP6HAMEdfHjBRT8AwWWAAgKAwe2EePcJMAD3CUQL9wmE/ocA9wl+/sEdbHjBbWx4weWAAsFFAMDBbVp49wkKAPcJXgv3CV7+hwDDHTp4wh0weMJVPwCCCoPgwhUFAIMMgn7CEMMMwwzCYIcAF6AKABEC9wk8APc1PwAGeAMC94u4dy8C91U/APh3twr0d/cJbAonAfeLo3cMAhegDAADAvcJbggeARegBwADAvcJjvsYAfeLhHcVA8DlEAADgfcJSvwPAReg+P8DAsAVAQD3AcBlQAB3imF39wkw/HeKWXcAAYcAF6CCAAUCd4pMd8AVAwAHAReghAAFAneKPXfAFQQAawEXoIwAAwL3CdgAagHFnSh3AwL3iyF3YgLA5ZEAYYHADAdgDgENAQwBCwEYARwBIgFXAScBKwExATMBNwE5AUcB94vsdk0DABwWlDeK43b3CYoJNxBGd/cJgglCAfcJ7ADAFQUAOAHFCzsDN4rMdneKx3b2AcULNAM3ir12d4q6du8BxQstAvcJIAEqAfcJTAl3iqp29wlECSMB9wksASABd4qRdsAVAgAWAfcJogEYAfcd5nbodvcd4nbkdvcddHZ6dvedanZzdvcJfAcJAXeKYnbAFQEA9wmwBwIB9wmkAYcAd4pMdhAC9xUAQKR29xUAQKJ29xUAPJ529xUABoR23xXYArT/GgH3FQBwhHb3FQAQgnb3FQAKfnb3FQABZHbfFZgAtP/DFQB+xBXgANMdbHYDf8EdaHb3CRAJ9xUABFJ29wnIBvcJ/gaHAPcJjAh3iuR1FQP3nSN2IHY3Cip2NwoodsAdGHY3EBx2wO0idsDtIHYCgMBtHHY3EAh2DgE3irV1N4qydfeLpHUDA/dFAQDqdbeK4nX3CYD6wBUFAPcJ5gb3CTQIhwDmHdJ19wlaCPdtzHXIdfc1PwDCdfcCtxW8dfcJ2vuHAPcJDgh3il51FQL3Cqp195UBAJ9198WqAJh1NwqydfcV//+udfeLP3UpA3cKonV3CqB1JAG3CoB1twp4dfdFAQBydbeKanX3CQj695UDAGN197WqAFx1DQP3jFZ1CoZ3i1B1twpWdfctUnVidQKHNwpKdcCdPHXAjDfQNnX3CR4H9wmOB4cAd4rddMAdRHX3HT51PnU3EDh1xR02dUB5wR0odcFtInXCHSR1ggwReMELAoDB7RZ1hn6HABeglQADAsAVtwAOAReglgADAsAVygAIAReglwADAsAVwwACAcBlEAB3ioV09wlC+neKfXT3bcZ0wHT3CVr59wnc+ocAF6AfAAOC9wkiAA0BwEUA/xegOQADgvcJOAIHARegnwACgvcJ8vw3Cph0hwD3CYwBAQoCCsQVQAADkMPlGQAbgcMMx2AGAQcBCAEJAQsBDQEPAYEKIgEC4SABAmEeAQLhwQobAQLhgQoYAQJhgQoVAQJhwQoSARegCAACAsEKDQEXoBIABAI3Cix0dwDcBBegDAAlAvcJrgSHAMQdJHQEAgCKwACACgQQ94vFcwMDwB0idAUB94u6cw8DwB0UdMWd8nN/wfpzAxBFCkNB/9Dwc/cJEAAMfwMB9wkIAAN/9wnaAIcAxR3Wc4Vgt2DWc+YdwnPDFUAAwQspAxKBzowKhk6LhQq3Cq5zxTU/AAMCxeD34KJz94tQcxkDzoxOixYBoQAOjAuGztWAAMU1PwADAsVg92CAc/cKfHPFCveLKHMFA6EADowChs7VgAC3FWRz5hWAAvcLbHMDgAMLDgsDAc4tYHMUh7fjWnP3YEhzBIH3LUJzRnMLh4XjZhE3Ca4Dt4ouc/cJzPc3Ca4DhRWDFcULA4DFbThzBgF3ITJzA4fF7Sxz+gF3ERRzxW0ec8VFAMDFbRRzdxEGc4cA94u2cj8CxB0Oc8UdCHNEeQUKxd3ickUKREHDHeZygwwBhsQAwwzBEMPlwAD3IN5yAoLDbdxywhUHAAt59wloBYR+whUDAKEAxZ1gcgEDwgwEDAKGwQoEDIV+wUUBAHcgrHICgsFtqnLCFQcACXlEDAKG9wkQAEURBANEDAKG9wkEAIx+hwDBZQIAAoDB7YJysQBEDIcAwOUwAAKAAAoHAcEdYnLBDEBgwQzBDEBgNxBUcocAJhDmEIMQwwDCRQD/QJT3CWL2A6ABA4Z+gxWAFYcANwmcAsALAwL3CeYCEwEXoH8ACYIXoAgAAgLAFREAwOUQAAiBBQEXoJ8ABIPA5TAA9wkGADcJdAKHAGYQphD3i5hxAQPBDMFFwP/BbfBxweXAA8FFAMDBbeJx5h3McXcQyHHARQD/9wk297cVvHGCFYEVhwA3CSgC9wkKBIEdAgCCHQQA94tScQEDwQzAFQYAwgwCfveLSnEQAsFFwP/C7Yxx/YDCbYZx/YFCYLcQeHG3inBx9wkO9hwBwUUA/kMQgQyBDIEMwJ1dccNF+P8CA8AMwn43kE5xwu1mcf2Awm1gcf2BQmC3EEZxAQoCCvcJZP33CZADNwmyAYcAJhD3i+BwBgLBHSBxQhDBRcD/DgHBHRxxQhDBRcD/wQzBDMEMwJ0CcYAMAoeBCvwB94uqcAEDgQzCRT8AwBUGAIIMAn6AFYcAdxDwcLcQ7nA3kNVwNwlMAfeLgnACA8EMKodXIAACJ4bAFQYAwgwjhwN+tyDQcB+GQxCBDIEMgQyBYMFtvHDBRQDAwW2ycMKdmXDDRfj/AgPCDMJ+QJKAwMMdpnD3i4FwAgLDHZpwQgqDQMDQCZA3CfYAhwA3CeQAN5BlcEMQhBDBHXBwwh1ucPcQaHA3EWZwAApD4AOBBAOACgIBwAoDCwUKhOADgQQDhQoCAcUKBAsDIQeCZhEmCsUQAxFEEQUKAwEmCiYQAAomCsMLBAKDCsblCgAkAcTgAoGOCvwBxGDmEOYQjgwmESYKJgoECrZtBAACAAgDti0CAAYABAeECrbtCAACAIRtCgAOEYQMDuH3CRoAgW0MAIJtDgCEE/cJDADbfsZlEAA3CTwAhwDECwUDAWBCYfcJ0v4Ff4cAZhAACsEVIACxAAAMA4fRi/sC+wGBFYcA3xWQAM7/5hCmEGYQJhAmEYQAgBWAFYEVghWDFYQANwpsb/cJBvTAHYBvwx1ib8Iddm+CDAsQw2UCAAKAw+1mb4d+BQr3CTb8NwpQb/edPW86b/cJlgGHAMEdUm/DHURvw20+b8QVEAD3CdwBA3/BHT5vw2UAA/cJ4gH3CfoAAAo3Ci5vwhUGACYQphD3CQoAghWAFYAKiH6HALcKFm/3CxBvaQI3CgxvwRUjAAFgwAwHYAUBCwEPARMBFwEbAcMV3JPJiykDwxXgkyYByYsiA8MV5JMhAcmLHQPDFeiTHAHJixgDwxXskxcByYsTA8MV8JMSAcmLDgP3i01uAwPDFfiTCgHDFfST94s+bgUDwxX8kwIBwxUAlMAMwGUEAMEVQAD3iyVuAQOBDAHgwhUEAOYddm7mHXRu5h0EbuYdBG73HWpuZG73HWZuYG73nftt7m33HfZt7G3AlOYQ9wlA/IMVgQqHfrcV2m23FdJttxU6brcVNG6HAMUVgYHEFRAA94u8bQMDxRUDwMQMwR0ebkFBRQrDHRhuQ0HBUMMdBG7D5cAAw0UAwMNt9m3FEPcJqgADCgIKwBxKAAAMA4cPA4IK+wGBEPeLdm0EAkFhyZ3ebfYBwQxBYckd1G3xAcNlAgAFYcU1PwDlAocA94tYbQYC9wm88/cVACBqbQUB9wmS+vcVAARebYcA9wmk87eKeG33CRby9wmY84cAwB2KbcMdbG3CFQoA94sUbQICC5ABAQsQ9wkEAIl+hwDDZUAAAoDD7WBthwDCFSAA9yBSbQKCw21QbWMQgn6HAMIVIADDCwKAw+0+bVMQgn6HAEMQw+WAAvcgKm0ChsNtKG3CCw4DxBUgAFMUAn/BCwOAwe0UbQQBwwsCgMPtCm2OfsQVCgDBHQRt9wmy/wN/hwBDEMNlgAJ3IOpsAoLBbehs1yAAgAKDw+3ebMILEAPEFSAAYxgCf3cgymwDgsFtyGwFAfcgvmwCgsNtvGyQfsQVCgDBHbZs9wlQ/wN/hwAQvLHEEMLFw8C/tM65vscQucPFELK8whC3wrG2yrHAEMPEucIQEBAQ//8AwAAwAAwAA8AAMAAMAAMA//+qqlVVAAD/4d3d4f39/f//AAAIBH4ECAAAAH8BPQ0VJUEBAAAAPggcKggICAAAAAgICCocCD4AAAAASER+BAgAAAAAABIKfgoSAAAAAAASIn4iEgAAAAAAKCR+JCgAAAAAABAgfiAQAAAAAAgcKggICAgAAAAICAgIKhwIAAAAHgYKEiBAAAAAAHhgUEgEAgAAAAAAAgRIUGB4AAAAAEAgEgoGHgAAAAAAAAAAAAAAAAAYGBgYGAAYAAAANjYAAAAAAAAAABQUPhQ+FBQAAAgcKgocKCocCAAAJiYQCAQyMgAAAAwSFAg0EiwAAAAYCAQAAAAAAAAAEAgEBAQIEAAAAAQIEBAQCAQAAAAACCocKggAAAAAAAgIPggIAAAAAAAAAAAADAwGAAAAAAA+AAAAAAAAAAAAAAAMDAAAAABAIBAIBAIAAAAcIjIqJiIcAAAACAwICAgIHAAAABwiEAgEAj4AAAA+IBAcICIcAAAAEBgUEj4QEAAAAD4CHiAgIhwAAAAYBAIeIiIcAAAAPiAQCAQEBAAAABwiIhwiIhwAAAAcIiI8IBAMAAAAAAwMAAAMDAAAAAwMAAAADAwGAAAQCAQCBAgQAAAAAAA+AD4AAAAAAAIECBAIBAIAAAAcIhAICAAIAAAAHCI6KjoCHAAAAAgUIiI+IiIAAAAeJCQcJCQeAAAAHCICAgIiHAAAAB4kJCQkJB4AAAA+AgIeAgI+AAAAPgICHgICAgAAABwiAgIyIjwAAAAiIiI+IiIiAAAAHAgICAgIHAAAADgQEBAQEgwAAAAiEgoGChIiAAAAAgICAgICPgAAACI2KioiIiIAAAAiIiYqMiIiAAAAHCIiIiIiHAAAAB4iIh4CAgIAAAAcIiIiIiocIAAAHiIiHgoSIgAAABwiAhwgIhwAAAA+CAgICAgIAAAAIiIiIiIiHAAAACIiIiIiFAgAAAAiIioqKioUAAAAIiIUCBQiIgAAACIiIhQICAgAAAA+IBAIBAI+AAAAHAQEBAQEHAAAAAACBAgQIEAAAAAcEBAQEBAcAAAACBQiAAAAAAAAAAAAAAAAAD4AAAAECAAAAAAAAAAAAAAMEhISLAAAAAICGiYiJhoAAAAAABwiAiIcAAAAICAsMiIyLAAAAAAAHCIeAhwAAAAYJAQOBAQOAAAAAABcIiI8IB4AAAICGiYiIiIAAAAQABgQEBA4AAAAEAAQEBAQEgwAAAICIhIOEiIAAAAMCAgICAg+AAAAAAAWKioqIgAAAAAAGiYiIiIAAAAAABwiIiIcAAAAAAAeIiIeAgIAAAAALDIiMiwgIAAAABokBAQEAAAAAAAcAhwgHgAAAAQEDgQEJBgAAAAAACIiIiJcAAAAAAAiIiIUCAAAAAAAIiIqKhQAAAAAACIUCBQiAAAAAAAiIiIUCAQCAAAAPhAIBD4AAAAwCAgGCAgwAAAACAgICAgICAAAAAYICDAICAYAAAAABCoQAAAAAAAAPj4+Pj4+PgAAAHwqLCgoKCQAAAgICAj/AAAAAAAANn9/fz4ICAAAAAAAAA8ICAgICAgICA8IDwgICAgICAgI+AgICAgICAgICPgAAAAAAAAAAP8A/wAAAAAAAAD/AP8ICAgIAAgcPn9/HD4AAAAAAAD4CAgICAgAAAAA/wgICAgIFBQUFP8AAAAAAAgICAgICD4cCAAICAgI/wgICAgIFBQUFBQUFBQUFAgICAgPCAgICAgAABgM/gwYAAAAFBQU9wD3FBQUFAAIHD4ICAgICAgAHBxrf2sIHAAAAAAAAP8AAAAAABQUFBT/FBQUFBQICAgICAgICAgIAAgcPn8+HAgAAAgICAgPAAAAAAAICAj/CP8ICAgIAAAAAP8UFBQUFAgICP8A/wAAAAAICAj4CPgICAgIAAAYMH8wGAAAAEQRRBFEEUQRRBEAAAASKi4qEgAAAAAADBAcEiwAAAAgHAIeIiIcAAAAAAASEhISPiAAAAAAHBQUFD4iAAAAABwiPgI8AAAAAAAIPioqPggAAAAAPgICAgIAAAAAACIUCBQiAAAAAAAiMiomIgAAAAgAIjIqJiIAAAAAACISDhIiAAAAAAA4JCQkIgAAAAAAIjYqIiIAAAAAACIiPiIiAAAAAAA+IiIiPgAAAAAAPiIiIiIAAAAAADwiPCQiAAAAAAAeIiIeAgIAAAAAHCICIhwAAAAAAD4ICAgIAAAAAAAiIiI8IB4AAAAAKiocKioAAAAAAB4iHiIeAAAAAAACAh4iHgAAAAAAIiImKiYAAAAAAB4gGCAeAAAAAAAiKioqPgAAAAAAHiA4IB4AAAAAACIiKio+IAAAAAAiIj4gIAAAAAAABgQcJBwAAAASKiouKioSAAAAOCQiIj4iIgAAAD4iAh4iIh4AAAASEhISEhI+IAAAGCQkJCQkPiIAAD4CAh4CAj4AAAAIPioqKj4IAAAAPjICAgICAgAAACIiFAgUIiIAAAAiIjIqJiIiAAAAKiIiMiomIgAAACIiEg4SIiIAAAA4JCQkJCQiAAAAIjYqIiIiIgAAACIiIj4iIiIAAAAcIiIiIiIcAAAAPiIiIiIiIgAAADwiIjwoJCIAAAAeIiIeAgICAAAAPDICAgIiHAAAAD4qCAgICAgAAAAiIiI8ICIcAAAAKioqHCoqKgAAAB4iIh4iIh4AAAACAgIeIiIeAAAAIiIiJioqJgAAABwiIBggIhwAAAAiKioqKio+AAAAHCIgOCAiHAAAACIqKioqKn5AAAAiIiI8ICAgAAAABgQEHCQkHAAANwmk9HcQgGTDFc7/NwpyZDcKcGTmFwQA3xWMnAQAtxFoZECSAwLLFZAAGAHACgMCyxUQABMBwAoDAvcJMgAOAcAKAgO3Cjxk9wkWAQcBxh04ZPeVBAArZMsVkADBHShk8Z0fZAEAnxUEADcJRvSHAMsVEABFHAIARBwEACED9wnSADcQBmTAFQAQ9wk4AEAUwhUUAPcJZgDBHexjQhwEAEEcAgD3CVYAwRXKAMIVAgD3CVIAwBUAAQQQBRD3CQYAyxWQAIcAyxVwAMVlFwBBf8sVEADEZRYAAX8LfssVUADFFWkAQX/LFTAAxRVkAEF/hAqAEAIR9wksAAIQhwDAFQgA9wnA/0CUxBUIAIAMC4fLFXAAxRUYAEF/yxUQAMUVFwBBfwoByxVQAMUVMwBBf8sVMADFFTMAQX/LFXAAxRUYAEF/yxUQAMUVFgBBfyJ/pn6HAAAKAgpC1YBgQAsFf4cAxRUgAMsVEAD3FQEAFmM3Cg5j9wkUAPcJfgD3iwNjBAL3CagAyxWQAIcAwhUACAAKBApLMf4DhApLMf0CAOEDgRcgAgDyggARjX4ACsIVgAD3CQoBAGGEfsIVBwCADIJ+BBCEDABhNxDCYgQKhApLMf0CACEIggQKhApLMf0DACH0h7eKmmLADAAhBIL3Cc4AhwDWC9YLuwHBHYpiwWUWAMIVFAD3CWgAwhUIAHEo7P8KAoR+dxheYncc6v9WYgUCdxhQYgIBt4pXYocAwR1EYsIdQmL37UpiSmICAsEVygD3CSwAwRXKAMIVAgD3CU4A9wsuYgwCxR0aYsQdGGL3CfD+NyAkYgMD95UCABNihwDAHRhi94sIYgcCBAqECksx/QIAIfqHBgEECoQKSzH9AwAh+ofADAAhrIL3CSAAwBUIAPcJGAA3IeJhAoKhAAEBsQAJjAp+wW3KYY9+hwAECveLvGELAksx/gJLMf4DhApLMf0ChApLMf0DhwBLMf4DSzH+AoQKSzH9A4QKSzH9AocAwAw3HOCfcmGHACYQJhHAVQADxBULAN81gADO//wDoQABAYAMBIbfFZAAzv8EAd8VgADO/wABxR1AYUF/Dn+EFYAVhwAXjQAA5hAmEcMVzv/EFRAAAAoLMf4DyxWwAAsx/AIXjYAAxR0QYYUMQX+EDMUdBmFBf8s1EAACAqEAAgGxAAABAIwMf8sVkACEFYMVhwAmEECU9wlw/4R+gBWHACYQ9wme/xGQhH6AFYcADAAeAEMAiwAdAUAChgQSCZsNAAAAAAAAAAAAAAAAUF0=',
                'isProtected': true
            }, {
                'name': 'MKDOS V3.15',
                'address': 512,
                'content': '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lJSDbW462mtr+fX1Z0E3nJR0dXprYnFrTff1Xcc0wpSUg21uOrxra/n19WdBN5yTdHZ6a2Jwa0339V3HNMKNlP6qbW860mtr+fX1Z0E3eZOFeHuBuXJrTff1Xcc0wo2JkohvO9Vra/n19WdBN3mTkXh8i0Nya0339V3HNMKOiJS6quq/j9pra/n19WdBN4Z0kZSq63ZecmtN9/VdxzTClIeUqurrq/4K2mtr+fX1Z0E3nHSRkIxvYnJrTff1Xcc0wpSHhHB3Otpra/n19WdBN5x0fHuLbGJya2dn913HNMKUkINtbjraa2FnZ/hnQTeciXR1emticv8AAn9nUADHNMKUlINtbjraTQR/Z0E3nJR0dXprYnIEf2fHNMKUlINtbjq8YQR/Z0E3nJh0dnprYlcEf2fHNMK4lIxtbjrQBX9nQTc/mIV4e4G5XAR/Z8c0wrnBkohvO9UFf2dBNz+YnXh8i0NcZ2enXmfHNMK5xJSOb5TYZ2falGJnQTfPTp2Uqug7XlxnUqeUYsc0wpTGlPzoq0raZ/bZlJRnQTecTp2jCuhXYlz4UqeUV8c0wpTG01c9S9oAVPXZlJRnQTecTv0lvGRiXPVSp5RXxzTClLLWYlhL2vb12ZSUZ0E3nMFORS1nYvH1UqeUV8c0wpSU2GJfS9r19dmUlGdBN5yUTkUtZ2Lx9VKnlFfHNMKUlNhiX0vH9fXZlJRnQTecl05BLWdi7fVSp5RXxzTCtJS7Yl9L0PX12ZSUZ0E355dOPCdnxe/1UqeUV8c0wrWqppvFXkHV9fXZlJRnQTfnl5k8/bxD8fVSp5RXxzTCtb2UsV6U2PX12ZSUZ0E3oZrsmZSqKaBaXvH1UqeUV8c0wpTAlN0pqEba9fXZlJRnQTec7JmeWintYvH1UqeUV8c0wpTAyezeR9r19dmUlGdBN5zs3t+3VlVi8fVSp5RXxzTClK3K9O5H2vX12ZSUZ0E3nMns6eL1YvH1UqeUV8c0wpSUy/TzR9r19dmUlGdBN5yU7Oni9WLx9VKnlFfHNMKUlMv080fH9fXZlJRnQTeclOzp4vViqFX1UqeUV8c0wrSUtvTzR9D19dmUlGdBN+eX7Obh9cXv9VKnlFfHNMK1lJ/K8kLU9fXZlJRnQTfnl5nm3rdD8fVSp5RXxzTCtb2UrPKU2PX12ZSUZ0E35+aZyN3fV/H1UqeUV8c0wpTAlN1pqUba9fVnvJRnQTec7JmeWmntYvH1Y2ezV8c0wpTAyezeR9r1XWdnp2dBN5zsmZWqt/Ri8VUFAn9nWMc0wpStyvTuR9oxBH9nQTecyezp4vVi8WYDf2fHNMKUpqrL9PNH2l0Ef2dBN5yU7Oni9WKAAQR/Z8c0wpSUy/TzR8cFf2dBN5yU7Oni9WJYBH9nxzTCuJS29PNH0AV/Z0E3P5js5uH1xYIABH9nxzTCuZSfyvJC1AV/Z0E3P5iipualalWlJlwEf2fHNMK5xJSs8pTYBX9nQTc/PJ3I3ZUqV1xn2pRkZ8c0wqPGlJRopSbaZ2eUlGdnQTecTp2jCmhXYlxnAn+UZMc0wpTG0U79S9pnnZSUPGdBN5xOnae8YmJcswJ/lFfHNMKUstZiWEvavAN/lF5BN5zRTkUtZ2JcBH+UxzTClJvYYl9L2p0Df5Q8QTeclE5FLWdigKgEf5TENMKUlNhiX0vHBX+UPjeclE5FLWdimAV/lDTClJTGYl9LswV/lDw3nJROPCdnxQZ/lDTClJSk1l5FmAV/lDw3nJTBPCTHsQZ/lDTCAn+UuV7OBn+UPDeclJTN/KcHf5Q0wgN/lMQHf5Q8N5wCf5T8mAd/lDTCDH+UPDecDH+UNMIMf5Q8N5wMf5Q0wgx/lDw3nAx/lDTCDH+UPDecDH+UNMIMf5Q8N1mnPFG8Z5Re2pROpzzQNMJilNhePJ2UvLv8QZ2CKkU3z7NOJKexlE49nbvVw9M0wluUx9XBlJS71VeUJ51EN8+8qggkp5iUTv2zs1cooNE0wooCmAig1bCUlLtX1ZQsp0M3z7tIJNCUlE6YLadOIACYNMJDJMXVpJSUu1fXlAIg2jw3z8UKCiRclJROmEynTqAAvDTCQ9DFXryUlLtX15TGZEE3z9VEJFydlE6YTKdOJNo0wooqgKLF1dg8vLtX15TGTks3z14+JEWnYqgCmEynTiCqXjTCo7zF1V48vLtX1ZQslEs3z1c9JKe8lE79J7NXKKhONMKju8XVTp2Uu9VXlCeYSjfPTjwkp9iUTj2du9XE0TTCsrLGXjyzlLu7PEEkJ0E3Wc5XUbxnmF7alE6nSLM0wgx/lDw3nAx/lDTCDH+UPDecDH+UNFMNf2c3Zgx/ZzUQVQ1/9TcNf2c49g1/9RUAD39nwhU4MPtJSYN+L08uEEAzMjk2zNzjXH3k2zD7AX4vTy5QQDMyOeQ2zNzjXH3k24cAHwCwAC1/ZwBQDX/1MRAADX9nEBANf/VVEVMNf2c3Zgx/ZzXCCH+UZ2eUlDw3nAd/lGJn2pSUNMIHf5RiZ2falDw3nAZ/lFcCf2e8lDTCBn+U/AN/Z6c8N5wGf5QEf2edNMIGf5RiA39n2jw3nAV/lE4Ef2ezNMIGf5QFf2c9N6EqmAR/lFsEf2fHNMK5BH+U0QV/Z0E3P5gEf5RcBH9nxzTCucMDf5TWBX9nQTc//Z0Cf5ROXAR/Z8c0wrHFAn+UsNpnc/lSZ2dBN5xOnZS4TmJcAPBN9zFnxzTClMbNPJhL2mdr+fVSZ0E3nE6dpLteYlz8/0339WPHNMKUxtNXPUvac2v59fVnQTecTjxFvGdigPBrTff1Xcc0wpSk2GJfS9pra/n19WdBN5zBTkUtZ2Jya0339V3HNMKUlNhiX0vaa2v59fU=',
                'isProtected': true
            }, {
                'name': 'VD.SYS',
                'address': 512,
                'content': 'dwC8A9ct/J3SgASH16fP/8AAAQOHAPcJagDBFdAAwhVsAsAVCwCRFAJ+wRXQAKAA8YsBAKAA35UEAFmg9xdUoEAAHwpUoMIVdALRFYoAUSTRFSE6wBUHAJEUAn7BFdAAoADfHRwAVKCHAACACwAYBQAAQDpNQwAAAAAAAAAAAAAAAAAA9wkkAPcJOgABh4cAoACgAKAAoADDFQABAArBFQABwhXEAwELfwCAfcEV9gLCFTKfwBXOAIAMUhQCfsAVAgAgiIcAwxUAAfOVBAAcAMEVggDCFQA+AAr/CU59wRUAP9ElLqcFAsklDFMCAqEAhwCxAIcAwAsQA8AKBALfFQTgLIAKAcEVLIDAEcBlEAAJIAMDdxLo/wkQhwAIAQQBoADmFQYACAHmFQIABQEmCtesHAAEAAMDzm3E/4cAzhAEEMBF4P/AAMAMwGUAQAMQxEUfAMQMxAzEDMQAFyEEAAODJYLDZQAaABHADMBhwGVKAMUVzv/DCxSBwQsKgQ0S5hTNFQAckhVKfs0VAByDFYcAzRUAHKYUDRKTFYEK6wL0AcNFAMDDZQBAhArXAd+VBwAqALEA6QEADAAsADwAXAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALqcMUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAHsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtxUeAMYVAALfFcQFBAD3CTL89wkqAN8VAKAMoB8KPKDHFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcVmgc2mvcVgC4Amt+VBAAKoDcKRpo3iu6ZN4rtmcUVnAfEFaYH9wkyAUAQ0BULANAVpgcQCh6I8YsBAHECxRWmB8QXtgBEYUQhaoZAlWgDF6AgAPmDxQr3CQABfYfAFdgAF6IgAPCDF6IvAAYDF6JcAAMDF6J/AFQCdxGK+jcRiPrIlX8AMQoEADEKBgDfFdIAxgDDHW6Z85cKoBwANwq8mf8Jbpk3h/8JapkFh/eSWZn3klKZLwHAFQEAwx1MmcIcGAAQA8NlKAHDZRgAy6X/APsD86V/AAIABAILoAICgArsAY5+JhDDHSCZ/wkqmRKHxB0WmeYQ/wkgmYMVgBULkDOKAQAzChQA95L6mPeS+Zj/CQyZxR3u+cQd7PmUARsByRULAPEVphUCAB6I8YsBAIoCyRWKAPEXtAACAPEXtgAEAOYXVKAfilSgHoifFVSg8YsBAOMDdwAyAMIV1gDSFUA6RCERhkCVCAPApQoABQMXoAkAAgMSkPQBEoqXIOYA/IfBFdAA1wuxAIcA3xUAoAQA9xUArHKYhwBWRElTSy5DT00AAAA=',
                'isProtected': true
            }, { 'name': 'VDISK.COM', 'address': 16384, 'content': 'TUVOVS5NQwpWSUVXLk1DCkVESVQuTUMK', 'isProtected': true }, {
                'name': 'MC',
                'address': 512,
                'content': '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',
                'isProtected': true
            }]
    }, {
        'name': 'MC',
        'files': [{
                'name': 'MENU.MC',
                'address': 512,
                'content': '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'
            }, {
                'name': 'EDIT.MC',
                'address': 512,
                'content': 'DFO3FVwN9xcEACYNLokAiSiJCImBQEZpbGU6IAAApojfFQBAggDfFQAEhADfFQBAhgDfFQA8iADBFUBDwhUgANEVVVWDfgCJ9xAYDfcQJg33EBIN05UKANOVCgDjqMNlAA73EBoFw2UAAvcQkgXDZQQA9xC2BcNlQAH3ECIGw2U4APcQLAcAiSiJwRXQAEAQ0BUDANAdzAwQCtMLwhUOANCUgn7AEcBl9AAfEDygHojxiwEAAgN3AHYM92e2AKYMwR2gDHcgngwFgtGL+wLhlQoA+AHFEcVljgzEEcRligzDHZIMxhX+AcARwGXq/x8QBAD8lQoAAABAE+CVCgA3CngM9wn2BPcddgRyDPcJfAXAEcBlVgzFFQUAEApCf/cJigmnDPcJ1gT3CSoG9wncAfkB9wlqB8QQwBABAYAKBBDFHfoC9wmMCXkDNyEYDHaGFaX0AvcJfAn7AsUdGAwCCsIlFAANgUQhBIL3CTAIlaT3AaWo9wkcCAEKFIhDEQkBAxH3CQwI5hB3EeoL9wmAAoQV9wk0AcQg/IeHAPcJsgiCCsIlFwD6AvcJAAMVARaIphDmEGYQ9wnQCPOGwiUXAAkD9wmsB/cJ1Af3CYgIUqVDEfEB9wmaB4EVgxWCFRSIwiUUAAGHhwDFHYoL9wmuB4UKdxGAC9ILFIj3CVgIxRDAFQMA9wmWB4UKdyFYCwOGB373CV4HwhUUAOEBigH3CX4G9yA+CwoD9wk2AdeiCgAbAvcJagb3CVAIAgL3CSYIwBDmEIMK0JQ3IBoLBILQlDcgEgv4g4MV9woKC/cJMAgChvcKCAujAfcJ3AXnhfcJpAV3APwG9wkmBsAd6AqACjcg+grbhrcK3ApmEAEQgQohmAMgAwMhmAMg+gKBFdOVCgD3CawHwAz3CS4IFoj3CcAG9wnaBxGGtwqyCg4B9wneBfcJ1ga6hUMR9wnSBfcJuAe0A8CU9wngBncQigp3AP7+wBUJAPcJPgWohROQ9wnIBncQcgq9AcCVIAD3Ceb/MgH3CcAE9wls/ysBF6CUAAgC5hCmEDiJghWDFfcJ7gjiARegIADfhiYKxBHEZdEKzIsCAncALgeOChSg+QKEFcQMxGHEZUAKBGNMADcKHgrBCwUC9wlIBfcQEgqHAHcABgf3CToF9yAMCiYDwwrBCxwCwgr3CVwEQxEBERSIFoisAfcJGgX3CQgGxS3WCT0D5h3UCfcJLgT3Ccb/txXICfcJLgQBEXcAIgTmksuVCgD3CSAEi5XhAfcgqAkmA8MKwBUaAPcJEgf3CcYFdxGmCfcJoAXPAfcJxgT3Cb4FFYVDEdKk9wnqA0MRARF3AO799wmsBPcJpAV3IWoJBgP3CcQD9wkyBXcAIv73CVgGYgH3CYwEwx1eCcAVEgD3CboGNwpECXcAhv0WiPcJmAOnAaEB9wlgBooJFohmEMUVQAHBFRwAwBWaAPcJjgbAlX8AEoj3CbgHFyAYAAkCdyHe//UDwJUgABKIYakSiO8BwCUKAAwCwJUgABKIzZUKAIEVFIjAFZoA9wlQBocAF6AJAAQCDZDAlSAABAEXoCAA1ocNkBKIUaXSAfcJjATAFZkA9wksBocA5pLLlQoA9wnSBEMR9wlyBDcLpgiLlQEKFIh3AB7+9wm+BfEI9wnCA/cJdAL3CcYF4wjApR8AdIfApQgAmgPA5RYAiIHADAdg1AFpAdkBlQESAREBkwEjAUQB9wtaCBgDwx1UCPcJdARDEXcRSgj3EE4IdwDk/sQVFAAmESYQFyAKAAkD9wlE/gSFgBWEFQt/hwCWJYcA9wmG/vYBxRUFCsQdFAhlA8ELYwLAEADhYAfFCxICwR0SAMHt9AfB5QACASBWhjcQ7AfFFQC8BeB3EfYHARFVlAJ+xRADEfcJugPGAcELRQLEHcoHQgMAEcUdvgdEYTch0Ac7gvcJ3AQDhvdtsAeyBzcRpgcVpWSZxSD9AsUdsgfEEFSVAn6oASoBxBHEZQQIBRHARaAAzIsgAxSg/AJE4cQMxGHEZbYHBGNMAMMdaAfMAcQVAL7E7WAHdwD+A8MdWAfAFQoA9wl8A3chSge9A8UKQxEIfoMK6wH3CTwExBUEvsAdPgf5AwGAAAvACvUDBRDAbSQHwC04B++H9wlEBAKGd2EcB2YRxR0OBzcQCgdQpWCZQyH9AoATFZUCfvcJBAOAFfcL/AYFgCYQ9wlO/IAVBX6HAPcJEARiB7cK4AbAHRAANxDkBggKhwD3C9AGFQLEFcC/AJUSAxegEwAHAgCVJhH3CewB9wkw/gMBJhH3CUz8AoWEFe4B1guyAIcAxB2oBjSK/v83CpQGhwD3CbgDEQcECoIRwRUcAMCVfwASiPcJHAUXoDAAGIcXoDkA9YISiIEKJhHEDCYRxAzEDIRlwOUwAARg6QGGIOcDhBXAFSAAEojBChKI4AEXIBgA9AMXIAoA2gKGEMAVIAASiMQLBwMmERaI9wlQ/76FhBUHf/cJWgOdBocAwBWaAPcJfAMfikUAwBUAMPcLCgYCA8AVAAPfNUAAzv8DAzcK+AUFAQh+twrwBZ+KRQDAFZoA9wlKA/cJegQXoJQABgMXoIAAA4cXoKAA9Yf3C8IFCwPEHcgFFyH/vwMCDIp3ABj/DJC3CrYFFoiHAPcJyAEBCkMRFIiHAOYVJgr3CbgBBArmFT8A9wnwAgUD9gsCAAQCDiEFh5YlhwDELXAF+4NXpQkAAgOECu4BxEUHAMRlCAAOIeiHhBXWC4cAxBAUnQEANyFkBfuD9wpeBYcA9wkcADiF9y1SBUoFNIa3CkoFxB1GBTSZAQADIfyChwD3Cy4FJwL3CUABdxEmBcQdDAXEZQABNyEcBR2GJhHOZQABtyUQBReC5JUKAIQKNxEIBeYQTuH3CZoAA4TWC/cJ3AE3EfYEdxHuBMMd7ASDZbcK3gSHAEcB9wvWBDoDJhHmEOYd0gTO7coExR3OBMXtyASF5Q4Hwx2kBMQQRGE3EZwEzJL3ILAEAgPkqPoBNxGmBGYRxB2cBMUdngT3CTQAxR2UBAUhBwNUlcUtcAT8hsQKNxFoBIUVNwp2BM7tegSDFcNtbgSEFfcJfAEChndhVASHACYQwBUAAfcJrgEFA1SVBX6AFbIAhwBMk4AVhwDEEDcKMgT3CVoAwB3m/BCVtwokBAUh+4P3CTwBBYbEHRYExAo34Q4ExBBUlXch/gP8g8QKNxH2A4cAxRBmEKYQ9wlYAQQDQJX3CTYA+YT3CSL7ghWBFRSIhwDFEOYV//+FYwMBxRDmFQEA9wkuAfgC1gsFgXchtgNqA6IAhwCFCocAFyAKABwDFojCHRj+QiAdhhcgCQAKAiYQwBUgAPcJ4P85hcE1BwD4AjUBJhDORYD+lyUgAASGX4olAMBlQAD3Cd4AFogfiiUAhwAWiD8BJhCmEGYQwRUyAAAKRAxADMBlMAASiIEKwhUFAAAKxRUDAEQMQAxDf5cgAQAFA8ALAwJXIBcABAPAZTAAEoiBCpN+gRWCFYAVhwD3CVb6wBUKAAIBwBUMAPcJdgCHANYLZhHFFUAAQBFBEQQQX1HO/wF/X0HO/wQQAX9JfoUVsgCHAPcg2AKHAPcg2gKHAIUTRWMmEEGVAgGBChKIQJX8AoAVEAGFE0VjJhBBlcCVIACBChKI1Yv6AvMBgRNBYgIK9wlwAc5lAgAWiIcAV6MKAIcAF6CZACoCJhBmEKYQ5hAmEWYRwxdwAMEQwWWAAgOA3wmchBQBwRDDRcD/whDAFUAAA+ADC0UQBWCAYMQVBQDCEBGKFYqDfgFgBWAHf4UVhBWDFYIVgRWAFYcAF6CaAAICdwDgABegIAAHhxeggAAJhxegoAAGgocAZhHfCZyEhRWHACYQZhCmEOYQJhFmEcBFAP/AiwKAwOUgAMAMAxDADMAMwGDAZX6TwxdwAMEVQADFlyYBGQMXIL6UFgPCFQUABJQLkQSMC9FLwUNgAoDD5QBABJQLkQSMC9FLwUNgAoDD5QBAk34NAcIVBQALlENgAoDD5QBAC5RDYAKAw+UAQIt+34slAAsDwxdwAMIVCgBLisNlQAACgMPlAECHfp8KcACfCm4AhRWEFYMVghWBFYAVhwD3CQwAHwqw/98JCIJfCrD/5hCmEMMXcADDZYABwhUDAN8JHJNLioR+ghWDFYcAJhDmEIMQwwDCRQD/QJT3CYz+A6ABA4Z+gxWAFYcA9wlC/PcJMP0fCkQA3x3IAAQALonfFdgCtP8fCrD/wBUQUF8KJAAYiSAoCIkbUlNhdmUgZmlsZToAAAiJ11efKHB1c2ggS1QgZm9yIHF1aXQpAB8KJADfFRlVcADDFdYAwhUOAB6JN4fXp9YAIADzg9en1wA6AO8D16fWAH8A6wPfFZgAtP8uicEdfgDDFQBAwh14AELgwgsBAtILgBBTlAJ+wRXQAEAQ0BUCANAVAECQEOYXVKAfilSgHojxiwEACAM4id81QADO//wCwRXQAB6InxVUoMAVAAAfEAQALonfFdgCtP/fFQBAggDfFQAEhADfFQBAhgDfFQA8iAAfCrD/Hwo8oF8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXPXa9ez0gvaA9lL1yvWY9GL1hvQw9eb1OPZ89E72XvWm9bL+qvfs92L3gvag9+T4zPgU+VD4Hvk6+BTtz8TFzNg6ABTw0sXGycvTICAgICAgICAgIABFQldURFVJTU9LUE4V7cHL0s8AFPDP19TP0jogICAADAAJCAoTAxQVFhcYGRobBwIeDAAA',
                'isProtected': true
            }, {
                'name': 'FILER.MC',
                'address': 512,
                'content': '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16fP/8AABAOJjInSycVVAPcLZP4DA2aSiYyJ1YIKwWVAAAKAweUAQBl+t4pk+YIVgBWBFYcAzuMCACYQwJey/9+LRQAEAh+QRAAfkEUAgBUCAIMT0yTAFPcJIgLBFMISwWUFAMJlEgDDHSoAphBmEBOUQn7AZUAAgOMCgMDlAECBFYt+UxCTFcDlQABAYPcJ8AETENcQmg+HAMMd+P/AGMIYwRhmEOCYQn7A5UAAgGP3Cc4BgRWKfu0BgxPAFPcJvAHBFMIUzhDDFSANxRVcDcQVCAD3CdYAwOX+AfcJogFmEAiKwGVAAAKAwOUAQMiV/wDEFQYAwGVAAAKAwOUAQAiKB3/A5b8B9wl2AVZ+gRXEFQgA9wmwAEDg4Av3CWIB0JUMABCKZhAQikJ+gRUQitCVMAAIisBlPABA4AKAwOUAQJJ+FCX3CWQAUMVQxcBlPgACgMDlAEAIf8DlfgL3CSABxBUFAAiKwGVAAAKAwOUAQAd/yJX/ABQlwGVAAAKAwOUAQAiKB3/A5T8C9wnyAFh+xBUHAPcJLgBQxVDFSMXAZT4AAoDA5QBACX+HAEjF0NRIxdDUwGU+AAKAwOUAQAp/xBUDAIcASMXQ1EjF0NRIxcBlPgACgMDlAEALf/EBZhD3CUgAgROACvcJZACACoET9wlcAMQVBACACsBlPgCA4wKAwOUAQIET0QtQikJ+C3+BE/cJOgCACoET9wkyAIEVwGU/AEDgAoDA5QBAwhXwAMUVDwDANQEAAQPCAIh4gApQikJ+wDUBAAEDxQBIeYcAwhX8AMUVPwBA4MBlPgDqgMDlAEDnAfdtSPYk9/c1AEAe9wMC92UAQBb3hwDAbTL2wDUAQAICwGUAQIcAwBUAGgF+3zVAAM7/JAPXFQUABQAXjQAAwJey/9+LRQD9A6YQ5hDCFQsAwxVAAN8XNITO/8AQAX7fFz6Ezv/AEAF+wwqMfoMVghUACsCXRAAfikUAhwD3Crj/0oDiAQAA/D8AAADA//8DAAD8//8/AAD/////AMD/////A/D/A8D/D/D/AAD/D/z/AAD/P/z/AAD/P///AAD/////A8D/////A8D/////A8D/////D/D/////D/D/////D/D/////////////P/z///z/D/D/P/z/D/D/P/D/D/D/D/D/P/z/D8D/////AwD/////AAD8//8/AADA//8DAAAA/D8AAAAWJBWPcAYAAAAA8AA/wAPwADAAPAAMAAAADwD8AMADAA8ADAA8ADA8ADAA8ADAAwA/APAAAAA8AAwAD8AD/AAPAAAAAPzA//D//P/8/////////z8AAP8DAP8PAP8/AP//A///D///P///P//////8//z/8P/A/wD8APAAwAAA//////////////////////8///8///8P//8D/z8A/v9+Av4EDgCOAg4FHgCeAh4F8gZUB9oFPgawA1QCcASfQTpcTESfAJ8gQTogIJ8AGhsIGQoMAwAgLi4gICAgICAgICAgIACf79vJwsvBIN7Uxc7J0QAgy8HUwczPx8EgIzCfAACfICAgIOTJ08sgICAgIADOxSDXIMbP0s3B1MUgACAgIE1LLURPU58AAA==',
                'isProtected': true
            }, {
                'name': 'EXTR.MC',
                'address': 11538,
                'content': 'wRUoLcARwGUQAMIVMgERlIJ+XwAoLeYQSIkmASqHBBDFF7YABWGDE8NlEADXqC4A/QITqYQKBSEchhejCgD6AxejCQD3AxejIAD0A8EQwhUDAAUhDoYXozoABAMRpQICiH4JAQUhBYYXpQoA+wJ3AMT/gxWHAAUh/IYXowoA8gMXpToA+ALBFdAA0RULABEKEQrMpV8ACgPMpS8ACAPMpQoAJAMFISKGEZXzAYQKwhW8qwUhHYYXowoAGgMXo18AAwLSlQoAEAEXoyQADAKDE8AVDgDTCyYQwJSyiLSIEpCAFQd+AQESk4QK4wHCFbyr3xW8q1QAnxBSAN/lvKtSANGVIABXIOoA+4fmF1IA5hdUAAyInxVUAJ8VUgDAFaCrwRVKLsIVBAAZEIJ+wRXQAMYVAKxfAFKrBAAIABwAEABNQy5FWFQAAA==',
                'isProtected': true
            }, {
                'name': 'HELP.MC',
                'address': 512,
                'content': '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',
                'isProtected': true
            }, {
                'name': 'MC.EXT',
                'address': 16384,
                'content': 'VlhUOkA6VlhfXzNOAzExMSRfCkVEUDpAOlZYX18zTgMxMTEkXwpUWFQ6QDpWWF9fM04DMTExJF8KQ09NOkA6S01PTl8kXwpCQVQ6QDpLTU9OXyRfCk1BQzpAOlRVUkJPN01LX0xPJF9TQwpBU006QDpUVVJCTzdNS19MTyRfU0MKV1MgOkA6VFVSQk83TUtfTE8kX1NDCkFSSjpAOkRQUkVTU18ZIEEkX1IuCg=='
            }, {
                'name': 'VIEW.MC',
                'address': 44032,
                'content': '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'
            }]
    }, {
        'name': 'USER',
        'files': [{
                'name': 'KMON',
                'address': 48640,
                'content': 'HwpOoMUXUgAzAx8KUgDEF1QABWHBFdYABSEJggCVF6AgAAWHF6BfAAIDEZD1AdGVIABXIOoA+4fBFdAAyRULAPEVFL8CAB6I8YsBABECxRUUv0QRxWe2AAQBxBUAAMUVAAAFIQWGF6MgAAaChAr5ATcK2OFfAACgwRXWAAUhG4IAlRegIAAXhxegXwACAxGQ9QEfEVQAHwpSAAUhDIIXo18AAwLUlQoAAwEXpSAAA4efClIA8gHRlSAAVyDqAPuHNxGY/3cRmP/3FVq+fuHBFdAAyRULADEKAgDGFQCsHojxiwEAxQLfiy4AAwPAFZoADojAF7QAFyAAAgKGwBf+AcYVAALfFVq+BADfFVq+CADICaMB',
                'isProtected': true
            }, {
                'name': 'MS-DOS.USR',
                'address': 65535,
                'content': 'DFPXJwSgO4EBA4cAMInXJxSgAL4Gh98X/L8UoN8X/r8ioCSJSRH8zdXM0dTP0iBNU0RPUwAAJInyAiDXxdLTydEgMy4wAB8KJAAACgF+AX7BFQC+wxHDZRQAwhX+AdGUgn7fFQC+TqCHAAEBQgHBF8YAQBTARfz/F6ACAAQCH4oqAF8AEKJRJEMQwhUIANekLgAdA4R+xBDECsIVCADXpC4ACgOEfteoIAD9g8QgAYPMkoQKAxENAcyc/v9EEMRlCADUlS4A1JTUlNSU8wHDZQMAwWUQABOKwSD9g/cJEgACh18AJKLXpyoADADIA7EAhwDXJxSgAL4Ghx8KTqDflQwAKgD0AcIXDKDBFfa/wmULAMAVAgD3CTIBwBUDAIIK9wkoAcIXDKAACoDcFADAAIDcEwAyEDYBwxcMoMIQihwWAIOcEAAACoBiwn6AbA4ANxCYAIEQwWUSAAMKQ9LDAEPYwRCBDIEMgQyBDHdgfAD3EBoAAQrBZRAAw363nA0AfgDCZYAB/wny4GiHxBVwAMIXDKDCZYABhRDF5UAAAApBEZei5QBCA5EcFADDFQgAg6wLAAIC0ZV/AJGUOwPDfoAKl6IgAAaDV6ggAP0DgQrRlS4AkZSRlJGUQxHDZRAAQyADA9GVIAD7AckVDADC5QsAgxwaAAYDw+UCAAMDyWUEAMN+0QuJHBwAyWX/AQkMCYrJAKYcHgDOAA6KjgyRZZEcFgCRHBwAxWUYAMJlIADECrYCwxcMoDMQGABzHfj/GgDzFS6nAAGhAIcAUqQCAgN+hwDWC9+VDAAqALEAhwAAAgEAAgAAAA==',
                'isProtected': true
            }, {
                'name': 'RT-11.USR',
                'address': 512,
                'content': '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',
                'isProtected': true
            }, {
                'name': 'TREE.USR',
                'address': 65535,
                'content': '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',
                'isProtected': true
            }, {
                'name': 'CALC.USR',
                'address': 65535,
                'content': 'DFPHCw2AwRUArMMVgC7CFQAIUxSCft8VAKwMoF8AgC7BFdAAQBDQFQsA0BUArBAK0BVAOtAVQVLQFUlG0BVNLtAVT1bQFUwgEAoQChAK9xVyL2hxHojxiwEABwMeiPGLAQADAzcKVHGHADcKTnEfClj+EInAFcxLGIkmdsAVDk0YiSIMwRHBZW4A9xUOVDwA9wkyAPcVDlkyAPcJKAD3FQ5eKAD3CR4A9xUOYx4A9wkUAOYXHADfFQCsHAD3CZIAnxUcAIcA5hUFAMAVAABmEBiJBAyBFd8d8v9wAN9lAQFwABCIzgoEgfdlBgDe/+0B1guHACBDeAAgMQAgMgAgMwAgKgCfQZ90bgCfIEtUnwAgNAAgNQAgNgAgLwBzn1GfcgAgpwAgNwAgOAAgOQCfU59pbgBln1ifcAAgLgAgMAAgKwAgLQCfQ59vcwCfIEyfZwD3CTQCwRUmMsIVHAARioJ+9wkCATcKXAICAfcJ5gA3kC4CwBUmMhSJMjL3C0oCOgLAFSYy94soAgUC9ws2AgIDA4ksMsWdCALEFUwyVKECAsyJEwFUoQICzYkPAVShAgLOiQsBVKECAtGJBwFUoQIC0IkDAVShFgLPicAVLDIDiSYy9wmyAcEVDwDCFQQAFIgfiSwywBUgAA6IDoj3FQEA0gG7AfcLzAEQAsAVLDIDiSYy9xUBALwB162UAT0A4QP3HYwBsAF3AFD/wBUsMsWdpAFXoSsAAgIEiSYyV6EtAAICBYkmMlehKgACAgaJJjJXoToAAgIHiSYy951SAXYBdwB+/waIN5BoAd8VRDJUAN8VAQBSAPcJHgGBChSIwxUyMjcKLAE3Ck4BwJVfAA6IwJUgAA6IFIiQiBegAwAEAvcJWAHWC4cAF6AMAAUC9wlKAdYLdwCo/hegMAAMhxegOQAJgtcgQTLghhOQDoiBCvcJKAHaARegLgAGAveL0gDUAreKzADxARegRQAGAveLwQDLAreKuwDoARegGAASAtcgMjLCA9es//8uAAICN4qgANes//9FAAICN4qVACOKwQqzARegOwAoAxegCgAlAxegLQAtAxegOgAiAxegKgAfAxegIAAfAxegLwAfAxegXAAcA8BFoADEFUwyxRUGABSgAgNDf90BE4r3CY4AARDAFSAADohAEIcAwJUrAAgBwJUqAAUBwJU9AO4BwJU6APcVAQBCAOgBwRUPAMIVBAAUiMMVEgDAFSAADojCfocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU0NBUUxYAAAMMTIzKkEDNDU2OlE9Nzg5U1guMCstQ0wAACYQ5hBmEKYQwxVUMsEVDlT3CSgADobBFQ5Z9wkeAAmGwRUOXvcJFAAEhsEVDmP3CQoAghWBFYMVgBWHAMIVBgAToAUDwWUGAIV+sQCHAMHlQgBmEMMVGjPCFRgAwBUFAFMUAn7BZTYAh36BE8FlQgDCFRQAwBUGAHGSv/+BCgR+MYr//8FlOgCLfsAVADABfoEVwxUaM8IVGADAFQUA0RQCfsFlNgCHfqEAhwA=',
                'isProtected': true
            }, {
                'name': 'ARIFM.OVL',
                'address': 512,
                'content': '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',
                'isProtected': true
            }, {
                'name': 'DAY.USR',
                'address': 65535,
                'content': 'DFPBFdAAQBDQFQsAyBHQZXgEEArQFUA60BVURdAVS0TQFUFZ0BUuRNAVQVQQChAKEAoQCsARwGUAAx8QPKAeiB8KPKDxiwEACQLAF7QAARDB5QgAwhUEABEUgn4fClj+9wlUACaHwRXQAEAQ0BUCAMgR0GUMBNAVCADQFUA60BVURdAVS0TQFUFZ0BUuRNAVQVQQChAKEAoQCsARwGWaAh8QPKDmF1SgHwpUoB6InxVUoB8KPKCHABCJwBUmRBiJFmAIiedZnyArny+fLZ8gLSDNxdPRwyyfILG1uSwgS1SfAMUVKEjBEcFlGgNfEXAAQJQOiECUDojFZYACyYv2AoEKX4okAF8RcABAlA6IQJQOiB+KJAD3CboA9wloAZCI9wliAcURxWVcAxegAwACArEAhwAXoAgABQJCE8LlBwDsg40QF6AZAAcCQhPCZQcAtKABAOKCjRAXoBsABAJ0owEA2wONChegGgAEAlejAQDUA80KF6A7ABICzRUBANct/gIMAAMDtwr2AsUB1y3uAtAHwwO3CuYCNwrkAvQBF6AtABMCzRUBANct1AIBAAMD9wrMAuoB1y3EAsoHrgP3FQwAvAL3CrYC4AEXoAoApQKhAIcAxRUrSMIVRQDBFRIAFYpCfsVlLgCHft8VK0VwAMAdjALADOALwGHAZfABARIBYAIKEIjAFSwgDojAAA6Iwh1qAvcJ3ADCHWICwuXKB8QRxGUgAcIKA4HEZRgA+wHAHUwCwAzgCwRgwRUBAMUVrEUfCm4AApMDCsVlgAKDCoR+QhBfEXAA1yAHAAICX4okAPcJjgAfiiQAdKABAAoD1yAHAAMCAwrF5X0RwhUBAIEK4wGHACYQwh3yAcLlygfEEcRlsADCCgOBxGUYAPsBwB3cAcAM4AsEYMEVAQDFFaxFApMDCsVlgAKDCoR+dKABAA2GdyC6AQoD1yAHAAMCAwrF5X0RwhUBAIEK7AH3EKIBwhUKAFWKVYrFZT4AhX6AFYcA5hAmEcILFgMECsMRw2U4AAAKywsSA4AKwuL9gMJiwGUvABegMAACAsQLAgOECg6I0wvuAcCVMAAOiIQVgxUfCm4AhwDoA2QACgABAAAABh8CHAIfBR4HHwMeBR8BHwQeBh8CHgQfBx8DHAMfBh4BHwQeBh8CHwUeBx8DHgUfAR8EHQUfAR4DHwYeAR8EHwceAh8FHgcfAx8GHAYfAh4EHwceAh8FHwEeAx8GHgEfBB8HHAcfAx4FHwEeAx8GHwIeBB8HHgIfBR8BHAEfBB4GHwIeBB8HHwMeBR8BHgMfBh8CHQMfBh4BHwQeBh8CHwUeBx8DHgUfKAAvADYAPQBEAEsAUgBZAGAAZwBuAHUA8M731PPS/tTw1PPCAPfTACDxztfB0tggAObF19LBzNggACAg7cHS1CAgACDh0NLFzNggACAg7cHKICAgACAg6cDO2CAgACAg6cDM2CAgACDh18fV09QgAPPFztTRwtLYAO/L1NHC0tggACDuz9HC0tggAOTFy8HC0tggAMsHBAAPAAYAywcEAA8ABgA=',
                'isProtected': true
            }, { 'name': 'TEKDAY.DAT', 'address': 13054, 'content': 'ywcEABwABQA=', 'isProtected': true }, {
                'name': 'FIND.USR',
                'address': 65535,
                'content': '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ICAgICAgAAD//wEAfk1DLnRtcCAgICAgICAgIAAAAMD//wMAAPD//w8AAPz//z8AAP////8AwP////8D8P////8P/P////8/////////DzzAAw/wAzDAAAzAw/DwMAzDw//wMAzDA//wMAzDD/zwMAzAP/DwMAzw//DwMAz/w/DwMAz/A/DwAAz/D/zwAw///////////P////8/8P////8PwP////8DAP////8AAPz//z8AAPD//w8AAMD//wMAABZof5NwBgAAAPw/AAAAwP//AwAA/P//PwAA/////wDA/z/8/wPw/w/w/w/w/w/w/w/8/w/w/z/8/z/8/z///////////wPw/////wPw/////w/w/////w/w/////w/w/////w/w/////w/w/////w/w///8/w/w/z/8/w/w/z/w/wAA/w/w/wAA/w/A/////wMA/////wAA/P//PwAAwP//AwAAAPw/AAAAFiQViXAGAObByszZLCDVxM/XzMXU188tANLRwN3JxSDNz8TFzMkg0M8tAMnTy8EsICDOxSDOwcrExc7ZAJ/wz8nTyyDT18/Cz8TOz8fPIM3F09TBLi4unwCf5M/Qz8zOxc7JxSDEwc7O2cguLi6fAJ/6wcvS2dTJxSDGwcrMz9cuLi6fAO7BINfJzt7F09TF0sUgIM7Fz8LIzy0AxMnNzyDOxSDNxc7FxQAg09fPLQDCz8TOANnIIMLMz8vP1wDPx88gwszPy8EAIMTM0SDTz9otAMTBzsnRINfSxc3Fzs7ZyCDGwcrMz9cA6cTF1CDQz8nTyyDOwSAAICAgICAgICAgICAgICAAAP+VAQCW9tcVgBwAABcKAADfFRBccADBEcFlyf8CChCIv4p49uYRzmWKBJcVAAAXCgAAHwpcoB8KXqDXFf//AADXJ7L/AwABAocA1x28/wAA9wm0AvcJsALfFR5ccAB3Cs4CwJ829sBlQQD3CawCwBU6APcJpAL3CZwC3wtcoCYD9wus/zUCwRcMoEIcGADBZSgBwWUYAMml/wD7A8mlgAALA8mlAgAIAvGlfwACAAQDsS0CABAAAQOUfvcJKAJ3Cm4C9wlQAncKZgIDAfcLbv8PA8IVMVzBF3AAQuDDFQoAphARioJ+ghXBZUAAgeDIfncKPAI3Ckb/9wmKAwGGhwD3Ca4C3wuy/8ERwWWmA8IcGAATA8NlKAHDZRgAy6X/APsDy6WAAAgDy6UCAAUC86V/AAIAAQPREJF+EQr3C/D+OgLDFwygwhwYADUDw2UoAcNlGADLpf8A+wPLiwMDy6UBACgC86V/AAIAJAP3CUwBIQPmENMLxRHFZXj+5hUOAMCUtIhXoyAAF4NXoyoAFANXoy4ABgIXoC4AAwPOCvACBwEmkECVtIgWoAICzgroAtYLgxWzfk4BgR0CADcK7gHmHYr+ZhDxiwEAGwPFFwygRB0YAMVlKAHFZRgAzaX/APsDzaWAAAcD9aV/AAIAAwJNrAEAAQMQf0ER9wnoAPcJFAGBFcMdAv5LEPcLoAECA8NlABDO4PcJzAAACvcJ+gD3ZTQA5P33HeD9Iv7mF3AA3xUtVHAAtwrU/cAd0P2mELCIghWfFXAAhBXAlPcJygAEf64BwR3U/UUUBgLfC1ygAgJ3ALr9hwBmEGYdEACfY1ygn2NeoMARwGU4AjcQrP03Cqz99wm4/fcV//+i/Z/jXKCf5V6gtxWS/XcAov3EEcRl+PoDAcQRxGXE+sAQ0AvFFQ4AEKUBAkN/hwD3Ceb/EQP3Cdj/DgOXCgAAwB36/+YXcADfFRpUcACmELCIghWfFXAAhwDEFQ4A0QtmEAFhV6ggAAKCxAr7AYEVQJSyiPcJFgAFf4cAwJdcoPcJCgDAl12gAgHAFVwA1y0w/UAtAof3CRIAP5Ak/bcKIP3XCwAAAQMOiIcAZhEmER8J5pDmF1yg5hc6oOYXcADfFRdncADBEcFl/PsQiB8KXKAfCl6g9wke9fcJ3PifFXAAnxU6oJ8TXKCfFV6g9wkIAfcJMADAFYAswRWAHMIVAAERlIJ+9wnWAB8J8pCEFYUV9+UAEGb89+UAEKT81xX//wAAhwDXLAABLqcMA8AXTqAFAx+KKgDQC8gJBIbDFwygMwoYAIcAwBUAGgF+wBey/981QADO/w0D9xUEABYA9xUKABwA9xUAGt7/9wmQ9waIhwDXCgQA54D3C4r3BwLXCgAABID3FQEAvv8DAfcVABq2/18AUoL/nVT5cvIfigug3xUUZ3AAwRHBZf76EIi/ilzy9wlCAAGGhwDXLAABLqf2AtcsGACoAPKGwR0K+cEMwWURANCI64f3nzLyEfnAFRRnwRUKAMUVGQAQikJ/wGUnAEd+oQCHAMMXBqDznw7yHACOiJSIhwDDEcNlEvnCFRsAwRUGANDEQn7AZToAh36HAN8VDVRwAMERwWVmARCIRokJABCIhwDEF3AAdIoAAnSKQAKHAN8VEVFwAMERwWUyARCI3xUgUXAAwRHBZQb79wnU/5CI9wnO/xcgCgDqAxcgAwACAncACPMXIBgADwLmEc5l4PqBJesDwQrAFSAACZDfCnAADojfCnAA4QEXoAgABwLmEc5lvPqBJdkDwQrzARegGQAJAuYRzmW2+oElzwOBCp8KcADLARcgIADIh+YRzmWe+lYgwwMRkA6IwAHBEcFlgPrAFSAAwhUOABGQgn7fFSBRcADBEcFlaPoQiIcA9xcEABj+3xEEAN9lEAAEAMQVoP/MCwgB3xEEAN9lHAAEAMQV4P/MC/SVUwAKABetCgBTABcD3x3k/QQAXwokAMAVElgYiRklwBXUWfcJtv7fFZtZcADBEcFlVQD3CXjydwAo8t8dtv0EAMYdivDmC/cXvACi998XMAC8AIcA7c/ExczYINDPydPLwTogAJ/308XHzyDGwcrMz9c6nyAwAJ/uwcrExc7POp8gMADwz8nTyyDGwcrMz9cg0sEtIADCz9TBxdQg1M/M2MvPIM7BIADXyc7exdPUxdLFAA==',
                'isProtected': true
            }, {
                'name': 'CSI.USR',
                'address': 65535,
                'content': 'DFPXJwSgO4EBA4cAMInXJxSgAL4Gh98X/L8UoN8X/r8ioCSJSBH8zdXM0dTP0iBDU0lET1MAJInyAiDXxdLTydEgMS4yAB8KJAAACgF+AX7BFQC+wxHDZRQAwhXWAdGUgn7fFQC+TqCHAAEBFwHBF8YAQBTARfz/F6ACAAQCH4oqAF8AEKL3CRIAAodfACSi16cqAAwA8wOxAIcAwhcMoPIlU6YIBAQD35UMACoA9AE3CooB8iVTpgQEAgK3Cn4BwmWAA8EVAAfAFQIA/wms4eOHwx2g4cIQxBA0ChgANAoaAMJlgAOzHAIANgHDZUABxRUHAMEVGQC3EEABwmUMAMoLMgPKiwICypUBAJeiyABRgvcQIgG3ECABCwqzkgEA84oBAPILDgBYA9IkwBUIAJOUAn6XrAIAIAAXg8AVAgDXqCAAAoKACvsBgwrTlS4A5hUDAJeiIAACghKkAQGTlM4K+ALWCwMBYQHAFQYA05UgAAN+wh3CAMMdvACzHA4AEACzHBAAFACAHBIA9wuuAAMD8osNAA+BMxAWADMQEgDzZf8BEgAzDBIAM4oSAPMAEgApATMBwEUAgDMQEgAXID8ABIPzFQB+FgAdAcAAwAwzEBYAGAGOAZMB0iTTlX8AwBUIAJOUAn7AFQUA05UgAAN+wBUEABMKAn7CZQMAwx02AIuSy4rDHS4Awh0sALQKGAD0bBIAGgDDZRgAwmUUAGV+wh0WAMJlAAJrfwMR8xUupwABoQCHAAAAAAAAAAAA',
                'isProtected': true
            }, {
                'name': 'MASTER.USR',
                'address': 512,
                'content': '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',
                'isProtected': true
            }]
    }];


/***/ })
/******/ ]);