import { useState } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Mock — substituir pela chamada da API depois
const mockExercises = [
  { id: "1", name: "Supino Reto", muscleGroup: "Peito" },
  { id: "2", name: "Supino Inclinado", muscleGroup: "Peito" },
  { id: "3", name: "Crucifixo", muscleGroup: "Peito" },
  { id: "4", name: "Remada Curvada", muscleGroup: "Costas" },
  { id: "5", name: "Puxada Frontal", muscleGroup: "Costas" },
  { id: "6", name: "Remada Unilateral", muscleGroup: "Costas" },
  { id: "7", name: "Rosca Direta", muscleGroup: "Bíceps" },
  { id: "8", name: "Rosca Martelo", muscleGroup: "Bíceps" },
  { id: "9", name: "Tríceps Corda", muscleGroup: "Tríceps" },
  { id: "10", name: "Tríceps Testa", muscleGroup: "Tríceps" },
  { id: "11", name: "Desenvolvimento", muscleGroup: "Ombros" },
  { id: "12", name: "Elevação Lateral", muscleGroup: "Ombros" },
  { id: "13", name: "Agachamento", muscleGroup: "Quadríceps" },
  { id: "14", name: "Leg Press", muscleGroup: "Quadríceps" },
  { id: "15", name: "Stiff", muscleGroup: "Posteriores" },
  { id: "16", name: "Panturrilha", muscleGroup: "Panturrilhas" },
  { id: "17", name: "Abdominal", muscleGroup: "Core" },
];

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
}

interface ExercisePickerSheetProps {
  open: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

function groupByMuscle(exercises: Exercise[]) {
  return exercises.reduce<Record<string, Exercise[]>>((acc, ex) => {
    if (!acc[ex.muscleGroup]) acc[ex.muscleGroup] = [];
    acc[ex.muscleGroup].push(ex);
    return acc;
  }, {});
}

export function ExercisePickerSheet({
  open,
  onClose,
  onSelect,
}: ExercisePickerSheetProps) {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const filtered = mockExercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase()),
  );

  const isSearching = search.length > 0;
  const grouped = groupByMuscle(filtered);

  function toggleGroup(group: string) {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }

  function handleSelect(exercises: Exercise) {
    onSelect(exercises);
    onClose();
    setSearch("");
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="bg-[#0d0d0f] border-t border-white/8 rounded-t-3xl px-4 pt-4 pb-8 max-h-[85vh] overflow-y-auto [&>button]:text-white/60"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="text-white text-lg font-bold text-left">
            Adicionar Exercício
          </SheetTitle>
        </SheetHeader>

        {/* Campo de busca */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar exercício..."
            className="w-full bg-white/5 border border-white/8 rounded-xl py-3 pl-9 pr-4 text-white text-sm placeholder:text-white/30 outline-none focus:border-violet-500/50 transition-colors duration-200"
          />
        </div>

        {/* Resultados */}
        {isSearching ? (
          // Modo busca — lista flat
          <div>
            {filtered.length === 0 ? (
              <p>Nenhum exercício encontrado</p>
            ) : (
              filtered.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleSelect(ex)}
                  className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl p-3 text-left active:scale-[0.98] transition-all duration-200"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{ex.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {ex.muscleGroup}
                    </p>
                  </div>
                  <Plus size={16} className="text-violet-400 shrink-0" />
                </button>
              ))
            )}
          </div>
        ) : (
          // Modo grupos — colapsado por grupo muscular
          <div>
            {Object.entries(grouped).map(([group, exercises]) => (
              <div
                key={group}
                className="bg-white/5 border border-white/8 rounded-xl overflow-hidden"
              >
                {/* Header do grupo */}
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <div>
                    <p className="text-white font-semibold text-sm">{group}</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {exercises.length} exercícios
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-white/30 transition-transform duration-20 ${openGroups[group] ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Lista de exercícios do grupo */}
                {openGroups[group] && (
                  <div className="border-t border-white/5">
                    {exercises.map((ex) => (
                      <button
                        key={ex.id}
                        onClick={() => handleSelect(ex)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-wite/5 active:bg-white/8 transition-all duration-150 border-b border-white/5 last:border-0"
                      >
                        <p className="text-white/80 text-sm">{ex.name}</p>
                        <Plus size={14} className="text-violet-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
