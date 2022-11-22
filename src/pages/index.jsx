import { Sidebar, Timeline } from "../components";

export default function Home() {
  return (
    <div className="w-[90%] max-w-[800px] mx-auto flex gap-12">
      <div className="lg:w-[60%] max-w-[450px] mx-auto">
        <Timeline />
      </div>

      <div className="hidden lg:block w-[40%]">
        <Sidebar />
      </div>
    </div>
  );
}
