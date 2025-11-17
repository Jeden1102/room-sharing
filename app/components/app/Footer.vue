<template>
  <footer class="mt-auto bg-gray-100 py-10 text-gray-700">
    <div class="container mx-auto grid grid-cols-1 gap-8 px-6 md:grid-cols-4">
      <div>
        <div class="mb-4 flex items-center space-x-2">
          <NuxtImg src="/logo.svg" alt="logo" width="162" height="32" />
        </div>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li>
            <a class="flex items-center space-x-2" href="tel:3055554446">
              <i class="pi pi-phone"></i>
              <span>(305) 555-4446</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center space-x-2"
              href="mailto:contact@realpro.com"
            >
              <i class="pi pi-envelope"></i>
              <span>contact@realpro.com</span>
            </a>
          </li>
        </ul>
        <div class="mt-4 flex space-x-4 text-gray-500">
          <a href="#" class="hover:text-gray-700" title="Tiktok profile"
            ><i class="pi pi-tiktok"></i
          ></a>
        </div>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">Explore</h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li><NuxtLink to="#" class="footer-link">About Us</NuxtLink></li>
          <li><NuxtLink to="#" class="footer-link">FAQ</NuxtLink></li>
          <li><NuxtLink to="#" class="footer-link">Pricing</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">Links</h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li><NuxtLink to="#" class="footer-link">Services</NuxtLink></li>
          <li><NuxtLink to="#" class="footer-link">Contact</NuxtLink></li>
          <li><NuxtLink to="#" class="footer-link">Home Buying</NuxtLink></li>
          <li><NuxtLink to="#" class="footer-link">Home Selling</NuxtLink></li>
          <li><NuxtLink to="#" class="footer-link">Real Estate</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="mb-3 font-semibold lg:text-lg">T&amp;C</h3>
        <ul class="space-y-2 text-sm lg:space-y-3 lg:text-base">
          <li><NuxtLink to="#" class="footer-link">Terms of use</NuxtLink></li>
          <li>
            <NuxtLink to="#" class="footer-link">Privacy Policy</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
