import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CATEGORIES, Category, Subcategory } from "./CategoryData";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onSelectSubcategory: (subcategoryId: string | null) => void;
}

const CategorySidebar = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    selectedCategory ? [selectedCategory] : []
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (category: Category) => {
    if (selectedCategory === category.id) {
      onSelectCategory(null);
      onSelectSubcategory(null);
    } else {
      onSelectCategory(category.id);
      onSelectSubcategory(null);
    }
    toggleCategory(category.id);
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    if (selectedSubcategory === subcategory.id) {
      onSelectSubcategory(null);
    } else {
      onSelectSubcategory(subcategory.id);
      onSelectCategory(subcategory.parentCategory);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-soft sticky top-24">
      <h3 className="font-heading font-bold text-lg text-foreground mb-4 px-2">
        Categories
      </h3>

      {/* All Products option */}
      <button
        onClick={() => {
          onSelectCategory(null);
          onSelectSubcategory(null);
        }}
        className={cn(
          "w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 mb-2",
          "hover:bg-accent/50",
          !selectedCategory && !selectedSubcategory
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground"
        )}
      >
        All Products
      </button>

      {/* Categories list */}
      <div className="space-y-1">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          const isSelected = selectedCategory === category.id && !selectedSubcategory;

          return (
            <div key={category.id}>
              {/* Category button */}
              <button
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  "hover:bg-accent/50",
                  isSelected
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isSelected || selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left text-sm">{category.name}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {/* Subcategories */}
              {isExpanded && (
                <div className="ml-11 mt-1 space-y-1 animate-fade-in">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubcategoryClick(sub)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                        "hover:bg-accent/50",
                        selectedSubcategory === sub.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
