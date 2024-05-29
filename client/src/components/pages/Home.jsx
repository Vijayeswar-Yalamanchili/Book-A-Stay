import React from 'react'

function Home() {
  let isLoggedIN = true

  return <>
    {
      isLoggedIN ? <div>User Logged to HomePage</div> : 
                    <div>User have not Logged to HomePage</div>
    }
  </>
}

export default Home