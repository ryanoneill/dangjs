angular.module('dangCircle', [])
    .directive('dangCircle', function ($timeout) {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {
                var elementId;

                if (element.attr('id')) {
                    elementId = element.attr('id');
                } else {
                    elementId = (new Date()).getTime();
                    element.attr('id', elementId);
                }

                var myParent = element.parent();
                var parentId = myParent.attr('id');

                var circle = d3.select('#dang_' + parentId).append('circle');
                circle.attr('id', 'dang_' + elementId);

                function setAttribute(item, attrs, propertyName) {
                    if (attrs[propertyName]) {
                        item.attr(propertyName, attrs[propertyName]);
                    }
                }

                function setStyle(item, attrs, propertyName) {
                    if (attrs[propertyName]) {
                        item.style(propertyName, attrs[propertyName]);
                    }
                }

                function setupTransition(item, scope, details) {
                    if (details.name && details.delay && details.duration) {
                        $timeout(function () {
                            scope[details.name](scope, scope);
                        }, details.duration);
                    }

                    var transition = item.transition();
                    transition.delay(details.delay);
                    transition.duration(details.duration);

                    var outcome = {};
                    scope[details.name](scope, outcome);
                    setAttribute(transition, outcome, 'r');
                    setAttribute(transition, outcome, 'cx');
                    setAttribute(transition, outcome, 'cy');
                    setStyle(transition, outcome, 'fill');
                    setStyle(transition, outcome, 'stroke');
                }

                function setupTransitions(shape, scope, propertyName) {
                    if (scope[propertyName]) {
                        angular.forEach(scope[propertyName], function (details) {
                            setupTransition(shape, scope, details);
                        });
                    }
                }

                function setOn(item, scope, actionName) {
                    if (scope[actionName]) {
                        item.on(actionName, function () {
                            var callback = scope[actionName];
                            callback();
                            scope.$apply();
                        });
                    } else if (scope[actionName + '_transitions']) {
                        item.on(actionName, function () {
                            setupTransitions(item, scope, actionName + '_transitions');
                        });
                    }
                }

                function watchAttribute(item, scope, propertyName) {
                    if (scope[propertyName]) {
                        scope.$watch(propertyName, function (value) {
                            item.attr(propertyName, value);
                        });
                    }
                }

                function watchStyle(item, scope, propertyName) {
                    if (scope[propertyName]) {
                        scope.$watch(propertyName, function (value) {
                            item.style(propertyName, value);
                        });
                    }
                }

                setAttribute(circle, attrs, 'r');
                setAttribute(circle, attrs, 'cx');
                setAttribute(circle, attrs, 'cy');
                watchAttribute(circle, scope, 'r');
                watchAttribute(circle, scope, 'cx');
                watchAttribute(circle, scope, 'cy');

                setStyle(circle, attrs, 'stroke');
                setStyle(circle, attrs, 'fill');
                watchStyle(circle, scope, 'stroke');
                watchStyle(circle, scope, 'fill');

                setOn(circle, scope, 'mouseover');
                setOn(circle, scope, 'mouseout');
                setOn(circle, scope, 'mousedown');

                setupTransitions(circle, scope, 'transitions');
            }
        };
    });