## Launder

[![Build Status](https://travis-ci.org/punkave/launder.svg?branch=master)](https://travis-ci.org/punkave/launder)

A sanitization module for the people. Built for use in Apostrophe CMS.

### Use

Launder can be used to sanitize strings, integers, floats, urls, and more. It's best for cases where you've already used front-end validation to encourage smart input, and now you want to make sure your inputs are reasonable.

Date and Time sanitization is built around some assumptions we use in Apostrophe, but should be fairly universal for DB storage (ISO 8601).