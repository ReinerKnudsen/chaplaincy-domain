# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Major: "breaking", "remove", "major" → bumps major version (1.0.0 → 2.0.0)
Minor: "add", "feature", "new" → bumps minor version (1.0.0 → 1.1.0)
Patch: Everything else → bumps patch version (1.0.0 → 1.0.1)

## [Unreleased]

### Added

- auto request changelog to be edited

### Changed

-

### Fixed

-

## [3.2.1] - 2025-07-18

### Fixed

- HTML tags in profile text on iOS
## [3.2.0] - 2025-07-17

### Changed

- all item cards (events and news) are now full-size links; not only the headline links to the actual item, but a click anywhere on the card will lead to the item page
- the item card has a hover effect: better interaction feedback for user
- "more link" buttons now stack vertically on small screens
- services are now displayed in a two-column grid on small screens
- images in event and service cards are now displayed full width on small screens
- made the weekly sheet upload more accessibe on small screens

### Fixed

- Diocese of Europe => Diocese in Europe
- Mobile menu now scrolls properly on small screens
- The reCaptcha logo on /about/contact covered part of the footer
- Footer appearance on small screens
## [3.1.0] - 2025-07-09

### Added

- reCaptcha v3 integration for contact form

### Changed

- adjusted font sizes for page title and subtitle
- optimized responsive look and feel (esp. for smaller screens)
- new favicon for the app 
- different image height on event and news cards
- de-activated menu items are visible in mobile menu
- several issues on the "Who's who" page - Ranti Hendricks
## [3.0.0] - 2025-07-07

### Added

- add "contact safeguarding" button on home page
- add text of the niceen creed on "what we believe"
- add "add to calendar" button to event page

### Changed

- renamed "slug" field to "teaser" in Event and News creation forms
- optimized the look and feel of the teaser input
- app now loads the weekly sheet for the next Sunday

### Fixed

- fixed issue with markdown viewer not working on news and events
- ItemFavCard header adjusted to full width
- removed all logs
- fixed an issue where teasertext was always reset when user clicked in the text input

## [2.6.0] - 2025-07-06

### Fixed

- fixed issue with markdown viewer not working on news and events

## [2.5.0] - 2025-07-06

### Added

- add page "Who's who"
- add additional council members

## [2.4.0] - 2025-07-03

### Added

- add: menu items can be de-activated and activated

### Changed

- internal: optimised the image handling for events and news
- optimised the button placement for events and news creation
- background color of download items changed to seablue
- new: all pages now have the same design
- the pages pull header image and apge title dynamically into layout

### Fixed

- issues with text handling in event texts

## [2.3.0] - 2025-07-03

### Added

- add image metadata (alt text and caption) are now saved with the image
- when an image is re-used the meta data saved with it is re-used as well

## [2.2.1] - 2025-06-30

### Changed

- installes Shadcn UI for better UI control
- migrated all components from Daisy UI to Shadcn-Ui

## [2.2.0] - 2025-06-29

### Added

- add path highlighting in menu on admin pages
- add floating buttons for both events and news form
- add function to clean text for teasertext
- add notifications for new location and update location in both form and modal
- add confirmation modal for delete location
- add verification if an item open in the editor has changes
- add items now have states "draft", "scheduled", "public" and "unpublished"
- add items can be saved as draft (no check for mandatory fields or auto setting of dates)
- the user receives a warning when navigating away from a form with unsaved changes

### Changed

- "save" button is only available on change && all mandatory fields provided
- "save as draft" is only available on changes
- the teaser text field is filled automatically when a description is available
- all notification messages are defined centrally

### Fixed

- location will now be properly reset when canceling an event form with a location selected in it
- the flag "online" was not correctly saved when a new location was created in the event form
- teaserText is now trimmed and cleaned before being entered into the teasertext field

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
