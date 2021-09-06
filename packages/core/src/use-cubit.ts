import { onMounted, onBeforeUnmount, getCurrentInstance } from "vue-demi";
import { Cubit } from "@vue-cubit/core";

export const useCubit = <C extends Cubit<any>>(
  builder: () => C
): ReturnType<typeof builder> => {
  const cubit = builder();

  const instance = getCurrentInstance();
  const cubitListner = () => {
    instance?.proxy?.$forceUpdate();
  };
  onMounted(() => cubit.addListener(cubitListner));
  onBeforeUnmount(() => cubit.removeListener(cubitListner));

  return cubit;
};