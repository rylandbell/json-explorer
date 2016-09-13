import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

const ClickablePropertyRow = require('../js/src/clickable-property-row.jsx');

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));

storiesOf('ClickablePropertyRow', module)
  .add('inactive', () => (
      <ClickablePropertyRow propertyName='Test Property Name' levelDepth='0' isActive='false' handleClick={action('clicked')}/>
    ));