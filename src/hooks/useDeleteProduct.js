import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productApi";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error("Failed to delete product:", error);
    },
  });
}