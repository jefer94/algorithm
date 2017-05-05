import React, { PropTypes } from 'react';
import Tab from './tab.jsx';

let Tabs = ({tabs, index}) => (
  <ul>
    <li className="tab-hamburger" onclick="hamburger_onclick();" id="hamburger">
      <div className="hamburger" id="menu">
        <img src="./icon/menu.svg" width="24"/>
      </div>
    </li>
    {
      tabs.map((tab, i) => {
        let _class;
        if (index == i)
          _class = 'tab-active';
        else
          _class = 'tab';
        return <Tab id={tab.id} onclick={tab.onclick} _class={_class} name={name} />
      }
    }
  </ul>
)

Tabs.propTypes = {
  tabs: propTypes.node.isRequired,
  index: propTypes.number.isRequired
}

export default Tabs
