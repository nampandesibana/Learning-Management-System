import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='auth-layout min-h-screen flex items-center justify-center'>
        <main className='auth-layout__main'>
            {children}

        </main>
    </div>
  )
}

export default Layout;