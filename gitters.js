/**
 *  __  ______ __ __  __
 * / _ | |  | |_ |__)(_    Straightforward Github
 * \__)| |  | |__| \ __)   reader with cache.
 *
 * This project was released under MIT license.
 *
 * @link      http://websemantics.ca
 * @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
 */

;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jQuery', 'larder'],
            function(jQuery, Larder) {
                return (root.Gitters = factory(jQuery, Larder))
            })
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'), require('larder'))
    } else {
        root.Gitters = factory(root.jQuery, root.Larder)
    }
}(this, function($, cache) {
    var me = { VERSION: '1.0.2'}
    var baseUrl = 'https://api.github.com/repos/{{repo}}/contents/{{path}}?ref={{branch}}'

    /* Library defaults, can be changed using the 'defaults' member method,

		- debug (boolean), tuen debug mode off / on

		- clearOnStart (boolean), true by default to clear cache

		- cache:expires (int), duration in minutes to expire cache items (1 hour / 60 minutes by default)

  */

    var defaults = {
        debug: true,
        clearOnStart: true,
        'expires': 60
    }

    // -------------------------------------------------------------------------
    // Public methods

    /*
      Override class defaults

        Parameters:
        - opts (object): name value pairs

    */

    me.defaults = function(opts) {
        return $.extend(true, defaults, opts)
    }

    /*
      Setup the library

    */

    me.init = function() {

        /* setup the cache with expiration time in case the defaults was set by the user, also,
          clear cache if not set outherwise */

        cache.defaults({
          expires: defaults.expires,
          debug: defaults.debug})

        if (defaults.clearOnStart) {
            cache.clear()
        }
    }

    /*
    Get repository data

      Parameters:
      - repo (object): contains the username and repo name
      - cb (function): callback function

  */

    me.repo = function(repo, cb) {
        get(compile(baseUrl.substring(0, baseUrl.indexOf('/contents')), {
            repo: repo
        }), cb)
    }


    /*
	    Get repository data

	      Parameters:
				- repo (string): contains the repo ref, 'username/repo'
				- path (string): path to the required folder
				- branch (string): the repo branch (optional)
	      - cb (function): callback function

	  */

    me.content = function(repo, path, branch, cb) {

        if (typeof branch === 'function') {
            cb = branch
            branch = 'master'
        }

        get(compile(baseUrl, {
            repo: repo,
            path: path,
            branch: branch
        }), cb)
    }

    // -------------------------------------------------------------------------
    // Generic methods

    /*
      HTTP Get

        Parameters:
        - url (string): url to the resource
        - cb (function): callback function

    */

    function get(url, cb) {

        /* use url as key for the cache */
        var value = cache.fetch(url)

        if (value) {
            cb.call(null, value)
        } else {
            try {
                $.ajax({
                    url: url,
                    complete: function(xhr) {
                        cb.call(null, cache.save(url, JSON.parse(xhr.responseText)))
                    },
                    error: function(err) {
                        log((err && err.responseJSON) ? err.responseJSON['message'] : 'There has been an error')
                    }
                })
            } catch (err) {
                log(err.message)
            }
        }
    }

    /*
      Compile template, replace placeholder with their values

        Parameters:
        - template (string): string with placeholders, i.e. 'Hello {{name}}'
        - context (object): key/value pairs, i.e. {name: 'World'}

    */

    function compile(template, context) {
        for (var name in context) {
            template = template.replace('{{' + name + '}}', context[name])
        }
        return template
    }

    /*
      Log a message to the console

        Parameters:
				- message (string): print out if in debug mode
				- context (object): if provided, treat the message as a template

    */

    function log(message, context) {
        if (defaults.debug) {
            console.log((typeof context === 'object') ? compile(message, context) : message)
        }
    }

    if (typeof $ === 'undefined') {
        console.error('Please install the latest jQuery!')
    } else if (typeof Larder === 'undefined') {
        console.error('Please install the latest Larder cache library!')
    } else {
        $(function() {
            me.init()
        })
    }

    return me
}))
