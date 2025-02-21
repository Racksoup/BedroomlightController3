import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as Sentry from '@sentry/react-native';
import * as Font from 'expo-font';

export default function Index() {
 const [colorValue, setColorValue] = useState(0);
  const [briValue, setBriValue] = useState(0);
  const [satValue, setSatValue] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'), // Adjust path
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>; // Prevent app from rendering before fonts are loaded
  }


  Sentry.init({
    dsn: 'https://f85389a0ca8413409eb7e505f2dd0a14@o4508839368982528.ingest.us.sentry.io/4508839406272512',
    debug: true,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      Sentry.captureException(error);
      return Promise.reject(error);
    }
  );

  const onSlidingComplete = (x, option) => {
    let data = {};
    switch (option) {
      case 'bri':
        data = { bri: Math.floor(x) };
        break;
      case 'hue':
        data = { hue: Math.floor(x) };
        break;
      case 'sat':
        data = { sat: Math.floor(x) };
        break;
    }

    axios
      .post(`http://192.168.2.10:42000/api/connor-bedroom-light/set-state`, data)
      .then(function (response) {
        console.log('Color Settings Changed');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const colorPressed = (color) => {
    const data = { hue: color, sat: 203 };

    setColorValue(color);
    setSatValue(203);

    axios
      .post(`http://192.168.2.10:42000/api/connor-bedroom-light/set-state`, data)
      .then(function (response) {
        console.log('Color Settings Changed');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

const changeLight = (hue, sat, bri) => {
  const data = { hue, sat, bri };

  setColorValue(hue);
  setSatValue(sat);
  setBriValue(bri);

  axios
    .post(`http://192.168.2.10:42000/api/connor-bedroom-light/set-state`, 
      data, 
      {
        header: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false
      }
    )
    .then(response => {
      console.log('✅ Color Settings Changed:', response.data);
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        console.error('❌ Axios Error:', error.message);
        console.error('🚨 Axios Error Details:', error.toJSON()); // Show full error object

        if (error.response) {
          console.error('🔴 Server Response:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('🟡 No Response from Server:', error.request);
        } else {
          console.error('🟢 Error Setting Up Request:', error.message);
        }
      } else {
        console.error('🔵 Non-Axios Error:', error);
      }
    });
};


  const briPressed = (bri) => {
    const data = { bri: bri };
    setBriValue(bri);

    axios
      .post(`http://192.168.2.10:42000/api/connor-bedroom-light/set-state`, data)
      .then(function (response) {
        console.log('Color Settings Changed');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onBtnPressed = () => {
    const data = {
      bri: 254,
      sat: 30,
	  hue: 5461
    };

    setBriValue(254);
    setSatValue(30);
    setColorValue(5461);

    axios
      .post(`http://192.168.2.10:42000/api/connor-bedroom-light/set-state`, data)
      .then(function (response) {
        console.log('Color Settings Changed');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Bedroom Light Controller</Text>
        <View style={styles.topContent}>
          <View style={styles.colors}>
            <View style={styles.row}>
              <Pressable style={[styles.button, styles.red]} onPress={() => colorPressed(1)}>
                <Text style={[styles.buttonText, styles.white]}>RED</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.orange]} onPress={() => colorPressed(5461 * 1)}>
                <Text style={[styles.buttonText, styles.white]}>ORANGE</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.yellow]} onPress={() => colorPressed(5461 * 2)}>
                <Text style={[styles.buttonText, styles.white]}>YELLOW</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.forest]} onPress={() => colorPressed(5461 * 3)}>
                <Text style={[styles.buttonText, styles.white]}>FOREST</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable style={[styles.button, styles.green]} onPress={() => colorPressed(5461 * 4)}>
                <Text style={[styles.buttonText, styles.white]}>GREEN</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.mint]} onPress={() => colorPressed(5461 * 5)}>
                <Text style={[styles.buttonText, styles.white]}>MINT</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cyan]} onPress={() => colorPressed(5461 * 6)}>
                <Text style={[styles.buttonText, styles.white]}>CYAN</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.navy]} onPress={() => colorPressed(5461 * 7)}>
                <Text style={[styles.buttonText, styles.white]}>NAVY</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable style={[styles.button, styles.blue]} onPress={() => colorPressed(5461 * 8)}>
                <Text style={[styles.buttonText, styles.white]}>BLUE</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.purple]} onPress={() => colorPressed(5461 * 9)}>
                <Text style={[styles.buttonText, styles.white]}>PURPLE</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.magenta]}
                onPress={() => colorPressed(5461 * 10)}
              >
                <Text style={[styles.buttonText, styles.white]}>MAGENTA</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.rose]} onPress={() => colorPressed(5461 * 11)}>
                <Text style={[styles.buttonText, styles.white]}>ROSE</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.row}>
            <Pressable style={[styles.button, styles.orange]} onPress={() => changeLight(7300, 150, 60)}>
              <Text style={[styles.buttonText, styles.white]}>SUNSET</Text>
            </Pressable>
             <Pressable style={[styles.button, styles.cyan]} onPress={() => changeLight(40000, 200, 60)}>
              <Text style={[styles.buttonText, styles.white]}>ICE</Text>
            </Pressable>  
          </View>

          <View style={styles.bri}>
            <Pressable style={[styles.buttonBri, styles.white, {backgroundColor: 'rgba(255,255,255, .55)'}]} onPress={() => briPressed(254)}>
            </Pressable>
            <Pressable style={[styles.buttonBri, styles.white, {backgroundColor: 'rgba(255,255,255, .30)'}]} onPress={() => briPressed(254)}>
            </Pressable>
            <Pressable style={[styles.buttonBri, styles.white, {backgroundColor: 'rgba(255,255,255, .1)'}]} onPress={() => briPressed(254)}>
            </Pressable>
            <Pressable style={[styles.buttonBri, styles.white, {backgroundColor: 'rgba(255,255,255, 0)'}]} onPress={() => briPressed(20)}>
            </Pressable>
            </View>

          <Text style={styles.label}>Saturation</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={254}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='#000000'
            onSlidingComplete={(x) => onSlidingComplete(x, 'sat')}
            value={satValue}
          />
          <Text style={styles.label}>Color</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={65535}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='#000000'
            onSlidingComplete={(x) => onSlidingComplete(x, 'hue')}
            value={colorValue}
          />
          <Text style={styles.label}>Brightness</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={254}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='#000000'
            onSlidingComplete={(x) => onSlidingComplete(x, 'bri')}
            value={briValue}
          />
        </View>
      </View>
      

      <View style={styles.bottom}>
       <Pressable style={styles.normalLight} onPress={() => changeLight(9700, 70, 130)}>
         <View>
            <Text style={[styles.textStroke, { top: -2, left: -2 }]}>Light</Text>
            <Text style={[styles.textStroke, { top: -2, left: 2 }]}>Light</Text>
            <Text style={[styles.textStroke, { top: 2, left: -2 }]}>Light</Text>
            <Text style={[styles.textStroke, { top: 2, left: 2 }]}>Light</Text>
            <Text style={styles.normalLightText}>Light</Text>
          </View>
        </Pressable>
        <View style={styles.onoff}>
          <Pressable
            style={[styles.buttonSwitch, styles.white, { backgroundColor: 'rgba(255,255,255,.25)' }]}
            onPress={() => {
              onBtnPressed();
            }}
          >
            <Text style={[styles.buttonText, styles.white, { fontSize: 30 }]}>ON</Text>
          </Pressable>
          <Pressable
            style={[styles.buttonSwitch, styles.white]}
            onPress={() => briPressed(1)}
          >
            <Text style={[styles.buttonText, styles.white, { fontSize: 30 }]}>OFF</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 1)',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'BebasNeue-Regular',
  },
  top: {
    width: '100%',
    height: '74%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  topContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bottom: {
    width: '100%',
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  onoff: {
    width: '100%',
    height: '59%',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  normalLight: {
    width: '100%',
    height: '40%',
    borderWidth: 3,
    borderRadius: 0,
    borderColor: 'rgba(255, 255, 0, 1)',
    backgroundColor: 'rgba(255,255,0, .3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalLightText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(255,255,0,1)', // Main text color
    textAlign: 'center',
  },
  textStroke: {
    position: 'absolute',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(1,1,1)', // Stroke color
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
  },
  colors: {
    marginTop: 10,
    width: '100%',
  },
  row: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bri: {
    marginBottom: 12,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BebasNeue-Regular',
  },
  slider: {
    alignSelf: 'stretch',
    height: 24,
    marginBottom: 8,
  },
  button: {
    width: '24%',
    height: 40,
    borderRadius: 1,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBri: {
    width: '24%',
    height: 40,
    borderRadius: 1,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSwitch: {
    height: '100%',
    width: '49.5%',
    borderRadius: 6,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    borderColor: 'rgb(255,0,0)',
    backgroundColor: 'rgba(255,0,0, .15)',
    color: 'rgb(255,0,0)',
  },
  orange: {
    borderColor: 'rgba(255, 128, 0, 1)',
    backgroundColor: 'rgba(255, 128, 0, .15)',
    color: 'rgba(255, 128, 0, 1)',
  },
  yellow: {
    borderColor: 'rgb(255,255,0)',
    backgroundColor: 'rgba(255,255,0, .15)',
    color: 'rgb(255,255,0)',
  },
  forest: {
    borderColor: 'rgb(128,255,0)',
    backgroundColor: 'rgba(128,255,0, .15)',
    color: 'rgb(128,255,0)',
  },
  green: {
    borderColor: 'rgb(0,255,0)',
    backgroundColor: 'rgba(0,255,0, .15)',
    color: 'rgb(0,255,0)',
  },
  mint: {
    borderColor: 'rgba(0, 255, 128, 1)',
    backgroundColor: 'rgba(0, 255, 128, .2)', 
    color: 'rgba(0, 255, 128, 1)',
  },
  cyan: {
    borderColor: 'rgba(0, 255, 255, 1)',
    backgroundColor: 'rgba(0, 255, 255, .15)',
    color: 'rgba(0, 255, 255, 1)',
  },
  navy: {
    borderColor: 'rgba(0, 128, 255, 1)',
    backgroundColor: 'rgba(0, 128, 255, .15)',
    color: 'rgba(0, 128, 255, 1)',
  },
  blue: {
    borderColor: 'rgba(0, 0, 255, 1)',
    backgroundColor: 'rgba(0, 0, 255, .15)',
    color: 'rgba(0, 0, 255, 1)',
  },
  purple: {
    borderColor: 'rgba(128, 0, 255, 1)',
    backgroundColor: 'rgba(128, 0, 255, .15)',
    color: 'rgba(128, 0, 255, 1)',
  },
  magenta: {
    borderColor: 'rgba(255, 0, 255, 1)',
    backgroundColor: 'rgba(255, 0, 255, .15)',
    color: 'rgba(255, 0, 255, 1)',
  },
  rose: {
    borderColor: 'rgba(255, 0, 128, 1)',
    backgroundColor: 'rgba(255, 0, 128, .15)',
    color: 'rgba(255, 0, 128, 1)',
  },
  white: {
    borderColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(255, 255, 255, 1)',
  },
  dark: {
    borderColor: 'rgba(75, 75, 75, 1)',
    color: 'rgba(75, 75, 75, 1)',
  },
});

//huebridge 192.168.2.11
//pi 192.168.2.10
//comp 192.168.2.15
// max hue: 65535
//build for andriod: eas build -p android --profile preview
//npx expo start

