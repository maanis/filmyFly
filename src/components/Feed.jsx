import React from 'react'
import Header from './Header'
import PrimarySec from './PrimarySec'
import SecondrySec from './SecondrySec'

const Feed = () => {
  return (
    <div>
      <Header feed={true} />
      <PrimarySec />
      {/* <SecondrySec/> */}
    </div>
  )
}

export default Feed