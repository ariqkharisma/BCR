import React, { Fragment } from 'react'
import EtiketSection from '../Component/EtiketSection/EtiketSection'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'
import ProgressBar from '../Component/ProgressBar/ProgressBar'

function Etiket() {
  return (
    <Fragment>
        <Header height={'200px'} />
        <ProgressBar page={'etiket'} />
        <EtiketSection />
        <Footer />
    </Fragment>
  )
}

export default Etiket