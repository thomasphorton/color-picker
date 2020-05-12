/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateReportedState = /* GraphQL */ `
  mutation UpdateReportedState($thingName: String, $state: DeviceStateInput) {
    updateReportedState(thingName: $thingName, state: $state) {
      color
      number
      lightsOn
    }
  }
`;
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
export const updateDesiredState = /* GraphQL */ `
  mutation UpdateDesiredState($thingName: String, $state: DeviceStateInput) {
    updateDesiredState(thingName: $thingName, state: $state) {
      color
      number
      lightsOn
    }
  }
`;
