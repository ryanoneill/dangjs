angular.module('dangSvg', [])
    .directive('dangSvg', function () {
        return {
            restrict: 'AC',
            compile: function compile(element, attrs, transclude) {
                return {
                    pre: function preLink(scope, element, attrs, controller) {
                        var elementId;

                        if (element.attr('id')) {
                            elementId = element.attr('id');
                        } else {
                            elementId = (new Date()).getTime();
                            element.attr('id', elementId);
                        }

                        var myParent = element.parent();
                        var parentId = myParent.attr('id');

                        var sampleSVG = d3.select('#' + parentId).append('svg');
                        sampleSVG.attr('id', 'dang_' + elementId);

                        if (attrs.width) {
                            sampleSVG.attr('width', +attrs.width);
                        }

                        if (attrs.height) {
                            sampleSVG.attr('height', +attrs.height);
                        }
                    },
                    post: function postLink(scope, element, attrs, controller) {

                    }
                };
            }
        };
    });