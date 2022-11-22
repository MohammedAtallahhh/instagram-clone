import { Sidebar, Timeline } from "../components";

export default function Home() {
  return (
    <div className="w-[90%] max-w-[1000px] mx-auto flex gap-40">
      <div className="flex-grow">
        <Timeline />
      </div>

      <div className="hidden lg:block">
        <Sidebar />
      </div>
    </div>
  );
}
