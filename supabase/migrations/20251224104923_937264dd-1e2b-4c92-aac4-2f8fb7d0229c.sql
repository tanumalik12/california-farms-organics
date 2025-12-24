-- Add subcategory column to products table for hierarchical categories
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS subcategory text DEFAULT NULL;

-- Add is_bestseller and is_fresh_today badges
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_bestseller boolean DEFAULT false;

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_fresh_today boolean DEFAULT false;

-- Create index for faster category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON public.products(subcategory);