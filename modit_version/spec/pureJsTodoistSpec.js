// pureJsTodoistSpec.js

describe("pureJsTodoist", function() {

  it("should load Project", function() {
    expect(purejstodoist.project.Project).not.toBeUndefined();
  });

});