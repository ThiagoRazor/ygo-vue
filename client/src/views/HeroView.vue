<template>
  <main>
    <section class="bg-white  dark:bg-gray-800">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Unleash the Power of Dueling Legends with the Yu-Gi-Oh Database</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">Discover the most comprehensive collection of Yu-Gi-Oh Forbidden Memories</p>
            <router-link to="/cards" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-800 dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </router-link>
        </div>
        <div class="lg:mt-0 lg:col-span-5 lg:flex">
            <img class="joey" src="../assets/heroimg.png" alt="Blue-Eyes">
        </div>                
    </div>
</section>
  </main>
</template>

<style>
.joey{

  position: relative;
  animation: mymove 3s infinite;
}

@keyframes mymove {
  0%   {top: -5px;}
  50%  {top: 5px;}
  100%  {top: -5px}



}
</style>