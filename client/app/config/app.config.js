import { Dimensions } from 'react-native';

// Development Server
export const HostServer = {
    host: '192.168.1.104:',
    port: '8080'
}

// Production Server
// export const HostServer = {
//     host: '192.168.1.104:',
//     port: '8080'
// }

// Application style configuration
export const AppStyle = {
    main_color: '#463275',
    sub_main_color: '#DD4095',
    third_main_color: '#82B9FA',
    fourt_main_color: '#4E7AAE',
    fifth_main_color: '#352952',
    google_plus_color: '#dd4b39',
    facebook_color: '#3b5998',
    main_font: '',
    screenSize: Dimensions.get("screen"),
    windowSize: Dimensions.get("window"),
}
