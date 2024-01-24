import Sidebar from "../components/Sidebar";
import LocationsSection from "../components/LocationsSection";
import UserInfoGroup from "../components/UserInfoGroup";

const HomeThreads = () => {
  return (
    <div className="w-full relative bg-gray-100 overflow-hidden flex flex-row items-start justify-start pt-0 px-0 pb-[61px] box-border gap-[116px] tracking-[normal] mq450:gap-[29px] mq750:gap-[58px]">
      <div className="w-[268px] flex flex-col items-start justify-start mq1275:hidden">
        <Sidebar />
      </div>
      <div className="w-[657px] flex flex-col items-start justify-start pt-[30px] px-0 pb-0 box-border max-w-[calc(100%_-_756px)] mq1275:max-w-full">
        <LocationsSection />
      </div>
      <div className="w-64 flex flex-col items-start justify-start pt-[50px] px-0 pb-0 box-border mq1275:hidden mq750:pt-8 mq750:box-border">
        <UserInfoGroup />
      </div>
    </div>
  );
};

export default HomeThreads;
