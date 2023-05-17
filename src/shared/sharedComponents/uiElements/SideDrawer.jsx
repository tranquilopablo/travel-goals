import React from 'react'

const SideDrawer = (props) => {
  return (
    <aside className={css.sideDrawer} onClick={props.onClick}>
    {props.children}
  </aside>  )
}

export default SideDrawer
