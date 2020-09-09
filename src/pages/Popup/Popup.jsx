import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import Box from '../../components/base/Box';

const Popup = () => {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    console.log('Popup mounted!');

    const port = chrome.runtime.connect({ name: 'STORAGE_API' });
    port.postMessage({ func: 'load' });
    port.onMessage.addListener(function (msg) {
      if (msg.result === 'load') {
        setContents(msg.values);
      }
    });
  }, []);

  return (
    <Box p={3}>
      <Form>
        {/* <Form.Check
          type="switch"
          id="custom-switch"
          label="Check this switch"
        /> */}
        <Form.Control type="text" placeholder="스크래핑 대상 ID" />
      </Form>
      {contents && contents.map((item) => <Box>{item.name}</Box>)}
    </Box>
  );
};

export default Popup;
