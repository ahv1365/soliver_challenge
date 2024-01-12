import { ref, Ref } from "vue";

export function useUIStore() {
  const isModalOpen: Ref<boolean> = ref(false);

  const openModal = (): void => {
    isModalOpen.value = true;
  };

  const closeModal = (): void => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
