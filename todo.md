

High Level
==============================
- [x] general code design
	- [x] manager - just remove, put it's stuff elsewhere
	- [x] config - use js settings manager
	- [x] options - only call setOptions, cherry pick what you want
	- [x] startup - individual js files that use plugins

- [x] plugin system
	Plugin Hooks
		hooks: {
			'update': [
				'undoPlugin.onUpdate',
				'scriptPlugin.onUpdate'
			],
			'find': [
				'linkedEntities.onFind',
			]
		}

	Running Plugins
		server/database
		pluginManager.runPlugins('update', resp, ogCallback)

		runPlugins: function(hook, data, callback)
		{
			pluginFuncs = pluginManager.getPlugins('update')

			actualFuncs = _.collect(pluginFuncs, function(func)
			{
				return function(cb)
				{
					func(err, resp, cb)
				}
			})
			async.series(actualFuncs, function(err)
			{
				ogCallback(err, resp)
			})
		}



	Running commands: node start.js

		paths = ['./config', cOS.getUserHome() + '/coren']
		modes = ['default', 'production', 'linux']

		settingsManager = require('settingsManager')(paths)
		settings = settingsManager.globalSettings(modes)

		pluginManager = require('pluginManager')(settings)


		pluginManager.runPlugins('startup', context, function()
		{
			'server started'
		})



- [x] settingsManager - good paper work on that
- [ ] logging

	Sheep
		- sheep post logs to restful api
		- logs posted after each job, tagged w/ job and sheep
		- trash logs that are older than config

	Javascript
		- ideally be able to run time modify logging state
			- modify config/log.json to set which modules log
		- set file on init, ex: coren:pluginManager
		- set date format

	Python
		debug = require('debug')('coren:pluginManager')
		should just take moment formatting prly?
		debug.setTimeFormat('YYYY/MM/DD hh:mm:ss') <- default

		random colors on init

		debug('just info')
			print to STDOUT
			save json to log
			{type: 'info', time: 901210350253, data: 'just info'}

		debug('error', 'This is so broken!')
			print to stdout
			save json to log
			{type: 'error', time: 901210350253, data: 'This is so broken!'}

		debug({some: info})
			pretty print to STDOUT
			save JSON in log
			{type: 'info', time: 901210350253, data: {some: info}}

		debug('error', {some: error})
			pretty print to STDOUT
			save JSON in log
			{type: 'error', time: 901210350253, data: {some: error}}


- [ ] passport
		- script to email on new user or on email change
		- login page
		- access control

- [ ] move coren root to coren/
- [ ] fix convertCompRender to loop over collection


Assorted things
==============================
- [ ] _user views, integration with passport.js
- [ ] settingsManager in node
- [ ] check priority of shep jobs
- [ ] actual logging for sheep?


- [x] duplicate button
- [x] can duplicate to .entityDef, default false
- [x] standard table view setup
- [x] larger default field width
- [x] shorter headers
- [x] fix h264 file size
- [x] writeFinalRender shouldn't error when it can't connect to db
- [x] move backend view to caretaker
- [x] dropdowns broken
- [x] add inline editing
- [ ] context.controller instead of coren.controller
- [/] removing currently removes all child views when working w/ dupes (hax reload fix)
- [1/4] get it up and running on the transcode machines
- [x] move thumbnails to caretaker folder
- [x] add tests for json, ensure they're getting json back
- [x] views for autoConversion, versions, assets, shepherdJob, and sheep
- [x] scripts verified and working
- [x] switch writeFinalRender to linear exr's
- [x] get conversion formats from Matt / Oliver
- [ ] change status to rendering
- [ ] system for globals
- [ ] increment errors
- [ ] pause after errors > config
- [ ] rethink rendering
- [ ] speed up rendering
- [ ] hide complete in shepherd
- [ ] standardize gridViews, build a query, pass that in
- [ ] should rename coren_editView.styl to coren_forms or something
- [ ] move job status to jobManager
- [ ] unset rendering on error
- [x] slate stuff
- [/] test! test variety of projects, etc
- [ ] deploy
- [ ] get request from something ensure that no job that it's on is still flagged as rendering, also set sheep to idle that requested
- [ ] setting queued pototentially requeueing everything that's there
- [ ] priority doesn't work
- [ ] need to check job periodically to see if it's still set to rendering and still assigned to us
- [ ] check that start process isn't pre-quoted
- [ ] trigger changed on field view, listen to that on inline and submit
		- remove inline submit from lsitEditView







Publish Views
==========================

Entry Points
- Web Publish
	- drag and drop files
	- files uploaded to r:/assets/uploads/
	- publish called w/ that file as source, continue as normal
	- option to create an asset per file or one asset for all files
	- sets options.files[]
- Publish Files
	- same as web publish w/ different source
	- sets options.files[]
- Multi Publish
	- source multiple files, totally different tree
	- sets options.files[]
- New
	- choose program
	- sets options.program


Choices
- Multi Publish Asset Type
	- shot and library asset links takee you to multi publish page
	- project asset takes you to select project then to multi publish page
- Publish Type
	- new asset: goes to below
	- update scene asset: only visible if options.sceneAsset is set
	- update Asset: goes to Select Asset
- New Asset Type
	- shot: select shot page
	- project asset: select project page
	- library asset: straight to asset info


Selection Views
- Select Project
	- options:
		- submitText
		- submitCallback
- Select Shot
	- options:
		- initial value (remember last)
		- submitText
		- submitCallback
- Select Asset
	- options:
		- filters
		- submitText
		- submitCallback
- Select Version
	- options:
		- asset
		- submitText
		- submitCallback

Info pages
- Asset Info
	- lists existing assets matching type
	- filters this list as you make choices
	- editViews should emit changed signals
	- fill in info, create asset, pass to python



Publish Views
- publish_appView
- publish_selectionView
- publish_formView
- publish_selectSceneAssetView
- publish_selectAssetView
- publish_selectVersionView
- publish_assetInfoView







Broad Strokes
=============================
- [ ] more edit form functionality
	- [x] tests for parse input for edit fields
	- [ ] changed callbacks for field edit views and form
	- [x] tests for editView.getData()
	- [ ] radio button for
- [ ]


- [x] switch to sequence / shot
- [x] always version renders
- [ ] make project folders editable via config
- [ ] update project folders per setup in Q:\Users\Grant_Miller\projects\folder_structure
- [ ] better use of handles on a job
- [ ] specify per-job outputs w/ naming convention
- [/] auto-set colorspace on write node from plates
- [ ] infinity priority to quicktime conversion
- [ ] dedicated quicktime sheep
- [ ] download button in review tool to download the current clip
- [ ] project-based conversion (happens for every render)
- [ ] on-demand conversion for specific renders (h264 of shots 0100 and 0200)
	- [ ] bonus points for concatinating them together, removing handles, etc
- [ ] quicktime versions should trash the .nk file post-conversion
- [ ] generic tool for trashing old versions of a given asset type
- [ ] daily reports for what assets you've created and what needs to be kept
- [ ] trash system: assets are marked for deletion, moved to trash, then deleted after 30 days in trash
- [ ] custom write node
- [ ] Hiero / NS scripting for output setup (matching project outputs and naming conventions), dynamically linked
- [ ] publishing tools
- [ ] notifications
- [ ] subscription system for notifications
- [ ] post straight to site via AWS
		- one link
		- plays on iPad / iPhone / Android
- [ ] upload area for reference per shot
	- [ ] auto-add a note to check the reference
- [ ] versions have version notes, conversational notes linked to that specific version
- [ ] ease of the publish > review > kick back loop
- [ ] single view similar to Google Docs showing:
		- all shots on one page
		- all tasks for that shot
		- all notes for those tasks
		- who's assigned to each task
		- initial shot description
		- task status: working, rendered, qc pass, export, omit
- [ ] shot import from csv, ideally paste-able so no upload



Calendar View Notes
=============================
- [ ] highlight all tasks in the same task group when you select a single task group
- [ ] color today red or underline it red (check flowgraph)
- [ ] details popover when you select a task group displaying task group details
- [ ] task group details view
		- grid showing:
			- vertically all shots in the task group
			- horizontally status of the notes on those tasks
- [ ] flyout on the assigned tab of a task group
		- presents a menu showing a list of people assigned to that task
		- x's next to people remove them from that task group
		- input at the bottom for adding more users to the task group
- [ ] special "unassigned" section at the top that lists tasks matching your current filters
- [ ] click dates, set them as a holiday or a work day
- [ ] click dates, add postings / deliveries
- [ ] expand dates to display postings and deliveries for each day
- [ ] filters for people, project, department, etc
- [ ] grid lines
- [ ] digest email, sent out each morning
- [ ] click on blank space to add a task
- [ ] plus button by names to add tasks to that person




about to add child view of calendar, need to have a slot for it to go in the calendarview.hogan template

- [ ] Setup task-based schema

	taskGroup
		assigned = []
		status = [open, closed]
		priority

	task
		taskGroup
		link
		assigned

	project
		TaskGroup
			alleyShots = [0010, 0020, 0030]
			propModeling = [sink, tub, shower]

		Shot
			project
		Asset
			project

		Note
			project
			task
			# always unique
			# grouped if note text is the same


		Brooklyn 99 - Beauty
				Comp   planar track    Mattes  50% less    25% less
		0010	[x]    [x]             [x]     [x]
		0020	[x]    [x]                                 [ ]
		0030	[x]    [x]             [x]     [ ]


	filling out the table

	var pg = 1
	var perPg = 10

	var allTaskIds = []
	var userTaskGroups = {}
	_.each(users, function(user)
	{
		userTaskGroups[user] = coren
			.find('taskGroup')
			.where('assigned','is',user)
			.where('status','is','open')
			.sort('priority','desc')
			.paginate(pg, perPg)

		_.each(taskGroups, function(taskGroup)
		{
			allTaskIds.concat(taskGroup.tasks)
		})
	})

	var allTasks = coren
		.find('task')
		.where('id','in',allTaskIds)

	var allNotes = coren
		.find('note')
		.where('')
		.where('link','in',allTaskIds)

	var links = {}
	_.each(allTasks, function(task)
	{
		if (!links[task.link.entityType])
			links[task.link.entityType] = []
		links[task.link.entityType].append(task.link.id)
	})

	var linkInfo = {}
	_.each(links, function(ids, entityType)
	{
		linkInfo[entityType] = coren
			.find(entityType)
			.where('id','in',ids)
	})

	var linkModels = {}

	_.each(users, function(user)
	{
		_.each(userTaskGroups[user], function(taskGroup)
		{
			// print info about the task group

			// build the task table
			_.each(taskGroup.tasks, function(task)
			{
				// first column is link info
				linkEntityType = task.link.entityType
				if (!linkModels[linkEntityType])
					linkModels[linkEntityType] = factory
						.getEntityModel(linkEntityType)
				taskLinkInfo = _.where(linkInfo[linkEntityType], {id: task.link.id})
				if (taskLinkInfo)
					taskLinkInfo = taskLinkInfo[0]
				else
					throw new Error('No link info found')

				linkModels[linkEntityType]
					.set(taskLinkInfo)

				// second column is task status
				// > if the task has notes, the task checkbox is locked and it's checked state is determined by the note status

				// columns 3-n are notes
				_.each(task.notes, function(note)
				{

				}
			})
		})
	})



Rename Log
==============
project
	width > formatWidth
	height > formatHeight

department
	subDir > subDirectory

        "required": 1,
