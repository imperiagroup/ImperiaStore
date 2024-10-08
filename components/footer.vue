<template>
  <footer class="footer w-full space-y-0 md:block bg-[#f2f2f2] z-40">
    <div class="max-w-3xl mx-auto">
      <div class="justify-center space-y-4 mx-auto py-1 pt-14 md:pb-12">
      <div class="mx-auto pb-14 md:pb-0">
        <a href="/">
          <img class="md:h-[28px] h-[22px] mx-auto w-auto my-4" src="/img/logo.svg" />
        </a>
        <SocialIcon />
      </div>
    </div>
    <div class="py-0">
      <Newsletter />
    </div>
    <div class="mx-auto space-y-8">
      <div class="mx-auto w-full">
        <Payment />
      </div>
      <div class="mx-auto">
        <ul
          class="max-w-xl text-[12px] flex flex-col md:flex-row text-center md:space-x-24 uppercase"
        >
          <li><a href="/page/client-service">Client Services</a></li>
          <li><a href="/page/terms-of-service">Terms Of Service</a></li>
          <li><a href="/page/privacy-policy">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="mx-auto">
      <div class="mx-auto">
        <Modal
          name="footerModal"
          action="footerModal.showModal()"
          modalStyle="modal-box w-full min-h-screen md:w-fit md:min-h-fit rounded-none"
          buttonText="© 2024 Imperia"
          buttonStyle="hover:cursor-help hover:bg-transparent mb-6"
          boxHeader="Copyright Information"
        >
        <form method="dialog">
          <button class="btn btn-sm btn-circle bg-transparent border-none hover:bg-inherit absolute right-4 top-1 focus:outline-none">✕</button>
        </form>
          <p class="py-12 uppercase">
            All contents of this website are property of Imperia. No part of
            this site, including all text and images, may be reproduced in any
            form without prior written consent of Imperia.
          </p>
        </Modal>  
      </div>
    </div>

    </div>

    </div>
  </footer>
</template>
