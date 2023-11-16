<template>
    <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style="background-image:url('https://wallpapercave.com/wp/wp2279368.jpg')">
  <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
    <div class="text-white">
      <div class="mb-8 flex flex-col items-center">
        <img src="../assets/logo.png"  width="150" alt="logo" />
        <h1 class="my-6 text-2xl">Olá Admin!</h1>
      </div>
      <form action="#">
        <div class="mb-4 text-lg">
          <input ref="email" class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="id@email.com" />
        </div>

        <div class="mb-4 text-lg">
          <input ref="password" class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="*********" />
        </div>
        <router-link to="/dashboard" class="mt-8 flex justify-center text-lg text-black">
          <button @click.prevent="login" type="submit" class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
        </router-link>
        <div class="flex justify-center items-center mt-6">
    </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  export default {

      methods: {
        async login(){
          try {
            const auth = getAuth();

            const email = this.$refs.email.value;
            const password = this.$refs.password.value;

            await signInWithEmailAndPassword(auth, email, password)
            
              this.$router.push('/dashboard');
          }
            catch (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              
              console.error(`Error: ${errorCode} - ${errorMessage}`);
            }



          }
        }

  }

</script>