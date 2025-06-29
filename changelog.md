# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Major: "breaking", "remove", "major" → bumps major version (1.0.0 → 2.0.0)
Minor: "add", "feature", "new" → bumps minor version (1.0.0 → 1.1.0)
Patch: Everything else → bumps patch version (1.0.0 → 1.0.1)

## [Unreleased]

### Added

- add path highlighting in menu on admin pages
- add floating buttons for both events and news form
- add function to clean text for slugtext
- add notifications for new location and update location in both form and modal
- add confirmation modal for delete location
- add verification if an item open in the editor has changes
- add items now have states "draft", "scheduled", "public" and "unpublished"
- add items can be saved as draft (no check for mandatory fields or auto setting of dates)

### Changed

- "save" button is only available on change && all mandatory fields provided
- "save as draft" is only available on changes
- the slug text field is filled automatically when a description is available
- all notification messages are defined centrally
-

### Fixed

- location will now be properly reset when canceling an event form with a location selected in it
- the flag "online" was not correctly saved when a new location was created in the event form
- slugText is now trimmed and cleaned before being entered into the slugtext field

## [2.0.5] 2025-06-27

### Added

- add notifications to provide transaction feedback to the user
- add notificationStore, ToastContainer and ToastItem components
- add toast notification handling for event update page
- add toast notifications for issues with date values in form
- add ImageSelectionStore to handle image selection and image upload
- add unit tests for date handling and event data handling

### Changed

- the app now knows if an image already exists when an event/news is created/updated and avoids an uplado attempt
- date calculation for events is now in a central service
- dates are therefore also validated for updated events
- minor adjustment to location dropdown
- all table styles in app.css

### Fixed

-

## [2.0.0] - 2025-06-24

### Added

- major update to event and news page to use UTC dates instead of local dates
- implemented a fall back for older items without UTC dates

## [1.2.0] - 2025-06-24

### Fixed

- the alt property of images on the events and news detail page are now set to the imageAlt property of the event or news item

## [1.1.0] - 2025-06-24

### Added

- added property "online" to location form
- added option "joinOnline" to event form
- added onlineReady property to event page to check whether an event is to be about online or is online
- added optional joinOnline property to event form to add a join button to the event 20 minutes before the event starts
- information that a link will be available before the event starts

### Changed

- replaced openMapUrl with locationUrl
- FutureEvents are all events with PublishEndDate > today
- Online events only show the name of the online service but no link
- Event metadata on the event detail page is now fully responsive

## [1.0.0] - 2025-06-24

### Changed

- removed dependency on formats.ts
- added multiple styles to the app.css file
- adjusted news and article overview pages to use the new styles
- editors can capture a description text for pdf files to new events
- adjusted event page to display pdf file download link
- editors can capture a description text for pdf file to news items
- adjusted news page to display pdf file download link

### Fixed

- location form didn't come up when called from event admin form

## [1.0.0] - 2025-06-24

### Added

- Initial release of the chaplaincy domain application
- User authentication and login system
- News management functionality
- Events management functionality
- Basic responsive UI design

### Changed

-

### Deprecated

-

### Removed

-

### Fixed

-

### Security

-

[Unreleased]: https://github.com/username/chaplaincy-domain/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/username/chaplaincy-domain/releases/tag/v1.0.0
