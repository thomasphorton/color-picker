# To Do
## General
* add page for registering new devices
    * add react router: https://www.npmjs.com/package/react-router-dom
* <del>figure out graphql schema for devices
* <del>add grid system

## DHTs
* create component for showing DHT data

## LEDs
* clean up LED control ui
    * <del>use nicer color slider
    * fix on/off stuff (rchboyd)
* add option for LED brightness dithering
* <del>create an on/off switch for lights
* <del>update LED state schema (led-lightstrip-state.json)
* fix frontend sending lightsOn: true when color is changed and lights are supposed to be off

## IoT
* add lifecycle events to thing shadows

## API
* set up updateReportedState function
* create IoT rule to trigger lambda
* add subscription to client

## Manual Configuration Stuff
* Add IoT permissions to Lambda execution roles
* Add IoT endpoint environment variables to Lambdas

## Firmware
* update to support device on/off
* update to support brightness adjustment