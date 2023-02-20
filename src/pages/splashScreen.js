import { SplashCircles } from "../components/ui";

const SplashScreen = () => {
  return (
    <>
      <div className="hidden lg:flex min-h-full h-screen transition-opacity delay-150">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-legalYellow text-center">
                Find the Best Lawyers
              </h2>
              <div className="flex flex-col gap-y-8 text-lg font-normal text-gray-500 mt-2">
                <div className="mt-4 text-center">
                  <div> Now you can find a lawyer </div>
                  <div>near your location for your case </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SplashCircles shimmer={true} />
      </div>
      <div className="w-full min-h-screen flex lg:hidden flex-col justify-between bg-legalGreen transition-opacity delay-150 pb-12">
        <div style={{ height: "80vh" }} className="h-[80vh]">
          <SplashCircles shimmer={true} />
          <div className="flex flex-col items-center pb-8">
            <h2 className="text-2xl font-bold tracking-tight text-legalYellow">
              Find the Best Lawyers
            </h2>
            <div className="text-sm font-normal text-gray-500 mt-2 text-center">
              <div> Now you can find a lawyer </div>
              <div>near your location for your case </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SplashScreen;
