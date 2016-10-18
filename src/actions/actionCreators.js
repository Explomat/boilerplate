import constants from '../constants/constants';

export function exportFunction() {
  return {
    meta: { remote: true, cache: true, serverName: 'Test' },
    type: "constants.TEMPLATE"
  }
}
