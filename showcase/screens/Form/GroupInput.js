import React, { useState, useCallback } from 'react';
import { Text } from 'react-native';
import { Group } from '@sharingapples/form';
import StatusBar from '@sharingapples/status-bar';
import Page from './Page';
import Submit from './Submit';

function GroupInput({ name, GroupForm }, ref) {
  const [visible, setVisible] = useState(false);
  const hide = useCallback(() => setVisible(false), []);
  const show = useCallback(() => setVisible(true), []);

  return (
    <Group name={name} onSubmit={hide}>
      <Page visible={visible} show={show} hide={hide} Minimized={GroupForm.Summary}>
        <StatusBar title="Spouse">
          <Text onPress={hide}>Back</Text>
        </StatusBar>
        <GroupForm />
        <Submit />
      </Page>
    </Group>
  );
}

export default React.forwardRef(GroupInput);
