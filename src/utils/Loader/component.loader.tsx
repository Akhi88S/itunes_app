import React from "react";
import "./component.loader.scss";
function ComponentLoader() {
  return (
    <div className="loader">
      <span className="loader-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="64px"
          height="64px"
          viewBox="0 0 128 128"
        >
          <script type="text/ecmascript" />
          <g>
            <path
              fill="#b8b8b8"
              d="M99.359,10.919a60.763,60.763,0,1,0,0,106.162A63.751,63.751,0,1,1,99.359,10.919Z"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="360 64 64"
              dur="480ms"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <path
              fill="#6a6a6a"
              d="M28.641,117.081a60.763,60.763,0,1,0,0-106.162A63.751,63.751,0,1,1,28.641,117.081Z"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="360 64 64"
              dur="720ms"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <path
              fill="#000"
              d="M117.081,99.313a60.763,60.763,0,1,0-106.162,0A63.751,63.751,0,1,1,117.081,99.313Z"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="360 64 64"
              dur="1440ms"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </span>
    </div>
  );
}

export default React.memo(ComponentLoader);
