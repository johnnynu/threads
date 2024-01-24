import { memo } from "react";

const UserInfoGroup = memo(() => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[38px] text-left text-mini text-white font-sf-pro-display mq450:gap-[19px]">
      <div className="self-stretch flex flex-col items-start justify-start gap-[23px]">
        <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <img
              className="h-[38px] w-[38px] relative rounded-[50%] object-cover"
              loading="eager"
              alt=""
              src="/ellipse-25351@2x.png"
            />
            <div className="flex flex-col items-start justify-start gap-[2px]">
              <div className="w-[90px] relative leading-[110%] font-medium flex items-center pr-5">
                rtralrayhan
              </div>
              <div className="relative text-sm leading-[110%] opacity-[0.6]">
                Shekh Al Raihan
              </div>
            </div>
          </div>
          <div className="relative text-xs leading-[110%] font-semibold text-cornflowerblue">
            Switch
          </div>
        </div>
        <div className="self-stretch flex flex-col items-end justify-start gap-[16px] text-sm">
          <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
            <div className="relative leading-[110%] font-medium opacity-[0.6]">
              Suggested for you
            </div>
            <div className="relative text-xs leading-[110%] font-medium">
              See All
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-[3px] gap-[15px] text-mini">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="w-[111.67px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-[38px] w-[38px] relative rounded-[50%] object-cover"
                  loading="eager"
                  alt=""
                  src="/ellipse-25351-2@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                  <div className="self-stretch relative leading-[110%] font-medium pr-4">
                    mkbhd
                  </div>
                  <div className="relative text-xs leading-[110%] opacity-[0.6]">
                    Follows you
                  </div>
                </div>
              </div>
              <button className="cursor-pointer py-2 pr-[21px] pl-[19px] bg-[transparent] rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-darkslategray-200 hover:bg-dimgray-500 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                <div className="relative text-xs leading-[110%] font-semibold font-sf-pro-display text-dimgray-200 text-left">
                  Following
                </div>
              </button>
            </div>
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="w-[111.67px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-[38px] w-[38px] relative rounded-[50%] object-cover"
                  loading="eager"
                  alt=""
                  src="/ellipse-25351-3@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                  <div className="self-stretch relative leading-[110%] font-medium pr-[19px]">
                    marh9
                  </div>
                  <div className="relative text-xs leading-[110%] opacity-[0.6]">
                    Follows you
                  </div>
                </div>
              </div>
              <button className="cursor-pointer py-2 pr-[21px] pl-[19px] bg-[transparent] rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-darkslategray-200 hover:bg-dimgray-500 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                <div className="relative text-xs leading-[110%] font-semibold font-sf-pro-display text-whitesmoke text-left">
                  Follow
                </div>
              </button>
            </div>
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="w-[144.67px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-[38px] w-[38px] relative rounded-[50%] object-cover"
                  loading="eager"
                  alt=""
                  src="/ellipse-25351-4@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                  <div className="self-stretch relative leading-[110%] font-medium pr-3.5">
                    madebyryan
                  </div>
                  <div className="relative text-xs leading-[110%] opacity-[0.6]">
                    Suggested for you
                  </div>
                </div>
              </div>
              <button className="cursor-pointer py-2 pr-[21px] pl-[19px] bg-[transparent] rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-darkslategray-200 hover:bg-dimgray-500 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                <div className="relative text-xs leading-[110%] font-semibold font-sf-pro-display text-whitesmoke text-left">
                  Follow
                </div>
              </button>
            </div>
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="w-[144.67px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-[38px] w-[38px] relative rounded-[50%] object-cover"
                  loading="eager"
                  alt=""
                  src="/ellipse-25351-5@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                  <div className="self-stretch relative leading-[110%] font-medium pr-5">
                    saymekr
                  </div>
                  <div className="relative text-xs leading-[110%] opacity-[0.6]">
                    Suggested for you
                  </div>
                </div>
              </div>
              <button className="cursor-pointer py-2 pr-[21px] pl-[19px] bg-[transparent] rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-darkslategray-200 hover:bg-dimgray-500 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                <div className="relative text-xs leading-[110%] font-semibold font-sf-pro-display text-whitesmoke text-left">
                  Follow
                </div>
              </button>
            </div>
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="w-[144.67px] flex flex-row items-center justify-start gap-[12px]">
                <img
                  className="h-[38px] w-[38px] relative rounded-[50%] object-cover"
                  loading="eager"
                  alt=""
                  src="/ellipse-25351-6@2x.png"
                />
                <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                  <div className="self-stretch relative leading-[110%] font-medium pr-5">
                    jhsmith
                  </div>
                  <div className="relative text-xs leading-[110%] opacity-[0.6]">
                    Suggested for you
                  </div>
                </div>
              </div>
              <button className="cursor-pointer py-2 pr-[21px] pl-[19px] bg-[transparent] rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-darkslategray-200 hover:bg-dimgray-500 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                <div className="relative text-xs leading-[110%] font-semibold font-sf-pro-display text-whitesmoke text-left">
                  Follow
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[14px] text-sm">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-end justify-start">
            <div className="self-stretch flex flex-row items-center justify-start">
              <div className="w-[151px] relative leading-[110%] font-medium flex items-center opacity-[0.6] pr-5">
                Download mobile app
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-[121px] h-[122px] relative object-cover"
          loading="eager"
          alt=""
          src="/image-3065@2x.png"
        />
      </div>
      <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[3px] pl-0 gap-[15px] text-xs">
        <div className="self-stretch flex flex-col items-center justify-center relative">
          <div className="relative leading-[150%] whitespace-pre-wrap opacity-[0.6]">
            <p className="m-0">About Help Press API Jobs Privacy Terms</p>
            <p className="m-0">Locations Language Meta Verified</p>
          </div>
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] top-[8px] left-[34px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] top-[8px] left-[68px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] top-[8px] left-[106px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] top-[8px] right-[118px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] top-[8px] right-[84px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] top-[8px] right-[34px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] bottom-[7px] left-[53px] rounded-[50%] bg-darkgray z-[1]" />
          <div className="w-0.5 h-0.5 absolute my-0 mx-[!important] bottom-[7px] left-[113px] rounded-[50%] bg-darkgray z-[1]" />
        </div>
        <div className="self-stretch relative leading-[150%] whitespace-pre-wrap opacity-[0.3]">
          © 2023 Meta Privacy Terms Cookies policy
        </div>
      </div>
    </div>
  );
});

export default UserInfoGroup;
