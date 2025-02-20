import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export default function Index() {
  const changeLight = (hue, sat, bri) => {
    const data = { hue, sat, bri };

    fetch('https://192.168.2.10:42000/api/connor-bedroom-light/set-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // For JSON data
      },
      body: JSON.stringify(data), // Convert the data to JSON format
      credentials: 'same-origin', // For sending cookies (if needed)
    })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      console.log('✅ Color Settings Changed:', data);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
    });
  };
  
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Get the IP address of the device
    const fetchIp = async () => {
      const state = await NetInfo.fetch();
      // NetInfo doesn't provide IP directly, but gives connection type info
      console.log(state);
      setIpAddress(state.details.ipAddress || 'IP not available');
    };

    fetchIp();

    return () => {
      // Cleanup if needed
    };
  }, []);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.text}>Device IP Address: {ipAddress}</Text>
      <Pressable style={styles.button1} onPress={() => changeLight(6500, 150, 60)}>
        <Text>Test</Text>
      </Pressable>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button1: {
    width: 60,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    border: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
})
