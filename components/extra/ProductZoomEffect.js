'use client'
import React from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const ProductZoomEffect = ({ img }) => {
    return (
        <InnerImageZoom
            src={img}
            zoomSrc={img}
            zoomType="hover"
            className="rounded-lg object-contain bg-white shadow-lg transition-all duration-200 ease-in-out"
          />
    )
}

export default ProductZoomEffect
