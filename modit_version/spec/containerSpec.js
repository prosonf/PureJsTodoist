
describe("Container", function() {
  "use strict";
  var Container = purejstodoist.Container,
    container = null;

  beforeEach(function () {
    container = new purejstodoist.Container();
  });

  it('should have a dom where to put widgets', function() {
    expect(container.dom).not.toBeUndefined();
  });

  it('should show (internal) components', function() {
    expect(container.show).not.toBeUndefined();
  });

});