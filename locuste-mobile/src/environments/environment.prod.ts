export const environment = {
  production: true,
  services: {
    drone_info : `http://${window.location.hostname}:20000`,
    brain_connector: `ws://${window.location.hostname}:21000`,
    video_server: `ws://${window.location.hostname}:`
  }
};
