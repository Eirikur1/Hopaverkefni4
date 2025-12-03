import { useState, useEffect } from "react";
import {
  ProductCard,
  LogoLoop,
  SplitText,
  ClickSpark,
  FilmGrain,
  AnimatedText,
  RecipeSearch,
  RecipeModal,
} from "../components";
import {
  searchRecipes,
  searchRecipesByIngredients,
  getRandomRecipes,
} from "../services/api";

const BASE = import.meta.env.BASE_URL;

const foodIcons = [
  { src: `${BASE}vectors/food-icons/baguette.svg`, alt: "Baguette" },
  { src: `${BASE}vectors/food-icons/crossaint.svg`, alt: "Croissant" },
  { src: `${BASE}vectors/food-icons/Burger.svg`, alt: "Burger" },
  { src: `${BASE}vectors/food-icons/Chicken.svg`, alt: "Chicken" },
  { src: `${BASE}vectors/food-icons/Fish.svg`, alt: "Fish" },
  { src: `${BASE}vectors/food-icons/Leche.svg`, alt: "Milk" },
  { src: `${BASE}vectors/food-icons/oyster.svg`, alt: "Oyster" },
];

function formatRecipe(recipe: any) {
  const count = recipe.extendedIngredients?.length || recipe.nutrition?.ingredients?.length || 0;
  return {
    id: recipe.id,
    image: recipe.image,
    heading: recipe.title,
    ingredients: count > 0 ? `${count} Ingredients` : "Recipe",
    description: recipe.summary?.replace(/<[^>]*>/g, "").substring(0, 60) + "..." || "Delicious recipe",
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
  };
}

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  useEffect(() => {
    loadRandom();
  }, []);

  async function loadRandom() {
    setLoading(true);
    try {
      const data = await getRandomRecipes(8);
      setRecipes(data.recipes.map(formatRecipe));
    } catch (err) {
      console.error("Failed to load recipes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query: string) {
    setLoading(true);
    try {
      const data = await searchRecipes(query, 8);
      setRecipes(data.results.map(formatRecipe));
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleIngredientSearch(ingredients: string[]) {
    setLoading(true);
    try {
      const data = await searchRecipesByIngredients(ingredients, 8);
      setRecipes(data.map((r: any) => ({
        id: r.id,
        image: r.image,
        heading: r.title,
        ingredients: `${(r.usedIngredientCount || 0) + (r.missedIngredientCount || 0)} Ingredients`,
        description: `You have: ${r.usedIngredientCount || 0}, Missing: ${r.missedIngredientCount || 0}`,
      })));
    } catch (err) {
      console.error("Ingredient search failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <FilmGrain />
      <ClickSpark sparkColor="#000" sparkSize={10} sparkRadius={20} sparkCount={8} duration={400}>
        <div className="bg-[#f4eedf] min-h-screen relative grain-container">
          <header className="flex flex-col items-center">
            <SplitText
              text="Menú"
              tag="h1"
              className="font-['Gochi_Hand',cursive] text-[64px] text-black tracking-[0.64px] leading-[66px] mt-12 mb-2"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </header>

          <section className="px-8 py-12 mt-8">
            <RecipeSearch onSearch={handleSearch} onSearchByIngredients={handleIngredientSearch} />
          </section>

          <section className="px-[21px] py-[60px] max-w-[1200px] mx-auto">
            {loading ? (
              <p className="text-center font-['Roboto_Mono',monospace] text-xl">Loading...</p>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-[40px] justify-items-center">
                {recipes.map((r) => (
                  <ProductCard key={r.id} {...r} onClick={() => setSelectedRecipeId(r.id)} />
                ))}
              </div>
            ) : (
              <p className="text-center font-['Roboto_Mono',monospace] text-xl">No recipes found</p>
            )}
          </section>

          <section className="flex justify-center items-center gap-[156px] mt-[120px] mb-[120px] px-8">
            <div className="font-['Roboto_Mono',monospace] text-[20px] text-black w-[525px]">
              <AnimatedText className="font-bold mb-2" delay={0.2}>Elegant</AnimatedText>
              <AnimatedText delay={0.4}>dishes from the ingredients in your kitchen.</AnimatedText>
            </div>
            <img
              src={`${BASE}vectors/decorative/dotted_line.svg`}
              alt=""
              className="h-[514px] w-[20px]"
            />
            <img
              src={`${BASE}vectors/illustrations/fish.svg`}
              alt=""
              className="w-[474px] h-[545px] rotate-90 object-contain"
            />
          </section>

          <div className="w-full my-8 h-[80px]">
            <LogoLoop logos={foodIcons} speed={120} direction="left" logoHeight={48} gap={60} scaleOnHover />
          </div>

          <footer className="flex justify-center px-8 py-[60px] mt-[80px]">
            <div className="flex w-[1130px] justify-between items-center">
              <img
                src={`${BASE}vectors/illustrations/Horse.svg`}
                alt=""
                className="w-[400px] h-[560px] object-contain"
              />
              <div className="font-['Roboto_Mono',monospace] font-medium text-[36px] text-black uppercase flex flex-col gap-[30px]">
                <div className="leading-none">
                  <AnimatedText className="mb-2" delay={0.2}>COntact@MENú.com</AnimatedText>
                  <AnimatedText delay={0.3}>(+354)1234 0123</AnimatedText>
                </div>
                <div className="leading-none">
                  <AnimatedText className="mb-2" delay={0.4}>Laugavegur 1</AnimatedText>
                  <AnimatedText className="mb-2" delay={0.5}>101 reykjavik</AnimatedText>
                  <AnimatedText delay={0.6}>ICeland</AnimatedText>
                </div>
                <div className="leading-none">
                  <AnimatedText className="mb-2" delay={0.7}>Instagram</AnimatedText>
                  <AnimatedText className="mb-2" delay={0.8}>FACEBOOK</AnimatedText>
                  <AnimatedText delay={0.9}>x</AnimatedText>
                </div>
              </div>
            </div>
          </footer>

          <div className="w-full my-8 h-[80px]">
            <LogoLoop logos={foodIcons} speed={120} direction="right" logoHeight={48} gap={60} scaleOnHover />
          </div>

          <div className="flex justify-end px-8 pb-8">
            <p className="font-['Roboto_Mono',monospace] font-medium text-black uppercase">
              <span className="text-[48px]">©</span>
              <span className="text-[36px]">2025</span>
            </p>
          </div>
        </div>
      </ClickSpark>

      {selectedRecipeId && (
        <RecipeModal recipeId={selectedRecipeId} onClose={() => setSelectedRecipeId(null)} />
      )}
    </>
  );
}
