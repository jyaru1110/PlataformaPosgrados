export default function Form({ children, title, onSubmit, register }) {
  return (
    <form onSubmit={onSubmit} className="p-5 w-full bg-white rounded-lg border border-grayborder space-y-3">
      <input {...register}  autoComplete="off" className="w-full font-bold text-2xl mb-4 hover:border-gray-200 border-white/0 border-b focus:border-emerald-700" required placeholder={title}></input>
      <div className="w-full grid grid-cols-8 gap-y-4 gap-x-5">{children}</div>
    </form>
  );
}
