const Loading = () => {
  return (
    <div className="border-text/10 flex h-screen w-full items-center justify-center gap-2 border-b pb-4 font-semibold">
      <div className="flex items-center gap-2">
        <div className="h-fit w-fit rounded-xl overflow-hidden text-white">
          <img
            src="/klaboard.png"
            alt="Klaboard"
            className="size-9 rounded-md object-cover object-top"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base">Klaboard</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
