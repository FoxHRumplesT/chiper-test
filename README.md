# Chiper test

https://chiper-test.vercel.app/

The app is deployed in Vercel service.

## Product Requirements

As a police officer:

- [x] I want to see a list of reported bike thefts for the Berlin area.
- [x] I want to see the first 10 bike theft cases, with the ability to - paginate (10 cases per page).
- [x] I want to see a total number of bike theft cases.
- [x] For each reported bike theft I want to see:
  - [x] Case title
  - [x] Case description
  - [x] Date of the theft
  - [ ] Date of when the case was reported (The API doesn't provide it)
  - [x] Location of the theft
  - [x] Picture of the bike, if available
- [x] I want to filter reported bike thefts by partial case title.
- [ ] I want to filter reported bike thefts by date range. (The API doesn't provide dates filter, and a workaround should be filter by dates locally, but not is recommend)
- [x] I want to see a loading state until the list is available.
- [x] I want to see an error state if the list is unavailable.
- [x] I want to see an empty state if there are no results.
