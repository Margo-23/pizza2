import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="267" rx="0" ry="0" width="280" height="24" />
        <circle cx="138" cy="127" r="125" />
        <rect x="0" y="308" rx="10" ry="10" width="280" height="83" />
        <rect x="0" y="416" rx="0" ry="0" width="90" height="27" />
        <rect x="126" y="408" rx="30" ry="30" width="155" height="44" />
    </ContentLoader>
)

export default Sceleton;