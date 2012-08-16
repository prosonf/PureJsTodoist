// ProjectSpec.js

describe("Project", function() {
  var Project = purejstodoist.project.Project,
    a_name = 'aName',
    an_id = 1,
    project = null;

  beforeEach(function() {
    project = new Project({id: an_id, name: a_name});
  });

  it("should have an id and name", function() {
    expect(project.id).toEqual(an_id);
    expect(project.name).toEqual(a_name);
  });

  it("should render the name into html", function() {
    var html = project.toHtml();
    expect(html).toContain(a_name);
  });

  it("should have a form to create a new project given a name", function() {
    var createCallback = jasmine.createSpy('createProjectCallback');
    var dom = Project.getDOMForCreate(createCallback);
    dom.getElementsByClassName('purejstodoist_project_name')[0].value = 'test name';
    dom.getElementsByClassName('purejstodoist_project_button')[0].onclick();
    expect(createCallback).toHaveBeenCalled();
    expect(createCallback.calls[0].args[0].name).toBe('test name');
  });
});

describe("ListView", function() {
  var Project = purejstodoist.project.Project,
    ListView = purejstodoist.project.ListView,
    projectA, projectB, listView;

  beforeEach(function() {
    projectA = new Project({id: 1, name: "a_project"});
    projectB = new Project({id: 2, name: "b_project"});
    listView = new ListView({items: [projectA, projectB]})
  });

  it("should render all projects", function() {
    var html = listView.toHtml();
    expect(html).toContain(projectA.name);
    expect(html).toContain(projectB.name);
  });
});
