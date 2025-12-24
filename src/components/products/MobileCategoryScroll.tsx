import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "./CategoryData";
import CategoryCard from "./CategoryCard";
import { Button } from "@/components/ui/button";

interface MobileCategoryScrollProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const MobileCategoryScroll = ({
  selectedCategory,
  onSelectCategory,
}: MobileCategoryScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll buttons - hidden on mobile, visible on larger screens */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-soft hidden sm:flex"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-soft hidden sm:flex"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1 -mx-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* All Products card */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`group flex-shrink-0 snap-start flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 min-w-[100px] ${
            !selectedCategory
              ? "bg-primary/10 border-primary shadow-soft"
              : "bg-card border-border hover:border-primary/50 hover:shadow-soft"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            }`}
          >
            <span className="text-lg">✨</span>
          </div>
          <span className="font-medium text-xs text-center">All</span>
        </button>

        {/* Category cards */}
        {CATEGORIES.map((category) => (
          <div key={category.id} className="flex-shrink-0 snap-start">
            <CategoryCard
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() =>
                onSelectCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoryScroll;
