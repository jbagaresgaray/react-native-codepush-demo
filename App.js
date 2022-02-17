/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

let App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [syncMessage, setSyncMessage] = useState('');
  const [progress, setProgress] = useState(null);

  const codePushStatusDidChange = status => {
    console.log('codePushStatusDidChange: ', status);
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        setSyncMessage('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        setSyncMessage('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        setSyncMessage('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        setSyncMessage('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        setSyncMessage('Update installed.');
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        setSyncMessage('An unknown error occurred.');
        break;
    }
  };

  const codePushDownloadDidProgress = progress => {
    console.log(
      progress?.receivedBytes + ' of ' + progress?.totalBytes + ' received.',
    );
    setProgress({progress});
  };

  const handleBinaryVersionMismatchCallback = callback => {
    console.log('handleBinaryVersionMismatchCallback : ', callback);
  };

  const init = async () => {
    const updateMetaData = await codePush.getUpdateMetadata();
    console.log('updateMetaData: ', updateMetaData);

    try {
      const hasUpdate = await codePush.checkForUpdate(
        codePushOptions.deploymentKey,
        handleBinaryVersionMismatchCallback,
      );
      console.log('hasUpdate: ', hasUpdate);
      if (!hasUpdate) {
        console.log('The app is up to date!');
      } else {
        console.log('An update is available! Should we download it?');
      }
    } catch (error) {
      console.log('hasUpdate error: ', error);
    }

    // codePush.sync(
    //   {installMode: codePush.InstallMode.IMMEDIATE, updateDialog: true},
    //   codePushStatusDidChange,
    //   codePushDownloadDidProgress,
    //   handleBinaryVersionMismatchCallback,
    // );
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <DebugInstructions />
        <ReloadInstructions />
        <ReloadInstructions />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Device Info">
            <Text style={styles.highlight}>App Version: </Text>
            {DeviceInfo.getVersion()}
            {'\n'}
            <Text style={styles.highlight}>App Build: </Text>{' '}
            {DeviceInfo.getBuildNumber()}
            {'\n'}
            <Text style={styles.highlight}>App Readable Version: </Text>{' '}
            {DeviceInfo.getReadableVersion()}
          </Section>
          <Section title="Update Status">
            <Text style={styles.highlight}>{syncMessage}</Text>
          </Section>
          <Section title="Update Progress">
            <Text style={styles.highlight}>
              {progress?.receivedBytes} of {progress?.totalBytes} bytes received
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  deploymentKey: 'LMrKWgyz9iRmgOSZ3Wk_vChBUDZfFqyDCCL57',
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true,
};

if (__DEV__) {
  if (
    global.location &&
    (global.location?.pathname?.includes('/debugger-ui') ||
      global.location?.pathname?.includes('Debugger'))
  ) {
    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest;
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData;
  }
}

App = codePush(codePushOptions)(App);

export default App;
