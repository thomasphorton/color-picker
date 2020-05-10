/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updatedDevice = /* GraphQL */ `
  subscription UpdatedDevice {
    updatedDevice {
      thingName
      state {
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
