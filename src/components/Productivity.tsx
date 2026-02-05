const Productivity = () => {
  return (
    <div className="h-fit px-4 py-1">
      <div className="relative flex flex-col">
        <div className="relative flex h-24 items-end justify-center rounded-t-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="bg-gradient-radial absolute inset-0 from-white/40 via-transparent to-transparent" />

          <div className="absolute bottom-[-1.1rem] h-fit w-fit rounded-xl bg-linear-to-b from-[#9771fe] to-[#6333f3] p-1.5 text-white">
            <img
              src="/klaboard.png"
              alt="Klaboard"
              className="size-6 rounded-md object-cover object-top"
            />
          </div>
        </div>

        <div className="border-text/10 top-11 right-0 bottom-0 left-0 flex h-fit flex-col items-center gap-3 rounded-b-xl border p-4 pt-6 text-center">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-lg leading-6 font-semibold">
              Maximize your productivity
            </h1>
            <p className="text-text/70 font-normal">
              Boost your task management with advanced tools & features.
            </p>
          </div>
          <div className="text-foreground bg-text border-text/10 flex w-full items-center justify-center rounded-xl border p-2 text-center">
            Upgrade
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productivity;
