type IProps = {
  color: string;
};

export const AgentIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg
      width="100"
      height="100"
      version="1.1"
      viewBox="0 0 26.458 26.458"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="filter456"
          x="-.3065"
          y="-.3065"
          width="1.613"
          height="1.613"
          colorInterpolationFilters="sRGB"
        >
          <feFlood
            flood-color="rgb(0,0,0)"
            flood-opacity=".49804"
            result="flood"
          />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="composite1"
          />
          <feGaussianBlur in="composite1" result="blur" stdDeviation="2" />
          <feOffset dx="0" dy="0" result="offset" />
          <feComposite in="SourceGraphic" in2="offset" result="composite2" />
        </filter>
        <filter
          id="filter468"
          x="-.38903"
          y="-1.2306"
          width="1.7781"
          height="3.4612"
          colorInterpolationFilters="sRGB"
        >
          <feFlood
            flood-color="rgb(0,0,0)"
            flood-opacity=".49804"
            result="flood"
          />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="composite1"
          />
          <feGaussianBlur in="composite1" result="blur" stdDeviation="2" />
          <feOffset dx="0" dy="0" result="offset" />
          <feComposite in="SourceGraphic" in2="offset" result="composite2" />
        </filter>
      </defs>
      <g fill={color}>
        <rect
          transform="rotate(-45)"
          x="-.81882"
          y="16.941"
          width="12.338"
          height="3.9005"
          filter="url(#filter468)"
        //   stop-color="#000000"
          //   style="paint-order:markers stroke fill"
        />
        <circle
          transform="rotate(-45)"
          cx="-2.2752"
          cy="18.891"
          r="8"
          filter="url(#filter456)"
        //   stop-color="#000000"
          //   style="paint-order:markers stroke fill"
        />
      </g>
    </svg>
  );
};
