// pureJsTodoistSpec.js

describe("pureJsTodoist", function() {

  it("should load all the modules", function() {
    expect(purejstodoist.project.Project).not.toBeUndefined();
    expect(purejstodoist.label.Label).not.toBeUndefined();
    expect(purejstodoist.task.Task).not.toBeUndefined();
    expect(util).not.toBeUndefined();
  });

});