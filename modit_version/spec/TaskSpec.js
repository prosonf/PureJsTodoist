// TaskSpec.js

describe("Task", function() {
  var Task = purejstodoist.task.Task,
    task = null, an_id = 1,
    task_text = 'Description of a task to do';

  beforeEach(function () {
    task = new Task({id: an_id, text: task_text});
  });

  it('should have a text and an id', function() {
    expect(task.id).toEqual(an_id);
    expect(task.text).toBe(task_text);
  });

  it("should render the text into html", function() {
    var html = task.toHtml();
    expect(html).toContain(task_text);
  });

  it("should have a form to create a new task given a description", function() {
    var createCallback = jasmine.createSpy('createTaskCallback');
    var dom = Task.getDOMForCreate(createCallback);
    dom.getElementsByClassName('purejstodoist_task_text')[0].value = task_text;
    dom.getElementsByClassName('purejstodoist_task_button')[0].onclick();
    expect(createCallback).toHaveBeenCalled();
    expect(createCallback.calls[0].args[0].text).toBe(task_text);
  });
});