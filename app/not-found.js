/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
    return (
        <section className="page_404 flex items-center justify-center w-full min-h-screen bg-white font-serif">
            <div className="row flex w-fit justify-center">
                <div className="col-sm-12 w-full text-center">
                    <div className="four_zero_four_bg w-full bg-cover bg-center h-96" style={{ "backgroundImage": "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')" }}>
                        <h1 className="text-7xl">404</h1>
                    </div>

                    <div className="contant_box_404 -mt-12">
                        <h3 className="text-4xl">
                            Look like you're lost
                        </h3>

                        <p>the page you are looking for not available!</p>

                        <Link href={'/'} className="link_404 text-white py-2 px-4 rounded bg-purple-600 mt-5 inline-block">Go to Home</Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ErrorPage
