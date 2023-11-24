<template>
    <div class="bg-gray-800 py-20 justify-center">
            <center class="mt-24 m-auto">
                <img class="card-404" width="226" src="https://raw.githubusercontent.com/ThiagoRazor/ygo-vue/main/client/src/assets/894a29efbd3fee51e8e2e538b2144cf3.jpg" alt="Card 0">
                    <div class=" tracking-widest mt-4">
                        <span class="text-gray-500 text-6xl block">
                            <span>N/A</span>
                        </span>
                        <span class="text-gray-500 text-xl">
                            Sorry, We couldn't find what you are looking for!
                        </span>
                    
                    </div>
            </center>
    </div>
</template>

<style>
.card-404{

  position: relative;
  animation: mymove 2.5s infinite;
}

@keyframes mymove {
  0%   {top: 0px;}
  50%  {top: 5px;}
  100%  {top: 0px}



}
</style>