import React from 'react'
import menu from '../../icons/menu.svg'
// import '../../core/tabs'

const Helper = () => {
  let current
  const contents = [
    {
      title: 'Toca algun elemento'
    }, {
      title:
        <div id='menu' className='hamburger'>
          <img src={menu} width='24px'/>
        </div>,
      description: 'Desde el podras acceder a documentación de algorithm'
    }, {
      title: 'Editor',
      description: 'Desde el podras escribir algoritmos en un editor'
    }, {
      title: 'Consola',
      description: 'Desde ella podras ver en ejecución su algoritmo'
    }
  ]
  const tabs = () => {
    return contents
      .filter((value, index) => index !== 0)
      .map((value, index) => {
        let style, title
        if (typeof value.title === 'string')
          style = 'tab tabs'
        else
          style = 'tab-hamburger'
        title = value.title ?
          value.title :
          ''
        /* description = value.description ?
          <p>{value.description}</p> :
          ''*/
        return (
          <li className={style} key={index} onClick={() => tutorial(index + 1)}>
            {title}
          </li>
        )
      })
  }
  const tutorial = number => {
    number = number || 0
    return contents
      .filter((value, index) => index === number)
      .map(value => {
        let title, description// , style
        /*
        if (typeof value.title === 'string')
          style = 'tab tabs'
        else
          style = 'tab-hamburger'
        */
        title = value.title ?
          <h1>{value.title}</h1> :
          ''
        description = value.description ?
          <p>{value.description}</p> :
          ''
        current =
          <div className='box'>
            {title}
            {description}
          </div>
      })
  }
  tutorial()
  return (
    <div>
      <div className='test hidden-content'/>
      <div className='help hidden-content'>
        <nav id='tabs'>
          <ul>
            { tabs() }
          </ul>
        </nav>
        {current}
      </div>
    </div>
  )
}
export default Helper
