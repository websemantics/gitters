```        
                ░░░░░░░░░
             ░░░░░░░░░░░░░░░
          ░░░░░/   \░░░░░░░░░░░
        ░░░░░░░\   /░░/   \░░░░░░            
          ░░░░░░| |░░░\  _/░░░░░                
            ░░░░| |░░░/ /░░░░    
              ░░| |░░/ /░░░
             ___| |░/ /░░____________________  _____
            / ____// //_  __/_  __/ ____/ __ \/ ___/
           / / __ / /  / /   / / / __/ / /_/ /\__ \
          / /_/ // /  / /   / / / /___/ _, _/___/ /
          \____/___/ /_/   /_/ /_____/_/ |_\/____/  

          Straightforward Github reader with cache
```

> Gitters is a utility that provides a straightforward way to access content on Github without the hassle of dealing with Github API libraries. There is no need for an `API KEY` to use Gitters, and, the library provides a basic cache support using [Larder](https://github.com/websemantics/larder) to optimize network usage.

## Install

Bower

```bash
Bower install gitters
```

NPM

```bash
npm i install gitters
```

## Getting Started

This library comes pre-configured with two global settings, `clearOnStart` to indicate clearing the cache on each Browser refresh (true by default) and, `expires`, the expiration duration per stored item in minutes (1 hour by default).

To change,

```javascript
Gitters.defaults({
  clearOnStart: false,
  expires: '120' /* two hours expiration per item */
})
```

## Usage

The library provides few useful methods to enable navigation of content on Github,

**repo**, returns information about a Github repo through a callback method.

```javascript
Gitters.repo('websemantics/semantic-ant', function(repo){
  console.log(repo)
})
```

**content**, returns the content of folders or files on a given Github repo.

```javascript
Gitters.content('websemantics/bragit', 'demo', function(files){
  /* list of file in folder 'demo' */
  console.log(files)
})
```

## Examples

The [Semantic Ant](https://github.com/websemantics/semantic-ant) project uses [Gitters](https://github.com/websemantics/gitters) uses to read docs files directly from the Browser.
