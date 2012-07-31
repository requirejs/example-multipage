# requirejs/example-multipage

This project shows how to set up a multi-page requirejs-based project that has
the following goals:

* Each page uses a mix of common and page-specific modules.
* All pages share the same requirejs config.
* After an optimization build, the common items should be in a shared common
layer, and the page-specific modules should be in a page-specific layer.
* The HTML page should not have to be changed after doing the build.

## Project layout

This is accomplished by using the following project layout. This repo has
the following structure:

* tools/ - The requirejs optimizer, r.js, and the optimizer config, build.js.
* www/ - The code that runs in the browser while in development mode.
* www-built/ - Generated after an optimizer build. Contains the built code
that can be deployed to the live site.

This `www` has the following layout:

* www/
    * page1.html - page 1 of the app.
    * page2.html - page 2 of the app.
    * js/
        * app/ - the directory to store app-specific modules.
        * lib/ - the directory to hold third party modules, like jQuery.
        * common.js - contains the requirejs config, and it will be the build
        target for where to combine the common modules.
        * page1.js - loads the common module, then loads 'app/main1', the
        main module for page 1. This module is used for the data-main for
        page1.html.
        * page2.js - loads the common module, then loads 'app/main2', the
        main module for page 2. This module is used for the data-main for
        page2.html.

To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a
**www-built** directory. The js/common.js file will contain all the common
modules. js/page1.js will contain the page1-specific modules, js/page2.js
will contain the page2-specific modules.

## Building up the common layer

Common modules are added to the built common.js by modifying the "include"
array in tools/build.js for the common layer. So, as you do builds and see
in the build output that each page is including the same module, add it
to the x.

It is better to add these common modules to the tools/build.js config insted of
doing a require([]) call for them in js/common.js. Modules that are not
explicitly required are not executed, so by usint tools/build.js, you can
include common modules that may be in 2-3 pages but not all pages, and for
pages that do not need the module, while it will be downloaded in the built
common.js file, it will not be executed. If you put in a require() call for it
in common.js, then it would always be executed.

## More info

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html
