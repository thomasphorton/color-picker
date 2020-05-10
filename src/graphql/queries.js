/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDeviceShadow = /* GraphQL */ `
  query GetDeviceShadow($thingName: String) {
    getDeviceShadow(thingName: $thingName) {
      thingName
      shadow {
        desired {
          color
          number
          lightsOn
        }
        reported {
          color
          number
          lightsOn
        }
      }
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
      id
      thingName
      friendlyName
      owner
    }
  }
`;
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        thingName
        friendlyName
        owner
      }
      nextToken
    }
  }
`;
