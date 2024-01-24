import { memo } from "react";

const Sidebar = memo(() => {
  return (
    <div className="h-[1062px] bg-gray-100 box-border flex flex-col items-start justify-start pt-[30px] pb-8 pr-[84px] pl-6 gap-[30px] text-left text-mid text-white font-sf-pro-display border-r-[0.8px] border-solid border-gray-200 mq750:pb-5 mq750:box-border mq1100:pt-5 mq1100:pb-[21px] mq1100:box-border">
      <img
        className="w-7 h-11 relative object-cover"
        loading="eager"
        alt=""
        src="/image-3068@2x.png"
      />
      <div className="h-[926px] flex flex-col items-start justify-start gap-[639px]">
        <nav className="m-0 flex flex-col items-start justify-start gap-[26px] text-left text-mid text-white font-sf-pro-display">
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img
              className="h-6 w-6 relative object-cover"
              loading="eager"
              alt=""
              src="/iconshome@2x.png"
            />
            <h3 className="m-0 relative text-inherit leading-[110%] font-semibold font-inherit">
              Home
            </h3>
          </div>
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img
              className="h-6 w-6 relative object-cover"
              alt=""
              src="/icons--search@2x.png"
            />
            <h3 className="m-0 relative text-inherit leading-[110%] font-normal font-inherit">
              Search
            </h3>
          </div>
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img
              className="h-6 w-6 relative object-cover"
              alt=""
              src="/icons--add@2x.png"
            />
            <h3 className="m-0 relative text-inherit leading-[110%] font-normal font-inherit">
              Create
            </h3>
          </div>
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img className="h-6 w-6 relative" alt="" src="/icons--like.svg" />
            <h3 className="m-0 relative text-inherit leading-[110%] font-normal font-inherit">
              Activity
            </h3>
          </div>
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img
              className="h-6 w-6 relative rounded-[50%] object-cover"
              loading="eager"
              alt=""
              src="/ellipse-25349@2x.png"
            />
            <h3 className="m-0 relative text-inherit leading-[110%] font-normal font-inherit">
              Profile
            </h3>
          </div>
        </nav>
        <div className="flex flex-row items-center justify-start gap-[12px]">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            loading="eager"
            alt=""
            src="/menu01.svg"
          />
          <h3 className="m-0 relative text-inherit leading-[110%] font-normal font-inherit">
            More
          </h3>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
