import { Category } from "./CategoryData";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300",
        "hover:shadow-elevated hover:-translate-y-1 hover:border-primary/50",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "min-w-[140px] md:min-w-[160px]",
        isSelected
          ? "bg-primary/10 border-primary shadow-soft"
          : "bg-card border-border hover:bg-accent/50"
      )}
    >
      {/* Icon container with gradient background */}
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300",
          "group-hover:scale-110",
          isSelected
            ? "bg-primary text-primary-foreground shadow-glow"
            : "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground"
        )}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Category name */}
      <span
        className={cn(
          "font-heading font-semibold text-sm md:text-base transition-colors",
          isSelected ? "text-primary" : "text-foreground"
        )}
      >
        {category.name}
      </span>

      {/* Subcategory count */}
      <span className="text-xs text-muted-foreground mt-1">
        {category.subcategories.length} types
      </span>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
      )}
    </button>
  );
};

export default CategoryCard;
