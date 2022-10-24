import React, { Fragment } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'


function EtiketSection() {
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  return (
    <Fragment>
            <div className="container">
                <div className="text-center pt-2">
                    <i className="fa-solid fa-check p-2 m-3" style={{fontSize: '24px', color: 'white', backgroundColor: '#5CB85F', borderRadius:'50%'}}></i>
                    <h5>Pembayaran berhasil!</h5>
                    <p className='fw-normal'>Tunjukkan invoice ini ke petugas BCR di titik temu.</p>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mt-3 shadow p-3 mb-5 bg-body rounded w-75">
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="p-2">
                                    <h5>Invoice</h5>
                                    <p className='fw-normal'>*no invoice</p>
                                </div>
                                <div className="p-2">
                                    <button type="button" className="d-flex btn" style={{border:'solid 1px #0D28A6'}}>
                                        <i className="fa-solid fa-download" style={{color: '#0D28A6'}}></i>
                                        <p className="ml-2 mb-0" style={{color: '#0D28A6'}}>Unduh</p>
                                    </button>
                                </div>
                            </div>

                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, .3)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '162px',
                                    marginBottom: '24px',
                                    overflow: 'hidden',
                                }}
                            >
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                                    <Viewer width={700} fileUrl="/sample.pdf" />
                                </Worker>

                            </div >


                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
  )
}

export default EtiketSection;