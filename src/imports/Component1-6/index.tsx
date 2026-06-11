import svgPaths from "./svg-re6q3tvyir";
import { imgGroup, imgGroup1 } from "./svg-iknth";

function Group1() {
  return (
    <div className="absolute inset-[0_-0.91%_0_0.91%] mask-position-[-0.909px_0px,_3.535px_4.443px]" style={{ maskImage: `url("${imgGroup}"), url("${imgGroup1}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Group">
          <path d="M100 0H0V100H100V0Z" fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents inset-[4.44%_4.34%_4.28%_4.44%]" data-name="Mask group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[4.44%_4.34%_4.28%_4.44%]" data-name="Group">
      <MaskGroup1 />
      <div className="absolute inset-[4.44%_80%_80%_4.44%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-4.444px_-4.443px] mask-size-[100px_100px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5563 15.5563">
          <path d={svgPaths.p1a399700} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[4.44%_4.44%_80%_8.89%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-8.889px_-4.443px] mask-size-[100px_100px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.6656 15.5563">
          <path d={svgPaths.pd669700} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.89%_8.89%_4.44%_4.44%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-4.444px_-8.889px] mask-size-[100px_100px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.6666 86.6662">
          <path d={svgPaths.p2123c300} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[84.44%_84.44%_8.89%_8.89%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-8.889px_-84.444px] mask-size-[100px_100px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.6665 6.666">
          <path d={svgPaths.p389b9e00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.5%_37.77%_37.23%_36.97%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-36.968px_-37.5px] mask-size-[100px_100px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.266 25.266">
          <path d={svgPaths.p18df0580} fill="var(--fill-0, #FDA9FF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[45.9%_40.54%_45.63%_39.74%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-39.742px_-45.898px] mask-size-[100px_100px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7183 8.46836">
          <path d={svgPaths.p3a421080} fill="var(--fill-0, #1B1B1C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Mask group">
      <Group />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="Component 1">
      <MaskGroup />
    </div>
  );
}