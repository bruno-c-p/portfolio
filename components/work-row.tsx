export function WorkRow({ co, role, yr }: { co: string; role: string; yr: string }) {
  return (
    <div className="group -mx-3 flex cursor-default px-3 py-2 transition-colors duration-200 hover:bg-white/[0.03]">
      <span className="inline-block w-36 shrink-0 text-base text-zinc-400 transition-colors duration-200 group-hover:text-white">
        {co}
      </span>
      <span className="inline-block w-52 shrink-0 text-base text-zinc-600 transition-colors duration-200 group-hover:text-zinc-400">
        {role}
      </span>
      <span className="text-base tabular-nums text-zinc-700 transition-colors duration-200 group-hover:text-zinc-600">
        {yr}
      </span>
    </div>
  );
}
