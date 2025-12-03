import React, { useState, useEffect } from "react";
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

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  // Load random recipes on mount
  useEffect(() => {
    loadRandomRecipes();
  }, []);

  const loadRandomRecipes = async () => {
    setLoading(true);
    try {
      const data = await getRandomRecipes(8);
      const formattedRecipes = data.recipes.map((recipe: any) => ({
        id: recipe.id,
        image: recipe.image,
        heading: recipe.title,
        ingredients: `${recipe.extendedIngredients?.length || 0} Ingredients`,
        description:
          recipe.summary?.replace(/<[^>]*>/g, "").substring(0, 60) + "..." ||
          "Delicious recipe",
      }));
      setRecipes(formattedRecipes);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchRecipes(query, 8);
      const formattedRecipes = data.results.map((recipe: any) => {
        // Try multiple ways to get ingredient count
        const ingredientCount =
          recipe.extendedIngredients?.length ||
          recipe.nutrition?.ingredients?.length ||
          0;

        return {
          id: recipe.id,
          image: recipe.image,
          heading: recipe.title,
          ingredients:
            ingredientCount > 0 ? `${ingredientCount} Ingredients` : "Recipe",
          description:
            recipe.summary?.replace(/<[^>]*>/g, "").substring(0, 60) + "..." ||
            "Delicious recipe",
        };
      });
      setRecipes(formattedRecipes);
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByIngredients = async (ingredients: string[]) => {
    setLoading(true);
    try {
      const data = await searchRecipesByIngredients(ingredients, 8);
      const formattedRecipes = data.map((recipe: any) => {
        const totalIngredients =
          (recipe.usedIngredientCount || 0) +
          (recipe.missedIngredientCount || 0);
        return {
          id: recipe.id,
          image: recipe.image,
          heading: recipe.title,
          ingredients:
            totalIngredients > 0
              ? `${totalIngredients} Ingredients`
              : `${recipe.usedIngredientCount || 0} of yours`,
          description: `You have: ${
            recipe.usedIngredientCount || 0
          }, Missing: ${recipe.missedIngredientCount || 0}`,
        };
      });
      setRecipes(formattedRecipes);
    } catch (error) {
      console.error("Error searching recipes by ingredients:", error);
    } finally {
      setLoading(false);
    }
  };

  // French cuisine vector icons for the logo loop
  const foodIcons = [
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/baguette.svg`,
      alt: "Baguette",
      title: "Baguette",
    },
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/crossaint.svg`,
      alt: "Croissant",
      title: "Croissant",
    },
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/Burger.svg`,
      alt: "Burger",
      title: "Burger",
    },
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/Chicken.svg`,
      alt: "Chicken",
      title: "Chicken",
    },
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/Fish.svg`,
      alt: "Fish",
      title: "Fish",
    },
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/Leche.svg`,
      alt: "Milk",
      title: "Milk",
    },
    {
      src: `${import.meta.env.BASE_URL}vectors/food-icons/oyster.svg`,
      alt: "Oyster",
      title: "Oyster",
    },
  ];

  return (
    <>
      <FilmGrain />
      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
      >
        <div className="bg-[#f4eedf] min-h-screen relative grain-container">
          {/* Header with Logo and Navigation */}
          <header className="flex flex-col items-center pt-0">
            <div className="flex flex-col items-center">
              {/* Logo with Animation */}
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

            </div>
          </header>

          {/* Recipe Search */}
          <section className="px-8 py-12 mt-8">
            <RecipeSearch
              onSearch={handleSearch}
              onSearchByIngredients={handleSearchByIngredients}
            />
          </section>

          {/* Recipe Cards Grid */}
          <section className="px-[21px] py-[60px] max-w-[1200px] mx-auto">
            {loading ? (
              <div className="text-center font-['Roboto_Mono',monospace] text-xl">
                Loading recipes...
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[30px] gap-y-[40px] justify-items-center">
                {recipes.map((recipe) => (
                  <ProductCard
                    key={recipe.id}
                    {...recipe}
                    onClick={() => setSelectedRecipeId(recipe.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center font-['Roboto_Mono',monospace] text-xl">
                No recipes found. Try a different search!
              </div>
            )}
          </section>

          {/* Middle Section with Text and Fish */}
          <section className="flex justify-center items-center gap-[156px] mt-[120px] mb-[120px] px-8">
            <div className="font-['Roboto_Mono',monospace] text-[20px] text-black w-[525px]">
              <AnimatedText className="font-bold mb-2" delay={0.2}>
                Elegant
              </AnimatedText>
              <AnimatedText className="font-normal" delay={0.4}>
                dishes from the ingredients in your kitchen.
              </AnimatedText>
            </div>

            <div className="flex items-center justify-center h-full">
              <img
                src={`${
                  import.meta.env.BASE_URL
                }vectors/decorative/dotted_line.svg`}
                alt="Decorative dotted line"
                className="h-[514px] w-[20px] mx-auto"
              />
            </div>

            <div className="w-[474px] h-[545px] flex items-center justify-center">
              <img
                src={`${
                  import.meta.env.BASE_URL
                }vectors/illustrations/fish.svg`}
                alt="Fish illustration"
                className="rotate-90 w-full h-full object-contain"
              />
            </div>
          </section>

          {/* Animated Logo Loop Divider */}
          <div className="w-full my-8 h-[80px]">
            <LogoLoop
              logos={foodIcons}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              ariaLabel="Food icons"
            />
          </div>

          {/* Footer Section */}
          <footer className="flex justify-center px-8 py-[60px] mt-[80px]">
            <div className="flex w-[1130px] justify-between items-center">
              <div className="w-[400px] h-[560px] flex items-center justify-center">
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }vectors/illustrations/Horse.svg`}
                  alt="Horse illustration"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="font-['Roboto_Mono',monospace] font-medium text-[36px] text-black uppercase flex flex-col gap-[30px]">
                <div className="leading-none">
                  <AnimatedText className="mb-2" delay={0.2}>
                    COntact@MENú.com
                  </AnimatedText>
                  <AnimatedText delay={0.3}>(+354)1234 0123</AnimatedText>
                </div>

                <div className="leading-none">
                  <AnimatedText className="mb-2" delay={0.4}>
                    Laugavegur 1
                  </AnimatedText>
                  <AnimatedText className="mb-2" delay={0.5}>
                    101 reykjavik
                  </AnimatedText>
                  <AnimatedText delay={0.6}>ICeland</AnimatedText>
                </div>

                <div className="leading-none">
                  <AnimatedText className="mb-2" delay={0.7}>
                    Instagram
                  </AnimatedText>
                  <AnimatedText className="mb-2" delay={0.8}>
                    FACEBOOK
                  </AnimatedText>
                  <AnimatedText delay={0.9}>x</AnimatedText>
                </div>
              </div>
            </div>
          </footer>

          {/* Animated Logo Loop Divider */}
          <div className="w-full my-8 h-[80px]">
            <LogoLoop
              logos={foodIcons}
              speed={120}
              direction="right"
              logoHeight={48}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              ariaLabel="Food icons"
            />
          </div>

          {/* Copyright */}
          <div className="flex justify-end px-8 pb-8">
            <p className="font-['Roboto_Mono',monospace] font-medium text-black uppercase text-right">
              <span className="text-[48px]">©</span>
              <span className="text-[36px]">2025</span>
            </p>
          </div>
        </div>
      </ClickSpark>

      {/* Recipe Modal */}
      {selectedRecipeId && (
        <RecipeModal
          recipeId={selectedRecipeId}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </>
  );
};

export default Home;
