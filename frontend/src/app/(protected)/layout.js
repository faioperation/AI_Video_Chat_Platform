import Sidebar from '@/src/component/Sidebar'
import Topbar from '@/src/component/Topbar'
import React from 'react'
import Providers from '../providers'




const layout = ({children}) => {
  return (

 

<Providers>

      <div  className='bg-white'>
         <div className="flex h-screen overflow-hidden p-5">
            
          
              <Sidebar />
           
  
           
            <div className="flex-1 flex flex-col min-w-0 min-h-0 ">
             
              <div className='px-10'>
                <Topbar />
              </div>
  
           
              <main className="flex-1 min-h-0 overflow-y-auto hide-scrollbar  pt-6 pb-[50px] pl-6 pr-12 ">
              <div className="w-full max-w-full overflow-x-hidden  ">
              {children}
              </div>
            </main>
  
  
            </div>
          </div>
      </div>
</Providers>

    )
}

export default layout
