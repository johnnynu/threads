import { memo, useMemo } from "react";

const MetaBranding = memo(
  ({
    group1000007885,
    donalleniii,
    verify,
    h,
    moreVertical,
    oMGCelebratingOver4000Fol,
    iconsLike,
    iconsComment,
    repeat,
    iconsShare,
    replies32KLikes,
    propHeight,
    propGap,
    propGap1,
    propWidth,
  }) => {
    const frameDivStyle = useMemo(() => {
      return {
        height: propHeight,
      };
    }, [propHeight]);

    const frameDiv1Style = useMemo(() => {
      return {
        gap: propGap,
      };
    }, [propGap]);

    const frameDiv2Style = useMemo(() => {
      return {
        gap: propGap1,
      };
    }, [propGap1]);

    const frameDiv3Style = useMemo(() => {
      return {
        width: propWidth,
      };
    }, [propWidth]);

    return (
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 px-[18px] box-border gap-[8px] max-w-full text-left text-base text-white font-sf-pro-display">
        <div
          className="h-36 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border"
          style={frameDivStyle}
        >
          <img
            className="w-10 flex-1 relative max-h-full"
            loading="eager"
            alt=""
            src={group1000007885}
          />
        </div>
        <div
          className="flex-1 flex flex-col items-start justify-start gap-[15px] min-w-[372px] max-w-full mq450:min-w-full"
          style={frameDiv1Style}
        >
          <div
            className="self-stretch flex flex-col items-start justify-start gap-[7px]"
            style={frameDiv2Style}
          >
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[6px]">
                  <div className="relative leading-[110%]">{donalleniii}</div>
                  <img className="h-3 w-3 relative" alt="" src={verify} />
                </div>
                <div className="flex flex-row items-center justify-end gap-[10px] text-right text-sm text-dimgray-300">
                  <div className="relative leading-[110%]">{h}</div>
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 object-contain"
                    alt=""
                    src={moreVertical}
                  />
                </div>
              </div>
              <div className="self-stretch relative leading-[150%] text-whitesmoke pr-[13px]">
                {oMGCelebratingOver4000Fol}
              </div>
            </div>
            <div className="flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-[12px]">
              <img
                className="h-6 w-6 relative min-h-[24px]"
                alt=""
                src={iconsLike}
              />
              <img
                className="h-6 w-6 relative object-cover min-h-[24px]"
                alt=""
                src={iconsComment}
              />
              <img
                className="h-6 w-6 relative min-h-[24px]"
                alt=""
                src={repeat}
              />
              <img
                className="h-6 w-6 relative min-h-[24px]"
                alt=""
                src={iconsShare}
              />
            </div>
          </div>
          <div
            className="w-[190px] flex flex-row items-center justify-start py-0 pr-5 pl-0 box-border text-dimgray-200"
            style={frameDiv3Style}
          >
            <div className="relative leading-[110%] whitespace-pre-wrap">
              {replies32KLikes}
            </div>
            <div className="h-0.5 w-0.5 relative rounded-[50%] bg-dimgray-200 z-[1] ml-[-75px]" />
          </div>
        </div>
      </div>
    );
  }
);

export default MetaBranding;
