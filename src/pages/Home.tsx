import React, { useState, useEffect } from "react";
import {
  ProductCard,
  LogoLoop,
  SplitText,
  ClickSpark,
  AnimatedText,
  RecipeSearch,
  RecipeModal,
  AnimatedGrid,
  Button,
  IconButton,
} from "../components";
import { useRecipes } from "../hooks/useRecipes";

const Home: React.FC = () => {
  const {
    recipes,
    loading,
    loadingMore,
    error,
    hasMoreResults,
    currentSearchType,
    loadRandomRecipes,
    handleSearch,
    handleSearchByIngredients,
    loadMoreRecipes,
    clearError,
  } = useRecipes();
  
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  // Load random recipes on mount
  useEffect(() => {
    loadRandomRecipes();
  }, [loadRandomRecipes]);


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
      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
      >
        <div className="bg-[#f4eedf] min-h-screen relative">
          {/* Header with Logo */}
          <header className="flex flex-col items-center pt-0">
            <div 
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                loadRandomRecipes();
              }}
            >
              {/* Logo with Animation */}
              <SplitText
                text="Menú"
                tag="h1"
                className="font-['Gochi_Hand',cursive] text-[48px] sm:text-[64px] text-black tracking-[0.64px] leading-[50px] sm:leading-[66px] mt-8 sm:mt-12 mb-2"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.3}
                rootMargin="0px"
                textAlign="center"
              />
            </div>
          </header>

          {/* Recipe Search */}
          <section className="px-4 sm:px-8 py-8 sm:py-12 mt-4 sm:mt-8">
            <RecipeSearch
              onSearch={handleSearch}
              onSearchByIngredients={handleSearchByIngredients}
              onReset={loadRandomRecipes}
              showReset={currentSearchType !== "random"}
            />
          </section>

          {/* Recipe Cards Grid */}
          <section className="px-4 sm:px-[21px] pt-[38px] pb-8 sm:pb-[60px] max-w-[1200px] mx-auto">
            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 sm:p-6 bg-black text-[#f4eedf] rounded-[12px] border-2 border-black max-w-2xl mx-auto">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-['Roboto_Mono',monospace] font-bold text-sm sm:text-base mb-2">
                      Oops! Something went wrong
                    </h3>
                    <p className="font-['Roboto_Mono',monospace] text-xs sm:text-sm">
                      {error}
                    </p>
                  </div>
                  <button
                    onClick={clearError}
                    className="text-[#f4eedf] hover:opacity-70 transition-opacity text-xl leading-none"
                    aria-label="Close error message"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center font-['Roboto_Mono',monospace] text-lg sm:text-xl text-black">
                Loading recipes...
              </div>
            ) : recipes.length > 0 ? (
              <>
                <AnimatedGrid
                  ease="power3.out"
                  duration={0.4}
                  stagger={0.03}
                  animateFrom="bottom"
                  blurToFocus={false}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-[30px] gap-y-4 sm:gap-y-6 md:gap-y-[40px] justify-items-center"
                >
                  {recipes.map((recipe) => (
                    <ProductCard
                      key={recipe.id}
                      id={recipe.id}
                      {...recipe}
                      onClick={() => setSelectedRecipeId(recipe.id)}
                    />
                  ))}
                </AnimatedGrid>

                {/* Load More Button */}
                {hasMoreResults && (
                  <div className="flex justify-center mt-8 sm:mt-12">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={loadMoreRecipes}
                      disabled={loadingMore}
                    >
                      {loadingMore ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center font-['Roboto_Mono',monospace] text-xl text-black">
                No recipes found. Try a different search!
              </div>
            )}
          </section>

          {/* Middle Section with Text and Fish */}
          <section className="flex justify-center items-center gap-4 sm:gap-8 md:gap-[156px] mt-8 sm:mt-12 md:mt-[120px] mb-8 sm:mb-12 md:mb-[120px] px-4 sm:px-8 overflow-x-hidden">
            <div className="font-['Roboto_Mono',monospace] text-xs sm:text-sm md:text-base lg:text-[20px] text-black w-[100px] sm:w-[180px] md:w-[300px] lg:w-[525px] flex-shrink-0 text-left flex items-center">
              <div>
                <AnimatedText className="font-bold mb-1 sm:mb-2" delay={0.2}>
                  Elegant
                </AnimatedText>
                <AnimatedText className="font-normal" delay={0.4}>
                  dishes from the ingredients in your kitchen.
                </AnimatedText>
              </div>
            </div>

            <div className="flex items-center justify-center flex-shrink-0">
              <img
                src={`${
                  import.meta.env.BASE_URL
                }vectors/decorative/dotted_line.svg`}
                alt="Decorative dotted line"
                className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[514px] w-[10px] sm:w-[15px] md:w-[20px]"
              />
            </div>

            <div className="w-[150px] sm:w-[250px] md:w-[350px] lg:w-[474px] h-[180px] sm:h-[280px] md:h-[400px] lg:h-[545px] flex items-center justify-center flex-shrink-0">
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
          <div className="w-full my-4 sm:my-6 md:my-8 overflow-hidden">
            <div className="h-[36px] sm:h-[48px] md:h-[64px] lg:h-[80px] flex items-center">
              <LogoLoop
                logos={foodIcons}
                speed={120}
                direction="left"
                logoHeight={36}
                gap={50}
                hoverSpeed={0}
                scaleOnHover={false}
                ariaLabel="Food icons"
              />
            </div>
          </div>

          {/* Footer Section */}
          <footer className="flex justify-center px-4 sm:px-8 py-8 sm:py-[60px] mt-12 sm:mt-[80px]">
            <div className="flex w-full max-w-[1130px] justify-between items-center gap-4 sm:gap-8">
              <div className="w-[120px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-[170px] sm:h-[280px] md:h-[420px] lg:h-[560px] flex items-center justify-center flex-shrink-0">
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }vectors/illustrations/Horse.svg`}
                  alt="Horse illustration"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="font-['Roboto_Mono',monospace] font-medium text-xs sm:text-base md:text-2xl lg:text-[36px] text-black uppercase flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-[30px]">
                <div className="leading-none">
                  <AnimatedText className="mb-1 sm:mb-2" delay={0.2}>
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
          <div className="w-full my-4 sm:my-6 md:my-8 overflow-hidden">
            <div className="h-[36px] sm:h-[48px] md:h-[64px] lg:h-[80px] flex items-center">
              <LogoLoop
                logos={foodIcons}
                speed={120}
                direction="right"
                logoHeight={36}
                gap={50}
                hoverSpeed={0}
                scaleOnHover={false}
                ariaLabel="Food icons"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="flex justify-end px-4 sm:px-8 pb-4 sm:pb-8">
            <p className="font-['Roboto_Mono',monospace] font-medium text-black uppercase text-right">
              <span className="text-2xl sm:text-3xl md:text-[48px]">©</span>
              <span className="text-xl sm:text-2xl md:text-[36px]">2025</span>
            </p>
          </div>

          {/* Scroll to Top Button */}
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 group"
            shape="circle"
            size="lg"
            aria-label="Scroll to top"
          >
            <img
              src={new URL('../assets/arrow_upward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg', import.meta.url).href}
              alt=""
              className="w-6 h-6 sm:w-8 sm:h-8 brightness-[10] group-hover:brightness-0 transition-all duration-200"
            />
          </IconButton>
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
