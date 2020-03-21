import React, { memo, lazy } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { IonMenu, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonMenuButton } from '@ionic/react'
import Icon from './Icon'
import './Menu.sass'

/** @module components/Menu */

const Tabs = lazy(() => import('./Tabs'))

// function Menu({ children, items }) {
//   return (
//     <div id="ide" className="modal">
//       <div className="ide">
//         <ul>
//           {items.map(({ id, url, icon, name, active }) => (
//             <li className={active ? 'menu-button brightness' : 'menu-button'} key={id}>
//   <Link className={active ? 'menu-button brightness' : 'menu-button'} to={url} aria-label={name}>
//                 <Icon name={icon} />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {children}
//     </div>
//   )
// }

/**
 * App Menu.
 *
 * @param {object} children - Children of menu.
 * @todo Color of tabs menu
 * @todo Hide menu when click an icon
 */
function Menu({ children, items, menu, tabs, addTab, changeTab, removeTab }) {
  return (
    <>
      <IonMenu side="start" id="first" contentId="content-menu" className="menu_main">
        <IonHeader>
          <IonToolbar color="primary">
            <Link to={menu.url} aria-label={menu.name} key={menu.id} className="algorithm-link">
              <IonItem className="menu-button">
                <div className="menu-button">
                  <Icon name={menu.icon} slot="start" />
                </div>
                {/* <IonLabel>aaaaaaaaaaaaaa</IonLabel> */}
                {/* <p>aaaaaaaaaaaaaaaa</p> */}
              </IonItem>
            </Link>
          </IonToolbar>
        </IonHeader>
        <IonContent color="tertiary">
          <IonList>
            {items.map(({ id, url, icon, name }) => (
              <Link to={url} aria-label={name} key={id} className="algorithm-link">
                <IonItem className="menu-button">
                  <div className="menu-button">
                    <Icon name={icon} slot="start" />
                  </div>
                  {/* <IonLabel>aaaaaaaaaaaaaa</IonLabel> */}
                  {/* <p>aaaaaaaaaaaaaaaa</p> */}
                </IonItem>
              </Link>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      <IonHeader>
        <IonToolbar color="tertiary">
          <IonMenuButton slot="start" />
          <Tabs
            tabs={tabs}
            add={addTab}
            change={changeTab}
            remove={removeTab}
          />
        </IonToolbar>
      </IonHeader>
      {children}
    </>
  )
}
const menuShape = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
}
Menu.propTypes = {
  children: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(menuShape).isRequired,
  menu: PropTypes.shape(menuShape).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTab: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired
}

export default memo(Menu)
