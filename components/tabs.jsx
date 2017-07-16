import PropTypes from 'prop-types';
import Tab from './tab.jsx';

const TabBar = ({tabs}) => (
  tabs.map((tab, i) => {
    let _class = undefined;
    if (index == i)
      _class = 'tab-active';
    else
      _class = 'tab';
    return (
      <Tab id={tab.id} key={i} onclick={tab.onclick} _class={_class} name={name}/>
    )
  })
)

const Tabs = ({tabs, index}) => (
  <ul>
    <li className="tab-hamburger" onclick="hamburger_onclick();" id="hamburger">
      <div className="hamburger" id="menu">
        <img src="./icon/menu.svg" width="24"/>
      </div>
    </li>
    <TabBar tabs={tabs}/>
  </ul>
)

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
}

export default Tabs
