PureJsTodoist
=============

A project to try diferent Javascript libraries and find out a way to structure Javascript applications, or just the Javascript part of a client/server app.

## The example app
The example app wants to be a Javascript client of [Todoist](http://todoist.com). 

The idea is start creating objects (Project, Task, etc) that hold all the logic around a concept (data, visualization (each object creates its DOM and HTML representation)), with the idea in mind of knowing the hard parts and problems than would lead to adopt a more powerfull solution like a MVC Javascript framework, or keep more logic on the server side in a client/server application.


## modit_version
Version with modules created with [modit](https://github.com/benrady/modit/) and [Jasmine](https://github.com/pivotal/jasmine) as testing framework.

Also uses [Underscore](http://underscorejs.org/), initially imported as [modit](https://github.com/benrady/modit/)'s dependency.

It's the initial version with all the logic embedded in objects.