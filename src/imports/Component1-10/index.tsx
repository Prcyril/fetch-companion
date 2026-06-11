import svgPaths from "./svg-gxt5pydva4";

function Group() {
  return (
    <div className="absolute inset-[5.48%_6.05%_5.23%_5.86%]" data-name="Group">
      <div className="absolute inset-[-5.74%_-5.82%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.988 60.7197">
          <g id="Group">
            <path d={svgPaths.p2894e8f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="6.25104" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="svg1251576943_1102">
      <Group />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="Component 1">
      <Svg />
    </div>
  );
}