import React from 'react';
import test from 'tape';
import {shallow} from 'enzyme';

import TerminalPropertyRow from '../src/js/components/terminal-property-row.jsx';

test('<TerminalPropertyRow /> renders correctly', function(t) {
  var wrapper = shallow(<TerminalPropertyRow propertyName="testing" />);

  t.equal(wrapper.find('a').text().trim(), 'testing');
  t.end();
});