<template>
  <div
    class="card cursor-pointer bg-current border-[1px] border-black rounded-none text-neutral-content"
    @click="showModal(id)"
  >
    <div class="card-body py-2" v-if="!isAddNewCard">
      <Icon name="logos:mastercard" class="text-4xl" />
      <p class="text-black">**** **** **** **** 5472</p>
      <p class="text-black">02/27</p>
    </div>
    <div class="card-body py-2" v-else>
      <p class="text-black py-8">Add New Card</p>
    </div>
  </div>
  <dialog :id="id" class="modal rounded-none">
    <div class="modal-box rounded-none">
      <div class="mb-4 relatve">
        <button
          class="btn-sm btn-circle btn-ghost hover:bg-transparent absolute right-4 top-4 my-0"
          @click="closeModal()"
        >
          ✕
        </button>
        <h3 class="font-bold text-[12px] text-center uppercase">Edit Card</h3>
      </div>
      <div class="form-control w-full mx-auto space-y-4 uppercase">
        <input
          type="text"
          placeholder="Lam Cao"
          class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
        />

        <input
          type="number"
          placeholder="**** **** **** **** 5472"
          class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
        />
        <div class="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="MM/YY"
            pattern="\d{2}/\d{2}"
            title="Please enter a valid MM/YY format"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
          />
          <input
            type="number"
            placeholder="***"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 w-full justify-stretch align-middle">
          <button class="btn btn-primary">Save Changes</button>
          <button class="btn btn-outline">Remove Card</button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    id: String,
    cardNumber: String,
    ccv: String,
    expiry: String,
    isAddNewCard: Boolean,
  },
  methods: {
    showModal(id) {
      const dialog = document.getElementById(id);
      if (dialog) {
        dialog.showModal();
      }
    },
    closeModal() {
      const dialog = document.getElementById(this.id);
      if (dialog) {
        dialog.close();
      }
    },
  },
};
</script>
