
describe("Container", function() {
  "use strict";
  var Container = purejstodoist.Container,
    container = null, dom = null;

  beforeEach(function () {
    dom = document.createElement('div');
    container = new purejstodoist.Container({dom : dom});
  });

  it('should have a dom where to put widgets', function() {
    expect(container.dom).not.toBeUndefined();
  });

  it('should show (internal) components', function() {
    expect(container.show).not.toBeUndefined();
  });

  it('should pass itself to the project list when initialized', function() {
    expect(container.list_view).not.toBeUndefined();
    expect(container.list_view.container).not.toBeUndefined();
  });

});