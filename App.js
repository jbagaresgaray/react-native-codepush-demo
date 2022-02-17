/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const codePushStatusDidChange = status => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        break;
    }
  };

  const codePushDownloadDidProgress = progress => {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    );
  };

  const init = async () => {
    const localPackage = await codePush.getCurrentPackage();
    console.log('localPackage: ', localPackage);

    const updateMetaData = await codePush.getUpdateMetadata();
    console.log('updateMetaData: ', updateMetaData);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
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
          <Section title="Step One">
            Update 5 <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
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

App = codePush(codePushOptions)(App);

export default App;
