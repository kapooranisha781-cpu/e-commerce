import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/productApi";

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error("Failed to add product:", error);
    },
  });
}