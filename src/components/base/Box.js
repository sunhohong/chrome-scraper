import React from 'react';
import styled from 'styled-components';
import {
  space,
  layout,
  color,
  border,
  flexbox,
  position,
  typography,
  compose,
} from 'styled-system';

const DefaultBox = styled('div')(
  compose(space, layout, color, flexbox, border, position, typography)
);

function Box({ ...props }) {
  if (props.border === true) {
    props.border = '1px solid #ccc';
  }

  return <DefaultBox {...props} />;
}

export default Box;
