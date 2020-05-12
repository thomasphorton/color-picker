/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateDesiredState = /* GraphQL */ `
  subscription OnUpdateDesiredState(
    $thingName: String
    $state: DeviceStateInput
  ) {
    onUpdateDesiredState(thingName: $thingName, state: $state) {
      color
      number
      lightsOn
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice {
    onCreateDevice {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice {
    onUpdateDevice {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice {
    onDeleteDevice {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
