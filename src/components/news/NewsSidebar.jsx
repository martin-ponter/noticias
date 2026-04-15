import NewsCard from "./NewsCard";

export default function NewsSidebar({
  items,
  selectedItem,
  onSelect,
  loading,
}) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 px-4 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Noticias</h2>
        <p className="mt-1 text-sm text-slate-500">
          Listado de noticias scrapeadas y procesadas.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
            Cargando noticias...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            No hay noticias disponibles.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                isSelected={selectedItem?.id === item.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}