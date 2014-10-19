define(['./Base', 'app/components/footer/app'], function (Base) {
    var c2 = new Base('Controller 2');

    require(['app/components/footer/controller'], function(controller) {
        controller();
    });

    return c2;
});
