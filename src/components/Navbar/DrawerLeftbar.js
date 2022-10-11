import React from 'react'

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

const App = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
      <div>
        <button onClick={toggleDrawer}>Show</button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="drawerBar"
        >
          <div>Hello World</div>
        </Drawer>
      </div>
    );
}

export default App
