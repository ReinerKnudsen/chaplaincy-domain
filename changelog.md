# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Major: "breaking", "remove", "major" → bumps major version (1.0.0 → 2.0.0)
Minor: "add", "feature", "new" → bumps minor version (1.0.0 → 1.1.0)
Patch: Everything else → bumps patch version (1.0.0 → 1.0.1)

## [Unreleased]

### Added

-

### Changed

-

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
