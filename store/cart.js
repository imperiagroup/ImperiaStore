import { defineStore } from "pinia";
import { GET_CART } from "~/queries/getCart";
import { ADD_TO_CART } from "~/queries/mutateCart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartId: "",
    totalItem: 0,
  }),
  actions: {
    setCartId(cartId) {
      this.cartId = cartId;
    },
    async fetchCart(cartId) {
      try {
        const { $shopifyClient } = useNuxtApp(); // Ensure this is properly injected
        if (!$shopifyClient) {
          throw new Error("$shopifyClient is not available");
        }

        const response = await $shopifyClient.request(GET_CART, {
          variables: {
            id: cartId,
          },
        });

        if (!response || !response.data || !response.data.cart) {
          throw new Error("Invalid response from Shopify API");
        }

        this.setTotalItem(response.data.cart.lines.edges.length);
      } catch (error) {
        console.error(error);
      }
    },
    async addToCart(cartId, merchandiseId) {
      try {
        const { $shopifyClient } = useNuxtApp(); // Ensure this is properly injected
        if (!$shopifyClient) {
          throw new Error("$shopifyClient is not available");
        }

        await $shopifyClient.request(ADD_TO_CART, {
          variables: {
            cartId: cartId,
            merchandiseId: merchandiseId,
          },
        });

        // After adding to cart, increment totalItem
        this.incrementTotalItem();
      } catch (error) {
        console.error(error);
      }
    },

    incrementTotalItem() {
      this.totalItem++;
    },
    decrementTotalItem() {
      this.totalItem--;
    },
    setTotalItem(total) {
      this.totalItem = total;
    },
  },
});
