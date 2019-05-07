import React from 'react';
import { View, Text, Button } from 'react-native';
import { useWizard } from '@sharingapples/wizard';
import StatusBar from '@sharingapples/status-bar';

function PageWithNoForm() {
  const { next, prev } = useWizard();
  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>This page has no form components </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Prev" onPress={prev} />
          <Button title="Next" onPress={next} />
        </View>
      </View>
    </>
  );
}

export default PageWithNoForm;
